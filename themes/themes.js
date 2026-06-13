// Master Dynamic Theme Switcher Engine
window.applyTheme = function(themeName) {
  // Read all existing classes attached to the body tag
  const classes = Array.from(document.body.classList);
  
  // Wipe out any old theme flags safely
  classes.forEach(cls => {
    if (cls.startsWith('theme-')) {
      document.body.classList.remove(cls);
    }
  });
  
  // Apply requested theme profile layout
  if (themeName !== 'default') {
    document.body.classList.add(`theme-${themeName}`);
  }
  
  // Backup user configuration profile state
  localStorage.setItem('nullx-theme', themeName);
};

// Start system theme configurations on launch
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('nullx-theme') || 'default';
  window.applyTheme(savedTheme);
  
  // Attach event handlers natively into layout click targets
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.theme-card');
    if (card) {
      const selectedTheme = card.getAttribute('data-theme');
      if (selectedTheme) {
        window.applyTheme(selectedTheme);
      }
    }
  });
});
