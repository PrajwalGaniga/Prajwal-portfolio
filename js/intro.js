document.addEventListener('DOMContentLoaded', () => {
    const pageIntro = document.getElementById('page-intro');

    // Simulate a loading delay for the intro animation
    setTimeout(() => {
        if (pageIntro) {
            pageIntro.classList.add('hidden'); // Fade out the intro
            // Optional: Remove the element from DOM after transition to ensure no clicks
            pageIntro.addEventListener('transitionend', () => {
                pageIntro.remove();
                document.body.style.overflow = ''; // Restore scroll
            }, { once: true });
        }
        document.body.style.overflow = 'hidden'; // Prevent scrolling during intro
    }, 2500); // Intro lasts for 2.5 seconds (adjust as needed)
});