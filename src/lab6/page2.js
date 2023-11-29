document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');

    // Fetch carousel data from the server
    fetch('fetch-carousel.php', {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            // Iterate through the data and create carousel items
            data.forEach((item) => {
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                carouselItem.innerText = item?.content || ''; // You may need to adjust this based on your data structure
                carouselContainer.appendChild(carouselItem);
            });

            // Start the carousel
            startCarousel();
        })
        .catch(error => console.error('Error fetching carousel data:', error));
});


function startCarousel(){
    let currentSlide = 0;

    function showSlide(index) {
        const carousel = document.querySelector('.carousel-container');
        const slideWidth = document.querySelector('.carousel-item').offsetWidth;
        currentSlide = index;
        carousel.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
    }

    function nextSlide() {
        const totalSlides = document.querySelectorAll('.carousel-item').length;
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 2000);
}