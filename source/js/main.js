'use strict';
(function () {
    var menuBtn = document.querySelector('.header__menu-button');
    var header = document.querySelector('.header');
    var body = document.querySelector('.page-body');
    // menu
    if (menuBtn && header && body) {
        header.classList.remove('header--open');
        // open-close menu
        menuBtn.addEventListener('click', function () {
            if (header.classList.contains('header--open')) {
                header.classList.remove('header--open');
                header.classList.remove('menu-js');
                body.classList.remove('overflow');
            } else {
                header.classList.add('header--open');
                header.classList.add('menu-js');    
                body.classList.add('overflow');
            }
        });
    }
})();