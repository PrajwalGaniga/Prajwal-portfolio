document.addEventListener('DOMContentLoaded', () => {
    const projectCarousels = document.querySelectorAll('.project-image-carousel');
    const carouselsData = []; // To store data and methods for each carousel instance

    projectCarousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-img');
        const leftArrow = carousel.querySelector('.left-arrow');
        const rightArrow = carousel.querySelector('.right-arrow');
        let currentIndex = 0;

        // Function specific to this carousel instance to show an image
        const showImage = (index) => {
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
        };

        // Function specific to this carousel instance to go to the next image
        const nextImage = () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        };

        // Function specific to this carousel instance to go to the previous image
        const prevImage = () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        };

        // Initialize by showing the first image for this specific carousel
        showImage(currentIndex);

        // Store carousel-specific data and its bound functions
        carouselsData.push({
            carouselElement: carousel, // Reference to the DOM element
            images: images,
            currentIndex: currentIndex, // Keep track of current index for this carousel
            showImage: showImage, // Function to show image for this carousel
            nextImage: nextImage, // Function to advance image for this carousel
            prevImage: prevImage // Function to go back image for this carousel
        });

        // Event listeners for manual navigation for THIS specific carousel
        rightArrow.addEventListener('click', () => {
            stopGlobalAutoCycle(); // Pause global auto-cycling on manual interaction
            // Find this specific carousel's data and call its nextImage method
            const currentCarouselData = carouselsData.find(item => item.carouselElement === carousel);
            if (currentCarouselData) {
                currentCarouselData.nextImage();
            }
            startGlobalAutoCycle(); // Resume global auto-cycling after manual interaction
        });

        leftArrow.addEventListener('click', () => {
            stopGlobalAutoCycle(); // Pause global auto-cycling on manual interaction
            // Find this specific carousel's data and call its prevImage method
            const currentCarouselData = carouselsData.find(item => item.carouselElement === carousel);
            if (currentCarouselData) {
                currentCarouselData.prevImage();
            }
            startGlobalAutoCycle(); // Resume global auto-cycling after manual interaction
        });

        // Optional: Pause global auto-cycling when hovering over any carousel
        carousel.addEventListener('mouseenter', stopGlobalAutoCycle);
        carousel.addEventListener('mouseleave', startGlobalAutoCycle);
    });

    let globalIntervalId;

    // Global function to advance all carousels simultaneously
    function advanceAllCarousels() {
        carouselsData.forEach(data => {
            data.nextImage(); // Call nextImage for each carousel instance
        });
    }

    // Global automatic cycling functions
    function startGlobalAutoCycle() {
        if (globalIntervalId) {
            clearInterval(globalIntervalId); // Clear any existing interval to prevent duplicates
        }
        globalIntervalId = setInterval(advanceAllCarousels, 4000); // All carousels change every 4 seconds
    }

    function stopGlobalAutoCycle() {
        clearInterval(globalIntervalId);
    }

    // Start the global automatic cycling when the page loads
    startGlobalAutoCycle();
});