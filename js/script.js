/* ============================================
   JAVASCRIPT - THCS CÔNG CHÍNH WEBSITE
   ============================================ */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name') || document.querySelector('input[placeholder="Họ và tên"]').value;
            const email = formData.get('email') || document.querySelector('input[placeholder="Email"]').value;
            const phone = formData.get('phone') || document.querySelector('input[placeholder="Số điện thoại"]').value;
            const message = document.querySelector('textarea').value;

            // Validation
            if (!name || !email || !phone || !message) {
                alert('Vui lòng điền đầy đủ thông tin!');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Vui lòng nhập email hợp lệ!');
                return;
            }

            if (!isValidPhone(phone)) {
                alert('Vui lòng nhập số điện thoại hợp lệ!');
                return;
            }

            // Show success message
            alert('Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
            
            // Reset form
            this.reset();
        });
    }

    // Set active navigation link
    setNavActive();
});

// Validate Email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate Phone
function isValidPhone(phone) {
    const re = /^[0-9]{10,11}$/;
    return re.test(phone.replace(/[-\s]/g, ''));
}

// Set Active Navigation Link
function setNavActive() {
    const links = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Set Active Function
function setActive(element) {
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });
    element.classList.add('active');
}

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Scroll to Top Button (Optional Feature)
const scrollTopBtn = document.createElement('button');
scrollTopBtn.id = 'scrollTopBtn';
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--primary-color, #1e40af);
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 999;
    font-size: 1.5rem;
    width: 45px;
    height: 45px;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Dark Mode Toggle (Optional Feature)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load Dark Mode Preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Animate elements on scroll
function revealOnScroll() {
    const elements = document.querySelectorAll('.news-card, .teacher-card, .library-item, .stat-box');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

revealOnScroll();

// Page Load Animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
setTimeout(() => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
}, 100);

// Console Welcome Message
console.log('%c Welcome to THCS Công Chính Website', 'color: #1e40af; font-size: 20px; font-weight: bold;');
console.log('%c Xã Công Chính - Tỉnh Thanh Hóa', 'color: #0ea5e9; font-size: 14px;');
