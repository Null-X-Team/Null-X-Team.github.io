// Function to apply a selected theme string
window.applyTheme = function(themeName) {
  // Remove any previously configured custom themes
  document.body.classList.remove('theme-midnight');
  
  if (themeName === 'midnight') {
    document.body.classList.add('theme-midnight');
  }
  
  // Save user preference locally
  localStorage.setItem('nullx-theme', themeName);
};

// Auto-load saved theme profile when the page boots up
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('nullx-theme') || 'default';
  window.applyTheme(savedTheme);
  
  // Add interactive event listeners to your Settings panel grid cards
  const themeCards = document.querySelectorAll('.theme-card');
  themeCards.forEach(card => {
    card.addEventListener('click', () => {
      const selectedTheme = card.getAttribute('data-theme');
      window.applyTheme(selectedTheme);
    });
  });
});
