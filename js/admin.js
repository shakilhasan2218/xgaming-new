// Complete Casino Master Admin Panel
class CasinoMasterAdmin {
    constructor() {
        this.data = this.loadData();
        this.currentSection = 'dashboard';
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.currentAdmin = {
            id: 1,
            username: 'superadmin',
            email: 'super@xgaming.com',
            role: 'master',
            permissions: ['all'],
            lastLogin: new Date().toISOString()
        };
        this.init();
    }

    loadData() {
        const saved = localStorage.getItem('casino-master-data');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // Initial master data structure
        return {
            // Admin Management
            admins: [
                {
                    id: 1,
                    username: 'superadmin',
                    email: 'super@xgaming.com',
                    role: 'master',
                    permissions: ['all'],
                    status: 'active',
                    created: '2024-01-01',
                    lastLogin: new Date().toISOString()
                },
                {
                    id: 2,
                    username: 'admin1',
                    email: 'admin1@xgaming.com',
                    role: 'super',
                    permissions: ['user_manage', 'financial_manage', 'game_manage'],
                    status: 'active',
                    created: '2024-01-05',
                    lastLogin: new Date().toISOString()
                },
                {
                    id: 3,
                    username: 'affiliate1',
                    email: 'affiliate@xgaming.com',
                    role: 'affiliate',
                    permissions: ['user_manage'],
                    status: 'active',
                    created: '2024-01-10',
                    lastLogin: new Date().toISOString()
                }
            ],

            // User Management
            users: [
                {
                    id: 1,
                    username: "vip_player",
                    email: "vip@email.com",
                    phone: "+8801712345678",
                    balance: 150000,
                    level: "vip",
                    status: "active",
                    registered: "2024-01-15",
                    lastLogin: "2024-01-20 14:30:00",
                    totalDeposits: 500000,
                    totalWithdrawals: 350000,
                    affiliateCode: "VIP1001",
                    referredBy: null,
                    kycStatus: "verified"
                },
                {
                    id: 2,
                    username: "casino_king",
                    email: "king@email.com",
                    phone: "+8801812345678",
                    balance: 75000,
                    level: "premium",
                    status: "active",
                    registered: "2024-01-10",
                    lastLogin: "2024-01-20 15:45:00",
                    totalDeposits: 200000,
                    totalWithdrawals: 125000,
                    affiliateCode: "KING2002",
                    referredBy: "VIP1001",
                    kycStatus: "pending"
                },
                {
                    id: 3,
                    username: "pro_gamer",
                    email: "pro@email.com",
                    phone: "+8801912345678",
                    balance: 25000,
                    level: "standard",
                    status: "active",
                    registered: "2024-01-12",
                    lastLogin: "2024-01-20 16:20:00",
                    totalDeposits: 80000,
                    totalWithdrawals: 55000,
                    affiliateCode: "PRO3003",
                    referredBy: "KING2002",
                    kycStatus: "verified"
                }
            ],

            // Agents System
            agents: [
                {
                    id: 1,
                    username: 'agent_dhaka',
                    email: 'agent@dhaka.com',
                    commissionRate: 15,
                    totalPlayers: 45,
                    totalCommission: 125000,
                    status: 'active'
                }
            ],

            // Affiliates System
            affiliates: [
                {
                    id: 1,
                    username: 'affiliate_bd',
                    email: 'affiliate@bd.com',
                    commissionRate: 25,
                    totalReferrals: 120,
                    totalCommission: 350000,
                    status: 'active'
                }
            ],

            // Transactions
            transactions: [
                {
                    id: 1,
                    userId: 1,
                    username: "vip_player",
                    type: "deposit",
                    amount: 50000,
                    status: "completed",
                    date: "2024-01-20 14:30:00",
                    method: "Bank Transfer",
                    transactionId: "TXN001",
                    adminApproved: "superadmin"
                },
                {
                    id: 2,
                    userId: 2,
                    username: "casino_king",
                    type: "withdrawal",
                    amount: 25000,
                    status: "pending",
                    date: "2024-01-20 15:45:00",
                    method: "bKash",
                    transactionId: "TXN002",
                    adminApproved: null
                },
                {
                    id: 3,
                    userId: 3,
                    username: "pro_gamer",
                    type: "bonus",
                    amount: 5000,
                    status: "completed",
                    date: "2024-01-20 16:20:00",
                    method: "Welcome Bonus",
                    transactionId: "TXN003",
                    adminApproved: "admin1"
                }
            ],

            // Games Management
            games: [
                {
                    id: 1,
                    name: "লাইভ বাকারা",
                    type: "live-casino",
                    provider: "Evolution Gaming",
                    status: "active",
                    players: 1234,
                    revenue: 250000,
                    rtp: 97.2,
                    volatility: "medium",
                    featured: true
                },
                {
                    id: 2,
                    name: "সুইট বোনানজা",
                    type: "slot",
                    provider: "Pragmatic Play",
                    status: "active",
                    players: 2458,
                    revenue: 180000,
                    rtp: 96.5,
                    volatility: "high",
                    featured: true
                },
                {
                    id: 3,
                    name: "মেগা ফিশিং",
                    type: "fishing",
                    provider: "PG Soft",
                    status: "maintenance",
                    players: 876,
                    revenue: 95000,
                    rtp: 95.8,
                    volatility: "low",
                    featured: false
                }
            ],

            // Game Providers
            providers: [
                {
                    id: 1,
                    name: "Pragmatic Play",
                    gamesCount: 45,
                    status: "active",
                    revenueShare: 65
                },
                {
                    id: 2,
                    name: "Evolution Gaming",
                    gamesCount: 28,
                    status: "active",
                    revenueShare: 70
                }
            ],

            // Bonus System
            bonuses: [
                {
                    id: 1,
                    name: "Welcome Bonus",
                    type: "deposit",
                    amount: "100%",
                    maxAmount: 10000,
                    minDeposit: 500,
                    wagering: 30,
                    status: "active",
                    created: "2024-01-01"
                },
                {
                    id: 2,
                    name: "Weekly Cashback",
                    type: "cashback",
                    amount: "15%",
                    maxAmount: 5000,
                    minDeposit: 0,
                    wagering: 1,
                    status: "active",
                    created: "2024-01-05"
                }
            ],

            // System Statistics
            stats: {
                totalRevenue: 1250000,
                totalUsers: 1560,
                totalDeposits: 850000,
                totalWithdrawals: 525000,
                activeGames: 28,
                pendingWithdrawals: 75000,
                systemUptime: 99.9,
                today: {
                    revenue: 45000,
                    newUsers: 23,
                    deposits: 125000,
                    withdrawals: 85000,
                    activeUsers: 456
                },
                revenueBreakdown: {
                    slots: 650000,
                    liveCasino: 450000,
                    sports: 150000
                }
            },

            // Activities & Notifications
            activities: [
                {
                    id: 1,
                    type: "user_registration",
                    message: "নতুন ভিআইপি ইউজার রেজিস্টার্ড: vip_player",
                    time: "2024-01-20 14:25:00",
                    admin: "system"
                },
                {
                    id: 2,
                    type: "deposit",
                    message: "বড় ডিপোজিট: vip_player - ₳50,000",
                    time: "2024-01-20 14:30:00",
                    admin: "system"
                },
                {
                    id: 3,
                    type: "withdrawal",
                    message: "উইথড্র রিকুয়েস্ট: casino_king - ₳25,000",
                    time: "2024-01-20 15:45:00",
                    admin: "system"
                },
                {
                    id: 4,
                    type: "bonus",
                    message: "বোনাস ক্রিয়েটেড: pro_gamer - ₳5,000",
                    time: "2024-01-20 16:20:00",
                    admin: "admin1"
                }
            ],

            notifications: [
                {
                    id: 1,
                    type: "warning",
                    title: "উইথড্র পেন্ডিং",
                    message: "25টি উইথড্র রিকুয়েস্ট পেন্ডিং আছে",
                    time: "2024-01-20 15:00:00",
                    read: false
                },
                {
                    id: 2,
                    type: "info",
                    title: "নতুন ইউজার",
                    message: "আজ 23টি নতুন ইউজার রেজিস্টার হয়েছে",
                    time: "2024-01-20 14:00:00",
                    read: false
                },
                {
                    id: 3,
                    type: "success",
                    title: "হাই রেভিনিউ",
                    message: "আজকের রেভিনিউ ₳45,000 অতিক্রম করেছে",
                    time: "2024-01-20 16:00:00",
                    read: true
                }
            ],

            // System Settings
            settings: {
                siteName: "XGaming Casino",
                currency: "BDT",
                minDeposit: 500,
                maxDeposit: 100000,
                minWithdrawal: 1000,
                maxWithdrawal: 50000,
                maintenance: false,
                registration: true,
                depositBonus: true
            }
        };
    }

    saveData() {
        localStorage.setItem('casino-master-data', JSON.stringify(this.data));
    }

    init() {
        this.updateLiveTime();
        this.showSection('dashboard');
        this.updateDashboard();
        this.loadUsersTable();
        this.loadRecentActivities();
        this.loadNotifications();
        this.updateAdminInfo();
        
        // Update live time every second
        setInterval(() => this.updateLiveTime(), 1000);
        
        // Update dashboard every 30 seconds
        setInterval(() => this.updateDashboard(), 30000);

        console.log('🎰 Casino Master Admin Panel Initialized');
    }

    // Live Time Update
    updateLiveTime() {
        const now = new Date();
        const timeString = now.toLocaleString('bn-BD', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        
        const timeElement = document.getElementById('live-time');
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }

    // Admin Role Management
    updateAdminInfo() {
        document.getElementById('current-admin-name').textContent = this.currentAdmin.username;
        document.getElementById('current-admin-role').textContent = this.getRoleName(this.currentAdmin.role);
        
        const badge = document.getElementById('admin-level-badge');
        if (badge) {
            badge.innerHTML = `<i class="fas ${this.getRoleIcon(this.currentAdmin.role)}"></i><span>${this.getRoleName(this.currentAdmin.role).toUpperCase()}</span>`;
        }
    }

    getRoleName(role) {
        const roles = {
            'master': 'মাস্টার এডমিন',
            'super': 'সুপার এডমিন',
            'affiliate': 'অ্যাফিলিয়েট ম্যানেজার',
            'support': 'সাপোর্ট এজেন্ট'
        };
        return roles[role] || 'এডমিন';
    }

    getRoleIcon(role) {
        const icons = {
            'master': 'fa-crown',
            'super': 'fa-user-shield',
            'affiliate': 'fa-users',
            'support': 'fa-headset'
        };
        return icons[role] || 'fa-user';
    }

    switchAdminRole(role) {
        this.currentAdmin.role = role;
        this.updateAdminInfo();
        this.showNotification(`এডমিন রোল switched to ${this.getRoleName(role)}`, 'info');
    }

    // Section Management
    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.admin-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Activate corresponding menu item
        const menuItem = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
        if (menuItem) {
            menuItem.classList.add('active');
        }
        
        this.currentSection = sectionId;
        
        // Load section-specific data
        this.loadSectionData(sectionId);
    }

    loadSectionData(sectionId) {
        switch(sectionId) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'users':
                this.loadUsersTable();
                break;
            case 'transactions':
                this.loadTransactionsTable();
                break;
            case 'admin-management':
                this.loadAdminsTable();
                break;
        }
    }

    // Dashboard Functions
    updateDashboard() {
        const stats = this.data.stats;
        const today = stats.today;
        
        // Update quick stats
        document.getElementById('total-active-users').textContent = today.activeUsers.toLocaleString();
        document.getElementById('total-active-games').textContent = stats.activeGames.toLocaleString();
        document.getElementById('total-revenue-today').textContent = `₳ ${today.revenue.toLocaleString()}`;
        document.getElementById('total-admins').textContent = this.data.admins.filter(a => a.status === 'active').length;
        
        // Update main stats
        document.getElementById('total-revenue').textContent = `₳ ${stats.totalRevenue.toLocaleString()}`;
        document.getElementById('total-users').textContent = stats.totalUsers.toLocaleString();
        document.getElementById('total-deposits').textContent = `₳ ${stats.totalDeposits.toLocaleString()}`;
        
        // Update revenue breakdown
        document.getElementById('slot-revenue').textContent = `₳ ${stats.revenueBreakdown.slots.toLocaleString()}`;
        document.getElementById('live-revenue').textContent = `₳ ${stats.revenueBreakdown.liveCasino.toLocaleString()}`;
        document.getElementById('sports-revenue').textContent = `₳ ${stats.revenueBreakdown.sports.toLocaleString()}`;
        
        // Update user breakdown
        document.getElementById('new-users-today').textContent = today.newUsers.toLocaleString();
        document.getElementById('active-users-now').textContent = today.activeUsers.toLocaleString();
        document.getElementById('vip-users').textContent = this.data.users.filter(u => u.level === 'vip').length.toLocaleString();
        
        // Update financial breakdown
        document.getElementById('today-deposits').textContent = `₳ ${today.deposits.toLocaleString()}`;
        document.getElementById('today-withdrawals').textContent = `₳ ${today.withdrawals.toLocaleString()}`;
        document.getElementById('total-balance').textContent = `₳ ${this.data.users.reduce((sum, user) => sum + user.balance, 0).toLocaleString()}`;
        
        // Update menu badges
        document.getElementById('users-count').textContent = stats.totalUsers.toLocaleString();
        document.getElementById('pending-deposits').textContent = this.data.transactions.filter(t => t.type === 'deposit' && t.status === 'pending').length;
        document.getElementById('pending-withdrawals').textContent = this.data.transactions.filter(t => t.type === 'withdrawal' && t.status === 'pending').length;
    }

    loadRecentActivities() {
        const activityList = document.getElementById('activity-list');
        if (!activityList) return;

        let html = '';
        this.data.activities.slice(0, 10).forEach(activity => {
            html += `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="fas ${this.getActivityIcon(activity.type)}"></i>
                    </div>
                    <div class="activity-content">
                        <p>${activity.message}</p>
                        <small>${activity.time} • ${activity.admin}</small>
                    </div>
                </div>
            `;
        });

        activityList.innerHTML = html || '<p>কোন এক্টিভিটি নেই</p>';
    }

    getActivityIcon(type) {
        const icons = {
            'user_registration': 'fa-user-plus',
            'deposit': 'fa-wallet',
            'withdrawal': 'fa-money-check',
            'bonus': 'fa-gift',
            'game_play': 'fa-gamepad',
            'system': 'fa-cog'
        };
        return icons[type] || 'fa-bell';
    }

    // User Management
    loadUsersTable() {
        const tbody = document.getElementById('users-table-body');
        if (!tbody) return;

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const paginatedUsers = this.data.users.slice(startIndex, startIndex + this.itemsPerPage);

        let html = '';
        paginatedUsers.forEach(user => {
            html += `
                <tr>
                    <td><input type="checkbox" class="user-checkbox" value="${user.id}"></td>
                    <td>#${user.id}</td>
                    <td>
                        <div class="user-info">
                            <strong>${user.username}</strong>
                            <small>${user.email}</small>
                        </div>
                    </td>
                    <td><strong>₳ ${user.balance.toLocaleString()}</strong></td>
                    <td>
                        <span class="status-badge ${user.level}">${user.level}</span>
                    </td>
                    <td>
                        <span class="status-badge ${user.status}">${user.status}</span>
                    </td>
                    <td>${user.registered}</td>
                    <td>${user.lastLogin}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-sm btn-primary" onclick="admin.editUser(${user.id})" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-sm btn-secondary" onclick="admin.viewUserDetails(${user.id})" title="View">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-sm btn-warning" onclick="admin.manageUserBalance(${user.id})" title="Balance">
                                <i class="fas fa-coins"></i>
                            </button>
                            <button class="btn-sm btn-danger" onclick="admin.toggleUserStatus(${user.id})" title="${user.status === 'active' ? 'Suspend' : 'Activate'}">
                                <i class="fas ${user.status === 'active' ? 'fa-lock' : 'fa-unlock'}"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = html || '<tr><td colspan="9">কোন ইউজার নেই</td></tr>';
        this.updatePagination();
    }

    // Pagination
    updatePagination() {
        const totalPages = Math.ceil(this.data.users.length / this.itemsPerPage);
        document.getElementById('page-info').textContent = `Page ${this.currentPage} of ${totalPages}`;
    }

    nextPage() {
        const totalPages = Math.ceil(this.data.users.length / this.itemsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.loadUsersTable();
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.loadUsersTable();
        }
    }

    // User Management Functions
    showUserModal() {
        document.getElementById('userModal').style.display = 'block';
    }

    closeUserModal() {
        document.getElementById('userModal').style.display = 'none';
        document.getElementById('userForm').reset();
    }

    createUser(userData) {
        const newUser = {
            id: Date.now(),
            username: userData.username,
            email: userData.email,
            phone: userData.phone || '',
            balance: parseInt(userData.initialBalance) || 0,
            level: userData.userLevel || 'standard',
            status: "active",
            registered: new Date().toISOString().split('T')[0],
            lastLogin: new Date().toISOString().split('T')[0],
            totalDeposits: 0,
            totalWithdrawals: 0,
            affiliateCode: userData.affiliateCode || `USER${Date.now()}`,
            referredBy: null,
            kycStatus: "pending"
        };

        this.data.users.unshift(newUser);
        this.data.stats.totalUsers++;
        this.data.stats.today.newUsers++;
        
        // Add activity
        this.addActivity('user_registration', `নতুন ইউজার রেজিস্টার্ড: ${newUser.username}`, 'system');
        
        this.saveData();
        this.loadUsersTable();
        this.updateDashboard();
        this.closeUserModal();
        
        this.showNotification(`ইউজার ${newUser.username} সফলভাবে তৈরি হয়েছে!`, 'success');
    }

    editUser(userId) {
        const user = this.data.users.find(u => u.id === userId);
        if (user) {
            // In a real app, you'd show an edit modal
            this.showNotification(`ইউজার এডিট: ${user.username}`, 'info');
        }
    }

    viewUserDetails(userId) {
        const user = this.data.users.find(u => u.id === userId);
        if (user) {
            const details = `
ইউজার আইডি: #${user.id}
ইউজারনেম: ${user.username}
ইমেইল: ${user.email}
ব্যালেন্স: ₳${user.balance.toLocaleString()}
লেভেল: ${user.level}
স্ট্যাটাস: ${user.status}
রেজিস্টার ডেট: ${user.registered}
টোটাল ডিপোজিট: ₳${user.totalDeposits.toLocaleString()}
টোটাল উইথড্র: ₳${user.totalWithdrawals.toLocaleString()}
KYC স্ট্যাটাস: ${user.kycStatus}
            `.trim();
            
            alert(details);
        }
    }

    manageUserBalance(userId) {
        const user = this.data.users.find(u => u.id === userId);
        if (user) {
            const action = prompt(`ব্যালেন্স ম্যানেজমেন্ট: ${user.username}\n\n1. ডিপোজিট\n2. উইথড্র\n3. বোনাস\n\nনম্বর দিন:`);
            const amount = prompt('অ্যামাউন্ট দিন:');
            
            if (action && amount) {
                const parsedAmount = parseInt(amount);
                if (parsedAmount > 0) {
                    switch(action) {
                        case '1': // Deposit
                            user.balance += parsedAmount;
                            user.totalDeposits += parsedAmount;
                            this.addTransaction(user.id, user.username, 'deposit', parsedAmount, 'completed', 'Manual');
                            this.showNotification(`₳${parsedAmount.toLocaleString()} ডিপোজিট করা হয়েছে`, 'success');
                            break;
                        case '2': // Withdrawal
                            if (user.balance >= parsedAmount) {
                                user.balance -= parsedAmount;
                                user.totalWithdrawals += parsedAmount;
                                this.addTransaction(user.id, user.username, 'withdrawal', parsedAmount, 'pending', 'Manual');
                                this.showNotification(`₳${parsedAmount.toLocaleString()} উইথড্র রিকুয়েস্ট তৈরি হয়েছে`, 'warning');
                            } else {
                                this.showNotification('পর্যাপ্ত ব্যালেন্স নেই!', 'error');
                            }
                            break;
                        case '3': // Bonus
                            user.balance += parsedAmount;
                            this.addTransaction(user.id, user.username, 'bonus', parsedAmount, 'completed', 'Bonus');
                            this.showNotification(`₳${parsedAmount.toLocaleString()} বোনাস দেওয়া হয়েছে`, 'success');
                            break;
                    }
                    this.saveData();
                    this.loadUsersTable();
                    this.updateDashboard();
                }
            }
        }
    }

    toggleUserStatus(userId) {
        const user = this.data.users.find(u => u.id === userId);
        if (user) {
            user.status = user.status === 'active' ? 'suspended' : 'active';
            this.saveData();
            this.loadUsersTable();
            
            this.showNotification(
                `ইউজার ${user.username} ${user.status === 'active' ? 'এক্টিভ' : 'সাসপেন্ড'} হয়েছে`, 
                user.status === 'active' ? 'success' : 'warning'
            );
        }
    }

    // Transaction Management
    addTransaction(userId, username, type, amount, status, method) {
        const newTransaction = {
            id: Date.now(),
            userId: userId,
            username: username,
            type: type,
            amount: amount,
            status: status,
            date: new Date().toLocaleString('bn-BD'),
            method: method,
            transactionId: `TXN${Date.now()}`,
            adminApproved: this.currentAdmin.username
        };
        
        this.data.transactions.unshift(newTransaction);
        
        // Update stats based on transaction type
        if (type === 'deposit' && status === 'completed') {
            this.data.stats.totalDeposits += amount;
            this.data.stats.today.deposits += amount;
        } else if (type === 'withdrawal') {
            this.data.stats.totalWithdrawals += amount;
            this.data.stats.today.withdrawals += amount;
            if (status === 'pending') {
                this.data.stats.pendingWithdrawals += amount;
            }
        }
    }

    // Manual Operations
    manualDeposit() {
        const username = prompt('ইউজারনেম দিন:');
        const amount = prompt('অ্যামাউন্ট দিন:');
        
        if (username && amount) {
            const user = this.data.users.find(u => u.username === username);
            if (user) {
                const depositAmount = parseInt(amount);
                user.balance += depositAmount;
                user.totalDeposits += depositAmount;
                
                this.addTransaction(user.id, user.username, 'deposit', depositAmount, 'completed', 'Manual');
                this.addActivity('deposit', `ম্যানুয়াল ডিপোজিট: ${user.username} - ₳${depositAmount.toLocaleString()}`, this.currentAdmin.username);
                
                this.saveData();
                this.updateDashboard();
                
                this.showNotification(`₳${depositAmount.toLocaleString()} ডিপোজিট সফল!`, 'success');
            } else {
                this.showNotification('ইউজার খুঁজে পাওয়া যায়নি!', 'error');
            }
        }
    }

    manualWithdrawal() {
        const username = prompt('ইউজারনেম দিন:');
        const amount = prompt('অ্যামাউন্ট দিন:');
        
        if (username && amount) {
            const user = this.data.users.find(u => u.username === username);
            if (user) {
                const withdrawalAmount = parseInt(amount);
                if (user.balance >= withdrawalAmount) {
                    user.balance -= withdrawalAmount;
                    user.totalWithdrawals += withdrawalAmount;
                    
                    this.addTransaction(user.id, user.username, 'withdrawal', withdrawalAmount, 'pending', 'Manual');
                    this.addActivity('withdrawal', `উইথড্র রিকুয়েস্ট: ${user.username} - ₳${withdrawalAmount.toLocaleString()}`, this.currentAdmin.username);
                    
                    this.saveData();
                    this.updateDashboard();
                    
                    this.showNotification('উইথড্র রিকুয়েস্ট সাবমিট হয়েছে!', 'success');
                } else {
                    this.showNotification('পর্যাপ্ত ব্যালেন্স নেই!', 'error');
                }
            } else {
                this.showNotification('ইউজার খুঁজে পাওয়া যায়নি!', 'error');
            }
        }
    }

    // Game Management
    addNewGame() {
        const gameName = prompt('গেমের নাম দিন:');
        const gameType = prompt('গেম টাইপ (slot/live-casino/sports/fishing):');
        
        if (gameName && gameType) {
            const newGame = {
                id: Date.now(),
                name: gameName,
                type: gameType,
                provider: "Manual",
                status: "active",
                players: Math.floor(Math.random() * 1000),
                revenue: 0,
                rtp: 96.0,
                volatility: "medium",
                featured: false
            };
            
            this.data.games.push(newGame);
            this.data.stats.activeGames++;
            this.saveData();
            
            this.showNotification(`নতুন গেম "${gameName}" যোগ করা হয়েছে!`, 'success');
        }
    }

    // Bonus Management
    createBonus() {
        const bonusName = prompt('বোনাসের নাম দিন:');
        const bonusType = prompt('বোনাস টাইপ (deposit/welcome/cashback/free-spins):');
        
        if (bonusName && bonusType) {
            const newBonus = {
                id: Date.now(),
                name: bonusName,
                type: bonusType,
                amount: "100%",
                maxAmount: 10000,
                minDeposit: 500,
                wagering: 30,
                status: "active",
                created: new Date().toISOString().split('T')[0]
            };
            
            this.data.bonuses.push(newBonus);
            this.saveData();
            
            this.showNotification(`নতুন বোনাস "${bonusName}" তৈরি করা হয়েছে!`, 'success');
        }
    }

    // Admin Management
    createAdmin() {
        document.getElementById('adminModal').style.display = 'block';
    }

    closeAdminModal() {
        document.getElementById('adminModal').style.display = 'none';
        document.getElementById('adminForm').reset();
    }

    createNewAdmin(adminData) {
        const newAdmin = {
            id: Date.now(),
            username: adminData.username,
            email: adminData.email,
            role: adminData.role,
            permissions: Array.from(document.querySelectorAll('input[name="permissions"]:checked')).map(cb => cb.value),
            status: "active",
            created: new Date().toISOString().split('T')[0],
            lastLogin: null
        };

        this.data.admins.push(newAdmin);
        this.saveData();
        this.closeAdminModal();
        
        this.showNotification(`এডমিন ${newAdmin.username} তৈরি করা হয়েছে!`, 'success');
    }

    loadAdminsTable() {
        // Implementation for admin management table
        this.showNotification('এডমিন ম্যানেজমেন্ট টেবিল লোড করা হয়েছে', 'info');
    }

    // System Functions
    systemBackup() {
        const backupData = JSON.stringify(this.data, null, 2);
        const blob = new Blob([backupData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `casino-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('সিস্টেম ব্যাকআপ তৈরি করা হয়েছে!', 'success');
    }

    generateReport() {
        const report = {
            generatedAt: new Date().toLocaleString('bn-BD'),
            totalUsers: this.data.stats.totalUsers,
            totalRevenue: this.data.stats.totalRevenue,
            totalDeposits: this.data.stats.totalDeposits,
            totalWithdrawals: this.data.stats.totalWithdrawals,
            activeGames: this.data.stats.activeGames,
            pendingWithdrawals: this.data.stats.pendingWithdrawals,
            activeAdmins: this.data.admins.filter(a => a.status === 'active').length
        };
        
        console.log('📊 Casino Master Report:', report);
        this.showNotification('ডিটেইলড রিপোর্ট কনসোলে জেনারেট হয়েছে!', 'info');
    }

    // Notification System
    loadNotifications() {
        const notificationList = document.getElementById('notification-list');
        const panelList = document.getElementById('notification-panel-list');
        
        if (notificationList) {
            let html = '';
            this.data.notifications.slice(0, 5).forEach(notification => {
                html += `
                    <div class="activity-item">
                        <div class="activity-icon ${notification.type}">
                            <i class="fas ${this.getNotificationIcon(notification.type)}"></i>
                        </div>
                        <div class="activity-content">
                            <p><strong>${notification.title}</strong></p>
                            <p>${notification.message}</p>
                            <small>${notification.time}</small>
                        </div>
                    </div>
                `;
            });
            notificationList.innerHTML = html || '<p>কোন নোটিফিকেশন নেই</p>';
        }
        
        if (panelList) {
            let html = '';
            this.data.notifications.forEach(notification => {
                html += `
                    <div class="activity-item ${notification.read ? 'read' : 'unread'}">
                        <div class="activity-icon ${notification.type}">
                            <i class="fas ${this.getNotificationIcon(notification.type)}"></i>
                        </div>
                        <div class="activity-content">
                            <p><strong>${notification.title}</strong></p>
                            <p>${notification.message}</p>
                            <small>${notification.time}</small>
                        </div>
                    </div>
                `;
            });
            panelList.innerHTML = html || '<p>কোন নোটিফিকেশন নেই</p>';
        }
    }

    getNotificationIcon(type) {
        const icons = {
            'success': 'fa-check-circle',
            'error': 'fa-exclamation-circle',
            'warning': 'fa-exclamation-triangle',
            'info': 'fa-info-circle'
        };
        return icons[type] || 'fa-bell';
    }

    showNotifications() {
        document.getElementById('notificationPanel').classList.add('show');
    }

    hideNotifications() {
        document.getElementById('notificationPanel').classList.remove('show');
    }

    // Utility Functions
    addActivity(type, message, admin = 'system') {
        const newActivity = {
            id: Date.now(),
            type: type,
            message: message,
            time: new Date().toLocaleString('bn-BD'),
            admin: admin
        };
        
        this.data.activities.unshift(newActivity);
        if (this.data.activities.length > 50) {
            this.data.activities = this.data.activities.slice(0, 50);
        }
        
        this.loadRecentActivities();
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 300px;
            animation: slideInRight 0.3s ease;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    getNotificationColor(type) {
        const colors = {
            'success': '#10b981',
            'error': '#ef4444',
            'warning': '#f59e0b',
            'info': '#3b82f6'
        };
        return colors[type] || '#6b7280';
    }

    filterUsers() {
        this.showNotification('ইউজার ফিল্টার প্রয়োগ করা হয়েছে!', 'info');
    }

    exportUsers() {
        const usersData = JSON.stringify(this.data.users, null, 2);
        const blob = new Blob([usersData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('ইউজার ডেটা এক্সপোর্ট করা হয়েছে!', 'success');
    }

    bulkAction() {
        this.showNotification('বাল্ক অ্যাকশন ফিচারটি শীঘ্রই আসছে!', 'info');
    }

    logout() {
        if (confirm('আপনি কি লগআউট করতে চান?')) {
            this.showNotification('সফলভাবে লগআউট হয়েছে!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }
    }
}

// Global functions
let admin;

// Section Management
function showSection(sectionId) {
    if (admin) {
        admin.showSection(sectionId);
    }
}

// User Management
function showUserModal() {
    if (admin) {
        admin.showUserModal();
    }
}

function closeUserModal() {
    if (admin) {
        admin.closeUserModal();
    }
}

// Admin Management
function createAdmin() {
    if (admin) {
        admin.createAdmin();
    }
}

function closeAdminModal() {
    if (admin) {
        admin.closeAdminModal();
    }
}

// Financial Operations
function manualDeposit() {
    if (admin) {
        admin.manualDeposit();
    }
}

function manualWithdrawal() {
    if (admin) {
        admin.manualWithdrawal();
    }
}

// Game & Bonus Management
function addNewGame() {
    if (admin) {
        admin.addNewGame();
    }
}

function createBonus() {
    if (admin) {
        admin.createBonus();
    }
}

// System Operations
function generateReport() {
    if (admin) {
        admin.generateReport();
    }
}

function systemBackup() {
    if (admin) {
        admin.systemBackup();
    }
}

// Admin Role Management
function switchAdminRole(role) {
    if (admin) {
        admin.switchAdminRole(role);
    }
}

// Notification Management
function showNotifications() {
    if (admin) {
        admin.showNotifications();
    }
}

function hideNotifications() {
    if (admin) {
        admin.hideNotifications();
    }
}

// Pagination
function nextPage() {
    if (admin) {
        admin.nextPage();
    }
}

function previousPage() {
    if (admin) {
        admin.previousPage();
    }
}

// Filter & Export
function filterUsers() {
    if (admin) {
        admin.filterUsers();
    }
}

function exportUsers() {
    if (admin) {
        admin.exportUsers();
    }
}

function bulkAction() {
    if (admin) {
        admin.bulkAction();
    }
}

// System
function logout() {
    if (admin) {
        admin.logout();
    }
}

// Form Submissions
document.addEventListener('DOMContentLoaded', function() {
    admin = new CasinoMasterAdmin();
    
    // User form submission
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                initialBalance: document.getElementById('initialBalance').value,
                userLevel: document.getElementById('userLevel').value,
                affiliateCode: document.getElementById('affiliateCode').value
            };
            
            admin.createUser(formData);
        });
    }
    
    // Admin form submission
    const adminForm = document.getElementById('adminForm');
    if (adminForm) {
        adminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                username: document.getElementById('adminUsername').value,
                email: document.getElementById('adminEmail').value,
                role: document.getElementById('adminRole').value
            };
            
            admin.createNewAdmin(formData);
        });
    }
    
    // Select all users checkbox
    const selectAll = document.getElementById('select-all-users');
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.user-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAll.checked;
            });
        });
    }
    
    console.log('🎰 Casino Master Admin Panel Fully Loaded!');
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .activity-icon.success {
        background: #d1fae5;
        color: #10b981;
    }
    
    .activity-icon.error {
        background: #fee2e2;
        color: #ef4444;
    }
    
    .activity-icon.warning {
        background: #fef3c7;
        color: #f59e0b;
    }
    
    .activity-icon.info {
        background: #dbeafe;
        color: #3b82f6;
    }
    
    .read {
        opacity: 0.7;
    }
    
    .unread {
        font-weight: 600;
    }
`;
document.head.appendChild(style);
