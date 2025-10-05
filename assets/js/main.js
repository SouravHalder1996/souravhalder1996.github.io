/*-----------------------------------*\
  #PORTFOLIO JAVASCRIPT
\*-----------------------------------*/

'use strict';

/*-----------------------------------*\
  #NAVBAR SCROLL EFFECT
\*-----------------------------------*/

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/*-----------------------------------*\
  #SMOOTH SCROLLING
\*-----------------------------------*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offset = 80; // Offset for fixed navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*-----------------------------------*\
  #ACTIVE NAVIGATION LINK
\*-----------------------------------*/

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

/*-----------------------------------*\
  #INTERSECTION OBSERVER FOR ANIMATIONS
\*-----------------------------------*/

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger effect
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe all fade-up elements
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/*-----------------------------------*\
  #SKILL BAR ANIMATION
\*-----------------------------------*/

const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger width animation
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

/*-----------------------------------*\
  #CONTACT FORM SUBMISSION
\*-----------------------------------*/

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btn = this.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    
    // Disable button and show loading state
    btn.disabled = true;
    btn.innerHTML = '<span>Sending...</span>';
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Success state
        btn.innerHTML = '<span>Message Sent!</span> <span>✓</span>';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        // Reset after 2 seconds
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            btn.style.background = '';
            this.reset();
        }, 2000);
    }, 1500);
});

/*-----------------------------------*\
  #PREVENT FORM INPUTS FROM BREAKING LAYOUT
\*-----------------------------------*/

const formInputs = document.querySelectorAll('.form-input, .form-textarea');

formInputs.forEach(input => {
    input.addEventListener('input', function() {
        // Auto-grow textarea
        if (this.tagName === 'TEXTAREA') {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        }
    });
});

/*-----------------------------------*\
  #PAGE LOAD ANIMATION
\*-----------------------------------*/

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initial check for visible elements
    updateActiveNav();
});