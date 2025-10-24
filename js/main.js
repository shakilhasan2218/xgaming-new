// Sample Data
const games = [
    {
        id: 1,
        title: "Cyber Assault",
        genre: "fps",
        rating: 4.8,
        players: "125K",
        description: "Immerse yourself in futuristic warfare with cutting-edge graphics and intense multiplayer battles.",
        image: "images/game1.jpg"
    },
    {
        id: 2,
        title: "Mythic Realms",
        genre: "rpg",
        rating: 4.9,
        players: "98K",
        description: "Embark on an epic journey through magical lands filled with mythical creatures and ancient treasures.",
        image: "images/game2.jpg"
    },
    {
        id: 3,
        title: "Racing Extreme",
        genre: "racing",
        rating: 4.7,
        players: "87K",
        description: "Experience heart-pounding races with hyper-realistic physics and stunning environments.",
        image: "images/game3.jpg"
    },
    {
        id: 4,
        title: "Soccer Pro 2023",
        genre: "sports",
        rating: 4.6,
        players: "76K",
        description: "The most realistic soccer simulation with official teams, players, and stadiums.",
        image: "images/game4.jpg"
    },
    {
        id: 5,
        title: "Space Odyssey",
        genre: "rpg",
        rating: 4.8,
        players: "64K",
        description: "Explore the vastness of space, discover new planets, and engage in interstellar combat.",
        image: "images/game5.jpg"
    },
    {
        id: 6,
        title: "Battle Royale Elite",
        genre: "fps",
        rating: 4.7,
        players: "142K",
        description: "Last-player-standing battle royale with dynamic environments and extensive weapon customization.",
        image: "images/game6.jpg"
    }
];

const tournaments = [
    {
        id: 1,
        title: "Cyber Championship 2023",
        game: "Cyber Assault",
        prize: "$50,000",
        date: "2023-12-15",
        participants: 128,
        maxParticipants: 256,
        registered: 87
    },
    {
        id: 2,
        title: "Mythic Masters",
        game: "Mythic Realms",
        prize: "$25,000",
        date: "2023-11-28",
        participants: 64,
        maxParticipants: 64,
        registered: 64
    },
    {
        id: 3,
        title: "Extreme Racing Cup",
        game: "Racing Extreme",
        prize: "$15,000",
        date: "2023-12-05",
        participants: 32,
        maxParticipants: 64,
        registered: 42
    }
];

const leaderboard = [
    { rank: 1, name: "ProGamer99", score: 15420, avatar: "images/avatar1.jpg" },
    { rank: 2, name: "CyberNinja", score: 14280, avatar: "images/avatar2.jpg" },
    { rank: 3, name: "MythicLord", score: 13850, avatar: "images/avatar3.jpg" },
    { rank: 4, name: "SpeedDemon", score: 12940, avatar: "images/avatar4.jpg" },
    { rank: 5, name: "EliteSniper", score: 11870, avatar: "images/avatar5.jpg" }
];

// DOM Elements
const gamesContainer = document.getElementById('gamesContainer');
const tournamentsContainer = document.getElementById('tournamentsContainer');
const leaderboardContainer = document.getElementById('leaderboardContainer');
const filterButtons = document.querySelectorAll('.filter-btn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginBtn = document.querySelector('.btn-login');
const signupBtn = document.querySelector('.btn-signup');
const closeButtons = document.querySelectorAll('.close');
const switchToSignup = document.querySelector('.switch-to-signup');
const switchToLogin = document.querySelector('.switch-to-login');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadGames();
    loadTournaments();
    loadLeaderboard();
    setupEventListeners();
    initializeAnimations();
});

// Load games into the grid
function loadGames(filter = 'all') {
    gamesContainer.innerHTML = '';
    
    const filteredGames = filter === 'all' 
        ? games 
        : games.filter(game => game.genre === filter);
    
    filteredGames.forEach(game => {
        const gameCard = createGameCard(game);
        gamesContainer.appendChild(gameCard);
    });
}

// Create game card HTML
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
        <img src="${game.image}" alt="${game.title}" class="game-image">
        <div class="game-info">
            <h3 class="game-title">${game.title}</h3>
            <div class="game-meta">
                <span class="game-genre">${game.genre.toUpperCase()}</span>
                <span class="game-rating"><i class="fas fa-star"></i> ${game.rating}</span>
            </div>
            <p class="game-description">${game.description}</p>
            <div class="game-actions">
                <button class="btn-play">Play Now</button>
                <button class="btn-details">Details</button>
            </div>
        </div>
    `;
    
    return card;
}

// Load tournaments
function loadTournaments() {
    tournamentsContainer.innerHTML = '';
    
    tournaments.forEach(tournament => {
        const tournamentCard = createTournamentCard(tournament);
        tournamentsContainer.appendChild(tournamentCard);
    });
}

// Create tournament card HTML
function createTournamentCard(tournament) {
    const progress = (tournament.registered / tournament.maxParticipants) * 100;
    
    const card = document.createElement('div');
    card.className = 'tournament-card';
    card.innerHTML = `
        <div class="tournament-header">
            <h3 class="tournament-title">${tournament.title}</h3>
            <p class="tournament-game">${tournament.game}</p>
            <div class="tournament-prize">${tournament.prize}</div>
        </div>
        <div class="tournament-body">
            <div class="tournament-info">
                <div class="tournament-date">
                    <i class="far fa-calendar"></i>
                    ${new Date(tournament.date).toLocaleDateString()}
                </div>
                <div class="tournament-participants">
                    <i class="fas fa-users"></i>
                    ${tournament.participants}/${tournament.maxParticipants}
                </div>
            </div>
            <div class="tournament-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="progress-text">
                    <span>Registration Progress</span>
                    <span>${Math.round(progress)}%</span>
                </div>
            </div>
            <button class="btn-join" data-id="${tournament.id}">Join Tournament</button>
        </div>
    `;
    
    return card;
}

// Load leaderboard
function loadLeaderboard() {
    leaderboardContainer.innerHTML = '';
    
    leaderboard.forEach(player => {
        const playerItem = createLeaderboardItem(player);
        leaderboardContainer.appendChild(playerItem);
    });
}

// Create leaderboard item HTML
function createLeaderboardItem(player) {
    const item = document.createElement('div');
    item.className = 'leaderboard-item';
    item.innerHTML = `
        <div class="player-rank">${player.rank}</div>
        <img src="${player.avatar}" alt="${player.name}" class="player-avatar">
        <div class="player-info">
            <h4>${player.name}</h4>
            <p>Level ${Math.floor(player.score / 1000)}</p>
        </div>
        <div class="player-score">${player.score.toLocaleString()}</div>
    `;
    
    return item;
}

// Setup event listeners
function setupEventListeners() {
    // Game filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter games
            loadGames(filter);
        });
    });
    
    // Modal controls
    loginBtn.addEventListener('click', () => openModal(loginModal));
    signupBtn.addEventListener('click', () => openModal(signupModal));
    
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModals);
    });
    
    // Switch between login and signup modals
    switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        closeModals();
        openModal(signupModal);
    });
    
    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        closeModals();
        openModal(loginModal);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModals();
        }
    });
    
    // Join tournament buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-join')) {
            const tournamentId = e.target.getAttribute('data-id');
            joinTournament(tournamentId);
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'var(--shadow)';
        }
    });
}

// Modal functions
function openModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModals() {
    loginModal.style.display = 'none';
    signupModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Join tournament function
function joinTournament(tournamentId) {
    const tournament = tournaments.find(t => t.id == tournamentId);
    
    if (tournament.registered >= tournament.maxParticipants) {
        alert('This tournament is already full!');
        return;
    }
    
    // In a real app, this would make an API call
    alert(`Successfully joined ${tournament.title}!`);
    
    // Update UI
    tournament.registered++;
    loadTournaments();
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.game-card, .tournament-card, .community-stat, .leaderboard-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Form submission handlers
document.querySelectorAll('.auth-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (this.parentElement.id === 'loginModal') {
            // Handle login
            const email = this.querySelector('#email').value;
            const password = this.querySelector('#password').value;
            
            // In a real app, this would make an API call
            console.log('Login attempt:', { email, password });
            alert('Login functionality would be implemented here!');
            closeModals();
        } else {
            // Handle signup
            const username = this.querySelector('#signup-username').value;
            const email = this.querySelector('#signup-email').value;
            const password = this.querySelector('#signup-password').value;
            
            // In a real app, this would make an API call
            console.log('Signup attempt:', { username, email, password });
            alert('Account creation functionality would be implemented here!');
            closeModals();
        }
    });
});

// Newsletter form
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    // In a real app, this would make an API call
    alert(`Thank you for subscribing with ${email}!`);
    this.reset();
});
