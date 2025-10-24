// XGaming Main JavaScript - Baji.live Style
class XGaming {
    constructor() {
        this.games = [];
        this.user = null;
        this.init();
    }

    init() {
        this.loadGames();
        this.setupEventListeners();
        this.initializeComponents();
        console.log('XGaming initialized with Baji.live style');
    }

    loadGames() {
        // Sample games data
        this.games = [
            {
                id: 1,
                title: "লাইভ বাকারা",
                type: "live",
                provider: "Evolution",
                players: 1234,
                rating: 4.9,
                image: "baccarat",
                category: "casino"
            },
            {
                id: 2,
                title: "সুইট বোনানজা",
                type: "slot",
                provider: "Pragmatic Play",
                players: 2345,
                rating: 4.8,
                image: "bonanza",
                category: "slots",
                rtp: 96.5,
                volatility: "high"
            },
            {
                id: 3,
                title: "লাইভ রুলেট",
                type: "live",
                provider: "Pragmatic",
                players: 987,
                rating: 4.8,
                image: "roulette",
                category: "casino"
            },
            {
                id: 4,
                title: "গেটস অফ অলিম্পাস",
                type: "slot",
                provider: "Pragmatic Play",
                players: 1892,
                rating: 4.9,
                image: "olympus",
                category: "slots",
                rtp: 96.5,
                volatility: "medium"
            }
        ];
    }

    setupEventListeners() {
        // Navigation
        this.setupNavigation();
        
        // Game interactions
        this.setupGameInteractions();
        
        // Auth modals
        this.setupAuthModals();
        
        // Sports betting
        this.setupSportsBetting();
        
        // Promotions
        this.setupPromotions();
    }

    setupNavigation() {
        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active navigation link
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupGameInteractions() {
        // Play game buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.play-btn')) {
                this.playGame(e.target.closest('.game-card'));
            }
            
            if (e.target.closest('.demo-btn')) {
                this.playDemo(e.target.closest('.slot-card'));
            }
            
            if (e.target.closest('.real-btn')) {
                this.playReal(e.target.closest('.slot-card'));
            }
        });

        // Game filters
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.filterGames(button.textContent.toLowerCase());
            });
        });

        // Sports tabs
        const sportTabs = document.querySelectorAll('.sport-tab');
        sportTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                sportTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.filterSports(tab.textContent.toLowerCase());
            });
        });
    }

    setupAuthModals() {
        const loginBtn = document.querySelector('.btn-login');
        const signupBtn = document.querySelector('.btn-signup');
        const loginModal = document.getElementById('loginModal');
        const closeButtons = document.querySelectorAll('.close');
        const switchToSignup = document.querySelector('.switch-to-signup');

        // Login modal
        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.openModal(loginModal));
        }

        // Signup would be similar
        if (signupBtn) {
            signupBtn.addEventListener('click', () => {
                // Close login modal if open
                this.closeModals();
                // Show signup modal (you would need to create this)
                alert('Signup functionality would be implemented here');
            });
        }

        // Close modals
        closeButtons.forEach(button => {
            button.addEventListener('click', () => this.closeModals());
        });

        // Switch to signup
        if (switchToSignup) {
            switchToSignup.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModals();
                alert('Switch to signup form');
            });
        }

        // Close modal on outside click
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModals();
            }
        });
    }

    setupSportsBetting() {
        // Odds buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('odd-btn')) {
                this.placeBet(e.target);
            }
        });
    }

    setupPromotions() {
        // Promotion claim buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('promo-btn')) {
                this.claimPromotion(e.target.closest('.promo-card'));
            }
        });

        // Deposit button
        const depositBtn = document.querySelector('.btn-deposit');
        if (depositBtn) {
            depositBtn.addEventListener('click', () => {
                this.showDepositModal();
            });
        }
    }

    initializeComponents() {
        // Initialize live game counters
        this.initializeLiveCounters();
        
        // Initialize sports matches
        this.initializeSportsMatches();
        
        // Initialize promotional offers
        this.initializePromotions();
    }

    initializeLiveCounters() {
        // Simulate live player counts
        setInterval(() => {
            const playerCounts = document.querySelectorAll('.players');
            playerCounts.forEach(count => {
                const current = parseInt(count.textContent.replace(/,/g, ''));
                const change = Math.floor(Math.random() * 50) - 25;
                const newCount = Math.max(100, current + change);
                count.textContent = newCount.toLocaleString();
            });
        }, 5000);
    }

    initializeSportsMatches() {
        // This would typically fetch from an API
        console.log('Sports matches initialized');
    }

    initializePromotions() {
        // Initialize promotional offers
        console.log('Promotions initialized');
    }

    // Game Methods
    playGame(gameCard) {
        const gameTitle = gameCard.querySelector('h4').textContent;
        if (this.user) {
            alert(`Starting ${gameTitle} in real mode...`);
            // Here you would redirect to the actual game
        } else {
            this.openModal(document.getElementById('loginModal'));
        }
    }

    playDemo(slotCard) {
        const slotTitle = slotCard.querySelector('h4').textContent;
        alert(`Starting ${slotTitle} in demo mode...`);
        // Demo game logic would go here
    }

    playReal(slotCard) {
        const slotTitle = slotCard.querySelector('h4').textContent;
        if (this.user) {
            alert(`Starting ${slotTitle} in real mode...`);
            // Real money game logic
        } else {
            this.openModal(document.getElementById('loginModal'));
        }
    }

    filterGames(category) {
        console.log(`Filtering games by: ${category}`);
        // Game filtering logic would go here
    }

    filterSports(sport) {
        console.log(`Filtering sports by: ${sport}`);
        // Sports filtering logic would go here
    }

    // Betting Methods
    placeBet(oddButton) {
        if (this.user) {
            const odds = oddButton.textContent;
            alert(`Placing bet with odds: ${odds}`);
            // Bet placement logic
        } else {
            this.openModal(document.getElementById('loginModal'));
        }
    }

    // Promotion Methods
    claimPromotion(promoCard) {
        if (this.user) {
            const promoTitle = promoCard.querySelector('h3').textContent;
            alert(`Claiming promotion: ${promoTitle}`);
            // Promotion claim logic
        } else {
            this.openModal(document.getElementById('loginModal'));
        }
    }

    showDepositModal() {
        if (this.user) {
            alert('Opening deposit modal...');
            // Deposit modal logic
        } else {
            this.openModal(document.getElementById('loginModal'));
        }
    }

    // Modal Methods
    openModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }

    // Utility Methods
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    formatNumber(number) {
        return new Intl.NumberFormat().format(number);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.xgaming = new XGaming();
});

// Additional utility functions
const Utility = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    // Local storage helpers
    storage: {
        set(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        get(key) {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        },
        remove(key) {
            localStorage.removeItem(key);
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { XGaming, Utility };
}
