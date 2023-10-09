/* Проверка мобильного браузера */
let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

// Добавление класса _touch для HTML если браузер мобильный
if (isMobile.any()) document.documentElement.classList.add('touch');


// Учет плавающей панели на мобильных устройствах при 100vh
function fullVHfix() {
	const fullScreens = document.querySelectorAll('.main__slide');
	if (fullScreens.length && isMobile.any()) {
		window.addEventListener('resize', fixHeight);
		function fixHeight() {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}
		fixHeight();
	}
}

fullVHfix();

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


	const copyButton = document.getElementById('copy-button');
	const textToCopy = document.getElementById('text-to-copy');

	const textUp = document.querySelector('.slide-main__copy-text');

	if (copyButton) {
		copyButton.addEventListener('click', function () {
			const text = textToCopy.innerText;
			navigator.clipboard.writeText(text).then(function () {
				textUp.classList.add('slide-main__copy-text_act');
				setTimeout(() => {
					textUp.classList.remove('slide-main__copy-text_act');
				}, 1000);
			}, function () {
				console.error('Не удалось скопировать текст');
			});
		});
	}





	if (document.querySelector('.main__slider')) {
		const progressContent = document.querySelectorAll(".boxes-autoplay-progress span");
		const slideVideo1 = document.querySelector('.slide-video');
		const slideVideo2 = document.querySelector('.slide-video-2');
		// Создаем слайдер
		let mySwip = new Swiper('.main__slider', {
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			spaceBetween: 20,
			loop: false,
			centeredSlides: true,
			autoplay: {
				delay: 3000, // общее время автопрокрутки для всех слайдов
				disableOnInteraction: false, // автопрокрутка не останавливается при взаимодействии пользователя
				waitForTransition: true, // автопрокрутка ждет окончания перехода между слайдами
			},
			autoplayDisableOnInteraction: true,
			navigation: {
				prevEl: '.main__button-prev',
				nextEl: '.main__button-next',
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
				},
				768: {
					slidesPerView: 1.5,
					spaceBetween: 10,
				},
				1201: {
					slidesPerView: 2,
					spaceBetween: 20,
				},

				1441: {
					slidesPerView: 2.5,
					spaceBetween: 20,
				},
				1701: {
					slidesPerView: 3,
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
					
					if (this.activeIndex === 3) {
					  this.params.autoplay.delay = 14600;
					  this.autoplay.start(); //
					} else if(this.activeIndex === 6) {
						this.params.autoplay.delay = 11500; 
						this.autoplay.start(); 
					}
					else {
					  this.params.autoplay.delay = 3000; 
					  this.autoplay.start();
					}
				  },


				slideNextTransitionStart: function () {
					
					if (slideVideo1.classList.contains("swiper-slide-active")) {
						slideVideo1.querySelector('video').play();
					}
					else if (slideVideo2.classList.contains("swiper-slide-active")) {
						slideVideo2.querySelector('video').play();
					}
					else {
						slideVideo1.querySelector('video').pause();
						slideVideo1.querySelector('video').currentTime = 0;

						slideVideo2.querySelector('video').pause();
						slideVideo2.querySelector('video').currentTime = 0;
					}

					let slideAct = this.activeIndex - 1;
					progressContent[slideAct].style.width = '100%';
				},

				slidePrevTransitionStart: function () {
					if (slideVideo1.classList.contains("swiper-slide-active")) {
						slideVideo1.querySelector('video').play();
					}
					else if (slideVideo2.classList.contains("swiper-slide-active")) {
						slideVideo2.querySelector('video').play();
					}
					else {
						slideVideo1.querySelector('video').pause();
						slideVideo1.querySelector('video').currentTime = 0;

						slideVideo2.querySelector('video').pause();
						slideVideo2.querySelector('video').currentTime = 0;
					}

					let slideAct = this.activeIndex + 1;
					progressContent[slideAct].style.width = '0%';
				},

			}

		});


	}



});



