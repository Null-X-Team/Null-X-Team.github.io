document.addEventListener('DOMContentLoaded', () => {
  const contextMenu = document.getElementById('custom-context-menu');
  const deleteModal = document.getElementById('delete-modal-overlay');
  const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
  const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
  const ctxFavorite = document.getElementById('ctx-favorite');
  const ctxDelete = document.getElementById('ctx-delete');

  let targetGameCard = null;

  // 1. Listen for right-click on game cards
  document.addEventListener('contextmenu', (e) => {
    const gameCard = e.target.closest('.game-card');
    
    if (gameCard) {
      e.preventDefault();
      targetGameCard = gameCard;

      // Update text menu text depending if it's already a favorite
      if (gameCard.classList.contains('is-favorite')) {
        ctxFavorite.textContent = 'Unfavorite Game';
      } else {
        ctxFavorite.textContent = 'Favorite Game';
      }

      // Position menu near cursor coordinates
      contextMenu.style.left = `${e.clientX}px`;
      contextMenu.style.top = `${e.clientY}px`;
      contextMenu.classList.remove('hidden');
    } else {
      contextMenu.classList.add('hidden');
    }
  });

  // 2. Hide context menu when clicking elsewhere
  document.addEventListener('click', () => {
    contextMenu.classList.add('hidden');
  });

  // 3. Handle Favorite Action
  ctxFavorite.addEventListener('click', () => {
    if (targetGameCard) {
      targetGameCard.classList.toggle('is-favorite');
      
      // Optional: Save changes to localStorage here if persistence is active
      const gameTitle = targetGameCard.querySelector('h3')?.textContent;
      console.log(`${gameTitle} favorite status changed.`);
    }
  });

  // 4. Handle Delete Request Action (Triggers Confirmation Prompt)
  ctxDelete.addEventListener('click', () => {
    if (targetGameCard) {
      deleteModal.style.display = 'flex';
    }
  });

  // 5. Confirm Removal Confirmation Selection
  confirmDeleteBtn.addEventListener('click', () => {
    if (targetGameCard) {
      targetGameCard.remove(); // Removes card directly from screen view
      targetGameCard = null;
    }
    deleteModal.style.display = 'none';
  });

  // 6. Cancel Action
  cancelDeleteBtn.addEventListener('click', () => {
    deleteModal.style.display = 'none';
    targetGameCard = null;
  });
});
