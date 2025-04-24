/* -------------------------------------------

Name:       Spoli
Version:    1.0
Author:	    bslthemes
Developer:  Nazar Miller (millerDigitalDesign)
Website:    https://bslthemes.com/

------------------------------------------- */

( function( $ ) {
	'use strict';

    /* -------------------------------------------

    register gsap plugins

    ------------------------------------------- */
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    /* -------------------------------------------

    menu

    ------------------------------------------- */
    window.addEventListener('scroll', function () {
        const topPanel = document.querySelector('.mil-top-panel');
        const sideMenu = document.querySelector('.mil-side-menu');

        if (window.scrollY > 30) {
            topPanel.classList.add('mil-scroll');
            sideMenu.classList.add('mil-scroll');
        } else {
            topPanel.classList.remove('mil-scroll');
            sideMenu.classList.remove('mil-scroll');
        }
    });
    document.querySelector('.mil-menu-btn').addEventListener('click', function () {
        this.classList.toggle('mil-active');
        document.querySelector('.mil-side-menu').classList.toggle('mil-active');
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - document.querySelector('.mil-top-panel').clientHeight+1;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                $('.mil-menu-btn.mil-active').trigger('click');
            }
        });
    });

    /* -------------------------------------------

	Smoothscroll

	------------------------------------------- */
	if($('.mil-onepage-side-menu').length || $('.mil-onepage-menu').length) {
		$(window).on('scroll', function(){
			var scrollPos = $(window).scrollTop();
			$('.mil-onepage-side-menu li a').each(function () {
				var currLink = $(this);
				if (currLink.attr("href").indexOf('#') !== -1 ) {
					var refElement = $(currLink.attr("href"));
					if (refElement !== undefined) {
						if (refElement.offset().top - $('.mil-top-panel').height() <= scrollPos) {
							$('.mil-onepage-side-menu > ul > li').removeClass("mil-current");
							currLink.parent().addClass("mil-current");
						}
					}
				}
			});
            $('.mil-onepage-menu li a').each(function () {
				var currLink = $(this);
				if (currLink.attr("href").indexOf('#') !== -1 ) {
					var refElement = $(currLink.attr("href"));
					if (refElement !== undefined) {
						if (refElement.offset().top - $('.mil-top-panel').height() <= scrollPos) {
							$('.mil-onepage-menu > ul > li > a').removeClass("mil-current");
							currLink.addClass("mil-current");
						}
					}
				}
			});
		});
	}

    /* -------------------------------------------

    scroll animation

    ------------------------------------------- */
    if (window.innerWidth > 767) {
    const appearance = document.querySelectorAll(".mil-up");
    appearance.forEach((section) => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 40,
            scale: 1.04,
            ease: 'sine',
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            scrollTrigger: {
                trigger: section,
                toggleActions: 'play none none reverse',
            }
        });
    });
    }

    const parallaxImages = document.querySelectorAll(".mil-parallax-img");
    parallaxImages.forEach((section) => {
        var value1 = section.getAttribute("data-value-1");
        var value2 = section.getAttribute("data-value-2");

        gsap.fromTo(section, {
            ease: 'sine',
            y: value1
        }, {
            y: value2,
            scrollTrigger: {
                //markers: true,
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const rotate = document.querySelectorAll(".mil-rotate");
    rotate.forEach((section) => {
        var value = section.getAttribute("data-value");
        gsap.fromTo(section, {
            ease: 'sine',
            rotate: 0,
        }, {
            rotate: value,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const numbers = document.querySelectorAll(".mil-counter");
    if (numbers.length > 0) {
        numbers.forEach(element => {
            const zero = {
                val: 0
            };
            const num = parseFloat(element.dataset.number);
            const split = num.toString().split(".");
            const decimals = split.length > 1 ? split[1].length : 0;

            gsap.to(zero, {
                val: num,
                duration: 1.8,
                scrollTrigger: {
                    trigger: element,
                    toggleActions: 'play none none reverse',
                },
                onUpdate: function () {
                    element.textContent = zero.val.toFixed(decimals);
                }
            });
        });
    }

    /* -------------------------------------------

    accordion

    ------------------------------------------- */
    const accordions = document.querySelectorAll(".mil-accordion");
    accordions.forEach(button => {
        button.addEventListener("click", () => {
            const panel = button.nextElementSibling;
            const icon = button.querySelector(".mil-icon");

            accordions.forEach(otherButton => {
                if (otherButton !== button) {
                    otherButton.classList.remove("active");
                    otherButton.querySelector(".mil-icon").textContent = "+";
                    otherButton.nextElementSibling.style.maxHeight = null;
                }
            });

            button.classList.toggle("active");
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                icon.textContent = "+";
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                icon.textContent = "−";
            }
        });
    });

    /* -------------------------------------------

    sliders

    ------------------------------------------- */
    var swiper = new Swiper('.mil-reviews-slider', {
        autoHeight: true,
        spaceBetween: 30,
        slidesPerView: 1,
        speed: 800,
        pagination: {
            el: ".mil-reviews-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
        },
    });

    var swiper = new Swiper('.mil-reviews-slider-2', {
        autoHeight: true,
        parallax: true,
        spaceBetween: 30,
        slidesPerView: 1,
        speed: 800,
        pagination: {
            el: ".mil-reviews-pagination",
            clickable: true,
        },
    });

    var swiper = new Swiper('.mil-reviews-slider-3', {
        autoHeight: true,
        spaceBetween: 30,
        slidesPerView: 1,
        speed: 800,
        pagination: {
            el: ".mil-reviews-pagination-3",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
        },
    });

    var swiper = new Swiper('.mil-blog-slider', {
        autoHeight: true,
        spaceBetween: 30,
        slidesPerView: 1,
        speed: 800,
        pagination: {
            el: ".mil-blog-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
        },
    });

    var swiper = new Swiper('.mil-blog-slider-2', {
        parallax: true,
        autoHeight: true,
        spaceBetween: 30,
        slidesPerView: 1,
        speed: 800,
        pagination: {
            el: ".mil-blog-pagination-2",
            clickable: true,
        },
    });

    var swiper = new Swiper('.mil-blog-slider-3', {
        parallax: true,
        autoHeight: true,
        spaceBetween: 30,
        slidesPerView: 1,
        speed: 800,
        pagination: {
            el: ".mil-blog-pagination-2",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 1,
            },
            992: {
                slidesPerView: 2,
            },
        },
    });

    var swiper = new Swiper('.mil-insta-slider', {
        autoHeight: true,
        spaceBetween: 30,
        slidesPerView: 2,
        speed: 800,
        pagination: {
            el: ".mil-insta-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
        },
    });

    var swiper = new Swiper('.mil-insta-slider-2', {
        autoHeight: true,
        spaceBetween: 0,
        slidesPerView: 2,
        speed: 800,
        loop: true,
        autoplay: {
            delay: 200,
        },
        pagination: {
            el: ".mil-insta-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 6,
            },
        },
    });

    var swiper = new Swiper('.mil-services-slider', {
        parallax: true,
        autoHeight: true,
        spaceBetween: 30,
        slidesPerView: 1,
        speed: 800,
        pagination: {
            el: ".mil-services-pagination",
            clickable: true,
        },
    });

} )( jQuery );
