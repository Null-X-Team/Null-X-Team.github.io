import { applyCloak } from '../Cloaks/Cloaks.js';

// ==========================================
// Settings Module Configuration
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const cloakElement = document.getElementById('educational-cloak');
  const cloakTimerText = document.getElementById('cloak-timer');
  const isSplashDisabled = localStorage.getItem('disableStudyCloak') === 'true';

  const toggleStudyCloakInput = document.getElementById('toggle-study-cloak');
  if (toggleStudyCloakInput) {
    toggleStudyCloakInput.checked = isSplashDisabled;
    toggleStudyCloakInput.onchange = (e) => {
      localStorage.setItem('disableStudyCloak', e.target.checked ? 'true' : 'false');
    };
  }

  if (isSplashDisabled) {
    if (cloakElement) cloakElement.style.display = 'none';
  } else {
    let secs = 10; 
    if (cloakTimerText) cloakTimerText.textContent = secs;
    const loop = setInterval(() => {
      secs--;
      if (cloakTimerText) cloakTimerText.textContent = secs;
      if (secs <= 0) {
        clearInterval(loop);
        if (cloakElement) {
          cloakElement.style.opacity = '0';
          setTimeout(() => cloakElement.style.display = 'none', 500);
        }
      }
    }, 1000);
  }

  const savedCloak = localStorage.getItem('savedCloak');
  if (savedCloak && savedCloak !== "none") {
    try { applyCloak(savedCloak); } catch(e) {}
  }

  // Modal opening and closing controls
  if (document.getElementById('settingsBtn')) {
    document.getElementById('settingsBtn').onclick = () => {
      document.getElementById('settingsModal').style.display = 'flex';
    };
  }
  
  if (document.getElementById('closeSettings')) {
    document.getElementById('closeSettings').onclick = () => {
      document.getElementById('settingsModal').style.display = 'none';
    };
  }

  // Cloak selection handling
  const cloakSelector = document.getElementById('cloakSelector');
  if (cloakSelector) {
    if (savedCloak) cloakSelector.value = savedCloak;
    cloakSelector.onchange = (e) => {
      if (e.target.value === "none") {
        localStorage.removeItem('savedCloak');
      } else {
        localStorage.setItem('savedCloak', e.target.value);
      }
      location.reload();
    };
  }

  // Global Panic Key Handler
  window.addEventListener('keydown', (e) => {
    if (e.key === localStorage.getItem('panicKey')) {
      window.location.href = localStorage.getItem('panicUrl') || "https://classroom.google.com";
    }
  });
});
