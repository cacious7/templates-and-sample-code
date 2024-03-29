<?php
/**
 * Single Product Share
 *
 * Sharing plugins can hook into here or you can add your own code directly.
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/share.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you (the theme developer).
 * will need to copy the new files to your theme to maintain compatibility. We try to do this.
 * as little as possible, but it does happen. When this occurs the version of the template file will.
 * be bumped and the readme will list any important changes.
 *
 * @see 	    http://docs.woothemes.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     3.5.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
$sidebar = ya_options() -> getCpanelValue('sidebar_product');
$pdetail_layout = ya_options() -> getCpanelValue('pdetail_layout');
?>
<?php if ($pdetail_layout == 'default') { ?>
<?php do_action( 'woocommerce_share' ); // Sharing plugins can hook into here ?>
<?php }else { ?>
<div class="social-icon">
<div class="social-icon-button"></div>
<?php do_action( 'woocommerce_share' ); // Sharing plugins can hook into here ?>
  <?php get_social(); ?>
</div>
<?php } ?>