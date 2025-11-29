// ==========================================
// 遊戲論壇 - 互動功能
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // === 輪播功能 ===
    initCarousel();

    // === 搜尋功能 ===
    initSearch();

    // === 平滑捲動 ===
    initSmoothScroll();

    // === 響應式選單 ===
    initMobileMenu();
});

// 輪播功能
function initCarousel() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentSlide = 0;

    // 如果有多個輪播項目，設定自動輪播
    if (carouselItems.length > 1) {
        setInterval(() => {
            carouselItems[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % carouselItems.length;
            carouselItems[currentSlide].classList.add('active');
        }, 5000); // 每5秒切換一次
    }
}

// 搜尋功能
function initSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.btn-search');

    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('搜尋:', searchTerm);
                // 這裡可以加入實際的搜尋邏輯
                alert(`搜尋: ${searchTerm}`);
            }
        });
    }

    // Enter 鍵也可以搜尋
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    console.log('搜尋:', searchTerm);
                    alert(`搜尋: ${searchTerm}`);
                }
            }
        });
    }
}

// 平滑捲動
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// 響應式選單（手機版）
function initMobileMenu() {
    // 可以加入漢堡選單的功能
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // 向下滾動時隱藏導航列，向上滾動時顯示
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // 為導航列加入過渡效果
    header.style.transition = 'transform 0.3s ease';
}

// 文章卡片點擊效果
document.addEventListener('click', function(e) {
    // 文章卡片點擊
    const articleCard = e.target.closest('.article-card');
    if (articleCard) {
        console.log('點擊文章卡片');
        // 這裡可以導向文章詳細頁面
    }

    // 討論項目點擊
    const discussionItem = e.target.closest('.discussion-item');
    if (discussionItem) {
        console.log('點擊討論項目');
        // 這裡可以導向討論詳細頁面
    }

    // 熱門遊戲點擊
    const hotGameItem = e.target.closest('.hot-game-item');
    if (hotGameItem) {
        console.log('點擊熱門遊戲');
        // 這裡可以導向遊戲頁面
    }
});

// 動態載入更多內容（無限捲動）
let isLoading = false;

window.addEventListener('scroll', function() {
    if (isLoading) return;

    const scrollPosition = window.innerHeight + window.pageYOffset;
    const pageHeight = document.documentElement.scrollHeight;

    // 當捲動到接近底部時
    if (scrollPosition >= pageHeight - 500) {
        isLoading = true;
        console.log('載入更多內容...');

        // 模擬載入
        setTimeout(() => {
            isLoading = false;
            // 這裡可以加入實際的內容載入邏輯
        }, 1000);
    }
});

// 工具函數：格式化數字（加入千位分隔符）
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 工具函數：時間格式化
function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + '年前';

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + '個月前';

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + '天前';

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + '小時前';

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + '分鐘前';

    return '剛剛';
}

// 側邊欄固定效果（當捲動時）
function initStickyElements() {
    const sidebarRight = document.querySelector('.sidebar-right');
    if (!sidebarRight) return;

    const sidebarTop = sidebarRight.offsetTop;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > sidebarTop - 20) {
            sidebarRight.style.position = 'sticky';
            sidebarRight.style.top = '80px';
        }
    });
}

// 初始化側邊欄固定
initStickyElements();

// 按鈕 hover 音效（可選）
function addButtonSounds() {
    const buttons = document.querySelectorAll('button, .article-card, .discussion-item');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // 可以加入音效
            // playSound('hover.mp3');
        });

        button.addEventListener('click', function() {
            // 可以加入點擊音效
            // playSound('click.mp3');
        });
    });
}

// 主題切換功能（淺色/深色模式）
function initThemeToggle() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);

    // 可以加入切換按鈕
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--primary-orange);
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        transition: all 0.3s ease;
    `;

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        themeToggle.innerHTML = newTheme === 'light' ? '🌙' : '☀️';
    });

    // document.body.appendChild(themeToggle);
}

// 初始化主題
initThemeToggle();

// 載入動畫
window.addEventListener('load', function() {
    document.body.classList.add('loaded');

    // 為元素加入淡入動畫
    const animatedElements = document.querySelectorAll('.article-card, .discussion-item, .widget');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    entry.target.style.transition = 'all 0.5s ease';

                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => observer.observe(el));
});

// 表單驗證（登入/註冊）
function initFormValidation() {
    const loginBtn = document.querySelector('.btn-login');
    const registerBtn = document.querySelector('.btn-register');

    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('開啟登入表單');
            // 這裡可以顯示登入模態框
            showLoginModal();
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('開啟註冊表單');
            // 這裡可以顯示註冊模態框
            showRegisterModal();
        });
    }
}

function showLoginModal() {
    alert('登入功能（這裡可以顯示登入表單）');
}

function showRegisterModal() {
    alert('註冊功能（這裡可以顯示註冊表單）');
}

// 初始化表單驗證
initFormValidation();

console.log('遊戲論壇已載入完成！');
