<?php $ya_header_style 	= ya_options()->getCpanelValue('header_style'); ?>

<?php get_header( $ya_header_style ) ?>
<div class="container">
    <div class="listing-title">			
			<h1><span><?php ya_title(); ?></span></h1>				
	</div>
	<?php
		$post_type = isset( $_GET['search_posttype'] ) ? $_GET['search_posttype'] : '';
		if( isset( $post_type ) &&  locate_template( 'templates/search-' . $post_type . '.php' ) ){
			get_template_part( 'templates/search', $post_type );
		}else{
	?>
		<div class="category-contents">			
			<?php if (!have_posts()) : ?>
				<?php get_template_part('templates/no-results'); ?>
			<?php endif; ?>
			<div class="blog-content-list">
			<?php 
				while (have_posts()) : the_post(); 
				$post_format = get_post_format();
			?>
				<div id="post-<?php the_ID();?>" <?php post_class( 'post theme-clearfix' ); ?>>
					<div class="entry clearfix">
						<?php if (get_the_post_thumbnail()){?>
						<div class="entry-thumb pull-left">
							<a class="entry-hover" href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">			
								<?php the_post_thumbnail("thumbnail")?>
							</a>
						</div>
						<?php }?>
						<div class="entry-content">
						 
							<div class="title-blog">
								<h3>
									<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?> </a>
								</h3>
							</div>							
							   <span class="entry-date">
									<i class="fa fa-calendar"></i><?php echo ( get_the_title() ) ? date( 'l, F j, Y',strtotime($post->post_date)) : '<a href="'.get_the_permalink().'">'.date( 'l, F j, Y',strtotime($post->post_date)).'</a>'; ?>
								</span>
							<div class="entry-description">
								<?php the_excerpt(); ?>
							</div>
						</div>
					</div>
				</div>
			<?php endwhile; ?>
			</div>
			<div class="clearfix"></div>
			<?php get_template_part('templates/pagination'); ?>
		</div>
	<?php 
		}
	?>
</div>
<?php get_footer(); ?>