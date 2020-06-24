USE gulaitco_gulait;
UPDATE wp_options SET option_value = replace(option_value, 'https://www.gulait.com', 'http://localhost/public_html') WHERE option_name = 'home' OR option_name = 'siteurl';
UPDATE wp_options SET option_value = replace(option_value, 'http://www.gulait.com', 'http://localhost/public_html') WHERE option_name = 'home' OR option_name = 'siteurl';

UPDATE wp_posts SET guid = replace(guid, 'https://www.gulait.com','http://localhost/public_html');
UPDATE wp_posts SET guid = replace(guid, 'http://www.gulait.com','http://localhost/public_html');

UPDATE wp_posts SET post_content = replace(post_content, 'https://www.gulait.com', 'http://localhost/public_html');
UPDATE wp_posts SET post_content = replace(post_content, 'http://www.gulait.com', 'http://localhost/public_html');

UPDATE wp_postmeta SET meta_value = replace(meta_value,'https://www.gulait.com','http://localhost/public_html');
UPDATE wp_postmeta SET meta_value = replace(meta_value,'http://www.gulait.com','http://localhost/public_html');
