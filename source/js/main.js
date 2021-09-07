'use strict';
(function () {
    // menu
    var menuBtn = document.querySelector('.header__menu-button');
    var header = document.querySelector('.header');
    var body = document.querySelector('.page-body');
    // range
    var rangeMin = document.getElementById('range-min');
    var rangeMax = document.getElementById('range-max');
    var rangeProgress = document.querySelector('.filter__range-progress');
    var rangeValueMin = document.getElementById('range-value-min');
    var rangeValueMax = document.getElementById('range-value-max');
    var rangeValueMinBlock = document.querySelector('.filter__range-value-min');
    var rangeValueMaxBlock = document.querySelector('.filter__range-value-max');
    // filter
    var closeFilterBtn = document.querySelector('.filter__close-btn');
    var openFilterBtn = document.querySelector('.filter__open-btn');
    var filter = document.querySelector('.filter__form');
    var formOverlay = document.querySelector('.form__overlay');
    // accordeon
    var btnProduct = document.querySelector('.filter__btn-product');
    var btnMaterial = document.querySelector('.filter__btn-material');
    var btnCollection = document.querySelector('.filter__btn-collection');
    var btnPrice = document.querySelector('.filter__btn-price');

    var blockProduct = document.querySelector('.filter__block--product');
    var blockMaterial = document.querySelector('.filter__block--material');
    var blockCollection = document.querySelector('.filter__block--collection');
    var blockPrice = document.querySelector('.filter__block--range');
    // slider 
    var radios = document.getElementsByName('radio');
    var left = document.querySelector('.slider__navigation-btn--last');
    var right = document.querySelector('.slider__navigation-btn--next');
    var slider = document.querySelector('.slider__list');
    // slider 
    if (radios &&
        slider &&
        left &&
        right) {
            function sliderSwipe(item) {
                // if (item > 0 && item <= max) {
                    slider.style.marginLeft = (item - 1) * (-102.5) + '%';
                // }
            };
            var value;
            for (var i = 0; i < radios.length; i++) {
                var radio = radios[i];
                radio.addEventListener('input', function () {
                    var activeRadio = document.querySelector('.slider__radio input:checked');
                    if (activeRadio && activeRadio.checked) {
                        value = activeRadio.value;  
                        sliderSwipe(value);
                        i = activeRadio.value;
                    }
                });
            };
            right.addEventListener('click', function () {
                var activeRadio = document.querySelector('.slider__radio input:checked');
                    if (activeRadio && activeRadio.checked) {
                        value = activeRadio.value;  
                        if (radios.length <= value) {
                            value = 1;
                        } else {
                            value++;
                        }
                        sliderSwipe(value);
                        radios[value - 1].checked = true;
                    }
            });
            left.addEventListener('click', function () {
                var activeRadio = document.querySelector('.slider__radio input:checked');
                    if (activeRadio && activeRadio.checked) {
                        value = activeRadio.value;
                        if (1 >= value) {
                            value = radios.length;
                        } else {
                            value--;
                        }
                        sliderSwipe(value);
                        radios[value - 1].checked = true;
                    }
            });
        }
    // accordeon
    if (btnProduct &&
        btnMaterial &&
        btnCollection &&
        btnPrice &&
        blockProduct &&
        blockMaterial &&
        blockCollection &&
        blockPrice) {
            function clickAccordeon(button, block) {
                if (block.classList.contains('visibility-hidden')) {
                    button.classList.remove('close-accordeon');
                    block.classList.remove('visibility-hidden');
                } else {
                    button.classList.add('close-accordeon');
                    block.classList.add('visibility-hidden');
                }
            };
            btnProduct.addEventListener('click', function () {clickAccordeon(btnProduct, blockProduct);});
            btnMaterial.addEventListener('click', function () {clickAccordeon(btnMaterial, blockMaterial);});
            btnCollection.addEventListener('click', function () {clickAccordeon(btnCollection, blockCollection);});
            btnPrice.addEventListener('click', function () {clickAccordeon(btnPrice, blockPrice);});

            clickAccordeon(btnMaterial, blockMaterial);
            clickAccordeon(btnCollection, blockCollection);


        };
    // menu
    function closeMenu() {
        if (menuBtn && header && body) {
        header.classList.remove('header--open');
        header.classList.remove('menu-js');
        body.classList.remove('overflow');
    }
}
    if (menuBtn && header && body) {
        header.classList.remove('header--open');
        function closeMenu() {
            header.classList.remove('header--open');
            header.classList.remove('menu-js');
            body.classList.remove('overflow');
        }
        // open-close menu
        menuBtn.addEventListener('click', function () {
            if (header.classList.contains('header--open')) {
                closeMenu();
            } else {
                header.classList.add('header--open');
                header.classList.add('menu-js');    
                body.classList.add('overflow');
            }
        });
    }
    // range
    if (rangeMin &&
        rangeMax &&
        rangeProgress &&
        rangeValueMax &&
        rangeValueMin &&
        rangeValueMinBlock &&
        rangeValueMaxBlock) {
        function changeRange() {
            rangeProgress.style.left = rangeMin.value +'px';
            rangeProgress.style.width = (rangeMax.value - rangeMin.value) + 'px';
            rangeValueMin.value = rangeMin.value;
            rangeValueMax.value = rangeMax.value;
            rangeValueMaxBlock.style.left = rangeMax.value - 15 +'px';
            rangeValueMinBlock.style.left = rangeMin.value - 15 +'px';
        };
        changeRange()
        rangeMin.addEventListener('input', changeRange);
        rangeMax.addEventListener('input', changeRange);
    }
    // filter
    function closeFilter() {
        if (filter && body) {
            body.classList.remove('overflow');
            filter.classList.add('tablet-hidden');
        }
    };
    if (filter && openFilterBtn && closeFilterBtn && body) {
        openFilterBtn.addEventListener ('click', function () {
            body.classList.add('overflow');
            filter.classList.remove('tablet-hidden');
            setTimeout(function () {
                if (!filter.classList.contains('popup--close')) {
                btnProduct.focus();
                }
            }, 250);
            trapFocus(filter);
        });
        closeFilterBtn.addEventListener('click', closeFilter);
    }
    if (formOverlay) {
        formOverlay.addEventListener('click', closeFilter);
    }
    window.onkeydown = function (event) {
        if (event.keyCode === 27) {
          if (!filter.classList.contains('tablet-hidden')) {
            closeFilter();
          }
        }
      };
      window.onresize = function () {
        if (window.innerWidth < 1024) {
            closeFilter();
            closeMenu();
        }
      };
        // Ловушка Tabindex
    function trapFocus(element) {
        var focusableEls = element.querySelectorAll('input, button');
        var firstFocusableEl = focusableEls[0];
        var lastFocusableEl = focusableEls[focusableEls.length - 1];
        var KEYCODE_TAB = 9;

        firstFocusableEl.focus();

        document.addEventListener('keydown', function (e) {
            var isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;

            if (!isTabPressed) {
                return;
            }

            if (e.shiftKey) {
                if (document.activeElement === firstFocusableEl) {
                    lastFocusableEl.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableEl) {
                    firstFocusableEl.focus();
                    e.preventDefault();
                }
            }
        });
    }
})();