'use strict';

((w, d, $, ajax) => {

    $(() => {
        console.log('%cThe website developed by BRAIN WORKS — https://brainworks.pro/', 'color: blue');
        console.log('%cСайт разработан в BRAIN WORKS — https://brainworks.pro/', 'color: blue');

        const $w = $(w);
        const $d = $(d);
        const html = $('html');
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) {
            html.addClass('is-mobile');
        }

        html.removeClass('no-js').addClass('js');
        tabs();
        dropdownPhone();
        scrollToElement();
        sidebarAccordion();
        reviews('.js-reviews');
        scrollTop('.js-scroll-top');
        wrapHighlightedElements('.highlighted');
        if (ajax) {
            ajaxLoadMorePosts('.js-load-more', '.js-ajax-posts');
        }
        stickFooter('.js-footer', '.js-container');
        // hamburgerMenu('.js-menu', '.js-hamburger', '.js-menu-close');
        anotherHamburgerMenu('.js-menu', '.js-hamburger', '.js-menu-close');
        buyOneClick('.one-click-ru', '[data-field-id="field11"]', 'h1');
        // On Copy
        $d.on('copy', addLink);

        $w.on('resize', () => {
            if ($w.innerWidth() >= 630) {
                removeAllStyles($('.js-menu'));
            }
        });
        addLightBoxHandlerForImage(".wpgis-slider-for");
    });

    /**
     * Dropdown Phone
     *
     * @example
     * dropdownPhone();
     *
     * @returns {void}
     */
    const dropdownPhone = () => {
        const dropDownBtn = $('.js-dropdown');
        const dropDownList = $('.js-phone-list');

        dropDownBtn.on('click', function () {
            $(this).toggleClass('active').siblings('.js-phone-list').fadeToggle(300);
        });

        $(document).on('click', (event) => {
            if ($(event.target).closest('.js-dropdown, .js-phone-list').length) return;

            dropDownList.fadeOut(300);
            dropDownBtn.removeClass('active');
        });
    };

    /**
     * Stick Footer
     *
     * @example
     * stickFooter('.js-footer', '.js-wrapper');
     *
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     *
     * @param {(string|Object)} footer - footer element
     * @param {(string|Object)} container - container element
     * @returns {void}
     */
    const stickFooter = (footer, container) => {
        let previousHeight, currentHeight;

        const offset = 0;
        const $footer = $(footer);
        const $container = $(container);

        currentHeight = ($footer.outerHeight() + offset) + 'px';
        previousHeight = currentHeight;

        $container.css('paddingBottom', currentHeight);

        $(window).on('resize', () => {
            currentHeight = ($footer.outerHeight() + offset) + 'px';

            if (previousHeight !== currentHeight) {
                $container.css('paddingBottom', currentHeight);
            }
        });
    };

    /**
     * Reviews - Slick Slider
     *
     * @example
     * reviews('.js-reviews');
     *
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     *
     * @param {(string|Object)} container - reviews container
     * @returns {void}
     */
    const reviews = (container) => {
        const element = $(container);

        if (element.children().length > 1 && typeof $.fn.slick === 'function') {
            element.slick({
                adaptiveHeight: false,
                autoplay: false,
                autoplaySpeed: 3000,
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev">&lsaquo;</button>',
                nextArrow: '<button type="button" class="slick-next">&rsaquo;</button>',
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                fade: false,
                infinite: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 1,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                        }
                    },
                ],
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 300,
                swipe: true,
                zIndex: 10,
            });

            /*element.on('swipe', (slick, direction) => {
                console.log(slick, direction);
            });

            element.on('afterChange', (slick, currentSlide) => {
                console.log(slick, currentSlide);
            });

            element.on('beforeChange', (slick, currentSlide, nextSlide) => {
                console.log(slick, currentSlide, nextSlide);
            });*/
        }
    };

    /**
     * Hamburger Menu
     *
     * @example
     * hamburgerMenu('.js-menu', '.js-hamburger', '.js-menu-close');
     *
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     *
     * @param {(string|Object)} menuElement - Selected menu
     * @param {(string|Object)} hamburgerElement - Trigger element for open/close menu
     * @param {(string|Object)} closeTrigger - Trigger element for close opened menu
     * @returns {void}
     */
    /*const hamburgerMenu = (menuElement, hamburgerElement, closeTrigger) => {
        const menu = $(menuElement),
            close = $(closeTrigger),
            hamburger = $(hamburgerElement),
            menuAll = hamburger.add(menu);

        hamburger.add(close).on('click', () => {
            menu.toggleClass('is-active');
        });

        $(window).on('load', (event) => {
            if (document.location.hash !== '') {
                scrollToElement(document.location.hash);
            }
        });

        $(window).on('click', (e) => {
            if (!$(e.target).closest(menuAll).length) {
                menu.removeClass('is-active');
            }
        });
    };*/

    /**
     * Scroll to element
     *
     * @param {(string|Object)} elements Elements to add to handler
     * @returns {void}
     */
    /*const scrollHandlerForButton = (elements) => {
        elements = $(elements);

        let i, el;

        for (i = 0; i < elements.length; i++) {

            el = elements.eq(i);

            el.on('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                scrollToElement($(e.target.hash), () => {
                    document.location.hash = e.target.hash;
                });
            });

        }
    };*/


    /**
     * Another Hamburger Menu
     *
     * @param {string} menuElement Selector or element
     * @param {string} hamburgerElement Selector or element
     * @param {string} closeTrigger Also selector or element
     * @returns {void}
     */
    const anotherHamburgerMenu = (menuElement, hamburgerElement, closeTrigger) => {
        const Elements = {
            menu: $(menuElement),
            button: $(hamburgerElement),
            close: $(closeTrigger),
        };

        Elements.button.add(Elements.close).on('click', () => {
            Elements.menu.toggleClass('is-active');
        });

        Elements.menu.find('a').on('click', () => {
            Elements.menu.removeClass('is-active');
        });

        /**
         * Arrow Opener
         *
         * @param {Object} parent Selector or element
         * @returns {(Object)} jQuery element
         */
        const arrowOpener = function (parent) {
            const activeArrowClass = 'menu-item-has-children-arrow-active';

            return $('<button />')
                .addClass('menu-item-has-children-arrow')
                .on('click', function () {
                    parent.children('.sub-menu').eq(0).slideToggle(300);
                    if ($(this).hasClass(activeArrowClass)) {
                        $(this).removeClass(activeArrowClass);
                    } else {
                        $(this).addClass(activeArrowClass);
                    }

                });
        };

        const items = Elements.menu.find('.menu-item-has-children, .sub-menu-item-has-children');

        for (let i = 0; i < items.length; i++) {
            items.eq(i).append(arrowOpener(items.eq(i)));
        }
    };

    /**
     * Remove All Styles from sub menu element
     *
     * @param {Object} elementParent selector or element
     * @returns {void}
     */
    const removeAllStyles = (elementParent) => {
        elementParent.find('.sub-menu').removeAttr('style');
    };

    /**
     * Wrap all highlighted elements in container
     *
     * @param {(string|Object)} elements selector or elements
     * @returns {void}
     */
    const wrapHighlightedElements = (elements) => {
        elements = $(elements);

        let i, highlightedHeader;

        for (i = 0; i < elements.length; i++) {
            highlightedHeader = elements.eq(i);

            highlightedHeader.wrap('<div style="display: block;"></div>');
        }
    };

    /**
     * Buy in one click
     *
     * @example
     * buyOneClick('.one-click', '[data-field-id="field7"]', 'h1.page-name');
     *
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     *
     * @param {(string|Object)} button - The selected button when clicking on which the form of purchase pops up
     * @param {(string|Object)} field - The selected field for writing the value (disabled field)
     * @param {(string|Object)} headline - The element from which we get the value to write to the field
     * @returns {void}
     */
    const buyOneClick = (button, field, headline) => {
        const btn = $(button);

        if (btn.length) {
            btn.on('click', () => {
                $(field).prop('disabled', true).val($(headline).text());
            });
        }
    };

    /**
     * Scroll Top
     *
     * @example
     * scrollTop('.js-scroll-top');
     *
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     *
     * @param {(string|Object)} element - Selected element
     * @returns {void}
     */
    const scrollTop = (element) => {
        const el = $(element);

        el.on('click touchend', () => {
            $('html, body').animate({scrollTop: 0}, 'slow');
            return false;
        });

        let scrollPosition;

        $(window).on('scroll', function () {
            scrollPosition = $(this).scrollTop();

            if (scrollPosition > 200) {
                if (!el.hasClass('is-visible')) {
                    el.addClass('is-visible');
                }
            } else {
                el.removeClass('is-visible');
            }
        });
    };

    /**
     * Adding link to the site resource at copying
     *
     * @example
     * document.oncopy = addLink; or $(document).on('copy', addLink);
     *
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     *
     * @returns {void}
     */
    const addLink = () => {
        const body = document.body || document.getElementsByTagName('body')[0];
        const selection = window.getSelection();
        const page_link = '\n Источник: ' + document.location.href;
        const copy_text = selection + page_link;
        const div = document.createElement('div');

        div.style.position = 'absolute';
        div.style.left = '-9999px';

        body.appendChild(div);
        div.innerText = copy_text;

        selection.selectAllChildren(div);

        window.setTimeout(() => {
            body.removeChild(div);
        }, 0);
    };


    /**
     * Function to add scroll handler for all links with hash as first symbol of href
     *
     * @param {number} [animationSpeed=400] speed of animation
     * @returns {void}
     */
    const scrollToElement = (animationSpeed = 400) => {
        const links = $('a');

        links.each((index, element) => {
            const $element = $(element), href = $element.attr('href');
            if (href) {
                if (href[0] === '#' || href.slice(0, 2) === '/#' && !(href.slice(1, 3) === '__')) {
                    $element.on('click', (e) => {
                        e.preventDefault();
                        const target = $(href[0] === '#' ? href : href.slice(1));
                        if (target.length) {
                            $('html, body').animate({
                                scrollTop: target.offset().top
                            }, animationSpeed);
                        } else if (href[0] === '/') {
                            location.href = href;
                        }
                    });
                }
            }
        });
    };

    /**
     * Sidebar Accordion
     *
     * @example
     * sidebarAccordion();
     *
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     *
     * @returns {void}
     */
    const sidebarAccordion = () => {
        const sidebarMenu = $('.left-sidebar .widget_nav_menu');
        const items = sidebarMenu.find('li');
        const subMenu = items.find('.sub-menu');

        if (subMenu.length) {
            subMenu.each(function (index, value) {
                $(value).parent().first().append('<i class="trigger"></i>');
            });
        }

        const classAction = 'is-opened';
        const trigger = items.find('.trigger');

        trigger.on('click', function () {
            const el = $(this), parent = el.parent();

            if (parent.hasClass(classAction)) {
                parent.removeClass(classAction);
            } else {
                parent.addClass(classAction);
            }
        });
    };

    /**
     * Ajax Load More Posts Handler
     *
     * @example
     * ajaxLoadMorePosts('.js-load-more', '.js-ajax-posts');
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {string} selector - Element for event handler (send ajax)
     * @param {string} container - The container to which the html markup will be added
     * @returns {void}
     */
    const ajaxLoadMorePosts = (selector, container) => {
        const btn = $(selector);
        const storage = $(container);

        if (!btn.length && !storage.length) return;

        let data, ajaxStart;

        data = {
            'action': ajax.action,
            'nonce': ajax.nonce,
            'paged': 1,
        };

        btn.on('click', () => {
            if (ajaxStart) return;

            ajaxStart = true;

            btn.addClass('is-loading');

            $.ajax({
                'url': ajax.url,
                'method': 'POST',
                'dataType': 'json',
                'data': data,
            })
                .done((response) => {
                    const posts = response.data;
                    storage.append(response.data);

                    data.paged += 1;

                    ajaxStart = false;

                    btn.removeClass('is-loading');

                    if (posts === '') {
                        btn.remove();
                    }
                })
                .fail((jqXHR, textStatus, errorThrown) => {
                    ajaxStart = false;
                    throw new Error(`Handling Ajax request loading posts has caused an ${textStatus} - ${errorThrown}`);
                });

        });
    };

    //disabled page scroll
    $('.js-hamburger').on('click', function () {
        $('body').addClass('body-overflow');
    });

    $('.js-menu-close, .menu-link').on('click', function () {
        $('body').removeClass('body-overflow');
    });

    //для плагина "Advanced Woocommerce Product Gallery Slider" https://ru.wordpress.org/plugins/advanced-woocommerce-product-gallery-slider/
    var addLightBoxHandlerForImage = function addLightBoxHandlerForImage(sliderContainer) {
        $(window).load(function () {
            var slider$ = $(sliderContainer);
            if (slider$.length) {
                slider$.find("img").each(function (index, element) {
                    $(element).on("click", function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        $(element).parents(".slick-slide").find(".wpgis-popup").click();
                    });
                });
            }
        });
    };

    $('.js-top-slider').slick({
        adaptiveHeight: false,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        nextArrow: '<div class="slick-next"><svg class="slider-icon"><use xlink:href="#arrow-right"></use></svg></div>',
        prevArrow: '<div class="slick-prev"><svg class="slider-icon"><use xlink:href="#arrow-left"></use></svg></div>',
        dots: false,
        draggable: true,
        fade: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: true,
    });

    let rangeValue = document.getElementById('range-value');
    let rangeDays = document.getElementById('range-days');
    let date = new Date();
    let countDateValue;
    document.getElementById('current-date').innerHTML = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
    document.getElementById('current-date-bottom').innerHTML = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();

    noUiSlider.create(rangeValue, {
        start: 5000,
        connect: [true, false],
        step: 500,
        range: {
            min: 0,
            max: 15000
        },
        pips: {
            mode: 'values',
            values: [0, 1000, 5000, 10000, 15000],
            density: 1
        },
    });

    noUiSlider.create(rangeDays, {
        start: 14,
        connect: [true, false],
        step: 1,
        range: {
            min: 0,
            max: 60
        },
        pips: {
            mode: 'values',
            values: [0, 7, 14, 20, 30, 40, 50, 60],
            density: 1
        },
    });

    initSliderParams(rangeValue, 'result-value');
    initSliderParams(rangeDays, 'result-days');
    getSliderParams(rangeValue);
    getSliderParams(rangeDays);


    function getSliderParams(selector) {

        let currentSlider = selector;

        currentSlider.noUiSlider.on('change', function () {
            let currentSliderValue = currentSlider.noUiSlider.get();
            currentSlider.nextElementSibling.value = +currentSliderValue;
            uprateResultValue('#cash-result', '#days-count', 1.5, '#result-value');
            uprateResultValue('#cash-result', '#days-count', 1.5, '#right-value');
            diagramAnimation('#left-diagram', '#right-diagram', '#cash-result', '#days-count');

        });

    }

    function initSliderParams(selector, element) {
        let slider = selector;

        slider.noUiSlider.on('update', function () {
            let currentSliderValue = slider.noUiSlider.get();
            slider.nextElementSibling.value = +currentSliderValue;
            document.getElementById(element).innerHTML = parseFloat(currentSliderValue).toFixed(0);
            updateSliderDate();
            initDiagramValue('#cash-result', '#left-value');
            uprateResultValue('#cash-result', '#days-count', 1.5, '#result-value');
            uprateResultValue('#cash-result', '#days-count', 1.5, '#right-value');
            diagramAnimation('#left-diagram', '#right-diagram', '#cash-result', '#days-count');
        });
    }

    function updateSliderDate() {
        let dateNow = new Date();
        let yearParse = new Intl.DateTimeFormat('uk-UA', {year: 'numeric'}).format(dateNow);
        let monthParse = new Intl.DateTimeFormat('uk-UA', {month: 'numeric'}).format(dateNow);
        let days = new Intl.DateTimeFormat('uk-UA', {day: 'numeric'}).format(dateNow);
        let dynamicDays = $('.js-days').text(days);
        let dynamicMonth = $('.js-month').text((monthParse));
        let dynamicYear = $('.js-year').text(yearParse);
        let countDateValue = $('#result-days').text();

        if (countDateValue < 1) {
            countDateValue = Number(dateNow.getDate());
        } else {
            countDateValue = Number(countDateValue) + Number(dateNow.getDate());
        }

        let currentDayInMonth = daysInMonth(dateNow.getMonth() + 1, dateNow.getFullYear());
        let dayCounter = (currentDayInMonth - countDateValue);
        let prevMonth = dateNow.getMonth() + 1;
        let daysOfNextMonth = daysInMonth(Number(prevMonth + 1), dateNow.getFullYear());
        if (dayCounter < 0) {
            let newDateCounter = ((daysOfNextMonth - 1) - countDateValue) * -1;
            dynamicDays.text(formatDays(newDateCounter));
            dynamicMonth.text(formatDays(Number(prevMonth) + 1));
        } else {
            dynamicDays.text(formatDays(countDateValue));
        }

        if (dayCounter < daysOfNextMonth * -1) {
            dynamicDays.text(formatDays(-61 + countDateValue));
            dynamicMonth.text(formatDays(addMonths(dateNow.getDay(), dateNow.getMonth() - 1)));

        }

    }

    function addMonths(date, months) {
        date = new Date();
        let startDate = date.getDate();
        date.setMonth(date.getMonth() + +months);
        if (date.getDate() != startDate) {
            date.setDate(0);
        }
        return date.getMonth() + 1;
    }

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    function initDiagramValue(inputValue, selector) {
        let inputValueDiagram = $(inputValue).val();
        let diagramSelector = $(selector);

        diagramSelector.text(+inputValueDiagram);
    }

    function diagramAnimation(leftCylinder, rightCylinder, value, count) {
        let animateValue = $(value).val();
        let animateCount = $(count).val();
        let countPercent;

        $(leftCylinder).height(animateValue / 1000 * 7);

        if (animateCount < 1 || animateValue < 1) {
            countPercent = 0;
        } else {
            countPercent = (animateCount / 10 * 7)
        }

        $(rightCylinder).height((animateValue / 1000 * 7) + countPercent);
    }

    function uprateResultValue(val, count, per, selector) {
        let value = $(val).val();
        let counter = $(count).val();
        let valuePercent = per;
        let dayValue = (+value / 100) * valuePercent;
        let valueResult = (+counter * dayValue) + +value;
        $(selector).text(valueResult);
    }

    function formatDays(num) {
        return (num.toString().length < 2 ? "0" + num : num).toString();
    }

    $('#filter-offer').on('click', function () {
        let filterItems = $('.js-filter-items');
        filterItems.removeClass('active');
        filterItems.removeClass('disabled');
        let indexItemArray = randomNum(0, filterItems.length);

        $([document.documentElement, document.body]).animate({
            scrollTop: $("#block-creditor").offset().top
        }, 400);

        function unique(arr) {
            let result = [];

            for (let str of arr) {
                if (!result.includes(str)) {
                    result.push(str);
                }
            }

            return result;
        }

        let uniqueItemArray = unique(indexItemArray);

        for (let i = 0; i < uniqueItemArray.length; i++) {
            let indexItem = uniqueItemArray[i];

            filterItems.eq(indexItem).addClass('active');
        }


        for (let k = 0; k < filterItems.length; k++) {
            let allItems = filterItems.eq(k);

            if (allItems.hasClass('active')) {
            } else {
                allItems.addClass('disabled');
            }
        }
    });

    function randomNum(min, max) {
        let n = [];
        for (let i = 0; i < 6; i++) {
            n.push(Math.floor(Math.random() * max) + min);
        }
        return n;
    }

    let tabs = function tabs() {
        let tabsItem = $(".tab-section__title");
        let tabsContent = $(".tab-section__container");
        tabsItem.on("click", function () {
            let tabsData = $(this).attr("data-tab");
            tabsItem.removeClass("active");
            tabsContent.removeClass("active");
            $(this).addClass("active");
            $("#" + tabsData).addClass("active");
        });
    };

})(window, document, jQuery, window.jpAjax);
