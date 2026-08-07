/**
 * Null_X Crosshair Style — mono-sharp
 */
(function() {
    if (window.__nxCrosshairActiveStyle === 'mono-sharp') return;
    window.__nxCrosshairActiveStyle = 'mono-sharp';
    const old = document.getElementById('unique-crosshair');
    if (old) old.remove();
    document.querySelectorAll('style[data-nx-crosshair]').forEach(s => s.remove());
    const style = document.createElement('style');
    style.setAttribute('data-nx-crosshair', 'mono-sharp');
    style.innerHTML = `
        body, a, button, iframe, .game-card, .clickable, [role="button"], input, textarea, [contenteditable="true"] { cursor: none !important; }
        html.crosshair-paused, html.crosshair-paused body, html.crosshair-paused a, html.crosshair-paused button,
        html.crosshair-paused iframe, html.crosshair-paused .game-card, html.crosshair-paused .clickable,
        html.crosshair-paused [role="button"], html.crosshair-paused input, html.crosshair-paused textarea,
        html.crosshair-paused [contenteditable="true"] { cursor: auto !important; }
        html.crosshair-paused #unique-crosshair { display: none !important; opacity: 0 !important; visibility: hidden !important; }
        #unique-crosshair { position: fixed; width: 80px; height: 80px; pointer-events: none !important; z-index: 2147483647 !important;
            transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center; transition: opacity 0.15s ease; }
        .crosshair-hidden { opacity: 0 !important; }
        .xhair-core { position:absolute; width:2px; height:2px; background:#e0e0e0; z-index:5; transition:all 0.1s; }
        .xhair-axis { position:absolute; background:rgba(220,220,220,0.85); transition:all 0.12s; }
        .xhair-axis.top { width:1px; height:12px; top:6px; left:calc(50% - 0.5px); }
        .xhair-axis.bottom { width:1px; height:12px; bottom:6px; left:calc(50% - 0.5px); }
        .xhair-axis.left { width:12px; height:1px; left:6px; top:calc(50% - 0.5px); }
        .xhair-axis.right { width:12px; height:1px; right:6px; top:calc(50% - 0.5px); }
        .xhair-ring-inner { position:absolute; width:22px; height:22px; border:1px solid rgba(200,200,200,0.5); border-radius:50%; transition:all 0.15s; }
        #unique-crosshair.targeting .xhair-core { background:#fff; box-shadow:0 0 6px #fff; }
        #unique-crosshair.targeting .xhair-axis { background:#fff; }
        #unique-crosshair.text-input .xhair-core {
            width:8px; height:14px; background:#c0c0c0; box-shadow:none;
            animation: monoBlock 1s step-end infinite;
        }
        #unique-crosshair.text-input .xhair-axis,
        #unique-crosshair.text-input .xhair-ring-inner { opacity:0; }
        @keyframes monoBlock { 0%,100%{ opacity:1; } 50%{ opacity:0; } }
        #unique-crosshair.clicking .xhair-core { background:#fff; transform:scale(2); }
        #unique-crosshair.clicking .xhair-axis.top { top:-4px; height:18px; }
        #unique-crosshair.clicking .xhair-axis.bottom { bottom:-4px; height:18px; }
        #unique-crosshair.clicking .xhair-axis.left { left:-4px; width:18px; }
        #unique-crosshair.clicking .xhair-axis.right { right:-4px; width:18px; }
        #unique-crosshair.clicking .xhair-ring-inner { width:36px; height:36px; opacity:0.25; }
    `;
    document.head.appendChild(style);
    const crosshair = document.createElement('div');
    crosshair.id = 'unique-crosshair';
    crosshair.className = 'crosshair-hidden';
    crosshair.innerHTML = `<div class="xhair-core"></div><div class="xhair-ring-inner"></div><div class="xhair-axis top"></div><div class="xhair-axis bottom"></div><div class="xhair-axis left"></div><div class="xhair-axis right"></div>`;
    function attach() { if (!document.body) { document.addEventListener('DOMContentLoaded', attach, { once: true }); return; } if (!document.getElementById('unique-crosshair')) document.body.appendChild(crosshair); }
    attach();
    let crosshairEnabled = false;
    function isEducationalCloakActive() {
        if (localStorage.getItem('disableStudyCloak') === 'true') return false;
        const cloak = document.getElementById('educational-cloak');
        if (!cloak || cloak.classList.contains('hidden')) return false;
        try { const cs = window.getComputedStyle(cloak); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false; } catch (e) {}
        return true;
    }
    function pauseCrosshair() { crosshairEnabled = false; document.documentElement.classList.add('crosshair-paused'); crosshair.classList.add('crosshair-hidden'); }
    function resumeCrosshair() { crosshairEnabled = true; document.documentElement.classList.remove('crosshair-paused'); }
    function waitForCloakThenEnable() {
        if (!isEducationalCloakActive()) { resumeCrosshair(); return; }
        pauseCrosshair();
        const cloak = document.getElementById('educational-cloak');
        let done = false;
        const finish = () => { if (done) return; done = true; try { observer.disconnect(); } catch (e) {} clearInterval(poll); clearTimeout(maxWait); resumeCrosshair(); };
        const observer = new MutationObserver(() => { if (!isEducationalCloakActive()) finish(); });
        if (cloak) observer.observe(cloak, { attributes: true, attributeFilter: ['class', 'style'] });
        const poll = setInterval(() => { if (!isEducationalCloakActive()) finish(); }, 200);
        const maxWait = setTimeout(finish, 15000);
    }
    if (isEducationalCloakActive()) pauseCrosshair();
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', waitForCloakThenEnable); else waitForCloakThenEnable();
    let flareTimeout;
    const startFlare = () => { if (!crosshairEnabled) return; crosshair.classList.add('clicking'); clearTimeout(flareTimeout); };
    const stopFlare = () => { if (!crosshairEnabled) return; flareTimeout = setTimeout(() => crosshair.classList.remove('clicking'), 220); };
    window.addEventListener('mousemove', (e) => {
        if (!crosshairEnabled) return;
        crosshair.style.left = e.clientX + 'px'; crosshair.style.top = e.clientY + 'px'; crosshair.classList.remove('crosshair-hidden');
        const target = e.target; if (!target) return;
        const tag = target.tagName.toLowerCase();
        const isText = tag === 'input' || tag === 'textarea' || target.isContentEditable;
        if (isText) { crosshair.classList.add('text-input'); crosshair.classList.remove('targeting'); }
        else {
            crosshair.classList.remove('text-input');
            if (tag === 'a' || tag === 'button' || target.closest('a') || target.closest('button') || target.closest('.game-card') || target.closest('[role="button"]')) crosshair.classList.add('targeting');
            else crosshair.classList.remove('targeting');
        }
    });
    window.addEventListener('touchmove', (e) => { if (!crosshairEnabled || !e.touches.length) return; crosshair.style.left = e.touches[0].clientX + 'px'; crosshair.style.top = e.touches[0].clientY + 'px'; crosshair.classList.remove('crosshair-hidden'); }, { passive: true });
    document.addEventListener('mouseleave', () => { if (crosshairEnabled) crosshair.classList.add('crosshair-hidden'); });
    document.addEventListener('mouseenter', () => { if (crosshairEnabled) crosshair.classList.remove('crosshair-hidden'); });
    window.addEventListener('mousedown', startFlare); window.addEventListener('mouseup', stopFlare);
    window.addEventListener('touchstart', startFlare, { passive: true }); window.addEventListener('touchend', stopFlare, { passive: true });
})();
