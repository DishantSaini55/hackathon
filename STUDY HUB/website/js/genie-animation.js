// Genie Animation Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animation triggers for logos and genie images
    initGenieAnimations();

    // Initialize intersection observer for reveal effects
    initIntersectionObserver();
});

// Function to initialize genie animations
function initGenieAnimations() {
    // Get all genie logo images - exclude the Genie text span
    const genieImages = document.querySelectorAll('.logo img, .footer-logo img, .hero-image img, .dsa-image img, .brahmastra-image img');
    
    // Reset animations to make sure they restart when visible
    genieImages.forEach(img => {
        img.classList.add('animated-genie');
        
        // Apply different animation delay to each image for staggered effect
        const randomDelay = Math.random() * 0.5;
        img.style.animationDelay = `${randomDelay}s, ${1.5 + randomDelay}s, ${2 + randomDelay}s`;
    });
    
    // Make sure the hero section Genie text doesn't have animation
    const genieText = document.querySelector('.hero h1 span');
    if (genieText) {
        genieText.classList.remove('animated-genie');
        genieText.style.animation = 'none';
    }
    
    // Add click event to restart animations
    genieImages.forEach(img => {
        img.addEventListener('click', function() {
            // Reset animation by removing and adding the class
            this.style.animation = 'none';
            this.offsetHeight; // Trigger reflow
            this.style.animation = ''; // Remove inline style to go back to CSS
            
            // Re-add animation classes with slight delay
            setTimeout(() => {
                this.classList.remove('animated-genie');
                void this.offsetWidth; // Force reflow
                this.classList.add('animated-genie');
            }, 10);
        });
    });
}

// Function to initialize intersection observer
function initIntersectionObserver() {
    // Elements to observe (adding reveal-on-scroll class to elements we want to animate)
    // Exclude the hero h1 span (the Genie text)
    const elementsToReveal = document.querySelectorAll('.logo, .footer-logo, .hero-image, .dsa-image, .brahmastra-image');
    
    elementsToReveal.forEach(element => {
        element.classList.add('reveal-on-scroll');
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If element is in view
            if (entry.isIntersecting) {
                // Add class to start animation
                entry.target.classList.add('is-visible');
                
                // Find genie images inside and restart animations
                const genieImg = entry.target.querySelector('img');
                if (genieImg) {
                    genieImg.style.animation = 'none';
                    genieImg.offsetHeight; // Trigger reflow
                    genieImg.style.animation = ''; // Remove inline style to go back to CSS
                    
                    // Re-add animation with slight delay
                    setTimeout(() => {
                        genieImg.classList.remove('animated-genie');
                        void genieImg.offsetWidth; // Force reflow
                        genieImg.classList.add('animated-genie');
                    }, 10);
                }
            } else {
                // Optional: hide the element when not in view
                // entry.target.classList.remove('is-visible');
            }
        });
    }, {
        root: null, // Use viewport as root
        threshold: 0.2, // When 20% of element is visible
        rootMargin: '0px 0px -10% 0px' // Slightly adjust the trigger area
    });
    
    // Start observing elements
    elementsToReveal.forEach(element => {
        observer.observe(element);
    });
}

// Function to manually restart genie animation
function restartGenieAnimation(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        // Reset animation
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = ''; // Remove inline style
        
        // Re-add animation class
        setTimeout(() => {
            element.classList.remove('animated-genie');
            void element.offsetWidth; // Force reflow
            element.classList.add('animated-genie');
        }, 10);
    });
}

// Add window scroll listener for additional effects
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Add scroll-based effects to genie logos
    const genieLogos = document.querySelectorAll('.logo img, .footer-logo img');
    genieLogos.forEach(logo => {
        // Subtle rotation based on scroll
        const rotateAmount = (scrollPosition % 360) / 60; // Subtle rotation
        logo.style.transform = `rotate(${rotateAmount}deg)`;
    });
});
