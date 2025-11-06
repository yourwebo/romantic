// ========================================
// ANNIVERSARY STORY - MAIN JAVASCRIPT
// (Customized for Malak)
// ========================================

// --- الإعدادات الرئيسية ---
// **غير هذا التاريخ ليتوافق مع تاريخ بداية علاقتكما الفعلي**
const ANNIVERSARY_DATE = '2023-11-25T00:00:00';

// ========================================
// تهيئة كل الوظائف عند تحميل الصفحة
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initNavigation();
    initGalleryFilter();
    initScrollToTop();
    initSmoothScroll();
    initScrollAnimations();
    initMusicPlayer();
    startFloatingHearts();
    
    console.log('🌹 حكاية حبنا جاهزة! 💕');
});


// ========================================
// 1. العد التنازلي للذكرى السنوية
// ========================================
function initCountdown() {
    const startDate = new Date(ANNIVERSARY_DATE);
    
    function updateCountdown() {
        const now = new Date();
        
        // حساب الفارق بالسنوات والشهور والأيام
        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();
        let hours = now.getHours() - startDate.getHours();

        if (hours < 0) {
            days--;
            hours += 24;
        }
        if (days < 0) {
            months--;
            // الحصول على عدد أيام الشهر الماضي
            const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += lastMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }
        
        // تحديث الأرقام في الصفحة
        document.getElementById('years').textContent = years;
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
    }
    
    // تحديث العداد كل ثانية
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ========================================
// 2. القلوب الطائرة في الخلفية
// ========================================
function startFloatingHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    if (!heartsContainer) return;

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
        heart.style.fontSize = `${Math.random() * 15 + 10}px`;
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 1500);
}

// ========================================
// 3. قائمة التنقل (Navigation)
// ========================================
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // تغيير شكل الـ Navbar عند التمرير
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========================================
// 4. فلتر معرض الصور
// ========================================
function initGalleryFilter() {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryTabs.length === 0) return;

    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            galleryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.dataset.category;
            
            galleryItems.forEach(item => {
                const itemCategory = item.dataset.category;
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ========================================
// 5. زر العودة للأعلى
// ========================================
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================================
// 6. التمرير الناعم (Smooth Scroll)
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 70; // لتعويض ارتفاع الـ Navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// 7. تأثيرات الحركة عند التمرير
// ========================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // observer.unobserve(entry.target); // يمكنك تفعيل هذا السطر لكي تحدث الحركة مرة واحدة فقط
            }
        });
    }, { threshold: 0.1 });

    // مراقبة العناصر التي ستحصل على تأثير الحركة
    document.querySelectorAll('.section-header, .countdown-item, .reason-card, .timeline-item, .gallery-item, .first-meet-content, .message-content, .closing-content').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// 8. مشغل الموسيقى
// ========================================
function initMusicPlayer() {
    const audioPlayer = document.getElementById('audio-player');
    const musicPlayerDiv = document.querySelector('.music-player');

    if (!audioPlayer || !musicPlayerDiv) return;

    audioPlayer.addEventListener('play', () => {
        musicPlayerDiv.classList.add('playing');
    });
    
    audioPlayer.addEventListener('pause', () => {
        musicPlayerDiv.classList.remove('playing');
    });
}
