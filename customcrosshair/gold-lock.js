/**
 * Null_X Crosshair Style — gold-lock
 */
(function() {
    if (window.__nxCrosshairActiveStyle === 'gold-lock') return;
    window.__nxCrosshairActiveStyle = 'gold-lock';
    const old = document.getElementById('unique-crosshair');
    if (old) old.remove();
    document.querySelectorAll('style[data-nx-crosshair]').forEach(s => s.remove());
    const style = document.createElement('style');
    style.setAttribute('data-nx-crosshair', 'gold-lock');
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
        .xhair-core { position:absolute; width:5px; height:5px; background:#ffd700; transform:rotate(45deg); box-shadow:0 0 12px #ffd700; z-index:5; transition:all 0.15s; }
        .xhair-bracket-container { position:absolute; width:48px; height:48px; transition:all 0.2s; }
        .xhair-bracket { position:absolute; width:14px; height:14px; border:2px solid #ffd700; filter:drop-shadow(0 0 5px #ffaa00); transition:all 0.15s; }
        .bracket-tl { top:0; left:0; border-right:none; border-bottom:none; }
        .bracket-tr { top:0; right:0; border-left:none; border-bottom:none; }
        .bracket-bl { bottom:0; left:0; border-right:none; border-top:none; }
        .bracket-br { bottom:0; right:0; border-left:none; border-top:none; }
        #unique-crosshair.targeting .xhair-core { background:#fff4a0; box-shadow:0 0 16px #ffd700; }
        #unique-crosshair.targeting .xhair-bracket { border-color:#fff4a0; }
        #unique-crosshair.text-input .xhair-core {
            width:14px; height:3px; border-radius:1px; transform:none; background:#ffd700;
            animation: goldCaret 1s ease-in-out infinite; box-shadow:0 0 8px #ffaa00;
        }
        #unique-crosshair.text-input .xhair-bracket-container { opacity:0; transform:scale(0.4) rotate(20deg); }
        @keyframes goldCaret { 0%,100%{ transform:translateY(6px); opacity:1; } 50%{ transform:translateY(10px); opacity:0.35; } }
        #unique-crosshair.clicking .xhair-core { transform:rotate(225deg) scale(2); background:#ff8800; box-shadow:0 0 24px #ffd700; }
        #unique-crosshair.clicking .xhair-bracket-container { width:80px; height:80px; transform:rotate(45deg); }
        #unique-crosshair.clicking .xhair-bracket { border-color:#ff8800; border-width:3px; }
    `;
    document.head.appendChild(style);
    const crosshair = document.createElement('div');
    crosshair.id = 'unique-crosshair';
    crosshair.className = 'crosshair-hidden';
    crosshair.innerHTML = `<div class="xhair-core"></div><div class="xhair-bracket-container"><div class="xhair-bracket bracket-tl"></div><div class="xhair-bracket bracket-tr"></div><div class="xhair-bracket bracket-bl"></div><div class="xhair-bracket bracket-br"></div></div>`;
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
