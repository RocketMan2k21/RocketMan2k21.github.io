let currentSlide = 0;

    function showSlide(index) {
        const carousel = document.getElementById('carousel');
        const slideWidth = document.querySelector('.carousel-item').offsetWidth;
        currentSlide = index;
        carousel.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
    }

    function nextSlide() {
        const totalSlides = document.querySelectorAll('.carousel-item').length;
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function startCarousel() {
        showSlide(currentSlide); // Показати перший слайд
        setInterval(nextSlide, 2000); // Автоматичне перемикання кожні 2 секунди
    }

    // Викликати функцію startCarousel при завантаженні сторінки
    window.onload = startCarousel;