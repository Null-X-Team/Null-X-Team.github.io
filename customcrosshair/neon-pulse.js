/**
 * Null_X Crosshair Style — neon-pulse
 */
(function() {
    if (window.__nxCrosshairActiveStyle === 'neon-pulse') return;
    window.__nxCrosshairActiveStyle = 'neon-pulse';
    const old = document.getElementById('unique-crosshair');
    if (old) old.remove();
    document.querySelectorAll('style[data-nx-crosshair]').forEach(s => s.remove());
    const style = document.createElement('style');
    style.setAttribute('data-nx-crosshair', 'neon-pulse');
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
        .xhair-core { position:absolute; width:6px; height:6px; background:#ff00aa; border-radius:50%;
            box-shadow:0 0 12px #ff00aa,0 0 24px #00ffff; z-index:5; animation:nxPulse 1.2s ease-in-out infinite; transition:all 0.12s; }
        .xhair-ring-inner { position:absolute; width:28px; height:28px; border:2px solid rgba(255,0,170,0.5); border-radius:50%; animation:nxSpinR 6s linear infinite; transition:all 0.2s; }
        .xhair-ring-outer { position:absolute; width:48px; height:48px; border:1px solid rgba(0,255,255,0.4); border-radius:50%; animation:nxSpinN 9s linear infinite; transition:all 0.2s; }
        @keyframes nxPulse { 0%,100%{ transform:scale(1); } 50%{ transform:scale(1.35); } }
        @keyframes nxSpinN { to { transform:rotate(360deg); } }
        @keyframes nxSpinR { to { transform:rotate(-360deg); } }
        #unique-crosshair.targeting .xhair-core { background:#00ffff; box-shadow:0 0 16px #00ffff; animation:none; }
        #unique-crosshair.text-input .xhair-core {
            width:18px; height:2px; border-radius:1px; background:#00ffff;
            animation: neonScan 0.7s linear infinite; box-shadow:0 0 12px #00ffff, 0 0 4px #ff00aa;
        }
        #unique-crosshair.text-input .xhair-ring-inner,
        #unique-crosshair.text-input .xhair-ring-outer { opacity:0; }
        @keyframes neonScan { 0% { transform:translateX(-6px); opacity:0.4; } 50% { transform:translateX(6px); opacity:1; } 100% { transform:translateX(-6px); opacity:0.4; } }
        #unique-crosshair.clicking .xhair-core { background:#fff; animation:none; transform:scale(2.5); box-shadow:0 0 30px #ff00aa, 0 0 50px #00ffff; }
        #unique-crosshair.clicking .xhair-ring-inner { width:60px; height:60px; border-color:#00ffff; opacity:0.25; animation:none; }
        #unique-crosshair.clicking .xhair-ring-outer { width:90px; height:90px; border-color:#ff00aa; opacity:0.12; animation:none; }
    `;
    document.head.appendChild(style);
    const crosshair = document.createElement('div');
    crosshair.id = 'unique-crosshair';
    crosshair.className = 'crosshair-hidden';
    crosshair.innerHTML = `<div class="xhair-core"></div><div class="xhair-ring-inner"></div><div class="xhair-ring-outer"></div>`;
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
