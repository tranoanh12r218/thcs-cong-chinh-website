/* ═══════════════════════════════════════════════════════════════════════ */
/*                    JAVASCRIPT - THCS CÔNG CHÍNH                         */
/* ═══════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ═══════════════════════════════════════════════════════════════════
    // 1. MOBILE MENU TOGGLE
    // ═══════════════════════════════════════════════════════════════════
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ═══════════════════════════════════════════════════════════════════
    // 2. SMOOTH SCROLL & ACTIVE NAVIGATION
    // ═══════════════════════════════════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // ═══════════════════════════════════════════════════════════════════
    // 3. CONTACT FORM HANDLING
    // ═══════════════════════════════════════════════════════════════════
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validation
            if (!name || !email || !phone || !message) {
                showAlert('⚠️ Vui lòng điền đầy đủ tất cả trường thông tin!', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showAlert('⚠️ Vui lòng nhập email hợp lệ!', 'error');
                return;
            }

            if (!isValidPhone(phone)) {
                showAlert('⚠️ Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số)!', 'error');
                return;
            }

            // Success
            showAlert('✅ Cảm ơn bạn đã liên hệ!\nChúng tôi sẽ phản hồi sớm nhất.', 'success');
            this.reset();
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // 4. SCROLL TO TOP BUTTON
    // ═══════════════════════════════════════════════════════════════════
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollTopBtn';
    scrollTopBtn.innerHTML = '↑';
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

    // ═══════════════════════════════════════════════════════════════════
    // 5. REVEAL ON SCROLL ANIMATION
    // ═══════════════════════════════════════════════════════════════════
    if ('IntersectionObserver' in window) {
        const observerElements = document.querySelectorAll(
            '.news-card, .teacher-card, .stat-item, .activity-card, .achievement-item, .info-item'
        );

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            });
        }, { threshold: 0.1 });

        observerElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // 6. SEARCH FUNCTIONALITY (Optional)
    // ═══════════════════════════════════════════════════════════════════
    const searchBox = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-box button');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchBox.value.trim();
            if (searchTerm) {
                console.log('Searching for:', searchTerm);
                // Implement search functionality here
            }
        });
    }

});

// ═══════════════════════════════════════════════════════════════════════ 
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════ 

/**
 * Validate email format
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validate phone number (10-11 digits)
 */
function isValidPhone(phone) {
    const re = /^[0-9]{10,11}$/;
    return re.test(phone.replace(/[-\s]/g, ''));
}

/**
 * Show alert messages
 */
function showAlert(message, type = 'info') {
    alert(message);
    // Có thể thay bằng toast notification nếu cần
}

// ═══════════════════════════════════════════════════════════════════════ 
// ADD ANIMATIONS TO STYLESHEET
// ═══════════════════════════════════════════════════════════════════════ 

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        .navbar .container {
            position: relative;
        }

        .nav-menu {
            z-index: 1000;
        }

        .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(10px, 10px);
        }

        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
    }
`;
document.head.appendChild(style);

// ═══════════════════════════════════════════════════════════════════════ 
// CONSOLE WELCOME MESSAGE
// ═══════════════════════════════════════════════════════════════════════ 

console.log(
    '%c🎓 THCS Công Chính - Website Chính Thức',
    'font-size: 20px; font-weight: bold; color: #1e40af;'
);
console.log(
    '%cXã Công Chính - Tỉnh Thanh Hóa',
    'font-size: 14px; color: #0ea5e9;'
);
console.log(
    '%cTham gia học tập cùng chúng tôi! 📚',
    'font-size: 12px; color: #f59e0b; font-style: italic;'
);
