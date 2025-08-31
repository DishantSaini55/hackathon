document.addEventListener("DOMContentLoaded", function() {
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Add Font Awesome if not already present
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontAwesome = document.createElement('link');
        fontAwesome.rel = 'stylesheet';
        fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(fontAwesome);
    }

    // Add Google Fonts if not already present
    if (!document.querySelector('link[href*="fonts.googleapis.com/css"]')) {
        const googleFonts = document.createElement('link');
        googleFonts.rel = 'stylesheet';
        googleFonts.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
        document.head.appendChild(googleFonts);
    }

    // Configure orb animations and positions
    configureOrbs();
    
    // Add parallax mouse movement effect
    initParallaxEffect();
    
    // Apply glass morphism effect to elements
    applyGlassEffect();
    
    // Add floating animation for certain elements
    addFloatingAnimation();
    
    // Add header scroll effect
    addHeaderScrollEffect();
    
    // Get DOM elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const subjectsContainer = document.getElementById('subjects-container');
    const subjectSearch = document.getElementById('subject-search');
    const modal = document.getElementById('subject-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalSubjectContent = document.getElementById('modal-subject-content');
    const newsletterForm = document.getElementById('newsletter-form');

    // Sample subject images for cards
    const subjectImages = {
        'Mathematics-1': 'https://img.freepik.com/free-vector/hand-drawn-mathematics-background_23-2148157500.jpg',
        'English': 'https://img.freepik.com/free-vector/english-text-arrangement-concept_23-2148290568.jpg',
        'Data Structures and Algorithms': 'https://img.freepik.com/free-vector/programmer-working-web-development-code-engineer-programming-python-php-java-script-computer_90220-249.jpg',
        'Computer Programming': 'https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg',
        'Environmental Science': 'https://img.freepik.com/free-vector/hand-drawn-environment-background_23-2148231329.jpg'
    };
    
    // Toggle hamburger menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close modal when clicking on the close button
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            
            // Simple validation
            if (email) {
                // Here you would normally send this to a server
                alert(`Thank you for subscribing with ${email}! You'll receive updates soon.`);
                newsletterForm.reset();
            }
        }); 
    }

    // Testimonial slider functionality
    const dots = document.querySelectorAll('.dot');
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Initialize the first testimonial
    if (testimonials.length > 0) {
        showTestimonial(currentTestimonial);
        
        // Add event listeners to dots
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentTestimonial = i;
                showTestimonial(currentTestimonial);
            });
        });
        
        // Auto rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Load subjects when the page loads
    loadSubjects();
    
    // Search functionality
    if (subjectSearch) {
        subjectSearch.addEventListener('input', async () => {
            const searchTerm = subjectSearch.value.toLowerCase();
            
            try {
                const response = await fetch('data.json');
                const data = await response.json();
                
                const filteredSubjects = data.subjects.filter(subject => 
                    subject.subject.toLowerCase().includes(searchTerm) || 
                    subject.syllabus.toLowerCase().includes(searchTerm)
                );
                
                displaySubjects(filteredSubjects);
            } catch (error) {
                console.error('Error searching subjects:', error);
            }
        });
    }
    
    // Show DSA resources
    const dsaBtn = document.getElementById('show-dsa-resources');
    if (dsaBtn) {
        dsaBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            try {
                const response = await fetch('data.json');
                const data = await response.json();
                
                const dsaSubject = data.subjects.find(subject => 
                    subject.subject.toLowerCase().includes('data structure') || 
                    subject.subject.toLowerCase().includes('dsa')
                );
                
                if (dsaSubject) {
                    showSubjectDetails(dsaSubject);
                } else {
                    alert('DSA resources not found. Please check back later.');
                }
            } catch (error) {
                console.error('Error loading DSA resources:', error);
            }
        });
    }
    
    // Show Brahmastra resources
    const brahmastraBtn = document.getElementById('show-brahmastra-resources');
    if (brahmastraBtn) {
        brahmastraBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const brahmastraContent = `
                <div class="subject-detail-header">
                    <h2>Brahmastra Resources</h2>
                    <p>Ultimate weapons for your academic success</p>
                </div>
                
                <div class="resource-category">
                    <h3><i class="fas fa-bolt"></i> Quick Revision Materials</h3>
                    <div class="resource-list">
                        <div class="resource-item">
                            <i class="fas fa-file-pdf"></i>
                            <div class="resource-item-content">
                                <h4>Last Minute Revision Notes</h4>
                                <p>Comprehensive notes covering all important topics across subjects</p>
                            </div>
                        </div>
                        <div class="resource-item">
                            <i class="fas fa-file-pdf"></i>
                            <div class="resource-item-content">
                                <h4>Formula Sheets</h4>
                                <p>All important formulas in one place for quick reference</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="resource-category">
                    <h3><i class="fas fa-bolt"></i> Exam Strategy Guides</h3>
                    <div class="resource-list">
                        <div class="resource-item">
                            <i class="fas fa-file-alt"></i>
                            <div class="resource-item-content">
                                <h4>Time Management During Exams</h4>
                                <p>Effective strategies for managing time during exams</p>
                            </div>
                        </div>
                        <div class="resource-item">
                            <i class="fas fa-file-alt"></i>
                            <div class="resource-item-content">
                                <h4>Question Paper Analysis</h4>
                                <p>Patterns and trends in previous year question papers</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="resource-category">
                    <h3><i class="fas fa-bolt"></i> Special Resources</h3>
                    <div class="resource-list">
                        <div class="resource-item">
                            <i class="fas fa-video"></i>
                            <div class="resource-item-content">
                                <h4>One-Shot Revision Videos</h4>
                                <p>Complete subject revision in single comprehensive videos</p>
                            </div>
                        </div>
                        <div class="resource-item">
                            <i class="fas fa-laptop-code"></i>
                            <div class="resource-item-content">
                                <h4>Interactive Quizzes</h4>
                                <p>Test your knowledge with subject-wise quizzes</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            modalSubjectContent.innerHTML = brahmastraContent;
            modal.style.display = 'flex';
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (hamburger && hamburger.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Initialize typed.js effect if available
    initTypedEffect();
    
    // Add animation keyframes dynamically
    addAnimationKeyframes();
});

// Add animation keyframes dynamically
function addAnimationKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-1 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(30px, -30px) rotate(5deg); }
        }
        @keyframes float-2 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(-20px, 40px) rotate(-5deg); }
        }
        @keyframes float-3 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(25px, 15px) rotate(3deg); }
            66% { transform: translate(-15px, 30px) rotate(-3deg); }
        }
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
        }
        @keyframes shimmer {
            0% { background-position: -100% 0; }
            100% { background-position: 200% 0; }
        }
        @keyframes glow {
            0%, 100% { box-shadow: 0 0 5px rgba(139, 92, 246, 0.5); }
            50% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.8); }
        }
    `;
    document.head.appendChild(style);
}

// Configure orbs with random animations
function configureOrbs() {
    // Add orbs to the main sections if they don't exist
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, sectionIndex) => {
        // Check if section already has orbs
        if (section.querySelector('.orb')) return;
        
        // Add 2-3 orbs per section
        const orbCount = Math.floor(Math.random() * 2) + 2;
        
        for (let i = 0; i < orbCount; i++) {
            const orb = document.createElement('div');
            
            // Determine orb type
            let orbClass;
            if (i % 3 === 0) {
                orbClass = 'orb-purple';
            } else if (i % 3 === 1) {
                orbClass = 'orb-blue';
            } else {
                orbClass = 'orb-orange';
            }
            
            orb.className = `orb ${orbClass}`;
            
            // Set size (random between 250-450px)
            const size = Math.floor(Math.random() * 200) + 250;
            orb.style.width = `${size}px`;
            orb.style.height = `${size}px`;
            
            // Set position based on section size and orb index
            const positionX = Math.floor(Math.random() * 100);
            const positionY = Math.floor(Math.random() * 100);
            
            if (i % 4 === 0) {
                orb.style.top = `-${Math.floor(Math.random() * 50) + 50}px`;
                orb.style.left = `${positionX}%`;
            } else if (i % 4 === 1) {
                orb.style.bottom = `-${Math.floor(Math.random() * 50) + 50}px`;
                orb.style.right = `${positionX}%`;
            } else if (i % 4 === 2) {
                orb.style.top = `${positionY}%`;
                orb.style.left = `-${Math.floor(Math.random() * 50) + 50}px`;
            } else {
                orb.style.bottom = `${positionY}%`;
                orb.style.right = `-${Math.floor(Math.random() * 50) + 50}px`;
            }
            
            // Add floating animation
            orb.style.animation = `float-${(i % 3) + 1} ${Math.floor(Math.random() * 10) + 20}s infinite ease-in-out`;
            
            section.appendChild(orb);
        }
    });
}

// Add parallax mouse movement effect
function initParallaxEffect() {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Apply subtle movement to orbs
        document.querySelectorAll('.orb').forEach((orb, index) => {
            const depth = 0.05 + (index % 3) * 0.02; // Different depths for different orbs
            const moveX = (mouseX - 0.5) * depth * 100;
            const moveY = (mouseY - 0.5) * depth * 100;
            
            orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        // Apply subtle movement to glass cards for 3D effect
        document.querySelectorAll('.glass-card').forEach((card) => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            const distanceX = (e.clientX - cardCenterX) / rect.width;
            const distanceY = (e.clientY - cardCenterY) / rect.height;
            
            if (Math.abs(distanceX) < 2 && Math.abs(distanceY) < 2) {
                card.style.transform = `perspective(1000px) rotateY(${distanceX * 5}deg) rotateX(${distanceY * -5}deg) scale3d(1.02, 1.02, 1.02)`;
            }
        });
    });
    
    // Reset transforms when mouse leaves
    document.querySelectorAll('.glass-card').forEach((card) => {
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Apply glass effect to cards
function applyGlassEffect() {
    // Add glass effect to elements that don't already have it
    document.querySelectorAll('.subject-card, .resource-list, .testimonial, .feature-card, .contact-form, .contact-info, .footer-nav, .footer-newsletter, .footer-about, .footer-bottom, .modal-content').forEach(card => {
        if (!card.classList.contains('glass-card')) {
            card.classList.add('glass-card');
            
            // Add glow element if it doesn't exist
            if (!card.querySelector('.glow')) {
                const glow = document.createElement('div');
                glow.classList.add('glow');
                card.prepend(glow);
            }
        }
    });
    
    // Add glass border effect
    document.querySelectorAll('.glass-card').forEach(card => {
        // Add a subtle border glow effect on hover
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = 'rgba(139, 92, 246, 0.3)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 15px rgba(139, 92, 246, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            card.style.boxShadow = '';
        });
    });
}

// Add floating animation to certain elements
function addFloatingAnimation() {
    // Add floating animation to specific elements
    document.querySelectorAll('.feature-icon, .subject-icon, .hero img').forEach((element, index) => {
        element.style.animation = `float-${(index % 3) + 1} ${Math.floor(Math.random() * 5) + 8}s infinite ease-in-out`;
    });
    
    // Add pulse animation to buttons
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach((button) => {
        button.addEventListener('mouseenter', () => {
            button.style.animation = 'pulse 1s ease-in-out infinite';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.animation = '';
        });
    });
}

// Add header scroll effect
function addHeaderScrollEffect() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Initialize typed.js effect if available
function initTypedEffect() {
    if (typeof Typed !== 'undefined') {
        const heroTitle = document.querySelector('.hero h1 span');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            
            new Typed(heroTitle, {
                strings: [text],
                typeSpeed: 40,
                backSpeed: 0,
                loop: false,
                showCursor: true,
                cursorChar: '|',
                onComplete: (self) => {
                    setTimeout(() => {
                        self.cursor.style.display = 'none';
                    }, 1500);
                }
            });
        }
    }
}

// Fetch and display subjects
async function loadSubjects() {
    const subjectsContainer = document.getElementById('subjects-container');
    if (!subjectsContainer) return;
    
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        displaySubjects(data.subjects);
    } catch (error) {
        console.error('Error loading subjects:', error);
        subjectsContainer.innerHTML = '<p class="error-message">Failed to load subjects. Please try again later.</p>';
    }
}

// Display subjects in the grid
function displaySubjects(subjects) {
    const subjectsContainer = document.getElementById('subjects-container');
    if (!subjectsContainer) return;
    
    subjectsContainer.innerHTML = '';
    
    // Subject images and course codes
    const subjectData = {
        'Mathematics-1': {
            image: 'https://img.freepik.com/free-vector/hand-drawn-mathematics-background_23-2148157500.jpg',
            code: 'FCMT0101_Mathematics-1'
        },
        'English': {
            image: 'https://img.freepik.com/free-vector/english-text-arrangement-concept_23-2148290568.jpg',
            code: 'FCEN0101_English'
        },
        'Data Structures and Algorithms': {
            image: 'https://img.freepik.com/free-vector/programmer-working-web-development-code-engineer-programming-python-php-java-script-computer_90220-249.jpg',
            code: 'FCCT0201_DSA'
        },
        'Computer Programming': {
            image: 'https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg',
            code: 'FCCT0101_Computer_Programming'
        },
        'Environmental Science': {
            image: 'https://img.freepik.com/free-vector/hand-drawn-environment-background_23-2148231329.jpg',
            code: 'FCES0101_Environmental_Science'
        }
    };
    
    subjects.forEach((subject, index) => {
        const data = subjectData[subject.subject] || {
            image: 'https://img.freepik.com/free-vector/online-learning-isometric-concept_1284-17947.jpg',
            code: 'FC_' + subject.subject.replace(/\s+/g, '_')
        };
        
        const subjectCard = document.createElement('div');
        subjectCard.classList.add('subject-card');
        subjectCard.setAttribute('data-aos', 'fade-up');
        subjectCard.setAttribute('data-aos-delay', (index % 4) * 100);
        
        subjectCard.innerHTML = `
            <div class="subject-image">
                <img src="${data.image}" alt="${subject.subject}">
            </div>
            <div class="subject-content">
                <h3>${subject.subject}</h3>
                <p>${getSubjectDescription(subject)}</p>
                <div class="subject-details">
                    <span class="subject-tag">${data.code}</span>
                    <a href="#" class="subject-btn">Explore <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `;
        
        // Add click event to view subject details
        subjectCard.querySelector('.subject-btn').addEventListener('click', (e) => {
            e.preventDefault();
            showSubjectDetails(subject);
        });
        
        subjectsContainer.appendChild(subjectCard);
    });
}

// Get a short description for the subject card
function getSubjectDescription(subject) {
    const unitCount = Object.keys(subject.units || {}).length;
    const resourceCount = (
        (subject.notes ? subject.notes.length : 0) + 
        (subject.playlists ? subject.playlists.length : 0) +
        (subject.practical_files ? subject.practical_files.length : 0) +
        (Object.keys(subject.tutorial_sheets || {}).length / 2)
    );
    
    return `${unitCount} units with ${resourceCount} resources including notes, videos, and practice materials.`;
}

// Show subject details in modal
function showSubjectDetails(subject) {
    const modalSubjectContent = document.getElementById('modal-subject-content');
    const modal = document.getElementById('subject-modal');
    if (!modalSubjectContent || !modal) return;
    
    // Find the subject data with course code
    const subjectData = {
        'Mathematics-1': {
            code: 'FCMT0101_Mathematics-1'
        },
        'English': {
            code: 'FCEN0101_English'
        },
        'Data Structures and Algorithms': {
            code: 'FCCT0201_DSA'
        },
        'Computer Programming': {
            code: 'FCCT0101_Computer_Programming'
        },
        'Environmental Science': {
            code: 'FCES0101_Environmental_Science'
        }
    };
    
    const subjectCode = subjectData[subject.subject] ? subjectData[subject.subject].code : 'FC_' + subject.subject.replace(/\s+/g, '_');
    
    // Create content for the modal
    let modalContent = `
        <div class="subject-detail-header">
            <h2>${subject.subject}</h2>
            <p>${subjectCode}</p>
        </div>
    `;
    
    // Books section
    if (subject.books && subject.books.length) {
        modalContent += `
            <div class="resource-category">
                <h3><i class="fas fa-book"></i> Recommended Books</h3>
                <div class="resource-list">
        `;
        
        subject.books.forEach(book => {
            modalContent += `
                <div class="resource-item">
                    <i class="fas fa-book-open"></i>
                    <div class="resource-item-content">
                        <h4>${book}</h4>
                    </div>
                </div>
            `;
        });
        
        modalContent += `</div></div>`;
    }
    
    // Units section
    if (subject.units && Object.keys(subject.units).length) {
        modalContent += `
            <div class="resource-category">
                <h3><i class="fas fa-list-ul"></i> Units</h3>
                <div class="unit-tabs">
        `;
        
        // Create unit tabs
        Object.keys(subject.units).forEach((unit, index) => {
            const activeClass = index === 0 ? 'active' : '';
            modalContent += `<div class="unit-tab ${activeClass}" data-unit="${unit}">${unit}</div>`;
        });
        
        modalContent += `</div>`;
        
        // Create unit content sections
        Object.entries(subject.units).forEach(([unit, content], index) => {
            const activeClass = index === 0 ? 'active' : '';
            modalContent += `
                <div class="unit-content ${activeClass}" id="${unit.replace(' ', '-').toLowerCase()}">
                    <div class="resource-list">
                        <div class="resource-item">
                            <i class="fas fa-clipboard-list"></i>
                            <div class="resource-item-content">
                                <h4>${unit}</h4>
                                <p>${content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        modalContent += `</div>`;
    }
    
    // Notes section
    if (subject.notes && subject.notes.length) {
        modalContent += `
            <div class="resource-category">
                <h3><i class="fas fa-sticky-note"></i> Lecture Notes</h3>
                <div class="resource-list">
        `;
        
        subject.notes.forEach(note => {
            modalContent += `
                <div class="resource-item">
                    <i class="fas fa-file-alt"></i>
                    <div class="resource-item-content">
                        <h4>Lecture Notes</h4>
                        <p><a href="${note}" target="_blank">${note}</a></p>
                    </div>
                </div>
            `;
        });
        
        modalContent += `</div></div>`;
    }
    
    // Playlists section
    if (subject.playlists && subject.playlists.length) {
        modalContent += `
            <div class="resource-category">
                <h3><i class="fas fa-play-circle"></i> Video Playlists</h3>
                <div class="resource-list">
        `;
        
        subject.playlists.forEach(playlist => {
            modalContent += `
                <div class="resource-item">
                    <i class="fab fa-youtube"></i>
                    <div class="resource-item-content">
                        <h4>Video Lectures</h4>
                        <p><a href="${playlist}" target="_blank">${playlist}</a></p>
                    </div>
                </div>
            `;
        });
        
        modalContent += `</div></div>`;
    }
    
    // Tutorial sheets section
    if (subject.tutorial_sheets && Object.keys(subject.tutorial_sheets).length) {
        modalContent += `
            <div class="resource-category">
                <h3><i class="fas fa-tasks"></i> Tutorial Sheets</h3>
                <div class="resource-list">
        `;
        
        Object.entries(subject.tutorial_sheets).forEach(([key, value]) => {
            modalContent += `
                <div class="resource-item">
                    <i class="fas fa-file-pdf"></i>
                    <div class="resource-item-content">
                        <h4>${key}</h4>
                        <p>${value.startsWith('http') ? `<a href="${value}" target="_blank">Download</a>` : value}</p>
                    </div>
                </div>
            `;
        });
        
        modalContent += `</div></div>`;
    }
    
    // Previous year questions section
    if (subject.previous_year_questions && Object.keys(subject.previous_year_questions).length) {
        modalContent += `
            <div class="resource-category">
                <h3><i class="fas fa-history"></i> Previous Year Questions</h3>
                <div class="resource-list">
        `;
        
        Object.entries(subject.previous_year_questions).forEach(([key, value]) => {
            modalContent += `
                <div class="resource-item">
                    <i class="fas fa-file-pdf"></i>
                    <div class="resource-item-content">
                        <h4>${key}</h4>
                        <p><a href="${value}" target="_blank">${value}</a></p>
                    </div>
                </div>
            `;
        });
        
        modalContent += `</div></div>`;
    }
    
    // Extra resources section
    if (subject.extra_resources && subject.extra_resources.length) {
        modalContent += `
            <div class="resource-category">
                <h3><i class="fas fa-star"></i> Extra Resources</h3>
                <div class="resource-list">
        `;
        
        subject.extra_resources.forEach(resource => {
            modalContent += `
                <div class="resource-item">
                    <i class="fas fa-lightbulb"></i>
                    <div class="resource-item-content">
                        <h4>${resource}</h4>
                    </div>
                </div>
            `;
        });
        
        modalContent += `</div></div>`;
    }
    
    // Set modal content and display it
    modalSubjectContent.innerHTML = modalContent;
    modal.style.display = 'flex';
    
    // Add event listeners to unit tabs
    const unitTabs = document.querySelectorAll('.unit-tab');
    unitTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const unit = tab.getAttribute('data-unit');
            
            // Update active tab
            unitTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active content
            const unitContents = document.querySelectorAll('.unit-content');
            unitContents.forEach(content => content.classList.remove('active'));
            document.getElementById(unit.replace(' ', '-').toLowerCase()).classList.add('active');
        });
    });
}
