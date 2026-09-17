// Game Categories - Define categories for each game
const gameCategories = {
  // Add game names here with their categories
  // Example: 'Game Name': ['Action', 'Adventure']
  // This should be populated based on your games
};

// Initialize rating system
const gameRatings = (() => {
  try {
    return JSON.parse(localStorage.getItem('gameRatings')) || {};
  } catch {
    return {};
  }
})();

// Save ratings to localStorage
function saveRatings() {
  try {
    localStorage.setItem('gameRatings', JSON.stringify(gameRatings));
  } catch (e) {
    console.warn('Could not save game ratings:', e);
  }
}

// Get all available categories from games
function getAllCategories() {
  const categories = new Set();
  Object.values(gameCategories).forEach(cats => {
    cats.forEach(cat => categories.add(cat));
  });
  return Array.from(categories).sort();
}

// Create filter buttons
function initializeFilters() {
  const filterContainer = document.querySelector('.game-filters-container');
  if (!filterContainer) {
    console.warn('Filter container not found');
    return;
  }

  const categories = getAllCategories();
  
  // Create "All Games" button
  const allBtn = document.createElement('button');
  allBtn.className = 'filter-btn active';
  allBtn.textContent = 'All Games';
  allBtn.dataset.filter = 'all';
  allBtn.addEventListener('click', () => filterGames('all'));
  filterContainer.appendChild(allBtn);

  // Create category buttons
  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.textContent = category;
    btn.dataset.filter = category;
    btn.addEventListener('click', () => filterGames(category));
    filterContainer.appendChild(btn);
  });

  // Search integration
  const searchBar = document.querySelector('.search-bar input');
  if (searchBar) {
    searchBar.addEventListener('input', (e) => {
      filterGamesBySearch(e.target.value);
    });
  }
}

// Filter games by category
function filterGames(category) {
  const gameCards = document.querySelectorAll('.game-card');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  // Update active button
  filterBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filter === category) {
      btn.classList.add('active');
    }
  });

  let visibleCount = 0;

  gameCards.forEach(card => {
    const gameName = card.querySelector('h3')?.textContent.trim() || '';
    const categories = gameCategories[gameName] || [];

    if (category === 'all' || categories.includes(category)) {
      card.classList.remove('hidden');
      card.style.display = '';
      visibleCount++;
    } else {
      card.classList.add('hidden');
      card.style.display = 'none';
    }
  });

  // Show "no games found" message if needed
  updateNoGamesMessage(visibleCount === 0);
}

// Filter games by search query
function filterGamesBySearch(query) {
  const gameCards = document.querySelectorAll('.game-card');
  const searchLower = query.toLowerCase();
  let visibleCount = 0;

  gameCards.forEach(card => {
    const gameName = card.querySelector('h3')?.textContent.toLowerCase() || '';
    
    if (gameName.includes(searchLower)) {
      card.classList.remove('hidden');
      card.style.display = '';
      visibleCount++;
    } else {
      card.classList.add('hidden');
      card.style.display = 'none';
    }
  });

  updateNoGamesMessage(visibleCount === 0);
}

// Show/hide no games message
function updateNoGamesMessage(show) {
  let noGamesMsg = document.querySelector('.no-games-found');
  
  if (show && !noGamesMsg) {
    const grid = document.querySelector('.game-grid');
    if (grid) {
      noGamesMsg = document.createElement('div');
      noGamesMsg.className = 'no-games-found';
      noGamesMsg.innerHTML = '<i class="fas fa-search"></i><p>No games found matching your criteria</p>';
      grid.appendChild(noGamesMsg);
    }
  } else if (!show && noGamesMsg) {
    noGamesMsg.remove();
  }
}

// Add rating button to game cards
function initializeRatingButtons() {
  const gameCards = document.querySelectorAll('.game-card');

  gameCards.forEach(card => {
    const gameName = card.querySelector('h3')?.textContent.trim() || '';
    
    // Create image wrapper if it doesn't exist
    let imageWrapper = card.querySelector('.game-card-image-wrapper');
    if (!imageWrapper) {
      const img = card.querySelector('img');
      if (img) {
        imageWrapper = document.createElement('div');
        imageWrapper.className = 'game-card-image-wrapper';
        img.parentNode.insertBefore(imageWrapper, img);
        imageWrapper.appendChild(img);
      }
    }

    // Check if rating button already exists
    if (!card.querySelector('.game-rating-btn')) {
      // Create rating button
      const ratingBtn = document.createElement('button');
      ratingBtn.className = 'game-rating-btn';
      ratingBtn.innerHTML = '👍';
      ratingBtn.title = 'Rate this game';
      
      // Check if already rated
      if (gameRatings[gameName]) {
        ratingBtn.classList.add('rated');
      }

      // Add rating counter
      const counter = document.createElement('div');
      counter.className = 'rating-counter';
      counter.textContent = gameRatings[gameName] || '0';

      // Add overlay if it doesn't exist
      if (!card.querySelector('.game-card-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'game-card-overlay';
        if (imageWrapper) {
          imageWrapper.appendChild(overlay);
        }
      }

      // Add to card
      if (imageWrapper) {
        imageWrapper.appendChild(ratingBtn);
        imageWrapper.appendChild(counter);
      } else {
        card.appendChild(ratingBtn);
        card.appendChild(counter);
      }

      // Handle click
      ratingBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        rateGame(gameName, ratingBtn, counter);
      });
    }
  });
}

// Rate a game
function rateGame(gameName, btn, counter) {
  if (!gameRatings[gameName]) {
    gameRatings[gameName] = 0;
  }

  gameRatings[gameName]++;
  
  // Update button
  btn.classList.add('animate', 'rated');
  counter.textContent = gameRatings[gameName];

  // Save ratings
  saveRatings();

  // Remove animation class after it completes
  setTimeout(() => {
    btn.classList.remove('animate');
  }, 600);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for games to be rendered
  setTimeout(() => {
    initializeFilters();
    initializeRatingButtons();

    // Reinitialize rating buttons when games are loaded dynamically
    const observer = new MutationObserver(() => {
      initializeRatingButtons();
    });

    const gameGrid = document.querySelector('.game-grid');
    if (gameGrid) {
      observer.observe(gameGrid, { childList: true, subtree: true });
    }
  }, 500);
});

// Export for external use
if (typeof window !== 'undefined') {
  window.gameFilters = {
    setCategory: (gameName, categories) => {
      gameCategories[gameName] = categories;
      // Re-init filters if they're already created
      const filterContainer = document.querySelector('.game-filters-container');
      if (filterContainer && filterContainer.children.length > 0) {
        initializeFilters();
      }
    },
    getCategories: () => gameCategories,
    getRatings: () => gameRatings
  };
}
