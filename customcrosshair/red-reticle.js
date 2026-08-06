/**
 * Null_X Crosshair Style — Red Reticle
 * Self-contained. Controlled by customcrosshair/loader.js via localStorage nxos_crosshair.
 */
(function() {
    if (window.__nxCrosshairActiveStyle === 'red-reticle') return;
    window.__nxCrosshairActiveStyle = 'red-reticle';

    const old = document.getElementById('unique-crosshair');
    if (old) old.remove();
    document.querySelectorAll('style[data-nx-crosshair]').forEach(s => s.remove());

    const style = document.createElement('style');
    style.setAttribute('data-nx-crosshair', 'red-reticle');
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
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
        }
        #unique-crosshair {
            position: fixed;
            width: 80px; height: 80px;
            pointer-events: none !important;
            z-index: 2147483647 !important;
            transform: translate(-50%, -50%);
            display: flex; align-items: center; justify-content: center;
            transition: opacity 0.2s ease;
        }
        .crosshair-hidden { opacity: 0 !important; }
        .xhair-core { position:absolute; width:4px; height:4px; background:#ff3333; border-radius:50%; box-shadow:0 0 8px #ff0000; z-index:5; }
        .xhair-ring-inner { position:absolute; width:20px; height:20px; border:2px solid rgba(255,50,50,0.7); border-radius:50%; }
        .xhair-ring-outer { position:absolute; width:40px; height:40px; border:1px solid rgba(255,50,50,0.35); border-radius:50%; }
        .xhair-axis { position:absolute; background:rgba(255,60,60,0.9); box-shadow:0 0 4px #ff0000; }
        .xhair-axis.top { width:1px; height:14px; top:4px; left:calc(50% - 0.5px); }
        .xhair-axis.bottom { width:1px; height:14px; bottom:4px; left:calc(50% - 0.5px); }
        .xhair-axis.left { width:14px; height:1px; left:4px; top:calc(50% - 0.5px); }
        .xhair-axis.right { width:14px; height:1px; right:4px; top:calc(50% - 0.5px); }
        #unique-crosshair.targeting .xhair-core { transform:scale(1.5); box-shadow:0 0 14px #ff6666; }
        #unique-crosshair.clicking .xhair-ring-outer { width:56px; height:56px; opacity:0.3; }
    `;
    document.head.appendChild(style);

    const crosshair = document.createElement('div');
    crosshair.id = 'unique-crosshair';
    crosshair.className = 'crosshair-hidden';
    crosshair.innerHTML = `
        <div class="xhair-core"></div>
        <div class="xhair-ring-inner"></div>
        <div class="xhair-ring-outer"></div>
        <div class="xhair-axis top"></div><div class="xhair-axis bottom"></div>
        <div class="xhair-axis left"></div><div class="xhair-axis right"></div>
`;
    document.body.appendChild(crosshair);

    let crosshairEnabled = false;
    function isEducationalCloakActive() {
        if (localStorage.getItem('disableStudyCloak') === 'true') return false;
        const cloak = document.getElementById('educational-cloak');
        if (!cloak) return false;
        if (cloak.classList.contains('hidden')) return false;
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
    const stopFlare = () => { if (!crosshairEnabled) return; flareTimeout = setTimeout(() => crosshair.classList.remove('clicking'), 200); };

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
