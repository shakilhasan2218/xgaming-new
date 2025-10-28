// Backend Manager Class
class BackendManager {
    constructor() {
        this.data = this.loadData();
        this.updateStats();
    }

    loadData() {
        const saved = localStorage.getItem('xgaming-backend-data');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // Initial backend data
        return {
            users: [
                {id: 1, username: "pro_gamer", balance: 15000, level: 25, country: "Bangladesh", joined: new Date().toISOString()},
                {id: 2, username: "elite_player", balance: 25000, level: 30, country: "India", joined: new Date().toISOString()},
                {id: 3, username: "casino_king", balance: 50000, level: 50, country: "Bangladesh", joined: new Date().toISOString()}
            ],
            games: [
                {id: 1, name: "লাইভ বাকারা", players: 1234, revenue: 50000, status: "active"},
                {id: 2, name: "সুইট বোনানজা", players: 2458, revenue: 75000, status: "active"},
                {id: 3, name: "লাইভ রুলেট", players: 987, revenue: 30000, status: "active"}
            ],
            revenue: 155000,
            todayWins: 47,
            lastUpdated: new Date().toISOString()
        };
    }

    saveData() {
        localStorage.setItem('xgaming-backend-data', JSON.stringify(this.data));
    }

    updateStats() {
        if (document.getElementById('stat-users')) {
            document.getElementById('stat-users').textContent = this.data.users.length;
            document.getElementById('stat-revenue').textContent = `₳ ${this.data.revenue.toLocaleString()}`;
            document.getElementById('stat-games').textContent = this.data.games.length;
            document.getElementById('stat-wins').textContent = this.data.todayWins;
        }
    }

    addNewUser() {
        const usernames = ["bangla_gamer", "dhaka_king", "chittagong_pro", "sylhet_elite", "khulna_master"];
        const countries = ["Bangladesh", "India", "Pakistan", "Nepal", "Sri Lanka"];
        
        const newUser = {
            id: Date.now(),
            username: usernames[Math.floor(Math.random() * usernames.length)] + Math.floor(Math.random() * 1000),
            balance: Math.floor(Math.random() * 50000) + 5000,
            level: Math.floor(Math.random() * 50) + 1,
            country: countries[Math.floor(Math.random() * countries.length)],
            joined: new Date().toISOString()
        };
        
        this.data.users.push(newUser);
        this.data.revenue += 1000;
        this.data.todayWins += Math.floor(Math.random() * 5) + 1;
        this.saveData();
        this.updateStats();
        
        this.showData('নতুন ইউজার যুক্ত হয়েছে!', {
            user: newUser,
            totalUsers: this.data.users.length,
            message: "ইউজার সফলভাবে রেজিস্টার্ড হয়েছে"
        });
    }

    updateGameStats() {
        this.data.games.forEach(game => {
            game.players = Math.floor(Math.random() * 2000) + 500;
            game.revenue += Math.floor(Math.random() * 1000);
        });
        
        this.data.revenue = this.data.games.reduce((sum, game) => sum + game.revenue, 0);
        this.data.todayWins += Math.floor(Math.random() * 10) + 5;
        this.data.lastUpdated = new Date().toISOString();
        this.saveData();
        this.updateStats();
        
        this.showData('গেম স্ট্যাটস আপডেট হয়েছে!', {
            games: this.data.games,
            totalRevenue: this.data.revenue,
            todayWins: this.data.todayWins,
            lastUpdated: this.data.lastUpdated
        });
    }

    viewAllData() {
        this.showData('সমস্ত ব্যাকএন্ড ডেটা', this.data);
    }

    generateReport() {
        const report = {
            generatedAt: new Date().toISOString(),
            totalUsers: this.data.users.length,
            totalRevenue: this.data.revenue,
            activeGames: this.data.games.length,
            topUsers: this.data.users.slice(0, 3),
            popularGames: this.data.games.sort((a, b) => b.players - a.players).slice(0, 3)
        };
        
        this.showData('ডেইলি রিপোর্ট জেনারেটেড', report);
    }

    showData(title, data) {
        const display = document.getElementById('backend-display');
        if (!display) return;
        
        let content = `
            <div style="margin-bottom: 20px;">
                <h4 style="color: #667eea; margin-bottom: 15px;">${title}</h4>
        `;
        
        if (data.users || data.games) {
            if (data.users) {
                content += `<h5 style="color: #fff; margin: 15px 0 10px 0;">👥 ইউজারস (${data.users.length})</h5>`;
                data.users.forEach(user => {
                    content += `
                        <div class="user-item">
                            <strong>${user.username}</strong> - লেভেল ${user.level}
                            <br><small>ব্যালেন্স: ₳${user.balance.toLocaleString()} | ${user.country}</small>
                        </div>
                    `;
                });
            }
            
            if (data.games) {
                content += `<h5 style="color: #fff; margin: 15px 0 10px 0;">🎮 গেমস (${data.games.length})</h5>`;
                data.games.forEach(game => {
                    content += `
                        <div class="game-item">
                            <strong>${game.name}</strong>
                            <br><small>প্লেয়ারস: ${game.players} | রেভিনিউ: ₳${game.revenue.toLocaleString()}</small>
                        </div>
                    `;
                });
            }
        } else {
            content += `<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 5px; overflow-x: auto; color: #fff;">${JSON.stringify(data, null, 2)}</pre>`;
        }
        
        content += `</div>`;
        display.innerHTML = content;
    }
}

// Global functions
let backendManager;

function addNewUser() {
    if (backendManager) backendManager.addNewUser();
}

function updateGameStats() {
    if (backendManager) backendManager.updateGameStats();
}

function viewAllData() {
    if (backendManager) backendManager.viewAllData();
}

function generateReport() {
    if (backendManager) backendManager.generateReport();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    backendManager = new BackendManager();
    console.log('XGaming Admin Dashboard Loaded');
});
