/* ═══════════════════════════════════════════════════════════════════════ */
/*           JAVASCRIPT - THCS CÔNG CHÍNH GIỐNG THCS CẦU GIẤY              */
/* ═══════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ═══════════════════════════════════════════════════════════════════
    // 1. UPDATE DATE & TIME
    // ═══════════════════════════════════════════════════════════════════
    function updateDateTime() {
        const now = new Date();
        
        const dateStr = now.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        
        const timeStr = now.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const currentDate = document.getElementById('currentDate');
        const currentTime = document.getElementById('currentTime');
        
        if (currentDate) currentDate.textContent = dateStr;
        if (currentTime) currentTime.textContent = timeStr;
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // ═══════════════════════════════════════════════════════════════════
    // 2. MOBILE MENU TOGGLE
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
    // 3. SMOOTH SCROLL
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

    // ═══════════════════════════════════════════════════════════════════
    // 4. BANNER SLIDER
    // ═══════════════════════════════════════════════════════════════════
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    let currentSlide = 0;

    if (sliderPrev && sliderNext) {
        sliderPrev.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + 1) % 1;
            updateSlider();
        });

        sliderNext.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % 1;
            updateSlider();
        });

        function updateSlider() {
            const slider = document.querySelector('.slider-wrapper');
            if (slider) {
                slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            }
        }
    }

    // ═══════════════════════════════════════════════════════════════════
    // 5. SEARCH FUNCTIONALITY
    // ═══════════════════════════════════════════════════════════════════
    const searchBtn = document.querySelector('.btn-search-main');
    const searchInput = document.querySelector('.search-box input');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('Tìm kiếm:', searchTerm);
                // Thực hiện tìm kiếm
                alert('Tìm kiếm: ' + searchTerm + '\n(Chức năng tìm kiếm sẽ được triển khai)');
            } else {
                alert('Vui lòng nhập từ khóa tìm kiếm');
            }
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // 6. NEWSLETTER FORM
    // ═══════════════════════════════════════════════════════════════════
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value.trim();
            
            if (!email) {
                alert('⚠️ Vui lòng nhập email!');
                return;
            }

            if (!isValidEmail(email)) {
                alert('⚠️ Email không hợp lệ!');
                return;
            }

            // Save to localStorage
            let subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('subscribers', JSON.stringify(subscribers));
            }

            alert('✅ Cảm ơn! Bạn đã đăng ký nhận tin từ THCS Công Chính!');
            this.reset();
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // 7. QUICK ACCESS ITEMS - ADD CLICK HANDLERS
    // ═══════════════════════════════════════════════════════════════════
    const quickItems = document.querySelectorAll('.quick-item');
    quickItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            console.log('Clicked:', title);
            // Có thể thêm logic điều hướng hoặc modal ở đây
        });
    });

    // ═══════════════════════════════════════════════════════════════════
    // 8. REVEAL ON SCROLL ANIMATION
    // ═══════════════════════════════════════════════════════════════════
    if ('IntersectionObserver' in window) {
        const observerElements = document.querySelectorAll(
            '.news-card, .news-item, .sidebar-section, .featured-news, .quick-item'
        );

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observerElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // 9. SCROLL TO TOP BUTTON
    // ═══════════════════════════════════════════════════════════════════
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollTopBtn';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
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
    // 10. NEWS ITEMS - ADD CLICK HANDLERS
    // ═══════════════════════════════════════════════════════════════════
    const newsItems = document.querySelectorAll('.news-item h3, .news-card h3, .featured-content h2');
    newsItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            // Điều hướng tới bài viết
            console.log('Bài viết được click:', this.textContent);
        });
    });

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

    #scrollTopBtn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #c41e3a 0%, #8b1538 100%);
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        font-weight: bold;
    }

    #scrollTopBtn:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 576px) {
        #scrollTopBtn {
            width: 45px;
            height: 45px;
            bottom: 20px;
            right: 20px;
            font-size: 1.2rem;
        }
    }
`;
document.head.appendChild(style);

// ═══════════════════════════════════════════════════════════════════════ 
// CONSOLE WELCOME MESSAGE
// ═══════════════════════════════════════════════════════════════════════ 

console.log(
    '%c🎓 THCS Công Chính - Website Chính Thức',
    'font-size: 20px; font-weight: bold; color: #c41e3a;'
);
console.log(
    '%cXã Công Chính - Tỉnh Thanh Hóa',
    'font-size: 14px; color: #0ea5e9;'
);
console.log(
    '%cTham gia học tập cùng chúng tôi! 📚',
    'font-size: 12px; color: #f59e0b; font-style: italic;'
);
