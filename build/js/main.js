'use strict';
(function () {
  // menu
  var menuBtn = document.querySelector('.header__menu-button');
  var header = document.querySelector('.header');
  var body = document.querySelector('.page-body');
  // range
  var rangeMin = document.querySelector('#range-min');
  var rangeMax = document.querySelector('#range-max');
  var rangeProgress = document.querySelector('.filter__range-progress');
  var rangeValueMin = document.querySelector('#range-value-min');
  var rangeValueMax = document.querySelector('#range-value-max');
  var rangeValueMinBlock = document.querySelector('.filter__range-value-min');
  var rangeValueMaxBlock = document.querySelector('.filter__range-value-max');
  // filter
  var closeFilterBtn = document.querySelector('.filter__close-btn');
  var openFilterBtn = document.querySelector('.filter__open-btn');
  var filter = document.querySelector('.filter__form');
  var formOverlay = document.querySelector('.form__overlay');
  // accordeon filter
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
  // accordeon faq
  var faqBlock01 = document.querySelector('.faq-1');
  var faqBlock02 = document.querySelector('.faq-2');
  var faqBlock03 = document.querySelector('.faq-3');
  var faqBlock04 = document.querySelector('.faq-4');
  var faqBtn01 = document.querySelector('.faq-btn-1');
  var faqBtn02 = document.querySelector('.faq-btn-2');
  var faqBtn03 = document.querySelector('.faq-btn-3');
  var faqBtn04 = document.querySelector('.faq-btn-4');
  // popup login
  var popup = document.querySelector('.login');
  var openPopupBtn = document.querySelector('.header__login');
  var closePopupBtn = document.querySelector('.login__close-btn');
  var popupOverlay = document.querySelector('.login__overlay');
  var email = document.querySelector('#e-mail');
  var password = document.querySelector('#password');
  var sendEmail = document.querySelector('#popup-send');
  // popup conform
  var conformBlock = document.querySelector('.conform');
  var conformCloseBtn = document.querySelector('.conform__close-btn');
  // footer email
  var footerEmail = document.querySelector('#footer-email');
  var footerBtn = document.querySelector('#footer-btn');
  // validation email
  function validate(elem) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(elem) == false) {
       return false;
    } else {
      return true;
    }
 }
  // footer email
  if (footerBtn && footerEmail) {
    footerBtn.addEventListener('click', function () {
      if (footerEmail.value.length > 0 && validate(footerEmail.value)) {
        localStorage.setItem('email-footer', footerEmail.value);
        openConform();
      } else {
        footerEmail.classList.add('error-email');
        setTimeout(function () {
          if (footerEmail.classList.contains('error-email')) {
            footerEmail.classList.remove('error-email');
          }
        }, 2500);
      }
    });
  }
  // popup conform
  function openConform() {
    if (conformBlock && body) {
      if (!conformBlock.classList.contains('conform--open')) {
        conformBlock.classList.add('conform--open');
        body.classList.add('overflow');
      }
    }
  }

  function closeConform() {
    if (conformBlock && body) {
      if (conformBlock.classList.contains('conform--open')) {
        conformBlock.classList.remove('conform--open');
        body.classList.remove('overflow');
      }
    }
  }

  if (conformCloseBtn) {
    conformCloseBtn.addEventListener('click', closeConform);
  }
  // popup login
  function closeLogin() {
    if (body && body.classList.contains('overflow') && popup && popup.classList.contains('login--open')) {
      popup.classList.remove('login--open');
      body.classList.remove('overflow');
    }
  }
  function errorPopup(elem) {
    if (elem) {
      elem.classList.add('error-email');
      setTimeout(function () {
        if (elem.classList.contains('error-email')) {
          elem.classList.remove('error-email');
        }
      }, 2500);
    }
  }
  if (email && password && popupOverlay && popup && body && openPopupBtn && closePopupBtn) {
    closePopupBtn.addEventListener('click', closeLogin);
    popupOverlay.addEventListener('click', closeLogin);
    openPopupBtn.addEventListener('click', function (event) {
      if (!popup.classList.contains('login--open')) {
        popup.classList.add('login--open');
        body.classList.add('overflow');
        setTimeout(function () {
          if (popup.classList.contains('login--open')) {
            email.focus();
          }
        }, 250);
        trapFocus(popup);
        event.preventDefault();
        return false;
      }
      return event;
    });
    sendEmail.addEventListener('click', function () {
      if (email.value.length > 0
        && validate(email.value) &&
        password.value.length > 0) {
        localStorage.setItem('email', email.value);
        closeLogin();
        openConform();
      } else  {
        if (email.value.length === 0) {
          errorPopup(email);
        }
        if (!validate(email.value)) {
          errorPopup(email);
        }
        if (password.value.length === 0) {
          errorPopup(password);
        }
      }
    });
  }
  // accordeon faq
  function accordeonFaq(button, block) {
    button.addEventListener('click', function () {
      if (block.classList.contains('faq__item--active')) {
        block.classList.remove('faq__item--active');
      } else {
        block.classList.add('faq__item--active');
      }
    });
  }
  if (faqBlock01 &&
    faqBlock02 &&
    faqBlock03 &&
    faqBlock04 &&
    faqBtn01 &&
    faqBtn02 &&
    faqBtn03 &&
    faqBtn04) {
    var items = document.querySelectorAll('.faq__item--active');
    for (var n = 0; n < items.length; n++) {
      var item = items[n];
      if (item && item.classList.contains('faq__item--active')) {
        item.classList.remove('faq__item--active');
      }
    }
    faqBlock01.classList.add('faq__item--active');
    accordeonFaq(faqBtn01, faqBlock01);
    accordeonFaq(faqBtn02, faqBlock02);
    accordeonFaq(faqBtn03, faqBlock03);
    accordeonFaq(faqBtn04, faqBlock04);
  }
  // slider
  function sliderSwipe(block) {
    var gup;
    if (window.innerWidth > 1023) {
      gup = 2.5;
    } else if (window.innerWidth > 767 && window.innerWidth <= 1023) {
      gup = 4;
    } else if (window.innerWidth <= 767) {
      gup = 10;
    }
    if (slider) {
      slider.style.marginLeft = (block - 1) * (-100 - gup) + '%';
    }
  }
  function sliderLeft(list) {
    var max;
    var value;
    if (window.innerWidth > 1023) {
      max = 3;
    } else {
      max = list.length;
    }
    var activeRadio = document.querySelector('.slider__radio input:checked');
    if (activeRadio && activeRadio.checked) {
      value = activeRadio.value;
      if (value <= 1) {
        value = max;
      } else {
        value--;
      }
      sliderSwipe(value);
      list[value - 1].checked = true;
    }
  }
  function sliderRight(list) {
    var max;
    var value;
    if (window.innerWidth > 1023) {
      max = 3;
    } else {
      max = list.length;
    }
    var activeRadio = document.querySelector('.slider__radio input:checked');
    if (activeRadio && activeRadio.checked) {
      value = activeRadio.value;
      if (max <= value) {
        value = 1;
      } else {
        value++;
      }
      sliderSwipe(value);
      list[value - 1].checked = true;
    }
  }
  if (radios &&
    slider &&
    left &&
    right) {

    for (var i = 0; i < radios.length; i++) {
      var radio = radios[i];
      var value;
      radio.addEventListener('input', function () {
        var activeRadio = document.querySelector('.slider__radio input:checked');
        if (activeRadio && activeRadio.checked) {
          value = activeRadio.value;
          sliderSwipe(value);
          i = activeRadio.value;
        }
      });
    }
    right.addEventListener('click', function () {
      sliderRight(radios);
    });
    left.addEventListener('click', function () {
      sliderLeft(radios);
    });
  }
  // accordeon filter
  function clickAccordeon(button, block) {
    if (block.classList.contains('visibility-hidden')) {
      button.classList.remove('close-accordeon');
      block.classList.remove('visibility-hidden');
    } else {
      button.classList.add('close-accordeon');
      block.classList.add('visibility-hidden');
    }
  }
  if (btnProduct &&
    btnMaterial &&
    btnCollection &&
    btnPrice &&
    blockProduct &&
    blockMaterial &&
    blockCollection &&
    blockPrice) {
    btnProduct.addEventListener('click', function () {
      clickAccordeon(btnProduct, blockProduct);
    });
    btnMaterial.addEventListener('click', function () {
      clickAccordeon(btnMaterial, blockMaterial);
    });
    btnCollection.addEventListener('click', function () {
      clickAccordeon(btnCollection, blockCollection);
    });
    btnPrice.addEventListener('click', function () {
      clickAccordeon(btnPrice, blockPrice);
    });
    clickAccordeon(btnMaterial, blockMaterial);
    clickAccordeon(btnCollection, blockCollection);
  }
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
  function changeRange() {
    if (rangeProgress &&
      rangeValueMax &&
      rangeValueMin &&
      rangeValueMinBlock &&
      rangeValueMaxBlock) {
      rangeProgress.style.left = rangeMin.value + 'px';
      rangeProgress.style.width = (rangeMax.value - rangeMin.value) + 'px';
      rangeValueMin.value = rangeMin.value;
      rangeValueMax.value = rangeMax.value;
      rangeValueMaxBlock.style.left = rangeMax.value - 15 + 'px';
      rangeValueMinBlock.style.left = rangeMin.value - 15 + 'px';
    }
  }
  if (rangeMin &&
      rangeMax) {
    changeRange();
    rangeMin.addEventListener('input', changeRange);
    rangeMax.addEventListener('input', changeRange);
  }
  // filter
  function closeFilter() {
    if (filter && body) {
      body.classList.remove('overflow');
      filter.classList.add('tablet-hidden');
    }
  }
  if (filter && openFilterBtn && closeFilterBtn && body) {
    openFilterBtn.addEventListener('click', function () {
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
      if (filter && !filter.classList.contains('tablet-hidden')) {
        closeFilter();
      } if (popup && popup.classList.contains('login--open')) {
        closeLogin();
      }
    }
  };
  window.onresize = function () {
    if (window.innerWidth < 1024) {
      closeFilter();
      closeMenu();
    } else {
      sliderSwipe(1);
      if (document.querySelector('#slide-1')) {
        document.querySelector('#slide-1').checked = true;
      }
    }
  };
  // ?????????????? Tabindex
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
  // swipe
  if (slider) {
    slider.addEventListener('touchstart', handleTouchStart, false);
    slider.addEventListener('touchmove', handleTouchMove, false);
  }
  var xDown = null;
  var yDown = null;

  function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        sliderRight(radios);
      } else {
        sliderLeft(radios);
      }
    }
    xDown = null;
    yDown = null;
  }
})();
