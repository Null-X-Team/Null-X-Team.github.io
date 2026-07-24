/**
 * Advanced Multi-Layered HUD Crosshair Engine
 * MODIFIED: Text input cursor fix & custom text input hover animation.
 */
(function() {
    // 1. Inject the highly detailed UI styling
    const style = document.createElement('style');
    style.innerHTML = `
        /* Hide the default desktop mouse pointer across all elements including text inputs */
        body, a, button, iframe, .game-card, .clickable, [role="button"], input, textarea, [contenteditable="true"] {
            cursor: none !important;
        }

        /* Root element wrapper setup */
        #unique-crosshair {
            position: fixed;
            width: 80px;
            height: 80px;
            pointer-events: none !important; 
            z-index: 2147483647 !important; 
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
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
            transition: all 0.5s ease, border-style 0.5s ease, animation 0.5s ease;
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
            transition: all 0.5s ease, border-style 0.5s ease, animation 0.5s ease;
        }

        /* ========================================= */
        /* LAYER 4: Tactical Axis Lines              */
        /* ========================================= */
        .xhair-axis {
            position: absolute;
            background: rgba(0, 255, 204, 0.8);
            box-shadow: 0 0 5px #00ffcc;
            transition: all 0.5s cubic-bezier(0.1, 0.8, 0.2, 1);
        }
        /* Explicitly centering the axis lines perfectly with the core */
        .xhair-axis.top    { width: 2px; height: 8px; top: 12px; left: calc(50% - 1px); }
        .xhair-axis.bottom { width: 2px; height: 8px; bottom: 12px; left: calc(50% - 1px); }
        .xhair-axis.left   { width: 8px; height: 2px; left: 12px; top: calc(50% - 1px); }
        .xhair-axis.right  { width: 8px; height: 2px; right: 12px; top: calc(50% - 1px); }

        /* ========================================= */
        /* LAYER 5: Outer Corner Brackets            */
        /* ========================================= */
        .xhair-bracket-container {
            position: absolute;
            width: 60px;
            height: 60px;
            transition: transform 0.5s cubic-bezier(0.1, 0.8, 0.2, 1), width 0.5s ease, height 0.5s ease, opacity 0.5s ease, animation 0.5s ease;
        }
        .xhair-bracket {
            position: absolute;
            width: 12px;
            height: 12px;
            border: 2px solid #00ffcc;
            filter: drop-shadow(0 0 4px #00ffcc);
            transition: border-color 0.5s ease, border-width 0.5s, all 0.5s ease, filter 0.5s ease;
        }
        .bracket-tl { top: 0; left: 0; border-right: none; border-bottom: none; border-top-left-radius: 4px; }
        .bracket-tr { top: 0; right: 0; border-left: none; border-bottom: none; border-top-right-radius: 4px; }
        .bracket-bl { bottom: 0; left: 0; border-right: none; border-top: none; border-bottom-left-radius: 4px; }
        .bracket-br { bottom: 0; right: 0; border-left: none; border-top: none; border-bottom-right-radius: 4px; }

        /* ========================================= */
        /* CONTINUOUS IDLE ANIMATIONS                */
        /* ========================================= */
        @keyframes spinNormal { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes spinReverse { 0% { transform: rotate(360deg); } 100% { transform: rotate(0deg); } }
        @keyframes caretPulse { 0% { opacity: 0.4; height: 16px; } 100% { opacity: 1; height: 22px; } }

        /* ========================================= */
        /* MECHANICAL SLAM-LOCK KEYFRAMES            */
        /* ========================================= */
        
        @keyframes lockAxisTop {
            0%   { top: 12px; }
            30%  { top: -20px; height: 4px; } 
            70%  { top: 40px; height: 2px; } 
            100% { top: 33px; height: 6px; } 
        }
        @keyframes lockAxisBottom {
            0%   { bottom: 12px; }
            30%  { bottom: -20px; height: 4px; }
            70%  { bottom: 40px; height: 2px; }
            100% { bottom: 33px; height: 6px; }
        }
        @keyframes lockAxisLeft {
            0%   { left: 12px; }
            30%  { left: -20px; width: 4px; }
            70%  { left: 40px; width: 2px; }
            100% { left: 33px; width: 6px; }
        }
        @keyframes lockAxisRight {
            0%   { right: 12px; }
            30%  { right: -20px; width: 4px; }
            70%  { right: 40px; width: 2px; }
            100% { right: 33px; width: 6px; }
        }

        /* ========================================= */
        /* TEXT INPUT ANIMATION - UNIQUE            */
        /* ========================================= */
        @keyframes textInputPulse {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
            50% { transform: scale(1.3) rotate(180deg); opacity: 0.7; }
        }

        @keyframes ringContract {
            0%, 100% { width: 24px; height: 24px; opacity: 0.6; }
            50% { width: 32px; height: 32px; opacity: 0.3; }
        }

        @keyframes ringContractOuter {
            0%, 100% { width: 44px; height: 44px; opacity: 0.4; }
            50% { width: 56px; height: 56px; opacity: 0.1; }
        }

        /* ========================================= */
        /* INTERACTIVE STATE MODIFIERS               */
        /* ========================================= */

        /* 1. HOVERING STATE (Targeting Buttons/Links) */
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
            box-shadow: 0 0 6px #ffd700;
        }
        #unique-crosshair.targeting .xhair-axis.top    { animation: lockAxisTop 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        #unique-crosshair.targeting .xhair-axis.bottom { animation: lockAxisBottom 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        #unique-crosshair.targeting .xhair-axis.left   { animation: lockAxisLeft 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        #unique-crosshair.targeting .xhair-axis.right  { animation: lockAxisRight 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; }

        /* 2. TEXT BOX HOVER STATE - UNIQUE SPIRAL VORTEX */
        @keyframes textVortex {
            0% { transform: rotate(0deg) scale(1); }
            100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes vortexPulse {
            0%, 100% { opacity: 1; box-shadow: 0 0 15px #ff00ff, 0 0 30px #ff00ff; }
            50% { opacity: 0.5; box-shadow: 0 0 8px #ff00ff, 0 0 15px #ff00ff; }
        }
        
        @keyframes bracketSpiral {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
        }
        
        #unique-crosshair.text-input .xhair-core {
            width: 8px;
            height: 8px;
            background: #ff00ff;
            border-radius: 50%;
            box-shadow: 0 0 15px #ff00ff, 0 0 30px #ff00ff;
            animation: vortexPulse 1.2s ease-in-out infinite;
            transform: rotate(0deg);
        }
        
        #unique-crosshair.text-input .xhair-ring-inner {
            width: 32px;
            height: 32px;
            border: 2px dotted #ff00ff;
            border-style: dotted;
            border-radius: 50%;
            box-shadow: 0 0 12px #ff00ff;
            opacity: 0.8;
            animation: textVortex 2s linear infinite;
        }
        
        #unique-crosshair.text-input .xhair-ring-outer {
            width: 56px;
            height: 56px;
            border: 1px solid #ff00ff;
            border-style: solid;
            border-radius: 50%;
            box-shadow: 0 0 8px #ff00ff;
            opacity: 0.6;
            animation: textVortex 3s linear infinite reverse;
        }
        
        #unique-crosshair.text-input .xhair-bracket-container {
            animation: bracketSpiral 3s linear infinite;
        }
        
        #unique-crosshair.text-input .xhair-bracket {
            border-color: #ff00ff;
            filter: drop-shadow(0 0 5px #ff00ff);
            opacity: 0.7;
        }
        
        #unique-crosshair.text-input .xhair-axis {
            background: #ff00ff;
            box-shadow: 0 0 6px #ff00ff;
            opacity: 0.5;
        }

        /* 3. CLICKING / TAPPING STATE: Heavy Red Recoil & Flare */
        
        #unique-crosshair.clicking .xhair-bracket-container {
            width: 95px;
            height: 95px;
            transform: rotate(45deg) scale(1.15); 
            transition: all 0.12s cubic-bezier(0.1, 0.8, 0.2, 1);
        }
        
        #unique-crosshair.clicking .xhair-ring-outer {
            width: 80px;
            height: 80px;
            opacity: 0;
            border-color: #ff3333;
            border-width: 2px;
            transform: scale(1.4);
            transition: all 0.25s ease-out;
        }
        #unique-crosshair.clicking .xhair-ring-inner {
            width: 60px;
            height: 60px;
            opacity: 0;
            background: rgba(255, 0, 0, 0.4);
            border-color: #ff0000;
            box-shadow: 0 0 30px #ff0000;
            transform: scale(1.8);
            transition: all 0.25s ease-out;
        }
        
        #unique-crosshair.clicking .xhair-core {
            background: #ff3333;
            box-shadow: 0 0 20px #ff0000, 0 0 40px #ff5555;
            transform: rotate(225deg) scale(2.5);
            transition: all 0.12s ease-out;
        }
        
        #unique-crosshair.clicking .xhair-bracket {
            border-color: #ff3333;
            border-width: 3px;
            filter: drop-shadow(0 0 10px #ff0000);
        }
        
        #unique-crosshair.clicking .xhair-axis {
            animation: none !important; 
            background: #ff3333 !important;
            box-shadow: 0 0 12px #ff0000 !important;
            opacity: 1 !important;
            transition: all 0.12s cubic-bezier(0.1, 0.8, 0.2, 1);
        }
        #unique-crosshair.clicking .xhair-axis.top    { top: -14px !important; height: 18px !important; }
        #unique-crosshair.clicking .xhair-axis.bottom { bottom: -14px !important; height: 18px !important; }
        #unique-crosshair.clicking .xhair-axis.left   { left: -14px !important; width: 18px !important; }
        #unique-crosshair.clicking .xhair-axis.right  { right: -14px !important; width: 18px !important; }
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

    // Helper functions to handle flare activation with tap-guarantee timers
    let flareTimeout;
    const startFlare = () => {
        crosshair.classList.add('clicking');
        clearTimeout(flareTimeout);
    };
    
    const stopFlare = () => {
        flareTimeout = setTimeout(() => {
            crosshair.classList.remove('clicking');
        }, 200); 
    };

    // 3. Automation tracking & state triggers
    window.addEventListener('mousemove', (e) => {
        crosshair.style.left = e.clientX + 'px';
        crosshair.style.top = e.clientY + 'px';
        crosshair.classList.remove('crosshair-hidden');
        
        const target = e.target;
        if (!target) return;
        
        const targetTag = target.tagName.toLowerCase();
        
        // Detect text box / editable text targets
        const isTextInput = (
            targetTag === 'input' || 
            targetTag === 'textarea' || 
            target.isContentEditable || 
            target.getAttribute('contenteditable') === 'true'
        );

        if (isTextInput) {
            crosshair.classList.add('text-input');
            crosshair.classList.remove('targeting');
        } else {
            crosshair.classList.remove('text-input');

            // Detect globally interactive triggers (Buttons, Links, Cards)
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
