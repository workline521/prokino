document.addEventListener("DOMContentLoaded", function () {
    //инициализация слайдера
    const swiper = new Swiper(".swiper", {
        slidesPerView: 1,
        spaceBetween: 15,
        freeMode: true,
        breakpoints: {
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 22,
            },
        },
    });
    //инициализация слайдера2
    const swiper2 = new Swiper(".slider", {
        slidesPerView: 1,
        spaceBetween: 10,
        freeMode: true,
        noSwiping: true, 
        noSwipingClass: 'swiper-slide', 
        breakpoints: {
            450: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
        },
        on: {
            init: function() {
                initVideoControls();
                initIntersectionObserver();
            },
            slideChange: function() {
                stopAllVideos();
            },
            touchStart: function() {
                stopAllVideos();
            },
            slideChangeTransitionStart: function() {
                stopAllVideos();
            }
        },
    
    });

    // воспроизведение видео в зоне видимости
    function initIntersectionObserver() {
        const options = {
            root: document.querySelector('.slider'),
            rootMargin: '0px',
            threshold: 0.5 
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    const video = entry.target.querySelector('.slider__video');
                    const button = entry.target.querySelector('.play');
                    
                    if (video && !video.paused) {
                        video.pause();
                        video.currentTime = 0;
                        video.removeAttribute('controls');
                        
                        if (button) {
                            button.style.display = '';
                        }
                    }
                }
            });
        }, options);

        document.querySelectorAll('.swiper-slide').forEach(slide => {
            observer.observe(slide);
        });
    }
    function initVideoControls() {
        const playButtons = document.querySelectorAll('.play');
        const videos = document.querySelectorAll('.slider__video');    
        playButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const video = this.nextElementSibling;
                playVideo(video, this);
            });
        });
        document.querySelector('.slider').addEventListener('click', function(e) {
            if (!e.target.closest('.play')) {
                stopAllVideos();
            }
        });
    }
    function playVideo(video, button) {
        stopAllVideos();        
        video.setAttribute('controls', 'true');
        video.play();
        button.style.display = 'none';        
        video.onended = function() {
            video.removeAttribute('controls');
            button.style.display = '';
        };
    }
    function stopAllVideos() {
        document.querySelectorAll('.slider__video').forEach(video => {
            video.pause();
            video.currentTime = 0;
            video.removeAttribute('controls');
        });        
        document.querySelectorAll('.play').forEach(btn => {
            btn.style.display = '';
        });
    }
    window.addEventListener('scroll', function() {
        stopAllVideos();
    });
    window.addEventListener('resize', function() {
        stopAllVideos();
    });
});
