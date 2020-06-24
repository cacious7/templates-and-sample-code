<?php
/**
 * Plugin Name: WooCommerce Paymo Gateway
 * Plugin URI: https://www.gulait.com
 * Description: Recieve payment through Zambian telcom mobile money systems: Airtel, MTN and/or Zamtel
 * Author: Cacious Siamunyanga
 * Author URI: http://www.gulait.com
 * Version: 0.0.1
 * Text Domain: wc-gateway-paymo
 * Domain Path: /i18n/languages/
 *
 * Copyright: (c) 2019 Paymo, (cacious@gulait.com) and WooCommerce
 *
 * License: GNU General Public License v3.0
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 *
 * @package   WC-Gateway-Paymo
 * @author    Paymo
 * @category  Admin
 * @copyright Copyright: (c) 2019 Paymo, (cacious@gulait.com) and WooCommerce
 * @license   http://www.gnu.org/licenses/gpl-3.0.html GNU General Public License v3.0
 *
 * This paymo gateway forks the WooCommerce core "Cheque" payment gateway to create a mobile payment method.
 */
 
defined( 'ABSPATH' ) or exit;
// Make sure WooCommerce is active
if ( ! in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
	return;
}
/**
 * Add the gateway to WC Available Gateways
 * 
 * @since 0.0.1
 * @param array $gateways all available WC gateways
 * @return array $gateways all WC gateways + paymo gateway
 */
function wc_paymo_add_to_gateways( $gateways ) {
	$gateways[] = 'WC_Gateway_Paymo';
	return $gateways;
}
add_filter( 'woocommerce_payment_gateways', 'wc_paymo_add_to_gateways' );
/**
 * Adds plugin page links
 * 
 * @since 1.0.0
 * @param array $links all plugin links
 * @return array $links all plugin links + our custom links (i.e., "Settings")
 */
function wc_paymo_gateway_plugin_links( $links ) {
	$plugin_links = array(
		'<a href="' . admin_url( 'admin.php?page=wc-settings&tab=checkout&section=paymo_gateway' ) . '">' . __( 'Configure', 'wc-gateway-paymo' ) . '</a>'
	);
	return array_merge( $plugin_links, $links );
}
add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'wc_paymo_gateway_plugin_links' );
/**
 * Paymo Payment Gateway
 *
 * Provides an Paymo Payment Gateway; mainly for testing purposes.
 * We load it later to ensure WC is loaded first since we're extending it.
 *
 * @class 		WC_Gateway_Paymo
 * @extends		WC_Payment_Gateway
 * @version		1.0.0
 * @package		WooCommerce/Classes/Payment
 * @author 		SkyVerge
 */
add_action( 'plugins_loaded', 'wc_paymo_gateway_init', 11 );
function wc_paymo_gateway_init() {
	class WC_Gateway_Paymo extends WC_Payment_Gateway {
		/**
		 * Constructor for the gateway.
		 */
		/**
		 * These are the 5 required variables that have to be setup for the gateway
		 */
		public function __construct() {
	  
			$this->id                 = 'paymo_gateway';
			$this->icon               = apply_filters('woocommerce_paymo_icon', ''); //this one is optional
			$this->has_fields         = false; //this one needs to be true if we want our gateway to have firlds such as  cc fields
			$this->method_title       = __( 'Paymo', 'wc-gateway-paymo' ); //the title of the payment method for the admin page
			$this->method_description = __( 'Allows payments using telcom networks. Currently well suppoorted for Zambia-based airtel, MTN and Zamtel.', 'wc-gateway-paymo' );
		  
			
			/**LOAD THE SETTINGS
			 * Once we’ve set these variables, the constructor 
			 * will need a few other functions. We’ll have to 
			 * initialize the form fields and settings.
			 */
			$this->init_form_fields();
			$this->init_settings();
		  
			// After calling the above function. We then load the variables that have been set by the user
			$this->title        = $this->get_option( 'title' );
			$this->description  = $this->get_option( 'description' );
			$this->instructions = $this->get_option( 'instructions', $this->description );
		  
			//ACTIONS
			add_action( 'woocommerce_update_options_payment_gateways_' . $this->id, array( $this, 'process_admin_options' ) ); //adds a save hook for your settings
			add_action( 'woocommerce_thankyou_' . $this->id, array( $this, 'thankyou_page' ) );
		  
			// Customer Emails
			add_action( 'woocommerce_email_before_order_table', array( $this, 'email_instructions' ), 10, 3 );
		}
	
	
		/**
		 * Initialize Gateway admin Settings Form Fields
		 */
		public function init_form_fields() {
	  
			$this->form_fields = apply_filters( 'wc_paymo_form_fields', array(
		  
				'enabled' => array(
					'title'   => __( 'Enable/Disable', 'wc-gateway-paymo' ),
					'type'    => 'checkbox',
					'label'   => __( 'Enable Paymo Payment', 'wc-gateway-paymo' ),
					'default' => 'yes'
				),
				
				'title' => array(
					'title'       => __( 'Title', 'wc-gateway-paymo' ),
					'type'        => 'text',
					'description' => __( 'This controls the title for the payment method the customer sees during checkout.', 'wc-gateway-paymo' ),
					'default'     => __( 'Paymo Payment', 'wc-gateway-paymo' ),
					'desc_tip'    => true,
				),
				
				'description' => array(
					'title'       => __( 'Description', 'wc-gateway-paymo' ),
					'type'        => 'textarea',
					'description' => __( 'Payment method description that the customer will see on your checkout.', 'wc-gateway-paymo' ),
					'default'     => __( 'Please remit payment to Store Name upon pickup or delivery.', 'wc-gateway-paymo' ),
					'desc_tip'    => true,
				),
				
				'instructions' => array(
					'title'       => __( 'Instructions', 'wc-gateway-paymo' ),
					'type'        => 'textarea',
					'description' => __( 'Instructions that will be added to the thank you page and emails.', 'wc-gateway-paymo' ),
					'default'     => '',
					'desc_tip'    => true,
				),
			) );
		}
	
	
		/**
		 * Output for the order received page.
		 */
		public function thankyou_page() {
			if ( $this->instructions ) {
				echo wpautop( wptexturize( $this->instructions ) );
			}
		}
	
	
		/**
		 * Add content to the WC emails.
		 *
		 * @access public
		 * @param WC_Order $order
		 * @param bool $sent_to_admin
		 * @param bool $plain_text
		 */
		public function email_instructions( $order, $sent_to_admin, $plain_text = false ) {
		
			if ( $this->instructions && ! $sent_to_admin && $this->id === $order->payment_method && $order->has_status( 'on-hold' ) ) {
				echo wpautop( wptexturize( $this->instructions ) ) . PHP_EOL;
			}
		}
	
	
		/**
		 * Process the payment and return the result
		 *
		 * @param int $order_id
		 * @return array
		 */
		public function process_payment( $order_id ) {
	
			$order = wc_get_order( $order_id );
			
			// Mark as on-hold (we're awaiting the payment)
			$order->update_status( 'on-hold', __( 'Awaiting paymo payment', 'wc-gateway-paymo' ) );
			
			// Reduce stock levels
			$order->reduce_order_stock();
			
			// Remove cart
			WC()->cart->empty_cart();
			
			// Return thankyou redirect
			return array(
				'result' 	=> 'success',
				'redirect'	=> $this->get_return_url( $order )
			);
		}
	
  } // end \WC_Gateway_Paymo class
}