(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const isStealthMode = urlParams.get('mode') === 'stealth';

    if (window.top !== window.self && !isStealthMode) {
        // LAYER 1: Primary attempt (Redirect out to external utility)
        try {
            window.top.location.replace("https://docs.google.com");
        } catch (e1) {
            // LAYER 2: Fallback attempt (Redirect back to your own domain URL)
            try {
                window.top.location.replace(window.self.location.href);
            } catch (e2) {
                // LAYER 3: Ultimate Fallback (No redirects. Freeze and destroy page content visually)
                console.warn("Cross-origin redirection blocked. Initiating local interface freeze.");
                document.documentElement.innerHTML = `
                    <div style="
                        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
                        background: #000; color: #8b00ff; z-index: 99999999;
                        display: flex; flex-direction: column; align-items: center; justify-content: center;
                        font-family: monospace; padding: 20px; text-align: center; box-sizing: border-box;
                    ">
                        <h1 style="font-size: 24px; margin-bottom: 10px; border-bottom: 2px solid #8b00ff; padding-bottom: 10px;">ENVIRONMENTAL SECURITY FAULT</h1>
                        <p style="color: #ccc; font-size: 14px; max-width: 500px; margin: 0 auto 20px;">
                            This system dashboard cannot execute within embedded third-party viewport structures.
                        </p>
                        <div style="font-size: 11px; color: #444;">ERR_EMBED_RESTRICTION_TRIGGERED</div>
                    </div>
                `;
                window.stop();
                throw new Error("Execution halted due to framing restriction rules.");
            }
        }
    }
})();

// PLACEHOLDER_FULL_CONTENT_WILL_BE_REPLACED
