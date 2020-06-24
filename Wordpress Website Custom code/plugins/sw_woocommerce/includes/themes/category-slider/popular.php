<?php 

if( $category == '' ){
	return '<div class="alert alert-warning alert-dismissible" role="alert">
		<a class="close" data-dismiss="alert">&times;</a>
		<p>'. esc_html__( 'Please select a category for SW Woocommerce Category Slider. Layout ', 'sw_woocommerce' ) . $layout .'</p>
	</div>';
}

if( !is_array( $category ) ){
	$category = explode( ',', $category );
}
$widget_id = isset( $widget_id ) ? $widget_id : 'category_slide_'. $this->generateID();
?>
<div id="<?php echo $widget_id; ?>" class="category-ajax-slider">
  <div class="tab-category-title block-title">
				<strong><span><?php echo $title1; ?></span></strong>
				<div class="sn-img icon-bacsic item1"></div>
	</div>	
	<div id="<?php echo 'tab_' . $widget_id; ?>" class="sw-tab-slider responsive-slider" data-row="<?php echo esc_attr( $item_row ) ?>" data-length="<?php echo esc_attr( $title_length ) ?>" data-lg="<?php echo count( $category ) ?>" data-md="<?php echo count( $category ) - 2; ?>" data-sm="<?php echo count( $category ) - 5 ?>" data-xs="3" data-mobile="2" data-speed="<?php echo esc_attr( $speed ); ?>" data-scroll="1" data-interval="<?php echo esc_attr( $interval ); ?>" data-autoplay="false">
	<ul class="nav nav-tabs slider responsive">
	<?php
		foreach( $category as $key => $cat ){
			$term = get_term_by('slug', $cat, 'product_cat');				
			if( $term ) :
			$thumbnail_id 	= absint( get_term_meta( $term->term_id, 'thumbnail_id', true ));
			$thumb = wp_get_attachment_image( $thumbnail_id, array(350, 230) );
	?>
			<li class="<?php if( ( $key + 1 ) == $tab_active ){echo 'active'; }?>">
				<a href="#<?php echo esc_attr( $widget_id . $term->term_id ); ?>" data-type="cat_ajax" data-layout="<?php echo esc_attr( $layout );?>" data-ajaxurl="<?php echo esc_url( sw_ajax_url() ) ?>" data-category="<?php echo esc_attr( $term->term_id ); ?>" data-orderby="<?php echo esc_attr( $orderby ); ?>" data-toggle="tab" data-catload="ajax" data-number="<?php echo esc_attr( $numberposts ); ?>" data-lg="<?php echo esc_attr( $columns ); ?>" data-md="<?php echo esc_attr( $columns1 ); ?>" data-sm="<?php echo esc_attr( $columns2 ); ?>" data-xs="<?php echo esc_attr( $columns3 ); ?>" data-mobile="<?php echo esc_attr( $columns4 ); ?>" data-speed="<?php echo esc_attr( $speed ); ?>" data-scroll="<?php echo esc_attr( $scroll ); ?>" data-interval="<?php echo esc_attr( $interval ); ?>"  data-autoplay="<?php echo esc_attr( $autoplay ); ?>">
					<div class="item-image">
						<?php echo $thumb; ?>
						<h3><?php echo esc_html( $term->name ); ?></h3>						
					</div>
				</a>
			</li>
			<?php endif; ?>
		<?php } ?>
	</ul>
	</div>
	<div class="tab-content tab-content-popular">
	<?php 
	$key = 0;
	foreach( $category as $cat ){
		$term = get_term_by('slug', $cat, 'product_cat');	
		if( $term ) :
	?>
		<div id="<?php echo $widget_id . esc_attr( $term->term_id ); ?>" class="tab-pane fade in <?php if( ( $key + 1 ) == $tab_active ){echo 'active'; }?>"></div>
		<?php $key++; endif; ?>
	<?php } ?>
	
	</div>
</div>	