'use strict';

const userSwiper = {
    data: {},

    attr: {
        slider: 'slider',
        slide: 'slider__slide',
        slideActive: 'slider__slide_active',
        buttonPrev: 'slider__navigation-prev',
        buttonNext: 'slider__navigation-next',
        buttonDisabled: 'slider__navigation-button_disabled',
    },

    init: function () {
        const data = this.data;
        const attr = this.attr;
        const initialSlide = 1;

        data.Slider = new Swiper(`.${attr.slider}`, {
            speed: 200,
            slidesPerView: 6,
            initialSlide: initialSlide,
            resistanceRatio: .5,
            roundLengths: true,
            simulateTouch: true,
            slidesOffsetBefore: 100,
            slidesOffsetAfter: 0,
            preventClicksPropagation: false,
            // on: {
            //     slideChangeTransitionEnd: () => {
            //         data.counter = data.Slider.activeIndex;
            //         this.removeSlidesActiveClass();
            //         this.navigationAction();
            //         data.sliderAllSlides[data.counter].classList.add(attr.slideActive);
            //     },
            // },
        });

        data.counter = initialSlide;
        data.sliderAllSlides = data.Slider.slides;
        data.sliderActiveIndex = data.Slider.activeIndex;
        data.sliderPrevButton = document.getElementsByClassName(attr.buttonPrev)[0];
        data.sliderNextButton = document.getElementsByClassName(attr.buttonNext)[0];
        data.sliderAllSlides[data.sliderActiveIndex].classList.add(attr.slideActive);

        this.navigationAction();
        this.click = this.click.bind(this);

        document.addEventListener('click', this.click);
    },

    click: function (event) {
        const attr = this.attr;
        const target = event.target;
        const slide = target.closest(`.${attr.slide}`);
        const prevButton = target.closest(`.${attr.buttonPrev}`);
        const nextButton = target.closest(`.${attr.buttonNext}`);
    
        if (slide) {
            this.setActiveSlide(slide);
        }
    
        if (prevButton) {
            this.setPrevButton();
        }
    
        if (nextButton) {
            this.setNextButton();
        }
    
        this.navigationAction();
    },

    setActiveSlide: function (slide) {
        if (!slide) {
            return;
        }

        const data = this.data;
        const attr = this.attr;

        data.counter = slide.textContent * 1;
        this.removeSlidesActiveClass();
        data.Slider.slideTo(data.counter);
        data.sliderAllSlides[data.counter].classList.add(attr.slideActive);
    },

    setPrevButton: function () {
        const data = this.data;
        const attr = this.attr;

        let prevIndex = data.counter - 1;
        
        data.Slider.slidePrev();

        if (data.sliderAllSlides[prevIndex]) {
            data.counter--;
            this.removeSlidesActiveClass();
            data.sliderAllSlides[data.counter].classList.add(attr.slideActive);
        }
    },

    setNextButton: function () {
        const data = this.data;
        const attr = this.attr;

        let nextIndex = data.counter + 1;
            
        data.Slider.slideNext();

        if (data.sliderAllSlides[nextIndex]) {
            data.counter++;
            this.removeSlidesActiveClass();
            data.sliderAllSlides[data.counter].classList.add(attr.slideActive);
        }
    },

    navigationAction: function () {
        const data = this.data;
        const attr = this.attr;

        if (data.counter === 0) {
            data.sliderPrevButton.classList.add(attr.buttonDisabled);
        } else {
            data.sliderPrevButton.classList.remove(attr.buttonDisabled);
        }
    
        if (data.counter === data.sliderAllSlides.length - 1) {
            data.sliderNextButton.classList.add(attr.buttonDisabled);
        } else {
            data.sliderNextButton.classList.remove(attr.buttonDisabled);
        }
    },

    removeSlidesActiveClass: function () {
        const data = this.data;
        const attr = this.attr;
        const slides = data.sliderAllSlides;

        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove(attr.slideActive);
        }
    },
};

userSwiper.init();