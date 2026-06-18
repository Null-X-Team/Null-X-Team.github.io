document.addEventListener('DOMContentLoaded', () => {
  const contextMenu = document.getElementById('custom-context-menu');
  const deleteModal = document.getElementById('delete-modal-overlay');
  const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
  const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
  const ctxFavorite = document.getElementById('ctx-favorite');
  const ctxDelete = document.getElementById('ctx-delete');

  let targetGameCard = null;

  // 1. Right click detection on game cards
  document.addEventListener('contextmenu', (e) => {
    const gameCard = e.target.closest('.game-card');
    
    if (gameCard) {
      e.preventDefault();
      targetGameCard = gameCard;

      // Position and show menu at exact cursor coordinates
      contextMenu.style.left = `${e.clientX}px`;
      contextMenu.style.top = `${e.clientY}px`;
      contextMenu.style.display = 'block';
    } else {
      contextMenu.style.display = 'none';
    }
  });

  // 2. Clear context menu clicking anywhere else
  document.addEventListener('click', (e) => {
    if (!contextMenu.contains(e.target)) {
      contextMenu.style.display = 'none';
    }
  });

  // 3. Remove from Favorites link action
  ctxFavorite.addEventListener('click', () => {
    if (targetGameCard) {
      targetGameCard.remove(); // Removes visual item
      contextMenu.style.display = 'none';
    }
  });

  // 4. Delete Action trigger -> Shows modal overlay
  ctxDelete.addEventListener('click', () => {
    contextMenu.style.display = 'none';
    if (targetGameCard) {
      deleteModal.style.display = 'flex';
    }
  });

  // 5. Confirm Removal Click handler
  confirmDeleteBtn.addEventListener('click', () => {
    if (targetGameCard) {
      targetGameCard.remove();
      targetGameCard = null;
    }
    deleteModal.style.display = 'none';
  });

  // 6. Dismiss Modal Selection
  cancelDeleteBtn.addEventListener('click', () => {
    deleteModal.style.display = 'none';
    targetGameCard = null;
  });
});
