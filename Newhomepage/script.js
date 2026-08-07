/**
 * New homepage boot: themes, custom background image, settings sync
 */
(function () {
  const THEME_KEY = 'nxos_theme';
  const THEME_BG_KEY = 'nxos_theme_bg';
  const THEME_ACCENT_KEY = 'nxos_theme_accent';
  const BG_IMAGE_KEY = 'nxos_bg_image';
  const INTERACTIVE_BG_KEY = 'nxos_interactive_bg';

  function applyTheme() {
    const theme = localStorage.getItem(THEME_KEY) || 'crimson';
    const bg = localStorage.getItem(THEME_BG_KEY);
    const accent = localStorage.getItem(THEME_ACCENT_KEY);

    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);

    if (bg) {
      document.documentElement.style.setProperty('--nx-page-bg', bg);
      document.body.style.setProperty('--nx-page-bg', bg);
    }
    if (accent) {
      document.documentElement.style.setProperty('--nx-accent', accent);
      document.body.style.setProperty('--nx-accent', accent);
    }
  }

  function applyBackgroundImage() {
    let layer = document.getElementById('nx-custom-bg');
    const dataUrl = localStorage.getItem(BG_IMAGE_KEY);

    if (!dataUrl) {
      if (layer) layer.remove();
      document.body.classList.remove('has-custom-bg');
      return;
    }

    if (!layer) {
      layer = document.createElement('div');
      layer.id = 'nx-custom-bg';
      layer.setAttribute('aria-hidden', 'true');
      document.body.insertBefore(layer, document.body.firstChild);
    }

    layer.style.backgroundImage = 'url(' + dataUrl + ')';
    document.body.classList.add('has-custom-bg');
  }

  function applyInteractiveFlag() {
    const interactive = localStorage.getItem(INTERACTIVE_BG_KEY);
    const enabled = interactive === null ? true : interactive === 'true';
    document.body.classList.toggle('no-interactive-bg', !enabled);
    const canvas = document.getElementById('animated-background-canvas');
    if (canvas && !enabled) canvas.style.display = 'none';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      applyTheme();
      applyBackgroundImage();
      applyInteractiveFlag();
    });
  } else {
    applyTheme();
    applyBackgroundImage();
    applyInteractiveFlag();
  }

  window.NxHomeTheme = { applyTheme, applyBackgroundImage, applyInteractiveFlag };
})();


/* ---- original script ---- */
document.addEventListener("DOMContentLoaded", () => {
  const navTabs = document.querySelectorAll(".nav-tab-item");
  const contentSections = document.querySelectorAll(".content-section");

  navTabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      navTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const targetTab = tab.getAttribute("data-tab");

      contentSections.forEach(section => {
        section.classList.remove("active");
      });

      const targetSection = document.getElementById(targetTab + "-section");
      if (targetSection) {
        targetSection.classList.add("active");
      }
    });
  });

  const searchInput = document.getElementById("searchInput");
  const appCards = document.querySelectorAll(".app-card");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();

      appCards.forEach(card => {
        const labelText = card.querySelector(".app-label").textContent.toLowerCase();
        if (labelText.includes(searchTerm) || searchTerm === "") {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  document.querySelectorAll('.app-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      alert('Game would launch here! (Integration with main.js coming soon)');
    });
  });
});
