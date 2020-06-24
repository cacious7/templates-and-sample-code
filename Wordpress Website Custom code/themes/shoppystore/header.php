<?php get_template_part('templates/head'); ?>
<body <?php body_class(); ?>>
<div class="body-wrapper theme-clearfix" id="body_wrapper">
	<?php 	
		$preload_page = ya_options()->getCpanelValue( 'preload_active_page' );
		$page_id = get_the_ID();
		if( 1 == ya_options()->getCpanelValue( 'preload_active' ) &&( is_array( $preload_page ) && in_array( $page_id, $preload_page ) ) ) : 
	?>
	<div class="ip-header">			
		<div class="ip-loader">
			<svg class="ip-inner" width="60px" height="60px" viewBox="0 0 80 80">
				<path class="ip-loader-circlebg" d="M40,10C57.351,10,71,23.649,71,40.5S57.351,71,40.5,71 S10,57.351,10,40.5S23.649,10,40.5,10z"/>
				<path id="ip-loader-circle" class="ip-loader-circle" d="M40,10C57.351,10,71,23.649,71,40.5S57.351,71,40.5,71 S10,57.351,10,40.5S23.649,10,40.5,10z"/>
			</svg>
		</div>
	</div>
	<?php endif; ?>
	<div class="body-wrapper-inner">
	<?php ya_header_check(); ?>