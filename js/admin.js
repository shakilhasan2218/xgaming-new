// Casino Admin Panel - Complete Management System
class CasinoAdmin {
    constructor() {
        this.data = this.loadData();
        this.currentSection = 'dashboard';
        this.init();
    }

    loadData() {
        const saved = localStorage.getItem('casino-admin-data');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // Initial casino data
        return {
            users: [
                {
                    id: 1,
                    username: "pro_gamer",
                    email: "pro@email.com",
                    balance: 15000,
                    level: "VIP",
                    status: "active",
                    registered: "2024-01-15",
                    lastLogin: "2024-01-20",
                    totalDeposits: 50000,
                    totalWithdrawals: 35000
                },
                {
                    id: 2,
                    username: "casino_king",
                    email: "king@email.com",
                    balance: 50000,
                    level: "Premium",
                    status: "active",
                    registered: "2024-01-10",
                    lastLogin: "2024-01-20",
                    totalDeposits: 100000,
                    totalWithdrawals: 50000
                }
            ],
            transactions: [
                {
                    id: 1,
                    userId: 1,
                    username: "pro_gamer",
                    type: "deposit",
                    amount: 5000,
                    status: "completed",
                    date: "2024-01-20 14:30:00",
                    method: "Bank Transfer"
                },
                {
                    id: 2,
                    userId: 2,
                    username: "casino_king",
                    type: "withdrawal",
                    amount: 10000,
                    status: "pending",
                    date: "2024-01-20 15:45:00",
                    method: "bKash"
                }
            ],
            games: [
                {
                    id: 1,
                    name: "লাইভ বাকারা",
                    type: "live-casino",
                    provider: "Evolution",
                    status: "active",
                    players: 1234,
                    revenue: 50000
                },
                {
                    id: 2,
                    name: "সুইট বোনানজা",
                    type: "slot",
                    provider: "Pragmatic Play",
                    status: "active",
                    players: 2458,
                    revenue: 75000
                }
            ],
            bonuses: [
                {
                    id: 1,
                    name: "Welcome Bonus",
                    type: "deposit",
                    amount: "100%",
                    maxAmount: 10000,
                    status: "active"
                }
            ],
            stats: {
                totalRevenue: 250000,
                totalUsers: 2,
                totalDeposits: 150000,
                totalWithdrawals: 85000,
                activeGames: 15,
                pendingWithdrawals: 25000
            },
            activities: [
                {
                    id: 1,
                    type: "user_registration",
                    message: "নতুন ইউজার রেজিস্টার্ড: casino_king",
                    time: "2024-01-20 15:30:00"
                },
                {
                    id: 2,
                    type: "deposit",
                    message: "ডিপোজিট সম্পন্ন: pro_gamer - ₳5,000",
                    time: "2024-01-20 14:30:00"
                }
            ]
        };
    }

    saveData() {
        localStorage.setItem('casino-admin-data', JSON.stringify(this.data));
    }

    init() {
        this.showSection('dashboard');
        this.updateDashboard();
        this.loadUsersTable();
        this.loadTransactionsTable();
        this.loadRecentActivities();
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
    }

    // Dashboard Functions
    updateDashboard() {
        const stats = this.data.stats;
        
        document.getElementById('total-revenue').textContent = `₳ ${stats.totalRevenue.toLocaleString()}`;
        document.getElementById('total-users').textContent = stats.totalUsers.toLocaleString();
        document.getElementById('total-deposits').textContent = `₳ ${stats.totalDeposits.toLocaleString()}`;
        document.getElementById('total-withdrawals').textContent = `₳ ${stats.totalWithdrawals.toLocaleString()}`;
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
                        <small>${activity.time}</small>
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
            'game_play': 'fa-gamepad'
        };
        return icons[type] || 'fa-bell';
    }

    // User Management
    loadUsersTable() {
        const tbody = document.getElementById('users-table-body');
        if (!tbody) return;

        let html = '';
        this.data.users.forEach(user => {
            html += `
                <tr>
                    <td>#${user.id}</td>
                    <td>
                        <div class="user-info">
                            <strong>${user.username}</strong>
                            <small>${user.email}</small>
                        </div>
                    </td>
                    <td>₳ ${user.balance.toLocaleString()}</td>
                    <td>
                        <span class="status-badge ${user.status}">${user.status}</span>
                    </td>
                    <td>${user.registered}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-sm btn-primary" onclick="admin.editUser(${user.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-sm btn-secondary" onclick="admin.viewUserDetails(${user.id})">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-sm btn-danger" onclick="admin.toggleUserStatus(${user.id})">
                                <i class="fas ${user.status === 'active' ? 'fa-lock' : 'fa-unlock'}"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = html || '<tr><td colspan="6">কোন ইউজার নেই</td></tr>';
    }

    // Transaction Management
    loadTransactionsTable() {
        const tbody = document.getElementById('transactions-table-body');
        if (!tbody) return;

        let html = '';
        this.data.transactions.forEach(transaction => {
            html += `
                <tr>
                    <td>#${transaction.id}</td>
                    <td>${transaction.username}</td>
                    <td>
                        <span class="transaction-type ${transaction.type}">${transaction.type}</span>
                    </td>
                    <td>₳ ${transaction.amount.toLocaleString()}</td>
                    <td>
                        <span class="status-badge ${transaction.status}">${transaction.status}</span>
                    </td>
                    <td>${transaction.date}</td>
                    <td>
                        <div class="action-buttons">
                            ${transaction.status === 'pending' ? `
                                <button class="btn-sm btn-success" onclick="admin.approveTransaction(${transaction.id})">
                                    <i class="fas fa-check"></i>
                                </button>
                                <button class="btn-sm btn-danger" onclick="admin.rejectTransaction(${transaction.id})">
                                    <i class="fas fa-times"></i>
                                </button>
                            ` : ''}
                            <button class="btn-sm btn-secondary" onclick="admin.viewTransaction(${transaction.id})">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = html || '<tr><td colspan="7">কোন ট্রানজেকশন নেই</td></tr>';
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
            ...userData,
            balance: parseInt(userData.initialBalance) || 0,
            level: "Standard",
            status: "active",
            registered: new Date().toISOString().split('T')[0],
            lastLogin: new Date().toISOString().split('T')[0],
            totalDeposits: 0,
            totalWithdrawals: 0
        };

        this.data.users.push(newUser);
        this.data.stats.totalUsers++;
        
        // Add activity
        this.addActivity('user_registration', `নতুন ইউজার রেজিস্টার্ড: ${newUser.username}`);
        
        this.saveData();
        this.loadUsersTable();
        this.updateDashboard();
        this.closeUserModal();
        
        this.showNotification('ইউজার সফলভাবে তৈরি হয়েছে!', 'success');
    }

    editUser(userId) {
        const user = this.data.users.find(u => u.id === userId);
        if (user) {
            // Implement edit user functionality
            this.showNotification(`ইউজার এডিট: ${user.username}`, 'info');
        }
    }

    toggleUserStatus(userId) {
        const user = this.data.users.find(u => u.id === userId);
        if (user) {
            user.status = user.status === 'active' ? 'suspended' : 'active';
            this.saveData();
            this.loadUsersTable();
            
            this.showNotification(
                `ইউজার ${user.status === 'active' ? 'এক্টিভ' : 'সাসপেন্ড'} হয়েছে`, 
                user.status === 'active' ? 'success' : 'warning'
            );
        }
    }

    // Transaction Functions
    approveTransaction(transactionId) {
        const transaction = this.data.transactions.find(t => t.id === transactionId);
        if (transaction && transaction.status === 'pending') {
            transaction.status = 'completed';
            
            if (transaction.type === 'withdrawal') {
                const user = this.data.users.find(u => u.id === transaction.userId);
                if (user) {
                    user.balance -= transaction.amount;
                    user.totalWithdrawals += transaction.amount;
                }
            }
            
            this.saveData();
            this.loadTransactionsTable();
            this.updateDashboard();
            
            this.showNotification('ট্রানজেকশন অ্যাপ্রুভ হয়েছে!', 'success');
        }
    }

    rejectTransaction(transactionId) {
        const transaction = this.data.transactions.find(t => t.id === transactionId);
        if (transaction && transaction.status === 'pending') {
            transaction.status = 'rejected';
            this.saveData();
            this.loadTransactionsTable();
            
            this.showNotification('ট্রানজেকশন রিজেক্ট হয়েছে!', 'error');
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
                
                // Add transaction
                const newTransaction = {
                    id: Date.now(),
                    userId: user.id,
                    username: user.username,
                    type: "deposit",
                    amount: depositAmount,
                    status: "completed",
                    date: new Date().toLocaleString(),
                    method: "Manual"
                };
                
                this.data.transactions.push(newTransaction);
                this.data.stats.totalDeposits += depositAmount;
                this.data.stats.totalRevenue += depositAmount * 0.1; // 10% house edge
                
                this.addActivity('deposit', `ম্যানুয়াল ডিপোজিট: ${user.username} - ₳${depositAmount.toLocaleString()}`);
                
                this.saveData();
                this.loadTransactionsTable();
                this.updateDashboard();
                
                this.showNotification('ডিপোজিট সফল!', 'success');
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
                    
                    // Add transaction
                    const newTransaction = {
                        id: Date.now(),
                        userId: user.id,
                        username: user.username,
                        type: "withdrawal",
                        amount: withdrawalAmount,
                        status: "pending",
                        date: new Date().toLocaleString(),
                        method: "Manual"
                    };
                    
                    this.data.transactions.push(newTransaction);
                    this.data.stats.totalWithdrawals += withdrawalAmount;
                    this.data.stats.pendingWithdrawals += withdrawalAmount;
                    
                    this.addActivity('withdrawal', `উইথড্র রিকুয়েস্ট: ${user.username} - ₳${withdrawalAmount.toLocaleString()}`);
                    
                    this.saveData();
                    this.loadTransactionsTable();
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
        const gameType = prompt('গেম টাইপ (slot/live-casino/sports):');
        
        if (gameName && gameType) {
            const newGame = {
                id: Date.now(),
                name: gameName,
                type: gameType,
                provider: "Manual",
                status: "active",
                players: Math.floor(Math.random() * 1000),
                revenue: 0
            };
            
            this.data.games.push(newGame);
            this.data.stats.activeGames++;
            this.saveData();
            
            this.showNotification('নতুন গেম যোগ করা হয়েছে!', 'success');
        }
    }

    // Bonus Management
    createBonus() {
        const bonusName = prompt('বোনাসের নাম দিন:');
        const bonusType = prompt('বোনাস টাইপ (deposit/welcome/cashback):');
        
        if (bonusName && bonusType) {
            const newBonus = {
                id: Date.now(),
                name: bonusName,
                type: bonusType,
                amount: "100%",
                maxAmount: 10000,
                status: "active"
            };
            
            this.data.bonuses.push(newBonus);
            this.saveData();
            
            this.showNotification('নতুন বোনাস তৈরি করা হয়েছে!', 'success');
        }
    }

    // Report Generation
    generateReport() {
        const report = {
            generatedAt: new Date().toLocaleString(),
            totalUsers: this.data.stats.totalUsers,
            totalRevenue: this.data.stats.totalRevenue,
            totalDeposits: this.data.stats.totalDeposits,
            totalWithdrawals: this.data.stats.totalWithdrawals,
            activeGames: this.data.stats.activeGames,
            pendingWithdrawals: this.data.stats.pendingWithdrawals
        };
        
        console.log('Casino Report:', report);
        this.showNotification('রিপোর্ট জেনারেট হয়েছে! কনসোল দেখুন।', 'info');
    }

    // Utility Functions
    addActivity(type, message) {
        const newActivity = {
            id: Date.now(),
            type: type,
            message: message,
            time: new Date().toLocaleString()
        };
        
        this.data.activities.unshift(newActivity);
        if (this.data.activities.length > 50) {
            this.data.activities = this.data.activities.slice(0, 50);
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
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

    filterTransactions() {
        // Implement transaction filtering
        this.showNotification('ট্রানজেকশন ফিল্টার প্রয়োগ করা হয়েছে!', 'info');
    }

    exportUsers() {
        // Implement user export functionality
        this.showNotification('ইউজার ডেটা এক্সপোর্ট করা হয়েছে!', 'success');
    }
}

// Global functions
let admin;

function showSection(sectionId) {
    if (admin) {
        admin.showSection(sectionId);
    }
}

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

function generateReport() {
    if (admin) {
        admin.generateReport();
    }
}

function filterTransactions() {
    if (admin) {
        admin.filterTransactions();
    }
}

function exportUsers() {
    if (admin) {
        admin.exportUsers();
    }
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    admin = new CasinoAdmin();
    
    // User form submission
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                initialBalance: document.getElementById('initialBalance').value
            };
            
            admin.createUser(formData);
        });
    }
    
    console.log('Casino Admin Panel Loaded Successfully!');
});
