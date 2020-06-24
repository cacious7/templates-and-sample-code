=== Shipping Zones by Drawing for WooCommerce ===
Contributors: arosoft
Donate link: https://paypal.me/arosoftdonate
Tags: shipping, restrict, radius, zone, area, woocommerce, map, draw, delivery
Requires at least: 5.0
Tested up to: 5.3
Stable tag: 2.0.7
Requires PHP: 7.0
License: GPL v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Shipping Zones by Drawing opens the possibility to draw your own shipping areas in WooCommerce.
By delegate a drawn shipping area to a WooCommerce shipping method you can define a shipping cost to every zone.

It is also possible to limit shipping methods by a transportation radius from your store location.


== Description ==

Shipping Zones by Drawing opens the possibility to draw your own shipping areas into a map and use them with WooCommerce. You will no more be limited by zip code level when defining a shipping zone.
By connecting a drawn shipping area to a WooCommerce shipping method you can define a shipping cost to every zone.
It is also possible to restrict shipping methods by a distance radius from your store location.

To get knowledge of WooCommerce shipping zones and methods, we recommend a visit to the [the WooCommerce Shipping Zones Documentation](https://docs.woocommerce.com/document/setting-up-shipping-zones/). Remember that the drawn shipping areas will be added as shipping methods into WooCommerce.
If you are experiencing problems with the address validation for your country on the checkout page, please report it in the forum.

To use the plugin with extended functionality, there is a [premium version](https://arosoft.se/product/shipping-zones-drawing-premium/) available.



== Installation ==

1. After activation, go to WooCommerce -> Settings -> Shipping Zones by Drawing.
2. You will need to enter a Google Maps API Key.(Maps JavaScript API, Places API, Geocoding API, Directions API)
3. Now, go to WooCommerce -> Shipping Zones by Drawing and draw a shipping zone.

Now you are ready to setup your WooCommerce shipping zones and methods at WooCommerce -> Settings -> Shipping.
Add your drawn shipping area as a WooCommerce Shipping Method into a WooCommerce Shipping Zone.

Remember that WooCommerce always chooses the first WooCommerce shipping zone that match an address. So remember to put all your drawn shipping methods per country / region / postal code in the same WooCommerce shipping zone.

To get knowledge of WooCommerce shipping zones and methods, we recommend a visit to [WooCommerce Shipping Zones Documentation](https://docs.woocommerce.com/document/setting-up-shipping-zones/)

That is all.

== Frequently Asked Questions ==

= Why doesn't my drawn shipping methods show up at checkout? =

Remember that WooCommerce always chooses the first shipping zone that match an address. So remember to put all your drawn shipping methods per country / region / postcode in the same shipping zone.
= Is it possible to add more than one zone? =

Yes, five zones. But you draw as many you like with the premium version of the [Shipping Zones by Drawing](https://arosoft.se/product/shipping-zones-drawing-premium/).

= Which APIs of Google is needed ? =

Your Google API key needs the Maps JavaScript API, Places API, Geocoding API, Directions API .

= Is there any way to display a delivery map to customers? =

Yes, use shortcode [szbd ids="id1,id2" title="Delivery Zones" color="#c87f93"] to display a delivery map.
 The arguments are:
 ids - a list of drawn maps by post ids (required)
 title - the maps title to display above the map (optional)
 color - color of the delivery zones polygons (optional)


== Changelog ==

= 2.0.7 =

Bug fix: rounding rates

= 2.0.6 =

Added column in edit to show post ids.

= 2.0.5 =

Added shortcode [szbd] to display drawn delivery zones front end.
Example [szbd ids="post_id1,post_id2" title="Delivery Zones" color="#c87f93"]

= 2.0.4 =

Better compatibility when checkout is done stepwise (with external plugins)
Better compatibility with addresses in Angola

= 2.0.3.2 =

Better compatibility with checkout form where some fields are disabled

= 2.0.3.1 =

Better compatibility with addresses in Russia

= 2.0.3 =

Further improved backwards compatibility with shipping methods created prior to version 2.0.0
Better checkout perfomance.

= 2.0.2 =

Improved backwards compatibility with shipping methods created prior to version 2.0.0

= 2.0.0 =

* MAJOR UPDATE,  CHECK & SAVE SETTINGS BEFORE YOU GO LIVE

* Updated core for better performance.
* Ability to limit shipping by a radius distance from the store address.
* Ability to choose the tax status of the shipping cost.
* Ability to choose title of shipping methods shown at checkout.

= 1.1.4 =

* Better compatibility for addresses in Romania.
* Improved address validation.

= 1.1.3 =

* Better compatibility for addresses in Canada.

= 1.1.2 =

* Fix: Version control of javascript files


= 1.1.1 =

* Bug fix not showing shipping methods at checkout correctly

= 1.1.0.1 =

* Bug fix

= 1.1.0 =

* Possibility to draw up to 5 zones.

= 1.0.10 =

* Better compatibility for addresses in Israel.

= 1.0.8.1 =

* Minor javascript fix

= 1.0.8 =

* Added option to hide shipping cost at cart page.
* Visual improvement of the checkout page behavior.

= 1.0.7 =
* Javascript bugfix at checkout

= 1.0.6 =
* Enabled map drawing with more than 4 coordinates

= 1.0.5 =
* Added option to disable Google Maps API script loading

= 1.0.4 =
* Improved compability for network installation (multisite)

= 1.0.3 =
* Bug fix: Edit link from settings page

= 1.0.2 =

* Bug fix: file path reference

= 1.0.1 =

* Bug fixes

= 1.0.0 =

* Initial release

== Screenshots ==

1. Draw your shipping zone

2. At checkout

3. Add as shipping method

4. Add your delivery map to a shipping method
