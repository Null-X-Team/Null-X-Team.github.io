// Master Dynamic Theme Switcher Engine
window.applyTheme = function(themeName) {
  // 1. Find all classes on the body that start with "theme-"
  const classesToRemove = Array.from(document.body.classList).filter(cls => 
    cls.startsWith('theme-')
  );
  
  // 2. Wipe them out completely
  classesToRemove.forEach(cls => document.body.classList.remove(cls));
  
  // 3. Apply the brand new theme class if it's not the default
  if (themeName && themeName !== 'default') {
    document.body.classList.add(`theme-${themeName}`);
  }
  
  // 4. Backup user configuration profile state to local storage
  localStorage.setItem('nullx-theme', themeName);
};

// Start system theme configurations on launch
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('nullx-theme') || 'default';
  window.applyTheme(savedTheme);
  
  // Attach click event listeners to the document to catch theme card clicks
  document.addEventListener('click', (e) => {
    // Look for the closest element with the 'theme-card' class
    const card = e.target.closest('.theme-card');
    if (card) {
      const selectedTheme = card.getAttribute('data-theme');
      if (selectedTheme) {
        window.applyTheme(selectedTheme);
      }
    }
  });
});
