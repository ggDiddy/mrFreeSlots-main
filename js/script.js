// ========================================
// NAVIGATION
// ========================================

const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
});

// Close mobile menu when clicking nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks?.forEach(link => {
    link?.addEventListener('click', () => {
        navMenu?.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]')?.forEach(anchor => {
    anchor?.addEventListener('click', function (e) {
        const href = this?.getAttribute('href');
        if (href && href !== '#' && !href?.startsWith('#lucky-spin') && !href?.startsWith('#royal-vegas') && !href?.startsWith('#diamond') && !href?.startsWith('#mega-fortune') && !href?.startsWith('#turbo') && !href?.startsWith('#pocket') && !href?.startsWith('#nova') && !href?.startsWith('#easy-start')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target?.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// BONUS CALCULATOR
// ========================================

function calculateBonus() {
    const depositAmount = parseFloat(document.getElementById('depositAmount')?.value ?? 0);
    const bonusPercentage = parseFloat(document.getElementById('bonusPercentage')?.value ?? 0);

    if (!depositAmount || depositAmount < 10) {
        alert('Please enter a valid deposit amount (minimum $10)');
        return;
    }

    const bonusAmount = (depositAmount * bonusPercentage) / 100;
    const totalAmount = depositAmount + bonusAmount;
    const wageringRequirement = bonusAmount * 35; // Assuming 35x wagering

    const resultDiv = document.getElementById('calculatorResult');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <h4>Your Bonus Calculation</h4>
            <div class="result-breakdown">
                <div class="result-item">
                    <div class="result-label">Your Deposit</div>
                    <div class="result-value">$${depositAmount.toFixed(2)}</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Bonus Amount</div>
                    <div class="result-value">$${bonusAmount.toFixed(2)}</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Total to Play</div>
                    <div class="result-value">$${totalAmount.toFixed(2)}</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Wagering Required</div>
                    <div class="result-value">$${wageringRequirement.toFixed(2)}</div>
                </div>
            </div>
        `;
        resultDiv.classList.add('show');
    }
}

// ========================================
// CASINO FINDER QUIZ (UNIQUE FEATURE)
// ========================================

let quizAnswers = {};
let currentQuestion = 1;
const totalQuestions = 4;

const quizOptions = document.querySelectorAll('.quiz-option');
quizOptions?.forEach(option => {
    option?.addEventListener('click', function () {
        const question = this?.closest('.quiz-question');
        const questionNum = parseInt(question?.getAttribute('data-question') ?? 0);
        const value = this?.getAttribute('data-value') ?? '';

        // Store answer
        quizAnswers[`q${questionNum}`] = value;

        // Progress to next question or show result
        if (questionNum < totalQuestions) {
            showNextQuestion(questionNum + 1);
        } else {
            showQuizResult();
        }
    });
});

function showNextQuestion(questionNum) {
    const questions = document.querySelectorAll('.quiz-question');
    questions?.forEach(q => q?.classList.remove('active'));

    const nextQuestion = document.querySelector(`[data-question="${questionNum}"]`);
    nextQuestion?.classList.add('active');

    currentQuestion = questionNum;
    updateQuizProgress();
}

function updateQuizProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    const progressBar = document.getElementById('quizProgressBar');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

function showQuizResult() {
    const questions = document.querySelectorAll('.quiz-question');
    questions?.forEach(q => q?.classList.remove('active'));

    const resultDiv = document.getElementById('quizResult');
    const recommendationDiv = document.getElementById('quizRecommendation');

    // Determine recommendation based on answers
    const recommendation = getRecommendation(quizAnswers);

    if (recommendationDiv) {
        recommendationDiv.innerHTML = `
            <h4>${recommendation?.name ?? 'Casino'}</h4>
            <p><strong>Why it's perfect for you:</strong> ${recommendation?.reason ?? 'Great choice'}</p>
            <p>${recommendation?.description ?? ''}</p>
            <div style="margin-top: 25px;">
                <a href="${recommendation?.link ?? '#'}" class="btn btn-primary" style="margin-right: 10px;">Visit Casino</a>
                <button class="btn btn-secondary" onclick="openReviewModal('${recommendation?.id ?? ''}')">Read Full Review</button>
            </div>
        `;
    }

    resultDiv?.classList.add('show');
    updateQuizProgress();
}

function getRecommendation(answers) {
    const priority = answers?.q1 ?? '';
    const experience = answers?.q2 ?? '';
    const games = answers?.q3 ?? '';
    const deposit = answers?.q4 ?? '';

    // Logic to match answers to casinos
    if (priority === 'bonus') {
        return {
            id: 'mega-fortune',
            name: 'Mega Fortune Slots',
            reason: 'You prioritize bonuses, and Mega Fortune offers the biggest welcome package with 250% up to $2,500 plus 200 free spins!',
            description: 'With low wagering requirements and a massive game library, you\'ll maximize your bonus value here.',
            link: '#mega-fortune-slots'
        };
    } else if (priority === 'speed') {
        return {
            id: 'turbo-casino',
            name: 'Turbo Casino',
            reason: 'Fast payouts are your priority, and Turbo Casino delivers with 10-minute withdrawals!',
            description: 'Lightning-fast transactions, instant deposits, and a modern platform built for speed.',
            link: '#turbo-casino'
        };
    } else if (priority === 'mobile') {
        return {
            id: 'pocket-casino',
            name: 'Pocket Casino Pro',
            reason: 'You want the best mobile experience, and Pocket Casino is specifically designed for mobile gaming!',
            description: 'iOS and Android apps, touch-optimized controls, and 2,800+ mobile games.',
            link: '#pocket-casino-pro'
        };
    } else if (experience === 'beginner') {
        return {
            id: 'easy-start',
            name: 'Easy Start Casino',
            reason: 'As a beginner, Easy Start Casino offers tutorials, free play mode, and step-by-step guides to help you learn!',
            description: 'Beginner-friendly interface, helpful support team, and educational resources.',
            link: '#easy-start-casino'
        };
    } else if (priority === 'games') {
        return {
            id: 'lili-bet',
            name: 'LiliBet Casino',
            reason: 'You want variety, and LiliBet has 3,500+ games with AI-powered recommendations to help you discover new favorites!',
            description: 'Massive game library from 80+ providers, cutting-edge AI technology, and industry-leading 250% welcome bonus to explore everything.',
            link: '#lili-bet-casino'
        };
    } else {
        return {
            id: 'royal-vegas',
            name: 'Royal Vegas Palace',
            reason: 'Based on your preferences, Royal Vegas offers a well-rounded experience with great bonuses, games, and reliability!',
            description: 'Established brand with live dealers, VIP program, and 2,500+ games.',
            link: '#royal-vegas-palace'
        };
    }
}

function restartQuiz() {
    quizAnswers = {};
    currentQuestion = 1;

    const resultDiv = document.getElementById('quizResult');
    resultDiv?.classList.remove('show');

    const questions = document.querySelectorAll('.quiz-question');
    questions?.forEach(q => q?.classList.remove('active'));

    const firstQuestion = document.querySelector('[data-question="1"]');
    firstQuestion?.classList.add('active');

    const progressBar = document.getElementById('quizProgressBar');
    if (progressBar) {
        progressBar.style.width = '0%';
    }
}

// ========================================
// CASINO COMPARISON TOOL
// ========================================

const casinoData = {
    'lucky-spin': {
        name: 'LiliBet Casino',
        bonus: '250% up to $3,000',
        freeSpins: '200 Free Spins',
        games: '3,500+',
        payout: 'Instant (Crypto)',
        rating: '9.9/10',
        support: '24/7 Award-Winning Support',
        minDeposit: '$25'
    },
    'bet365': {
        name: 'Bet365 Casino',
        bonus: '200% up to $2,000',
        freeSpins: '150 Free Spins',
        games: '4,000+',
        payout: '24-48 hours',
        rating: '9.8/10',
        support: '24/7 Multilingual Support',
        minDeposit: '$20'
    },
    'pike-casinos': {
        name: 'Pike Casinos',
        bonus: '200% up to $2,000',
        freeSpins: '400 Free Spins',
        games: '10,000+',
        payout: '24-48 hours',
        rating: '9.8/10',
        support: '24/7 Multilingual Support',
        minDeposit: '$20'
    },
    'fieryplay': {
        name: 'FieryPlay Casino',
        bonus: '150% up to $1,500',
        freeSpins: '100 Free Spins',
        games: '3,200+',
        payout: 'Instant (Crypto)',
        rating: '6.7/10',
        support: '24/7 Multilingual Support',
        minDeposit: '$20'
    },
    'quick-bet': {
        name: 'Quick Bet Casino',
        bonus: '150% up to $1,500',
        freeSpins: '100 Free Spins',
        games: '3,200+',
        payout: 'Instant (Crypto)',
        rating: '6.7/10',
        support: '24/7 Multilingual Support',
        minDeposit: '$20'
    },
    'boomerang': {
        name: 'Boomerang Casino',
        bonus: '150% up to $1,500',
        freeSpins: '100 Free Spins',
        games: '3,200+',
        payout: 'Instant (Crypto)',
        rating: '9.7/10',
        support: 'Live Chat & Email',
        minDeposit: '$20'
    },
    'millioner': {
        name: 'Millioner',
        bonus: '150% up to $1,500',
        freeSpins: '100 Free Spins',
        games: '3,200+',
        payout: 'Instant (Crypto)',
        rating: '6.7/10',
        support: '24/7 Multilingual Support',
        minDeposit: '$20'
    },
    'royal-vegas': {
        name: 'Royal Vegas Palace',
        bonus: '150% up to $1,500',
        freeSpins: '75 Free Spins',
        games: '2,500+',
        payout: '24-72 hours',
        rating: '9.8/10',
        support: '24/7 Multilingual Support',
        minDeposit: '$20'
    },
    'royal-vegas': {
        name: 'Royal Vegas Palace',
        bonus: '150% up to $1,500',
        freeSpins: '75 Free Spins',
        games: '2,500+',
        payout: '24-72 hours',
        rating: '9.6/10',
        support: '24/7 Live Chat',
        minDeposit: '$25'
    },
    'diamond-club': {
        name: 'Diamond Club Casino',
        bonus: '100% up to $1,000',
        freeSpins: '50 Free Spins',
        games: '1,800+',
        payout: '48-96 hours',
        rating: '9.4/10',
        support: 'Email & Chat',
        minDeposit: '$10'
    },
    'mega-fortune': {
        name: 'Mega Fortune Slots',
        bonus: '250% up to $2,500',
        freeSpins: '200 Free Spins',
        games: '3,500+',
        payout: '24 hours',
        rating: '9.7/10',
        support: '24/7 Support',
        minDeposit: '$30'
    },
    'turbo-casino': {
        name: 'Turbo Casino',
        bonus: '175% up to $1,750',
        freeSpins: '150 Free Spins',
        games: '2,200+',
        payout: '10 minutes',
        rating: '9.5/10',
        support: '24/7 Live Chat',
        minDeposit: '$20'
    },
    'pocket-casino': {
        name: 'Pocket Casino Pro',
        bonus: '125% up to $1,250',
        freeSpins: '100 Free Spins',
        games: '2,800+',
        payout: '48-72 hours',
        rating: '9.3/10',
        support: 'In-App Support',
        minDeposit: '$15'
    },
    'nova-gaming': {
        name: 'Nova Gaming',
        bonus: '300% up to $3,000',
        freeSpins: '250 Free Spins',
        games: '1,500+',
        payout: '24-48 hours',
        rating: '9.2/10',
        support: '24/7 Chat',
        minDeposit: '$50'
    },
    'easy-start': {
        name: 'Easy Start Casino',
        bonus: '100% up to $1,000',
        freeSpins: '50 Free Spins',
        games: '2,000+',
        payout: '24-48 hours',
        rating: '9.6/10',
        support: '24/7 Beginner Help',
        minDeposit: '$10'
    }
};

function updateComparison() {
    const casino1 = document.getElementById('compare1')?.value ?? '';
    const casino2 = document.getElementById('compare2')?.value ?? '';
    const casino3 = document.getElementById('compare3')?.value ?? '';

    const selectedCasinos = [casino1, casino2, casino3].filter(c => c !== '');

    if (selectedCasinos?.length === 0) {
        const tableContainer = document.getElementById('comparisonTable');
        if (tableContainer) {
            tableContainer.innerHTML = '<p class="comparison-placeholder">Select casinos above to start comparing</p>';
        }
        return;
    }

    let tableHTML = '<table class="comparison-result"><thead><tr><th>Feature</th>';

    selectedCasinos?.forEach(casinoId => {
        const casino = casinoData?.[casinoId];
        tableHTML += `<th>${casino?.name ?? 'Casino'}</th>`;
    });

    tableHTML += '</tr></thead><tbody>';

    const features = [
        { label: 'Rating', key: 'rating' },
        { label: 'Welcome Bonus', key: 'bonus' },
        { label: 'Free Spins', key: 'freeSpins' },
        { label: 'Total Games', key: 'games' },
        { label: 'Payout Speed', key: 'payout' },
        { label: 'Support', key: 'support' },
        { label: 'Min. Deposit', key: 'minDeposit' }
    ];

    features?.forEach(feature => {
        tableHTML += `<tr><td><strong>${feature?.label ?? ''}</strong></td>`;
        selectedCasinos?.forEach(casinoId => {
            const casino = casinoData?.[casinoId];
            tableHTML += `<td>${casino?.[feature?.key] ?? 'N/A'}</td>`;
        });
        tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';

    const tableContainer = document.getElementById('comparisonTable');
    if (tableContainer) {
        tableContainer.innerHTML = tableHTML;
    }
}

// ========================================
// FAQ ACCORDION
// ========================================

function toggleFAQ(button) {
    const faqItem = button?.closest('.faq-item');
    const allFaqItems = document.querySelectorAll('.faq-item');

    // Close all other FAQ items
    allFaqItems?.forEach(item => {
        if (item !== faqItem) {
            item?.classList.remove('active');
        }
    });

    // Toggle current FAQ item
    faqItem?.classList.toggle('active');
}

// ========================================
// MODALS
// ========================================

function openReviewModal(casinoId) {
    const modal = document.getElementById('reviewModal');
    const content = document.getElementById('reviewModalContent');

    const reviews = {
        'lili-bet': {
            name: 'LiliBet Casino',
            rating: '9.9/10',
            quickVerdict: 'LiliBet Casino reigns as our #1 choice for 2026, combining cutting-edge AI technology with industry-leading bonuses and instant payouts. Perfect for both beginners seeking guidance and experienced players demanding premium features.',
            bonuses: {
                welcome: '250% up to $3,000 + 200 Free Spins',
                wageringRequirement: '30x bonus',
                minDeposit: '$25',
                features: [
                    'Weekly reload bonuses up to 100%',
                    'Cashback program - 10% weekly',
                    'VIP personalized bonus packages',
                    'Birthday bonus - up to $500',
                    'No wagering free spins available'
                ]
            },
            paymentMethods: {
                deposits: ['Visa/Mastercard', 'PayPal', 'Skrill', 'Neteller', 'Bitcoin', 'Ethereum', 'Litecoin', 'Bank Transfer', 'Apple Pay'],
                withdrawals: ['Same as deposit methods'],
                withdrawalTime: 'Instant (Crypto) / 24-48 hours (E-wallets) / 3-5 days (Cards)',
                limits: 'Min: $10 / Max: $10,000 per transaction'
            },
            softwareProviders: [
                'NetEnt',
                'Microgaming',
                'Pragmatic Play',
                'Evolution Gaming',
                'Play\'n GO',
                'Yggdrasil',
                'Red Tiger',
                'Quickspin',
                'Big Time Gaming',
                'Push Gaming',
                'NoLimit City',
                'Hacksaw Gaming',
                '+ 70 more providers'
            ],
            pros: [
                'Industry-leading 250% welcome bonus up to $3,000',
                'Instant crypto withdrawals (under 10 minutes)',
                'AI-powered game recommendation engine',
                'Award-winning 24/7 live chat support',
                '3,500+ games from 80+ top-tier providers',
                'Advanced beginner-friendly interface with tutorials',
                'Multiple cryptocurrency payment options',
                'Exclusive March 2026 game releases',
                'VIP program with personalized rewards',
                'Low wagering requirements (30x)'
            ],
            cons: [
                'Premium features may overwhelm absolute beginners initially',
                'Higher minimum deposit requirement for maximum bonus'
            ]
        },
        'bet365': {
            name: 'Bet365 Casino',
            rating: '9.8/10',
            quickVerdict: 'Bet365 is a globally trusted powerhouse with over 20 years of excellence in the gaming industry. Known for unparalleled reliability, world-class live casino experience, and seamless sports betting integration, Bet365 is the gold standard for players who prioritize safety, quality, and comprehensive gaming options. Perfect for both casino enthusiasts and sports bettors.',
            bonuses: {
                welcome: '200% up to $2,000 + 150 Free Spins',
                wageringRequirement: '35x bonus',
                minDeposit: '$20',
                features: [
                    'Daily casino promotions and offers',
                    'Sports betting welcome bonus available',
                    'Reload bonuses every Friday - up to 50%',
                    'Elite VIP cashback program - up to 15%',
                    'Birthday bonus surprises',
                    'Exclusive high-roller packages',
                    'Acca boost for sports betting'
                ]
            },
            paymentMethods: {
                deposits: ['Visa/Mastercard', 'PayPal', 'Skrill', 'Neteller', 'Paysafecard', 'Bank Transfer', 'Rapid Transfer', 'Apple Pay', 'Google Pay'],
                withdrawals: ['Same as deposit methods'],
                withdrawalTime: '24-48 hours (E-wallets) / 3-5 days (Cards) / 1-3 days (Bank Transfer)',
                limits: 'Min: $10 / Max: $30,000 per transaction (VIP higher)'
            },
            softwareProviders: [
                'Playtech',
                'Evolution Gaming',
                'NetEnt',
                'Microgaming',
                'Pragmatic Play',
                'Red Tiger',
                'Blueprint Gaming',
                'Big Time Gaming',
                'Quickspin',
                'Nolimit City',
                'Yggdrasil',
                'Push Gaming',
                'Thunderkick',
                'ELK Studios',
                '+ 50 more providers'
            ],
            pros: [
                '200% welcome bonus up to $2,000 + 150 free spins',
                '20+ years of trusted operation worldwide',
                '4,000+ premium casino games',
                '200+ live dealer tables with professional dealers',
                'Award-winning mobile app (iOS & Android)',
                'Integrated sports betting platform',
                'Elite VIP program with personal account managers',
                'Fast and reliable withdrawals',
                'Excellent 24/7 multilingual customer support',
                'Multiple payment options including e-wallets',
                'Live streaming of sports events',
                'Strong licensing and regulation (UK, Malta)',
                'In-play betting and cash-out features',
                'Tutorial system for beginners'
            ],
            cons: [
                'Bonus wagering requirements are standard (35x)',
                'Some countries restricted',
                'Live chat can be busy during peak hours'
            ]
        },
        'fieryPlay': {
            name: 'FieryPlay Casino',
            rating: '6.7/10',
            quickVerdict: 'FieryPlay is a premium Australian-themed casino known for its exceptional game variety and player-focused features. It offers exclusive original slots, a generous cashback program, and lightning-fast crypto payments, making it a great choice for players seeking quality and innovation.',
            bonuses: {
                welcome: '150% up to $1,500 + 100 Free Spins',
                wageringRequirement: '35x bonus',
                minDeposit: '$20',
                features: [
                    'Daily casino promotions and offers',
                    'Sports betting welcome bonus available',
                    'Reload bonuses every Friday - up to 50%',
                    'Elite VIP cashback program - up to 15%',
                    'Birthday bonus surprises',
                    'Exclusive high-roller packages',
                    'Acca boost for sports betting'
                ]
            },
            paymentMethods: {
                deposits: ['Visa/Mastercard', 'PayPal', 'Skrill', 'Neteller', 'Paysafecard', 'Bank Transfer', 'Rapid Transfer', 'Apple Pay', 'Google Pay'],
                withdrawals: ['Same as deposit methods'],
                withdrawalTime: '24-48 hours (E-wallets) / 3-5 days (Cards) / 1-3 days (Bank Transfer)',
                limits: 'Min: $10 / Max: $30,000 per transaction (VIP higher)'
            },
            softwareProviders: [
                'Playtech',
                'Evolution Gaming',
                'NetEnt',
                'Microgaming',
                'Pragmatic Play',
                'Red Tiger',
                'Blueprint Gaming',
                'Big Time Gaming',
                'Quickspin',
                'Nolimit City',
                'Yggdrasil',
                'Push Gaming',
                'Thunderkick',
                'ELK Studios',
                '+ 50 more providers'
            ],
            pros: [
                '200% welcome bonus up to $2,000 + 150 free spins',
                '20+ years of trusted operation worldwide',
                '4,000+ premium casino games',
                '200+ live dealer tables with professional dealers',
                'Award-winning mobile app (iOS & Android)',
                'Integrated sports betting platform',
                'Elite VIP program with personal account managers',
                'Fast and reliable withdrawals',
                'Excellent 24/7 multilingual customer support',
                'Multiple payment options including e-wallets',
                'Live streaming of sports events',
                'Strong licensing and regulation (UK, Malta)',
                'In-play betting and cash-out features',
                'Tutorial system for beginners'
            ],
            cons: [
                'Bonus wagering requirements are standard (35x)',
                'Some countries restricted',
                'Live chat can be busy during peak hours'
            ]
        },
        'pike-casino': {
            name: 'Pike Casinos',
            rating: '8.8/10',
            quickVerdict: 'Pike Casino is a newly launched online casino operated by Goodwin N.V. and reported to hold a Curaçao gaming licence. It offers more than 10,000 casino games from over 100 software providers, including slots, table games, live casino and instant-win titles.',
            bonuses: {
                welcome: '500% up to $2,500 + 400 Free Spins',
                wageringRequirement: '35x bonus',
                minDeposit: '$100',
                features: [
                    'Daily casino promotions and offers',
                    'Sports betting welcome bonus available',
                    'Reload bonuses every Friday - up to 50%',
                    'Elite VIP cashback program - up to 15%',
                    'Birthday bonus surprises',
                    'Exclusive high-roller packages',
                    'Acca boost for sports betting'
                ]
            },
            paymentMethods: {
                deposits: ['Visa/Mastercard', 'PayPal', 'Skrill', 'Neteller', 'Paysafecard', 'Bank Transfer', 'Rapid Transfer', 'Apple Pay', 'Google Pay'],
                withdrawals: ['Same as deposit methods'],
                withdrawalTime: '24-48 hours (E-wallets) / 3-5 days (Cards) / 1-3 days (Bank Transfer)',
                limits: 'Min: $10 / Max: $30,000 per transaction (VIP higher)'
            },
            softwareProviders: [
                'Playtech',
                'Evolution Gaming',
                'NetEnt',
                'Microgaming',
                'Pragmatic Play',
                'Red Tiger',
                'Blueprint Gaming',
                'Big Time Gaming',
                'Quickspin',
                'Nolimit City',
                'Yggdrasil',
                'Push Gaming',
                'Thunderkick',
                'ELK Studios',
                '+ 50 more providers'
            ],
            pros: [
                'More than 10,000 casino games.',
                'Over 100 software providers.',
                'Strong selection of slots and live casino games.',
                'Regular cashback and jackpot promotions.',
                'Referral programme with free spins.',
                'Supports cards, e-wallets, bank transfers and cryptocurrencies',
                'Minimum deposit from around €10',
                'Fast and reliable withdrawals',
                'Excellent 24/7 multilingual customer support',
                'Live chat support is available',
                'Mobile-friendly website for desktop and smartphone users',
                
                'In-play betting and cash-out features',
                'Tutorial system for beginners'
            ],
            cons: [
                'Welcome bonus terms are not fully consistent across Pike Casino documents.',
                'High wagering requirement of 40x or 60x, depending on the published terms.',
                'No clearly published maximum bet for the welcome bonus.'
            ]
        },
        'royal-reels-casino': {
            name: 'Royal Reels Casino',
            rating: '6.1/10',
            quickVerdict: 'Royal Reels is a premium Australian-themed casino known for its exceptional game variety and player-focused features. It offers exclusive original slots, a generous cashback program, and lightning-fast crypto payments, making it a great choice for players seeking quality and innovation.',
            bonuses: {
                welcome: '100% up to $500 + 100 Free Spins',
                wageringRequirement: '35x bonus',
                minDeposit: '$20',
                features: [
                    'Daily casino promotions and offers',
                    'Sports betting welcome bonus available',
                    'Reload bonuses every Friday - up to 50%',
                    'Elite VIP cashback program - up to 15%',
                    'Birthday bonus surprises',
                    'Exclusive high-roller packages',
                    'Acca boost for sports betting'
                ]
            },
            paymentMethods: {
                deposits: ['Visa/Mastercard', 'PayPal', 'Skrill', 'Neteller', 'Paysafecard', 'Bank Transfer', 'Rapid Transfer', 'Apple Pay', 'Google Pay'],
                withdrawals: ['Same as deposit methods'],
                withdrawalTime: '24-48 hours (E-wallets) / 3-5 days (Cards) / 1-3 days (Bank Transfer)',
                limits: 'Min: $10 / Max: $30,000 per transaction (VIP higher)'
            },
            softwareProviders: [
                'Playtech',
                'Evolution Gaming',
                'NetEnt',
                'Microgaming',
                'Pragmatic Play',
                'Red Tiger',
                'Blueprint Gaming',
                'Big Time Gaming',
                'Quickspin',
                'Nolimit City',
                'Yggdrasil',
                'Push Gaming',
                'Thunderkick',
                'ELK Studios',
                '+ 50 more providers'
            ],
            pros: [
                '200% welcome bonus up to $2,000 + 150 free spins',
                '20+ years of trusted operation worldwide',
                '4,000+ premium casino games',
                '200+ live dealer tables with professional dealers',
                'Award-winning mobile app (iOS & Android)',
                'Integrated sports betting platform',
                'Elite VIP program with personal account managers',
                'Fast and reliable withdrawals',
                'Excellent 24/7 multilingual customer support',
                'Multiple payment options including e-wallets',
                'Live streaming of sports events',
                'Strong licensing and regulation (UK, Malta)',
                'In-play betting and cash-out features',
                'Tutorial system for beginners'
            ],
            cons: [
                'Bonus wagering requirements are standard (35x)',
                'Some countries restricted',
                'Live chat can be busy during peak hours'
            ]
        },
        'millioner': {
            name: 'Millioner Casino',
            rating: '6.7/10',
            quickVerdict: 'Millioner is a premium Australian-themed casino known for its exceptional game variety and player-focused features. It offers exclusive original slots, a generous cashback program, and lightning-fast crypto payments, making it a great choice for players seeking quality and innovation.',
            bonuses: {
                welcome: '150% up to $1,500 + 100 Free Spins',
                wageringRequirement: '35x bonus',
                minDeposit: '$20',
                features: [
                    'Daily casino promotions and offers',
                    'Sports betting welcome bonus available',
                    'Reload bonuses every Friday - up to 50%',
                    'Elite VIP cashback program - up to 15%',
                    'Birthday bonus surprises',
                    'Exclusive high-roller packages',
                    'Acca boost for sports betting'
                ]
            },
            paymentMethods: {
                deposits: ['Visa/Mastercard', 'PayPal', 'Skrill', 'Neteller', 'Paysafecard', 'Bank Transfer', 'Rapid Transfer', 'Apple Pay', 'Google Pay'],
                withdrawals: ['Same as deposit methods'],
                withdrawalTime: '24-48 hours (E-wallets) / 3-5 days (Cards) / 1-3 days (Bank Transfer)',
                limits: 'Min: $10 / Max: $30,000 per transaction (VIP higher)'
            },
            softwareProviders: [
                'Playtech',
                'Evolution Gaming',
                'NetEnt',
                'Microgaming',
                'Pragmatic Play',
                'Red Tiger',
                'Blueprint Gaming',
                'Big Time Gaming',
                'Quickspin',
                'Nolimit City',
                'Yggdrasil',
                'Push Gaming',
                'Thunderkick',
                'ELK Studios',
                '+ 50 more providers'
            ],
            pros: [
                '200% welcome bonus up to $2,000 + 150 free spins',
                '20+ years of trusted operation worldwide',
                '4,000+ premium casino games',
                '200+ live dealer tables with professional dealers',
                'Award-winning mobile app (iOS & Android)',
                'Integrated sports betting platform',
                'Elite VIP program with personal account managers',
                'Fast and reliable withdrawals',
                'Excellent 24/7 multilingual customer support',
                'Multiple payment options including e-wallets',
                'Live streaming of sports events',
                'Strong licensing and regulation (UK, Malta)',
                'In-play betting and cash-out features',
                'Tutorial system for beginners'
            ],
            cons: [
                'Bonus wagering requirements are standard (35x)',
                'Some countries restricted',
                'Live chat can be busy during peak hours'
            ]
        },
        'boomerang': {
            name: 'Boomerang Casino',
            rating: '9.7/10',
            quickVerdict: 'Boomerang Casino delivers a premium gaming experience with an Australian flair. Featuring exclusive original slots, one of the industry\'s best cashback programs at 20% weekly, and outstanding crypto payment options, Boomerang stands out as a player-focused casino that rewards loyalty. With 3,200+ games and innovative features, it\'s perfect for players who want quality entertainment and excellent value.',
            bonuses: {
                welcome: '150% up to $1,500 + 100 Free Spins',
                wageringRequirement: '30x bonus',
                minDeposit: '$20',
                features: [
                    'Weekly cashback bonus - 20% on losses',
                    'Monday reload bonus - 75% up to $500',
                    'Weekend free spins drops',
                    'Level-up loyalty rewards system',
                    'Birthday surprise package',
                    'VIP exclusive tournaments',
                    'Special crypto deposit bonuses',
                    'Refer-a-friend bonus - $100'
                ]
            },
            paymentMethods: {
                deposits: ['Visa/Mastercard', 'Skrill', 'Neteller', 'Bitcoin', 'Ethereum', 'Litecoin', 'Dogecoin', 'USDT', 'Bank Transfer', 'MiFinity'],
                withdrawals: ['Same as deposit methods'],
                withdrawalTime: 'Instant (Crypto) / 24 hours (E-wallets) / 3-5 days (Cards)',
                limits: 'Min: $20 / Max: $5,000 per transaction (VIP higher)'
            },
            softwareProviders: [
                'NetEnt',
                'Pragmatic Play',
                'Play\'n GO',
                'Boomerang Originals',
                'Evolution Gaming',
                'Microgaming',
                'Quickspin',
                'Red Tiger',
                'Yggdrasil',
                'Push Gaming',
                'NoLimit City',
                'Hacksaw Gaming',
                'Big Time Gaming',
                'Thunderkick',
                'ELK Studios',
                '+ 40 more providers'
            ],
            pros: [
                '150% welcome bonus up to $1,500 + 100 free spins',
                '20% weekly cashback - one of the highest in the industry',
                '3,200+ premium casino games',
                'Exclusive Boomerang Original slot games',
                'Instant cryptocurrency withdrawals',
                'Crypto-friendly with multiple coin options',
                'Modern and intuitive user interface',
                'Level-up loyalty program with rewards',
                'Fast verification process',
                'Monday reload bonus 75%',
                'Weekend free spins promotions',
                'No maximum cashout on winnings',
                'Mobile-optimized platform',
                'Live chat support available'
            ],
            cons: [
                'Relatively new casino (less track record)',
                'Live chat not 24/7 (limited hours)',
                'Some countries restricted'
            ]
        },
        'royal-vegas': {
            name: 'Royal Vegas Palace',
            rating: '9.6/10',
            pros: [
                '150% bonus up to $1,500',
                'Established and trusted brand',
                'Live dealer games available',
                'VIP loyalty program',
                'Mobile app for iOS and Android',
                '2,500+ quality games'
            ],
            cons: [
                'Slightly higher wagering requirements',
                'Account verification can take 24-48 hours'
            ],
            summary: 'Royal Vegas Palace combines reliability with quality. As an established operator, they offer a premium gaming experience with live dealers, VIP perks, and a solid game selection.'
        },
        'diamond-club': {
            name: 'Diamond Club Casino',
            rating: '9.4/10',
            pros: [
                'Low $10 minimum deposit',
                'Exclusive slot titles',
                'Weekly cashback offers',
                'Good loyalty rewards',
                'Clean, modern interface'
            ],
            cons: [
                'Smaller game library than competitors',
                'Slower payout times',
                'Support not available 24/7'
            ],
            summary: 'Diamond Club is perfect for budget-conscious players. With a low minimum deposit and exclusive games, it offers quality gaming without breaking the bank.'
        },
        'quick-bet-casino': {
            name: 'Quick Bet Casino',
            rating: '6.1/10',
            pros: [
                '150% bonus up to $1,500',
                'Established and trusted brand',
                'Live dealer games available',
                'VIP loyalty program',
                'Mobile app for iOS and Android',
                '2,500+ quality games'
            ],
            cons: [
                'Slightly higher wagering requirements',
                'Account verification can take 24-48 hours'
            ],
            summary: 'Royal Vegas Palace combines reliability with quality. As an established operator, they offer a premium gaming experience with live dealers, VIP perks, and a solid game selection.'
        },
        'diamond-club': {
            name: 'Diamond Club Casino',
            rating: '9.4/10',
            pros: [
                'Low $10 minimum deposit',
                'Exclusive slot titles',
                'Weekly cashback offers',
                'Good loyalty rewards',
                'Clean, modern interface'
            ],
            cons: [
                'Smaller game library than competitors',
                'Slower payout times',
                'Support not available 24/7'
            ],
            summary: 'Diamond Club is perfect for budget-conscious players. With a low minimum deposit and exclusive games, it offers quality gaming without breaking the bank.'
        },
        'mega-fortune': {
            name: 'Mega Fortune Slots',
            rating: '9.7/10',
            pros: [
                'Industry-leading 250% bonus',
                'Lowest wagering requirements (25x)',
                '3,500+ games including exclusives',
                'Progressive jackpots',
                'Same-day withdrawals',
                'No wagering on some bonuses'
            ],
            cons: [
                'Higher minimum deposit ($30)',
                'Can be overwhelming for complete beginners'
            ],
            summary: 'Mega Fortune offers the best value for money with massive bonuses and low wagering. Perfect for players who want to maximize their bonus potential.'
        },
        'turbo-casino': {
            name: 'Turbo Casino',
            rating: '9.5/10',
            pros: [
                '10-minute withdrawal times',
                'Instant deposits with all methods',
                'E-wallet optimized',
                '175% welcome bonus',
                'Modern, fast platform',
                '2,200+ games'
            ],
            cons: [
                'Fewer traditional banking options',
                'Game library smaller than some competitors'
            ],
            summary: 'True to its name, Turbo Casino is all about speed. If fast payouts and quick transactions are priorities, this is your casino.'
        },
        
        'pocket-casino': {
            name: 'Pocket Casino Pro',
            rating: '9.3/10',
            pros: [
                'Best mobile gaming experience',
                'Dedicated iOS and Android apps',
                'Touch-optimized interface',
                '2,800+ mobile-compatible games',
                'Mobile-exclusive bonuses',
                '5G ready'
            ],
            cons: [
                'Desktop experience less impressive',
                'Some features only on mobile'
            ],
            summary: 'Pocket Casino Pro is designed mobile-first. With dedicated apps and touch controls, it\'s the best choice for on-the-go gaming.'
        },
        'nova-gaming': {
            name: 'Nova Gaming',
            rating: '9.2/10',
            pros: [
                'Massive 300% welcome bonus',
                'Gamification features',
                'Social gaming elements',
                'Tournament support',
                'Modern platform',
                'Innovative features'
            ],
            cons: [
                'New platform (less track record)',
                'Higher wagering requirements',
                'Higher minimum deposit'
            ],
            summary: 'Nova Gaming brings fresh innovation to online casinos with gamification and social features. Great for players seeking a modern, interactive experience.'
        },
        'pike': {
            name: 'Pike Casinos',
            rating: '9.0/10',
            pros: [
                'Massive 300% welcome bonus',
                'Gamification features',
                'Social gaming elements',
                'Tournament support',
                'Modern platform',
                'Innovative features'
            ],
            cons: [
                'New platform (less track record)',
                'Higher wagering requirements',
                'Higher minimum deposit'
            ],
            summary: 'Nova Gaming brings fresh innovation to online casinos with gamification and social features. Great for players seeking a modern, interactive experience.'
        },
        'easy-start': {
            name: 'Easy Start Casino',
            rating: '9.6/10',
            pros: [
                'Specifically designed for beginners',
                'Free play mode on all games',
                'Video tutorials and guides',
                'Step-by-step onboarding',
                'Patient support team',
                'Low minimum deposit'
            ],
            cons: [
                'Less exciting for experienced players',
                'Smaller bonus than competitors'
            ],
            summary: 'Easy Start Casino is perfect for complete beginners. With tutorials, free play, and helpful support, it makes learning to play online simple and stress-free.'
        }
    };

    const review = reviews?.[casinoId] ?? reviews['lili-bet'];

    if (content) {
        let reviewHTML = `
            <h2>${review?.name ?? 'Casino'} - Full Review</h2>
            <div style="margin: 20px 0;">
                <div style="font-size: 24px; font-weight: 700; color: var(--primary-color);">Rating: ${review?.rating ?? 'N/A'}</div>
            </div>
        `;

        // Quick Verdict Section
        if (review?.quickVerdict) {
            reviewHTML += `
                <div style="margin: 30px 0; padding: 20px; background: linear-gradient(135deg, #07792d 0%, #764ba2 100%); border-radius: 10px; color: white;">
                    <h3 style="margin-bottom: 15px; color: white;">⚡ Quick Verdict</h3>
                    <p style="line-height: 1.7; color: white; margin: 0;">${review?.quickVerdict ?? ''}</p>
                </div>
            `;
        }

        // Bonuses Section
        if (review?.bonuses) {
            reviewHTML += `
                <div style="margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 10px;">
                    <h3 style="color: var(--primary-color); margin-bottom: 15px;">🎁 Bonuses & Promotions</h3>
                    <div style="margin-bottom: 15px;">
                        <strong style="color: var(--text-dark);">Welcome Bonus:</strong> 
                        <span style="color: var(--primary-color); font-weight: 600;">${review?.bonuses?.welcome ?? 'N/A'}</span>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong style="color: var(--text-dark);">Wagering Requirement:</strong> 
                        <span style="color: var(--text-gray);">${review?.bonuses?.wageringRequirement ?? 'N/A'}</span>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong style="color: var(--text-dark);">Minimum Deposit:</strong> 
                        <span style="color: var(--text-gray);">${review?.bonuses?.minDeposit ?? 'N/A'}</span>
                    </div>
                    ${review?.bonuses?.features?.length ? `
                        <div style="margin-top: 15px;">
                            <strong style="color: var(--text-dark);">Additional Bonuses:</strong>
                            <ul style="list-style: disc; margin-left: 20px; margin-top: 10px;">
                                ${review?.bonuses?.features?.map(feature => `<li style="margin-bottom: 5px; color: var(--text-gray);">${feature ?? ''}</li>`)?.join('') ?? ''}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            `;
        }

        // Payment Methods Section
        if (review?.paymentMethods) {
            reviewHTML += `
                <div style="margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 10px;">
                    <h3 style="color: var(--primary-color); margin-bottom: 15px;">💳 Payment Methods</h3>
                    ${review?.paymentMethods?.deposits?.length ? `
                        <div style="margin-bottom: 15px;">
                            <strong style="color: var(--text-dark);">Deposit Options:</strong>
                            <div style="margin-top: 8px; color: var(--text-gray);">
                                ${review?.paymentMethods?.deposits?.join(' • ') ?? ''}
                            </div>
                        </div>
                    ` : ''}
                    <div style="margin-bottom: 15px;">
                        <strong style="color: var(--text-dark);">Withdrawal Time:</strong> 
                        <span style="color: var(--text-gray);">${review?.paymentMethods?.withdrawalTime ?? 'N/A'}</span>
                    </div>
                    <div>
                        <strong style="color: var(--text-dark);">Transaction Limits:</strong> 
                        <span style="color: var(--text-gray);">${review?.paymentMethods?.limits ?? 'N/A'}</span>
                    </div>
                </div>
            `;
        }

        // Software Providers Section
        if (review?.softwareProviders?.length) {
            reviewHTML += `
                <div style="margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 10px;">
                    <h3 style="color: var(--primary-color); margin-bottom: 15px;">🎮 Software Providers</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        ${review?.softwareProviders?.map(provider => 
                            `<span style="background: white; padding: 8px 15px; border-radius: 20px; color: var(--text-gray); font-size: 14px; border: 1px solid #e0e0e0;">${provider ?? ''}</span>`
                        )?.join('') ?? ''}
                    </div>
                </div>
            `;
        }

        // Positives & Negatives Section
        reviewHTML += `
            <div style="margin: 30px 0;">
                <h3 style="color: #28a745; margin-bottom: 15px;">✓ Positives</h3>
                <ul style="list-style: none; margin-left: 0; padding-left: 0;">
                    ${(review?.pros ?? [])?.map(pro => `<li style="margin-bottom: 10px; color: var(--text-gray); padding-left: 25px; position: relative;"><span style="position: absolute; left: 0; color: #28a745; font-weight: bold;">✓</span>${pro ?? ''}</li>`)?.join('') ?? ''}
                </ul>
            </div>

            <div style="margin: 30px 0;">
                <h3 style="color: #dc3545; margin-bottom: 15px;">✗ Negatives</h3>
                <ul style="list-style: none; margin-left: 0; padding-left: 0;">
                    ${(review?.cons ?? [])?.map(con => `<li style="margin-bottom: 10px; color: var(--text-gray); padding-left: 25px; position: relative;"><span style="position: absolute; left: 0; color: #dc3545; font-weight: bold;">✗</span>${con ?? ''}</li>`)?.join('') ?? ''}
                </ul>
            </div>
        `;

        reviewHTML += `
            <div style="margin-top: 30px; text-align: center; padding-top: 20px; border-top: 2px solid #e0e0e0;">
                <a href="#${casinoId}" class="btn btn-primary" style="display: inline-block; padding: 15px 40px; font-size: 16px;">Visit ${review?.name ?? 'Casino'} Now</a>
            </div>
        `;

        content.innerHTML = reviewHTML;
    }

    modal?.classList.add('show');
}

function openGuideModal(guideId) {
    const modal = document.getElementById('guideModal');
    const content = document.getElementById('guideModalContent');

    const guides = {
        'getting-started': {
            title: 'Getting Started with Online Casinos',
            sections: [
                {
                    heading: '1. Choose a Licensed Casino',
                    text: 'Always verify the casino is licensed by a reputable authority (UK Gambling Commission, Malta Gaming Authority, etc.). Look for the license information in the footer.'
                },
                {
                    heading: '2. Register Your Account',
                    text: 'Provide accurate personal information during registration. You\'ll need to verify your identity later for withdrawals.'
                },
                {
                    heading: '3. Claim Your Welcome Bonus',
                    text: 'Click through our links to ensure you get the best bonus. Read the terms and conditions to understand wagering requirements.'
                },
                {
                    heading: '4. Make Your First Deposit',
                    text: 'Choose a payment method you\'re comfortable with. Start with the minimum deposit to test the waters.'
                },
                {
                    heading: '5. Try Free Play First',
                    text: 'Most games offer demo mode. Use this to learn game mechanics before playing with real money.'
                },
                {
                    heading: '6. Set a Budget',
                    text: 'Decide how much you can afford to lose and stick to it. Use deposit limits and self-exclusion tools if needed.'
                }
            ]
        },
        'slots-guide': {
            title: 'Understanding Slot Machines',
            sections: [
                {
                    heading: 'How Slots Work',
                    text: 'Slots use Random Number Generators (RNG) to ensure fair outcomes. Each spin is independent and random.'
                },
                {
                    heading: 'RTP (Return to Player)',
                    text: 'RTP shows the percentage of wagered money a slot returns over time. Look for slots with 96% RTP or higher.'
                },
                {
                    heading: 'Volatility',
                    text: 'Low volatility = frequent small wins. High volatility = rare but bigger wins. Choose based on your playing style and bankroll.'
                },
                {
                    heading: 'Paylines',
                    text: 'Paylines are patterns where matching symbols award wins. Modern slots can have hundreds of ways to win.'
                },
                {
                    heading: 'Bonus Features',
                    text: 'Free spins, multipliers, wilds, and bonus games add excitement and winning potential. Understand how they trigger.'
                },
                {
                    heading: 'Tips for Slots',
                    text: 'Start with low bets, choose high RTP games, take advantage of free spins bonuses, and never chase losses.'
                }
            ]
        },
        'table-games': {
            title: 'Table Games Basics',
            sections: [
                {
                    heading: 'Blackjack',
                    text: 'Goal: Beat the dealer by getting closer to 21 without going over. Learn basic strategy to reduce house edge to under 1%.'
                },
                {
                    heading: 'Roulette',
                    text: 'Bet on where the ball will land. European roulette (single zero) has better odds than American (double zero). Start with simple bets like red/black.'
                },
                {
                    heading: 'Baccarat',
                    text: 'Bet on Player, Banker, or Tie. Banker has the best odds. It\'s a simple game of chance - no strategy needed.'
                },
                {
                    heading: 'Poker',
                    text: 'Many variants exist. Start with video poker or casual poker games. Learn hand rankings first, then study strategy.'
                },
                {
                    heading: 'Live Dealer Games',
                    text: 'Play with real dealers via video stream. More immersive but higher minimum bets. Great for table game enthusiasts.'
                },
                {
                    heading: 'Practice First',
                    text: 'Use demo mode to learn rules and practice without risk. Many online guides and strategy charts are available free.'
                }
            ]
        },
        'bonus-terms': {
            title: 'Understanding Bonus Terms',
            sections: [
                {
                    heading: 'Wagering Requirements',
                    text: 'The number of times you must bet the bonus before withdrawing. Example: $100 bonus with 35x = $3,500 in total bets required.'
                },
                {
                    heading: 'Game Contributions',
                    text: 'Different games contribute differently to wagering. Slots usually count 100%, table games might count 10-20% or be excluded.'
                },
                {
                    heading: 'Maximum Bet',
                    text: 'Bonus terms often limit bet sizes (e.g., $5 max per spin). Exceeding this can void your bonus and winnings.'
                },
                {
                    heading: 'Expiration',
                    text: 'Bonuses have time limits. You might have 7-30 days to meet wagering requirements or the bonus expires.'
                },
                {
                    heading: 'Withdrawal Limits',
                    text: 'Some bonuses cap maximum withdrawals (e.g., max cashout $100 from no deposit bonus).'
                },
                {
                    heading: 'Tips',
                    text: 'Always read full terms, calculate if wagering is achievable, check game restrictions, and contact support if unclear.'
                }
            ]
        },
        'payments': {
            title: 'Payment Methods Guide',
            sections: [
                {
                    heading: 'Credit/Debit Cards',
                    text: 'Widely accepted, instant deposits. Withdrawals take 3-5 days. Some banks block gambling transactions.'
                },
                {
                    heading: 'E-Wallets (PayPal, Skrill, Neteller)',
                    text: 'Fast deposits and withdrawals (24-48 hours). May not qualify for certain bonuses. Small fees possible.'
                },
                {
                    heading: 'Bank Transfers',
                    text: 'Secure but slow (5-7 days). Good for large amounts. No fees from casino, but bank may charge.'
                },
                {
                    heading: 'Cryptocurrency',
                    text: 'Anonymous, fast, and secure. Growing acceptance. Volatility can affect value. Lower fees.'
                },
                {
                    heading: 'Prepaid Cards',
                    text: 'Control spending with prepaid amounts. Deposits only (can\'t withdraw to prepaid). Good for budget management.'
                },
                {
                    heading: 'Withdrawal Tips',
                    text: 'Complete KYC verification early, use same method as deposit when possible, check for minimum/maximum limits, and be patient during first withdrawal.'
                }
            ]
        },
        'safety': {
            title: 'Staying Safe Online',
            sections: [
                {
                    heading: 'Verify Licensing',
                    text: 'Check for valid licenses from UK, Malta, Curacao, or other reputable authorities. License numbers should be verifiable on authority websites.'
                },
                {
                    heading: 'SSL Encryption',
                    text: 'Look for HTTPS and padlock icon in browser. This encrypts your data and protects sensitive information.'
                },
                {
                    heading: 'Responsible Gambling Tools',
                    text: 'Use deposit limits, loss limits, session timers, and self-exclusion options. Good casinos promote these tools prominently.'
                },
                {
                    heading: 'Secure Your Account',
                    text: 'Use strong, unique passwords. Enable two-factor authentication if available. Never share login details.'
                },
                {
                    heading: 'Read Reviews',
                    text: 'Check player reviews and ratings. Avoid casinos with unresolved complaints or poor reputation.'
                },
                {
                    heading: 'Know the Signs',
                    text: 'Problem gambling signs: chasing losses, gambling with money you can\'t afford to lose, lying about gambling, neglecting responsibilities. Seek help if needed.'
                }
            ]
        }
    };

    const guide = guides?.[guideId] ?? guides['getting-started'];

    if (content) {
        content.innerHTML = `
            <h2>${guide?.title ?? 'Guide'}</h2>
            ${(guide?.sections ?? [])?.map(section => `
                <div style="margin: 30px 0;">
                    <h3 style="color: var(--primary-color); margin-bottom: 15px;">${section?.heading ?? ''}</h3>
                    <p style="color: var(--text-gray); line-height: 1.7;">${section?.text ?? ''}</p>
                </div>
            `)?.join('') ?? ''}
        `;
    }

    modal?.classList.add('show');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal?.classList.remove('show');
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e?.target?.classList?.contains('modal')) {
        e.target?.classList?.remove('show');
    }
});

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries?.forEach(entry => {
        if (entry?.isIntersecting) {
            entry?.target?.style?.setProperty('opacity', '1');
            entry?.target?.style?.setProperty('transform', 'translateY(0)');
        }
    });
}, observerOptions);

// Observe casino cards for scroll animations
const casinoCards = document.querySelectorAll('.casino-card');
casinoCards?.forEach((card, index) => {
    card?.style?.setProperty('opacity', '0');
    card?.style?.setProperty('transform', 'translateY(30px)');
    card?.style?.setProperty('transition', `all 0.6s ease ${index * 0.1}s`);
    observer?.observe(card);
});

// ========================================
// INITIALIZE
// ========================================

// Set initial quiz progress
updateQuizProgress();

// Console welcome message
console.log('%cWelcome to Mr Free Slots! 🎰', 'color: #2A9D8F; font-size: 20px; font-weight: bold;');
console.log('%cPlaceholder affiliate links are used throughout this site.', 'color: #E9C46A; font-size: 14px;');
console.log('%cReplace them with your actual affiliate URLs before going live.', 'color: #E9C46A; font-size: 14px;');