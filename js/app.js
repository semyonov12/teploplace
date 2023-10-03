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
				992: {
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



