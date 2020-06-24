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
 * Copyright: (c) 2019 Paymo Direct, (cacious@gulait.com) and WooCommerce
 *
 * License: GNU General Public License v3.0
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 *
 * @package   WC-Gateway-Paymo-Direct
 * @author    Paymo Direct
 * @category  Admin
 * @copyright Copyright: (c) 2019 Paymo Direct, (cacious@gulait.com) and WooCommerce
 * @license   http://www.gnu.org/licenses/gpl-3.0.html GNU General Public License v3.0
 *
 * This paymo direct gateway forks the WooCommerce core "Cheque" payment gateway to create a mobile payment method.
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
		// PRIVATE variable
		private $thankyou_page_url = '';

		/**
		 * Constructor for the gateway.
		 */
		/**
		 * These are the 5 required variables that have to be setup for the gateway
		 */
		public function __construct() {
	  
			$this->id                 = 'paymo_direct_gateway';
			$this->icon               = apply_filters('woocommerce_paymo_direct_icon', ''); //this one is optional
			$this->has_fields         = true; //this one needs to be true if we want our gateway to have firlds such as  cc fields
			$this->method_title       = __( 'Paymo_Direct', 'wc-gateway-paymo-direct' ); //the title of the payment method for the admin page
			$this->method_description = __( 'Allows payments using telcom networks. Currently well suppoorted for Zambia-based airtel, MTN and Zamtel.', 'wc-gateway-paymo-direct' );
		  
			
			/**LOAD THE SETTINGS
			 * Once we’ve set these variables, the constructor 
			 * will need a few other functions. We’ll have to 
			 * initialize the form fields and settings.
			 */
			$this->init_form_fields();
			$this->init_settings();
		  
			// After calling the above function. We then load the variables that have been set by the user
			$this->title        	= $this->get_option( 'title' );
			$this->description  	= $this->get_option( 'description' );
			$this->instructions 	= $this->get_option( 'instructions', $this->description );
			$this->merchant_phone 	= $this->get_option('merchant_phone');
		  
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
	  
			$this->form_fields = apply_filters( 'wc_paymo_direct_form_fields', array(
		  
				'enabled' => array(
					'title'		=> __( 'Enable/Disable', 'wc-gateway-paymo-direct' ),
					'type'    	=> 'checkbox',
					'label'   	=> __( 'Enable Paymo Direct Payment', 'wc-gateway-paymo-direct' ),
					'default' 	=> 'yes'
				),
				
				'title' => array(
					'title'			=> __( 'Title', 'wc-gateway-paymo-direct' ),
					'type'        	=> 'text',
					'description' 	=> __( 'This controls the title for the payment method the customer sees during checkout.', 'wc-gateway-paymo-direct' ),
					'default'     	=> __( 'Paymo Direct Payment', 'wc-gateway-paymo-direct' ),
					'desc_tip'    	=> true,
				),
				
				'description' => array(
					'title'       	=> __( 'Description', 'wc-gateway-paymo-direct' ),
					'type'        	=> 'textarea',
					'description' 	=> __( 'Payment method description that the customer will see on your checkout.', 'wc-gateway-paymo-direct' ),
					'default'     	=> __( 'Please remit payment to Store Name upon pickup or delivery.', 'wc-gateway-paymo-direct' ),
					'desc_tip'    	=> true,
				),
				
				'instructions' => array(
					'title'       	=> __( 'Instructions', 'wc-gateway-paymo-direct' ),
					'type'        	=> 'textarea',
					'description' 	=> __( 'Instructions that will be added to the thank you page and emails.', 'wc-gateway-paymo-direct' ),
					'default'     	=> '',
					'desc_tip'    	=> true,
				),
				'merchant_phone' => array(
					'title'			=> __( 'Merchant Phone', 'wc-gateway-paymo-direct' ),
					'type'			=> 'textarea',
					'description'	=> __( 'Phone number that your customers will pay to via mobile money', 'wc-gateway-paymo-direct' ),
					'desc_tip'		=> true	
				)
			) );
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
							<span style="color: red;">*</span>
						</label>
						<input class='paymo_phone' inputmode='numeric' id='paymo_phone' aria-label='paymo_phone' autocomplete='false' 
						type='number' name='paymo_phone' autocorrect='false' placeholder='Enter your mobile money phone number' required >
					</div>
				</fieldset>
			<?php

			ob_end_flush(); 	//empty and destroy the buffer to free the memory allocated to it
		}
	
	
		/**
		 * Process the payment and return the result
		 *
		 * @param int $order_id
		 * @return array
		 */
		public function process_payment( $order_id ) {
			// receive order
			$order = wc_get_order( $order_id );

			// get the customer paymo mobile money phone number
			$this->CUSTOMER_PAYMO_PHONE = $_POST['paymo_phone'];

			// Process the field (validation)
			if (isset($this->CUSTOMER_PAYMO_PHONE) && empty($this->CUSTOMER_PAYMO_PHONE) ){
				wc_add_notice( __( 'Please enter your "mobile money phone number" below (at the bottom of this page).' ), 'error' );

				return;//exit the payment process
			}

			// save the paymo mobile money phone number as a new order meta data
			$order->update_meta_data('paymo_phone', $this->CUSTOMER_PAYMO_PHONE);
			
			// Mark as on-hold (we're awaiting the payment)
			$order->update_status( 'on-hold', __( 'Awaiting paymo direct payment', 'wc-gateway-paymo-direct' ) );
			
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

		/**
		 * Output the payment instructions html elements
		 */
		public function html_payment_instructions($order, $caller_function){
			// get he customer paymo phone number
			$customer_paymo_phone = $order->get_meta('paymo_phone');

			// First check if instructions have been already set
			if ( $this->instructions ) {
				// start buffer
				ob_start();

				?>
					<header>
						<h2 class="entry-title paymo_instructions_title"> <?php echo wpautop( wptexturize( 'To Complete Payment' )); ?> </h2>
					</header>
					<div class="paymo_instructions thankyou_page customer_notice">
						<div class="paymo_instructions_container">
							<p class="paymo_instructions"> <?php echo wpautop( wptexturize( $this->instructions)); ?> </p>
							<div class="customer_notice_container">
								<br>
								<i class="customer_notice"> <?php echo wpautop( wptexturize( '*Please only use this number to pay for this order.' )); ?></i>
								
								<?php if( $caller_function == 'thankyou_page' ){ //If email is not recieved ?>
									<i class="customer_notice"> <?php echo wpautop( wptexturize( "*Order email not recieved? Check your SPAM folder or call us on 0975670360." )); ?></i>
									<br>
								<?php } ?>
							</div>
						</div>
						<div class="paymo_related_phones_container">
							<div class="paymo_customer_phone_container">
								<p class="paymo_customer_phone"> <?php echo wpautop( wptexturize( 'Your mobile money phone number is: ')); ?> 
								<span class="paymo_customer_phone"> <?php echo wpautop( wptexturize( $customer_paymo_phone )); ?> </span> </p>
							</div>
							<div class="paymo_merchant_phone_container">
								<p class="paymo_merchant_phone"> <?php echo wpautop( wptexturize( 'Make payment to this phone number: ')); ?> 
								<span class="paymo_merchant_phone"> <?php echo wpautop( wptexturize( $this->merchant_phone )); ?> </span> </p>
							</div>
						</div>
					</div>
				<?php
				ob_end_flush();
			}
			else {
				// Instructions have not been set
				echo wpautop( wptexturize( 'Instructions have not been set. Please contact support.' ));
			}
		}

			
		/**
		 * Output for the order received page.
		 */
		public function thankyou_page($order_id) {
			// get order from id
			$order = wc_get_order($order_id);
			
			// Output the payment instructions html elements
			$this->html_payment_instructions($order, 'thankyou_page');
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
				
				?> <br> <?php
				
				$this->html_payment_instructions($order, 'email_instructions');
				
				?> <br> <?php

				/*
				?> <br><a href=<?php echo wpautop( wptexturize($this->get_return_url($order) )); ?> >
				 <?php echo wpautop( wptexturize("Click Here for instructions on how "))?> <strong> <?php echo wpautop( wptexturize("TO COMPLETE YOUR ORDER."))?> </strong>
				  </a><br>
				<?php
				*/
			}
		}
	
  } // end \WC_Gateway_Paymo_Direct class
}