<?php
/**
 * Plugin Name: WooCommerce Paymo Direct Gateway
 * Plugin URI: https://www.gulait.com
 * Description: Recieve payment through Zambian telcom mobile money systems: Airtel, MTN and/or Zamtel
 * Author: Cacious Siamunyanga
 * Author URI: http://www.gulait.com
 * Version: 0.0.1
 * Text Domain: wc-gateway-paymo-direct
 * Domain Path: /i18n/languages/
 *
 * Copyright: (c) 2019 Paymo, (cacious@gulait.com) and WooCommerce
 *
 * License: GNU General Public License v3.0
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 *
 * @package   WC-Gateway-Paymo-Direct
 * @author    Paymo
 * @category  Admin
 * @copyright Copyright: (c) 2019 Paymo, (cacious@gulait.com) and WooCommerce
 * @license   http://www.gnu.org/licenses/gpl-3.0.html GNU General Public License v3.0
 *
 * This Paymo Direct gateway forks the WooCommerce core "Cheque" payment gateway to create a mobile payment method.
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
 * @return array $gateways all WC gateways + paymo direct gateway
 */
function wc_paymo_direct_add_to_gateways( $gateways ) {
	$gateways[] = 'WC_Gateway_Paymo_Direct';
	return $gateways;
}

add_filter( 'woocommerce_payment_gateways', 'wc_paymo_direct_add_to_gateways' );
/**
 * Adds plugin page links
 * 
 * @since 1.0.0
 * @param array $links all plugin links
 * @return array $links all plugin links + our custom links (i.e., "Settings")
 */
function wc_paymo_direct_gateway_plugin_links( $links ) {
	$plugin_links = array(
		'<a href="' . admin_url( 'admin.php?page=wc-settings&tab=checkout&section=paymo_direct_gateway' ) . '">' . __( 'Configure', 'wc-gateway-paymo-direct' ) . '</a>'
	);
	return array_merge( $plugin_links, $links );
}
add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'wc_paymo_direct_gateway_plugin_links' );

/**
 * Paymo Direct Payment Gateway
 *
 * Provides an Paymo Direct Payment Gateway; mainly for testing purposes.
 * We load it later to ensure WC is loaded first since we're extending it.
 *
 * @class 		WC_Gateway_Paymo_Direct
 * @extends		WC_Payment_Gateway
 * @version		1.0.0
 * @package		WooCommerce/Classes/Payment
 * @author 		SkyVerge
 */
add_action( 'plugins_loaded', 'wc_paymo_direct_gateway_init', 11 );
function wc_paymo_direct_gateway_init() {
	class WC_Gateway_Paymo_Direct extends WC_Payment_Gateway {
		private $allowedCurrencies				= array( 'SEK', 'EUR', 'NOK', 'USD', 'CLP');
		private $SUCCESS_CALLBACK_URI 			= "paymo_payment_success";
		private $FAILURE_CALLBACK_URI 			= "paymo_payment_failure";
		private $SUCCESS_REDIRECT_URI 			= "/checkout/order-received/";
		private $FAILURE_REDIRECT_URI 			= "/checkout/order-received/";
		private $API_HOST 			  			= " ";
		private $API_SESSION_CREATE_ENDPOINT	= "/checkout/V1/session/create";
		private $customer_paymo_phone = "";

		/**
		 * Constructor for the gateway.
		 */
		/**
		 * These are the 5 required variables that have to be setup for the gateway
		 */
		public function __construct() {
	  
			$this->id                 = 'paymo_direct_gateway';
			$this->icon               = apply_filters('woocommerce_paymo_direct_icon', ''); //this one is optional
			$this->has_fields         = true; //this one needs to be true if we want our gateway to have fields such as  cc fields
			$this->method_title       = __( 'Paymo_Direct', 'wc-gateway-paymo-direct' ); //the title of the payment method for the admin page
			$this->method_description = __( 'Allows payments using telcom networks. Currently well suppoorted for Zambia-based airtel, MTN and Zamtel.', 'wc-gateway-paymo-direct' );
			$this->supports 		  = array('products');//features supported by payment gateway
			
			/**LOAD THE SETTINGS
			 * Once we’ve set these variables, the constructor 
			 * will need a few other functions. We’ll have to 
			 * initialize the form fields and settings.
			 */
			$this->init_form_fields();			//this calls the function described below from here
			$this->init_settings();
		  
			// Once the form fields are initialized, we will append the field values (defined by the admin user)
			// to the properties we defined earlier in the constructor.
			// This gives the admin power to customize the gateway variables.
			$this->title        = $this->get_option( 'title' );
			$this->description  = $this->get_option( 'description' );
			$this->instructions = $this->get_option( 'instructions', $this->description );

			// check if valid for use
			// I assume we are checking if the constructor,
			//  therefore, the gateway is valid for use
			if($this->is_valid_for_use()){
				$this->enabled = $this->get_option('enabled');
			} else {
				$this->enabled = 'no';
			}

			// SITE URL
			$this->siteUrl = get_site_url();

			// Setup correct values based on test mode value
			$this->testmode 	= 'yes' === $this->get_option('testmode');
			$this->merchant_id 	= $this->testmode ? $this->get_option('test_merchant_id') : $this->get_option('merchant_id');
			$this->auth_token 	= $this->testmode ? $this->get_option('test_auth_token') : $this->get_option('auth_token');
			$this->country_code = $this->get_option('country_code');

		  
			// ACTIONS

			// After appending the options availed from form fields
			// to the properties, now we will save the options using
			// this action hook
			add_action( 'woocommerce_update_options_payment_gateways_' . $this->id, array( $this, 'process_admin_options' ) );

			add_action( 'woocommerce_thankyou_' . $this->id, array( $this, 'thankyou_page' ) );
					  
			// Customer Emails
			add_action( 'woocommerce_email_before_order_table', array( $this, 'email_instructions' ), 10, 3 );

			// REGISTER CALLBACKS
			// Now we will register the callback hooks which we will
			// use to receive the payment response from the gateway.
			// add_action('woocommerce_api_'. $this->SUCCESS_CALLBACK_URI, array($this, 'payment_success'));		//success callback
			// add_action('woocommerce_api_'. $this->FAILURE_CALLBACK_URI, array($this, 'payment_failure'));		//failure callback
		}
	
		/**
		 * Initialize Gateway admin Settings Form Fields
		 */
		public function init_form_fields() {
	  
			$this->form_fields = apply_filters( 'wc_paymo_direct_form_fields', array(
		  
				'enabled' => array(
					'title'   => __( 'Enable/Disable', 'wc-gateway-paymo-direct' ),
					'type'    => 'checkbox',
					'label'   => __( 'Enable Paymo Direct Payment', 'wc-gateway-paymo-direct' ),
					'default' => 'no'
				),
				
				'title' => array(
					'title'       => __( 'Title', 'wc-gateway-paymo-direct' ),
					'type'        => 'text',
					'description' => __( 'This controls the title for the payment method the customer sees during checkout.', 'wc-gateway-paymo-direct' ),
					'default'     => __( 'Paymo Direct Payment', 'wc-gateway-paymo-direct' ),
					'desc_tip'    => true,
				),
				
				'description' => array(
					'title'       => __( 'Description', 'wc-gateway-paymo-direct' ),
					'type'        => 'textarea',
					'description' => __( 'Payment method description that the customer will see on your checkout.', 'wc-gateway-paymo-direct' ),
					'default'     => __( 'Please remit payment to Store Name upon pickup or delivery.', 'wc-gateway-paymo-direct' ),
					'desc_tip'    => true,
				),
				
				'instructions' => array(
					'title'       => __( 'Instructions', 'wc-gateway-paymo-direct' ),
					'type'        => 'textarea',
					'description' => __( 'Instructions that will be added to the thank you page and emails.', 'wc-gateway-paymo-direct' ),
					'default'     => '',
					'desc_tip'    => true,
				),

				'testmode' => array(
					'title'			=> 'Test Mode',
					'label' 		=> 'Enable Test Mode',
					'type' 			=> 'checkbox',
					'description'	=> 'Use the payment gateway in test mode using Test API Keys.',
					'default'		=> 'yes',
					'desc_tip'		=> 'true'
				),

				'test_merchant_id' => array(
					'title'			=> 'Test MerchantID',
					'type'			=> 'text',
					'placeholder'	=> 'Enter Test MerchantID'
				),

				'test_auth_token' => array(
					'title'			=> 'Test Auth Token',
					'type'			=> 'text',
					'placeholder'	=> 'Enter Test Auth Token'
				),

				'merchant_id' => array(
					'title'			=> 'Live MerchantID',
					'type'			=> 'text',
					'placeholder'	=> 'Enter Liver MerchantID'
				),

				'auth_token' => array(
					'title'			=> 'Live Auth Token',
					'type'			=> 'text',
					'placeholder'	=> 'Enter Live Auth Token'
				),

				'country_code' => array(
					'title'		=> 'Country',
					'type'		=> 'select',
					'label'		=> 'Country',
					'options'	=> array(
						''		=> 'Select Country',
						'SE'	=> 'Sweden',
						'FI'	=> 'Finland',
						'NO'	=> 'Norway',
						'DE'	=> 'Germany',
						'CL'	=> 'Chile',
						'ZM'	=> 'Zambia'
					)
				)
			) );
		}
		
		/**
		 * Get the woocommerce currency of the site and 
		 * check if it is supported by the paymo plugin.
		 * If it is, then the plugin is valid for use
		 * on that site.
		 */
		function is_valid_for_use(){
			//return in_array(get_woocommerce_currency, $this->allowedCurrencies);
			return true;
		}

		/**
		 * This function extends this gateways parent class admin_options() function.
		 * If the plugin is valid for use, then the parent class's admin_options function will be used.
		 * If not, then an error message will be translated if necessary and displayed using the 
		 * _e(string_to_be_translated, translation_domain) function.
		 */
		function admin_options(){
			if( $this->is_valid_for_use() ){
				parent::admin_options();	
			} else{
				?>
					<div class='notice error is-dismissible'>
						<p> <?php _e('Paymo does not support the currency in use(selected currency), '. get_woocommerce_currency() . ' !', 'my-text-domain') ?> </p>
					</div>
				<?php
			}
		}

		// VALIDATE FORM FIELDS
		// We have to create a method with “validate_” prefix and “_field” postfix
		// to the field name you want to validate. validate_{field_name}_field();

		/**
		 * We will allow our payment gateway plugin in limited countries.
		 * To achieve this, we will have to perform a couple of checks 
		 * in order to confirm that the store country is supported by our plugin.
		 * 
		 * This function checks if the  country matches the currency supported in that country
		 */
		public function validate_country_code_field( $key, $value){
			if( $this->validate_currency_with_country($value) ){
			  return $value;
			} else{
				?>
					<div class="notice error is-dismissible" >
						<p> <?php _e( 'Paymo does not support ' . get_woocommerce_currency() . ' for the selected country! ' . $this->validate_currency_with_country($value) . '. Selected value: ' . $value, 'my-text-domain' ); ?> </p>
					</div>
				<?php
			}
		}

		/**
		 * This function checks if the  country matches the currency supported in that country
		 */
		private function validate_currency_with_country ($value) {
			$status = false;
			switch($value){
				case "CL":
					$status = get_woocommerce_currency() == 'CLP';
					break;
				case "DE":
					$status = get_woocommerce_currency() == 'EUR';
					break;
				case "SE":
					$status = get_woocommerce_currency() == 'SEK';
					break;
				case "NO":
					$status = get_woocommerce_currency() == 'NOK';
					break;
				case "FI":
					$status = get_woocommerce_currency() == 'EUR';
					break;
				case "ZM":


					// ALLOW both ZMW and USD in Zambia
					if(get_woocommerce_currency() == 'ZMW' || get_woocommerce_currency() == 'USD'){
						$status = true;	
					}

					break;
			}
			return $status;
		}

		/**
		 * Display Paymo Direct Payment Gateway payment fields
		 */
		public function payment_fields(){
			$paymo_instructions = 'Enter the phone number you will use to make the mobile money transfer';
			ob_start(); 	//store output data in a buffer before outputing to the screen
			?>
				<fieldset class='paymo paymo_form_fields'>
					<p class="paymo_description"> <?php esc_html_e( $this->description, 'wc-gateway-paymo-direct' ) ?> </p>
					<div class='paymo payment_fields form_data'>
						<label class='paymo_phone_label required' for='paymo_phone'>
							<?php esc_html_e('Mobile Money Phone Number', 'wc-gateway-paymo-direct'); ?> 
						</label>
						<input class='paymo_phone' inputmode='numeric' id='paymo_phone' aria-label='paymo_phone' autocomplete='false' 
						type='number' name='paymo_phone' autocorrect='false' placeholder='Enter your mobile money phone number' >
					</div>
				</fieldset>
			<?php

			ob_end_flush(); 	//empty and destroy the buffer to free the memory allocated to it
		}
	
		/**
		 * Once we have validated all the fields and plugin
		 * compatibility with Woocommerce, we will have to create
		 * a session for payment platform and redirect the user
		 * to that platform. In this session, we will send complete
		 * information of the order.
		 * process_payment($order_id); is called when a user clicks 
		 * on Place an order on Checkout Page.
		 * 
		 * We wil override this in our plugin and get the result of 
		 * success and redirect in an array.
		 *
		 * @param int $order_id
		 * @return array
		 */
		public function process_payment( $order_id ) {
			//global $woocommerce;

			// receive order
			$order = wc_get_order($order_id);

			//$this->customer_paymo_phone = $_POST['paymo_phone'];

			// save the paymo mobile money phone number as a new order meta data
			//$order->update_meta_data('paymo_phone', $this->customer_paymo_phone);

			// update order status
			$order->update_status('on-hold', __('Awaiting Paymo Payment', 'wc-gateway-paymo-direct'));
			
			// reduce level of the stock this order belongs to
			$order->reduce_order_stock();

			// empty cart, since this specific order cart has began processing already
			wc()->cart->empty_cart();

			return array(
				'result' 	=> 'success',
				'redirect' 	=> $this->get_return_url( $order )
			);

			// // order amount
			// $amount = $order->get_total();

			// // currency
			// $currency = get_woocommerce_currency();

			// // user id and order details
			// $merchantCustomerId = $order->get_user_id();
			// $merchantOrderId 	= $order->get_order_number();
			// $orderIdString 		= '?orderId=' . $order_id;
			// $transaction		= array( 'amount' => $amount, 'currency' => $currency );
			// $transactions		= array( $transaction );

			// Create a session and send it to Payment platform while handling errors 
			// The following variables are necessary to setup the request to be sent in json format

			// The request's body data
			// $requestBody = array(
			// 	'country' 				=> $this->country_code,
			// 	'merchantId' 			=> $this->merchant_id,
			// 	'transactions'			=> $transactions,
			// 	'redirectOnSuccessUrl'	=> $this->siteUrl . $this->SUCCESS_REDIRECT_URL . $orderIdString,
			// 	'redirectOnFailureUrl'	=> $this->siteUrl . $this->FAILURE_REDIRECT_URL . $orderIdString,
			// 	'callbackOnSuccessUrl'	=> $this->siteUrl . '//wc-api/' . $this->SUCCESS_CALLBACK_URL . $orderIdString,
			// 	'callbackOnFailureUrl'	=> $this->siteUrl . '//wc-api/' . $this->FAILURE_CALLBACK_URL . $orderIdString,
			// 	'redirectTarget'		=> 'TOP',
			// 	'merchantCustomerId'	=> $merchantCustomerId,
			// 	'merchantOrderId'		=> $merchantOrderId
			// );

			// // The request's header information
			// $header = array( 
			// 	'Authorization' => $this->auth_token,
			// 	'Content-Type' 	=> 'application/json' 
			// );

			// // The request's arguments assembled
			// $args = array(
			// 	'method'	=> 'POST',
			// 	'headers'	=> $header,
			// 	'body'		=> json_encode( $requestBody )
			// );

			// // The Url to which data will be sent
			// $apiUrl = $this->api_host . $this->API_SESSION_CREATE_ENDPOINT;

			// // Send the request and save the response
			// $repsonse = wp_remote_post( $apiUrl, $args);

			// handle errors and process the response obtained
			// and update order meta_data
			// if(!is_wp_error($repsonse)){
			// 	$body = json_decode($response['body'], true);
			// 	if($body['status'] == 'OK'){
			// 		$sessionId = $body['payload']['sessionId'];
			// 		$url = $body['payload']['url'];
			// 		$order->update_meta_data( 'Paymo_session_id', $sessionId);
			// 		$session_note = 'Paymo SessionID: ' . $sessionId;
			// 		$order->add_order_note($session_note);

			// 		// this is a call to the database to update the order's (post's) meta data
			// 		update_post_meta($order_id, '_session_id', $sessionId);

			// 		$order->update_status('processing');

			// 		return array(
			// 			'result' => 'success',
			// 			'redirect'	=> $url
			// 		);
			// 	} else{ // body['status'] !== 'OK'
			// 		wc_add_notice('Please try again', 'error');
			// 		return;
			// 	}
			// }else{ // is_wp_error(response). -- if it is a wordpres error
			// 	wc_add_notice('Connection error', 'error');
			// 	return;
			// }
		}

		/**
		 * SUCCESS CALLBACK
		 * payment_success() function is called to get the success
		 * response from Payment Gateway Platform. Data is fetched
		 * in a file. To make this data usable, we will store the
		 * data in a variable by using file_get_content(); This response
		 * is in encoded form, we will decode response using json_decode();
		 * and store it in a variable. Now we have complete order
		 * information, which can be used to update the metadata.
		 */
		// Public function payment_success(){
		// 	// Getting POST data
		// 	$postData 	= file_get_contents('php://input');
		// 	$response 	= json_decode($postData);
		// 	$oderId 	= $_GET['orderId']; 				//this is gotten from the successCallbackUrl
		// 	$order		= wc_get_order($orderId);

		// 	// update meta data once the order and the response are successfully retrieved 
		// 	if($order && $response){
		// 		$order->update_meta_data('Paymo_callback_payload', $postData);
		// 		if( $response->event === 'CHECKOUT_SUCCEEDED' ){
		// 			$order->update_meta_data('Paymo_callback_event', $response->event);
		// 			if($reponse->payload->reservations && $response->payload->reservations[0] && $response->payload->reservations[0]->reservationsId){
		// 				$order->update_meta_data('Paymo_reservations_id', $response->payload->reservations[0]->reservationsId);
		// 				$reservation_note = 'Paymo ReservationID: ' . $response->payload->reservations[0]->reservationsId;
		// 				$order->add_order_note($reservation_note);
		// 				update_post_meta( $orderId, '_Paymo_reservation_id', $response->payload->reservations[0]->reservationsId );
		// 			}
		// 			$order->update_status( 'completed');
		// 			$order->payment_complete();
		// 			$order->reduce_order_stock();
		// 		}else { // CHECKOUT UNSUCCESSFULL
		// 			$order->update_meta_data( 'Paymo_event', $response->event);
		// 			if($reponse->payload->reservations && $response->payload->reservations[0] && $response->payload->reservations[0]->reservationsId){
		// 				$order->update_meta_data('Paymo_reservations_id', $response->payload->reservations[0]->reservationsId);
		// 			}
		// 			$order->update_status('failed');

		// 		}
		// 	}
			
		// }

		/**
		 * FAILURE CALLBACK
		 * payment_success() function is called to get the success
		 * response from Payment Gateway Platform. Data is fetched
		 * in a file. To make this data usable, we will store the
		 * data in a variable by using file_get_content(); This response
		 * is in encoded form, we will decode response using json_decode();
		 * and store it in a variable. Now we have complete order
		 * information, which can be used to update the metadata.
		 */
		// Public function payment_failure(){
		// 	// Getting POST data
		// 	$postData 	= file_get_contents('php://input');
		// 	$response 	= json_decode($postData);
		// 	$oderId		= $_GET['orderId'];
		// 	$order		= wc_get_order($orderId);

		// 	// update meta data once the order and the response are successfully retrieved 
		// 	if($order && $response){
		// 		$order->update_meta_data('Paymo_callback_payload', $postData);
		// 		$order->update_meta_data('Paymo_event', $reponse->event);
		// 		if($reponse->payload->reservations && $response->payload->reservations[0] && $response->payload->reservations[0]->reservationsId){
		// 			$order->update_meta_data('Paymo_reservations_id', $response->payload->reservations[0]->reservationsId);
		// 		}
		// 		$order->update_status('failed');
		// 	}
		// }

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


  } // end \WC_Gateway_Paymo Direct class
}