const sliderConfig = {
    services: {
        slidesPerView: 3,
        spaceBetween: 24,
        grid: {
            rows: 2,
            fill: 'rows',
        },
        breakpoints: {
            0: {
                slidesPerView: 'auto',
                grid: {
                    rows: 1,
                },
            },
            768: {
                slidesPerView: 2,
                grid: {
                    rows: 3,
                },
            },
            1024: {
                slidesPerView: 3,
                grid: {
                    rows: 2,
                },
            },
        },
    },
    lawyers: {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 24,
    },
    reviews: {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 24,
        breakpoints: {
            0: {
                slidesPerView: 1,
                centeredSlide: true,
            },
            480: {
                slidesPerView: 'auto',
                spaceBetween: 24,
            },
            768: {
                slidesPerView: 'auto',
                spaceBetween: 24,
            },
        },
    },
    news: {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 24,
    }
}

export default sliderConfig