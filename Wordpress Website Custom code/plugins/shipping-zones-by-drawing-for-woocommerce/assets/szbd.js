jQuery(document).ready(function($) {
	var error_type = [];
	var the_response;
	init_updated();

	function init_updated() {
		jQuery('body').off('updated_checkout.my2').on('updated_checkout.my2', function(e) {
			update();
			jQuery('.szbd_message').remove();
		});
	}



	function end(address_string) {

		
		if (jQuery('#shipping_method li[szbd="true"]').size() === 0 && jQuery('#shipping_method li').not('#shipping_method li[szbd="true"]').not('#shipping_method li[szbd="false"]').size() === 0) {

			if (error_type.length !== 0) {
				jQuery('#shipping_method').append('<span class="szbd_message">' + error_type[0] + '</>');
			} else {
				jQuery('#shipping_method').append('<span class="szbd_message">' + szbd.checkout_string_1 + '</>');
			}
			jQuery('#place_order').prop('disabled', true);
		} else {
			jQuery('#place_order').prop('disabled', false);
		}
		// To develop in future versions
		/*
		var selected_method = jQuery('input[type=radio]:checked', '#shipping_method').val();
		 if(selected_method.includes('szbd'))
		 {
			jQuery('.woocommerce-shipping-totals.shipping').after('<tr><th>' + 'Shipping Address' + '</th><td>'+ address_string + '</td></tr>');
		 }*/
	}

	function indexOfMax(arr) {
		if (arr.length === 0) {
			return -1;
		}
		var max = arr[0];
		var maxIndex = 0;
		for (var i = 1; i > arr.length; i++) {
			if (arr[i] < max) {
				maxIndex = i;
				max = arr[i];
			}
		}
		return maxIndex;
	}

	function update() {
		jQuery('.szbd-debug').remove();
		//jQuery('#shipping_method').fadeOut();
		jQuery('table.woocommerce-checkout-review-order-table').addClass('processing').block({
			message: null,
			overlayCSS: {
				background: '#fff',
				opacity: 0.6
			}
		});
		var data = {
			'action': 'check_address_2',
		};
		$.post(
			woocommerce_params.ajax_url,
			data,
			function(response) {
				the_response = response;
				if ((the_response.status === true) && !(the_response.szbd_zones === null || the_response.szbd_zones === undefined || the_response.szbd_zones.length == 0)) {
					var ok_types = [];
					var country = $('#billing_country').val();
					var state;
					if ($('#billing_state').val()) {
						state = $('#billing_state').val();
					}
					var postcode = $('input#billing_postcode').val();
					var s_company = $('input#billing_company').val() + ',';
					var city = $('#billing_city').val();
					var address = $('input#billing_address_1').val();
					var address_2 = $('input#billing_address_2').val();
					var s_country = country;
					var s_state = state;
					var s_postcode = postcode;
					var s_city = city;
					var s_address = address;
					var s_address_2 = address_2;
					if ($('#ship-to-different-address').find('input').is(':checked')) {
						s_country = $('#shipping_country').val();
						if ($('#shipping_state').val()) {
							s_state = $('#shipping_state').val();
						}
						s_postcode = $('input#shipping_postcode').val();
						s_company = $('input#shipping_company').val() + ',';
						s_city = $('#shipping_city').val();
						s_address = $('input#shipping_address_1').val();
						s_address_2 = $('input#shipping_address_2').val();
					}
					var comp;

					var postcode_ = s_postcode !== undefined ? s_postcode.replace(" ", "") : '';
					if (s_country == 'IL') {
						s_address = s_address + ',' + s_address_2 + ',' + s_city + ' ' + s_postcode;
						comp = {
							country: s_country,
							administrativeArea: s_city,
							locality: s_city,
						};

					} else if (s_country == 'CA') {
						s_address = s_address + ',' + s_address_2 + ',' + s_city + ' ' + s_postcode + ',' + s_state;
						comp = {
							country: s_country,
							administrativeArea: s_state
						};
						if(s_state === undefined){
								delete comp.administrativeArea;
							}
					} else if (s_country == 'RO') {
						s_address = s_address + ',' + s_address_2 + ',' + s_city + ' ' + s_postcode + ',' + s_state;
						comp = {
							country: s_country,
							administrativeArea: s_state,


						};
						if(s_state === undefined){
								delete comp.administrativeArea;
							}
					}else if (s_country == 'RU') {


						s_address = s_address + ',' + s_address_2 + ',' + s_city + ',' + s_state;
						comp = {
							country: s_country,
							administrativeArea: s_state,
							locality: s_city,
						};

							if(s_state === undefined){
								delete comp.administrativeArea;
							}
					}else if (s_country == 'AO') {


						s_address = s_address + ',' + s_address_2 + ',' + s_city + ',' + s_state;
						comp = {
							country: s_country,
							administrativeArea: s_state,
							locality: s_city,
						};

							if(s_state === undefined){
								delete comp.administrativeArea;
							}
							 ok_types = ["street_address", "subpremise", "premise", "route", "establishment"];
					} else {
						s_address = s_address + ',' + s_address_2 + ',' + s_city + ' ' + s_postcode + ',' + s_state;
						comp = {
							postalCode: postcode_,
							administrativeArea: s_state,
							country: s_country,
							locality: s_city
						};

						if(s_state === undefined){
								delete comp.administrativeArea;
							}
							if(s_postcode === undefined){
								delete comp.postalCode;
							}
							if(s_city === undefined){
								delete comp.locality;
							}
					}
					// Geocode the address
					var geocoder = new google.maps.Geocoder();
					geocoder.geocode({
						'address': /* s_company + */ s_address,
						'componentRestrictions': comp
					}, function(results, status) {
						if (szbd.debug == 1) {
							jQuery('.woocommerce-notices-wrapper:first-child').html('<div class="woocommerce-info szbd-debug"><h4>GEOCODE:</h4><br>' + JSON.stringify(results) + '</div>');
						}
						do_geolocation(results, status, google.maps.GeocoderStatus.OK, false, ok_types);
					});
				} else {
					jQuery('table.woocommerce-checkout-review-order-table').removeClass('processing').unblock();
					jQuery('#shipping_method').fadeIn();
				}
			}).then(function() {
		});
	}

	function do_geolocation(results, status, ok_status, has_address, ok_types) {
		var delivery_address;
		var drive_time_car_Promise = false;
		var drive_time_bike_Promise = false;
		var drive_dist_Promise = false;
		var bicycle_dist_Promise = false;
		var radius_Promise;
		var latitude;
		var longitude;
		if (has_address === false) {
			 ok_types = (!Array.isArray(ok_types) || !ok_types.length) ? ["street_address", "subpremise", "premise"] : ok_types;
			if (status === ok_status && findCommonElements(results[0].types, ok_types)) {
				latitude = results[0].geometry.location.lat();
				longitude = results[0].geometry.location.lng();
				delivery_address = results[0].geometry.location;
			} else {
				latitude = null;
				longitude = null;
				delivery_address = null;
			}
		} else {
			delivery_address = results;
			latitude = results.lat;
			longitude = results.lng;
		}
		if (the_response.store_address !== false) {
			radius_Promise = the_response.do_radius && delivery_address !== null ? calcRadius(delivery_address, the_response.store_address, true) : false;
		} else {
			radius_Promise = the_response.do_radius && delivery_address !== null ? calcRadius(delivery_address, szbd.store_address, false) : false;
		}
		$.when(drive_time_car_Promise, drive_time_bike_Promise, drive_dist_Promise, bicycle_dist_Promise, radius_Promise).then(function(driving_car, driving_bike, driving_dist, bicycling_dist, radius) {
			// Check if the custom delivery method is applicable
			if ((the_response.status === true) && !(the_response.szbd_zones === null || the_response.szbd_zones === undefined || the_response.szbd_zones.length == 0)) {
				var ok_methods = [];
				the_response.szbd_zones.forEach(function(element, index) {
					if (element.drawn_map !== false) {
						var path = [];
						for (i = 0; element.geo_coordinates !== null && i < (element.geo_coordinates).length; i++) {
							path.push(new google.maps.LatLng(element.geo_coordinates[i][0], element.geo_coordinates[i][1]));
						}
						var polygon = new google.maps.Polygon({
							paths: path
						});
						var location = new google.maps.LatLng((latitude), (longitude));
						var address_is_in_zone = google.maps.geometry.poly.containsLocation(location, polygon);
					} else if (element.max_radius !== false) {
						var max_radius = element.distance_unit == 'miles' ? element.max_radius.radius * 1609.344 : element.max_radius.radius * 1000;
						var max_ok = max_radius > radius && radius !== false;
						if (element.max_radius.bool && !max_ok) {
							error_type.push(szbd.checkout_string_3 + ' ' + element.max_radius.radius + element.distance_unit);
						}
					}
					var condition_0 = (typeof address_is_in_zone == 'undefined' || address_is_in_zone);
					var condition_1 = (typeof max_ok == 'undefined' || max_ok);
					var condition_2 = typeof max_driving_distance_ok == 'undefined' || max_driving_distance_ok;
					var condition_3 = typeof max_driving_time_car == 'undefined' || max_driving_time_car;
					var condition_4 = typeof max_driving_time_bike == 'undefined' || max_driving_time_bike;
					var ok;
					if (element.drawn_map.bool && !condition_0) {
						ok = false;
					} else if (element.max_radius.bool && !condition_1) {
						ok = false;
					} else if (element.max_driving_distance.bool && !condition_2) {
						ok = false;
					} else if (element.max_driving_time_car.bool && !condition_3) {
						ok = false;
					} else if (element.max_driving_time_bike.bool && !condition_4) {
						ok = false;
					} else if ((typeof address_is_in_zone !== 'undefined' && address_is_in_zone) ||
						(typeof max_ok !== 'undefined' && max_ok) ||
						(typeof max_driving_distance_ok !== 'undefined' && max_driving_distance_ok) ||
						(typeof max_driving_time_car !== 'undefined' && max_driving_time_car) ||
						(typeof max_driving_time_bike !== 'undefined' && max_driving_time_bike)
					) {
						ok = true;
					} else if (typeof address_is_in_zone == 'undefined' &&
						typeof max_ok == 'undefined' &&
						typeof max_driving_distance_ok == 'undefined' &&
						typeof max_driving_time_car == 'undefined' &&
						typeof max_driving_time_bike == 'undefined'
					) {
						ok = true;
					} else {
						ok = false;
					}
					if (!ok) {
						jQuery('#shipping_method li :input').filter(function() {
							return this.value == element.value_id;
						}).closest('li').attr('szbd',false).hide();
					} else {
						jQuery('#shipping_method li :input').filter(function() {
							return this.value == element.value_id;
						}).closest('li').attr('szbd',true).show();
					}
					if (index >= the_response.szbd_zones.length - 1) {
						jQuery('#shipping_method').fadeIn();
						jQuery('table.woocommerce-checkout-review-order-table').removeClass('processing').unblock();
						var adr = the_response.delivery_address_string;
						end(adr);
					}
				});
			} else {
				jQuery('table.woocommerce-checkout-review-order-table').removeClass('processing').unblock();
				jQuery('#shipping_method').fadeIn();
				var adr = the_response.delivery_address_string;
				end(adr);
			}
		}).done(function() {

			if ((  jQuery('#shipping_method li :input').not('#shipping_method li[szbd="false"] :input').is(":checked") !== true  ) && jQuery('#shipping_method li').length !== 1) {
				jQuery('#shipping_method li').not('#shipping_method li[szbd="false"]').first().find('input').prop('checked', true).change();
			}
		});
	}

	function calcRadius(delivery_address, store_address, has_address) {
		var radius = $.Deferred();
		if (has_address) {
			store_address = new google.maps.LatLng(store_address.lat, store_address.lng);
			delivery_address = new google.maps.LatLng(delivery_address.lat, delivery_address.lng);
			var r = compute_radius(store_address, delivery_address);
			if (szbd.debug == 1) {
				jQuery('.woocommerce-notices-wrapper:first-child').append('<div class="woocommerce-info szbd-debug"><h4>CALC RADIUS:</h4><br>Radius:' + JSON.stringify(r) + '</div>');
			}
			radius.resolve(r);
		} else {
			var geocode_storeaddress = new google.maps.Geocoder();
			geocode_storeaddress.geocode({
					'address': store_address.store_address + ',' + store_address.store_postcode + ',' + store_address.store_city + ',' + store_address.store_state + ',' + store_address.store_country
				},
				function(results, status) {
					if (szbd.debug == 1) {
						jQuery('.woocommerce-notices-wrapper:first-child').append('<div class="woocommerce-info szbd-debug"><h4>CALC RADIUS::</h4><br>Radius:' + JSON.stringify(compute_radius(results[0].geometry.location, delivery_address)) + '<br>STORE ADDRESS:' + JSON.stringify(results) + '<br>DELIVERY ADDRESS:' + JSON.stringify(delivery_address) + '</div>');
					}
					if (status == 'OK') {
						var r = compute_radius(results[0].geometry.location, delivery_address);
						radius.resolve(r);
					} else {
						radius.resolve('error');
					}
				});
		}
		return radius.promise();
	}

	function compute_radius(s, d) {
		return google.maps.geometry.spherical.computeDistanceBetween(s, d);
	}
	// Helping methods
	function findCommonElements(arr1, arr2) {
		return arr1.some(item => arr2.includes(item));
	}
});
