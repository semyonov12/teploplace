document.addEventListener("DOMContentLoaded", function (event) {

	/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});

	/* Проверка мобильного браузера */
let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

// Добавление класса _touch для HTML если браузер мобильный
if (isMobile.any()) document.documentElement.classList.add('touch');

	window.addEventListener('resize', () => {
		// We execute the same script as before
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});


	if (document.querySelector('.main__slider')) {
		const progressContent = document.querySelectorAll(".boxes-autoplay-progress span");
		// Создаем слайдер
		let mySwip = new Swiper('.main__slider', {
			observer: true,
			observeParents: true,
			slidesPerView: 2.5,
			spaceBetween: 20,
			loop: false,
			centeredSlides: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},

			navigation: {
				prevEl: '.main__button-prev',
				nextEl: '.main__button-next',
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				768: {
					slidesPerView: 1.5,
					spaceBetween: 20,
				},
				1440: {
					slidesPerView: 2.5,
					spaceBetween: 20,
				},
			},
			on: {
				autoplayTimeLeft(s, time, progress) {
					let slideAct = this.activeIndex;
					progressContent[slideAct].style.setProperty("--progress", 1 - progress);
					if (slideAct === 0) {
						progressContent.forEach(elem => {
							elem.style.width = 0 + '%';
						});
					}
					progressContent[slideAct].style.width = 'calc(100% * var(--progress))';

				},
				slideChange: function () {
					let slideAct = this.activeIndex == 1 ? this.activeIndex - 1 : this.activeIndex;
					progressContent[slideAct].style.width = '100%';
				},

			}

		});


	}



});



