/**
 * Custom Dynamic Lock-and-Flare Crosshair Engine for UBG Hubs
 * Features a 360-flip lock-in on hover, and an outward flare explosion on click.
 */
(function() {
    // 1. Inject the updated UI styling
    const style = document.createElement('style');
    style.innerHTML = `
        /* Hide the default desktop mouse pointer */
        body, a, button, iframe, .game-card, .clickable {
            cursor: none !important;
        }

        /* Root element wrapper setup */
        #unique-crosshair {
            position: fixed;
            width: 50px;
            height: 50px;
            pointer-events: none;
            z-index: 999999;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
            /* Smoothly transitions size and general opacity changes */
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
            /* Controls the rotation flip speed */
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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

        /* 1. HOVERING STATE (Targeting): Shrinks down tightly to "lock in" and executes a 360-degree flip */
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

        /* 2. CLICKING STATE: Flares outward wide from the locked position and flashes vibrant red */
        #unique-crosshair.clicking {
            width: 70px;
            height: 70px;
        }
        /* Maintain the 360-degree orientation if clicking while hovering, or default spin if clicked instantly */
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
    
    // Nest brackets inside a container so we can cleanly spin them together
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

    // 3. Automation tracking & state triggers
    window.addEventListener('mousemove', (e) => {
        crosshair.style.left = e.clientX + 'px';
        crosshair.style.top = e.clientY + 'px';
        crosshair.classList.remove('crosshair-hidden');
        
        // Detect UI layout hover targets
        const targetTag = e.target.tagName.toLowerCase();
        if (targetTag === 'a' || targetTag === 'button' || e.target.classList.contains('game-card') || targetTag === 'iframe') {
            crosshair.classList.add('targeting');
        } else {
            crosshair.classList.remove('targeting');
        }
    });

    // Viewport bound safety checks
    document.addEventListener('mouseleave', () => crosshair.classList.add('crosshair-hidden'));
    document.addEventListener('mouseenter', () => crosshair.classList.remove('crosshair-hidden'));

    // Handle mouse click hold mechanics (Outward Flare)
    window.addEventListener('mousedown', () => crosshair.classList.add('clicking'));
    window.addEventListener('mouseup', () => crosshair.classList.remove('clicking'));
})();
