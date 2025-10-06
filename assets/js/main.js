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

/*-----------------------------------*\
  #PROJECTS FILTER FUNCTIONALITY
\*-----------------------------------*/

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.classList.remove('hidden');
                // Trigger animation
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = '';
                }, 10);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

/*-----------------------------------*\
  #ACHIEVEMENT MODAL
\*-----------------------------------*/

const achievementBadges = document.querySelectorAll('.achievement-badge');
const achievementModal = document.getElementById('achievementModal');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

// Achievement data
const achievementsData = {
    'aws-ccp': {
        title: 'AWS Certified Cloud Practitioner',
        date: 'July 28, 2023',
        description: 'Validates foundational, high-level understanding of AWS Cloud, services, and terminology. This certification demonstrates cloud fluency and foundational AWS knowledge.',
        verifyLink: 'https://www.credly.com/badges/89828c78-d29f-4374-aa61-b0ff77f2ddc3/public_url',
        image: './assets/images/certifications/aws-ccp.png'
    },
    'aws-saa': {
        title: 'AWS Certified Solutions Architect – Associate',
        date: 'June 28, 2023',
        description: 'Validates ability to design distributed systems on AWS. Demonstrates understanding of architectural best practices, cost optimization, and security.',
        verifyLink: 'https://www.credly.com/badges/350f545b-bfe2-4b7b-87a2-070ec661074b/public_url',
        image: './assets/images/certifications/aws-saa.png'
    },
    'aws-dva': {
        title: 'AWS Certified Developer – Associate',
        date: 'October 6, 2023',
        description: 'Validates proficiency in developing, deploying, and debugging cloud-based applications using AWS. Demonstrates expertise in AWS services and best practices.',
        verifyLink: 'https://www.credly.com/badges/dde45ac6-10f8-4689-a975-eea16699392f/public_url',
        image: './assets/images/certifications/aws-dva.png'
    },
    'infosys-award': {
        title: 'Infosys Rise INSTA Awards',
        date: 'November, 2023',
        description: 'Recognition for exceptional performance in handling product teams and resolving issues during critical phases. Demonstrated flexibility, teamwork, and dedication to excellence.',
        verifyLink: '#',
        image: './assets/images/certifications/infosys-award.png'
    }
};

// Open modal on badge click
achievementBadges.forEach(badge => {
    badge.addEventListener('click', () => {
        const achievementId = badge.getAttribute('data-achievement');
        const data = achievementsData[achievementId];
        
        if (data) {
            // Populate modal content
            document.getElementById('modalBadgeImg').src = data.image;
            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalDate').textContent = `Earned: ${data.date}`;
            document.getElementById('modalDescription').textContent = data.description;
            document.getElementById('modalVerifyLink').href = data.verifyLink;
            
            // Show modal
            achievementModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal functions
function closeModal() {
    achievementModal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && achievementModal.classList.contains('active')) {
        closeModal();
    }
});

/*-----------------------------------*\
  #CAROUSEL INITIALIZATION
\*-----------------------------------*/

const carousel = document.getElementById('achievementsCarousel');

if (carousel) {
    const badges = carousel.querySelectorAll('.achievement-badge');
    const badgeCount = badges.length;
    
    if (badgeCount >= 5) {
        // Clone badges for seamless loop
        badges.forEach(badge => {
            const clone = badge.cloneNode(true);
            carousel.appendChild(clone);
        });
        
        // Add animation class
        carousel.classList.add('animate');
        
        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            carousel.style.animationPlayState = 'paused';
        });
        
        carousel.addEventListener('mouseleave', () => {
            carousel.style.animationPlayState = 'running';
        });
    } else {
        // Static display
        carousel.classList.add('static');
    }
}