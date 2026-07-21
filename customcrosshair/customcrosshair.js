/**
 * Advanced Multi-Layered HUD Crosshair Engine
 * Features continuous idle rotation, intricate geometric layers, and dynamic state flaring.
 */
(function() {
    // 1. Inject the highly detailed UI styling
    const style = document.createElement('style');
    style.innerHTML = `
        /* Hide the default desktop mouse pointer */
        body, a, button, iframe, .game-card, .clickable, [role="button"] {
            cursor: none !important;
        }

        /* Root element wrapper setup */
        #unique-crosshair {
            position: fixed;
            width: 80px;
            height: 80px;
            pointer-events: none !important; 
            z-index: 2147483647 !important; /* Maximum z-index */
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.2s ease, transform 0.1s linear;
        }

        /* Auto-hide when the pointer leaves the screen bounds */
        .crosshair-hidden {
            opacity: 0 !important;
        }

        /* ========================================= */
        /* LAYER 1: The Diamond Core                 */
        /* ========================================= */
        .xhair-core {
            position: absolute;
            width: 6px;
            height: 6px;
            background: #00ffcc;
            transform: rotate(45deg);
            box-shadow: 0 0 10px #00ffcc, 0 0 20px #00ffcc;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 5;
        }

        /* ========================================= */
        /* LAYER 2: Inner Dotted Focus Ring          */
        /* ========================================= */
        .xhair-ring-inner {
            position: absolute;
            width: 24px;
            height: 24px;
            border: 2px dotted rgba(0, 255, 204, 0.6);
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(0, 255, 204, 0.3);
            animation: spinReverse 8s linear infinite;
            transition: all 0.3s ease;
        }

        /* ========================================= */
        /* LAYER 3: Outer Dashed Tracking Ring       */
        /* ========================================= */
        .xhair-ring-outer {
            position: absolute;
            width: 44px;
            height: 44px;
            border: 1px dashed rgba(0, 255, 204, 0.4);
            border-radius: 50%;
            animation: spinNormal 12s linear infinite;
            transition: all 0.3s ease;
        }

        /* ========================================= */
        /* LAYER 4: Tactical Axis Lines              */
        /* ========================================= */
        .xhair-axis {
            position: absolute;
            background: rgba(0, 255, 204, 0.8);
            box-shadow: 0 0 5px #00ffcc;
            transition: all 0.3s ease;
        }
        .xhair-axis.top    { width: 2px; height: 8px; top: 12px; }
        .xhair-axis.bottom { width: 2px; height: 8px; bottom: 12px; }
        .xhair-axis.left   { width: 8px; height: 2px; left: 12px; }
        .xhair-axis.right  { width: 8px; height: 2px; right: 12px; }

        /* ========================================= */
        /* LAYER 5: Outer Corner Brackets            */
        /* ========================================= */
        .xhair-bracket-container {
            position: absolute;
            width: 60px;
            height: 60px;
            transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), width 0.3s ease, height 0.3s ease;
        }
        .xhair-bracket {
            position: absolute;
            width: 12px;
            height: 12px;
            border: 2px solid #00ffcc;
            filter: drop-shadow(0 0 4px #00ffcc);
            transition: border-color 0.3s ease;
        }
        /* Intricate L-Shape cutouts for the corners */
        .bracket-tl { top: 0; left: 0; border-right: none; border-bottom: none; border-top-left-radius: 4px; }
        .bracket-tr { top: 0; right: 0; border-left: none; border-bottom: none; border-top-right-radius: 4px; }
        .bracket-bl { bottom: 0; left: 0; border-right: none; border-top: none; border-bottom-left-radius: 4px; }
        .bracket-br { bottom: 0; right: 0; border-left: none; border-top: none; border-bottom-right-radius: 4px; }

        /* ========================================= */
        /* CONTINUOUS IDLE ANIMATIONS                */
        /* ========================================= */
        @keyframes spinNormal { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes spinReverse { 0% { transform: rotate(360deg); } 100% { transform: rotate(0deg); } }

        /* ========================================= */
        /* INTERACTIVE STATE MODIFIERS               */
        /* ========================================= */

        /* 1. HOVERING STATE (Targeting): Shrinks tightly, turns Gold/Yellow, and rolls */
        #unique-crosshair.targeting .xhair-bracket-container {
            width: 38px;
            height: 38px;
            transform: rotate(360deg);
        }
        #unique-crosshair.targeting .xhair-ring-outer {
            width: 28px;
            height: 28px;
            border-color: rgba(255, 215, 0, 0.8);
        }
        #unique-crosshair.targeting .xhair-ring-inner {
            border-color: rgba(255, 215, 0, 0.8);
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }
        #unique-crosshair.targeting .xhair-core {
            background: #ffd700;
            box-shadow: 0 0 12px #ffd700;
            transform: rotate(180deg) scale(1.2);
        }
        #unique-crosshair.targeting .xhair-bracket {
            border-color: #ffd700;
            filter: drop-shadow(0 0 6px #ffd700);
        }
        #unique-crosshair.targeting .xhair-axis {
            background: #ffd700;
            box-shadow: 0 0 5px #ffd700;
        }
        /* Push axes out slightly when locked on */
        #unique-crosshair.targeting .xhair-axis.top { top: 6px; }
        #unique-crosshair.targeting .xhair-axis.bottom { bottom: 6px; }
        #unique-crosshair.targeting .xhair-axis.left { left: 6px; }
        #unique-crosshair.targeting .xhair-axis.right { right: 6px; }


        /* 2. CLICKING / TAPPING STATE: Flares outward violently, turns Crimson Red */
        #unique-crosshair.clicking .xhair-bracket-container {
            width: 85px;
            height: 85px;
            transform: rotate(45deg);
        }
        #unique-crosshair.clicking .xhair-ring-outer {
            width: 65px;
            height: 65px;
            border-color: rgba(255, 0, 85, 0.8);
            border-width: 2px;
        }
        #unique-crosshair.clicking .xhair-ring-inner {
            width: 40px;
            height: 40px;
            border-color: rgba(255, 0, 85, 0.9);
            border-style: solid; /* Becomes solid on click */
            box-shadow: 0 0 20px rgba(255, 0, 85, 0.6);
        }
        #unique-crosshair.clicking .xhair-core {
            background: #ff0055;
            box-shadow: 0 0 20px #ff0055;
            transform: rotate(225deg) scale(2);
        }
        #unique-crosshair.clicking .xhair-bracket {
            border-color: #ff0055;
            border-width: 3px;
            filter: drop-shadow(0 0 8px #ff0055);
        }
        #unique-crosshair.clicking .xhair-axis {
            background: #ff0055;
            box-shadow: 0 0 8px #ff0055;
        }
        /* Pull axes way out on blast */
        #unique-crosshair.clicking .xhair-axis.top { top: -2px; height: 14px;}
        #unique-crosshair.clicking .xhair-axis.bottom { bottom: -2px; height: 14px;}
        #unique-crosshair.clicking .xhair-axis.left { left: -2px; width: 14px;}
        #unique-crosshair.clicking .xhair-axis.right { right: -2px; width: 14px;}
    `;
    document.head.appendChild(style);

    // 2. Build the structural overlay elements dynamically
    const crosshair = document.createElement('div');
    crosshair.id = 'unique-crosshair';
    crosshair.className = 'crosshair-hidden';
    
    crosshair.innerHTML = `
        <div class="xhair-core"></div>
        <div class="xhair-ring-inner"></div>
        <div class="xhair-ring-outer"></div>
        
        <div class="xhair-axis top"></div>
        <div class="xhair-axis bottom"></div>
        <div class="xhair-axis left"></div>
        <div class="xhair-axis right"></div>

        <div class="xhair-bracket-container">
            <div class="xhair-bracket bracket-tl"></div>
            <div class="xhair-bracket bracket-tr"></div>
            <div class="xhair-bracket bracket-bl"></div>
            <div class="xhair-bracket bracket-br"></div>
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
