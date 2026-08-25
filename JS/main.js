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

// ==========================================
// DYNAMIC CORE SYSTEMS & GAMES REGISTER DATA
// ==========================================
let _0xData = [
  { id: "b_ap", title: "Brotato All Pain No Gain", url: "../Games/brotatoAPNG/Brotato.html", image: "../Games/brotatoAPNG/images (23).jpeg", desc: "The newest version of Brotato with the All Pain No Gain update.", popular: true },
{ id: "cloverpit", title: "cloverpit", url: "../Games/cloverpit/index.html", desc: "Clover Pit is a roguelite gambling game where luck and strategy collide in the pits.", popular: true },
  { id: "jailbreakobby", title: "jailbreakobby", url: "../Games/jailbreakobby/index.html", desc: "Parkour through a prison complex, dodge guards, and race for freedom in this high-stakes escape obby.", popular: true },
  { id: "luckyblockobby", title: "luckyblockobby", url: "../Games/luckyblockobby/index.html", desc: "Jump through obstacle courses packed with lucky blocks, random rewards, and surprise challenges.", popular: true },
  { id: "ninjaobby", title: "ninjaobby", url: "../Games/ninjaobby/index.html", desc: "Leap across rooftops, dodge traps, and master precise parkour moves in this ninja-themed obstacle course.", popular: true },
  { id: "clickerobby", title: "clickerobby", url: "../Games/clickerobby/index.html", desc: "Combine clicker progression with parkour stages—level up your power as you race through challenging maps.", popular: true },
  { id: "obbyforbrainrot", title: "obbyforbrainrot", url: "../Games/obbyforbrainrot/index.html", desc: "A chaotic meme-inspired obstacle course filled with viral brainrot vibes, wild jumps, and nonstop laughs.", popular: true },
  { id: "leafblower", title: "leafblower", url: "../Games/leafblower/index.html", desc: "Clear yards of leaves with your leaf blower, upgrade your gear, and grow your lawn-care empire in this idle-style game.", popular: true, image: "../Games/leafblower/images (11).jpeg" },
  { id: "ultrakill", title: "ultrakill", url: "../Games/ultrakill/index.html", desc: "A hyper-violent, style-focused FPS where every kill chains into the next—move fast, shoot faster, and stay stylish.", popular: true },
  { id: "halflife", title: "halflife", url: "../Games/halflife/index.html", desc: "Step into the classic sci-fi shooter: fight through Black Mesa, battle aliens, and uncover a conspiracy that changes everything.", popular: true },
  { id: "blackjack", title: "blackjack", url: "../Games/blackjack/index.html", desc: "Play classic casino blackjack—hit, stand, and double down as you try to beat the dealer without going over 21.", popular: true }
];
// NOTE: This is a PARTIAL restore of the games array for the 9 placeholder games + a few others.
// The full original main.js is 100KB+ and needs the complete registry + all UI/systems code.
// Full restore requires the complete local file content.
console.warn('PARTIAL RESTORE - full main.js still needed');
