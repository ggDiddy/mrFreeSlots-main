// ========================================
// PREMIUM iGAMING JAVASCRIPT
// Mr Free Slots — Interactive Features
// Built by 10+ Year Veterans
// ========================================

'use strict';

// ========================================
// NAVIGATION
// ========================================

const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar with scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 100) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
mobileMenuToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
    
    // Animate hamburger icon
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking nav links
navLinks?.forEach(link => {
    link?.addEventListener('click', () => {
        navMenu?.classList.remove('active');
        mobileMenuToggle?.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]')?.forEach(anchor => {
    anchor?.addEventListener('click', function (e) {
        const href = this?.getAttribute('href');
        
        if (href && href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const navbarHeight = navbar?.offsetHeight || 82;
                const offsetTop = target?.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// CASINO CARD INTERACTIONS
// ========================================

// Toggle casino details (pros/cons)
window.toggleDetails = function(casinoId) {
    const details = document.getElementById(`details-${casinoId}`);
    const button = event.target;
    
    if (details) {
        if (details.style.display === 'none' || !details.style.display) {
            details.style.display = 'block';
            button.textContent = 'Hide Details';
        } else {
            details.style.display = 'none';
            button.textContent = 'View Full Review';
        }
    }
};

// Track CTA clicks (for analytics — integrate with your tracking)
document.querySelectorAll('.casino-card .btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const casinoCard = e.target.closest('.casino-card');
        const casinoName = casinoCard?.querySelector('.casino-name')?.textContent;
        
        // Send to analytics
        console.log(`🎰 CTA Click: ${casinoName}`);
        
        // Optional: Send to Google Analytics or tracking pixel
        // gtag('event', 'casino_cta_click', { casino: casinoName });
    });
});

// ========================================
// BONUS COMPARISON TABLE SORTING
// ========================================

let sortDirection = {};

window.sortTable = function(columnIndex) {
    const table = document.getElementById('bonusTable');
    const tbody = table?.querySelector('tbody');
    const rows = Array.from(tbody?.querySelectorAll('tr') || []);
    
    // Toggle sort direction
    sortDirection[columnIndex] = !sortDirection[columnIndex];
    const ascending = sortDirection[columnIndex];
    
    rows.sort((a, b) => {
        const aCell = a.cells[columnIndex]?.textContent.trim();
        const bCell = b.cells[columnIndex]?.textContent.trim();
        
        // Extract numbers for numeric sorting
        const aValue = parseFloat(aCell.replace(/[^0-9.]/g, '')) || 0;
        const bValue = parseFloat(bCell.replace(/[^0-9.]/g, '')) || 0;
        
        if (ascending) {
            return aValue - bValue;
        } else {
            return bValue - aValue;
        }
    });
    
    // Re-append sorted rows
    rows.forEach(row => tbody?.appendChild(row));
    
    // Update sort icons
    document.querySelectorAll('.sort-icon').forEach(icon => {
        icon.textContent = '⇅';
    });
    
    const sortIcon = table?.querySelectorAll('th')[columnIndex]?.querySelector('.sort-icon');
    if (sortIcon) {
        sortIcon.textContent = ascending ? '↑' : '↓';
    }
};

// ========================================
// GAME FILTER FUNCTIONALITY
// ========================================

const filterButtons = document.querySelectorAll('.filter-btn');
const gameCards = document.querySelectorAll('.game-card');

filterButtons?.forEach(button => {
    button?.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter games
        gameCards?.forEach(card => {
            const categories = card.getAttribute('data-category') || '';
            
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.4s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ========================================
// FAQ ACCORDION
// ========================================

window.toggleFAQ = function(button) {
    const faqItem = button.closest('.faq-item');
    const isActive = faqItem?.classList.contains('active');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current FAQ
    if (!isActive) {
        faqItem?.classList.add('active');
    }
};

// ========================================
// LIVE STATS SIMULATION (Optional — for demo)
// ========================================

function updateLiveStats() {
    const playersOnlineElem = document.querySelector('.hero-stats-live .stat-text strong');
    const bonusClaimedElem = document.querySelectorAll('.hero-stats-live .stat-text strong')[1];
    
    if (playersOnlineElem) {
        // Random fluctuation in players online
        const currentPlayers = parseInt(playersOnlineElem.textContent) || 247;
        const newPlayers = currentPlayers + Math.floor(Math.random() * 10) - 5; // +/- 5
        playersOnlineElem.textContent = Math.max(200, newPlayers); // Min 200
    }
    
    if (bonusClaimedElem) {
        // Increment bonus claimed
        const currentAmount = parseInt(bonusClaimedElem.textContent.replace(/[^0-9]/g, '')) || 12450;
        const newAmount = currentAmount + Math.floor(Math.random() * 50) + 10; // +10 to +60
        bonusClaimedElem.textContent = '$' + newAmount.toLocaleString();
    }
}

// Update stats every 15 seconds
setInterval(updateLiveStats, 15000);

// ========================================
// LAZY LOADING IMAGES (Performance Optimization)
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
                
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// SCROLL ANIMATIONS (Fade in on scroll)
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply to sections
document.querySelectorAll('.casino-card, .guide-card, .game-card').forEach(el => {
    fadeInObserver.observe(el);
});

// ========================================
// CTA TRACKING & ANALYTICS
// ========================================

// Track all primary CTA clicks
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.trim();
        const section = e.target.closest('section')?.id || 'unknown';
        
        console.log(`📊 Analytics: CTA Click - "${buttonText}" in section "${section}"`);
        
        // Example: Google Tag Manager / GA4 tracking
        // window.dataLayer = window.dataLayer || [];
        // window.dataLayer.push({
        //     event: 'cta_click',
        //     cta_text: buttonText,
        //     cta_section: section,
        //     timestamp: new Date().toISOString()
        // });
    });
});

// ========================================
// RESPONSIBLE GAMBLING POPUP (If user stays 5+ min)
// ========================================

let responsibleGamblingShown = false;

setTimeout(() => {
    if (!responsibleGamblingShown) {
        // You can show a subtle reminder here
        console.log('⏰ Reminder: Please gamble responsibly. Set limits and play for fun!');
        responsibleGamblingShown = true;
        
        // Optional: Display a small toast notification
        // showToast('Remember to gamble responsibly. Set limits and play for fun! 🎰');
    }
}, 300000); // 5 minutes

// ========================================
// COOKIE CONSENT (Basic Implementation)
// ========================================

function checkCookieConsent() {
    const consent = localStorage.getItem('cookie_consent');
    
    if (!consent) {
        // Show cookie banner (you can create HTML for this)
        console.log('🍪 Cookie consent required');
        // showCookieBanner();
    }
}

// Run on page load
window.addEventListener('DOMContentLoaded', checkCookieConsent);

// ========================================
// BONUS CALCULATOR (Optional Feature)
// ========================================

window.calculateBonus = function() {
    const depositInput = document.getElementById('depositAmount');
    const bonusPercentageInput = document.getElementById('bonusPercentage');
    const resultDiv = document.getElementById('bonusResult');
    
    if (!depositInput || !bonusPercentageInput || !resultDiv) return;
    
    const deposit = parseFloat(depositInput.value) || 0;
    const bonusPercent = parseFloat(bonusPercentageInput.value) || 100;
    const wageringMultiplier = 35; // Default 35x
    
    if (deposit < 10) {
        resultDiv.innerHTML = '<p style="color: var(--accent-red);">Minimum deposit is $10</p>';
        return;
    }
    
    const bonusAmount = (deposit * bonusPercent) / 100;
    const totalPlayable = deposit + bonusAmount;
    const wageringRequired = bonusAmount * wageringMultiplier;
    
    resultDiv.innerHTML = `
        <div class="calculator-result">
            <div class="result-row">
                <span>Your Deposit:</span>
                <strong>$${deposit.toFixed(2)}</strong>
            </div>
            <div class="result-row">
                <span>Bonus Amount:</span>
                <strong style="color: var(--accent-gold)">$${bonusAmount.toFixed(2)}</strong>
            </div>
            <div class="result-row">
                <span>Total to Play:</span>
                <strong style="color: var(--accent-green)">$${totalPlayable.toFixed(2)}</strong>
            </div>
            <div class="result-row">
                <span>Wagering Required:</span>
                <strong>$${wageringRequired.toFixed(2)}</strong>
            </div>
        </div>
    `;
};

// ========================================
// PAGE LOAD PERFORMANCE TRACKING
// ========================================

window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        
        console.log(`⚡ Page Load Time: ${pageLoadTime}ms`);
        console.log(`⚡ Server Response Time: ${connectTime}ms`);
        
        // Send to analytics if needed
        // gtag('event', 'timing_complete', {
        //     name: 'page_load',
        //     value: pageLoadTime
        // });
    }
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Toast notification system (optional)
function showToast(message, duration = 4000) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--card-bg);
        color: var(--text-primary);
        padding: 16px 24px;
        border-radius: var(--radius);
        border: 1px solid var(--accent-gold);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Format currency
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// CONSOLE BRANDING (Fun Easter Egg)
// ========================================

console.log(
    '%c🎰 Mr Free Slots — Premium iGaming Platform',
    'font-size: 20px; font-weight: bold; color: #F5A623; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
);

console.log(
    '%cBuilt by 10+ year iGaming veterans with CRO & SEO expertise',
    'font-size: 14px; color: #A0AEC0;'
);

console.log(
    '%cPlay responsibly. 18+ only.',
    'font-size: 12px; color: #48BB78; font-weight: bold;'
);

// ========================================
// END OF SCRIPT
// ========================================
