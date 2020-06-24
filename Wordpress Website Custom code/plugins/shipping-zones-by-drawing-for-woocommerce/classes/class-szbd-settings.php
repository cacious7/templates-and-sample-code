<?php
if (!defined('ABSPATH'))
  {
  exit;
  }
if (!class_exists('SZbD_Settings')):
  function SZbD_Add_Tab()
    {
    class SZbD_Settings extends WC_Settings_Page
      {
      public function __construct()
        {
        $this->id    = 'szbdtab';
        $this->label = __('Shipping Zones by Drawing', '');
        add_filter('woocommerce_settings_tabs_array', array(
          $this,
          'add_settings_page'
        ), 20);
        add_action('woocommerce_settings_' . $this->id, array(
          $this,
          'output'
        ));
        add_action('woocommerce_settings_save_' . $this->id, array(
          $this,
          'save'
        ));
        add_action('woocommerce_sections_' . $this->id, array(
          $this,
          'output_sections'
        ));
        add_action('woocommerce_admin_field_szbdtab', array(
          $this,
          'szbdorder_admin_field_szbdtab'
        ));
        add_filter('woocommerce_admin_settings_sanitize_option', array(
          $this,
          'sanitize_callback'
        ), 10, 3);
        add_action('woocommerce_admin_field_szbd_show_test', array(
                    $this,
                    'szbd_admin_field_szbd_show_test'
                ));
        }
         public function szbd_admin_field_szbd_show_test() {

?>
 <style>

      #szbd_map {

        width: 100%;
       }
       .szbd-heading{
        font-size: large;
        color: green;
       }
       .szbd-heading-fail{
        font-size: large;
        color: red;
       }
    </style>
       <button type="button" class="button-secondary" id="szbd-test-address">Test Store Address</button>
       <div class="szbd-admin-map">
       <span id="szbd-test-result">


       </span>
       <div id="szbd_map" style></div>
       </div>


    <?php
         }
      public function get_sections()
        {
        $sections = array(
          '' => __('Settings', ''),
          'second' => __('Draw Shipping Zones', '')
        );
        return apply_filters('woocommerce_get_sections_' . $this->id, $sections);
        }
      public function sanitize_callback($value, $option, $raw_value)
        {
        return $value;
        }
      public function save()
        {
        global $current_section;
        $settings = $this->get_settings($current_section);
        WC_Admin_Settings::save_fields($settings);
        }
      public function output()
        {
        global $current_section;
        $settings = $this->get_settings($current_section);
        WC_Admin_Settings::output_fields($settings);
        }
      public function get_settings($current_section = '')
        {
        if ('second' == $current_section)
          {
          wp_safe_redirect('edit.php?post_type=szbdzones');
          }
        else
          {

            if(plugin_basename(__FILE__) == "shipping-zones-by-drawing-premium/classes/class-szbd-settings.php"){
          include(plugin_dir_path(__DIR__) . 'includes/start-args-prem.php');
            }else{
                 include(plugin_dir_path(__DIR__) . 'includes/start-args.php');
            }
          $settings = apply_filters('szbd_section1_settings', $settings_args);
          }
        return apply_filters('woocommerce_get_settings_' . $this->id, $settings, $current_section);
        }
      public function szbdorder_admin_field_szbdtab($value)
        {
        }
      }
    return new SZbD_Settings();
    }
  add_filter('woocommerce_get_settings_pages', 'SZbD_Add_Tab', 15);
endif;
