document.addEventListener('DOMContentLoaded', () => {
  const favoritesGrid = document.getElementById('favoritesGrid');
  const emptyMsg = document.getElementById('favorites-empty-msg');
  const contextMenu = document.getElementById('custom-context-menu');
  const deleteModal = document.getElementById('delete-modal-overlay');
  const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
  const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
  const ctxFavorite = document.getElementById('ctx-favorite');
  const ctxDelete = document.getElementById('ctx-delete');

  let selectedGameCard = null;
  let favoriteGames = JSON.parse(localStorage.getItem('nullx_favorites')) || [];

  // Function to build game cards on the favorites screen
  function renderFavorites() {
    // Clear old cards out (except the empty screen text template)
    const cards = favoritesGrid.querySelectorAll('.game-card');
    cards.forEach(c => c.remove());

    if (favoriteGames.length === 0) {
      emptyMsg.style.display = 'block';
    } else {
      emptyMsg.style.display = 'none';
      
      // Generate cards for saved items
      favoriteGames.forEach(gameTitle => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.style.position = 'relative';
        card.style.cursor = 'pointer';
        card.innerHTML = `<h3>${gameTitle}</h3><p>Saved Game</p>`;
        favoritesGrid.appendChild(card);
      });
    }
  }

  // Right-click menu listener on this page
  document.addEventListener('contextmenu', (e) => {
    const card = e.target.closest('.game-card');
    if (card) {
      e.preventDefault();
      selectedGameCard = card;

      contextMenu.style.left = `${e.clientX}px`;
      contextMenu.style.top = `${e.clientY}px`;
      contextMenu.style.display = 'block';
    } else {
      contextMenu.style.display = 'none';
    }
  });

  // Hide popup on click away
  document.addEventListener('click', () => { contextMenu.style.display = 'none'; });

  // "Unfavorite Game" Action
  ctxFavorite.addEventListener('click', () => {
    if (!selectedGameCard) return;
    const title = selectedGameCard.querySelector('h3').textContent;
    favoriteGames = favoriteGames.filter(g => g !== title);
    localStorage.setItem('nullx_favorites', JSON.stringify(favoriteGames));
    renderFavorites();
  });

  // "Delete Game" Action -> Launches Modal Prompt
  ctxDelete.addEventListener('click', () => {
    if (selectedGameCard) {
      deleteModal.style.display = 'flex';
    }
  });

  // Confirm delete button click
  confirmDeleteBtn.addEventListener('click', () => {
    if (selectedGameCard) {
      const title = selectedGameCard.querySelector('h3').textContent;
      favoriteGames = favoriteGames.filter(g => g !== title);
      localStorage.setItem('nullx_favorites', JSON.stringify(favoriteGames));
      renderFavorites();
    }
    deleteModal.style.display = 'none';
  });

  // Cancel delete button click
  cancelDeleteBtn.addEventListener('click', () => {
    deleteModal.style.display = 'none';
  });

  // Initial render layout check
  renderFavorites();
});
