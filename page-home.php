<?php
/**
 * Template Name: Home Page
 **/
?>

<?php get_header(); ?>
<?php get_template_part('loops/content', 'home'); ?>
<div class="top-slider js-top-slider">
    <?php
    $slider_content = get_field('top_slider');
    foreach ($slider_content as $items) { ?>
        <div class="top-slider__items">
            <div class="top-slider__image"
                 style="background: url('<?php echo $items['top_slider_image']; ?>') no-repeat center / cover">
                <div class="container">
                    <p class="top-slider__title h3"><?php echo $items['top_slider_title']; ?></p>
                </div>
            </div>
        </div>
    <?php } ?>
</div>
<div class="container">
    <section class="top-section">
        <div class="top-section__slider">
            <div class="top-section__item-wrapper">
                <p class="top-section__title">Сумма кредита (грн.):</p>
                <div id="range-value" class="top-section__item"></div>
                <input id="cash-result" name="slider-value" type="hidden">
            </div>
            <div class="top-section__item-wrapper">
                <p class="top-section__title">Срок кредита (дней):</p>
                <div id="range-days" class="top-section__item"></div>
                <input id="days-count" name="slider-days" type="hidden">
            </div>
            <div class="top-section__container">
                <div class="top-section__field">
                    К возврату: <span id="result-value" class="top-section__value"></span> грн.
                </div>
                <div class="top-section__field">
                    Срок: <span id="result-days" class="top-section__value"></span> дней
                </div>
                <button id="filter-offer" type="button" class="btn btn-primary">Получить</button>
            </div>
            <div class="top-section__info">
                * 1,5% - среднерыночная ставка микрофинансовых организаций состоянием на  <span id="current-date-bottom"></span>
            </div>
        </div>
        <div class="slider-diagram">
            <div class="slider-diagram__wrapper">
                <div class="slider-diagram__item">
                    <div class="slider-diagram__caption">
                        <p class="slider-diagram__caption-title">Сумма кредита:</p>
                        <div class="slider-diagram__value-wrapper">
                            <div id="left-value" class="slider-diagram__value"></div>
                            <span class="slider-diagram__symbol">грн.</span>
                        </div>
                    </div>
                    <div id="left-diagram" class="slider-diagram__left-element"></div>
                </div>
                <div class="slider-diagram__item">
                    <div class="slider-diagram__caption">
                        <p class="slider-diagram__caption-title">Сумма возврата:</p>
                        <div class="slider-diagram__value-wrapper">
                            <div id="right-value" class="slider-diagram__value"></div>
                            <span class="slider-diagram__symbol">грн.</span>
                        </div>
                    </div>
                    <div id="right-diagram" class="slider-diagram__right-element"></div>
                </div>
            </div>
            <div class="slider-diagram__container">
                <div class="slider-diagram__field">
                    <p class="slider-diagram__title">Дата получения:</p>
                    <span id="current-date" class="slider-diagram__date"></span>
                </div>
                <div class="slider-diagram__field">
                    <p class="slider-diagram__title">Дата возврата:</p>
                    <span id="end-date" class="slider-diagram__date">
                    <span class="days js-days"></span>.
                    <span class="month js-month"></span>.
                    <span class="year js-year"></span>
                    </span>
                </div>
            </div>
        </div>
    </section>
</div>
<section class="middle-section" id="block-creditor">
    <div class="container">
        <h1 class="main-title h4"><?php echo get_post_meta(get_the_ID(), 'creditor_title', true); ?></h1>
        <div class="middle-section__wrapper">
            <?php
            $creditor_list = get_field('creditor_list');
            foreach ($creditor_list as $content) { ?>
                <div class="middle-section__item-wrapper js-filter-items">
                    <div class="middle-section__item">
                        <div class="middle-section__image-wrapper">
                            <img class="middle-section__image" src="<?php echo $content['creditor_image']; ?>"
                                 alt="logo">
                        </div>
                        <div class="middle-section__description"><?php echo $content['creditor_text']; ?></div>
                        <a class="middle-section__link btn btn-secondary" target="_blank"
                           href="<?php echo $content['creditor_link']; ?>">Подать заявку</a>
                    </div>
                </div>
            <?php } ?>
        </div>
    </div>
</section>
<section class="tab-section">
    <div class="container">
        <div class="tab-section__wrapper">
            <?php $tabs = get_field('tab_list');
            $count_tabs = 1;
            $count_tab_content = 1;
            ?>
            <div class="tab-section__caption">
                <?php foreach ($tabs as $content) { ?>
                    <div class="tab-section__title<?php echo $count_tabs == 1 ? ' active': '' ?>" data-tab="tab<?php echo $count_tabs; ?>">
                        <?php echo $content['tab_title']; ?>
                    </div>
                    <?php $count_tabs++; ?>
                <?php } ?>
            </div>
            <div class="tab-section__content">
                <?php foreach ($tabs as $content) { ?>
                    <div class="tab-section__container<?php echo $count_tab_content == 1 ? ' active': '' ?>" id="tab<?php echo $count_tab_content; ?>">
                        <?php echo $content['tab_content']; ?>
                    </div>
                    <?php $count_tab_content++; ?>
                <?php } ?>
            </div>
        </div>
    </div>
</section>
<section class="info-section">
    <div class="container">
        <div class="info-section__wrapper">
            <div class="info-section__main-description"><?php echo get_post_meta(get_the_ID(), 'info_main_text', true); ?></div>
            <div class="info-section__secondary-description">
                <?php echo get_post_meta(get_the_ID(), 'info_secondary_text', true); ?>
                <?php
                $email = get_theme_mod('bw_additional_email');
                if (!empty($email)) { ?>
                    <a class="info-section__link" href="mailto:<?php echo esc_attr($email); ?>">
                        <?php echo esc_html($email); ?>
                    </a>
                <?php } ?>

            </div>
        </div>
    </div>
</section>
<?php get_footer(); ?>
