<?php

/**
 * Plugin Name: Mobile Detect
 * Plugin URI: https://www.tinywp.in/wp_is_mobile-exclude-ipad/
 * Author: Pothi Kalimuthu
 * Author URI: https://www.tinywp.in/
 * Version: 1.1.3
 * Description: Excludes tablets, such as iPad, from being detected as mobile in wp_is_mobile!
 */

defined('ABSPATH') or die('No direct access allowed!');

if( ! class_exists( 'TinyWP_Mobile_Detect' ) )
    require_once( __DIR__ . '/inc/TinyWP_Mobile_Detect.php' );

$pothikalimuthu_mobile_detect = new TinyWP_Mobile_Detect;

if( $pothikalimuthu_mobile_detect->isMobile() && !$pothikalimuthu_mobile_detect->isTablet() ) 
    add_filter( 'wp_is_mobile', '__return_true' );
else
    add_filter( 'wp_is_mobile', '__return_false' );
