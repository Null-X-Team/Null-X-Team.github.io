/**
 * Homescreen preference (classic vs Newhomepage/NXOS)
 * Loads on Settings/settings.html and injects the selector if missing.
 */
(function () {
  const KEY = 'nx_homescreen';
  function homeUrl(val) {
    return val === 'new' ? '../Newhomepage/index.html' : '../index.html';
  }
  function injectUI() {
    if (document.getElementById('homescreen-select')) return;
    const divider = document.querySelector('.settings-divider') || document.querySelector('hr');
    if (!divider || !divider.parentNode) return;
    const section = document.createElement('div');
    section.className = 'setting-section';
    section.style.marginBottom = '35px';
    section.innerHTML = `
      <h3 style="color: #a033ff; margin-bottom: 12px; font-size: 1.2rem;"><i class="fas fa-home" style="margin-right: 8px;"></i>Homescreen</h3>
      <p class="setting-label" style="color: #ccc; font-size: 0.9rem; margin-bottom: 12px;">Choose which homepage to use when you open the site. The new homescreen includes animated backgrounds, updated layout, console, and more features from <code>/Newhomepage</code>.</p>
      <label for="homescreen-select" class="setting-label" style="display: block; color: #ccc; font-size: 0.95rem; margin-bottom: 8px;">Active Homescreen:</label>
      <select id="homescreen-select" class="settings-input" style="width: 100%; max-width: 350px; padding: 10px; background: rgba(0,0,0,0.3); border: 1px solid rgba(139,0,255,0.3); color: white; border-radius: 6px; cursor: pointer;">
        <option value="classic">Classic Dashboard</option>
        <option value="new">New Homescreen (NXOS)</option>
      </select>
      <p style="color: #888; font-size: 0.8rem; margin-top: 8px;">Saved in this browser. Changing this will take you to the selected homescreen.</p>
    `;
    divider.parentNode.insertBefore(section, divider.nextSibling);
  }
  function wire() {
    injectUI();
    const select = document.getElementById('homescreen-select');
    const returnBtn = document.getElementById('return-home-btn') || document.querySelector('a[href*="index.html"]');
    const saved = localStorage.getItem(KEY) === 'new' ? 'new' : 'classic';
    if (select) {
      select.value = saved;
      select.addEventListener('change', () => {
        const val = select.value === 'new' ? 'new' : 'classic';
        localStorage.setItem(KEY, val);
        window.location.href = homeUrl(val);
      });
    }
    if (returnBtn) {
      returnBtn.id = returnBtn.id || 'return-home-btn';
      returnBtn.href = homeUrl(saved);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }
})();
