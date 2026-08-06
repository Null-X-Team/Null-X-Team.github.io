/**
 * Null_X Crosshair Loader
 * Loads the selected style from localStorage (nxos_crosshair).
 * Listens for settings picker changes (works in injected modals too).
 */
(function () {
    const STORAGE_KEY = 'nxos_crosshair';
    const DEFAULT_STYLE = 'cyan-hud';

    const CATALOG = {
        'cyan-hud': { file: 'cyan-hud.js', label: 'Cyan HUD (Original)' },
        'red-reticle': { file: 'red-reticle.js', label: 'Red Reticle' },
        'none': { file: 'none.js', label: 'None (System Cursor)' }
    };

    function getBasePath() {
        try {
            if (document.currentScript && document.currentScript.src) {
                return document.currentScript.src.replace(/[^/]+$/, '');
            }
        } catch (e) {}
        const path = window.location.pathname || '';
        if (path.includes('/Settings/') || path.includes('/settings')) {
            return '../customcrosshair/';
        }
        return 'customcrosshair/';
    }

    const BASE = getBasePath();
    let currentScriptEl = null;

    function getSelected() {
        const v = localStorage.getItem(STORAGE_KEY);
        return (v && CATALOG[v]) ? v : DEFAULT_STYLE;
    }

    function setSelected(id) {
        if (!CATALOG[id]) id = DEFAULT_STYLE;
        localStorage.setItem(STORAGE_KEY, id);
        applyStyle(id);
        syncPickers(id);
        return id;
    }

    function applyStyle(id) {
        if (!CATALOG[id]) id = DEFAULT_STYLE;

        if (currentScriptEl && currentScriptEl.parentNode) {
            currentScriptEl.parentNode.removeChild(currentScriptEl);
            currentScriptEl = null;
        }
        const old = document.getElementById('unique-crosshair');
        if (old) old.remove();
        document.querySelectorAll('style[data-nx-crosshair]').forEach(s => s.remove());
        window.__nxCrosshairActiveStyle = null;

        const script = document.createElement('script');
        script.src = BASE + CATALOG[id].file + '?v=' + Date.now();
        script.async = false;
        script.dataset.nxCrosshairLoader = '1';
        currentScriptEl = script;
        document.head.appendChild(script);
    }

    function syncPickers(id) {
        document.querySelectorAll('#crosshair-style-select, select[data-crosshair-select]').forEach(sel => {
            if (sel.value !== id) sel.value = id;
        });
        document.querySelectorAll('[data-crosshair-id]').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-crosshair-id') === id);
            btn.classList.toggle('crosshair-option-active', btn.getAttribute('data-crosshair-id') === id);
        });
    }

    function fillSelect(sel) {
        if (!sel || sel.dataset.nxFilled === '1') return;
        sel.innerHTML = Object.keys(CATALOG).map(id =>
            `<option value="${id}">${CATALOG[id].label}</option>`
        ).join('');
        sel.dataset.nxFilled = '1';
        sel.value = getSelected();
    }

    document.addEventListener('change', (e) => {
        const t = e.target;
        if (!t) return;
        if (t.id === 'crosshair-style-select' || t.matches('select[data-crosshair-select]')) {
            setSelected(t.value);
        }
    });
    document.addEventListener('click', (e) => {
        const btn = e.target && e.target.closest && e.target.closest('[data-crosshair-id]');
        if (btn) {
            e.preventDefault();
            setSelected(btn.getAttribute('data-crosshair-id'));
        }
    });

    const mo = new MutationObserver(() => {
        document.querySelectorAll('#crosshair-style-select, select[data-crosshair-select]').forEach(fillSelect);
        syncPickers(getSelected());
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });

    window.NxCrosshair = {
        catalog: CATALOG,
        get: getSelected,
        set: setSelected,
        apply: applyStyle
    };

    function boot() {
        document.querySelectorAll('#crosshair-style-select, select[data-crosshair-select]').forEach(fillSelect);
        applyStyle(getSelected());
        syncPickers(getSelected());
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
})();
