document.addEventListener("DOMContentLoaded", function () {
    //инициализация слайдера
    const swiper = new Swiper(".swiper", {
        slideToClickedSlide: true,
        slidesPerView: 1,
        spaceBetween: 15,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
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
    });
    // Функция для остановки всех видео и показа всех кнопок play
    const stopAllVideos = () => {
        document.querySelectorAll('.slider__video').forEach(video => {
            video.pause();
            video.currentTime = 0;
            video.removeAttribute('controls');            
            const playButton = video.previousElementSibling;
            if (playButton && playButton.classList.contains('play')) {
                playButton.style.display = 'block';
            }
        });
    };

    /* document.querySelector('.swiper-button-next').addEventListener('click', stopAllVideos);
    document.querySelector('.swiper-button-prev').addEventListener('click', stopAllVideos); */

    // Обработчик для кнопок play
    document.querySelectorAll('.play').forEach(button => {
        button.addEventListener('click', function(e) {
            const video = this.nextElementSibling;
            stopAllVideos();
            video.setAttribute('controls', 'true');
            video.play();            
            this.style.display = 'none';         
            e.stopPropagation();
        });
    });

    // Обработчик для событий окончания видео
    document.querySelectorAll('.slider__video').forEach(video => {
        video.addEventListener('ended', function() {
            const playButton = this.previousElementSibling;
            if (playButton && playButton.classList.contains('play')) {
                playButton.style.display = 'block';
            }
            this.removeAttribute('controls');
        });
        
        video.addEventListener('pause', function() {
            const playButton = this.previousElementSibling;
            if (playButton && playButton.classList.contains('play')) {
                playButton.style.display = 'block';
            }
        });
        
        video.addEventListener('play', function() {
            const playButton = this.previousElementSibling;
            if (playButton && playButton.classList.contains('play')) {
                playButton.style.display = 'none';
            }
        });
    });

    // Блокируем переключение при клике на слайд
    document.querySelectorAll('.swiper-slide').forEach(slide => {
        slide.addEventListener('click', function(e) {
            if (!e.target.closest('.play') && 
                !e.target.closest('.swiper-button-next') && 
                !e.target.closest('.swiper-button-prev')) {
                e.stopPropagation();
            }
        });
    });
});
