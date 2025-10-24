// XGaming Admin Panel JavaScript
class XGamingAdmin {
    constructor() {
        this.currentPage = 'dashboard';
        this.charts = {};
        this.init();
    }

    init() {
        this.initializeCharts();
        this.setupEventListeners();
        this.loadDashboardData();
        console.log('XGaming Admin Panel initialized');
    }

    initializeCharts() {
        // Revenue Chart
        this.charts.revenue = new ApexCharts(document.querySelector("#revenueChart"), {
            series: [{
                name: 'ডিপোজিট',
                data: [30000, 40000, 35000, 50000, 49000, 60000, 70000]
            }, {
                name: 'উইথড্র',
                data: [20000, 30000, 25000, 35000, 30000, 45000, 50000]
            }, {
                name: 'নেট প্রফিট',
                data: [10000, 10000, 10000, 15000, 19000, 15000, 20000]
            }],
            chart: {
                type: 'area',
                height: 350,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            colors: ['#00b894', '#e17055', '#ff6b35'],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.1,
                    stops: [0, 90, 100]
                }
            },
            xaxis: {
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy'
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left'
            }
        });
        this.charts.revenue.render();

        // User Distribution Chart
        this.charts.userDistribution = new ApexCharts(document.querySelector("#userDistributionChart"), {
            series: [44, 55, 13, 43],
            chart: {
                type: 'donut',
                height: 300
            },
            labels: ['একটিভ', 'নতুন', 'ভেরিফাইড', 'সাসপেন্ডেড'],
            colors: ['#00b894', '#3498db', '#ff6b35', '#e17055'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        });
        this.charts.userDistribution.render();
    }

    setupEventListeners() {
        // Navigation
        this.setupNavigation();
        
        // Notifications
        this.setupNotifications();
        
        // Profile dropdown
        this.setupProfileDropdown();
        
        // Quick actions
        this.setupQuickActions();
        
        // Search functionality
        this.setupSearch();
        
        // Modal controls
        this.setupModals();
    }

    setupNavigation() {
        const menuItems = document.querySelectorAll('.menu-item a');
        const pageTitle = document.getElementById('pageTitle');

        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all items
                menuItems.forEach(i => i.parentElement.classList.remove('active'));
                
                // Add active class to clicked item
                item.parentElement.classList.add('active');
                
                // Update page title
                const pageName = item.querySelector('span').textContent;
                pageTitle.textContent = pageName;
                
                // Update breadcrumb
                this.updateBreadcrumb(pageName);
                
                // Load page content
                this.loadPageContent(this.getPageSlug(pageName));
            });
        });
    }

    setupNotifications() {
        const notificationWidget = document.querySelector('.notification-widget');
        const markAllBtn = document.querySelector('.mark-all');

        // Mark all as read
        if (markAllBtn) {
            markAllBtn.addEventListener('click', () => {
                const unreadItems = document.querySelectorAll('.notification-item.unread');
                unreadItems.forEach(item => {
                    item.classList.remove('unread');
                });
                this.updateNotificationBadge(0);
            });
        }
    }

    setupProfileDropdown() {
        const profile = document.querySelector('.admin-profile');

        // Logout functionality
        const logoutBtn = document.querySelector('.logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }
    }

    setupQuickActions() {
        // Quick action modal
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const action = button.textContent.trim();
                this.handleQuickAction(action);
            });
        });
    }

    setupSearch() {
        const searchInput = document.querySelector('.search-bar input');
        
        searchInput.addEventListener('input', this.debounce((e) => {
            this.performSearch(e.target.value);
        }, 300));
    }

    setupModals() {
        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModals();
            }
        });

        // Close buttons
        const closeButtons = document.querySelectorAll('.close');
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.closeModals();
            });
        });
    }

    // Utility Methods
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
    }

    getPageSlug(pageName) {
        const slugMap = {
            'ড্যাশবোর্ড': 'dashboard',
            'ইউজার ম্যানেজমেন্ট': 'users',
            'গেমস ম্যানেজমেন্ট': 'games',
            'ট্রানজ্যাকশন': 'transactions',
            'লাইভ ক্যাসিনো': 'live-casino',
            'স্লট গেমস': 'slots',
            'স্পোর্টস বেটিং': 'sports',
            'টুর্নামেন্ট': 'tournaments',
            'ডিপোজিট': 'deposits',
            'উইথড্র': 'withdrawals',
            'বোনাস': 'bonuses',
            'রিপোর্টস': 'reports',
            'সেটিংস': 'settings',
            'সিকিউরিটি': 'security',
            'সিস্টেম লগ': 'logs'
        };
        return slugMap[pageName] || 'dashboard';
    }

    updateBreadcrumb(pageName) {
        const breadcrumb = document.querySelector('.breadcrumb');
        breadcrumb.innerHTML = `
            <span>হোম</span>
            <i class="fas fa-chevron-right"></i>
            <span>${pageName}</span>
        `;
    }

    updateNotificationBadge(count) {
        const badge = document.querySelector('.notification-badge');
        if (count === 0) {
            badge.style.display = 'none';
        } else {
            badge.style.display = 'flex';
            badge.textContent = count;
        }
    }

    // Data Loading Methods
    loadDashboardData() {
        // Simulate loading real data
        setTimeout(() => {
            this.updateLiveStats();
        }, 1000);
    }

    loadPageContent(page) {
        const content = document.getElementById('dashboardContent');
        
        // Show loading state
        content.innerHTML = `
            <div class="loading-state">
                <i class="fas fa-spinner fa-spin"></i>
                <p>লোড হচ্ছে...</p>
            </div>
        `;

        // Simulate API call
        setTimeout(() => {
            this.renderPageContent(page, content);
        }, 500);
    }

    renderPageContent(page, container) {
        const pages = {
            dashboard: this.renderDashboard.bind(this),
            users: this.renderUsers.bind(this),
            games: this.renderGames.bind(this),
            transactions: this.renderTransactions.bind(this),
            'live-casino': this.renderLiveCasino.bind(this),
            slots: this.renderSlots.bind(this),
            sports: this.renderSports.bind(this),
            tournaments: this.renderTournaments.bind(this),
            deposits: this.renderDeposits.bind(this),
            withdrawals: this.renderWithdrawals.bind(this),
            bonuses: this.renderBonuses.bind(this),
            reports: this.renderReports.bind(this),
            settings: this.renderSettings.bind(this),
            security: this.renderSecurity.bind(this),
            logs: this.renderLogs.bind(this)
        };

        if (pages[page]) {
            pages[page](container);
        } else {
            container.innerHTML = `
                <div class="page-placeholder">
                    <i class="fas fa-cogs"></i>
                    <h3>${page} পেজ ডেভেলপমেন্ট চলছে</h3>
                    <p>এই ফিচারটি শীঘ্রই আসছে</p>
                </div>
            `;
        }
    }

    renderDashboard(container) {
        // Dashboard is already rendered, just update stats
        this.updateLiveStats();
    }

    renderUsers(container) {
        container.innerHTML = `
            <div class="page-header">
                <h2>ইউজার ম্যানেজমেন্ট</h2>
                <button class="btn-primary" onclick="admin.addUser()">
                    <i class="fas fa-user-plus"></i>
                    নতুন ইউজার
                </button>
            </div>
            <div class="table-container">
                <div class="table-responsive">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>ইউজার আইডি</th>
                                <th>নাম</th>
                                <th>ইমেইল</th>
                                <th>স্ট্যাটাস</th>
                                <th>ব্যালেন্স</th>
                                <th>একশন</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#USR001</td>
                                <td>রহিম আহমেদ</td>
                                <td>rahim@email.com</td>
                                <td><span class="status-badge online">একটিভ</span></td>
                                <td>₳ ৫,০০০</td>
                                <td>
                                    <button class="btn-sm btn-primary">এডিট</button>
                                    <button class="btn-sm btn-danger">সাসপেন্ড</button>
                                </td>
                            </tr>
                            <tr>
                                <td>#USR002</td>
                                <td>করিম উদ্দিন</td>
                                <td>karim@email.com</td>
                                <td><span class="status-badge warning">পেন্ডিং</span></td>
                                <td>₳ ২,০০০</td>
                                <td>
                                    <button class="btn-sm btn-primary">এডিট</button>
                                    <button class="btn-sm btn-success">ভেরিফাই</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    renderGames(container) {
        container.innerHTML = `
            <div class="page-header">
                <h2>গেমস ম্যানেজমেন্ট</h2>
                <button class="btn-primary" onclick="admin.addGame()">
                    <i class="fas fa-plus"></i>
                    নতুন গেম
                </button>
            </div>
            <div class="games-management">
                <div class="games-grid">
                    <div class="game-management-card">
                        <div class="game-header">
                            <div class="game-avatar" style="background: linear-gradient(135deg, #ff6b35, #e55a2b);">
                                <i class="fas fa-dragon"></i>
                            </div>
                            <div class="game-info">
                                <h4>আন্ডারড্রাগন</h4>
                                <p>Evolution Gaming</p>
                            </div>
                            <div class="game-status online">একটিভ</div>
                        </div>
                        <div class="game-stats">
                            <div class="stat">
                                <span>রেভেনিউ</span>
                                <strong>₳ ১,২৩,৪৫৬</strong>
                            </div>
                            <div class="stat">
                                <span>প্লেয়ার</span>
                                <strong>২,৩৪৫</strong>
                            </div>
                        </div>
                        <div class="game-actions">
                            <button class="btn-sm btn-primary">এডিট</button>
                            <button class="btn-sm btn-warning">ডিসেবল</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderTransactions(container) {
        container.innerHTML = `
            <div class="page-header">
                <h2>ট্রানজ্যাকশন ম্যানেজমেন্ট</h2>
                <div class="page-actions">
                    <button class="btn-outline">
                        <i class="fas fa-download"></i>
                        এক্সপোর্ট
                    </button>
                    <button class="btn-primary">
                        <i class="fas fa-filter"></i>
                        ফিল্টার
                    </button>
                </div>
            </div>
            <div class="transactions-content">
                <div class="filters-row">
                    <select class="filter-select">
                        <option>সব ট্রানজ্যাকশন</option>
                        <option>ডিপোজিট</option>
                        <option>উইথড্র</option>
                        <option>বোনাস</option>
                    </select>
                    <input type="date" class="date-filter">
                    <input type="date" class="date-filter">
                </div>
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>ট্রানজ্যাকশন আইডি</th>
                                <th>ইউজার</th>
                                <th>টাইপ</th>
                                <th>অ্যামাউন্ট</th>
                                <th>স্ট্যাটাস</th>
                                <th>তারিখ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#TXN001</td>
                                <td>রহিম আহমেদ</td>
                                <td><span class="type-deposit">ডিপোজিট</span></td>
                                <td>₳ ৫,০০০</td>
                                <td><span class="status-badge success">সাকসেস</span></td>
                                <td>২০২৪-০১-১৫</td>
                            </tr>
                            <tr>
                                <td>#TXN002</td>
                                <td>করিম উদ্দিন</td>
                                <td><span class="type-withdrawal">উইথড্র</span></td>
                                <td>₳ ২,০০০</td>
                                <td><span class="status-badge warning">পেন্ডিং</span></td>
                                <td>২০২৪-০১-১৫</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    renderLiveCasino(container) {
        container.innerHTML = `
            <div class="page-header">
                <h2>লাইভ ক্যাসিনো ম্যানেজমেন্ট</h2>
                <button class="btn-primary">
                    <i class="fas fa-plus"></i>
                    নতুন টেবিল
                </button>
            </div>
            <div class="live-casino-management">
                <p>লাইভ ক্যাসিনো ম্যানেজমেন্ট ইন্টারফেস</p>
            </div>
        `;
    }

    renderSlots(container) {
        container.innerHTML = `
            <div class="page-header">
                <h2>স্লট গেমস ম্যানেজমেন্ট</h2>
                <button class="btn-primary">
                    <i class="fas fa-plus"></i>
                    নতুন স্লট
                </button>
            </div>
            <div class="slots-management">
                <p>স্লট গেমস ম্যানেজমেন্ট ইন্টারফেস</p>
            </div>
        `;
    }

    renderSports(container) {
        container.innerHTML = `
            <div class="page-header">
                <h2>স্পোর্টস বেটিং ম্যানেজমেন্ট</h2>
                <button class="btn-primary">
                    <i class="fas fa-plus"></i>
                    নতুন ম্যাচ
                </button>
            </div>
            <div class="sports-management">
                <p>স্পোর্টস বেটিং ম্যানেজমেন্ট ইন্টারফেস</p>
            </div>
        `;
    }

    renderTournaments(container) {
        container.innerHTML = `
            <div class="page-header">
                <h2>টুর্নামেন্ট ম্যানেজমেন্ট</h2>
                <button class="btn-primary">
                    <i class="fas fa-plus"></i>
                    নতুন টুর্নামেন্ট
                </button>
            </div>
            <div class="tournaments-management">
                <p>টুর্নামেন্ট ম্যানেজমেন্ট ইন্টারফেস</p>
            </div>
        `;
    }

    renderDeposits(container) {
        container.innerHTML = `
            <div class="page-header">
                <h2>ডিপোজিট ম্যানেজমেন্ট</h2>
            </div>
            <div class="deposits-management">
                <p>ডিপোজিট ম্যানেজমেন্ট ইন্টারফেস</p>
            </div>
        `;
    }

    renderWithdrawals(container) {
        container.innerHTML = `
            <div class="page-header">
                <h2>উইথড্র ম্যানেজমেন্ট</h2>
            </div>
            <div class="withdrawals-management">
                <p>উইথড্র ম্যানেজমেন্ট ইন্টারফেস</p>
            </div>
        `;
    }

    renderBonuses(container) {
        container.innerHTML = `
            <div class="page-header">
                <h2>বোনাস ম্যানেজমেন্ট</h2>
                <button class="btn-primary">
                    <i class="fas fa-plus"></i>
                    নতুন বোনাস
                </button>
            </div>
            <div class="bonuses-management">
                <p>বোনাস ম্যানেজমেন্ট ইন্টারফেস</p>
            </div>
        `;
    }

    renderReports(container) {
        container.innerHTML = `
            <div class="page-header">
                <h2>রিপোর্টস ও অ্যানালিটিক্স</h2>
            </div>
            <div class="reports-management">
                <p>রিপোর্টস ও অ্যানালিটিক্স ইন্টারফেস</p>
            </div>
        `;
    }

    renderSettings(container) {
        container.innerHTML = `
            <div class="page-header">
                <h2>সিস্টেম সেটিংস</h2>
            </div>
            <div class="settings-management">
                <p>সিস্টেম সেটিংস ইন্টারফেস</p>
            </div>
        `;
    }

    renderSecurity(container) {
        container.innerHTML = `
            <div class="page-header">
                <h2>সিকিউরিটি সেটিংস</h2>
            </div>
            <div class="security-management">
                <p>সিকিউরিটি সেটিংস ইন্টারফেস</p>
            </div>
        `;
    }

    renderLogs(container) {
        container.innerHTML = `
            <div class="page-header">
                <h2>সিস্টেম লগ</h2>
            </div>
            <div class="logs-management">
                <p>সিস্টেম লগ ভিউয়ার</p>
            </div>
        `;
    }

    // Live Data Updates
    updateLiveStats() {
        // Simulate live data updates
        setInterval(() => {
            this.updateRandomStats();
        }, 5000);
    }

    updateRandomStats() {
        const stats = document.querySelectorAll('.stat-info h3');
        stats.forEach(stat => {
            const current = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
            const change = Math.floor(Math.random() * 100) - 45;
            const newValue = Math.max(0, current + change);
            
            if (stat.textContent.includes('₳')) {
                stat.textContent = `₳ ${newValue.toLocaleString()}`;
            } else {
                stat.textContent = newValue.toLocaleString();
            }
        });
    }

    // Action Methods
    addUser() {
        this.showModal('userModal', 'নতুন ইউজার যোগ করুন');
    }

    addGame() {
        this.showModal('gameModal', 'নতুন গেম যোগ করুন');
    }

    processWithdrawal() {
        this.showModal('withdrawalModal', 'উইথড্র প্রসেস করুন');
    }

    sendNotification() {
        this.showModal('notificationModal', 'নোটিফিকেশন পাঠান');
    }

    handleQuickAction(action) {
        switch(action) {
            case 'ইউজার যোগ করুন':
                this.addUser();
                break;
            case 'গেম যোগ করুন':
                this.addGame();
                break;
            case 'উইথড্র প্রসেস করুন':
                this.processWithdrawal();
                break;
            case 'নোটিফিকেশন পাঠান':
                this.sendNotification();
                break;
            default:
                console.log('Unknown action:', action);
        }
    }

    performSearch(query) {
        if (query.length < 2) return;
        
        console.log('Searching for:', query);
        // Implement search functionality
    }

    showModal(modalId, title) {
        // In a real implementation, this would show specific modals
        alert(`${title} - এই ফিচারটি শীঘ্রই আসছে`);
    }

    closeModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }

    logout() {
        if (confirm('আপনি কি লগআউট করতে চান?')) {
            // Perform logout logic
            window.location.href = 'index.html';
        }
    }

    // System Methods
    exportData(type) {
        console.log(`Exporting ${type} data...`);
        // Implement export functionality
    }

    generateReport(reportType) {
        console.log(`Generating ${reportType} report...`);
        // Implement report generation
    }

    backupSystem() {
        console.log('Creating system backup...');
        // Implement backup functionality
    }
}

// Additional CSS for admin pages
const adminStyles = `
    .loading-state {
        text-align: center;
        padding: 50px;
        color: var(--gray);
    }
    
    .loading-state i {
        font-size: 2rem;
        margin-bottom: 15px;
    }
    
    .page-placeholder {
        text-align: center;
        padding: 80px 20px;
        color: var(--gray);
    }
    
    .page-placeholder i {
        font-size: 3rem;
        margin-bottom: 20px;
        color: var(--primary);
    }
    
    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        padding-bottom: 15px;
        border-bottom: 1px solid var(--gray-light);
    }
    
    .page-header h2 {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--secondary);
    }
    
    .btn-primary, .btn-outline, .btn-sm {
        padding: 10px 20px;
        border: none;
        border-radius: var(--border-radius);
        cursor: pointer;
        font-weight: 500;
        transition: var(--transition);
        display: inline-flex;
        align-items: center;
        gap: 8px;
    }
    
    .btn-primary {
        background: var(--primary);
        color: white;
    }
    
    .btn-primary:hover {
        background: var(--primary-dark);
    }
    
    .btn-outline {
        background: transparent;
        border: 1px solid var(--gray-light);
        color: var(--secondary);
    }
    
    .btn-outline:hover {
        background: var(--gray-lighter);
    }
    
    .btn-sm {
        padding: 6px 12px;
        font-size: 0.8rem;
    }
    
    .btn-danger {
        background: var(--danger);
        color: white;
    }
    
    .btn-warning {
        background: var(--warning);
        color: var(--dark);
    }
    
    .btn-success {
        background: var(--success);
        color: white;
    }
    
    .table-container {
        background: white;
        border-radius: var(--border-radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow);
    }
    
    .data-table {
        width: 100%;
        border-collapse: collapse;
    }
    
    .data-table th,
    .data-table td {
        padding: 15px;
        text-align: left;
        border-bottom: 1px solid var(--gray-lighter);
    }
    
    .data-table th {
        background: var(--gray-lighter);
        font-weight: 600;
        color: var(--secondary);
        font-size: 0.9rem;
    }
    
    .type-deposit {
        color: var(--success);
        font-weight: 600;
    }
    
    .type-withdrawal {
        color: var(--danger);
        font-weight: 600;
    }
    
    .game-management-card {
        background: white;
        border-radius: var(--border-radius);
        padding: 20px;
        box-shadow: var(--shadow);
        margin-bottom: 15px;
    }
    
    .game-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 15px;
    }
    
    .game-status {
        margin-left: auto;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 0.7rem;
        font-weight: 600;
    }
    
    .game-status.online {
        background: var(--success-light);
        color: var(--success);
    }
    
    .game-stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin-bottom: 15px;
    }
    
    .stat {
        text-align: center;
    }
    
    .stat span {
        display: block;
        font-size: 0.8rem;
        color: var(--gray);
        margin-bottom: 5px;
    }
    
    .stat strong {
        font-size: 1.1rem;
        color: var(--secondary);
    }
    
    .game-actions {
        display: flex;
        gap: 10px;
    }
    
    .filters-row {
        display: flex;
        gap: 15px;
        margin-bottom: 20px;
        align-items: center;
    }
    
    .filter-select, .date-filter {
        padding: 8px 12px;
        border: 1px solid var(--gray-light);
        border-radius: var(--border-radius);
        background: white;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = adminStyles;
document.head.appendChild(styleSheet);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.admin = new XGamingAdmin();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = XGamingAdmin;
}
