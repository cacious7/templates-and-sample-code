<?php 

function ya_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );

}

add_action( 'wp_enqueue_scripts', 'ya_enqueue_styles' );

 
function remove_admin_bar() {
    if (!current_user_can('administrator') && !is_admin()) {
        show_admin_bar(false);
    }
}

//remove admin bar for everyone but admin
add_action('after_setup_theme', 'remove_admin_bar');

function custom_javascript() {
    // DESKTOP JS
    if(!wp_is_mobile()){
        enqueue_generic_desktop_app_js();
        enqueue_about_page_js();
    }
    // MOBILE JS
    else{
        enqueue_generic_mobile_app_js();
        enqueue_about_page_js();
    }
}

//DEFAULT JS FILE - GENERIC - DESKTOP
//this is the generic file which is loaded on most pages and left out on some
function enqueue_generic_desktop_app_js(){
    if( !is_page( 'about-us' ) ){
        wp_enqueue_script('app.js', get_stylesheet_directory_uri().'/js/desktop/app.js', array('jquery'), '1', true);
    }
}

//DEFAULT JS FILE - GENERIC - MOBILE
//this is the generic file which is loaded on most pages and sometimes left out on some
function enqueue_generic_mobile_app_js(){
    if( !is_page( 'about-us' ) ){
        wp_enqueue_script('app.js', get_stylesheet_directory_uri().'/js/mobile/app.js', array('jquery'), '1', true);
        
    }
}

//ABOUT PAGE JS
//only run this script on the about-us (slug) page
function enqueue_about_page_js(){
    if( is_page( 'about-us' ) ){
        wp_enqueue_script( 'aboutPage.js', get_stylesheet_directory_uri().'/js/aboutPage/index.js', array('jquery'), '1', true );
        
        //localize the script
        $Param = array(
            'sliderUrl' => admin_url( 'admin-ajax.php?action=handle_about_page_slider_request' ),
            'fbReviewsUrl' => admin_url( 'admin-ajax.php?action=handle_fb_Reviews_request' ),
            'nonce' => wp_create_nonce( 'about_page_nonce' )
        );

        wp_localize_script( 'aboutPage.js', 'Param', $Param ); // the handle should be that of a js file going to the same front-end
    }
}

//code that runs when js event is triggered
//dont forget to stop execution afterwards
//adding the about us cover using the revolution slider's shortcode
function handle_ajax_shortcode($nonce_name, $nonce_identifier, $shortcode){
    //first check if nonce exists
    check_ajax_referer( $nonce_name, $nonce_identifier );

    $rev_slider = do_shortcode( $shortcode, false );

    echo $rev_slider;

    wp_die();
}

function handle_about_page_slider_request() {
    $nonce_name = 'about_page_nonce';
    $nonce_identifier = '_ajax_nonce';
    $shortcode = '[rev_slider alias="cinematic-slider1"][/rev_slider]';
    handle_ajax_shortcode($nonce_name, $nonce_identifier, $shortcode);
}

//handle the slider request
function handle_fb_Reviews_request() {
    $nonce_name = 'about_page_nonce';
    $nonce_identifier = '_ajax_nonce';
    $shortcode = '[wprevpro_usetemplate tid="1"]';
    handle_ajax_shortcode($nonce_name, $nonce_identifier, $shortcode);
}

//enques js scripts for various pages
add_action('wp_enqueue_scripts','custom_javascript');

//executes action for non logged in users - returns the about page slider
add_action( 'wp_ajax_nopriv_handle_about_page_slider_request', 'handle_about_page_slider_request' );

//executes action for logged in users - returns the about page slider
add_action( 'wp_ajax_handle_about_page_slider_request', 'handle_about_page_slider_request' );

//returns the fb reviews
add_action( 'wp_ajax_nopriv_handle_fb_Reviews_request', 'handle_fb_Reviews_request' );
//returns the fb reviews
add_action( 'wp_ajax_handle_fb_Reviews_request', 'handle_fb_Reviews_request' );


