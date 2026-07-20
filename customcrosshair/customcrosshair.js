/**
 * Custom Gaming Crosshair Engine for UBG Hubs
 * Automatically creates styles and DOM markup to inject a neon tactical crosshair.
 */
(function() {
    // 1. Create and inject required CSS styles
    const style = document.createElement('style');
    style.innerHTML = `
        /* Hide default cursor on interactive site elements */
        body, a, button, iframe, .game-card, .clickable {
            cursor: none !important;
        }

        /* Container styling for the tactical cursor wrapper */
        #custom-crosshair {
            position: fixed;
            width: 40px;
            height: 40px;
            pointer-events: none;
            z-index: 999999;
            transform: translate(-50%, -50%);
            transition: opacity 0.12s ease, transform 0.05s linear;
        }

        /* Auto-hide states */
        .crosshair-hidden {
            opacity: 0 !important;
        }

        /* Center neon pixel dot */
        .crosshair-dot {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 4px;
            height: 4px;
            background-color: #00ff9d;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 6px #00ff9d;
        }

        /* Generic shared properties for tactical hashmarks */
        .crosshair-line {
            position: absolute;
            background-color: #00ff9d;
            box-shadow: 0 0 6px #00ff9d;
        }

        /* Vertical axis alignments */
        .crosshair-line.top, .crosshair-line.bottom {
            width: 2px;
            height: 10px;
            left: calc(50% - 1px);
        }
        .crosshair-line.top { top: 4px; }
        .crosshair-line.bottom { bottom: 4px; }

        /* Horizontal axis alignments */
        .crosshair-line.left, .crosshair-line.right {
            width: 10px;
            height: 2px;
            top: calc(50% - 1px);
        }
        .crosshair-line.left { left: 4px; }
        .crosshair-line.right { right: 4px; }

        /* Scale boost animations upon holding mouse down clicks */
        #custom-crosshair.clicking {
            transform: translate(-50%, -50%) scale(1.35);
        }
    `;
    document.head.appendChild(style);

    // 2. Build DOM markup dynamically so you don't have to touch your HTML body
    const crosshair = document.createElement('div');
    crosshair.id = 'custom-crosshair';
    crosshair.className = 'crosshair-hidden';
    crosshair.innerHTML = `
        <div class="crosshair-dot"></div>
        <div class="crosshair-line top"></div>
        <div class="crosshair-line right"></div>
        <div class="crosshair-line bottom"></div>
        <div class="crosshair-line left"></div>
    `;
    document.body.appendChild(crosshair);

    // 3. Track coordinates and drive interface states
    window.addEventListener('mousemove', (e) => {
        crosshair.style.left = e.clientX + 'px';
        crosshair.style.top = e.clientY + 'px';
        crosshair.classList.remove('crosshair-hidden');
    });

    document.addEventListener('mouseleave', () => {
        crosshair.classList.add('crosshair-hidden');
    });

    document.addEventListener('mouseenter', () => {
        crosshair.classList.remove('crosshair-hidden');
    });

    window.addEventListener('mousedown', () => {
        crosshair.classList.add('clicking');
    });

    window.addEventListener('mouseup', () => {
        crosshair.classList.remove('clicking');
    });
})();
