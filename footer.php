<footer class="footer js-footer">
    <?php if (is_active_sidebar('footer-widget-area')) : ?>
        <div class="pre-footer">
            <div class="container">
                <div class="row">
                    <?php dynamic_sidebar('footer-widget-area'); ?>
                </div>
            </div>
        </div><!-- .pre-footer end-->
    <?php endif; ?>

    <div class="container">
        <div class="footer__wrapper">
            <div class="logo">
                <?php get_default_logo_link([
                    'name' => 'logo.svg',
                    'options' => [
                        'class' => 'logo-img',
                        'width' => 150,
                        'height' => 30,
                    ],
                ])
                ?>
            </div>
            <div class="footer__item"><?php _e('All rights reserved', 'brainworks'); ?> &copy; <?php echo date('Y'); ?></div>
            <div class="footer__item">
                <?php _e('Developed by ', 'brainworks') ?><a href="https://brainworks.pro/" target="_blank">BRAIN WORKS</a> 
            </div>
        </div>
    </div>
</footer>

</div><!-- .wrapper end Do not delete! -->

<?php scroll_top(); ?>

<div class="is-hide">
    <?php svg_sprite(); ?>
    <svg width="0" height="0" class="hidden">
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.207 32.252" id="arrow-left">
            <path d="M12.297 32.252L0 16.103 12.262 0h3.909L3.909 16.103l12.298 16.149z"></path>
        </symbol>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.207 32.252" id="arrow-right">
            <path d="M3.909 32.252l12.298-16.149L3.944 0H.035l12.262 16.103L0 32.252z"></path>
        </symbol>
    </svg>
</div>

<?php wp_footer(); ?>

</body>
</html>
