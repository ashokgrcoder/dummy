// Enhanced Portfolio JavaScript with Completely Fixed Navigation

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initializeLoadingScreen();
    initializeParticles();
    initializeCustomCursor();
    initializeScrollProgress();
    initializeNavigation();
    initializeAOS();
    initializeTypingAnimations();
    initializeCounterAnimations();
    initializeSkillBars();
    initializeFormAnimations();
    initializeBackToTop();
    initializeGSAPAnimations();
    initializeSmoothScrolling();
});

// Loading Screen Animation
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    let progress = 0;
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'visible';
                
                // Trigger hero animations with GSAP if available
                if (typeof gsap !== 'undefined') {
                    gsap.from('.hero-content > *', {
                        duration: 1,
                        y: 50,
                        opacity: 0,
                        stagger: 0.2,
                        ease: "power3.out"
                    });
                }
            }, 500);
        }
        
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
    }, 100);
}

// Enhanced Particle.js Configuration
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: { value: ['#5e3aee', '#00c49a', '#32a0cc'] },
                shape: {
                    type: ['circle', 'triangle'],
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.3,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#5e3aee',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: ['grab', 'bubble']
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 200,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    bubble: {
                        distance: 250,
                        size: 8,
                        duration: 2,
                        opacity: 0.8,
                        speed: 3
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Custom Cursor with Mouse Follower
function initializeCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
    });
    
    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .btn, .skill-card, .service-card, .project-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(1.5)';
            cursorFollower.style.transform += ' scale(1.2)';
            cursorFollower.style.borderColor = '#5e3aee';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
            cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.2)', '');
            cursorFollower.style.borderColor = '#5e3aee';
        });
    });
}

// Scroll Progress Indicator
function initializeScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    
    if (!scrollProgress) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        
        scrollProgress.style.transform = `scaleX(${scrollPercent})`;
    });
}

// Enhanced Navigation with Fixed Scrolling
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }
}

// Comprehensive Smooth Scrolling Function
function initializeSmoothScrolling() {
    // Smooth scroll function
    function smoothScrollTo(target) {
        if (!target) return;
        
        // Calculate offset for fixed navbar
        const navbarHeight = document.getElementById('navbar').offsetHeight || 80;
        const targetPosition = target.offsetTop - navbarHeight - 20;
        
        // Use GSAP if available, otherwise fallback to native smooth scroll
        if (typeof gsap !== 'undefined') {
            gsap.to(window, {
                duration: 1.2,
                scrollTo: { y: targetPosition, autoKill: true },
                ease: "power2.inOut"
            });
        } else {
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Handle all navigation links - more comprehensive selector
    const allNavigationLinks = document.querySelectorAll('a[href^="#"]');
    
    // Remove duplicate/conflicting event listeners for navigation links
    // Use only one event listener for all anchor links with href starting with #
    allNavigationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if the link is an in-page anchor
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // Close mobile menu if open
                const mobileNavLinks = document.querySelector('.nav-links');
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileNavLinks && mobileNavLinks.classList.contains('active')) {
                mobileNavLinks.classList.remove('active');
                if (mobileMenu) {
                    const icon = mobileMenu.querySelector('i');
                    if (icon) {
                    icon.className = 'fas fa-bars';
                    }
                }
                }

                // Remove tabindex/focus from menu to avoid double tap on mobile
                if (document.activeElement) {
                document.activeElement.blur();
                }

                // Use setTimeout to ensure scroll works after menu closes
                setTimeout(() => {
                smoothScrollTo(targetElement);
                }, 10);
            }
            }
        });

        // Removed touchstart event to prevent double tap issue on mobile.
    });
}

// Remove duplicate/conflicting event listeners for navigation links
// Navigation smooth scroll is handled in initializeSmoothScrolling()

// Initialize AOS (Animate On Scroll)
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100,
            delay: 0,
            anchorPlacement: 'top-bottom'
        });
    }
}

// Advanced Typing Animations
function initializeTypingAnimations() {
    // Hero typing animation
    const heroTypingElement = document.getElementById('typing-text');
    const heroTexts = [
        'Full-Stack Developer',
        'Software Developer', 
        'Problem Solver'
    ];
    
    if (heroTypingElement) {
        typeWriter(heroTypingElement, heroTexts, 100, 2000);
    }
    
    // About section typing animation
    const aboutTypingElement = document.getElementById('typing-role');
    const aboutTexts = [
        'Full-Stack Developer',
        'Software Developer',
        'Programmer',
        'Tech Innovator'
    ];
    
    if (aboutTypingElement) {
        setTimeout(() => {
            typeWriter(aboutTypingElement, aboutTexts, 80, 1500);
        }, 1000);
    }
}

function typeWriter(element, texts, speed = 100, pauseTime = 2000) {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    
    function type() {
        const fullText = texts[textIndex];
        
        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        element.textContent = currentText;
        
        let typeSpeed = speed;
        
        if (isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!isDeleting && charIndex === fullText.length) {
            typeSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 500);
}

// Counter Animations
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(easeOutQuart * target);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Skill Bar Animations
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    const observerOptions = {
        threshold: 0.8,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                // Fallback animation if GSAP is not available
                if (typeof gsap !== 'undefined') {
                    gsap.to(skillBar, {
                        width: width + '%',
                        duration: 1.5,
                        ease: 'power2.out',
                        delay: 0.2
                    });
                } else {
                    setTimeout(() => {
                        skillBar.style.transition = 'width 1.5s ease-out';
                        skillBar.style.width = width + '%';
                    }, 200);
                }
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Enhanced Form Animations
function initializeFormAnimations() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    const form = document.querySelector('#contact form');
    
    // Input focus animations
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            const line = this.nextElementSibling;
            if (line && line.classList.contains('form-line')) {
                if (typeof gsap !== 'undefined') {
                    gsap.to(line, {
                        width: '100%',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                    
                    gsap.to(this, {
                        scale: 1.02,
                        duration: 0.2,
                        ease: 'power2.out'
                    });
                } else {
                    line.style.transition = 'width 0.3s ease';
                    line.style.width = '100%';
                    this.style.transform = 'scale(1.02)';
                }
            }
        });
        
        input.addEventListener('blur', function() {
            const line = this.nextElementSibling;
            if (line && line.classList.contains('form-line')) {
                if (!this.value) {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(line, {
                            width: '0%',
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    } else {
                        line.style.width = '0%';
                    }
                }
                
                if (typeof gsap !== 'undefined') {
                    gsap.to(this, {
                        scale: 1,
                        duration: 0.2,
                        ease: 'power2.out'
                    });
                } else {
                    this.style.transform = 'scale(1)';
                }
            }
        });
    });
    
    // Form submission animation
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    form.reset();
                }, 2000);
            }, 2000);
        });
    }
}

// Completely Fixed Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Handle click event with multiple event listeners to ensure it works
    function scrollToTop(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Use GSAP if available, otherwise fallback to native smooth scroll
        if (typeof gsap !== 'undefined') {
            gsap.to(window, {
                duration: 1.2,
                scrollTo: { y: 0, autoKill: true },
                ease: "power2.inOut"
            });
        } else {
            // Fallback smooth scroll
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Alternative fallback for browsers that don't support smooth behavior
        if (!('scrollBehavior' in document.documentElement.style)) {
            let currentScroll = window.pageYOffset;
            const scrollStep = Math.PI / (500 / 15);
            const cosParameter = currentScroll / 2;
            let scrollCount = 0;
            let scrollMargin;
            
            const scrollInterval = setInterval(() => {
                if (window.pageYOffset !== 0) {
                    scrollCount++;
                    scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
                    window.scrollTo(0, currentScroll - scrollMargin);
                } else {
                    clearInterval(scrollInterval);
                }
            }, 15);
        }
    }
    
    // Add multiple event listeners to ensure it works
    backToTopBtn.addEventListener('click', scrollToTop);
    backToTopBtn.addEventListener('click', scrollToTop);
    
    // Also handle the icon inside the button
    const backToTopIcon = backToTopBtn.querySelector('i');
    if (backToTopIcon) {
        backToTopIcon.addEventListener('click', scrollToTop);
    }
}

// Advanced GSAP Animations
function initializeGSAPAnimations() {
    if (typeof gsap === 'undefined') return;
    
    // Register ScrollTrigger plugin if available
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Floating elements animation
    gsap.to('.floating-element', {
        y: -30,
        rotation: 360,
        duration: 4,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.5
    });
    
    // Service cards hover animation
    document.querySelectorAll('.service-card').forEach(card => {
        const icon = card.querySelector('.floating-icon');
        if (icon) {
            card.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    y: -10,
                    rotation: 10,
                    scale: 1.1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        }
    });
    
    // Project card image animation
    document.querySelectorAll('.project-card').forEach(card => {
        const image = card.querySelector('.project-image img');
        if (image) {
            card.addEventListener('mouseenter', () => {
                gsap.to(image, {
                    scale: 1.1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(image, {
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        }
    });
    
    // Social links animation
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                y: -5,
                scale: 1.1,
                rotation: 5,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
    });
    
    // Button hover animations
    document.querySelectorAll('.btn').forEach(btn => {
        const icon = btn.querySelector('i');
        
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            if (icon) {
                gsap.to(icon, {
                    rotation: 10,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            if (icon) {
                gsap.to(icon, {
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// Utility Functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Performance optimizations
const debouncedResize = debounce(() => {
    // Refresh AOS on resize
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
    
    // Refresh ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}, 250);

window.addEventListener('resize', debouncedResize);

// Hide loading screen on page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Console welcome message
console.log('%c👋 Welcome to Ashok G R\'s Portfolio!', 'color: #5e3aee; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with modern web technologies and enhanced animations', 'color: #00c49a; font-size: 14px;');
console.log('%cContact: ashokramesh828@gmail.com', 'color: #333; font-size: 12px;');