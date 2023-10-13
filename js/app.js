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


	let mySwip;

	if (document.querySelector('.main__slider')) {
		const progressContent = document.querySelectorAll(".boxes-autoplay-progress span");
		const slideVideo1 = document.querySelector('.slide-video');
		const slideVideo2 = document.querySelector('.slide-video-2');
		// Создаем слайдер
		mySwip = new Swiper('.main__slider', {
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
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

				550: {
					slidesPerView: 'auto',
					spaceBetween: 0,
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

					if (this.activeIndex === 1 || this.activeIndex === 4 || this.activeIndex === 8) {
						document.querySelector('.main__row-line').classList.add('main__row-line-black');
					} else {
						document.querySelector('.main__row-line').classList.remove('main__row-line-black');
					}


					if (this.activeIndex === 3) {
						this.params.autoplay.delay = 14600;
						this.autoplay.start();
					} else if (this.activeIndex === 6) {
						this.params.autoplay.delay = 11500;
						this.autoplay.start();
					} else if (this.activeIndex === this.slides.length - 1) {

						this.autoplay.stop();
						if (document.querySelector('.main__button-replay')) {
							document.querySelector('.main__button-replay').classList.add('main__button-replay-act');
						}
					}
					else {
						this.params.autoplay.delay = 3000;
						this.autoplay.start();
						if (document.querySelector('.main__button-replay')) {
							document.querySelector('.main__button-replay').classList.remove('main__button-replay-act');
						}

					}


				},


				slideNextTransitionStart: function () {

					// if (slideVideo1.classList.contains("swiper-slide-active")) {
					// 	slideVideo1.querySelector('video').play();
					// }
					// else if (slideVideo2.classList.contains("swiper-slide-active")) {
					// 	slideVideo2.querySelector('video').play();
					// }
					// else {
					// 	slideVideo1.querySelector('video').pause();
					// 	slideVideo1.querySelector('video').currentTime = 0;

					// 	slideVideo2.querySelector('video').pause();
					// 	slideVideo2.querySelector('video').currentTime = 0;
					// }

					let slideAct = this.activeIndex - 1;
					progressContent[slideAct].style.width = '100%';
				},

				slidePrevTransitionStart: function () {
					// if (slideVideo1.classList.contains("swiper-slide-active")) {
					// 	slideVideo1.querySelector('video').play();
					// }
					// else if (slideVideo2.classList.contains("swiper-slide-active")) {
					// 	slideVideo2.querySelector('video').play();
					// }
					// else {
					// 	slideVideo1.querySelector('video').pause();
					// 	slideVideo1.querySelector('video').currentTime = 0;

					// 	slideVideo2.querySelector('video').pause();
					// 	slideVideo2.querySelector('video').currentTime = 0;
					// }

					let slideAct = this.activeIndex + 1;
					progressContent[slideAct].style.width = '0%';
				},


			}




		});

		const btnReplay = document.querySelector('.main__button-replay');

		if (btnReplay) {
			btnReplay.addEventListener("click", function (e) {
				mySwip.slideTo(0);
			});
		}





	}



});



