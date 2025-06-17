/* js/scroll-indicator.js */

document.addEventListener('DOMContentLoaded', () => {
    // Create the scroll indicator element dynamically
    const scrollIndicator = document.createElement('div');
    scrollIndicator.classList.add('scroll-down-indicator');
    scrollIndicator.innerHTML = `
        <i class="fas fa-chevron-down scroll-down-arrow"></i>
        <span class="scroll-down-text">Scroll Down</span>
    `;
    document.body.appendChild(scrollIndicator);

    const showDuration = 5000; // Display for 5 seconds
    let scrollTimeout;

    // Function to show the scroll indicator
    function showScrollIndicator() {
        // Only show if the screen width is considered mobile (e.g., <= 768px)
        if (window.innerWidth <= 768) {
            scrollIndicator.classList.add('show');
            // Set a timeout to hide the indicator after `showDuration`
            scrollTimeout = setTimeout(() => {
                scrollIndicator.classList.remove('show');
            }, showDuration);
        }
    }

    // Function to immediately hide the scroll indicator
    function hideScrollIndicator() {
        clearTimeout(scrollTimeout); // Clear any pending hide timeout
        scrollIndicator.classList.remove('show');
    }

    // Wait for the page intro animation to finish before showing the indicator
    // Assuming 'page-intro' fades out within ~2.5 seconds as per your `intro.js`.
    const pageIntro = document.getElementById('page-intro');
    if (pageIntro) {
        setTimeout(() => {
            showScrollIndicator();
        }, 2500); // Delay showing the indicator until after the intro
    } else {
        showScrollIndicator(); // If no intro, show immediately
    }

    // Hide the indicator if the user scrolls the page
    window.addEventListener('scroll', hideScrollIndicator);

    // Re-evaluate and hide if screen size changes (e.g., tablet rotation)
    window.addEventListener('resize', () => {
        hideScrollIndicator();
        // Optionally, if you want it to reappear if the window resizes *back* to mobile:
        // You might need a more sophisticated logic or simply rely on a page refresh.
    });
});