/**
 * Null_X Crosshair Style — None (system cursor)
 */
(function() {
    window.__nxCrosshairActiveStyle = 'none';
    const old = document.getElementById('unique-crosshair');
    if (old) old.remove();
    document.querySelectorAll('style[data-nx-crosshair]').forEach(s => s.remove());
    document.documentElement.classList.remove('crosshair-paused');
})();
