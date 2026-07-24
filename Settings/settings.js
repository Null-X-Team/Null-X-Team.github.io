import { applyCloak } from '../Cloaks/Cloaks.js';

// ==========================================
// Settings Module Configuration
// ==========================================

// Utility function to set/apply theme across the site
function setTheme(themeName) {
    // 1. Save theme to local storage
    localStorage.setItem('selectedTheme', themeName);

    // 2. Apply theme attribute to html/body elements for CSS theme engines
    document.documentElement.setAttribute('data-theme', themeName);
    document.body.setAttribute('data-theme', themeName);

    // 3. Highlight the selected card in settings UI
    document.querySelectorAll('.theme-card').forEach(card => {
        if (card.getAttribute('data-theme') === themeName) {
            card.style.borderColor = '#00ff66';
            card.style.boxShadow = '0 0 12px rgba(0, 255, 102, 0.4)';
        } else {
            card.style.borderColor = '';
            card.style.boxShadow = '';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. THEME SELECTION SYSTEM ---
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    setTheme(savedTheme);

    // Add click event listeners to all theme cards
    const themeCards = document.querySelectorAll('.theme-card');
    themeCards.forEach(card => {
        card.addEventListener('click', () => {
            const theme = card.getAttribute('data-theme');
            setTheme(theme);
        });
    });

    // --- 2. SPLASH / STUDY CLOAK CONTROL ---
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

    // --- 3. TAB CLOAK SELECTION ---
    const savedCloak = localStorage.getItem('savedCloak');
    if (savedCloak && savedCloak !== "none") {
        try { applyCloak(savedCloak); } catch(e) {}
    }

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

    // --- 4. MODAL CONTROLS ---
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

    // --- 5. GLOBAL PANIC KEY ---
    window.addEventListener('keydown', (e) => {
        if (e.key === localStorage.getItem('panicKey')) {
            window.location.href = localStorage.getItem('panicUrl') || "https://classroom.google.com";
        }
    });
});
