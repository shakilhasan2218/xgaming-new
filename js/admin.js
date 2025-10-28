// Complete Casino Admin Panel JavaScript
class CasinoMasterAdmin {
    constructor() {
        this.data = this.loadData();
        this.currentSection = 'dashboard';
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.init();
    }

    loadData() {
        const saved = localStorage.getItem('casino-master-data');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // Initial demo data
        return {
            users: [
                {
                    id: 1,
                    username: "vip_player",
                    email: "vip@email.com",
                    balance: 150000,
                    level: "vip",
                    status: "active",
                    registered: "2024-01-15",
                    lastLogin: "2024-01-20 14:30:00"
                },
                {
                    id: 2,
                    username: "casino_king", 
                    email: "king@email.com",
                    balance: 75000,
                    level: "premium",
                    status: "active",
                    registered: "2024-01-10",
                    lastLogin: "2024-01-20 15:45:00"
                }
            ],
            transactions: [
                {
                    id: 1,
                    userId: 1,
                    username: "vip_player",
                    type: "deposit",
                    amount: 50000,
                    status: "completed",
                    date: "2024-01-20 14:30:00",
                    method: "Bank Transfer"
                }
            ],
            games: [
                {
                    id: 1,
                    name: "লাইভ বাকারা",
                    type: "live-casino", 
                    players: 1234,
                    revenue: 250000,
                    status: "active"
                }
            ],
            stats: {
                totalRevenue: 1250000,
                totalUsers: 1560,
                totalDeposits: 850000,
                totalWithdrawals: 525000,
                activeGames: 28,
                today: {
                    revenue: 45000,
                    newUsers: 23,
                    activeUsers: 456
                }
            },
            activities: [
                {
                    id: 1,
                    type: "user_registration", 
                    message: "নতুন ইউজার রেজিস্টার্ড: demo_user",
                    time: "2024-01-20 14:25:00"
                }
            ]
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
        
        setInterval(() => this.updateLiveTime(), 1000);
        setInterval(() => this.updateDashboard(), 30000);

        console.log('Casino Master Admin Panel Initialized');
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

    // Section Management
    showSection(sectionId) {
        document.querySelectorAll('.admin-section').forEach(section => {
            section.classList.remove('active');
        });
        
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        const menuItem = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
        if (menuItem) {
            menuItem.classList.add('active');
        }
        
        this.currentSection = sectionId;
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
        }
    }

    // Dashboard Functions
    updateDashboard() {
        const stats = this.data.stats;
        const today = stats.today;
        
        // Update quick stats
        if (document.getElementById('total-active-users')) {
            document.getElementById('total-active-users').textContent = today.activeUsers.toLocaleString();
            document.getElementById('total-active-games').textContent = stats.activeGames.toLocaleString();
            document.getElementById('total-revenue-today').textContent = `₳ ${today.revenue.toLocaleString()}`;
            document.getElementById('total-admins').textContent = '3';
        }
        
        // Update main stats
        if (document.getElementById('total-revenue')) {
            document.getElementById('total-revenue').textContent = `₳ ${stats.totalRevenue.toLocaleString()}`;
            document.getElementById('total-users').textContent = stats.totalUsers.toLocaleString();
            document.getElementById('total-deposits').textContent = `₳ ${stats.totalDeposits.toLocaleString()}`;
        }
        
        // Update menu badges
        if (document.getElementById('users-count')) {
            document.getElementById('users-count').textContent = stats.totalUsers.toLocaleString();
            document.getElementById('pending-deposits').textContent = '0';
            document.getElementById('pending-withdrawals').textContent = '0';
        }
    }

    loadRecentActivities() {
        const activityList = document.getElementById('activity-list');
        if (!activityList) return;

        let html = '';
        this.data.activities.slice(0, 5).forEach(activity => {
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
            'bonus': 'fa-gift'
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
                    <td><strong>₳ ${user.balance.toLocaleString()}</strong></td>
                    <td>
                        <span class="status-badge ${user.level}">${user.level}</span>
                    </td>
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

        tbody.innerHTML = html || '<tr><td colspan="7">কোন ইউজার নেই</td></tr>';
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
            balance: parseInt(userData.initialBalance) || 0,
            level: "standard",
            status: "active",
            registered: new Date().toISOString().split('T')[0],
            lastLogin: new Date().toISOString().split('T')[0]
        };

        this.data.users.unshift(newUser);
        this.data.stats.totalUsers++;
        this.data.stats.today.newUsers++;
        
        this.addActivity('user_registration', `নতুন ইউজার রেজিস্টার্ড: ${newUser.username}`);
        
        this.saveData();
        this.loadUsersTable();
        this.updateDashboard();
        this.closeUserModal();
        
        this.showNotification(`ইউজার ${newUser.username} সফলভাবে তৈরি হয়েছে!`, 'success');
    }

    editUser(userId) {
        const user = this.data.users.find(u => u.id === userId);
        if (user) {
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
            `.trim();
            
            alert(details);
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

    // Manual Operations
    manualDeposit() {
        const username = prompt('ইউজারনেম দিন:');
        const amount = prompt('অ্যামাউন্ট দিন:');
        
        if (username && amount) {
            const user = this.data.users.find(u => u.username === username);
            if (user) {
                const depositAmount = parseInt(amount);
                user.balance += depositAmount;
                
                this.addTransaction(user.id, user.username, 'deposit', depositAmount, 'completed', 'Manual');
                this.addActivity('deposit', `ম্যানুয়াল ডিপোজিট: ${user.username} - ₳${depositAmount.toLocaleString()}`);
                
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
                    
                    this.addTransaction(user.id, user.username, 'withdrawal', withdrawalAmount, 'pending', 'Manual');
                    this.addActivity('withdrawal', `উইথড্র রিকুয়েস্ট: ${user.username} - ₳${withdrawalAmount.toLocaleString()}`);
                    
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
            method: method
        };
        
        this.data.transactions.unshift(newTransaction);
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
            
            this.showNotification(`নতুন গেম "${gameName}" যোগ করা হয়েছে!`, 'success');
        }
    }

    // Bonus Management
    createBonus() {
        const bonusName = prompt('বোনাসের নাম দিন:');
        const bonusType = prompt('বোনাস টাইপ (deposit/welcome/cashback):');
        
        if (bonusName && bonusType) {
            this.showNotification(`নতুন বোনাস "${bonusName}" তৈরি করা হয়েছে!`, 'success');
        }
    }

    // Report Generation
    generateReport() {
        const report = {
            generatedAt: new Date().toLocaleString('bn-BD'),
            totalUsers: this.data.stats.totalUsers,
            totalRevenue: this.data.stats.totalRevenue,
            totalDeposits: this.data.stats.totalDeposits,
            totalWithdrawals: this.data.stats.totalWithdrawals,
            activeGames: this.data.stats.activeGames
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
            time: new Date().toLocaleString('bn-BD')
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
        
        document.body.appendChild(notification);
        
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

    getNotificationIcon(type) {
        const icons = {
            'success': 'fa-check-circle',
            'error': 'fa-exclamation-circle',
            'warning': 'fa-exclamation-triangle',
            'info': 'fa-info-circle'
        };
        return icons[type] || 'fa-bell';
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

    loadTransactionsTable() {
        // Implementation for transactions table
        this.showNotification('ট্রানজেকশন টেবিল লোড করা হয়েছে', 'info');
    }
}

// Global functions
let admin;

function showSection(sectionId) {
    if (admin) admin.showSection(sectionId);
}

function showUserModal() {
    if (admin) admin.showUserModal();
}

function closeUserModal() {
    if (admin) admin.closeUserModal();
}

function manualDeposit() {
    if (admin) admin.manualDeposit();
}

function manualWithdrawal() {
    if (admin) admin.manualWithdrawal();
}

function addNewGame() {
    if (admin) admin.addNewGame();
}

function createBonus() {
    if (admin) admin.createBonus();
}

function generateReport() {
    if (admin) admin.generateReport();
}

function exportUsers() {
    if (admin) admin.exportUsers();
}

function showNotifications() {
    // Implementation for notifications panel
    alert('নোটিফিকেশন প্যানেল শীঘ্রই আসছে!');
}

function switchAdminRole(role) {
    alert(`এডমিন রোল switched to ${role}`);
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
                initialBalance: document.getElementById('initialBalance').value
            };
            
            admin.createUser(formData);
        });
    }
    
    console.log('Casino Admin Panel Fully Loaded!');
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
`;
document.head.appendChild(style);
