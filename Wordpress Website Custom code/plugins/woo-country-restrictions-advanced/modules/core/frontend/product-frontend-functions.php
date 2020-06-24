<?php

if (!function_exists("vcwccr_remove_posts_from_menu")) {

	add_filter('wp_get_nav_menu_items', 'vcwccr_remove_posts_from_menu', 10, 3);

	function vcwccr_remove_posts_from_menu($items, $menu, $args) {

		$available_menu_items = array();

		foreach ($items as $item) {
			if (apply_filters('wcacr_allow_to_hide_products', true) && $item->type === 'post_type' && get_post_type($item->object_id) === 'product' && (!vcwccr_shop_is_available() || vcwccr_is_restricted($item->object_id))) {
				continue;
			}

			$available_menu_items[] = $item;
		}

		return $available_menu_items;
	}

}

if (!function_exists('wcacr_filter_products_from_wc_blocks')) {
	add_filter('woocommerce_blocks_product_grid_item_html', 'wcacr_filter_products_from_wc_blocks', 10, 3);

	function wcacr_filter_products_from_wc_blocks($html, $data, $product) {
		$product_id_to_check = ( $product->is_type('variation') ) ? $product->get_parent_id() : $product->get_id();
		if (!vcwccr_shop_is_available() || vcwccr_is_restricted($product_id_to_check)) {
			$html = '';
		}
		return $html;
	}

}
if (!function_exists('wcacr_variation_prices_has_per_country')) {
	// WooCommerce uses the prices hash to cache the variation prices,
	// we need to make it unique per country so it shows the right product prices
	add_filter('woocommerce_get_variation_prices_hash', 'wcacr_variation_prices_has_per_country');

	function wcacr_variation_prices_has_per_country($hash) {
		$country = wcacr_get_user_country();
		if ($country) {
			$hash[] = $country;
		}
		return $hash;
	}

}

if (!function_exists('vcwccr_shortcode_products_query_per_country')) {
	// WooCommerce uses the query args to create a transient key,
	// so we add the country to make sure every country uses a different cache
	add_filter('woocommerce_shortcode_products_query', 'vcwccr_shortcode_products_query_per_country');

	function vcwccr_shortcode_products_query_per_country($query_args) {
		$query_args['wcacr_country'] = wcacr_get_user_country();
		return $query_args;
	}

}
if (!function_exists("vcwccr_products_redirect")) {

	add_action('template_redirect', 'vcwccr_products_redirect');

	function vcwccr_products_redirect() {

		global $post, $wp_query;

		if (is_product()) {
			$message = get_option('wccr_restricted_product_page_message');
			if (empty($message)) {
				$message = __('This product is not available for your country', VCWCCR_TEXT_DOMAIN);
			}

			// If we can open restricted products, show a wc notice
			if (!apply_filters('wcacr_allow_to_hide_products', true) && (vcwccr_is_restricted($post->ID) || !vcwccr_shop_is_available() )) {
				wc_add_notice($message, 'error');
			}

			//validating settings and restrictions
			if (!apply_filters('wcacr_allow_to_hide_products', true) || (!vcwccr_is_restricted($post->ID) && vcwccr_shop_is_available())) {
				return;
			} else {
				//if country is not available error page is shown				
				$page_id = (int) get_option('wccr_restricted_product_message_page_id');
				if ($page_id) {
					$page = get_post($page_id);
					$message = $page->post_content;
					// We need this to avoid fatal errors because other plugins think this is a product 
					// page and use product specific functions when they're not available, 
					// this way the query vars will think that this is a page and other plugins won't execute their logic
					$wp_query->queried_object = $page;
				}

				//If you want to use your own template, here is the filter				
				$products_not_available_template = apply_filters("vcwccr_not_available_template", plugin_dir_path(__DIR__) . "views/frontend/product-not-available-page.php", $message);

				require_once $products_not_available_template;
				die;
			}
		}
	}

}

if (!function_exists("vcwccr_custom_pre_get_posts_query")) {

	add_action('woocommerce_product_query', 'vcwccr_custom_pre_get_posts_query');

	function vcwccr_custom_pre_get_posts_query($q) {
		if (is_product_category()) {

			$term_id = $q->queried_object->term_id;

			$apply_operator = get_term_meta($term_id, "vcwccr_apply_this_to", true);

			if ($apply_operator !== "products_only") {

				if (vcwccr_is_restricted($term_id, "category")) {

					$q->set_404();
					return;
				}
			}
		}

		if (!apply_filters('wcacr_allow_to_hide_products', true)) {
			return;
		}

		do_action('wcacr_filter_products_query', $q);

		if (!vcwccr_shop_is_available()) {

			if (is_shop()) {
				$q->set('post_name__in', array(wp_generate_password()));
			}

			return;
		}

		return;
	}

}

if (!function_exists("vcwccr_exclude_disallowed_products")) {

	add_action('pre_get_posts', 'vcwccr_exclude_disallowed_products');

	function vcwccr_exclude_disallowed_products($q) {

		if (!apply_filters('wcacr_allow_to_hide_products', true)) {
			return;
		}

		if ($q->get('post_type') === 'product' && $q->get('name') && $q->is_main_query() && get_option('wccr_restricted_product_message_page_id')) {
			return;
		}
		if (!vcwccr_shop_is_available() && $q->get('post_type') === 'product') {
			$q->set('post_name__in', array(wp_generate_password()));
			return;
		}

		$disallowed_products = vcwccr_get_disallowed_products();

		if (!empty($disallowed_products)) {
			$q->set('post__not_in', $disallowed_products);

			if (!empty($q->get('post__in'))) {
				$q->set('post__in', array_diff($q->get('post__in'), $disallowed_products));
			}
		}
	}

}

if (!function_exists("vcwccr_exclude_products_from_search")) {

	add_filter('register_post_type_args', 'vcwccr_exclude_products_from_search', 10, 2);

	function vcwccr_exclude_products_from_search($args, $post_type) {

		if ($post_type === "product" && apply_filters('wcacr_allow_to_hide_products', true)) {
			if (vcwccr_shop_is_available()) {
				$args["exclude_from_search"] = false;
			} else {
				$args["exclude_from_search"] = true;
			}
		}

		return $args;
	}

}

if (!function_exists("vcwccr_remove_restricted_products_from_grouped_product")) {

	add_action('woocommerce_before_single_product', 'vcwccr_remove_restricted_products_from_grouped_product');

	function vcwccr_remove_restricted_products_from_grouped_product() {

		global $product;

		$grouped_product_available_products = array();

		if ($product->get_type() == 'grouped') {

			$grouped_products = $product->get_children();

			if (empty($grouped_products)) {
				return;
			}

			foreach ($grouped_products as $grouped_product) {

				if (vcwccr_is_restricted($grouped_product)) {
					continue;
				}

				$grouped_product_available_products[] = $grouped_product;
			}

			$product->set_children($grouped_product_available_products);
		}
	}

}

if (!function_exists("vcwccr_remove_restricted_products_from_related_products")) {

	add_filter("woocommerce_related_products", "vcwccr_remove_restricted_products_from_related_products");

	function vcwccr_remove_restricted_products_from_related_products($related_posts) {

		if (empty($related_posts)) {
			return $related_posts;
		}

		$available_related_posts = array();

		foreach ($related_posts as $related_post) {

			if (!vcwccr_is_restricted($related_post)) {
				$available_related_posts[] = $related_post;
			}
		}

		return $available_related_posts;
	}

}

//Applying restrictions to the widget
if (!function_exists("vcwccr_products_widget")) {

	add_filter("woocommerce_products_widget_query_args", "vcwccr_products_widget");

	function vcwccr_products_widget($query_args) {

		if (!apply_filters('wcacr_allow_to_hide_products', true)) {
			return $query_args;
		}
		if (!vcwccr_shop_is_available()) {
			$query_args["post_name__in"] = array(wp_generate_password());
			return $query_args;
		}

		$disallowed_products = vcwccr_get_disallowed_products();

		if (!empty($disallowed_products)) {
			$query_args['post__not_in'] = $disallowed_products;
		}

		return $query_args;
	}

}

if (!function_exists('vcwccr_save_order_country')) {
	add_action('woocommerce_checkout_create_order', 'vcwccr_save_order_country', 20, 2);

	// We save the user country as order meta, so we have it available when working with the orders later
	// Used by the "country stocks" feature currently.
	function vcwccr_save_order_country($order, $data) {
		$order->update_meta_data('vcwccr_country', wcacr_get_user_country());
	}

}