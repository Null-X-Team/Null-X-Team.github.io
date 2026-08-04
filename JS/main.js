(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const isStealthMode = urlParams.get('mode') === 'stealth';

    if (window.top !== window.self && !isStealthMode) {
        try {
            window.top.location.replace("https://docs.google.com");
        } catch (e1) {
            try {
                window.top.location.replace(window.self.location.href);
            } catch (e2) {
                console.warn("Cross-origin redirection blocked. Initiating local interface freeze.");
                document.documentElement.innerHTML = `<div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #000; color: #8b00ff; z-index: 99999999; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: monospace; padding: 20px; text-align: center; box-sizing: border-box;"><h1 style="font-size: 24px; margin-bottom: 10px; border-bottom: 2px solid #8b00ff; padding-bottom: 10px;">ENVIRONMENTAL SECURITY FAULT</h1><p style="color: #ccc; font-size: 14px; max-width: 500px; margin: 0 auto 20px;">This system dashboard cannot execute within embedded third-party viewport structures.</p><div style="font-size: 11px; color: #444;">ERR_EMBED_RESTRICTION_TRIGGERED</div></div>`;
                window.stop();
                throw new Error("Execution halted due to framing restriction rules.");
            }
        }
    }
})();

// ==========================================
// DYNAMIC CORE SYSTEMS & GAMES REGISTER DATA
// ==========================================
let _0xData = [
  { id: "b_ap", title: "Brotato All Pain No Gain", url: "../Games/brotatoAPNG/Brotato.html", image: "../Games/brotatoAPNG/images (23).jpeg", desc: "The newest version of Brotato with the All Pain No Gain update.", popular: true },
  { id: "y_io", title: "Yohoho.io", url: "../Games/yohoho/index.html", image: "../Games/yohoho/images (24).jpeg", desc: "A pirate battle royale game where you collect gold and fight opponents.", popular: true },
  { id: "b_er", title: "Bitcoin Clicker", url: "../Games/Bitcoin/index.html", image: "../Games/Bitcoin/images (4).jpeg", jsbin: "https://glaxyias.github.io/Bitcoin-clicker/", isEmbedCode: true, desc: "A Homemade Special.", popular: true },
  { id: "s_lp", title: "Slope", url: "../Games/slope/index.html", image: "../Games/slope/images (25).jpeg", desc: "A fast-paced 3D platformer. Stay on the track!", popular: true }
];
