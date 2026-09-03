import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs'

const rootSelector = '[data-js-slider]'

class Slider {
    selectors = {
        root: rootSelector,
        swiper: '[data-js-slider-swiper]',
        pagination: '[data-js-slider-pagination]',
        previousButton: '[data-js-slider-button-previous]',
        nextButton: '[data-js-slider-button-next]',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.swiperElement = this.rootElement.querySelector(this.selectors.swiper)
        this.paginationElement = this.rootElement.querySelector(this.selectors.pagination)
        this.previousButtonElement = this.rootElement.querySelector(this.selectors.previousButton)
        this.nextButtonElement = this.rootElement.querySelector(this.selectors.nextButton)
        this.init()
    }

    init() {
        const swiperOptions = {
            loop: true,
            navigation: {
                nextEl: this.nextButtonElement,
                prevEl: this.previousButtonElement,
            },
            a11y: {
                prevSlideMessage: 'Предыдущий слайд',
                nextSlideMessage: 'Следующий слайд',
                paginationBulletMessage: 'Перейти к слайду {{index}}',
            },
            breakpoints: {
                769: {
                    allowTouchMove: false,
                },
            },
        }

        if (this.paginationElement) {
            swiperOptions.pagination = {
                el: this.paginationElement,
                bulletActiveClass: 'is-active',
                bulletClass: 'slider__pagination-bullet',
                clickable: true,
            }
        }
        new Swiper(this.swiperElement, swiperOptions)
    }
}

class SliderCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Slider(element)
        })
    }
}

export default SliderCollection