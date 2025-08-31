// Modern Testimonials Data
const modernTestimonials = [
  {
    title: "The best study resources for college students",
    quote:
      "\"Study Hub makes it so simple. Their resources make my studying much faster and easier. I just choose the subject, find what I need, and I'm ready to learn. The personalized learning paths have been a game-changer for my exam preparation.\"",
    name: "Dishant",
    role: "Electronics Engineer",
    image: "images/Dishu1.jpg",
    rating: 5
  },
  {
    title: "Study Hub helps you optimize for exam success",
    quote:
      "\"Must-have resource for students who want to excel in their courses. It provides a wide range of well-organized materials that make studying efficient. The practice questions and solution guides were exactly what I needed to boost my confidence.\"",
    name: "Nishant",
    role: "Electronics Engineer",
    image: "images/Nishu.jpg",
    rating: 5
  },
  {
    title: "Transformative learning experience",
    quote:
      "\"I was struggling with my Data Structures course until I found Study Hub's comprehensive guides and practice problems. The way concepts are explained made everything click for me. Now I'm helping other students in my class understand the material!\"",
    name: "Rohit",
    role: "Electronics Engineer",
    image: "images/Shubhu.jpg",
    rating: 5
  }
];

// Function to initialize modern testimonials
function initModernTestimonials() {
  const testimonialContainer = document.querySelector('.testimonials-modern-grid');
  
  if (!testimonialContainer) return;
  
  // Clear any existing content
  testimonialContainer.innerHTML = '';
  
  // Create testimonial cards
  modernTestimonials.forEach((testimonial, index) => {
    const testimonialCard = document.createElement('div');
    testimonialCard.className = `testimonial-modern-card delay-${index + 1}`;
    
    // Generate star rating HTML
    let starsHTML = '';
    for (let i = 0; i < testimonial.rating; i++) {
      starsHTML += '<i class="fas fa-star"></i>';
    }
    
    testimonialCard.innerHTML = `
      <div class="testimonial-quote-icon">"</div>
      <h3 class="testimonial-title">${testimonial.title}</h3>
      <blockquote class="testimonial-quote">${testimonial.quote}</blockquote>
      <div class="testimonial-author">
        <img src="${testimonial.image}" alt="${testimonial.name}">
        <div class="testimonial-author-info">
          <p class="testimonial-author-name">${testimonial.name}</p>
          <p class="testimonial-author-role">${testimonial.role}</p>
          <div class="testimonial-rating">
            ${starsHTML}
          </div>
        </div>
      </div>
    `;
    
    testimonialContainer.appendChild(testimonialCard);
  });
  
  // Add animation on scroll with IntersectionObserver for better performance
  const observeTestimonials = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          // Once the animation is triggered, we don't need to observe anymore
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '-50px'
    });
    
    const cards = document.querySelectorAll('.testimonial-modern-card');
    cards.forEach(card => {
      observer.observe(card);
    });
  };
  
  // Initialize animations
  observeTestimonials();
  
  // Add subtle hover movement effects
  const cards = document.querySelectorAll('.testimonial-modern-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      // Apply subtle rotation based on mouse position
      card.style.transform = `perspective(1000px) rotateX(${deltaY * 5}deg) rotateY(${deltaX * -5}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      // Reset the transform when mouse leaves
      card.style.transform = '';
    });
  });
}

// Add floating orbs animation to testimonial section
function addTestimonialOrbs() {
  const section = document.querySelector('.testimonials-modern');
  if (!section) return;
  
  // Create floating orbs
  const createOrb = (className, size, position) => {
    const orb = document.createElement('div');
    orb.className = `orb ${className}`;
    orb.style.width = `${size}px`;
    orb.style.height = `${size}px`;
    orb.style.top = `${position.top}%`;
    orb.style.left = `${position.left}%`;
    orb.style.opacity = '0.6';
    orb.style.filter = 'blur(70px)';
    orb.style.position = 'absolute';
    orb.style.borderRadius = '50%';
    orb.style.zIndex = '0';
    orb.style.animation = `float-${Math.floor(Math.random() * 3) + 1} ${Math.floor(Math.random() * 10) + 20}s infinite ease-in-out`;
    
    section.appendChild(orb);
  };
  
  // Create multiple orbs with different positions and sizes
  createOrb('orb-purple', 350, { top: -10, left: -10 });
  createOrb('orb-blue', 350, { top: 80, left: 80 });
  createOrb('orb-orange', 250, { top: 40, left: 60 });
  createOrb('orb-purple', 200, { top: 60, left: 20 });
}

// Add this to your existing window.onload or DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
  // Add animation keyframes dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float-1 {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(30px, -30px); }
    }
    @keyframes float-2 {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(-20px, 40px); }
    }
    @keyframes float-3 {
      0%, 100% { transform: translate(0, 0); }
      33% { transform: translate(25px, 15px); }
      66% { transform: translate(-15px, 30px); }
    }
  `;
  document.head.appendChild(style);
  
  // Initialize modern testimonials
  initModernTestimonials();
  
  // Add animated orbs to testimonial section
  addTestimonialOrbs();
});
