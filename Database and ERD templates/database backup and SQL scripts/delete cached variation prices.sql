-- delete the cached variation prices:
DELETE FROM `wp_options`
WHERE (`option_name` LIKE '_transient_wc_var_prices_%'
OR `option_name` LIKE '_transient_timeout_wc_var_prices_%');
