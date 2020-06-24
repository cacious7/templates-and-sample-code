<?php
if (!defined('ABSPATH'))
  {
  exit;
  }

if (is_plugin_active_for_network('woocommerce/woocommerce.php' ) || in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins'))))
  {

  function szbd_shipping_method_init()
    {
    if (!class_exists('WC_SZBD_Shipping_Method'))
      {
      class WC_SZBD_Shipping_Method extends WC_Shipping_Method
        {

            protected $api;
			static $store_address;
        /**
         * Constructor for shipping class
         *
         * @access public
         * @return void
         */
        public function __construct($instance_id = 0)
          {
          $this->id                 = 'szbd-shipping-method';
          $this->instance_id        = absint($instance_id);
          $this->method_title       = __('Shipping Zones by Drawing', 'szbd');
          $this->method_description = __('Shipping method to be used with a drawn delivery zone', 'szbd');
          $this->supports           = array(
            'shipping-zones',
            'instance-settings',
            'instance-settings-modal'
          );

add_action( 'woocommerce_update_options_shipping_' . $this->id, array( $this, 'process_admin_options' ));

          $this->init();

          }

        /**
         * Init your settings
         *
         * @access public
         * @return void
         */
        function init()
          {

          // Load the settings API
          $this->init_form_fields();
          $this->init_settings();
          $this->enabled = $this->get_option('enabled');
		  //Check old options for BW compatibility
			 $args           = array(
            'numberposts' => 1,
            'post_type' => 'szbdzones',
            'include' => array(intval($this->get_option('title')))
          );
          $a_zone = get_posts($args);

          if ((is_array($a_zone) || is_object($a_zone)) && !empty($a_zone))
            {
			 $title_pre = $a_zone[0] -> post_title;
			}
		  $title2 = is_string($this->get_option('title')) && $this->get_option('title') != ''  ? $this->get_option('title') :  __('Shipping Zones by Drawing', 'szbd');
		  $title = isset($title_pre)  ? $title_pre: $title2;

		  $map = isset($title_pre)  ? ($this->get_option('title')) : 'none';
          $this->title   = $this->get_option('title2', $title);

          $this->info    = $this->get_option('info');
          $this->rate    = $this->get_option('rate');

		  $this->rate_mode    = $this->get_option('rate_mode');
		  $this->rate_fixed    = $this->get_option('rate_fixed');
		  $this->rate_distance    = $this->get_option('rate_distance');
          $this->tax_status = $this->get_option( 'tax_status' );
          $this->minamount    = $this->get_option('minamount',0);
          $this->map    = $this->get_option('map',$map);
          $this->max_radius    = $this->get_option('max_radius');
          $this->max_driving_distance    = $this->get_option('max_driving_distance');
          $this->max_driving_time    = $this->get_option('max_driving_time');
		  $this->driving_mode    = $this->get_option('driving_mode');
          $this->distance_unit          = $this->get_option( 'distance_unit', 'metric' );

           add_action('woocommerce_update_options_shipping_' . $this->id, array(
            $this,
            'process_admin_options'
          ));
           	add_action( 'woocommerce_update_options_shipping_' . $this->id, array( $this, 'clear_transients' ) );

          }
          public function clear_transients() {
			global $wpdb;

			$wpdb->query( "DELETE FROM `$wpdb->options` WHERE `option_name` LIKE ('_transient_szbd-shipping-method_%') OR `option_name` LIKE ('_transient_timeout_szbd-shipping-method_%')" );
		}
        function init_form_fields()
          {
          $args           = array(
            'numberposts' => 100,
            'post_type' => 'szbdzones',
            'post_status'      => 'publish',
            'orderby'          => 'title',
          );
          $delivery_zoons = get_posts($args);
          if (is_array($delivery_zoons) || is_object($delivery_zoons))
            {
            $attr_option = array();
            $calc_1      = array();
            foreach ($delivery_zoons as $calc_2)
              {
              $calc_3 = get_the_title($calc_2);
              $calc_1 += array(
                $calc_2->ID => ($calc_3)
              );
              $attr_option = $calc_1;
              }
            $attr_option += array(
              "radius" => esc_html__("By Radius", 'szbd'),
              "none" => esc_html__("None", 'szbd'),

            );
            }
          else
            {
            $attr_option = array(
              "radius" => esc_html__("By Radius", 'szbd'),
              "none" => esc_html__("None", 'szbd'),

            );
            }
          $this->instance_form_fields = array(
              'title2' => array(
              'title' => __('Title', 'szbd'),
              'type' => 'text',
              'description' => __( 'This controls the title which the user sees during checkout.', 'woocommerce' ),
              'desc_tip'    => true,
              'default' => '',


            ),
			  'title' => array('class' => 'szbd_hide'),

			 'distance_unit'  => array(
					'title'           => __( 'Distance Unit', 'szbd' ),
					'type'            => 'select',
					 'desc_tip'    => true,
					  'description' => __('Choose what distance unit to use.', 'szbd'),
					'default'         => 'metric',
					'options'         => array(
						'metric'      => __( 'Metric (km)', 'szbd'),
						'imperial'    => __( 'Imperial (miles)', 'szbd'),
					),
				),
			'rate_mode' => array(
                'title'   => __( 'Shipping Rate', 'szbd' ),
                'type'    => 'select',
				//'disabled' => true,
                'class'   => 'in_premium disabled',
                'default' => 'flat',
				 'desc_tip'    => true,
                'options' => array(
                    'flat' => __( 'Flat Rate', 'szbd' ),
                    'distance'    => __( 'By transportation distance', 'szbd' ),
					'fixed_and_distance'    => __( 'By fixed rate + per transportation distance', 'szbd' ),
                ),
            ),
            'rate' => array(
              'title' => __('Flat Rate', 'szbd'),
              'type' => 'text',
              'description' => __('Enter a shipping flat rate.', 'szbd'),
              'desc_tip'    => true,
              'default' => '0'
            ),
			 'rate_fixed' => array(
              'title' => __('Fixed Rate', 'szbd'),
              'type' => 'text',
			  'disabled' => true,
			    'class'   => 'in_premium disabled',
              'description' => __('Enter a fixed shipping rate.', 'szbd'),
              'desc_tip'    => true,
              'default' => '0'
            ),
			  'rate_distance' => array(
              'title' => __('Distance Unit Rate', 'szbd'),
              'type' => 'text',
			  'disabled' => true,
			    'class'   => 'in_premium disabled',
              'description' => __('Enter the rate per shipping distance unit.', 'szbd'),
              'desc_tip'    => true,
              'default' => '0'
            ),
            'tax_status' => array(
                'title'   => __( 'Tax status', 'woocommerce' ),
                'type'    => 'select',
                'class'   => 'wc-enhanced-select',
                'default' => 'taxable',
                'options' => array(
                    'taxable' => __( 'Taxable', 'woocommerce' ),
                    'none'    => _x( 'None', 'Tax status', 'woocommerce' ),
                ),
            ),
            'minamount' => array(
              'title' => __('Minimum order amount', 'szbd'),
              'type' => 'text',
              'description' => __('Select a minimum order amount.', 'szbd'),
              'desc_tip'    => true,
              'default' => '0',
			  'class'	=> 'in_premium',
			  'disabled'	=> true,
            ),
			 'driving_mode' => array(
                'title'   => __( 'Transport mode', 'szbd' ),
                'type'    => 'select',
				 'description' => __('Select if to use car or bike when calculate transport distances and times', 'szbd'),
              'desc_tip'    => true,
				'class'	=> 'in_premium disabled',


                'default' => 'car',
                'options' => array(
                    'car' => __( 'By Car', 'szbd' ),
                    'bike'    => __( 'By Bike', 'szbd' ),
                ),
                ),

            array(
		'title'       => __( 'Restrict by Zone (Drawn zone or by Radius)', 'szbd' ),
		'type'        => 'title',
         'description' => __('Mark the restriction as critical if it must be fullfilled. Otherwise, other restrictions will be sufficient', 'szbd'),

	),
            'map' => array(
              'title' => __('Delivery Zone', 'szbd'),
              'type' => 'select',
              'description' => __('Select a drawn delivery area or specify the area by a radius', 'szbd'),
              'desc_tip'    => true,
              'options' => ($attr_option),
               'default' => '',
            ),

             'max_radius' => array(
              'title' => __('Maximum radius', 'szbd'),
              'type' => 'text',
              'description' => __('Maximum radius in (km/miles) from shop address.', 'szbd'),
              'desc_tip'    => true,
              'default' => '0'
            ),
             'zone_critical' => array(
                 'title' => __('Make critical', 'szbd'),

                'type'    => 'checkbox',
                'class'   => 'szbd_box',
                'default' => 'yes',


                ),
              array(
		'title'       => __( 'Restrict by Driving Distance', 'szbd' ),
		'type'        => 'title',
		 'description' => __('Mark the restriction as critical if it must be fullfilled. Otherwise, other restrictions will be sufficient', 'szbd'),

	),
             'max_driving_distance' => array(
              'title' => __('Maximum transport distance', 'szbd'),
              'type' => 'text',
              'description' => __('Maximum transportation distance in km / miles', 'szbd'),
              'desc_tip'    => true,
              'default' => '0',
			   'disabled' => true,
			    'class'   => 'in_premium disabled',
            ),
              'distance_critical' => array(
                 'title' => __('Make critical', 'szbd'),

                'type'    => 'checkbox',
                'class'   => 'szbd_box in_premium',
                'default' => '',
				 'disabled' => true,



                ),
              array(
		'title'       => __( 'Restrict by Driving Time', 'szbd' ),
		'type'        => 'title',
		 'description' => __('Mark the restriction as critical if it must be fullfilled. Otherwise, other restrictions will be sufficient', 'szbd'),

	),
             'max_driving_time' => array(
              'title' => __('Max driving time', 'szbd'),
              'type' => 'text',
              'description' => __('Maximum transportation time in minutes', 'szbd'),
              'desc_tip'    => true,
              'default' => '0',
			  'disabled' => true,
			    'class'   => 'in_premium disabled',
            ),
              'time_critical' => array(
                 'title' => __('Make critical', 'szbd'),

                'type'    => 'checkbox',

                'default' => '',
				 'disabled' => true,
			    'class'   => 'in_premium disabled szbd_box',


                ),

          );
          }

        public function calculate_shipping($package = array())
          {


 if($this->rate_mode == 'flat'){

			$rate = floatval($this->rate);

		  }else{

			return;
		  }

          $rate = array(
            'label' => $this->title,

             'cost' => isset($rate) ? $rate : null,
             'package' => $package,
            'calc_tax' => 'per_order',

          );

          $this->add_rate($rate);


          }


		 static function get_store_address(){
if(!isset(self::$store_address)){
        $store_address     = get_option( 'woocommerce_store_address' ,'');
$store_address_2   = get_option( 'woocommerce_store_address_2','' );
$store_city        = get_option( 'woocommerce_store_city','' );
$store_postcode    = get_option( 'woocommerce_store_postcode','' );
$store_raw_country = get_option( 'woocommerce_default_country','' );
$split_country = explode( ":", $store_raw_country );
// Country and state
$store_country = $split_country[0];
// Convert country code to full name if available
				if ( isset( WC()->countries->countries[ $store_country ] ) ) {
					$store_country = WC()->countries->countries[ $store_country ];
				}
$store_state   = isset($split_country[1]) ?  $split_country[1] : '';
        $store_loc = array(
                      'store_address' => $store_address,
                     'store_address_2' => $store_address_2,
                      'store_postcode' => $store_postcode,
					  'store_city'	=> $store_city,

                       'store_state'	=> $store_state,
					  'store_country'	=> $store_country,

                      );
		self::$store_address = $store_loc;
}else{
	$store_loc = self::$store_address;
}
        return self::$store_address;
    }

        }
     // }
    }
  }





  function szbd_add_shipping_method($methods)
    {
        if (class_exists('WC_SZBD_Shipping_Method')){
    $methods['szbd-shipping-method'] = new WC_SZBD_Shipping_Method();
    return $methods;
        }
    }
  add_filter('woocommerce_shipping_methods', 'szbd_add_shipping_method');

  function szbd_in_array_field($needle, $needle_field, $haystack, $strict = false)
    {
    if ($strict)
      {
      foreach ($haystack as $item)
        if (isset($item->$needle_field) && $item->$needle_field === $needle)
          return true;
      }
    else
      {
      foreach ($haystack as $item)
        if (isset($item->$needle_field) && $item->$needle_field == $needle)
          return true;
      }
    return false;
    }



  function check_address_2()
    {

    global $wpdb;
    $country            = strtoupper(wc_clean(WC()->customer->get_shipping_country()));
    $state              = strtoupper(wc_clean(WC()->customer->get_shipping_state()));
    $continent          = strtoupper(wc_clean(WC()->countries->get_continent_code_for_country($country)));
    $postcode           = wc_normalize_postcode(wc_clean(WC()->customer->get_shipping_postcode()));
    // Work out criteria for our zone search
    $criteria           = array();
    $criteria[]         = $wpdb->prepare("( ( location_type = 'country' AND location_code = %s )", $country);
    $criteria[]         = $wpdb->prepare("OR ( location_type = 'state' AND location_code = %s )", $country . ':' . $state);
    $criteria[]         = $wpdb->prepare("OR ( location_type = 'continent' AND location_code = %s )", $continent);
    $criteria[]         = "OR ( location_type IS NULL ) )";
    // Postcode range and wildcard matching
    $postcode_locations = $wpdb->get_results("SELECT zone_id, location_code FROM {$wpdb->prefix}woocommerce_shipping_zone_locations WHERE location_type = 'postcode';");
    if ($postcode_locations)
      {
      $zone_ids_with_postcode_rules = array_map('absint', wp_list_pluck($postcode_locations, 'zone_id'));
      $matches                      = wc_postcode_location_matcher($postcode, $postcode_locations, 'zone_id', 'location_code', $country);
      $do_not_match                 = array_unique(array_diff($zone_ids_with_postcode_rules, array_keys($matches)));
      if (!empty($do_not_match))
        {
        $criteria[] = "AND zones.zone_id NOT IN (" . implode(',', $do_not_match) . ")";
        }
      }
    // Get matching zones
    $szbd_zoons = $wpdb->get_results("

            SELECT zones.zone_id FROM {$wpdb->prefix}woocommerce_shipping_zones as zones

            LEFT OUTER JOIN {$wpdb->prefix}woocommerce_shipping_zone_locations as locations ON zones.zone_id = locations.zone_id AND location_type != 'postcode'

            WHERE " . implode(' ', $criteria) . "

           ORDER BY zone_order ASC, zone_id ASC LIMIT 1

        ");

    if ((isset($szbd_zoons) || is_array($szbd_zoons)) && !empty($szbd_zoons) )
      {
      $delivery_zones = WC_Shipping_Zones::get_zones();

      $szbd_zone      = array();

      foreach ((array) $delivery_zones as $p => $a_zone)
        {

        if (szbd_in_array_field($a_zone['zone_id'], 'zone_id', $szbd_zoons))
          {
          foreach ((array) $a_zone['shipping_methods'] as $value)
            {
            $array_latlng = array();
            $value_id     = $value->id;
            $enabled      = $value->enabled;

            if ($enabled == 'yes' && $value_id == 'szbd-shipping-method' )
              {


                // Check if drawn zone
                $do_drawn_map = false;
                $do_radius = false;
                $zone_id = $value->instance_settings['map'];

            if($zone_id !== 'radius' && $zone_id !== 'none'  ){
                  $do_drawn_map = true;
                    $zoon_bool =  $value->instance_settings['zone_critical'] == 'yes';


              $meta    = get_post_meta(intval($zone_id), 'szbdzones_metakey', true);
			   // Compatibility with shipping methods created in version 1.1 and lower
			  if($zone_id == ''){ $meta    = get_post_meta(intval($value->instance_settings['title']), 'szbdzones_metakey', true);}
			  //
              if (is_array($meta['geo_coordinates']) && count($meta['geo_coordinates']) > 0)
                {
                $i2 = 0;
                foreach ($meta['geo_coordinates'] as $geo_coordinates)
                  {
                  if ($geo_coordinates[0] != '' && $geo_coordinates[1] != '')
                    {
                    $array_latlng[$i2] = array(
                      $geo_coordinates[0],
                      $geo_coordinates[1]
                    );
                    $i2++;
                    }
                  }
                }
              else
                {
                $array_latlng = null;
                }
                // Check if maximum radius
            }else if($zone_id == 'radius'){
                $zoon_bool =  $value->instance_settings['zone_critical'] == 'yes' ;
                  $do_radius = true;
                    $do_radius_flag = true;
                 $max_radius = floatval(sanitize_text_field( $value->instance_settings['max_radius']));



            }

                $do_driving_distance = false;
				 $do_bike_distance = false;


                 $do_driving_time_car = false;
                  $do_driving_time_bike = false;









              $szbd_zone[] = array(
                'zone_id' => $value->instance_id ,
                'cost' => $value->rate,
                'wc_price_cost' => wc_price($value->rate),
                'geo_coordinates' => $array_latlng,
                'value_id' => $value->get_rate_id(),
                'min_amount' => (float) 0,
                 'min_amount_formatted' => wc_price( 0),


                 'max_radius' => $do_radius ? array('radius' => $max_radius, 'bool' => $zoon_bool ) : false,
                   'drawn_map' => $do_drawn_map ? array( 'geo_coordinates' => $array_latlng,'bool' => $zoon_bool) : false,

                 'max_driving_distance' => $do_driving_distance ? array( 'distance' => $max_driving_distance, 'bool' => $driving_distance_bool) : false,
				   'max_bike_distance' => $do_bike_distance ? array( 'distance' => $max_driving_distance, 'bool' => $driving_distance_bool) : false,
                  'max_driving_time_car' => $do_driving_time_car ? array( 'time' => $max_driving_time, 'bool' => $driving_time_bool) : false,
                   'max_driving_time_bike' => $do_driving_time_bike ? array( 'time' => $max_driving_time, 'bool' => $driving_time_bool) : false,
				   'distance_unit' => $value->instance_settings['distance_unit'] == 'metric' ? 'km' : 'miles',
				   'transport_mode' =>  $value->instance_settings['driving_mode'],
				    'rate_mode' =>  $value->instance_settings['rate_mode'],
					 'rate_fixed' =>  null,
					  'rate_distance' =>  null,






              );
              }
           // }
          }
          }
        }

      wp_send_json(array(
        'szbd_zones' => $szbd_zone,
        'status' => true,
         'exclude' => get_option('szbd_exclude_shipping_methods', 'no'),
         'tot_amount' =>  (float) WC()->cart->get_cart_contents_total() + WC()->cart->get_cart_contents_tax(),

         'do_driving_time_car' =>  isset($do_driving_time_car_flag),
          'do_driving_time_bike' =>  isset($do_driving_time_bike_flag),
           'do_radius' =>  isset( $do_radius_flag),
           'do_driving_dist' => isset($do_driving_distance_flag),
		    'do_bike_dist' => isset($do_bike_distance_flag),
			 'do_dynamic_rate_car' => isset($do_car_dynamic_rate_flag),
			  'do_dynamic_rate_bike' => isset($do_bike_dynamic_rate_flag),

		     'store_address' => WC()->session->get( 'szbd_store_address',false),
			  'delivery_address' => WC()->session->get( 'szbd_delivery_address',false),
			   'delivery_address_string' => WC()->session->get( 'szbd_delivery_address_string',false),

			   'delivery_duration_driving' => WC()->session->get( 'szbd_delivery_duration_car',false),
			    'distance_driving' => WC()->session->get( 'szbd_distance_car',false),

				 'delivery_duration_bicycle' => WC()->session->get( 'szbd_delivery_duration_bike',false),
			    'distance_bicycle' => WC()->session->get( 'szbd_distance_bike',false),







      ));
      }
    else
      {
      wp_send_json(array(
        'szbd_zones' => array(),
        'status' => true,
         'exclude' => get_option('szbd_exclude_shipping_methods', 'no'),
          'tot_amount' =>  (float) WC()->cart->get_total('float'),


      ));
      }
    }


  add_filter('wp_ajax_nopriv_check_address_2', 'check_address_2');
  add_filter('wp_ajax_check_address_2', 'check_address_2');

  add_action('wp_enqueue_scripts', 'enqueue_scripts_aro',999);
  function enqueue_scripts_aro()
   {
        if(is_checkout() && get_option( 'szbd_deactivate_google', 'no' ) == 'no'){

    $google_api_key = get_option('szbd_google_api_key', '');

    wp_enqueue_script('szbd-google-autocomplete-2', 'https://maps.googleapis.com/maps/api/js?v=3&libraries=geometry,places&types=address' . '' . '&key=' . $google_api_key);

    wp_enqueue_script('shipping-del-aro', SZBD_PLUGINDIRURL . 'assets/szbd.js', array(
      'jquery',
      'wc-checkout',
      'szbd-google-autocomplete-2'
    ),SZBD_VERSION, true);
    wp_localize_script( 'shipping-del-aro', 'szbd',
                       array(
                             'checkout_string_1'=> __( 'There are no shipping options available. Please ensure that your address has been entered correctly, or contact us if you need any help.', 'woocommerce' ),
                             'checkout_string_2'=> __('Minimum order value is','szbd'),
							    'checkout_string_3'=> __('Your are to far away. We only make deliverys within','szbd'),
                              'store_address' => WC_SZBD_Shipping_Method::get_store_address(),
							  'debug' => get_option('szbd_debug','no') == 'yes' ? 1 : 0,

                      ) );
      wp_enqueue_style('shipping-del-aro-style', SZBD_PLUGINDIRURL . 'assets/szbd.css',SZBD_VERSION);
	  /*  wp_enqueue_script('fdoe-autocomplete',  SZBD_PLUGINDIRURL . 'assets/autocomplete.js',
						   array(
      'jquery',
      'wc-checkout',
      'szbd-google-autocomplete-2',
	  'shipping-del-aro'
    ),
						  true);*/
    }else if(is_checkout() && get_option( 'szbd_deactivate_google', 'no' ) == 'yes'){

         wp_enqueue_script('shipping-del-aro', SZBD_PLUGINDIRURL . '/assets/szbd.js', array(
      'jquery',
      'wc-checkout',

    ),SZBD_VERSION, true);
          wp_localize_script( 'shipping-del-aro', 'szbd',
                       array(
                             'checkout_string_1'=> __( 'There are no shipping options available. Please ensure that your address has been entered correctly, or contact us if you need any help.', 'woocommerce' ),
                             'checkout_string_2'=> __('Minimum order value is','szbd'),
							   'checkout_string_3'=> __('Your are to far away. We only make deliverys within','szbd'),
                             'store_address' => WC_SZBD_Shipping_Method::get_store_address(),
							   'debug' => get_option('szbd_debug','no') == 'yes' ? 1 : 0,
                      ) );
          wp_enqueue_style('shipping-del-aro-style', SZBD_PLUGINDIRURL . '/assets/szbd.css',SZBD_VERSION);





    }
    }
    function disable_shipping_calc_on_cart( $show_shipping ) {


    if( is_cart() && get_option('szbd_hide_shipping_cart','no') == 'yes' ) {
        return false;
    }
    return $show_shipping;
}
add_filter( 'woocommerce_cart_ready_to_calc_shipping', 'disable_shipping_calc_on_cart', 999 );

  }

function szbd_clear_session(){

	 WC()->session->__unset( 'szbd_distance_car');
	  WC()->session->__unset( 'szbd_distance_bike');
 WC()->session->__unset( 'szbd_store_address');
 WC()->session->__unset( 'szbd_delivery_address');
 WC()->session->__unset( 'szbd_delivery_address_string');
 WC()->session->__unset( 'szbd_delivery_duration_car');
 WC()->session->__unset( 'szbd_delivery_duration_bike');
   WC()->session->__unset( 'fdoe_min_shipping_is_szbd');
  }
  function clear_wc_shipping_rates_cache(){
    $packages = WC()->cart->get_shipping_packages();

    foreach ($packages as $key => $value) {
        $shipping_session = "shipping_for_package_$key";

        unset(WC()->session->$shipping_session);
    }
}

   add_action('woocommerce_checkout_update_order_review', 'clear_wc_shipping_rates_cache');
  add_action('woocommerce_checkout_update_order_review', 'szbd_clear_session');
    add_action('szbd_clear_session', 'szbd_clear_session');
	 add_action('woocommerce_shipping_init', 'szbd_shipping_method_init');
