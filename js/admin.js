// Toggle sidebar for mobile
document.getElementById('toggleSidebar').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('active');
});

// Navigation functionality
const navItems = document.querySelectorAll('.nav-item');
const contentSections = document.querySelectorAll('.content-section');
const pageTitle = document.getElementById('page-title');

navItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all nav items and content sections
        navItems.forEach(nav => nav.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked nav item
        this.classList.add('active');
        
        // Show corresponding content section
        const target = this.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
        
        // Update page title
        const itemText = this.querySelector('span').textContent;
        pageTitle.textContent = itemText;
        
        // Close sidebar on mobile after selection
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar').classList.remove('active');
        }
    });
});

// Logout functionality
document.querySelector('#logout .btn').addEventListener('click', function() {
    if (confirm('Are you sure you want to logout?')) {
        alert('You have been logged out successfully.');
        // In a real application, you would redirect to login page
        // window.location.href = 'login.html';
    }
});

// Form submission handlers
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Handle form submission here
        alert('Settings updated successfully!');
    });
});

// Initialize dashboard data
function initializeDashboard() {
    // This is where you would fetch real data from your API
    console.log('Dashboard initialized');
    
    // Example: Update dashboard cards with real data
    // fetch('/api/dashboard')
    //     .then(response => response.json())
    //     .then(data => {
    //         document.querySelector('.card .value').textContent = data.totalUsers;
    //     });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

// Real-time updates (example for live betting)
function updateLiveBets() {
    // This would connect to your WebSocket or polling service
    // setInterval(() => {
    //     fetch('/api/live-bets')
    //         .then(response => response.json())
    //         .then(bets => {
    //             // Update live bets table
    //         });
    // }, 5000);
}

// Search functionality
document.querySelectorAll('.form-control[type="text"]').forEach(input => {
    input.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const table = this.closest('.content-section').querySelector('table');
        
        if (table) {
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        }
    });
});
