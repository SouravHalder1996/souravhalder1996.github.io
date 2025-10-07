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
  #FLOATING CARDS ANIMATION AND POSITIONING
\*-----------------------------------*/

function positionFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    const totalCards = cards.length;
    const radius = 240; // Distance from center
    const centerX = 210; // Half of avatar container width
    const centerY = 210; // Half of avatar container height
    
    cards.forEach((card, index) => {
        // Calculate position
        const angle = ((360 / totalCards) * index - 90) * (Math.PI / 180); // Convert to radians, start from top
        
        // Calculate x and y coordinates
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        // Apply position
        card.style.left = `${x}px`;
        card.style.top = `${y}px`;
        
        // Add floating animation with different delays
        card.style.animation = `float ${3 + index * 0.2}s ease-in-out ${index * 0.5}s infinite`;
    });
}

// Add floating animation
const floatKeyframes = `
@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}`;

// Add keyframes to document
const styleSheet = document.createElement('style');
styleSheet.textContent = floatKeyframes;
document.head.appendChild(styleSheet);

// Call the function after DOM loads
document.addEventListener('DOMContentLoaded', positionFloatingCards);

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

// const contactForm = document.getElementById('contactForm');

// contactForm.addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     const btn = this.querySelector('button[type="submit"]');
//     const originalHTML = btn.innerHTML;
    
//     // Disable button and show loading state
//     btn.disabled = true;
//     btn.innerHTML = '<span>Sending...</span>';
    
//     // Simulate form submission (replace with actual form handling)
//     setTimeout(() => {
//         // Success state
//         btn.innerHTML = '<span>Message Sent!</span> <span>✓</span>';
//         btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
//         // Reset after 2 seconds
//         setTimeout(() => {
//             btn.innerHTML = originalHTML;
//             btn.disabled = false;
//             btn.style.background = '';
//             this.reset();
//         }, 2000);
//     }, 1500);
// });

/*-----------------------------------*\
  #PREVENT FORM INPUTS FROM BREAKING LAYOUT
\*-----------------------------------*/

// const formInputs = document.querySelectorAll('.form-input, .form-textarea');

// formInputs.forEach(input => {
//     input.addEventListener('input', function() {
//         // Auto-grow textarea
//         if (this.tagName === 'TEXTAREA') {
//             this.style.height = 'auto';
//             this.style.height = this.scrollHeight + 'px';
//         }
//     });
// });

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
        description: 'Earners of this certification have a fundamental understanding of IT services and their uses in the AWS Cloud. They demonstrated cloud fluency and foundational AWS knowledge. Badge owners are able to identify essential AWS services necessary to set up AWS-focused projects.',
        verifyLink: 'https://www.credly.com/badges/89828c78-d29f-4374-aa61-b0ff77f2ddc3/public_url',
        image: './assets/images/certifications/aws-ccp.png'
    },
    'aws-aip': {
        title: 'AWS Certified AI Practitioner',
        date: 'September 7, 2024',
        description: 'Earners of this badge understand AI, ML, and generative AI concepts, methods, and strategies in general and on AWS. They can determine the correct types of AI/ML technologies to apply to specific use cases and know how to use AI, ML, and generative AI technologies responsibly.',
        verifyLink: 'https://www.credly.com/badges/e4bf7f8b-b205-47e7-946b-fcfd5681dbdf/public_url',
        image: './assets/images/certifications/aws-aip.png'
    },
    'aws-saa': {
        title: 'AWS Certified Solutions Architect – Associate',
        date: 'June 28, 2023',
        description: 'Earners of this certification have a comprehensive understanding of AWS services and technologies. They demonstrated the ability to build secure and robust solutions using architectural design principles based on customer requirements. Badge owners are able to strategically design well-architected distributed systems that are scalable, resilient, efficient, and fault-tolerant.',
        verifyLink: 'https://www.credly.com/badges/350f545b-bfe2-4b7b-87a2-070ec661074b/public_url',
        image: './assets/images/certifications/aws-saa.png'
    },
    'aws-dva': {
        title: 'AWS Certified Developer – Associate',
        date: 'October 6, 2023',
        description: 'Earners of this certification have a comprehensive understanding of application life-cycle management. They demonstrated proficiency in writing applications with AWS service APIs, AWS CLI, and SDKs; using containers; and deploying with a CI/CD pipeline. Badge owners are able to develop, deploy, and debug cloud-based applications.',
        verifyLink: 'https://www.credly.com/badges/dde45ac6-10f8-4689-a975-eea16699392f/public_url',
        image: './assets/images/certifications/aws-dva.png'
    },
    'infosys-award': {
        title: 'Infosys Rise INSTA Awards',
        date: 'November, 2023',
        description: 'Recognition for exceptional performance in handling product teams and resolving issues during critical phases. Demonstrated flexibility, teamwork, and dedication to excellence.',
        verifyLink: '#',
        image: './assets/images/certifications/infosys-award.png'
    },
    'db-dea': {
        title: 'Databricks Certified Data Engineer Associate',
        date: 'October 5, 2025',
        description: 'Validates ability to use the Databricks Lakehouse Platform to complete introductory data engineering tasks. This includes an understanding of the Lakehouse Platform and its workspace, its architecture, and its capabilities. It also assesses the ability to perform multi-hop architecture ETL tasks using Apache Spark™ SQL and Python in both batch and incrementally processed paradigms.',
        verifyLink: 'https://credentials.databricks.com/2f587585-e4fa-43aa-beeb-a0781305e00f#acc.9Dzule8y',
        image: './assets/images/certifications/db-dea.png'
    },
    'col-ds': {
        title: 'Collibra Data Steward Certification',
        date: 'November 22, 2024',
        description: 'Earners of the Collibra Data Steward certification document data in a central location for visibility and transparency. They also collaborate with stakeholders to craft a common shared language for data assets.',
        verifyLink: 'https://www.credly.com/badges/9f8f5b32-68b9-40f0-a7a3-a912e994af42/public_url',
        image: './assets/images/certifications/col-ds.png'
    },
    'col-aigov': {
        title: 'Collibra AI Governance-Ready',
        date: 'October 15, 2024',
        description: 'Recipients of this badge have completed the Getting started with AI Governance course on the Collibra University website.',
        verifyLink: 'https://www.credly.com/badges/e256d21d-27dc-434f-b6bc-dc76fffdcd70/public_url',
        image: './assets/images/certifications/col-aigov.png'
    },
    'col-ie': {
        title: 'Collibra Integration Engineer Certification',
        date: 'October 28, 2024',
        description: 'Earners of the Collibra Integration Engineer certification can evaluate, write, test and debug API integrations based on business process needs. They have demonstrated knowldge of Collibra REST and Java APIs and can evaluate technical problems and create solutions to those problems.',
        verifyLink: 'https://www.credly.com/badges/d5e933bc-8006-4dd3-a12b-eddc6f412faf/public_url',
        image: './assets/images/certifications/col-ie.png'
    },
    'col-we': {
        title: 'Collibra Workflow Engineer Certification',
        date: 'October 28, 2024',
        description: 'Earners of this badge can design, create and deploy workflow solutions based on business process needs in the Collibra Platform.',
        verifyLink: 'https://www.credly.com/badges/f0e31ad3-65b3-4bad-b1eb-14ac9efa1d10/public_url',
        image: './assets/images/certifications/col-we.png'
    },
    'col-sa': {
        title: 'Collibra Solution Architect Certification',
        date: 'December 20, 2024',
        description: 'Earners of the Collibra Solution Architect certification provide technical leadership in the design, planning and implementation of the Collibra Platform. These individuals define the Collibra Operating Model approach and perform fit/gap assessment.',
        verifyLink: 'https://www.credly.com/badges/1e090003-3b2d-4353-949c-ea29125d3a74/public_url',
        image: './assets/images/certifications/col-sa.png'
    }
};

// achievement modal click handler with this:
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
            
            // Fix for verify link
            const verifyLink = document.getElementById('modalVerifyLink');
            if (data.verifyLink && data.verifyLink !== '#') {
                verifyLink.href = data.verifyLink;
                verifyLink.style.display = 'flex';
                verifyLink.onclick = (e) => {
                    e.stopPropagation(); // Prevent modal close when clicking link
                    window.open(data.verifyLink, '_blank'); // Open in new tab
                };
            } else {
                verifyLink.style.display = 'none';
            }
            
            // Show modal
            achievementModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Update the closeModal function to remove onclick handler
function closeModal() {
    achievementModal.classList.remove('active');
    document.body.style.overflow = '';
    const verifyLink = document.getElementById('modalVerifyLink');
    verifyLink.onclick = null; // Clean up event handler
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
        // Clone badges for seamless loop and attach event listeners
        badges.forEach(badge => {
            const clone = badge.cloneNode(true);
            // Add click event listener to the cloned badge
            clone.addEventListener('click', () => {
                const achievementId = clone.getAttribute('data-achievement');
                const data = achievementsData[achievementId];
                
                if (data) {
                    // Populate modal content
                    document.getElementById('modalBadgeImg').src = data.image;
                    document.getElementById('modalTitle').textContent = data.title;
                    document.getElementById('modalDate').textContent = `Earned: ${data.date}`;
                    document.getElementById('modalDescription').textContent = data.description;
                    
                    // Fix for verify link
                    const verifyLink = document.getElementById('modalVerifyLink');
                    if (data.verifyLink && data.verifyLink !== '#') {
                        verifyLink.href = data.verifyLink;
                        verifyLink.style.display = 'flex';
                        verifyLink.onclick = (e) => {
                            e.stopPropagation();
                            window.open(data.verifyLink, '_blank');
                        };
                    } else {
                        verifyLink.style.display = 'none';
                    }
                    
                    // Show modal
                    achievementModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
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

/*-----------------------------------*\
  #FLOATING SOCIAL BUTTON
\*-----------------------------------*/

function initFloatingSocial() {
    const floatingSocial = document.getElementById('floatingSocial');
    const footer = document.querySelector('footer');
    
    if (!floatingSocial || !footer) return;

    let isHovering = false;
    let hoverTimeout;

    function handleMouseEnter() {
        clearTimeout(hoverTimeout);
        isHovering = true;
        floatingSocial.classList.add('active');
    }

    function handleMouseLeave() {
        isHovering = false;
        hoverTimeout = setTimeout(() => {
            if (!isHovering) {
                floatingSocial.classList.remove('active');
            }
        }, 300);
    }

    floatingSocial.addEventListener('mouseenter', handleMouseEnter);
    floatingSocial.addEventListener('mouseleave', handleMouseLeave);

    function checkFooterVisibility() {
        const footerRect = footer.getBoundingClientRect();
        const threshold = window.innerHeight - 50;

        if (footerRect.top <= threshold) {
            floatingSocial.classList.add('hide');
        } else {
            floatingSocial.classList.remove('hide');
        }
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(checkFooterVisibility);
    });

    // Initial check
    checkFooterVisibility();
}

document.addEventListener('DOMContentLoaded', initFloatingSocial);