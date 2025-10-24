// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupAdminEventListeners();
    loadRecentActivity();
});

// Initialize charts
function initializeCharts() {
    // User Activity Chart
    const userActivityCtx = document.getElementById('userActivityChart').getContext('2d');
    const userActivityChart = new Chart(userActivityCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'New Users',
                data: [850, 920, 780, 1100, 950, 1200, 1050, 1300, 1150, 1400, 1250, 1500],
                borderColor: '#6c5ce7',
                backgroundColor: 'rgba(108, 92, 231, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Active Users',
                data: [4200, 4500, 4800, 5200, 5100, 5800, 5600, 6100, 5900, 6500, 6300, 6800],
                borderColor: '#fd79a8',
                backgroundColor: 'rgba(253, 121, 168, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
        type: 'doughnut',
        data: {
            labels: ['Game Purchases', 'In-App Purchases', 'Tournament Fees', 'Subscriptions', 'Advertising'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    '#6c5ce7',
                    '#fd79a8',
                    '#00b894',
                    '#fdcb6e',
                    '#e17055'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Setup admin event listeners
function setupAdminEventListeners() {
    // Sidebar menu active state
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Quick action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            handleQuickAction(action);
        });
    });

    // Notification bell
    const notificationBell = document.querySelector('.notifications');
    notificationBell.addEventListener('click', function() {
        showNotifications();
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', function() {
        performSearch(this.value);
    });
}

// Handle quick actions
function handleQuickAction(action) {
    switch(action) {
        case 'Add New Game':
            alert('Add New Game functionality would open a form here.');
            break;
        case 'Create Tournament':
            alert('Create Tournament functionality would open a form here.');
            break;
        case 'Send Announcement':
            alert('Send Announcement functionality would open a form here.');
            break;
        case 'Generate Report':
            alert('Report generation would start here.');
            break;
        default:
            console.log('Unknown action:', action);
    }
}

// Show notifications
function showNotifications() {
    // In a real app, this would show a dropdown with notifications
    alert('You have 3 new notifications:\n- New user registration\n- Tournament starting soon\n- Server maintenance scheduled');
    
    // Clear notification badge
    document.querySelector('.notification-badge').style.display = 'none';
}

// Perform search
function performSearch(query) {
    if (query.length < 2) return;
    
    // In a real app, this would make an API call
    console.log('Searching for:', query);
    
    // Simulate search results
    const results = [
        { type: 'user', name: 'JohnDoe', id: 123 },
        { type: 'game', name: 'Cyber Assault', id: 1 },
        { type: 'tournament', name: 'Cyber Championship', id: 1 }
    ];
    
    // Display search results (simplified)
    if (results.length > 0) {
        console.log('Search results:', results);
    }
}

// Load recent activity
function loadRecentActivity() {
    // In a real app, this would fetch from an API
    const activities = [
        { type: 'user-registration', user: 'JohnDoe', time: '2 minutes ago' },
        { type: 'tournament-start', tournament: 'Cyber Championship', time: '15 minutes ago' },
        { type: 'game-added', game: 'Space Odyssey', time: '1 hour ago' },
        { type: 'maintenance', message: 'Server maintenance scheduled', time: '2 hours ago' }
    ];
    
    // Activities are already in the HTML for this demo
    console.log('Recent activities loaded:', activities);
}

// Simulate real-time updates
setInterval(() => {
    // Update user count with random fluctuation
    const userCountElement = document.querySelector('.stat-card:nth-child(1) .stat-info h3');
    const currentCount = parseInt(userCountElement.textContent.replace(/,/g, ''));
    const change = Math.floor(Math.random() * 10) - 3; // -3 to +6
    const newCount = Math.max(12500, currentCount + change);
    userCountElement.textContent = newCount.toLocaleString();
    
    // Update trend indicator
    const trendElement = document.querySelector('.stat-card:nth-child(1) .stat-trend');
    if (change > 0) {
        trendElement.innerHTML = '<i class="fas fa-arrow-up"></i> ' + Math.abs(change) + '%';
        trendElement.className = 'stat-trend up';
    } else if (change < 0) {
        trendElement.innerHTML = '<i class="fas fa-arrow-down"></i> ' + Math.abs(change) + '%';
        trendElement.className = 'stat-trend down';
    }
}, 10000); // Update every 10 seconds

// Responsive sidebar toggle for mobile
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth <= 576) {
        sidebar.classList.toggle('active');
        if (sidebar.classList.contains('active')) {
            mainContent.style.marginLeft = '0';
        } else {
            mainContent.style.marginLeft = 'var(--sidebar-width)';
        }
    }
}

// Add hamburger menu for mobile (would need to be added to HTML)
// This is a placeholder for mobile functionality
window.addEventListener('resize', function() {
    if (window.innerWidth > 576) {
        document.querySelector('.sidebar').style.transform = 'translateX(0)';
        document.querySelector('.main-content').style.marginLeft = 'var(--sidebar-width)';
    }
});
