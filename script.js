// document.addEventListener('DOMContentLoaded', function () {
//     const buttons = document.querySelectorAll('#project-category-buttons button');
//     const lists = document.querySelectorAll('#projects-content .project-list');
//     buttons.forEach(btn => {
//       btn.addEventListener('click', function () {
//         buttons.forEach(b => b.classList.remove('active'));
//         btn.classList.add('active');
//         const cat = btn.getAttribute('data-category');
//         lists.forEach(list => {
//           if (list.getAttribute('data-category') === cat) {
//             list.classList.remove('d-none');
//           } else {
//             list.classList.add('d-none');
//           }
//         });
//       });
//     });
//   });

// DOM Elements
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const typewriterText = document.querySelector('.typed-text');
const typewriterCursor = document.querySelector('.cursor');
const skillBars = document.querySelectorAll('.skill-level');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const contactForm = document.getElementById('contactForm');

// Typewriter Effect
const professions = [
    'Data Scientist',
    'Software Engineer',
    'Machine Learning Engineer',
    'Full Stack Developer'
];

let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeWriter() {
    const currentProfession = professions[professionIndex];
    
    if (isDeleting) {
        // Deleting text
        typewriterText.textContent = currentProfession.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Writing text
        typewriterText.textContent = currentProfession.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentProfession.length) {
        // At the end of typing
        isEnd = true;
        isDeleting = true;
        // Pause at the end before deleting
        setTimeout(typeWriter, 2000);
        return;
    } else if (isDeleting && charIndex === 0) {
        // At the beginning after deleting
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        // Pause before starting next word
        setTimeout(typeWriter, 500);
        return;
    }
    
    // Set typing speed
    const typingSpeed = isDeleting ? 50 : 100;
    // Random speed variation for more natural effect
    const randomSpeed = Math.random() * 50;
    setTimeout(typeWriter, typingSpeed + randomSpeed);
}

// Initialize typewriter effect
setTimeout(typeWriter, 1000);

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Update active nav link
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Animate skill bars on scroll
function animateSkillBars() {
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = `${level}%`;
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
}

// Handle scroll events for animations
function handleScrollAnimations() {
    // Animate skill bars when in viewport
    if (isInViewport(document.querySelector('.skills'))) {
        animateSkillBars();
    }
}

// Projects Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(button => button.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                // Add fade-in animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Tab functionality for about section
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding content
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // In a real implementation, you would send this data to a server
        // For now, we'll just show a success message
        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon at ${email}.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Initialize skill bars with 0 width
skillBars.forEach(bar => {
    bar.style.width = '0%';
});

// Add scroll event listener
window.addEventListener('scroll', handleScrollAnimations);

// Trigger initial check on page load
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimations();
    
    // Add animation to project cards on page load
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});


