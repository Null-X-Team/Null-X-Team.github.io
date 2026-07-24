/**
 * Professional Crosshair Engine
 * Sleek minimalist design with responsive states
 */
(function() {
    const style = document.createElement('style');
    style.innerHTML = `
        /* Hide default cursor everywhere */
        body, a, button, iframe, .game-card, .clickable, [role="button"], input, textarea, [contenteditable="true"] {
            cursor: none !important;
        }

        /* Crosshair container */
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

        .crosshair-hidden {
            opacity: 0 !important;
        }

        /* ========================================= */
        /* MINIMAL PROFESSIONAL CORE DESIGN          */
        /* ========================================= */

        /* Central dot - elegant and minimal */
        .xhair-core {
            position: absolute;
            width: 4px;
            height: 4px;
            background: #00d9ff;
            border-radius: 50%;
            box-shadow: 0 0 8px #00d9ff;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 5;
        }

        /* Primary tracking circle - clean and responsive */
        .xhair-ring-primary {
            position: absolute;
            width: 28px;
            height: 28px;
            border: 1.5px solid rgba(0, 217, 255, 0.6);
            border-radius: 50%;
            box-shadow: 0 0 8px rgba(0, 217, 255, 0.2);
            animation: spinSlow 8s linear infinite;
            transition: all 0.3s ease;
        }

        /* Secondary accent ring */
        .xhair-ring-secondary {
            position: absolute;
            width: 48px;
            height: 48px;
            border: 1px solid rgba(0, 217, 255, 0.3);
            border-radius: 50%;
            animation: spinReverse 12s linear infinite;
            transition: all 0.3s ease;
        }

        /* Minimal axis lines */
        .xhair-axis {
            position: absolute;
            background: rgba(0, 217, 255, 0.7);
            box-shadow: 0 0 4px #00d9ff;
            transition: all 0.3s cubic-bezier(0.1, 0.8, 0.2, 1);
        }

        .xhair-axis.top    { width: 1.5px; height: 6px; top: 14px; left: calc(50% - 0.75px); }
        .xhair-axis.bottom { width: 1.5px; height: 6px; bottom: 14px; left: calc(50% - 0.75px); }
        .xhair-axis.left   { width: 6px; height: 1.5px; left: 14px; top: calc(50% - 0.75px); }
        .xhair-axis.right  { width: 6px; height: 1.5px; right: 14px; top: calc(50% - 0.75px); }

        /* Corner accents - subtle and refined */
        .xhair-bracket-container {
            position: absolute;
            width: 52px;
            height: 52px;
            transition: transform 0.3s cubic-bezier(0.1, 0.8, 0.2, 1), width 0.3s ease, height 0.3s ease;
        }

        .xhair-bracket {
            position: absolute;
            width: 8px;
            height: 8px;
            border: 1.5px solid #00d9ff;
            opacity: 0.6;
            transition: all 0.3s ease;
        }

        .bracket-tl { top: 0; left: 0; border-right: none; border-bottom: none; }
        .bracket-tr { top: 0; right: 0; border-left: none; border-bottom: none; }
        .bracket-bl { bottom: 0; left: 0; border-right: none; border-top: none; }
        .bracket-br { bottom: 0; right: 0; border-left: none; border-top: none; }

        /* ========================================= */
        /* ANIMATIONS                                */
        /* ========================================= */

        @keyframes spinSlow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes spinReverse { 0% { transform: rotate(360deg); } 100% { transform: rotate(0deg); } }
        
        @keyframes expandPulse { 
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }

        @keyframes textCursorBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }

        /* ========================================= */
        /* TARGETING STATE (Buttons/Links)           */
        /* ========================================= */

        #unique-crosshair.targeting .xhair-core {
            background: #ffd700;
            box-shadow: 0 0 12px #ffd700;
            transform: scale(1.3);
        }

        #unique-crosshair.targeting .xhair-ring-primary {
            border-color: rgba(255, 215, 0, 0.9);
            box-shadow: 0 0 12px rgba(255, 215, 0, 0.4);
            animation: expandPulse 0.6s ease-in-out infinite;
            width: 36px;
            height: 36px;
        }

        #unique-crosshair.targeting .xhair-ring-secondary {
            border-color: rgba(255, 215, 0, 0.5);
            width: 56px;
            height: 56px;
        }

        #unique-crosshair.targeting .xhair-axis {
            background: #ffd700;
            box-shadow: 0 0 6px #ffd700;
        }

        #unique-crosshair.targeting .xhair-bracket {
            border-color: #ffd700;
            opacity: 1;
        }

        /* ========================================= */
        /* TEXT INPUT STATE (Precision Cursor)       */
        /* ========================================= */

        #unique-crosshair.text-input .xhair-core {
            width: 2px;
            height: 18px;
            background: linear-gradient(to bottom, #00e5ff, #0099cc);
            border-radius: 1px;
            box-shadow: 0 0 6px #00e5ff;
            transform: scale(1);
            animation: textCursorBlink 1s ease-in-out infinite;
        }

        #unique-crosshair.text-input .xhair-ring-primary,
        #unique-crosshair.text-input .xhair-ring-secondary {
            opacity: 0;
            transform: scale(0.3);
        }

        #unique-crosshair.text-input .xhair-axis {
            opacity: 0;
            transform: scale(0);
        }

        #unique-crosshair.text-input .xhair-bracket {
            opacity: 0;
        }

        /* Subtle underline beneath cursor */
        #unique-crosshair.text-input .xhair-bracket-container {
            width: 20px;
            height: 20px;
        }

        #unique-crosshair.text-input .bracket-bl,
        #unique-crosshair.text-input .bracket-br {
            border-width: 1px;
            border-top: none !important;
            border-right: 1px solid #00e5ff;
            border-left: 1px solid #00e5ff;
            border-bottom: 1px solid #00e5ff;
            opacity: 0.4;
            top: auto;
            bottom: -2px;
            width: 10px;
            height: 2px;
        }

        /* ========================================= */
        /* CLICKING STATE (Impact Feedback)          */
        /* ========================================= */

        #unique-crosshair.clicking .xhair-core {
            background: #ff4444;
            box-shadow: 0 0 18px #ff4444, 0 0 36px rgba(255, 68, 68, 0.5);
            transform: scale(1.8);
        }

        #unique-crosshair.clicking .xhair-ring-primary {
            width: 50px;
            height: 50px;
            border-color: rgba(255, 68, 68, 0.8);
            box-shadow: 0 0 16px rgba(255, 68, 68, 0.3);
            animation: none;
        }

        #unique-crosshair.clicking .xhair-ring-secondary {
            width: 70px;
            height: 70px;
            border-color: rgba(255, 68, 68, 0.4);
            opacity: 0.7;
            animation: none;
        }

        #unique-crosshair.clicking .xhair-axis {
            background: #ff4444;
            box-shadow: 0 0 8px #ff4444;
        }

        #unique-crosshair.clicking .xhair-axis.top    { top: 10px; height: 8px; }
        #unique-crosshair.clicking .xhair-axis.bottom { bottom: 10px; height: 8px; }
        #unique-crosshair.clicking .xhair-axis.left   { left: 10px; width: 8px; }
        #unique-crosshair.clicking .xhair-axis.right  { right: 10px; width: 8px; }

        #unique-crosshair.clicking .xhair-bracket {
            border-color: #ff4444;
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // Create the crosshair element
    const crosshair = document.createElement('div');
    crosshair.id = 'unique-crosshair';
    crosshair.className = 'crosshair-hidden';

    crosshair.innerHTML = `
        <div class="xhair-core"></div>
        <div class="xhair-ring-primary"></div>
        <div class="xhair-ring-secondary"></div>

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

    // Flare state management
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

    // Track mouse movement
    window.addEventListener('mousemove', (e) => {
        crosshair.style.left = e.clientX + 'px';
        crosshair.style.top = e.clientY + 'px';
        crosshair.classList.remove('crosshair-hidden');

        const target = e.target;
        if (!target) return;

        const targetTag = target.tagName.toLowerCase();

        // Check for text inputs
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

            // Check for interactive elements
            if (
                targetTag === 'a' ||
                targetTag === 'button' ||
                targetTag === 'iframe' ||
                target.classList.contains('game-card') ||
                target.closest('.game-card') ||
                target.closest('.game-container') ||
                target.closest('button') ||
                target.closest('a') ||
                target.closest('[role="button"]') ||
                window.getComputedStyle(target).cursor === 'pointer'
            ) {
                crosshair.classList.add('targeting');
            } else {
                crosshair.classList.remove('targeting');
            }
        }
    });

    // Touch support
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            crosshair.style.left = e.touches[0].clientX + 'px';
            crosshair.style.top = e.touches[0].clientY + 'px';
            crosshair.classList.remove('crosshair-hidden');
        }
    }, { passive: true });

    // Viewport management
    document.addEventListener('mouseleave', () => crosshair.classList.add('crosshair-hidden'));
    document.addEventListener('mouseenter', () => crosshair.classList.remove('crosshair-hidden'));

    // Click feedback
    window.addEventListener('mousedown', startFlare);
    window.addEventListener('mouseup', stopFlare);
    window.addEventListener('touchstart', startFlare, { passive: true });
    window.addEventListener('touchend', stopFlare, { passive: true });
})();
