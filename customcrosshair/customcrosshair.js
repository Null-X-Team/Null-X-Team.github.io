/**
 * Custom Dynamic Lock-and-Flare Crosshair Engine for UBG Hubs
 * MODIFIED: The outward flare animation now fires on both mouse clicks and touch/trackpad taps.
 */
(function() {
    // 1. Inject the optimized UI styling
    const style = document.createElement('style');
    style.innerHTML = `
        /* Hide the default desktop mouse pointer */
        body, a, button, iframe, .game-card, .clickable, [role="button"] {
            cursor: none !important;
        }

        /* Root element wrapper setup */
        #unique-crosshair {
            position: fixed;
            width: 50px;
            height: 50px;
            pointer-events: none !important; 
            z-index: 2147483647 !important; /* Maximum z-index to stay above modal views */
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.2s ease, width 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), height 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        /* Auto-hide when the pointer leaves the screen bounds */
        .crosshair-hidden {
            opacity: 0 !important;
        }

        /* Center Dot Core */
        .crosshair-core {
            position: absolute;
            width: 4px;
            height: 4px;
            background: #00ffcc;
            border-radius: 50%;
            box-shadow: 0 0 8px #00ffcc;
            transition: background 0.2s ease, transform 0.2s ease;
        }

        /* Tactical Container holding the outer brackets */
        .crosshair-bracket-container {
            position: absolute;
            width: 100%;
            height: 100%;
            transition: transform 0.7s cubic-bezier(0.25, 1, 0.5, 1);
        }

        /* Modern Corner Brackets */
        .crosshair-bracket {
            position: absolute;
            width: 8px;
            height: 8px;
            border: 2px solid #00ffcc;
            filter: drop-shadow(0 0 4px #00ffcc);
            transition: border-color 0.2s ease;
        }
        .bracket-tl { top: 0; left: 0; border-right: none; border-bottom: none; }
        .bracket-tr { top: 0; right: 0; border-left: none; border-bottom: none; }
        .bracket-bl { bottom: 0; left: 0; border-right: none; border-top: none; }
        .bracket-br { bottom: 0; right: 0; border-left: none; border-top: none; }

        /* ========================================= */
        /* INTERACTIVE STATE MODIFIERS               */
        /* ========================================= */

        /* 1. HOVERING STATE: Shrinks tightly and performs a smooth 360 roll */
        #unique-crosshair.targeting {
            width: 26px;
            height: 26px;
        }
        #unique-crosshair.targeting .crosshair-bracket-container {
            transform: rotate(360deg);
        }
        #unique-crosshair.targeting .crosshair-bracket {
            border-color: #ffff00;
            filter: drop-shadow(0 0 5px #ffff00);
        }
        #unique-crosshair.targeting .crosshair-core {
            background: #ffff00;
            box-shadow: 0 0 8px #ffff00;
            transform: scale(1.5);
        }

        /* 2. CLICKING / TAPPING STATE: Flares outward wide and flashes vibrant red */
        #unique-crosshair.clicking {
            width: 70px;
            height: 70px;
        }
        #unique-crosshair.clicking .crosshair-bracket-container {
            transform: rotate(360deg) scale(0.9);
        }
        #unique-crosshair.clicking .crosshair-bracket {
            border-color: #ff0055;
            filter: drop-shadow(0 0 8px #ff0055);
        }
        #unique-crosshair.clicking .crosshair-core {
            background: #ff0055;
            box-shadow: 0 0 15px #ff0055;
            transform: scale(2.5);
        }
    `;
    document.head.appendChild(style);

    // 2. Build the structural overlay elements dynamically
    const crosshair = document.createElement('div');
    crosshair.id = 'unique-crosshair';
    crosshair.className = 'crosshair-hidden';
    
    crosshair.innerHTML = `
        <div class="crosshair-core"></div>
        <div class="crosshair-bracket-container">
            <div class="crosshair-bracket bracket-tl"></div>
            <div class="crosshair-bracket bracket-tr"></div>
            <div class="crosshair-bracket bracket-bl"></div>
            <div class="crosshair-bracket bracket-br"></div>
        </div>
    `;
    document.body.appendChild(crosshair);

    // Helper functions to handle flare activation
    const startFlare = () => crosshair.classList.add('clicking');
    const stopFlare = () => crosshair.classList.remove('clicking');

    // 3. Automation tracking & state triggers
    window.addEventListener('mousemove', (e) => {
        crosshair.style.left = e.clientX + 'px';
        crosshair.style.top = e.clientY + 'px';
        crosshair.classList.remove('crosshair-hidden');
        
        const target = e.target;
        if (!target) return;
        
        const targetTag = target.tagName.toLowerCase();
        
        // Detect globally interactive triggers
        if (targetTag === 'a' || 
            targetTag === 'button' || 
            targetTag === 'iframe' || 
            target.classList.contains('game-card') || 
            target.closest('.game-card') ||
            target.closest('.game-container') ||
            target.closest('button') || 
            target.closest('a') ||
            target.closest('[role="button"]') ||
            window.getComputedStyle(target).cursor === 'pointer') {
            crosshair.classList.add('targeting');
        } else {
            crosshair.classList.remove('targeting');
        }
    });

    // Support tracking crosshair position on touchscreen drag movements
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            crosshair.style.left = e.touches[0].clientX + 'px';
            crosshair.style.top = e.touches[0].clientY + 'px';
            crosshair.classList.remove('crosshair-hidden');
        }
    }, { passive: true });

    // Viewport bound safety checks
    document.addEventListener('mouseleave', () => crosshair.classList.add('crosshair-hidden'));
    document.addEventListener('mouseenter', () => crosshair.classList.remove('crosshair-hidden'));

    // Handle traditional mouse clicks
    window.addEventListener('mousedown', startFlare);
    window.addEventListener('mouseup', stopFlare);

    // Handle mobile/trackpad screen touch taps
    window.addEventListener('touchstart', startFlare, { passive: true });
    window.addEventListener('touchend', stopFlare, { passive: true });
})();
