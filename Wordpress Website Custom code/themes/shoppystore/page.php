<?php get_header(); ?>
<?php 
	$ya_sidebar_template	= get_post_meta( get_the_ID(), 'page_sidebar_layout', true );
	$ya_sidebar 					= get_post_meta( get_the_ID(), 'page_sidebar_template', true );
?>
	<div class="container">
		<div class="row sidebar-row">
		<?php 
			if ( is_active_sidebar( $ya_sidebar ) && $ya_sidebar_template != 'right' && $ya_sidebar_template !='full' ):
			$ya_left_span_class = 'col-lg-'.ya_options()->getCpanelValue('sidebar_left_expand');
			$ya_left_span_class .= ' col-md-'.ya_options()->getCpanelValue('sidebar_left_expand_md');
			$ya_left_span_class .= ' col-sm-'.ya_options()->getCpanelValue('sidebar_left_expand_sm');
		?>
			<aside id="left" class="sidebar <?php echo esc_attr( $ya_left_span_class ); ?>">
				<?php dynamic_sidebar( $ya_sidebar ); ?>
			</aside>
		<?php endif; ?>
		
			<div id="contents" role="main" class="main-page <?php ya_content_page(); ?>">
				<?php
				get_template_part('templates/content', 'page')
				?>
			</div>
			<?php 
			if ( is_active_sidebar( $ya_sidebar ) && $ya_sidebar_template != 'left' && $ya_sidebar_template !='full' ):
				$ya_left_span_class = 'col-lg-'.ya_options()->getCpanelValue('sidebar_left_expand');
				$ya_left_span_class .= ' col-md-'.ya_options()->getCpanelValue('sidebar_left_expand_md');
				$ya_left_span_class .= ' col-sm-'.ya_options()->getCpanelValue('sidebar_left_expand_sm');
			?>
				<aside id="right" class="sidebar <?php echo esc_attr($ya_left_span_class); ?>">
					<?php dynamic_sidebar( $ya_sidebar ); ?>
				</aside>
			<?php endif; ?>
		</div>		
	</div>
<?php get_footer(); ?>

