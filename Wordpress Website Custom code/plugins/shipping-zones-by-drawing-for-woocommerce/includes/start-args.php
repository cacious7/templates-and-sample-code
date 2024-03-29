<?php
if (!defined('ABSPATH'))
  {
  exit;
  }
// The Plugin Settings arguments
if (!isset($settings_args))
  {
  $settings_args = array(
    array(
      'name' => __('Settings', 'szbd'),
      'type' => 'title',
      'id' => 'SZbD_settings',
      'desc' => __('', '')
    ),
    array(
      'name' => __('Google Maps API Key','szbd'),
      'id' => 'szbd_google_api_key',
      'type' => 'text',
      'css' => 'min-width:300px;',
     // 'desc' => __('Enter your Google API key (Maps JavaScript API, Places API, Geocoding API, Directions API)', 'szbd'),
        'desc' => __(' <p><a href="https://cloud.google.com/maps-platform/#get-started" target="_blank">Visit Google to get your API Key &raquo;</a> <br>Include Maps JavaScript API, Places API, Geocoding API, Directions API</p>', 'szbd')
    ),
     array(
      'name' => __('Show only lowest cost shipping method?', 'szbd'),
      'id' => 'szbd_exclude_shipping_methods',
      'type' => 'checkbox',
      'css' => 'min-width:300px;',
      'desc' => __('At checkout, show only the drawn shipping method with the lowest cost.', 'szbd'),
      'disabled' => true,
     'class' => 'in_premium',
    ),
     array(
      'name' => __('Hide shipping costs at cart page?', 'szbd'),
      'id' => 'szbd_hide_shipping_cart',
      'type' => 'checkbox',
      'css' => 'min-width:300px;',
      'default' => 'no',
      'desc' => __('At cart page, hide the shipping costs.', 'szbd')
    ),
      array(
      'type' => 'sectionend',
      'id' => 'SZbD_settings'
    ),
      array(
      'name' => __('Advanced', 'szbd'),
      'type' => 'title',
      'id' => 'SZbD_settings_ad',

    ),
      array(
             'name' => __( 'De-activate Google Maps API?', 'szbd' ),
            'id' => 'szbd_deactivate_google',
            'type' => 'checkbox',
            'css' => 'min-width:300px;',

            'default' => 'no'
        ),
       array(
             'name' => __( 'Debug Mode', 'szbd' ),
            'id' => 'szbd_debug',
            'type' => 'checkbox',
            'css' => 'min-width:300px;',
             'desc' => __('Show request and response data from Google calls.', 'szbd' ),

            'default' => 'no'
        ),
    array(
      'type' => 'sectionend',
      'id' => 'SZbD_settings_ad'
    ),
     array(
      'name' => __('Test Store Address Geolocation', 'szbd'),
      'type' => 'title',
      'id' => 'SZbD_settings_test',
       'desc' => __('Press button below to test if Google can geolocate your WooCommerce store address', 'szbd' ),

    ),
     array(
        'type' => 'szbd_show_test',
        'id' => 'szbd_show_test'
    ),
     array(
      'type' => 'sectionend',
      'id' => 'SZbD_settings_test'
    ),
  );
  }
  // The Post Type arguments
if (!isset($caps))
  {
  $x      = wp_count_posts(SZBD::POST_TITLE);
  $y      = intval($x->publish) + intval($x->draft);
  $cap_1  = $y <= 4.936*sin(deg2rad(90)) && isset($y) ? 'edit_' . SZBD::POST_TITLE : 'edit__' . SZBD::POST_TITLE;
  $labels = array(
    'name' => __('Shipping Zones by Drawing', 'szbd'),
    'menu_name' => __('Shipping Zones by Drawing', 'szbd'),
    'name_admin_bar' => __('Shipping Zone Maps', 'szbd'),
    'all_items' => __('Shipping Zones by Drawing', 'szbd'),
    'singular_name' => __('Zone List', 'szbd'),
    'add_new' => __('New Shipping Zone', 'szbd'),
    'add_new_item' => __('Add New Zone', 'szbd'),
    'edit_item' => __('Edit Zone', 'szbd'),
    'new_item' => __('New Zone', 'szbd'),
    'view_item' => __('View Zone', 'szbd'),
    'search_items' => __('Search Zone', 'szbd'),
    'not_found' => __('Nothing found', 'szbd'),
    'not_found_in_trash' => __('Nothing found in Trash', 'szbd'),
    'parent_item_colon' => ''
  );
  $caps   = array(
    'edit_post' => 'edit_szbdzone',
    'read_post' => 'read_szbdzone',
    'delete_post' => 'delete_szbdzone',
    'edit_posts' => 'edit_szbdzones',
    'edit_others_posts' => 'edit_others_szbdzones',
    'publish_posts' => 'publish_szbdzones',
    'read_private_posts' => 'read_private_szbdzones',
    'delete_posts' => 'delete_szbdzones',
    'delete_private_posts' => 'delete_private_szbdzones',
    'delete_published_posts' => 'delete_published_szbdzones',
    'delete_others_posts' => 'delete_others_szbdzones',
    'edit_private_posts' => 'edit_private_szbdzones',
    'edit_published_posts' => 'edit_published_szbdzones',
    'create_posts' => $cap_1
  );
  $args   = array(
    'labels' => $labels,
    'public' => true,
    'publicly_queryable' => false,
    'show_ui' => true,
    'query_var' => true,
    'rewrite' => false,
    'hierarchical' => false,
    'supports' => array(
      'title',
      'author'
    ),
    'exclude_from_search' => true,
    'show_in_nav_menus' => false,
    'show_in_menu' => 'woocommerce',
    'can_export' => true,
    'map_meta_cap' => true,
    'capability_type' => 'szbdzone',
    'capabilities' => $caps
  );
  }
