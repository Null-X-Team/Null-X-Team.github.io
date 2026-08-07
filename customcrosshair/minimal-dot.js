/**
 * Null_X Crosshair Style — minimal-dot
 * Self-contained. Controlled by customcrosshair/loader.js
 */
(function() {
    if (window.__nxCrosshairActiveStyle === 'minimal-dot') return;
    window.__nxCrosshairActiveStyle = 'minimal-dot';

    const old = document.getElementById('unique-crosshair');
    if (old) old.remove();
    document.querySelectorAll('style[data-nx-crosshair]').forEach(s => s.remove());

    const style = document.createElement('style');
    style.setAttribute('data-nx-crosshair', 'minimal-dot');
    style.innerHTML = `
        body, a, button, iframe, .game-card, .clickable, [role="button"], input, textarea, [contenteditable="true"] {
            cursor: none !important;
        }
        html.crosshair-paused,
        html.crosshair-paused body,
        html.crosshair-paused a,
        html.crosshair-paused button,
        html.crosshair-paused iframe,
        html.crosshair-paused .game-card,
        html.crosshair-paused .clickable,
        html.crosshair-paused [role="button"],
        html.crosshair-paused input,
        html.crosshair-paused textarea,
        html.crosshair-paused [contenteditable="true"] {
            cursor: auto !important;
        }
        html.crosshair-paused #unique-crosshair {
            display: none !important; opacity: 0 !important; visibility: hidden !important;
        }
        #unique-crosshair {
            position: fixed; width: 80px; height: 80px;
            pointer-events: none !important; z-index: 2147483647 !important;
            transform: translate(-50%, -50%);
            display: flex; align-items: center; justify-content: center;
            transition: opacity 0.15s ease;
        }
        .crosshair-hidden { opacity: 0 !important; }
        .xhair-core {
            position:absolute; width:8px; height:8px; background:rgba(255,255,255,0.9);
            border-radius:50%; box-shadow:0 0 6px rgba(255,255,255,0.5); z-index:5; transition:all 0.12s ease;
        }
        .xhair-ripple {
            position:absolute; width:8px; height:8px; border-radius:50%;
            border:2px solid rgba(255,255,255,0.6); opacity:0; pointer-events:none;
        }
        #unique-crosshair.targeting .xhair-core { background:#8b00ff; box-shadow:0 0 12px #8b00ff; width:10px; height:10px; }
        #unique-crosshair.text-input .xhair-core {
            width:2px; height:16px; border-radius:1px; background:#5eb0ff;
            box-shadow:0 0 10px #3aa0ff; animation: minPulse 0.8s ease-in-out infinite;
        }
        @keyframes minPulse { 0%,100%{ opacity:1; } 50%{ opacity:0.25; } }
        #unique-crosshair.clicking .xhair-core { transform:scale(0.4); background:#fff; }
        #unique-crosshair.clicking .xhair-ripple {
            animation: minRipple 0.35s ease-out forwards;
        }
        @keyframes minRipple {
            0% { width:8px; height:8px; opacity:0.8; }
            100% { width:48px; height:48px; opacity:0; }
        }
    `;
    document.head.appendChild(style);

    const crosshair = document.createElement('div');
    crosshair.id = 'unique-crosshair';
    crosshair.className = 'crosshair-hidden';
    crosshair.innerHTML = `<div class="xhair-core"></div><div class="xhair-ripple"></div>`;
    function attach() {
        if (!document.body) { document.addEventListener('DOMContentLoaded', attach, { once: true }); return; }
        if (!document.getElementById('unique-crosshair')) document.body.appendChild(crosshair);
    }
    attach();

    let crosshairEnabled = false;
    function isEducationalCloakActive() {
        if (localStorage.getItem('disableStudyCloak') === 'true') return false;
        const cloak = document.getElementById('educational-cloak');
        if (!cloak || cloak.classList.contains('hidden')) return false;
        try {
            const cs = window.getComputedStyle(cloak);
            if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false;
        } catch (e) {}
        return true;
    }
    function pauseCrosshair() {
        crosshairEnabled = false;
        document.documentElement.classList.add('crosshair-paused');
        crosshair.classList.add('crosshair-hidden');
    }
    function resumeCrosshair() {
        crosshairEnabled = true;
        document.documentElement.classList.remove('crosshair-paused');
    }
    function waitForCloakThenEnable() {
        if (!isEducationalCloakActive()) { resumeCrosshair(); return; }
        pauseCrosshair();
        const cloak = document.getElementById('educational-cloak');
        let done = false;
        const finish = () => {
            if (done) return; done = true;
            try { observer.disconnect(); } catch (e) {}
            clearInterval(poll); clearTimeout(maxWait);
            resumeCrosshair();
        };
        const observer = new MutationObserver(() => { if (!isEducationalCloakActive()) finish(); });
        if (cloak) observer.observe(cloak, { attributes: true, attributeFilter: ['class', 'style'] });
        const poll = setInterval(() => { if (!isEducationalCloakActive()) finish(); }, 200);
        const maxWait = setTimeout(finish, 15000);
    }
    if (isEducationalCloakActive()) pauseCrosshair();
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', waitForCloakThenEnable);
    else waitForCloakThenEnable();

    let flareTimeout;
    const startFlare = () => { if (!crosshairEnabled) return; crosshair.classList.add('clicking'); clearTimeout(flareTimeout); };
    const stopFlare = () => { if (!crosshairEnabled) return; flareTimeout = setTimeout(() => crosshair.classList.remove('clicking'), 220); };

    window.addEventListener('mousemove', (e) => {
        if (!crosshairEnabled) return;
        crosshair.style.left = e.clientX + 'px';
        crosshair.style.top = e.clientY + 'px';
        crosshair.classList.remove('crosshair-hidden');
        const target = e.target; if (!target) return;
        const tag = target.tagName.toLowerCase();
        const isText = tag === 'input' || tag === 'textarea' || target.isContentEditable;
        if (isText) { crosshair.classList.add('text-input'); crosshair.classList.remove('targeting'); }
        else {
            crosshair.classList.remove('text-input');
            if (tag === 'a' || tag === 'button' || target.closest('a') || target.closest('button') || target.closest('.game-card') || target.closest('[role="button"]'))
                crosshair.classList.add('targeting');
            else crosshair.classList.remove('targeting');
        }
    });
    window.addEventListener('touchmove', (e) => {
        if (!crosshairEnabled || !e.touches.length) return;
        crosshair.style.left = e.touches[0].clientX + 'px';
        crosshair.style.top = e.touches[0].clientY + 'px';
        crosshair.classList.remove('crosshair-hidden');
    }, { passive: true });
    document.addEventListener('mouseleave', () => { if (crosshairEnabled) crosshair.classList.add('crosshair-hidden'); });
    document.addEventListener('mouseenter', () => { if (crosshairEnabled) crosshair.classList.remove('crosshair-hidden'); });
    window.addEventListener('mousedown', startFlare);
    window.addEventListener('mouseup', stopFlare);
    window.addEventListener('touchstart', startFlare, { passive: true });
    window.addEventListener('touchend', stopFlare, { passive: true });
})();
