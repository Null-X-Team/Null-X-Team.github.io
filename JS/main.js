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

// Obfuscated proxy endpoints (base64). Decode only at launch time.
function __nxDecodeP(p) {
  try { return atob(p); } catch (e) { return ''; }
}
function __nxLaunchProxy(encoded) {
  const target = __nxDecodeP(encoded);
  if (!target) { alert('Endpoint unavailable.'); return; }
  const tab = window.open('about:blank', '_blank');
  if (!tab) { alert('Pop-up blocked. Allow pop-ups to open this instance.'); return; }
  tab.document.title = 'Google Docs';
  tab.document.open();
  tab.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Google Docs</title>
<style>html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:#000}iframe{border:0;width:100%;height:100vh;display:block}</style>
</head><body><iframe src="${target.replace(/"/g,'&quot;')}" allow="fullscreen" allowfullscreen></iframe></body></html>`);
  tab.document.close();
}
const __nxProxyList = [
  { name: "NautilusOS", local: "unblockers/NautilusOS/index.html" },
  { name: "GUST", local: "unblockers/GUST/GUST.html" },
  { name: "Helios", local: "unblockers/Helios/Helios.html" },
  { name: "Google Storage CDN", p: "aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29t" },
  { name: "Fastly SSL Mirror", p: "aHR0cHM6Ly9hbGktaW4tYS1uZXctZHJlc3MuZ2xvYmFsLnNzbC5mYXN0bHkubmV0Lw==" },
  { name: "Fastly FreeTLS Mirror", p: "aHR0cHM6Ly9hbGktaW4tYS1uZXctZHJlc3MuZnJlZXRscy5mYXN0bHkubmV0Lw==" },
  { name: "CloudFront Edge", p: "aHR0cHM6Ly9kaXY3aWtxbTRvNTE1LmNsb3VkZnJvbnQubmV0Lw==" },
  { name: "Lucide Proxy", p: "aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL25ld3JlbGlnaHRlZHRlYW0vbHVjaWRlcHJveHlANzJhZDQwNDQ3Mjk2MzE0MDFjY2NmMzQwYzRhNWZhOTI3ZTM1NWVlZC9uaXJieXRlcy5zdmcjLw==" },
  { name: "DogeUB Static", p: "aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL2RvZ2V1Yi8tL2luZGV4LnN2Zw==" },
  { name: "DD-Static", p: "aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL05pZ2h0UHJveHkvREQtU3RhdGljL2Rpc3QvaW5kZXguc3Zn" },
  { name: "ProLogic", p: "aHR0cHM6Ly9wcm9sb2dpYy5rbGNjYy5jby51ay8=" },
  { name: "BeanWeb", p: "aHR0cHM6Ly90NXoycGRmOC5iZWFud2ViLnF6ei5pby8=" },
  { name: "Kriptic Edition", p: "aHR0cHM6Ly9rcmlwdGljZWRpdGlvbjIubmVvY2l0aWVzLm9yZy8=" },
  { name: "Relaxed Alien", p: "aHR0cHM6Ly9tYW51YWxseS1yZWxheGVkLWFsaWVuLmdsb2JhbC5zc2wuZmFzdGx5Lm5ldC8=" },
];


const GFILES_BASE  = "https://cdn.jsdelivr.net/gl/DeclineOptionalCookies/gfiles@main/";
const GFILES2_BASE = "https://cdn.jsdelivr.net/gl/DeclineOptionalCookies/gfiles2@main/";

let _0xData = [
  { id: "1-on-1-soccer", title: "1 On 1 Soccer", url: GFILES_BASE + "1-on-1-soccer/index.html", desc: "gfiles", popular: true },
  { id: "1", title: "1", url: GFILES_BASE + "1/index.html", desc: "gfiles", popular: true },
  { id: "10-minutes-till-dawn", title: "10 Minutes Till Dawn", url: GFILES_BASE + "10-minutes-till-dawn/index.html", desc: "gfiles", popular: true },
  { id: "1010-deluxe", title: "1010 Deluxe", url: GFILES_BASE + "1010-deluxe/index.html", desc: "gfiles", popular: true },
  { id: "1v1-lol", title: "1V1 Lol", url: GFILES_BASE + "1v1-lol/index.html", desc: "gfiles", popular: true },
  { id: "2048-multitask", title: "2048 Multitask", url: GFILES_BASE + "2048-multitask/index.html", desc: "gfiles", popular: true },
  { id: "2048", title: "2048", url: GFILES_BASE + "2048/index.html", desc: "gfiles", popular: true },
  { id: "3-pandas-in-japan", title: "3 Pandas In Japan", url: GFILES_BASE + "3-pandas-in-japan/index.html", desc: "gfiles", popular: true },
  { id: "3d-bowling", title: "3D Bowling", url: GFILES_BASE + "3d-bowling/index.html", desc: "gfiles", popular: true },
  { id: "8-ball-pool", title: "8 Ball Pool", url: GFILES_BASE + "8-ball-pool/index.html", desc: "gfiles", popular: true },
  { id: "9007199254740992", title: "9007199254740992", url: GFILES_BASE + "9007199254740992/index.html", desc: "gfiles", popular: true },
  { id: "a-dance-of-fire-and-ice", title: "A Dance Of Fire And Ice", url: GFILES_BASE + "a-dance-of-fire-and-ice/index.html", desc: "gfiles", popular: true },
  { id: "a-dark-room", title: "A Dark Room", url: GFILES_BASE + "a-dark-room/index.html", desc: "gfiles", popular: true },
  { id: "achievement-unlocked", title: "Achievement Unlocked", url: GFILES_BASE + "achievement-unlocked/index.html", desc: "gfiles", popular: true },
  { id: "adam-and-eve-2", title: "Adam And Eve 2", url: GFILES_BASE + "adam-and-eve-2/index.html", desc: "gfiles", popular: true },
  { id: "adam-and-eve", title: "Adam And Eve", url: GFILES_BASE + "adam-and-eve/index.html", desc: "gfiles", popular: true },
  { id: "adrenaline-challenge", title: "Adrenaline Challenge", url: GFILES_BASE + "adrenaline-challenge/index.html", desc: "gfiles", popular: true },
  { id: "adventure-drivers", title: "Adventure Drivers", url: GFILES_BASE + "adventure-drivers/index.html", desc: "gfiles", popular: true },
  { id: "adventures-with-anxiety", title: "Adventures With Anxiety", url: GFILES_BASE + "adventures-with-anxiety/index.html", desc: "gfiles", popular: true },
  { id: "ages-of-conflict", title: "Ages Of Conflict", url: GFILES_BASE + "ages-of-conflict/index.html", desc: "gfiles", popular: true },
  { id: "alien-hominid", title: "Alien Hominid", url: GFILES_BASE + "alien-hominid/index.html", desc: "gfiles", popular: true },
  { id: "amidst-the-sky", title: "Amidst The Sky", url: GFILES_BASE + "amidst-the-sky/index.html", desc: "gfiles", popular: true },
  { id: "among-us", title: "Among Us", url: GFILES_BASE + "among-us/index.html", desc: "gfiles", popular: true },
  { id: "angry-sharks", title: "Angry Sharks", url: GFILES_BASE + "angry-sharks/index.html", desc: "gfiles", popular: true },
  { id: "animal-io", title: "Animal Io", url: GFILES_BASE + "animal-io/index.html", desc: "gfiles", popular: true },
  { id: "apple-shooter", title: "Apple Shooter", url: GFILES_BASE + "apple-shooter/index.html", desc: "gfiles", popular: true },
  { id: "aquapark-io", title: "Aquapark Io", url: GFILES_BASE + "aquapark-io/index.html", desc: "gfiles", popular: true },
  { id: "aquapark-slides", title: "Aquapark Slides", url: GFILES_BASE + "aquapark-slides/index.html", desc: "gfiles", popular: true },
  { id: "arcane-archer", title: "Arcane Archer", url: GFILES_BASE + "arcane-archer/index.html", desc: "gfiles", popular: true },
  { id: "archers-io", title: "Archers Io", url: GFILES_BASE + "archers-io/index.html", desc: "gfiles", popular: true },
  { id: "avalanche", title: "Avalanche", url: GFILES_BASE + "avalanche/index.html", desc: "gfiles", popular: true },
  { id: "awesome-tanks-2", title: "Awesome Tanks 2", url: GFILES_BASE + "awesome-tanks-2/index.html", desc: "gfiles", popular: true },
  { id: "axis-football-league", title: "Axis Football League", url: GFILES_BASE + "axis-football-league/index.html", desc: "gfiles", popular: true },
  { id: "backrooms", title: "Backrooms", url: GFILES_BASE + "backrooms/index.html", desc: "gfiles", popular: true },
  { id: "bacon-may-die-2022", title: "Bacon May Die 2022", url: GFILES_BASE + "bacon-may-die-2022/index.html", desc: "gfiles", popular: true },
  { id: "bacon-may-die", title: "Bacon May Die", url: GFILES_BASE + "bacon-may-die/index.html", desc: "gfiles", popular: true },
  { id: "bad-ice-cream-2", title: "Bad Ice Cream 2", url: GFILES_BASE + "bad-ice-cream-2/index.html", desc: "gfiles", popular: true },
  { id: "bad-ice-cream-3", title: "Bad Ice Cream 3", url: GFILES_BASE + "bad-ice-cream-3/index.html", desc: "gfiles", popular: true },
  { id: "bad-ice-cream", title: "Bad Ice Cream", url: GFILES_BASE + "bad-ice-cream/index.html", desc: "gfiles", popular: true },
  { id: "baldis-basics", title: "Baldis Basics", url: GFILES_BASE + "baldis-basics/index.html", desc: "gfiles", popular: true },
  { id: "ball-sort-halloween", title: "Ball Sort Halloween", url: GFILES_BASE + "ball-sort-halloween/index.html", desc: "gfiles", popular: true },
  { id: "ball-sort-puzzle", title: "Ball Sort Puzzle", url: GFILES_BASE + "ball-sort-puzzle/index.html", desc: "gfiles", popular: true },
  { id: "ball-sort-soccer", title: "Ball Sort Soccer", url: GFILES_BASE + "ball-sort-soccer/index.html", desc: "gfiles", popular: true },
  { id: "ballistic", title: "Ballistic", url: GFILES_BASE + "ballistic/index.html", desc: "gfiles", popular: true },
  { id: "bally", title: "Bally", url: GFILES_BASE + "bally/index.html", desc: "gfiles", popular: true },
  { id: "basket-and-ball", title: "Basket And Ball", url: GFILES_BASE + "basket-and-ball/index.html", desc: "gfiles", popular: true },
  { id: "basket-champs", title: "Basket Champs", url: GFILES_BASE + "basket-champs/index.html", desc: "gfiles", popular: true },
  { id: "basket-random", title: "Basket Random", url: GFILES_BASE + "basket-random/index.html", desc: "gfiles", popular: true },
  { id: "basketball-stars", title: "Basketball Stars", url: GFILES_BASE + "basketball-stars/index.html", desc: "gfiles", popular: true },
  { id: "battle-for-gondor", title: "Battle For Gondor", url: GFILES_BASE + "battle-for-gondor/index.html", desc: "gfiles", popular: true },
  { id: "bicycle-stunt-3d", title: "Bicycle Stunt 3D", url: GFILES_BASE + "bicycle-stunt-3d/index.html", desc: "gfiles", popular: true },
  { id: "big-red-button", title: "Big Red Button", url: GFILES_BASE + "big-red-button/index.html", desc: "gfiles", popular: true },
  { id: "big-shot-boxing", title: "Big Shot Boxing", url: GFILES_BASE + "big-shot-boxing/index.html", desc: "gfiles", popular: true },
  { id: "big-tower-tiny-square", title: "Big Tower Tiny Square", url: GFILES_BASE + "big-tower-tiny-square/index.html", desc: "gfiles", popular: true },
  { id: "biker-street", title: "Biker Street", url: GFILES_BASE + "biker-street/index.html", desc: "gfiles", popular: true },
  { id: "bitcoin-clicker", title: "Bitcoin Clicker", url: GFILES_BASE + "bitcoin-clicker/index.html", desc: "gfiles", popular: true },
  { id: "bitlife", title: "Bitlife", url: GFILES_BASE + "bitlife/index.html", desc: "gfiles", popular: true },
  { id: "black-hole-square", title: "Black Hole Square", url: GFILES_BASE + "black-hole-square/index.html", desc: "gfiles", popular: true },
  { id: "block-the-pig", title: "Block The Pig", url: GFILES_BASE + "block-the-pig/index.html", desc: "gfiles", popular: true },
  { id: "bloons-tower-defense-2", title: "Bloons Tower Defense 2", url: GFILES_BASE + "bloons-tower-defense-2/index.html", desc: "gfiles", popular: true },
  { id: "bloons-tower-defense-4", title: "Bloons Tower Defense 4", url: GFILES_BASE + "bloons-tower-defense-4/index.html", desc: "gfiles", popular: true },
  { id: "bloons-tower-defense", title: "Bloons Tower Defense", url: GFILES_BASE + "bloons-tower-defense/index.html", desc: "gfiles", popular: true },
  { id: "bloxorz", title: "Bloxorz", url: GFILES_BASE + "bloxorz/index.html", desc: "gfiles", popular: true },
  { id: "blumgi-rocket", title: "Blumgi Rocket", url: GFILES_BASE + "blumgi-rocket/index.html", desc: "gfiles", popular: true },
  { id: "blumgi-slime", title: "Blumgi Slime", url: GFILES_BASE + "blumgi-slime/index.html", desc: "gfiles", popular: true },
  { id: "bob-the-robber-2", title: "Bob The Robber 2", url: GFILES_BASE + "bob-the-robber-2/index.html", desc: "gfiles", popular: true },
  { id: "bob-the-robber-4", title: "Bob The Robber 4", url: GFILES_BASE + "bob-the-robber-4/index.html", desc: "gfiles", popular: true },
  { id: "bomb-it-7", title: "Bomb It 7", url: GFILES_BASE + "bomb-it-7/index.html", desc: "gfiles", popular: true },
  { id: "bottle-flip-3d", title: "Bottle Flip 3D", url: GFILES_BASE + "bottle-flip-3d/index.html", desc: "gfiles", popular: true },
  { id: "bottle-flip", title: "Bottle Flip", url: GFILES_BASE + "bottle-flip/index.html", desc: "gfiles", popular: true },
  { id: "bouncy-woods", title: "Bouncy Woods", url: GFILES_BASE + "bouncy-woods/index.html", desc: "gfiles", popular: true },
  { id: "boxel-rebound", title: "Boxel Rebound", url: GFILES_BASE + "boxel-rebound/index.html", desc: "gfiles", popular: true },
  { id: "boxhead-2play", title: "Boxhead 2Play", url: GFILES_BASE + "boxhead-2play/index.html", desc: "gfiles", popular: true },
  { id: "boxing-random", title: "Boxing Random", url: GFILES_BASE + "boxing-random/index.html", desc: "gfiles", popular: true },
  { id: "breaking-the-bank", title: "Breaking The Bank", url: GFILES_BASE + "breaking-the-bank/index.html", desc: "gfiles", popular: true },
  { id: "brotato", title: "Brotato", url: GFILES_BASE + "brotato/index.html", desc: "gfiles", popular: true },
  { id: "bubble-pop-adventures", title: "Bubble Pop Adventures", url: GFILES_BASE + "bubble-pop-adventures/index.html", desc: "gfiles", popular: true },
  { id: "burrito-bison-revenge", title: "Burrito Bison Revenge", url: GFILES_BASE + "burrito-bison-revenge/index.html", desc: "gfiles", popular: true },
  { id: "cannon-basketball-4", title: "Cannon Basketball 4", url: GFILES_BASE + "cannon-basketball-4/index.html", desc: "gfiles", popular: true },
  { id: "canyon-defense", title: "Canyon Defense", url: GFILES_BASE + "canyon-defense/index.html", desc: "gfiles", popular: true },
  { id: "capybara-clicker-2", title: "Capybara Clicker 2", url: GFILES_BASE + "capybara-clicker-2/index.html", desc: "gfiles", popular: true },
  { id: "capybara-clicker-pro", title: "Capybara Clicker Pro", url: GFILES_BASE + "capybara-clicker-pro/index.html", desc: "gfiles", popular: true },
  { id: "capybara-clicker", title: "Capybara Clicker", url: GFILES_BASE + "capybara-clicker/index.html", desc: "gfiles", popular: true },
  { id: "car-rush", title: "Car Rush", url: GFILES_BASE + "car-rush/index.html", desc: "gfiles", popular: true },
  { id: "cars-simulator", title: "Cars Simulator", url: GFILES_BASE + "cars-simulator/index.html", desc: "gfiles", popular: true },
  { id: "cartoon-mini-racing", title: "Cartoon Mini Racing", url: GFILES_BASE + "cartoon-mini-racing/index.html", desc: "gfiles", popular: true },
  { id: "cell-machine", title: "Cell Machine", url: GFILES_BASE + "cell-machine/index.html", desc: "gfiles", popular: true },
  { id: "champion-archer", title: "Champion Archer", url: GFILES_BASE + "champion-archer/index.html", desc: "gfiles", popular: true },
  { id: "champion-island", title: "Champion Island", url: GFILES_BASE + "champion-island/index.html", desc: "gfiles", popular: true },
  { id: "checkers-legend", title: "Checkers Legend", url: GFILES_BASE + "checkers-legend/index.html", desc: "gfiles", popular: true },
  { id: "circloo-2", title: "Circloo 2", url: GFILES_BASE + "circloo-2/index.html", desc: "gfiles", popular: true },
  { id: "circloo", title: "Circloo", url: GFILES_BASE + "circloo/index.html", desc: "gfiles", popular: true },
  { id: "clicker-heroes", title: "Clicker Heroes", url: GFILES_BASE + "clicker-heroes/index.html", desc: "gfiles", popular: true },
  { id: "climb-over-it", title: "Climb Over It", url: GFILES_BASE + "climb-over-it/index.html", desc: "gfiles", popular: true },
  { id: "cloverpit", title: "Cloverpit", url: GFILES_BASE + "cloverpit/index.html", desc: "gfiles", popular: true },
  { id: "cluster-rush", title: "Cluster Rush", url: GFILES_BASE + "cluster-rush/index.html", desc: "gfiles", popular: true },
  { id: "color-match", title: "Color Match", url: GFILES_BASE + "color-match/index.html", desc: "gfiles", popular: true },
  { id: "connect-3", title: "Connect 3", url: GFILES_BASE + "connect-3/index.html", desc: "gfiles", popular: true },
  { id: "cookie-clicker", title: "Cookie Clicker", url: GFILES_BASE + "cookie-clicker/index.html", desc: "gfiles", popular: true },
  { id: "core-ball", title: "Core Ball", url: GFILES_BASE + "core-ball/index.html", desc: "gfiles", popular: true },
  { id: "craftmine", title: "Craftmine", url: GFILES_BASE + "craftmine/index.html", desc: "gfiles", popular: true },
  { id: "crazy-cars", title: "Crazy Cars", url: GFILES_BASE + "crazy-cars/index.html", desc: "gfiles", popular: true },
  { id: "crazy-tunnel-3d", title: "Crazy Tunnel 3D", url: GFILES_BASE + "crazy-tunnel-3d/index.html", desc: "gfiles", popular: true },
  { id: "creative-kill-chamber", title: "Creative Kill Chamber", url: GFILES_BASE + "creative-kill-chamber/index.html", desc: "gfiles", popular: true },
  { id: "crossy-road", title: "Crossy Road", url: GFILES_BASE + "crossy-road/index.html", desc: "gfiles", popular: true },
  { id: "csgo-clicker", title: "Csgo Clicker", url: GFILES_BASE + "csgo-clicker/index.html", desc: "gfiles", popular: true },
  { id: "cubefield", title: "Cubefield", url: GFILES_BASE + "cubefield/index.html", desc: "gfiles", popular: true },
  { id: "cubes-2048-io", title: "Cubes 2048 Io", url: GFILES_BASE + "cubes-2048-io/index.html", desc: "gfiles", popular: true },
  { id: "cut-the-rope-holiday-gift", title: "Cut The Rope Holiday Gift", url: GFILES_BASE + "cut-the-rope-holiday-gift/index.html", desc: "gfiles", popular: true },
  { id: "cut-the-rope-time-travel", title: "Cut The Rope Time Travel", url: GFILES_BASE + "cut-the-rope-time-travel/index.html", desc: "gfiles", popular: true },
  { id: "cut-the-rope", title: "Cut The Rope", url: GFILES_BASE + "cut-the-rope/index.html", desc: "gfiles", popular: true },
  { id: "dante", title: "Dante", url: GFILES_BASE + "dante/index.html", desc: "gfiles", popular: true },
  { id: "dayintheoffice", title: "Dayintheoffice", url: GFILES_BASE + "dayintheoffice/index.html", desc: "gfiles", popular: true },
  { id: "dead-again", title: "Dead Again", url: GFILES_BASE + "dead-again/index.html", desc: "gfiles", popular: true },
  { id: "deadsignal", title: "Deadsignal", url: GFILES_BASE + "deadsignal/index.html", desc: "gfiles", popular: true },
  { id: "deal-or-no-deal", title: "Deal Or No Deal", url: GFILES_BASE + "deal-or-no-deal/index.html", desc: "gfiles", popular: true },
  { id: "death-car", title: "Death Car", url: GFILES_BASE + "death-car/index.html", desc: "gfiles", popular: true },
  { id: "death-run-3d", title: "Death Run 3D", url: GFILES_BASE + "death-run-3d/index.html", desc: "gfiles", popular: true },
  { id: "deepest-sword", title: "Deepest Sword", url: GFILES_BASE + "deepest-sword/index.html", desc: "gfiles", popular: true },
  { id: "defend-the-tank", title: "Defend The Tank", url: GFILES_BASE + "defend-the-tank/index.html", desc: "gfiles", popular: true },
  { id: "dino-bros", title: "Dino Bros", url: GFILES_BASE + "dino-bros/index.html", desc: "gfiles", popular: true },
  { id: "dino-merge", title: "Dino Merge", url: GFILES_BASE + "dino-merge/index.html", desc: "gfiles", popular: true },
  { id: "doctor-acorn-2", title: "Doctor Acorn 2", url: GFILES_BASE + "doctor-acorn-2/index.html", desc: "gfiles", popular: true },
  { id: "dodge", title: "Dodge", url: GFILES_BASE + "dodge/index.html", desc: "gfiles", popular: true },
  { id: "doge-2048", title: "Doge 2048", url: GFILES_BASE + "doge-2048/index.html", desc: "gfiles", popular: true },
  { id: "dogeminer", title: "Dogeminer", url: GFILES_BASE + "dogeminer/index.html", desc: "gfiles", popular: true },
  { id: "dokidoki", title: "Dokidoki", url: GFILES_BASE + "dokidoki/index.html", desc: "gfiles", popular: true },
  { id: "doodle-jump", title: "Doodle Jump", url: GFILES_BASE + "doodle-jump/index.html", desc: "gfiles", popular: true },
  { id: "draw-the-hill", title: "Draw The Hill", url: GFILES_BASE + "draw-the-hill/index.html", desc: "gfiles", popular: true },
  { id: "drift-boss", title: "Drift Boss", url: GFILES_BASE + "drift-boss/index.html", desc: "gfiles", popular: true },
  { id: "drift-dudes", title: "Drift Dudes", url: GFILES_BASE + "drift-dudes/index.html", desc: "gfiles", popular: true },
  { id: "drift-hunters-pro", title: "Drift Hunters Pro", url: GFILES_BASE + "drift-hunters-pro/index.html", desc: "gfiles", popular: true },
  { id: "drive-mad", title: "Drive Mad", url: GFILES_BASE + "drive-mad/index.html", desc: "gfiles", popular: true },
  { id: "duck-life-2", title: "Duck Life 2", url: GFILES_BASE + "duck-life-2/index.html", desc: "gfiles", popular: true },
  { id: "duck-life-3-evolution", title: "Duck Life 3 Evolution", url: GFILES_BASE + "duck-life-3-evolution/index.html", desc: "gfiles", popular: true },
  { id: "duck-life-4", title: "Duck Life 4", url: GFILES_BASE + "duck-life-4/index.html", desc: "gfiles", popular: true },
  { id: "duck-life", title: "Duck Life", url: GFILES_BASE + "duck-life/index.html", desc: "gfiles", popular: true },
  { id: "dummy-never-fails-2", title: "Dummy Never Fails 2", url: GFILES_BASE + "dummy-never-fails-2/index.html", desc: "gfiles", popular: true },
  { id: "dummy-never-fails", title: "Dummy Never Fails", url: GFILES_BASE + "dummy-never-fails/index.html", desc: "gfiles", popular: true },
  { id: "edge-not-found", title: "Edge Not Found", url: GFILES_BASE + "edge-not-found/index.html", desc: "gfiles", popular: true },
  { id: "edge-surf", title: "Edge Surf", url: GFILES_BASE + "edge-surf/index.html", desc: "gfiles", popular: true },
  { id: "eel-slap", title: "Eel Slap", url: GFILES_BASE + "eel-slap/index.html", desc: "gfiles", popular: true },
  { id: "eggy-car", title: "Eggy Car", url: GFILES_BASE + "eggy-car/index.html", desc: "gfiles", popular: true },
  { id: "elastic-man", title: "Elastic Man", url: GFILES_BASE + "elastic-man/index.html", desc: "gfiles", popular: true },
  { id: "endless-truck", title: "Endless Truck", url: GFILES_BASE + "endless-truck/index.html", desc: "gfiles", popular: true },
  { id: "endless-war-3", title: "Endless War 3", url: GFILES_BASE + "endless-war-3/index.html", desc: "gfiles", popular: true },
  { id: "escaping-the-prison", title: "Escaping The Prison", url: GFILES_BASE + "escaping-the-prison/index.html", desc: "gfiles", popular: true },
  { id: "evil-glitch", title: "Evil Glitch", url: GFILES_BASE + "evil-glitch/index.html", desc: "gfiles", popular: true },
  { id: "evolution", title: "Evolution", url: GFILES_BASE + "evolution/index.html", desc: "gfiles", popular: true },
  { id: "exo", title: "Exo", url: GFILES_BASE + "exo/index.html", desc: "gfiles", popular: true },
  { id: "factory-balls", title: "Factory Balls", url: GFILES_BASE + "factory-balls/index.html", desc: "gfiles", popular: true },
  { id: "fake-virus", title: "Fake Virus", url: GFILES_BASE + "fake-virus/index.html", desc: "gfiles", popular: true },
  { id: "fancy-pants-2", title: "Fancy Pants 2", url: GFILES_BASE + "fancy-pants-2/index.html", desc: "gfiles", popular: true },
  { id: "fancy-pants-3", title: "Fancy Pants 3", url: GFILES_BASE + "fancy-pants-3/index.html", desc: "gfiles", popular: true },
  { id: "fancy-pants-adventures", title: "Fancy Pants Adventures", url: GFILES_BASE + "fancy-pants-adventures/index.html", desc: "gfiles", popular: true },
  { id: "farm-match", title: "Farm Match", url: GFILES_BASE + "farm-match/index.html", desc: "gfiles", popular: true },
  { id: "feedblackhole", title: "Feedblackhole", url: GFILES_BASE + "feedblackhole/index.html", desc: "gfiles", popular: true },
  { id: "fireboy-and-watergirl-in-the-forest-temple", title: "Fireboy And Watergirl In The Forest Temple", url: GFILES_BASE + "fireboy-and-watergirl-in-the-forest-temple/index.html", desc: "gfiles", popular: true },
  { id: "fish-master", title: "Fish Master", url: GFILES_BASE + "fish-master/index.html", desc: "gfiles", popular: true },
  { id: "flappy-bird", title: "Flappy Bird", url: GFILES_BASE + "flappy-bird/index.html", desc: "gfiles", popular: true },
  { id: "flash-tetris", title: "Flash Tetris", url: GFILES_BASE + "flash-tetris/index.html", desc: "gfiles", popular: true },
  { id: "fleeing-the-complex", title: "Fleeing The Complex", url: GFILES_BASE + "fleeing-the-complex/index.html", desc: "gfiles", popular: true },
  { id: "flying-car-simulator", title: "Flying Car Simulator", url: GFILES_BASE + "flying-car-simulator/index.html", desc: "gfiles", popular: true },
  { id: "flying-cars-era", title: "Flying Cars Era", url: GFILES_BASE + "flying-cars-era/index.html", desc: "gfiles", popular: true },
  { id: "fnaf", title: "Fnaf", url: GFILES_BASE + "fnaf/index.html", desc: "gfiles", popular: true },
  { id: "fnaw", title: "Fnaw", url: GFILES_BASE + "fnaw/index.html", desc: "gfiles", popular: true },
  { id: "football-brawl", title: "Football Brawl", url: GFILES_BASE + "football-brawl/index.html", desc: "gfiles", popular: true },
  { id: "football-legends", title: "Football Legends", url: GFILES_BASE + "football-legends/index.html", desc: "gfiles", popular: true },
  { id: "football-run", title: "Football Run", url: GFILES_BASE + "football-run/index.html", desc: "gfiles", popular: true },
  { id: "football-strike", title: "Football Strike", url: GFILES_BASE + "football-strike/index.html", desc: "gfiles", popular: true },
  { id: "froggys-battle", title: "Froggys Battle", url: GFILES_BASE + "froggys-battle/index.html", desc: "gfiles", popular: true },
  { id: "fruit-ninja", title: "Fruit Ninja", url: GFILES_BASE + "fruit-ninja/index.html", desc: "gfiles", popular: true },
  { id: "frying-nemo", title: "Frying Nemo", url: GFILES_BASE + "frying-nemo/index.html", desc: "gfiles", popular: true },
  { id: "g-switch-2", title: "G Switch 2", url: GFILES_BASE + "g-switch-2/index.html", desc: "gfiles", popular: true },
  { id: "g-switch-3", title: "G Switch 3", url: GFILES_BASE + "g-switch-3/index.html", desc: "gfiles", popular: true },
  { id: "g-switch", title: "G Switch", url: GFILES_BASE + "g-switch/index.html", desc: "gfiles", popular: true },
  { id: "galaga", title: "Galaga", url: GFILES_BASE + "galaga/index.html", desc: "gfiles", popular: true },
  { id: "game-inside-a-game", title: "Game Inside A Game", url: GFILES_BASE + "game-inside-a-game/index.html", desc: "gfiles", popular: true },
  { id: "generic-fishing-game", title: "Generic Fishing Game", url: GFILES_BASE + "generic-fishing-game/index.html", desc: "gfiles", popular: true },
  { id: "geodash", title: "Geodash", url: GFILES_BASE + "geodash/index.html", desc: "gfiles", popular: true },
  { id: "geometry-dash", title: "Geometry Dash", url: GFILES_BASE + "geometry-dash/index.html", desc: "gfiles", popular: true },
  { id: "george-and-the-printer", title: "George And The Printer", url: GFILES_BASE + "george-and-the-printer/index.html", desc: "gfiles", popular: true },
  { id: "get-on-top", title: "Get On Top", url: GFILES_BASE + "get-on-top/index.html", desc: "gfiles", popular: true },
  { id: "getaway-shootout", title: "Getaway Shootout", url: GFILES_BASE + "getaway-shootout/index.html", desc: "gfiles", popular: true },
  { id: "getting-over-it", title: "Getting Over It", url: GFILES_BASE + "getting-over-it/index.html", desc: "gfiles", popular: true },
  { id: "gimme-the-airpod", title: "Gimme The Airpod", url: GFILES_BASE + "gimme-the-airpod/index.html", desc: "gfiles", popular: true },
  { id: "gladihoppers", title: "Gladihoppers", url: GFILES_BASE + "gladihoppers/index.html", desc: "gfiles", popular: true },
  { id: "glitch-dash", title: "Glitch Dash", url: GFILES_BASE + "glitch-dash/index.html", desc: "gfiles", popular: true },
  { id: "go-ball", title: "Go Ball", url: GFILES_BASE + "go-ball/index.html", desc: "gfiles", popular: true },
  { id: "go-tet", title: "Go Tet", url: GFILES_BASE + "go-tet/index.html", desc: "gfiles", popular: true },
  { id: "gobdun", title: "Gobdun", url: GFILES_BASE + "gobdun/index.html", desc: "gfiles", popular: true },
  { id: "goodnight", title: "Goodnight", url: GFILES_BASE + "goodnight/index.html", desc: "gfiles", popular: true },
  { id: "google-feud", title: "Google Feud", url: GFILES_BASE + "google-feud/index.html", desc: "gfiles", popular: true },
  { id: "granny-2-asylum-horror-house", title: "Granny 2 Asylum Horror House", url: GFILES_BASE + "granny-2-asylum-horror-house/index.html", desc: "gfiles", popular: true },
  { id: "granny", title: "Granny", url: GFILES_BASE + "granny/index.html", desc: "gfiles", popular: true },
  { id: "gravity-soccer", title: "Gravity Soccer", url: GFILES_BASE + "gravity-soccer/index.html", desc: "gfiles", popular: true },
  { id: "grey-box-testing", title: "Grey Box Testing", url: GFILES_BASE + "grey-box-testing/index.html", desc: "gfiles", popular: true },
  { id: "grindcraft", title: "Grindcraft", url: GFILES_BASE + "grindcraft/index.html", desc: "gfiles", popular: true },
  { id: "groovy-ski", title: "Groovy Ski", url: GFILES_BASE + "groovy-ski/index.html", desc: "gfiles", popular: true },
  { id: "guess-the-kitty", title: "Guess The Kitty", url: GFILES_BASE + "guess-the-kitty/index.html", desc: "gfiles", popular: true },
  { id: "gun-mayhem-2", title: "Gun Mayhem 2", url: GFILES_BASE + "gun-mayhem-2/index.html", desc: "gfiles", popular: true },
  { id: "gun-mayhem-redux", title: "Gun Mayhem Redux", url: GFILES_BASE + "gun-mayhem-redux/index.html", desc: "gfiles", popular: true },
  { id: "gun-mayhem", title: "Gun Mayhem", url: GFILES_BASE + "gun-mayhem/index.html", desc: "gfiles", popular: true },
  { id: "gunblood", title: "Gunblood", url: GFILES_BASE + "gunblood/index.html", desc: "gfiles", popular: true },
  { id: "gunspin", title: "Gunspin", url: GFILES_BASE + "gunspin/index.html", desc: "gfiles", popular: true },
  { id: "gura-tambourine", title: "Gura Tambourine", url: GFILES_BASE + "gura-tambourine/index.html", desc: "gfiles", popular: true },
  { id: "hacker-typer", title: "Hacker Typer", url: GFILES_BASE + "hacker-typer/index.html", desc: "gfiles", popular: true },
  { id: "hammer-master-io", title: "Hammer Master Io", url: GFILES_BASE + "hammer-master-io/index.html", desc: "gfiles", popular: true },
  { id: "handshakes", title: "Handshakes", url: GFILES_BASE + "handshakes/index.html", desc: "gfiles", popular: true },
  { id: "hanger", title: "Hanger", url: GFILES_BASE + "hanger/index.html", desc: "gfiles", popular: true },
  { id: "happy-hop", title: "Happy Hop", url: GFILES_BASE + "happy-hop/index.html", desc: "gfiles", popular: true },
  { id: "happy-wheels", title: "Happy Wheels", url: GFILES_BASE + "happy-wheels/index.html", desc: "gfiles", popular: true },
  { id: "head-soccer", title: "Head Soccer", url: GFILES_BASE + "head-soccer/index.html", desc: "gfiles", popular: true },
  { id: "heads-arena", title: "Heads Arena", url: GFILES_BASE + "heads-arena/index.html", desc: "gfiles", popular: true },
  { id: "helicopter", title: "Helicopter", url: GFILES_BASE + "helicopter/index.html", desc: "gfiles", popular: true },
  { id: "hex-empire", title: "Hex Empire", url: GFILES_BASE + "hex-empire/index.html", desc: "gfiles", popular: true },
  { id: "hextris", title: "Hextris", url: GFILES_BASE + "hextris/index.html", desc: "gfiles", popular: true },
  { id: "hide-and-smash", title: "Hide And Smash", url: GFILES_BASE + "hide-and-smash/index.html", desc: "gfiles", popular: true },
  { id: "hole-io", title: "Hole Io", url: GFILES_BASE + "hole-io/index.html", desc: "gfiles", popular: true },
  { id: "hop-and-pop-it", title: "Hop And Pop It", url: GFILES_BASE + "hop-and-pop-it/index.html", desc: "gfiles", popular: true },
  { id: "house-of-hazards", title: "House Of Hazards", url: GFILES_BASE + "house-of-hazards/index.html", desc: "gfiles", popular: true },
  { id: "hover-bot-arena", title: "Hover Bot Arena", url: GFILES_BASE + "hover-bot-arena/index.html", desc: "gfiles", popular: true },
  { id: "hungry-lamu", title: "Hungry Lamu", url: GFILES_BASE + "hungry-lamu/index.html", desc: "gfiles", popular: true },
  { id: "icy-purple-head-2", title: "Icy Purple Head 2", url: GFILES_BASE + "icy-purple-head-2/index.html", desc: "gfiles", popular: true },
  { id: "icy-purple-head-3", title: "Icy Purple Head 3", url: GFILES_BASE + "icy-purple-head-3/index.html", desc: "gfiles", popular: true },
  { id: "icycle", title: "Icycle", url: GFILES_BASE + "icycle/index.html", desc: "gfiles", popular: true },
  { id: "idle-ants", title: "Idle Ants", url: GFILES_BASE + "idle-ants/index.html", desc: "gfiles", popular: true },
  { id: "idle-breakout", title: "Idle Breakout", url: GFILES_BASE + "idle-breakout/index.html", desc: "gfiles", popular: true },
  { id: "idle-mining-empire", title: "Idle Mining Empire", url: GFILES_BASE + "idle-mining-empire/index.html", desc: "gfiles", popular: true },
  { id: "idle-restaurants", title: "Idle Restaurants", url: GFILES_BASE + "idle-restaurants/index.html", desc: "gfiles", popular: true },
  { id: "idle-tree-city", title: "Idle Tree City", url: GFILES_BASE + "idle-tree-city/index.html", desc: "gfiles", popular: true },
  { id: "incremancer", title: "Incremancer", url: GFILES_BASE + "incremancer/index.html", desc: "gfiles", popular: true },
  { id: "indian-truck-simulator", title: "Indian Truck Simulator", url: GFILES_BASE + "indian-truck-simulator/index.html", desc: "gfiles", popular: true },
  { id: "infiltrating-the-airship", title: "Infiltrating The Airship", url: GFILES_BASE + "infiltrating-the-airship/index.html", desc: "gfiles", popular: true },
  { id: "infinite-craft", title: "Infinite Craft", url: GFILES_BASE + "infinite-craft/index.html", desc: "gfiles", popular: true },
  { id: "infinite-soccer", title: "Infinite Soccer", url: GFILES_BASE + "infinite-soccer/index.html", desc: "gfiles", popular: true },
  { id: "iron-snout", title: "Iron Snout", url: GFILES_BASE + "iron-snout/index.html", desc: "gfiles", popular: true },
  { id: "jetpack-joyride", title: "Jetpack Joyride", url: GFILES_BASE + "jetpack-joyride/index.html", desc: "gfiles", popular: true },
  { id: "jewels-blitz-5", title: "Jewels Blitz 5", url: GFILES_BASE + "jewels-blitz-5/index.html", desc: "gfiles", popular: true },
  { id: "jungle-td", title: "Jungle Td", url: GFILES_BASE + "jungle-td/index.html", desc: "gfiles", popular: true },
  { id: "just-one-boss", title: "Just One Boss", url: GFILES_BASE + "just-one-boss/index.html", desc: "gfiles", popular: true },
  { id: "kingdom-defense-mercenary", title: "Kingdom Defense Mercenary", url: GFILES_BASE + "kingdom-defense-mercenary/index.html", desc: "gfiles", popular: true },
  { id: "kingdom-guards-tower-defense", title: "Kingdom Guards Tower Defense", url: GFILES_BASE + "kingdom-guards-tower-defense/index.html", desc: "gfiles", popular: true },
  { id: "kingdom-rush", title: "Kingdom Rush", url: GFILES_BASE + "kingdom-rush/index.html", desc: "gfiles", popular: true },
  { id: "kitchen-gun-game", title: "Kitchen Gun Game", url: GFILES_BASE + "kitchen-gun-game/index.html", desc: "gfiles", popular: true },
  { id: "kitten-cannon", title: "Kitten Cannon", url: GFILES_BASE + "kitten-cannon/index.html", desc: "gfiles", popular: true },
  { id: "knife-io-fanmade", title: "Knife Io Fanmade", url: GFILES_BASE + "knife-io-fanmade/index.html", desc: "gfiles", popular: true },
  { id: "knife-master", title: "Knife Master", url: GFILES_BASE + "knife-master/index.html", desc: "gfiles", popular: true },
  { id: "knight-hero-adventure", title: "Knight Hero Adventure", url: GFILES_BASE + "knight-hero-adventure/index.html", desc: "gfiles", popular: true },
  { id: "knives-crash", title: "Knives Crash", url: GFILES_BASE + "knives-crash/index.html", desc: "gfiles", popular: true },
  { id: "leader-strike", title: "Leader Strike", url: GFILES_BASE + "leader-strike/index.html", desc: "gfiles", popular: true },
  { id: "learn-to-fly-2", title: "Learn To Fly 2", url: GFILES_BASE + "learn-to-fly-2/index.html", desc: "gfiles", popular: true },
  { id: "learn-to-fly", title: "Learn To Fly", url: GFILES_BASE + "learn-to-fly/index.html", desc: "gfiles", popular: true },
  { id: "level-devil-2", title: "Level Devil 2", url: GFILES_BASE + "level-devil-2/index.html", desc: "gfiles", popular: true },
  { id: "level-devil", title: "Level Devil", url: GFILES_BASE + "level-devil/index.html", desc: "gfiles", popular: true },
  { id: "little-alchemy-2", title: "Little Alchemy 2", url: GFILES_BASE + "little-alchemy-2/index.html", desc: "gfiles", popular: true },
  { id: "mad-truck-challenge", title: "Mad Truck Challenge", url: GFILES_BASE + "mad-truck-challenge/index.html", desc: "gfiles", popular: true },
  { id: "madalin-stunt-cars-3", title: "Madalin Stunt Cars 3", url: GFILES_BASE + "madalin-stunt-cars-3/index.html", desc: "gfiles", popular: true },
  { id: "marble-dash", title: "Marble Dash", url: GFILES_BASE + "marble-dash/index.html", desc: "gfiles", popular: true },
  { id: "marbles-sorting", title: "Marbles Sorting", url: GFILES_BASE + "marbles-sorting/index.html", desc: "gfiles", popular: true },
  { id: "mario", title: "Mario", url: GFILES_BASE + "mario/index.html", desc: "gfiles", popular: true },
  { id: "masked-forces", title: "Masked Forces", url: GFILES_BASE + "masked-forces/index.html", desc: "gfiles", popular: true },
  { id: "matrix-rampage", title: "Matrix Rampage", url: GFILES_BASE + "matrix-rampage/index.html", desc: "gfiles", popular: true },
  { id: "meme-2048", title: "Meme 2048", url: GFILES_BASE + "meme-2048/index.html", desc: "gfiles", popular: true },
  { id: "merge-harvest", title: "Merge Harvest", url: GFILES_BASE + "merge-harvest/index.html", desc: "gfiles", popular: true },
  { id: "merge-round-racers", title: "Merge Round Racers", url: GFILES_BASE + "merge-round-racers/index.html", desc: "gfiles", popular: true },
  { id: "microbius", title: "Microbius", url: GFILES_BASE + "microbius/index.html", desc: "gfiles", popular: true },
  { id: "mineblocks", title: "Mineblocks", url: GFILES_BASE + "mineblocks/index.html", desc: "gfiles", popular: true },
  { id: "minecraft-1-5", title: "Minecraft 1 5", url: GFILES_BASE + "minecraft-1-5/index.html", desc: "gfiles", popular: true },
  { id: "minecraft-1-8", title: "Minecraft 1 8", url: GFILES_BASE + "minecraft-1-8/index.html", desc: "gfiles", popular: true },
  { id: "minecraft-case-simulator", title: "Minecraft Case Simulator", url: GFILES_BASE + "minecraft-case-simulator/index.html", desc: "gfiles", popular: true },
  { id: "minecraft-classic", title: "Minecraft Classic", url: GFILES_BASE + "minecraft-classic/index.html", desc: "gfiles", popular: true },
  { id: "minesweeper", title: "Minesweeper", url: GFILES_BASE + "minesweeper/index.html", desc: "gfiles", popular: true },
  { id: "mini-putt", title: "Mini Putt", url: GFILES_BASE + "mini-putt/index.html", desc: "gfiles", popular: true },
  { id: "missiles", title: "Missiles", url: GFILES_BASE + "missiles/index.html", desc: "gfiles", popular: true },
  { id: "money-movers-2", title: "Money Movers 2", url: GFILES_BASE + "money-movers-2/index.html", desc: "gfiles", popular: true },
  { id: "money-movers-3-guard-duty", title: "Money Movers 3 Guard Duty", url: GFILES_BASE + "money-movers-3-guard-duty/index.html", desc: "gfiles", popular: true },
  { id: "money-movers", title: "Money Movers", url: GFILES_BASE + "money-movers/index.html", desc: "gfiles", popular: true },
  { id: "monkey-mart", title: "Monkey Mart", url: GFILES_BASE + "monkey-mart/index.html", desc: "gfiles", popular: true },
  { id: "monster-truck-destroyer", title: "Monster Truck Destroyer", url: GFILES_BASE + "monster-truck-destroyer/index.html", desc: "gfiles", popular: true },
  { id: "monster-truck-race-arena", title: "Monster Truck Race Arena", url: GFILES_BASE + "monster-truck-race-arena/index.html", desc: "gfiles", popular: true },
  { id: "monster-truck-vs-zombie", title: "Monster Truck Vs Zombie", url: GFILES_BASE + "monster-truck-vs-zombie/index.html", desc: "gfiles", popular: true },
  { id: "moto-trial-racing-2", title: "Moto Trial Racing 2", url: GFILES_BASE + "moto-trial-racing-2/index.html", desc: "gfiles", popular: true },
  { id: "moto-x3m-2", title: "Moto X3M 2", url: GFILES_BASE + "moto-x3m-2/index.html", desc: "gfiles", popular: true },
  { id: "moto-x3m-pool-party", title: "Moto X3M Pool Party", url: GFILES_BASE + "moto-x3m-pool-party/index.html", desc: "gfiles", popular: true },
  { id: "moto-x3m-spooky-land", title: "Moto X3M Spooky Land", url: GFILES_BASE + "moto-x3m-spooky-land/index.html", desc: "gfiles", popular: true },
  { id: "moto-x3m-winter", title: "Moto X3M Winter", url: GFILES_BASE + "moto-x3m-winter/index.html", desc: "gfiles", popular: true },
  { id: "moto-x3m", title: "Moto X3M", url: GFILES_BASE + "moto-x3m/index.html", desc: "gfiles", popular: true },
  { id: "moving-truck", title: "Moving Truck", url: GFILES_BASE + "moving-truck/index.html", desc: "gfiles", popular: true },
  { id: "mr-bullet-3d", title: "Mr Bullet 3D", url: GFILES_BASE + "mr-bullet-3d/index.html", desc: "gfiles", popular: true },
  { id: "mutazone", title: "Mutazone", url: GFILES_BASE + "mutazone/index.html", desc: "gfiles", popular: true },
  { id: "my-rusty-submarine", title: "My Rusty Submarine", url: GFILES_BASE + "my-rusty-submarine/index.html", desc: "gfiles", popular: true },
  { id: "n-gon", title: "N Gon", url: GFILES_BASE + "n-gon/index.html", desc: "gfiles", popular: true },
  { id: "ninja-cat-exploit", title: "Ninja Cat Exploit", url: GFILES_BASE + "ninja-cat-exploit/index.html", desc: "gfiles", popular: true },
  { id: "ninja-vs-evilcorp", title: "Ninja Vs Evilcorp", url: GFILES_BASE + "ninja-vs-evilcorp/index.html", desc: "gfiles", popular: true },
  { id: "nitro-knights-io", title: "Nitro Knights Io", url: GFILES_BASE + "nitro-knights-io/index.html", desc: "gfiles", popular: true },
  { id: "ns-shaft", title: "Ns Shaft", url: GFILES_BASE + "ns-shaft/index.html", desc: "gfiles", popular: true },
  { id: "nut-simulator", title: "Nut Simulator", url: GFILES_BASE + "nut-simulator/index.html", desc: "gfiles", popular: true },
  { id: "offline-paradise", title: "Offline Paradise", url: GFILES_BASE + "offline-paradise/index.html", desc: "gfiles", popular: true },
  { id: "om-nom-bounce", title: "Om Nom Bounce", url: GFILES_BASE + "om-nom-bounce/index.html", desc: "gfiles", popular: true },
  { id: "ovo-2", title: "Ovo 2", url: GFILES_BASE + "ovo-2/index.html", desc: "gfiles", popular: true },
  { id: "ovo-dimensions", title: "Ovo Dimensions", url: GFILES_BASE + "ovo-dimensions/index.html", desc: "gfiles", popular: true },
  { id: "ovo", title: "Ovo", url: GFILES_BASE + "ovo/index.html", desc: "gfiles", popular: true },
  { id: "pac-man", title: "Pac Man", url: GFILES_BASE + "pac-man/index.html", desc: "gfiles", popular: true },
  { id: "pako-highway", title: "Pako Highway", url: GFILES_BASE + "pako-highway/index.html", desc: "gfiles", popular: true },
  { id: "pandemic-2", title: "Pandemic 2", url: GFILES_BASE + "pandemic-2/index.html", desc: "gfiles", popular: true },
  { id: "papa-cherry-saga", title: "Papa Cherry Saga", url: GFILES_BASE + "papa-cherry-saga/index.html", desc: "gfiles", popular: true },
  { id: "papas-bakeria", title: "Papas Bakeria", url: GFILES_BASE + "papas-bakeria/index.html", desc: "gfiles", popular: true },
  { id: "papas-burgeria", title: "Papas Burgeria", url: GFILES_BASE + "papas-burgeria/index.html", desc: "gfiles", popular: true },
  { id: "papas-cheeseria", title: "Papas Cheeseria", url: GFILES_BASE + "papas-cheeseria/index.html", desc: "gfiles", popular: true },
  { id: "papas-cupcakeria", title: "Papas Cupcakeria", url: GFILES_BASE + "papas-cupcakeria/index.html", desc: "gfiles", popular: true },
  { id: "papas-donuteria", title: "Papas Donuteria", url: GFILES_BASE + "papas-donuteria/index.html", desc: "gfiles", popular: true },
  { id: "papas-freezeria", title: "Papas Freezeria", url: GFILES_BASE + "papas-freezeria/index.html", desc: "gfiles", popular: true },
  { id: "papas-hot-doggeria", title: "Papas Hot Doggeria", url: GFILES_BASE + "papas-hot-doggeria/index.html", desc: "gfiles", popular: true },
  { id: "papas-pancakeria", title: "Papas Pancakeria", url: GFILES_BASE + "papas-pancakeria/index.html", desc: "gfiles", popular: true },
  { id: "papas-pastaria", title: "Papas Pastaria", url: GFILES_BASE + "papas-pastaria/index.html", desc: "gfiles", popular: true },
  { id: "papas-pizzeria", title: "Papas Pizzeria", url: GFILES_BASE + "papas-pizzeria/index.html", desc: "gfiles", popular: true },
  { id: "papas-scooperia", title: "Papas Scooperia", url: GFILES_BASE + "papas-scooperia/index.html", desc: "gfiles", popular: true },
  { id: "papas-sushiria", title: "Papas Sushiria", url: GFILES_BASE + "papas-sushiria/index.html", desc: "gfiles", popular: true },
  { id: "papas-taco-mia", title: "Papas Taco Mia", url: GFILES_BASE + "papas-taco-mia/index.html", desc: "gfiles", popular: true },
  { id: "papas-wingeria", title: "Papas Wingeria", url: GFILES_BASE + "papas-wingeria/index.html", desc: "gfiles", popular: true },
  { id: "paper-io-2", title: "Paper Io 2", url: GFILES_BASE + "paper-io-2/index.html", desc: "gfiles", popular: true },
  { id: "paper-minecraft", title: "Paper Minecraft", url: GFILES_BASE + "paper-minecraft/index.html", desc: "gfiles", popular: true },
  { id: "papery-planes", title: "Papery Planes", url: GFILES_BASE + "papery-planes/index.html", desc: "gfiles", popular: true },
  { id: "park-out", title: "Park Out", url: GFILES_BASE + "park-out/index.html", desc: "gfiles", popular: true },
  { id: "parking-fury-2", title: "Parking Fury 2", url: GFILES_BASE + "parking-fury-2/index.html", desc: "gfiles", popular: true },
  { id: "parking-fury-3", title: "Parking Fury 3", url: GFILES_BASE + "parking-fury-3/index.html", desc: "gfiles", popular: true },
  { id: "parking-fury", title: "Parking Fury", url: GFILES_BASE + "parking-fury/index.html", desc: "gfiles", popular: true },
  { id: "particle-clicker", title: "Particle Clicker", url: GFILES_BASE + "particle-clicker/index.html", desc: "gfiles", popular: true },
  { id: "penalty-kick-online", title: "Penalty Kick Online", url: GFILES_BASE + "penalty-kick-online/index.html", desc: "gfiles", popular: true },
  { id: "penalty-kick", title: "Penalty Kick", url: GFILES_BASE + "penalty-kick/index.html", desc: "gfiles", popular: true },
  { id: "penalty-shooters-2", title: "Penalty Shooters 2", url: GFILES_BASE + "penalty-shooters-2/index.html", desc: "gfiles", popular: true },
  { id: "pixel-gun-survival", title: "Pixel Gun Survival", url: GFILES_BASE + "pixel-gun-survival/index.html", desc: "gfiles", popular: true },
  { id: "pixel-smash-duel", title: "Pixel Smash Duel", url: GFILES_BASE + "pixel-smash-duel/index.html", desc: "gfiles", popular: true },
  { id: "pizza-tower", title: "Pizza Tower", url: GFILES_BASE + "pizza-tower/index.html", desc: "gfiles", popular: true },
  { id: "plants-vs-zombies", title: "Plants Vs Zombies", url: GFILES_BASE + "plants-vs-zombies/index.html", desc: "gfiles", popular: true },
  { id: "pokemon-emerald-2", title: "Pokemon Emerald 2", url: GFILES_BASE + "pokemon-emerald-2/index.html", desc: "gfiles", popular: true },
  { id: "pokemon-emerald", title: "Pokemon Emerald", url: GFILES_BASE + "pokemon-emerald/index.html", desc: "gfiles", popular: true },
  { id: "polybranch", title: "Polybranch", url: GFILES_BASE + "polybranch/index.html", desc: "gfiles", popular: true },
  { id: "portal-the-flash-version", title: "Portal The Flash Version", url: GFILES_BASE + "portal-the-flash-version/index.html", desc: "gfiles", popular: true },
  { id: "pou", title: "Pou", url: GFILES_BASE + "pou/index.html", desc: "gfiles", popular: true },
  { id: "president-simulator", title: "President Simulator", url: GFILES_BASE + "president-simulator/index.html", desc: "gfiles", popular: true },
  { id: "protektor", title: "Protektor", url: GFILES_BASE + "protektor/index.html", desc: "gfiles", popular: true },
  { id: "pudding-monsters", title: "Pudding Monsters", url: GFILES_BASE + "pudding-monsters/index.html", desc: "gfiles", popular: true },
  { id: "push-the-square", title: "Push The Square", url: GFILES_BASE + "push-the-square/index.html", desc: "gfiles", popular: true },
  { id: "push-your-luck", title: "Push Your Luck", url: GFILES_BASE + "push-your-luck/index.html", desc: "gfiles", popular: true },
  { id: "rabbit-samurai-2", title: "Rabbit Samurai 2", url: GFILES_BASE + "rabbit-samurai-2/index.html", desc: "gfiles", popular: true },
  { id: "rabbit-samurai", title: "Rabbit Samurai", url: GFILES_BASE + "rabbit-samurai/index.html", desc: "gfiles", popular: true },
  { id: "race-survival-arena-king", title: "Race Survival Arena King", url: GFILES_BASE + "race-survival-arena-king/index.html", desc: "gfiles", popular: true },
  { id: "racing-monster-trucks", title: "Racing Monster Trucks", url: GFILES_BASE + "racing-monster-trucks/index.html", desc: "gfiles", popular: true },
  { id: "real-flying-truck", title: "Real Flying Truck", url: GFILES_BASE + "real-flying-truck/index.html", desc: "gfiles", popular: true },
  { id: "real-garbage-truck", title: "Real Garbage Truck", url: GFILES_BASE + "real-garbage-truck/index.html", desc: "gfiles", popular: true },
  { id: "retro-bowl-college", title: "Retro Bowl College", url: GFILES_BASE + "retro-bowl-college/index.html", desc: "gfiles", popular: true },
  { id: "retro-bowl", title: "Retro Bowl", url: GFILES_BASE + "retro-bowl/index.html", desc: "gfiles", popular: true },
  { id: "riddle-school-2", title: "Riddle School 2", url: GFILES_BASE + "riddle-school-2/index.html", desc: "gfiles", popular: true },
  { id: "riddle-school-3", title: "Riddle School 3", url: GFILES_BASE + "riddle-school-3/index.html", desc: "gfiles", popular: true },
  { id: "riddle-school-4", title: "Riddle School 4", url: GFILES_BASE + "riddle-school-4/index.html", desc: "gfiles", popular: true },
  { id: "riddle-school-5", title: "Riddle School 5", url: GFILES_BASE + "riddle-school-5/index.html", desc: "gfiles", popular: true },
  { id: "riddle-school", title: "Riddle School", url: GFILES_BASE + "riddle-school/index.html", desc: "gfiles", popular: true },
  { id: "riddle-transfer-2", title: "Riddle Transfer 2", url: GFILES_BASE + "riddle-transfer-2/index.html", desc: "gfiles", popular: true },
  { id: "riddle-transfer", title: "Riddle Transfer", url: GFILES_BASE + "riddle-transfer/index.html", desc: "gfiles", popular: true },
  { id: "rise-higher", title: "Rise Higher", url: GFILES_BASE + "rise-higher/index.html", desc: "gfiles", popular: true },
  { id: "rocket-soccer-derby", title: "Rocket Soccer Derby", url: GFILES_BASE + "rocket-soccer-derby/index.html", desc: "gfiles", popular: true },
  { id: "rolling-forests", title: "Rolling Forests", url: GFILES_BASE + "rolling-forests/index.html", desc: "gfiles", popular: true },
  { id: "rolly-vortex", title: "Rolly Vortex", url: GFILES_BASE + "rolly-vortex/index.html", desc: "gfiles", popular: true },
  { id: "rooftop-snipers", title: "Rooftop Snipers", url: GFILES_BASE + "rooftop-snipers/index.html", desc: "gfiles", popular: true },
  { id: "roper", title: "Roper", url: GFILES_BASE + "roper/index.html", desc: "gfiles", popular: true },
  { id: "run-2", title: "Run 2", url: GFILES_BASE + "run-2/index.html", desc: "gfiles", popular: true },
  { id: "run-3-space", title: "Run 3 Space", url: GFILES_BASE + "run-3-space/index.html", desc: "gfiles", popular: true },
  { id: "running-fred", title: "Running Fred", url: GFILES_BASE + "running-fred/index.html", desc: "gfiles", popular: true },
  { id: "rusher-crusher", title: "Rusher Crusher", url: GFILES_BASE + "rusher-crusher/index.html", desc: "gfiles", popular: true },
  { id: "sandboxels", title: "Sandboxels", url: GFILES_BASE + "sandboxels/index.html", desc: "gfiles", popular: true },
  { id: "santy-is-home", title: "Santy Is Home", url: GFILES_BASE + "santy-is-home/index.html", desc: "gfiles", popular: true },
  { id: "save-the-doge", title: "Save The Doge", url: GFILES_BASE + "save-the-doge/index.html", desc: "gfiles", popular: true },
  { id: "scrap-metal-3-infernal-trap", title: "Scrap Metal 3 Infernal Trap", url: GFILES_BASE + "scrap-metal-3-infernal-trap/index.html", desc: "gfiles", popular: true },
  { id: "scratcharia", title: "Scratcharia", url: GFILES_BASE + "scratcharia/index.html", desc: "gfiles", popular: true },
  { id: "silk", title: "Silk", url: GFILES_BASE + "silk/index.html", desc: "gfiles", popular: true },
  { id: "skibidi-strike", title: "Skibidi Strike", url: GFILES_BASE + "skibidi-strike/index.html", desc: "gfiles", popular: true },
  { id: "skibshooter", title: "Skibshooter", url: GFILES_BASE + "skibshooter/index.html", desc: "gfiles", popular: true },
  { id: "skinwalker", title: "Skinwalker", url: GFILES_BASE + "skinwalker/index.html", desc: "gfiles", popular: true },
  { id: "sky-car-stunt-3d", title: "Sky Car Stunt 3D", url: GFILES_BASE + "sky-car-stunt-3d/index.html", desc: "gfiles", popular: true },
  { id: "skywire", title: "Skywire", url: GFILES_BASE + "skywire/index.html", desc: "gfiles", popular: true },
  { id: "slime-rush-td", title: "Slime Rush Td", url: GFILES_BASE + "slime-rush-td/index.html", desc: "gfiles", popular: true },
  { id: "sling-tomb", title: "Sling Tomb", url: GFILES_BASE + "sling-tomb/index.html", desc: "gfiles", popular: true },
  { id: "slope-2-players", title: "Slope 2 Players", url: GFILES_BASE + "slope-2-players/index.html", desc: "gfiles", popular: true },
  { id: "slope-3", title: "Slope 3", url: GFILES_BASE + "slope-3/index.html", desc: "gfiles", popular: true },
  { id: "slope-ball", title: "Slope Ball", url: GFILES_BASE + "slope-ball/index.html", desc: "gfiles", popular: true },
  { id: "slope-city", title: "Slope City", url: GFILES_BASE + "slope-city/index.html", desc: "gfiles", popular: true },
  { id: "slope-run", title: "Slope Run", url: GFILES_BASE + "slope-run/index.html", desc: "gfiles", popular: true },
  { id: "slope-tunnel", title: "Slope Tunnel", url: GFILES_BASE + "slope-tunnel/index.html", desc: "gfiles", popular: true },
  { id: "slope", title: "Slope", url: GFILES_BASE + "slope/index.html", desc: "gfiles", popular: true },
  { id: "smash-karts", title: "Smash Karts", url: GFILES_BASE + "smash-karts/index.html", desc: "gfiles", popular: true },
  { id: "smokin-barrels", title: "Smokin Barrels", url: GFILES_BASE + "smokin-barrels/index.html", desc: "gfiles", popular: true },
  { id: "snail-bob-7", title: "Snail Bob 7", url: GFILES_BASE + "snail-bob-7/index.html", desc: "gfiles", popular: true },
  { id: "snail-bob-8-island-story", title: "Snail Bob 8 Island Story", url: GFILES_BASE + "snail-bob-8-island-story/index.html", desc: "gfiles", popular: true },
  { id: "snake-io-war", title: "Snake Io War", url: GFILES_BASE + "snake-io-war/index.html", desc: "gfiles", popular: true },
  { id: "snow-battle-io", title: "Snow Battle Io", url: GFILES_BASE + "snow-battle-io/index.html", desc: "gfiles", popular: true },
  { id: "snow-rider-3d", title: "Snow Rider 3D", url: GFILES_BASE + "snow-rider-3d/index.html", desc: "gfiles", popular: true },
  { id: "soccer-heads", title: "Soccer Heads", url: GFILES_BASE + "soccer-heads/index.html", desc: "gfiles", popular: true },
  { id: "soccer-random", title: "Soccer Random", url: GFILES_BASE + "soccer-random/index.html", desc: "gfiles", popular: true },
  { id: "soccer-skills", title: "Soccer Skills", url: GFILES_BASE + "soccer-skills/index.html", desc: "gfiles", popular: true },
  { id: "soldier-legend", title: "Soldier Legend", url: GFILES_BASE + "soldier-legend/index.html", desc: "gfiles", popular: true },
  { id: "solitaire", title: "Solitaire", url: GFILES_BASE + "solitaire/index.html", desc: "gfiles", popular: true },
  { id: "sort-the-court", title: "Sort The Court", url: GFILES_BASE + "sort-the-court/index.html", desc: "gfiles", popular: true },
  { id: "space-bar-clicker", title: "Space Bar Clicker", url: GFILES_BASE + "space-bar-clicker/index.html", desc: "gfiles", popular: true },
  { id: "space-company", title: "Space Company", url: GFILES_BASE + "space-company/index.html", desc: "gfiles", popular: true },
  { id: "space-garden", title: "Space Garden", url: GFILES_BASE + "space-garden/index.html", desc: "gfiles", popular: true },
  { id: "spider-solitaire", title: "Spider Solitaire", url: GFILES_BASE + "spider-solitaire/index.html", desc: "gfiles", popular: true },
  { id: "spiral-roll", title: "Spiral Roll", url: GFILES_BASE + "spiral-roll/index.html", desc: "gfiles", popular: true },
  { id: "sprinter", title: "Sprinter", url: GFILES_BASE + "sprinter/index.html", desc: "gfiles", popular: true },
  { id: "stack", title: "Stack", url: GFILES_BASE + "stack/index.html", desc: "gfiles", popular: true },
  { id: "stair-race-3d", title: "Stair Race 3D", url: GFILES_BASE + "stair-race-3d/index.html", desc: "gfiles", popular: true },
  { id: "station-141", title: "Station 141", url: GFILES_BASE + "station-141/index.html", desc: "gfiles", popular: true },
  { id: "stealing-the-diamond", title: "Stealing The Diamond", url: GFILES_BASE + "stealing-the-diamond/index.html", desc: "gfiles", popular: true },
  { id: "stick-archers-battle", title: "Stick Archers Battle", url: GFILES_BASE + "stick-archers-battle/index.html", desc: "gfiles", popular: true },
  { id: "stick-defenders", title: "Stick Defenders", url: GFILES_BASE + "stick-defenders/index.html", desc: "gfiles", popular: true },
  { id: "stick-duel-battle", title: "Stick Duel Battle", url: GFILES_BASE + "stick-duel-battle/index.html", desc: "gfiles", popular: true },
  { id: "stick-merge", title: "Stick Merge", url: GFILES_BASE + "stick-merge/index.html", desc: "gfiles", popular: true },
  { id: "stickman-boost", title: "Stickman Boost", url: GFILES_BASE + "stickman-boost/index.html", desc: "gfiles", popular: true },
  { id: "stickman-hook", title: "Stickman Hook", url: GFILES_BASE + "stickman-hook/index.html", desc: "gfiles", popular: true },
  { id: "stickman-that-one-level", title: "Stickman That One Level", url: GFILES_BASE + "stickman-that-one-level/index.html", desc: "gfiles", popular: true },
  { id: "stickman-vs-skibidi-toilet", title: "Stickman Vs Skibidi Toilet", url: GFILES_BASE + "stickman-vs-skibidi-toilet/index.html", desc: "gfiles", popular: true },
  { id: "stickman-vs-zombies", title: "Stickman Vs Zombies", url: GFILES_BASE + "stickman-vs-zombies/index.html", desc: "gfiles", popular: true },
  { id: "stickman-war", title: "Stickman War", url: GFILES_BASE + "stickman-war/index.html", desc: "gfiles", popular: true },
  { id: "stock-car-hero", title: "Stock Car Hero", url: GFILES_BASE + "stock-car-hero/index.html", desc: "gfiles", popular: true },
  { id: "storm-city-mafia", title: "Storm City Mafia", url: GFILES_BASE + "storm-city-mafia/index.html", desc: "gfiles", popular: true },
  { id: "storm-the-house-2", title: "Storm The House 2", url: GFILES_BASE + "storm-the-house-2/index.html", desc: "gfiles", popular: true },
  { id: "strawberella", title: "Strawberella", url: GFILES_BASE + "strawberella/index.html", desc: "gfiles", popular: true },
  { id: "strike-force-heroes", title: "Strike Force Heroes", url: GFILES_BASE + "strike-force-heroes/index.html", desc: "gfiles", popular: true },
  { id: "subway-surfers-ny", title: "Subway Surfers Ny", url: GFILES_BASE + "subway-surfers-ny/index.html", desc: "gfiles", popular: true },
  { id: "subway-surfers", title: "Subway Surfers", url: GFILES_BASE + "subway-surfers/index.html", desc: "gfiles", popular: true },
  { id: "super-falling-fred", title: "Super Falling Fred", url: GFILES_BASE + "super-falling-fred/index.html", desc: "gfiles", popular: true },
  { id: "super-heroes", title: "Super Heroes", url: GFILES_BASE + "super-heroes/index.html", desc: "gfiles", popular: true },
  { id: "super-hexbee-merger", title: "Super Hexbee Merger", url: GFILES_BASE + "super-hexbee-merger/index.html", desc: "gfiles", popular: true },
  { id: "super-liquid-soccer", title: "Super Liquid Soccer", url: GFILES_BASE + "super-liquid-soccer/index.html", desc: "gfiles", popular: true },
  { id: "super-mario-64", title: "Super Mario 64", url: GFILES_BASE + "super-mario-64/index.html", desc: "gfiles", popular: true },
  { id: "super-mario-bros-wonder", title: "Super Mario Bros Wonder", url: GFILES_BASE + "super-mario-bros-wonder/index.html", desc: "gfiles", popular: true },
  { id: "super-mario-bros", title: "Super Mario Bros", url: GFILES_BASE + "super-mario-bros/index.html", desc: "gfiles", popular: true },
  { id: "super-stickman-golf", title: "Super Stickman Golf", url: GFILES_BASE + "super-stickman-golf/index.html", desc: "gfiles", popular: true },
  { id: "super-tornado-io", title: "Super Tornado Io", url: GFILES_BASE + "super-tornado-io/index.html", desc: "gfiles", popular: true },
  { id: "superhot", title: "Superhot", url: GFILES_BASE + "superhot/index.html", desc: "gfiles", popular: true },
  { id: "survivor-in-rainbow-monster", title: "Survivor In Rainbow Monster", url: GFILES_BASE + "survivor-in-rainbow-monster/index.html", desc: "gfiles", popular: true },
  { id: "swingo", title: "Swingo", url: GFILES_BASE + "swingo/index.html", desc: "gfiles", popular: true },
  { id: "synesthesia", title: "Synesthesia", url: GFILES_BASE + "synesthesia/index.html", desc: "gfiles", popular: true },
  { id: "tactical-assassin-2", title: "Tactical Assassin 2", url: GFILES_BASE + "tactical-assassin-2/index.html", desc: "gfiles", popular: true },
  { id: "tactical-weapon-pack-2", title: "Tactical Weapon Pack 2", url: GFILES_BASE + "tactical-weapon-pack-2/index.html", desc: "gfiles", popular: true },
  { id: "tag", title: "Tag", url: GFILES_BASE + "tag/index.html", desc: "gfiles", popular: true },
  { id: "tall-io", title: "Tall Io", url: GFILES_BASE + "tall-io/index.html", desc: "gfiles", popular: true },
  { id: "tank-trouble-2", title: "Tank Trouble 2", url: GFILES_BASE + "tank-trouble-2/index.html", desc: "gfiles", popular: true },
  { id: "tanuki-sunset", title: "Tanuki Sunset", url: GFILES_BASE + "tanuki-sunset/index.html", desc: "gfiles", popular: true },
  { id: "tap-tap-shots", title: "Tap Tap Shots", url: GFILES_BASE + "tap-tap-shots/index.html", desc: "gfiles", popular: true },
  { id: "temple-of-boom", title: "Temple Of Boom", url: GFILES_BASE + "temple-of-boom/index.html", desc: "gfiles", popular: true },
  { id: "temple-run-2", title: "Temple Run 2", url: GFILES_BASE + "temple-run-2/index.html", desc: "gfiles", popular: true },
  { id: "territorial-io", title: "Territorial Io", url: GFILES_BASE + "territorial-io/index.html", desc: "gfiles", popular: true },
  { id: "the-battle", title: "The Battle", url: GFILES_BASE + "the-battle/index.html", desc: "gfiles", popular: true },
  { id: "the-black-knight", title: "The Black Knight", url: GFILES_BASE + "the-black-knight/index.html", desc: "gfiles", popular: true },
  { id: "the-final-earth", title: "The Final Earth", url: GFILES_BASE + "the-final-earth/index.html", desc: "gfiles", popular: true },
  { id: "the-heist", title: "The Heist", url: GFILES_BASE + "the-heist/index.html", desc: "gfiles", popular: true },
  { id: "the-hotel", title: "The Hotel", url: GFILES_BASE + "the-hotel/index.html", desc: "gfiles", popular: true },
  { id: "the-impossible-quiz", title: "The Impossible Quiz", url: GFILES_BASE + "the-impossible-quiz/index.html", desc: "gfiles", popular: true },
  { id: "there-is-no-game", title: "There Is No Game", url: GFILES_BASE + "there-is-no-game/index.html", desc: "gfiles", popular: true },
  { id: "this-is-the-only-level", title: "This Is The Only Level", url: GFILES_BASE + "this-is-the-only-level/index.html", desc: "gfiles", popular: true },
  { id: "tiny-fishing", title: "Tiny Fishing", url: GFILES_BASE + "tiny-fishing/index.html", desc: "gfiles", popular: true },
  { id: "tiny-islands", title: "Tiny Islands", url: GFILES_BASE + "tiny-islands/index.html", desc: "gfiles", popular: true },
  { id: "toss-the-turtle", title: "Toss The Turtle", url: GFILES_BASE + "toss-the-turtle/index.html", desc: "gfiles", popular: true },
  { id: "tower-crash-3d", title: "Tower Crash 3D", url: GFILES_BASE + "tower-crash-3d/index.html", desc: "gfiles", popular: true },
  { id: "townscaper", title: "Townscaper", url: GFILES_BASE + "townscaper/index.html", desc: "gfiles", popular: true },
  { id: "traffic-control", title: "Traffic Control", url: GFILES_BASE + "traffic-control/index.html", desc: "gfiles", popular: true },
  { id: "traffic-mania", title: "Traffic Mania", url: GFILES_BASE + "traffic-mania/index.html", desc: "gfiles", popular: true },
  { id: "trains-io", title: "Trains Io", url: GFILES_BASE + "trains-io/index.html", desc: "gfiles", popular: true },
  { id: "transporters-io", title: "Transporters Io", url: GFILES_BASE + "transporters-io/index.html", desc: "gfiles", popular: true },
  { id: "trimps", title: "Trimps", url: GFILES_BASE + "trimps/index.html", desc: "gfiles", popular: true },
  { id: "trollface-quest-horror-2", title: "Trollface Quest Horror 2", url: GFILES_BASE + "trollface-quest-horror-2/index.html", desc: "gfiles", popular: true },
  { id: "trump-the-puppet", title: "Trump The Puppet", url: GFILES_BASE + "trump-the-puppet/index.html", desc: "gfiles", popular: true },
  { id: "tube-jumpers", title: "Tube Jumpers", url: GFILES_BASE + "tube-jumpers/index.html", desc: "gfiles", popular: true },
  { id: "tunnel-rush-2", title: "Tunnel Rush 2", url: GFILES_BASE + "tunnel-rush-2/index.html", desc: "gfiles", popular: true },
  { id: "tunnel-rush", title: "Tunnel Rush", url: GFILES_BASE + "tunnel-rush/index.html", desc: "gfiles", popular: true },
  { id: "turbo-dismounting", title: "Turbo Dismounting", url: GFILES_BASE + "turbo-dismounting/index.html", desc: "gfiles", popular: true },
  { id: "turn-turn", title: "Turn Turn", url: GFILES_BASE + "turn-turn/index.html", desc: "gfiles", popular: true },
  { id: "twitch-tetris", title: "Twitch Tetris", url: GFILES_BASE + "twitch-tetris/index.html", desc: "gfiles", popular: true },
  { id: "two-ball-3d", title: "Two Ball 3D", url: GFILES_BASE + "two-ball-3d/index.html", desc: "gfiles", popular: true },
  { id: "two-tunnel-3d", title: "Two Tunnel 3D", url: GFILES_BASE + "two-tunnel-3d/index.html", desc: "gfiles", popular: true },
  { id: "ultimate-offroad", title: "Ultimate Offroad", url: GFILES_BASE + "ultimate-offroad/index.html", desc: "gfiles", popular: true },
  { id: "veloce", title: "Veloce", url: GFILES_BASE + "veloce/index.html", desc: "gfiles", popular: true },
  { id: "vex-3", title: "Vex 3", url: GFILES_BASE + "vex-3/index.html", desc: "gfiles", popular: true },
  { id: "vex-4", title: "Vex 4", url: GFILES_BASE + "vex-4/index.html", desc: "gfiles", popular: true },
  { id: "vex-5", title: "Vex 5", url: GFILES_BASE + "vex-5/index.html", desc: "gfiles", popular: true },
  { id: "vex-6", title: "Vex 6", url: GFILES_BASE + "vex-6/index.html", desc: "gfiles", popular: true },
  { id: "vex-7", title: "Vex 7", url: GFILES_BASE + "vex-7/index.html", desc: "gfiles", popular: true },
  { id: "vex-8", title: "Vex 8", url: GFILES_BASE + "vex-8/index.html", desc: "gfiles", popular: true },
  { id: "volley-random", title: "Volley Random", url: GFILES_BASE + "volley-random/index.html", desc: "gfiles", popular: true },
  { id: "wallsmash", title: "Wallsmash", url: GFILES_BASE + "wallsmash/index.html", desc: "gfiles", popular: true },
  { id: "waterworks", title: "Waterworks", url: GFILES_BASE + "waterworks/index.html", desc: "gfiles", popular: true },
  { id: "we-become-what-we-behold", title: "We Become What We Behold", url: GFILES_BASE + "we-become-what-we-behold/index.html", desc: "gfiles", popular: true },
  { id: "webgl-fluid-simulation", title: "Webgl Fluid Simulation", url: GFILES_BASE + "webgl-fluid-simulation/index.html", desc: "gfiles", popular: true },
  { id: "whack-your-boss", title: "Whack Your Boss", url: GFILES_BASE + "whack-your-boss/index.html", desc: "gfiles", popular: true },
  { id: "wheelie-bike-2", title: "Wheelie Bike 2", url: GFILES_BASE + "wheelie-bike-2/index.html", desc: "gfiles", popular: true },
  { id: "wheelie-bike", title: "Wheelie Bike", url: GFILES_BASE + "wheelie-bike/index.html", desc: "gfiles", popular: true },
  { id: "wheely-2", title: "Wheely 2", url: GFILES_BASE + "wheely-2/index.html", desc: "gfiles", popular: true },
  { id: "wheely-3", title: "Wheely 3", url: GFILES_BASE + "wheely-3/index.html", desc: "gfiles", popular: true },
  { id: "wheely-4-time-travel", title: "Wheely 4 Time Travel", url: GFILES_BASE + "wheely-4-time-travel/index.html", desc: "gfiles", popular: true },
  { id: "wheely-5-armageddon", title: "Wheely 5 Armageddon", url: GFILES_BASE + "wheely-5-armageddon/index.html", desc: "gfiles", popular: true },
  { id: "wheely-6-fairytale", title: "Wheely 6 Fairytale", url: GFILES_BASE + "wheely-6-fairytale/index.html", desc: "gfiles", popular: true },
  { id: "wheely-7-detective", title: "Wheely 7 Detective", url: GFILES_BASE + "wheely-7-detective/index.html", desc: "gfiles", popular: true },
  { id: "wheely-8-aliens", title: "Wheely 8 Aliens", url: GFILES_BASE + "wheely-8-aliens/index.html", desc: "gfiles", popular: true },
  { id: "wizard-mike", title: "Wizard Mike", url: GFILES_BASE + "wizard-mike/index.html", desc: "gfiles", popular: true },
  { id: "wolfenstein-3d", title: "Wolfenstein 3D", url: GFILES_BASE + "wolfenstein-3d/index.html", desc: "gfiles", popular: true },
  { id: "wood-block-puzzle", title: "Wood Block Puzzle", url: GFILES_BASE + "wood-block-puzzle/index.html", desc: "gfiles", popular: true },
  { id: "woodventure", title: "Woodventure", url: GFILES_BASE + "woodventure/index.html", desc: "gfiles", popular: true },
  { id: "word-slide", title: "Word Slide", url: GFILES_BASE + "word-slide/index.html", desc: "gfiles", popular: true },
  { id: "wordle-unlimited", title: "Wordle Unlimited", url: GFILES_BASE + "wordle-unlimited/index.html", desc: "gfiles", popular: true },
  { id: "wordle", title: "Wordle", url: GFILES_BASE + "wordle/index.html", desc: "gfiles", popular: true },
  { id: "worlds-hardest-game-2", title: "Worlds Hardest Game 2", url: GFILES_BASE + "worlds-hardest-game-2/index.html", desc: "gfiles", popular: true },
  { id: "worlds-hardest-game", title: "Worlds Hardest Game", url: GFILES_BASE + "worlds-hardest-game/index.html", desc: "gfiles", popular: true },
  { id: "wormeat-io", title: "Wormeat Io", url: GFILES_BASE + "wormeat-io/index.html", desc: "gfiles", popular: true },
  { id: "x-trial-racing", title: "X Trial Racing", url: GFILES_BASE + "x-trial-racing/index.html", desc: "gfiles", popular: true },
  { id: "xmas-cookie-clicker", title: "Xmas Cookie Clicker", url: GFILES_BASE + "xmas-cookie-clicker/index.html", desc: "gfiles", popular: true },
  { id: "xx142-b2exe", title: "Xx142 B2Exe", url: GFILES_BASE + "xx142-b2exe/index.html", desc: "gfiles", popular: true },
  { id: "yoshis-fabrication-station", title: "Yoshis Fabrication Station", url: GFILES_BASE + "yoshis-fabrication-station/index.html", desc: "gfiles", popular: true },
  { id: "zombie-derby-pixel-survival", title: "Zombie Derby Pixel Survival", url: GFILES_BASE + "zombie-derby-pixel-survival/index.html", desc: "gfiles", popular: true },
  { id: "backrooms-2d", title: "Backrooms 2D", url: GFILES2_BASE + "backrooms-2d/index.html", desc: "gfiles2", popular: true },
  { id: "bullet-force", title: "Bullet Force", url: GFILES2_BASE + "bullet-force/index.html", desc: "gfiles2", popular: true },
  { id: "burnin-rubber-5-xs", title: "Burnin Rubber 5 Xs", url: GFILES2_BASE + "burnin-rubber-5-xs/index.html", desc: "gfiles2", popular: true },
  { id: "drift-hunters-2", title: "Drift Hunters 2", url: GFILES2_BASE + "drift-hunters-2/index.html", desc: "gfiles2", popular: true },
  { id: "drift-hunters", title: "Drift Hunters", url: GFILES2_BASE + "drift-hunters/index.html", desc: "gfiles2", popular: true },
  { id: "earn-to-die", title: "Earn To Die", url: GFILES2_BASE + "earn-to-die/index.html", desc: "gfiles2", popular: true },
  { id: "fisherman-life", title: "Fisherman Life", url: GFILES2_BASE + "fisherman-life/index.html", desc: "gfiles2", popular: true },
  { id: "idle-light-city", title: "Idle Light City", url: GFILES2_BASE + "idle-light-city/index.html", desc: "gfiles2", popular: true },
  { id: "pokemon-firered", title: "Pokemon Firered", url: GFILES2_BASE + "pokemon-firered/index.html", desc: "gfiles2", popular: true },
  { id: "skiing-fred", title: "Skiing Fred", url: GFILES2_BASE + "skiing-fred/index.html", desc: "gfiles2", popular: true },
  { id: "stickman-go", title: "Stickman Go", url: GFILES2_BASE + "stickman-go/index.html", desc: "gfiles2", popular: true },
  { id: "super-mario-construct", title: "Super Mario Construct", url: GFILES2_BASE + "super-mario-construct/index.html", desc: "gfiles2", popular: true }
];
let favoriteGamesList = JSON.parse(localStorage.getItem('nullx_favorites_arr')) || [];
let contextTargetId = null;

// ==========================================
// NULLAI BASE44 CORE INTERACTION SYSTEM
// ==========================================
const BASE44_BASE_URL = "https://nullai.base44.app";
const BASE44_APP_ID = "6687ebfbbbaa7e8910eb4eb9";
const BASE44_API_KEY = "c00d41eb8e5c8e44ebae08764a75";
let activeChatSessionId = null;

async function initializeBase44Chat() {
    try {
        const response = await fetch(`${BASE44_BASE_URL}/entities/Chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-app-id": BASE44_APP_ID,
                "api_key": BASE44_API_KEY
            },
            body: JSON.stringify({
                title: `Dashboard Session - ${new Date().toLocaleTimeString()}`,
                chat_type: "saved"
            })
        });
        if (!response.ok) throw new Error("Failed initialization link.");
        const chatData = await response.json();
        activeChatSessionId = chatData.id;
        console.log("[NullAI] Connected Session ID:", activeChatSessionId);
    } catch (err) {
        console.error("[NullAI Setup Error]:", err);
        activeChatSessionId = "fallback_" + Math.random().toString(36).substring(7);
    }
}

async function sendChatMessage(userText) {
    if (!activeChatSessionId) await initializeBase44Chat();
    try {
        const userMsgResponse = await fetch(`${BASE44_BASE_URL}/entities/Message`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-app-id": BASE44_APP_ID, "api_key": BASE44_API_KEY },
            body: JSON.stringify({ role: "user", content: userText, chat_id: activeChatSessionId })
        });
        if (!userMsgResponse.ok) throw new Error("Failed to sync record.");

        await new Promise(resolve => setTimeout(resolve, 1800));

        const checkReplyResponse = await fetch(`${BASE44_BASE_URL}/entities/Message?chat_id=${activeChatSessionId}&sort=createdAt:desc&limit=2`, {
            method: "GET",
            headers: { "x-app-id": BASE44_APP_ID, "api_key": BASE44_API_KEY }
        });
        if (!checkReplyResponse.ok) throw new Error("Failed to pull response.");
        const messages = await checkReplyResponse.json();

        if (messages && messages.length > 0 && (messages[0].role === "assistant" || messages[0].role === "agent")) {
            return messages[0].content;
        }
        return "System processing query. Try asking again if the line remains idle.";
    } catch (error) {
        console.error("[NullAI Operational Fault]:", error);
        return "Connection timed out. Check back momentarily.";
    }
}

function attachChatEventListeners() {
    const chatBox = document.getElementById("chatBox");
    const chatInput = document.getElementById("chatInput");
    const sendBtn = document.getElementById("sendBtn");

    if (!chatBox || !chatInput) return;

    async function handleTransmission() {
        const queryText = chatInput.value.trim();
        if (!queryText) return;

        renderBubble(queryText, "user-bubble");
        chatInput.value = "";

        const waitIndicator = renderBubble("Analyzing input streams...", "assistant-bubble loading-state");
        const replyString = await sendChatMessage(queryText);

        waitIndicator.remove();
        renderBubble(replyString, "assistant-bubble");
    }

    function renderBubble(contentStr, stylingClass) {
        const element = document.createElement("div");
        element.className = `chat-bubble ${stylingClass}`;
        element.innerText = contentStr;
        chatBox.appendChild(element);
        chatBox.scrollTop = chatBox.scrollHeight;
        return element;
    }

    sendBtn?.addEventListener("click", handleTransmission);
    chatInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") handleTransmission();
    });
}

function launchStealthWindow(maskType, targetEnv) {
  // Strip off any existing parameters to get a clean base URL
  const currentUrl = window.location.href.split('?')[0];
  let title = "Google Docs";
  let escapeRedirect = "https://docs.google.com";

  const customCloaks = {
    'Google Classroom': { t: "Home", r: "https://classroom.google.com/" },
    'Google Drive': { t: "My Drive - Google Drive", r: "https://drive.google.com/" },
    'Gmail': { t: "Inbox (12) - Google Mail", r: "https://mail.google.com/" },
    'Canvas': { t: "Dashboard", r: "https://www.instructure.com/" },
    'Canva': { t: "Home - Canva", r: "https://www.canva.com/" },
    'Microsoft 365': { t: "Search | M365 Copilot", r: "https://m365.cloud.microsoft/search?from=PortalHome&auth=2&origindomain=microsoft365&client-request-id=8f00c2ca-b9d5-43f0-9056-d1cca74442ba" },
    'NoRedInk': { t: "Student Home | NoRedInk", r: "https://www.noredink.com/learn/home" },
    'Neptune Navigate': { t: "Universal - Portal", r: "https://universal.neptunenavigate.com/course/view/j6orc8CW0xCrSodEmuZ4rAMl32Ml32" },
    'Pear Assessment': { t: "Assignments - Pear Assessment", r: "https://assessment.peardeck.com/home/assignments" },
    'Membean': { t: "Dashboard", r: "https://membean.com/dashboard" },
    'i-Ready Reading': { t: "Reading Home Page, i-Ready", r: "https://login.i-ready.com/mspro/dashboard/home" },
    'i-Ready Math': { t: "Math Home Page, i-Ready", r: "https://login.i-ready.com/mspro/dashboard/home" },
    'DeltaMath': { t: "DeltaMath Student Application", r: "https://www.deltamath.com/app/student/4796542/upcoming" },
    'ExploreLearning Gizmos': { t: "ExploreLearning Gizmos", r: "https://apps.explorelearning.com/gizmos?altRedirectID=0" },
    'Progress Learning': { t: "Assignments | Progress Learning", r: "https://app.progresslearning.com/classlink?code=c1774361678626941d7d1c9cfefa3f6fbd4cbdf674eca2&response_type=code" },
    'Student Support Time': { t: "Thrive - Dashboard", r: "https://forsyth.studentsupporttime.com/SHome#!/app/dashboard" },
    'Kahoot': { t: "Kahoot!", r: "https://kahoot.it/" },
    'Nearpod': { t: "Nearpod", r: "https://nearpod.com/student/" },
    'Khan Academy': { t: "Khan Academy | Free Online Courses, Lessons & Practice", r: "https://www.khanacademy.org/" },
    'Coursera': { t: "Coursera | Online Courses & Credentials", r: "https://www.coursera.org/" },
    'edX': { t: "edX | Online Courses from the World's Best Universities", r: "https://www.edx.org/" },
    'Quizlet': { t: "Quizlet - Flashcards, Study Guides & More", r: "https://quizlet.com/" },
    'Grammarly': { t: "Grammarly: Free Writing AI Assistant", r: "https://www.grammarly.com/" },
    'Clever': { t: "Clever | Single Sign-On for Education", r: "https://clever.com/" },
    'Blackboard': { t: "Blackboard | Education Delivery Platform", r: "https://www.blackboard.com/" },
    'Moodle': { t: "Moodle - Open-source learning platform", r: "https://moodle.org/" },
    'Schoology': { t: "Schoology - Learning Management System", r: "https://www.scholology.com/" },
    'Google Docs': { t: "Google Docs", r: "https://docs.google.com/" },
    'Google Slides': { t: "Google Slides", r: "https://slides.google.com/" },
    'Google Sheets': { t: "Google Sheets", r: "https://sheets.google.com/" },
    'IXL': { t: "IXL | Math, Language Arts, Science, Social Studies", r: "https://www.ixl.com/" },
    'Prodigy': { t: "Prodigy | Math Game for Students", r: "https://www.prodigygame.com/" },
    'BrainPOP': { t: "BrainPOP - Animated Educational Site", r: "https://www.brainpop.com/" },
    'PBS Kids': { t: "PBS KIDS", r: "https://pbskids.org/" },
    'Starfall': { t: "Starfall Education: Learn to Read", r: "https://www.starfall.com/" },
    'ABCmouse': { t: "ABCmouse.com - Early Learning Academy", r: "https://www.abcmouse.com/" },
    'Duolingo': { t: "Duolingo - The world's best way to learn a language", r: "https://www.duolingo.com/" },
    'Code.org': { t: "Code.org - Learn Computer Science", r: "https://code.org/" },
    'Scholastic': { t: "Scholastic | Books for Kids", r: "https://www.scholastic.com/" },
    'National Geographic Kids': { t: "National Geographic Kids", r: "https://kids.nationalgeographic.com/" },
    'Wolfram Alpha': { t: "Wolfram|Alpha: Computational Knowledge Engine", r: "https://www.wolframalpha.com/" },
    'Chegg': { t: "Chegg - Get 24/7 Homework Help", r: "https://www.chegg.com/" },
    'Pearson': { t: "Pearson | The world's learning company", r: "https://www.pearson.com/" },
    'Houghton Mifflin Harcourt': { t: "HMH | Education Resources", r: "https://www.hmhco.com/" },
    'McGraw Hill': { t: "McGraw Hill - Education", r: "https://www.mheducation.com/" },
    'Desmos': { t: "Desmos | Graphing Calculator", r: "https://www.desmos.com/" },
    'CK-12': { t: "CK-12 Foundation", r: "https://www.ck12.org/" },
    'TED-Ed': { t: "TED-Ed | Lessons Worth Sharing", r: "https://ed.ted.com/" },
    'Britannica': { t: "Encyclopædia Britannica", r: "https://www.britannica.com/" },
    'Smithsonian Learning Lab': { t: "Smithsonian Learning Lab", r: "https://learninglab.si.edu/" },
    'Common App': { t: "Common App | Apply to College", r: "https://www.commonapp.org/" },
    'College Board': { t: "College Board - SAT, AP, College Search", r: "https://www.collegeboard.org/" },
    'Khan Academy Kids': { t: "Khan Academy Kids - Free Educational App", r: "https://www.khanacademy.org/khan-academy-kids" },
    'SplashLearn': { t: "SplashLearn - Fun Math & ELA Learning", r: "https://www.splashlearn.com/" },
    'Quizizz': { t: "Quizizz | Make Learning Fun", r: "https://quizizz.com/" },
    'Edpuzzle': { t: "Edpuzzle - Make Any Video Your Lesson", r: "https://edpuzzle.com/" },
    'Notion': { t: "Notion - All-in-one Workspace", r: "https://www.notion.so/" },
    'OpenStax': { t: "OpenStax - Free Textbooks", r: "https://openstax.org/" },
    'Crash Course': { t: "Crash Course", r: "https://thecrashcourse.com/" },
    'BBC Bitesize': { t: "BBC Bitesize - Learning Resources", r: "https://www.bbc.co.uk/bitesize" },
    'Skillshare': { t: "Skillshare - Online Classes", r: "https://www.skillshare.com/" },
    'Udemy': { t: "Udemy - Online Courses", r: "https://www.udemy.com/" },
    'LinkedIn Learning': { t: "LinkedIn Learning", r: "https://www.linkedin.com/learning/" },
    'Harvard Online': { t: "Harvard Online Courses", r: "https://online.harvard.edu/" },
    'Mystery Science': { t: "Mystery Science", r: "https://mysteryscience.com/" },
    'Reading IQ': { t: "ReadingIQ - Digital Library", r: "https://www.readingiq.com/" },
    'CodeSpark': { t: "codeSpark Academy", r: "https://codespark.org/" },
    'Brighterly': { t: "Brighterly - Math for Kids", r: "https://brighterly.com/" },
    'Storynory': { t: "Storynory - Free Audio Stories", r: "https://www.storynory.com/" },
    'CoolMath': { t: "Cool Math Games & Lessons", r: "https://www.coolmath.com/" },
    'DOGOnews': { t: "DOGOnews - Kid News", r: "https://www.dogonews.com/" },
    'Brainscape': { t: "Brainscape - Flashcards", r: "https://www.brainscape.com/" },
    'Piazza': { t: "Piazza - Q&A Platform", r: "https://piazza.com/" },
    'Quizalize': { t: "Quizalize - Adaptive Quizzes", r: "https://www.quizalize.com/" },
    'Classkick': { t: "Classkick - Real-time Feedback", r: "https://www.classkick.com/" },
    'Peergrade': { t: "Peergrade - Peer Assessment", r: "https://www.peergrade.io/" },
    'Open Yale Courses': { t: "Open Yale Courses", r: "https://oyc.yale.edu/" },
    'MIT OpenCourseWare': { t: "MIT OpenCourseWare", r: "https://ocw.mit.edu/" },
    'FutureLearn': { t: "FutureLearn - Online Courses", r: "https://www.futurelearn.com/" },
    'MasterClass': { t: "MasterClass - Learn from the Best", r: "https://www.masterclass.com/" },
    'Codecademy': { t: "Codecademy - Learn to Code", r: "https://www.codecademy.com/" },
    'freeCodeCamp': { t: "freeCodeCamp.org", r: "https://www.freecodecamp.org/" },
    'Pluralsight': { t: "Pluralsight - Tech Skills Platform", r: "https://www.pluralsight.com/" },
    'DataCamp': { t: "DataCamp - Learn Data Science", r: "https://www.datacamp.com/" },
    'Tynker': { t: "Tynker - Coding for Kids", r: "https://www.tynker.com/" },
    'Scratch': { t: "Scratch - Imagine, Program, Share", r: "https://scratch.mit.edu/" },
    'Outschool': { t: "Outschool - Live Online Classes", r: "https://outschool.com/" },
    'Epic!': { t: "Epic - Kids' Books and Videos", r: "https://www.getepic.com/" },
    'XtraMath': { t: "XtraMath - Math Fact Fluency", r: "https://xtramath.org/" },
    'Babbel': { t: "Babbel - Language Learning", r: "https://www.babbel.com/" },
    'Rosetta Stone': { t: "Rosetta Stone - Language Learning", r: "https://www.rosettastone.com/" },
    'Memrise': { t: "Memrise - Learn Languages", r: "https://www.memrise.com/" },
    'Busuu': { t: "Busuu - Learn Languages Online", r: "https://www.busuu.com/" },
    'Fluenz': { t: "Fluenz - Language Learning", r: "https://fluenz.com/" },
    'Mango Languages': { t: "Mango Languages", r: "https://mangolanguages.com/" },
    'Pimsleur': { t: "Pimsleur - Learn a New Language", r: "https://www.pimsleur.com/" },
    'Glossika': { t: "Glossika - Language Training", r: "https://ai.glossika.com/" },
    'Lingodeer': { t: "LingoDeer - Learn Languages", r: "https://www.lingodeer.com/" },
    'Drops': { t: "Drops - Learn Languages", r: "https://languagedrops.com/" },
    'Yousician': { t: "Yousician - Learn Guitar, Piano, Bass & Ukulele", r: "https://yousician.com/" },
    'Simply Piano': { t: "Simply Piano - Learn Piano", r: "https://www.joytunes.com/simply-piano" },
    'Flowkey': { t: "flowkey - Learn Piano", r: "https://www.flowkey.com/" },
    'Synthesia': { t: "Synthesia - Piano Game", r: "https://synthesiagame.com/" },
    'Skoove': { t: "Skoove - Learn to Play Piano", r: "https://www.skoove.com/" },
    'Perfect Ear': { t: "Perfect Ear - Ear Training", r: "https://www.perfectear.app/" },
    'ToneGym': { t: "ToneGym - Ear Training for Musicians", r: "https://www.tonegym.co/" },
    'Soundgym': { t: "SoundGym - Audio Ear Training", r: "https://www.soundgym.co/" },
    'Musictheory.net': { t: "Musictheory.net", r: "https://www.musictheory.net/" },
    'Teoria': { t: "Teoria - Music Theory Web", r: "https://www.teoria.com/" },
    'Audible': { t: "Audible - Audiobooks & Podcasts", r: "https://www.audible.com/" },
    'Libby': { t: "Libby, by OverDrive", r: "https://libbyapp.com/" },
    'Hoopla': { t: "hoopla - Streaming Audiobooks, Music, Video & eBooks", r: "https://www.hoopladigital.com/" },
    'Scribd': { t: "Scribd - Audiobooks & Ebooks", r: "https://www.scribd.com/" },
    'Wattpad': { t: "Wattpad - Where stories live", r: "https://www.wattpad.com/" },
    'Goodreads': { t: "Goodreads - Book Reviews & Recommendations", r: "https://www.goodreads.com/" },
    'StoryGraph': { t: "The StoryGraph", r: "https://app.thestorygraph.com/" },
    'BookBub': { t: "BookBub - Great Deals on Bestselling Ebooks", r: "https://www.bookbub.com/" },
    'LibraryThing': { t: "LibraryThing - Catalog your books online", r: "https://www.librarything.com/" },
    'Project Gutenberg': { t: "Project Gutenberg - free ebooks", r: "https://www.gutenberg.org/" }
  };

  if (maskType && customCloaks[maskType]) {
    title = customCloaks[maskType].t;
    escapeRedirect = customCloaks[maskType].r;
  }

  let win = window.open("about:blank", "_blank");
  if (win) {
    win.document.write(`
      <!DOCTYPE html>
      <html style="margin: 0; padding: 0; overflow: hidden; height: 100%;">
      <head>
        <title>${title}</title>
      </head>
      <body style="margin: 0; padding: 0; height: 100%; background: #000;">
        <iframe src="${currentUrl}?mode=stealth" style="width: 100%; height: 100%; border: none;"></iframe>
      </body>
      </html>
    `);
    win.document.close();

    // Redirect original tab to the mask target
    window.location.replace(escapeRedirect);
  } else {
    alert("Pop-ups must be enabled to launch the Stealth Environment.");
  }
}
// ========================================================
// CORE GAME LAUNCH ENGINE WITH STABILIZED CONTROLS
// ========================================================
function launchGame(gameId) {
  const game = _0xData.find(g => g.id === gameId);
  if (!game) return;

  const rootUrl = "https://null-x-team.github.io/";
  const gameTab = window.open("about:blank", "_blank");
  if (!gameTab) {
    alert("Pop-up blocked! Please allow popup permissions to play games.");
    return;
  }

  gameTab.document.title = "Google Docs";
  gameTab.document.open();

  const isEmbed = game.isEmbedCode;
  const gameSrc = isEmbed ? game.jsbin : (game.url.startsWith("http") ? game.url : (rootUrl + game.url.replace(/^\.\.\//, "")));

  gameTab.document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${game.title}</title>

<style>
body, html { margin:0; padding:0; width:100%; height:100%; overflow:hidden; background:#000; color:#fff; }
iframe { width:100%; height:100vh; display:block; border:none; }

.back-btn {
  position: fixed; top: 15px; left: 15px; z-index: 99999999;
  background: #0a0a0a; color: #8b00ff; border: 2px solid #8b00ff;
  padding: 8px 14px; font-weight: bold; border-radius: 8px;
  cursor: pointer; box-shadow: 0 0 12px rgba(139,0,255,0.45);
  font-family: system-ui, sans-serif; text-decoration: none; display: inline-flex;
  align-items: center; gap: 6px; user-select: none; touch-action: none;
  transition: box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}
.back-btn:hover {
  background: #140a1c; border-color: #b056ff; box-shadow: 0 0 16px rgba(139,0,255,0.65);
}
.back-btn.dragging {
  cursor: grabbing; opacity: 0.92; box-shadow: 0 0 20px rgba(139,0,255,0.8);
  transition: none;
}

#back-btn-hint {
  position: fixed; top: 58px; left: 15px; z-index: 99999999;
  background: rgba(10,10,10,0.95); color: #c4b5fd;
  padding: 8px 12px; border: 1px solid #8b00ff; border-radius: 8px;
  font-family: system-ui, sans-serif; font-size: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.5); pointer-events: none;
  animation: nxHintIn 0.25s ease;
}
@keyframes nxHintIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }

#back-btn-menu {
  position: fixed; z-index: 999999999;
  background: #0d0d13; color: #e9d5ff;
  border: 1px solid rgba(139,0,255,0.55); border-radius: 10px;
  padding: 6px; min-width: 160px;
  font-family: system-ui, sans-serif; font-size: 13px;
  box-shadow: 0 8px 28px rgba(0,0,0,0.55);
  animation: nxHintIn 0.15s ease;
}
#back-btn-menu div {
  padding: 8px 12px; border-radius: 6px; cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}
#back-btn-menu div:hover {
  background: rgba(139,0,255,0.22); color: #fff;
}
</style>
</head>

<body>
<a href="https://null-x-team.github.io/" class="back-btn">← Back To Home</a>

<iframe 
  src="${gameSrc}" 
  sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-popups allow-modals" 
  allow="pointer-lock *; fullscreen *; gamepad *; autoplay *"
  style="width:100%; height:100vh; display:block; border:none;"
></iframe>

<script>
(function () {
  var POS_KEY = "nx_back_btn_pos";
  var backBtn = null;
  var dragState = null;

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

  function savePos(data) {
    try { localStorage.setItem(POS_KEY, JSON.stringify(data)); } catch (e) {}
  }

  function loadPos() {
    try {
      var raw = localStorage.getItem(POS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function applySavedPos(btn) {
    var p = loadPos();
    if (!p) return;
    btn.style.transform = "";
    btn.style.top = p.top != null ? p.top : "";
    btn.style.bottom = p.bottom != null ? p.bottom : "";
    btn.style.left = p.left != null ? p.left : "";
    btn.style.right = p.right != null ? p.right : "";
    if (p.transform) btn.style.transform = p.transform;
  }

  function snapshotPos(btn) {
    return {
      top: btn.style.top || null,
      bottom: btn.style.bottom || null,
      left: btn.style.left || null,
      right: btn.style.right || null,
      transform: btn.style.transform || ""
    };
  }

  function setBackBtnPos(btn, top, bottom, right, left) {
    btn.style.transition = "top 0.25s ease, left 0.25s ease, right 0.25s ease, bottom 0.25s ease, transform 0.25s ease";
    btn.style.top = top != null ? top : "auto";
    btn.style.bottom = bottom != null ? bottom : "auto";
    btn.style.right = right != null ? right : "auto";
    btn.style.left = left != null ? left : "auto";
    btn.style.transform = "";
    savePos(snapshotPos(btn));
    setTimeout(function () { btn.style.transition = ""; }, 280);
  }

  function setBackBtnCenter(btn, top, bottom) {
    btn.style.transition = "top 0.25s ease, left 0.25s ease, right 0.25s ease, bottom 0.25s ease, transform 0.25s ease";
    btn.style.top = top != null ? top : "auto";
    btn.style.bottom = bottom != null ? bottom : "auto";
    btn.style.left = "50%";
    btn.style.right = "auto";
    btn.style.transform = "translateX(-50%)";
    savePos(snapshotPos(btn));
    setTimeout(function () { btn.style.transition = ""; }, 280);
  }

  function placeMenu(menu, x, y) {
    document.body.appendChild(menu);
    var rect = menu.getBoundingClientRect();
    var left = clamp(x, 8, window.innerWidth - rect.width - 8);
    var top = clamp(y, 8, window.innerHeight - rect.height - 8);
    menu.style.left = left + "px";
    menu.style.top = top + "px";
  }

  function showBackBtnMenu(x, y, btn) {
    var oldMenu = document.getElementById("back-btn-menu");
    if (oldMenu) oldMenu.remove();

    var menu = document.createElement("div");
    menu.id = "back-btn-menu";

    var options = [
      { label: "Top Left", run: function () { setBackBtnPos(btn, "15px", null, null, "15px"); } },
      { label: "Top Center", run: function () { setBackBtnCenter(btn, "15px"); } },
      { label: "Top Right", run: function () { setBackBtnPos(btn, "15px", null, "15px", null); } },
      { label: "Bottom Left", run: function () { setBackBtnPos(btn, null, "15px", null, "15px"); } },
      { label: "Bottom Center", run: function () { setBackBtnCenter(btn, null, "15px"); } },
      { label: "Bottom Right", run: function () { setBackBtnPos(btn, null, "15px", "15px", null); } },
      { label: "Drag to move", run: function () { startDragMode(btn); } }
    ];

    options.forEach(function (opt) {
      var item = document.createElement("div");
      item.textContent = opt.label;
      item.addEventListener("click", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        opt.run();
        menu.remove();
      });
      menu.appendChild(item);
    });

    placeMenu(menu, x, y);

    setTimeout(function () {
      document.addEventListener("click", function closeMenu() {
        if (menu.parentNode) menu.remove();
        document.removeEventListener("click", closeMenu);
      });
    }, 0);
  }

  function onPointerMove(e) {
    if (!dragState) return;
    e.preventDefault();
    var clientX = e.clientX != null ? e.clientX : (e.touches && e.touches[0].clientX);
    var clientY = e.clientY != null ? e.clientY : (e.touches && e.touches[0].clientY);
    if (clientX == null) return;

    var btn = dragState.btn;
    var w = btn.offsetWidth;
    var h = btn.offsetHeight;
    var left = clamp(clientX - dragState.offsetX, 0, window.innerWidth - w);
    var top = clamp(clientY - dragState.offsetY, 0, window.innerHeight - h);

    btn.style.left = left + "px";
    btn.style.top = top + "px";
    btn.style.right = "auto";
    btn.style.bottom = "auto";
    btn.style.transform = "";
    dragState.moved = true;
  }

  function onPointerUp(e) {
    if (!dragState) return;
    var btn = dragState.btn;
    var moved = dragState.moved;
    btn.classList.remove("dragging");
    btn.style.cursor = "pointer";
    document.removeEventListener("mousemove", onPointerMove);
    document.removeEventListener("mouseup", onPointerUp);
    document.removeEventListener("touchmove", onPointerMove);
    document.removeEventListener("touchend", onPointerUp);
    if (moved) {
      savePos(snapshotPos(btn));
      // block the click that would navigate home right after a drag
      var block = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        btn.removeEventListener("click", block, true);
      };
      btn.addEventListener("click", block, true);
      setTimeout(function () { btn.removeEventListener("click", block, true); }, 50);
    }
    dragState = null;
  }

  function beginDrag(btn, clientX, clientY) {
    var rect = btn.getBoundingClientRect();
    dragState = {
      btn: btn,
      offsetX: clientX - rect.left,
      offsetY: clientY - rect.top,
      moved: false
    };
    btn.classList.add("dragging");
    btn.style.cursor = "grabbing";
    btn.style.transition = "none";
    btn.style.transform = "";
    // convert any right/bottom anchoring to left/top so drag is stable
    btn.style.left = rect.left + "px";
    btn.style.top = rect.top + "px";
    btn.style.right = "auto";
    btn.style.bottom = "auto";

    document.addEventListener("mousemove", onPointerMove, { passive: false });
    document.addEventListener("mouseup", onPointerUp);
    document.addEventListener("touchmove", onPointerMove, { passive: false });
    document.addEventListener("touchend", onPointerUp);
  }

  function startDragMode(btn) {
    btn.style.cursor = "grab";
    var once = function (e) {
      e.preventDefault();
      var clientX = e.clientX != null ? e.clientX : (e.touches && e.touches[0].clientX);
      var clientY = e.clientY != null ? e.clientY : (e.touches && e.touches[0].clientY);
      beginDrag(btn, clientX, clientY);
      btn.removeEventListener("mousedown", once);
      btn.removeEventListener("touchstart", once);
    };
    btn.addEventListener("mousedown", once);
    btn.addEventListener("touchstart", once, { passive: false });
  }

  function init() {
    backBtn = document.querySelector(".back-btn");
    if (!backBtn) return;
    backBtn.style.position = "fixed";
    applySavedPos(backBtn);

    if (!localStorage.getItem("backBtnHintShown")) {
      var hint = document.createElement("div");
      hint.id = "back-btn-hint";
      hint.textContent = "Right-click the button to reposition it.";
      document.body.appendChild(hint);
      setTimeout(function () {
        if (hint.parentNode) hint.remove();
      }, 5000);
    }

    backBtn.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      var hint = document.getElementById("back-btn-hint");
      if (hint) {
        hint.remove();
        localStorage.setItem("backBtnHintShown", "true");
      }
      showBackBtnMenu(e.clientX, e.clientY, backBtn);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  window.addEventListener("load", function () {
    if (!backBtn) init();
  });
})();
<\/script>

</body>
</html>
`);

  gameTab.document.close();

  // More reliable original-tab close
  function attemptCloseOriginalTab() {
    try {
      const selfWin = window.open(window.location.href, "_self");
      if (selfWin) selfWin.close();
    } catch (e) {}
    try {
      window.close();
    } catch (e) {}
    try {
      if (window.top && window.top !== window) {
        window.top.close();
      }
    } catch (e) {}
    try {
      window.open("", "_self");
      window.close();
    } catch (e) {}
  }

  attemptCloseOriginalTab();
  setTimeout(attemptCloseOriginalTab, 30);

  setTimeout(function() {
    try {
      window.location.replace("https://www.google.com");
    } catch (e) {
      window.location.href = "https://www.google.com";
    }
  }, 120);
}

function renderLibraryGrid(gamesArray) {
  const gameGrid = document.getElementById('gameGrid');
  if (!gameGrid) return;
  gameGrid.innerHTML = '';
  gamesArray.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.setAttribute('data-game-id', game.id);

    // Checks for image thumbnail, generates custom initials gradient placeholder as fallback
    const imgHTML = game.image 
      ? `<img src="${game.image}" class="game-card-img" alt="${game.title}">` 
      : `<div class="game-card-img-placeholder"><span>${game.title.substring(0, 2).toUpperCase()}</span></div>`;

    card.innerHTML = `
      ${imgHTML}
      <h3>${game.title}</h3>
      <div class="game-desc-overlay">${game.desc}</div>
    `;
    card.onclick = () => launchGame(game.id);
    gameGrid.appendChild(card);
  });
}

function renderFavoritesGrid() {
  const favGrid = document.getElementById('favoritesGrid');
  const emptyMsg = document.getElementById('favorites-empty-msg');
  if (!favGrid) return;

  favGrid.querySelectorAll('.game-card').forEach(c => c.remove());

  if (favoriteGamesList.length === 0) {
    if (emptyMsg) emptyMsg.style.display = 'block';
  } else {
    if (emptyMsg) emptyMsg.style.display = 'none';
    favoriteGamesList.forEach(gameId => {
      const game = _0xData.find(g => g.id === gameId);
      if (game) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.setAttribute('data-game-id', game.id);

        // Checks for image thumbnail inside favorites list too!
        const imgHTML = game.image 
          ? `<img src="${game.image}" class="game-card-img" alt="${game.title}">` 
          : `<div class="game-card-img-placeholder"><span>${game.title.substring(0, 2).toUpperCase()}</span></div>`;

        card.innerHTML = `
          ${imgHTML}
          <h3>${game.title}</h3>
          <div class="game-desc-overlay">${game.desc}</div>
        `;
        card.onclick = () => launchGame(game.id);
        favGrid.appendChild(card);
      }
    });
  }
}

function initFeaturedModule() {
  const heroTitle = document.getElementById('hero-title');
  const heroDesc = document.getElementById('hero-desc');
  const playFeaturedBtn = document.getElementById('playFeatured');
  const heroSection = document.getElementById('heroSection') || document.querySelector('section.hero');

  if (_0xData.length > 0 && heroTitle) {
    const randomGameSelection = _0xData[Math.floor(Math.random() * _0xData.length)];
    heroTitle.textContent = randomGameSelection.title;
    if (heroDesc) heroDesc.textContent = randomGameSelection.desc;
    if (playFeaturedBtn) {
      playFeaturedBtn.onclick = () => launchGame(randomGameSelection.id);
    }
    // Fill featured banner with game art (falls back to gradient if no image)
    if (heroSection) {
      if (randomGameSelection.image) {
        heroSection.style.setProperty('--hero-bg', 'url("' + String(randomGameSelection.image).replace(/"/g, '\"') + '")');
      } else {
        heroSection.style.removeProperty('--hero-bg');
      }
    }
  }
}

function updateNavActiveState(activeId) {
  ['nav-home', 'nav-games', 'nav-favorites', 'nav-unblockers', 'nav-profile', 'nav-communications', 'nav-terminal', 'nav-assistant'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  const currentActive = document.getElementById(activeId);
  if (currentActive) currentActive.classList.add('active');
}

function clearAllViews() {
  const viewElements = [
    document.getElementById('heroSection'),
    document.querySelector('.random-section'),
    document.getElementById('gameGrid'),
    document.getElementById('favoritesGrid'),
    document.getElementById('unblockersSection'),
    document.getElementById('profileSection'),
    document.getElementById('calculatorSection'),
    document.getElementById('terminalSection'),
    document.getElementById('assistantSection')
  ];

  viewElements.forEach(element => {
    if (element) {
      element.style.setProperty('display', 'none', 'important');
    }
  });
}

function showHomeView() {
  clearAllViews();
  updateNavActiveState('nav-home');

  const heroSection = document.getElementById('heroSection');
  const randomSection = document.querySelector('.random-section');
  const gameGrid = document.getElementById('gameGrid');
  const favGrid = document.getElementById('favoritesGrid');

  if (heroSection) heroSection.style.setProperty('display', 'flex', 'important');
  if (randomSection) randomSection.style.setProperty('display', 'block', 'important');
  if (favGrid) favGrid.style.setProperty('display', 'none', 'important');

  if (gameGrid) {
    gameGrid.style.setProperty('display', 'none', 'important');
  }
  initFeaturedModule();
}

function showAllGamesView() {
  clearAllViews();
  updateNavActiveState('nav-games');

  const gameGrid = document.getElementById('gameGrid');
  const favGrid = document.getElementById('favoritesGrid');
  const section = gameGrid ? gameGrid.closest('section') : null;

  if (favGrid) favGrid.style.setProperty('display', 'none', 'important');
  if (section) {
    section.style.setProperty('display', 'block', 'important');
    section.style.setProperty('visibility', 'visible', 'important');
  }
  if (gameGrid) {
    gameGrid.removeAttribute('hidden');
    gameGrid.style.cssText = 'display:grid!important;visibility:visible!important;opacity:1!important;min-height:200px!important;';
    renderLibraryGrid(_0xData);
    console.log('[NX] Games grid shown, cards:', gameGrid.children.length);
  } else {
    console.error('[NX] gameGrid element missing from DOM');
  }
}

function showFavoritesView() {
  clearAllViews();
  updateNavActiveState('nav-favorites');

  const gameGrid = document.getElementById('gameGrid');
  const favGrid = document.getElementById('favoritesGrid');
  const section = favGrid ? favGrid.closest('section') : (gameGrid ? gameGrid.closest('section') : null);

  if (gameGrid) gameGrid.style.setProperty('display', 'none', 'important');
  if (section) {
    section.style.setProperty('display', 'block', 'important');
    section.style.setProperty('visibility', 'visible', 'important');
  }
  if (favGrid) {
    favGrid.removeAttribute('hidden');
    favGrid.style.cssText = 'display:grid!important;visibility:visible!important;opacity:1!important;min-height:200px!important;';
    renderFavoritesGrid();
    console.log('[NX] Favorites grid shown, cards:', favGrid.querySelectorAll('.game-card').length);
  }
}

async function handlePlaceholderView(navId, viewName) {
  clearAllViews();
  updateNavActiveState(navId);

  const viewLower = viewName.toLowerCase();

  if (viewLower === 'assistant') {
    window.location.href = "https://nullai.base44.app";
    return; 
  }

  const targetSectionId = `${viewLower}Section`;
  let customSectionContainer = document.getElementById(targetSectionId);

  if (!customSectionContainer) {
    customSectionContainer = document.createElement('div');
    customSectionContainer.id = targetSectionId;
    customSectionContainer.className = 'custom-view-panel';

    const mainSectionNode = document.querySelector('.main-content .section') || document.querySelector('.main-content');
    if (mainSectionNode) {
      mainSectionNode.appendChild(customSectionContainer);
    }
  }

  // Built-in sections that already exist in index.html
  if (viewLower === 'profile' || viewLower === 'calculator' || viewLower === 'unblockers') {
    customSectionContainer.removeAttribute('hidden');
    customSectionContainer.style.cssText = 'display:block!important;visibility:visible!important;opacity:1!important;padding:20px;color:white;width:100%;box-sizing:border-box;';
    console.log('[NX] Showing built-in section:', targetSectionId);

    if (viewLower === 'profile') {
      // Fill basics immediately from localStorage so UI is never stuck on Loading...
      const u = localStorage.getItem('chatUser') || 'Guest';
      const du = document.getElementById('display-username');
      const iu = document.getElementById('info-username');
      if (du) du.textContent = u;
      if (iu) iu.textContent = u;
      // Load full profile system (Turso/bio/avatar)
      const existing = document.getElementById('profile-dynamic-script');
      if (existing) existing.remove();
      const script = document.createElement('script');
      script.id = 'profile-dynamic-script';
      script.src = 'profile/profile.js?v=' + Date.now();
      script.onload = function () {
        if (typeof window.initProfileSystem === 'function') {
          try { window.initProfileSystem(); } catch (e) { console.warn(e); }
        }
      };
      document.body.appendChild(script);
    }

    if (viewLower === 'unblockers') {
      const list = (typeof __nxProxyList !== 'undefined') ? __nxProxyList : [];
      const cards = list.map((item, i) => {
        const action = item.local
          ? `window.open('${item.local}','_blank')`
          : `__nxLaunchProxy('${item.p}')`;
        return `<div class="unblocker-card" data-i="${i}" onclick="${action}" style="background:rgba(255,255,255,0.05);padding:20px;border-radius:8px;width:180px;cursor:pointer;border:1px solid rgba(139,0,255,0.35);transition:transform .2s,border-color .2s;">
              <h4 style="color:#fff;margin:0 0 10px 0;font-size:16px;">${item.name}</h4>
              <span style="color:#8b00ff;font-weight:bold;font-size:14px;">Deploy Instance</span>
            </div>`;
      }).join('');
      customSectionContainer.innerHTML = `
          <h2>Unblockers Portal</h2>
          <p style="color:#aaa;margin-bottom:12px;">Deploy proxy instances. Opens in a sandboxed tab.</p>
          <p style="color:#666;font-size:12px;margin-bottom:20px;">By using these tools you agree to the Terms of Service — you are solely responsible for your activity. We are not liable for third-party content or malformed links.</p>
          <div class="unblocker-card-row" style="display:flex;gap:15px;flex-wrap:wrap;margin-top:15px;">${cards}</div>`;
    }

    return;
  }

  customSectionContainer.style.setProperty('display', 'block', 'important');
  customSectionContainer.innerHTML = `<p style="color: #8b00ff; padding: 20px; font-family: sans-serif; font-style: italic; animation: pulse 1.5s infinite;">Mounting filesystem directory node...</p>`;

  try {
    const targetFolder = viewLower === 'terminal' ? 'Terminal' : viewLower;
    // GitHub Pages root-relative paths
    const fetchPath = `${targetFolder}/${viewLower}.html`;

    const response = await fetch(fetchPath);
    if (!response.ok) throw new Error(`Status error ${response.status}`);

    const dynamicCodeContent = await response.text();
    customSectionContainer.innerHTML = dynamicCodeContent;

    if (typeof attachChatEventListeners === 'function') attachChatEventListeners();

    if (viewLower === 'profile') {
      const existingScript = document.getElementById('profile-dynamic-script');
      if (existingScript) existingScript.remove();
      const script = document.createElement('script');
      script.id = 'profile-dynamic-script';
      script.type = 'module';
      script.src = `profile/profile.js?v=${Date.now()}`;
      document.body.appendChild(script);
    }

  } catch (error) {
    console.error(`[System Error] Failed routing structural data for ${viewName}:`, error);
    customSectionContainer.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; border: 1px dashed rgba(139,0,255,0.4); border-radius: 8px; max-width: 500px; margin: 20px auto; background: rgba(10,10,10,0.8);">
        <h3 style="color: #ff3333; margin-top: 0;">Filesystem Mount Error</h3>
        <p style="color: #ccc; font-size: 14px;">Could not verify source file configuration at location pathway: <code>/${viewLower === 'terminal' ? 'Terminal' : viewLower}/${viewLower}.html</code></p>
        <p style="color: #666; font-size: 12px; margin-bottom: 0;">Verify repository spelling match definitions alignment protocols.</p>
      </div>
    `;
  }
}

function __nxBootUI() {
  initializeBase44Chat();

  const isSplashDisabled = localStorage.getItem('disableStudyCloak') === 'true';
  const cloakOverlay = document.getElementById("educational-cloak");

  if (cloakOverlay) {
    if (isSplashDisabled) {
      cloakOverlay.style.display = 'none';
      cloakOverlay.classList.add("hidden");
    } else {
      const timerDisplay = document.querySelector(".timer-subtext-sticky span");
      let timeLeft = 10;
      if (timerDisplay) {
        timerDisplay.textContent = `${timeLeft} seconds.`;
      }

      const countdownInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
          if (timerDisplay) timerDisplay.textContent = `${timeLeft} seconds.`;
        } else {
          clearInterval(countdownInterval);
          cloakOverlay.classList.add("hidden");
          console.log("Overlay container initialization cleared successfully.");
        }
      }, 1000);
    }
  }

  const settingsBtn = document.getElementById('settingsBtn');
  if (settingsBtn) {
    settingsBtn.onclick = (e) => {
      e.preventDefault();

      let modal = document.getElementById('settingsModal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'settingsModal';
        modal.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(10,10,10,0.95); z-index:999999; display:none; align-items:center; justify-content:center; font-family:sans-serif;";
        document.body.appendChild(modal);
      }

      modal.innerHTML = `
        <div style="background:#0d0d0d; border:2px solid #8b00ff; border-radius:16px; width:90%; max-width:900px; height:80vh; position:relative; box-shadow:0 0 30px rgba(139,0,255,0.3); display:flex; flex-direction:column;">
          <div style="padding: 20px 30px; border-bottom: 1px solid rgba(139,0,255,0.2); display:flex; justify-content:space-between; align-items:center;">
            <h2 style="color:#8b00ff; margin:0;">Control Panel Configuration</h2>
            <button id="closeSettings" style="background:none; border:none; color:#ff3333; font-size:28px; font-weight:bold; cursor:pointer; margin-left:auto;">&times;</button>
          </div>
          <div id="modal-settings-content" style="flex:1; padding:30px; overflow-y:auto; color:#fff;">
            <p style="color:#8b00ff; font-weight:bold;">Loading system template parameters...</p>
          </div>
        </div>
      `;
      modal.style.display = 'flex';

      fetch('../Settings/settings.html')
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.text();
        })
        .then(html => {
          const contentDiv = document.getElementById('modal-settings-content');
          if (contentDiv) {
            contentDiv.innerHTML = html;

            const currentTheme = localStorage.getItem('selectedTheme') || 'default';
            const themeCards = contentDiv.querySelectorAll('.theme-card');
            themeCards.forEach(card => {
              if (card.getAttribute('data-theme') === currentTheme) {
                card.style.borderColor = "#8b00ff";
                card.style.background = "rgba(139, 0, 255, 0.15)";
              }
              card.onclick = () => {
                themeCards.forEach(c => {
                  c.style.borderColor = "transparent";
                  c.style.background = "rgba(255,255,255,0.03)";
                });
                card.style.borderColor = "#8b00ff";
                card.style.background = "rgba(139, 0, 255, 0.15)";
                const selected = card.getAttribute('data-theme');
                localStorage.setItem('selectedTheme', selected);

                if (typeof window.applyTheme === 'function') window.applyTheme(selected);
              };
            });

            const splashCheckbox = document.getElementById('toggle-study-cloak');
            if (splashCheckbox) {
              splashCheckbox.checked = localStorage.getItem('disableStudyCloak') === 'true';
              splashCheckbox.onchange = (e) => {
                localStorage.setItem('disableStudyCloak', e.target.checked ? 'true' : 'false');
              };
            }

            const cloakSelector = document.getElementById('cloakSelector');
            if (cloakSelector) {
              const savedCloak = localStorage.getItem('savedCloak');
              if (savedCloak) cloakSelector.value = savedCloak;
              cloakSelector.onchange = (e) => {
                if (e.target.value === "none") {
                  localStorage.removeItem('savedCloak');
                } else {
                  localStorage.setItem('savedCloak', e.target.value);
                }
              };
            }

            const autoLaunchCheckbox = document.getElementById('toggle-auto-launch');
            const autoLaunchOptionsDiv = document.getElementById('auto-launch-options');
            const autoLaunchEnvSelect = document.getElementById('auto-launch-environment');

            if (autoLaunchCheckbox && autoLaunchOptionsDiv && autoLaunchEnvSelect) {
              const isAutoLaunchOn = localStorage.getItem('autoLaunchEnabled') === 'true';
              autoLaunchCheckbox.checked = isAutoLaunchOn;
              autoLaunchEnvSelect.value = localStorage.getItem('autoLaunchEnv') || 'about:blank';

              if (isAutoLaunchOn) autoLaunchOptionsDiv.style.display = 'block';

              autoLaunchCheckbox.onchange = (e) => {
                localStorage.setItem('autoLaunchEnabled', e.target.checked ? 'true' : 'false');
                autoLaunchOptionsDiv.style.display = e.target.checked ? 'block' : 'none';
              };

              autoLaunchEnvSelect.onchange = (e) => {
                localStorage.setItem('autoLaunchEnv', e.target.value);
              };
            }

            const shortcutInput = document.getElementById('panicShortcut');
            const panicLinkInput = document.getElementById('panicLink');
            const savePanicBtn = document.getElementById('savePanic');

            if (shortcutInput && panicLinkInput && savePanicBtn) {
              const savedPanicKey = localStorage.getItem('panicKey') || 'b';
              const savedPanicBlocker = localStorage.getItem('panicBlocker') || 'goguardian';
              const savedPanicUrl = localStorage.getItem('panicUrl') || 'https://classroom.google.com';

              let tempKey = savedPanicKey;
              shortcutInput.onkeydown = (e) => {
                e.preventDefault();
                if (["Control", "Shift", "Alt", "Meta", "Escape"].includes(e.key)) return;
                tempKey = e.key.toLowerCase();
                shortcutInput.value = `Key: ${e.key.toUpperCase()}`;
              };

              savePanicBtn.onclick = () => {
                localStorage.setItem('panicKey', tempKey);
                localStorage.setItem('panicUrl', panicLinkInput.value.trim());

                savePanicBtn.textContent = "Saved Successfully!";
                savePanicBtn.style.background = "#10b981";
                setTimeout(() => {
                  savePanicBtn.textContent = "Save Panic Settings";
                  savePanicBtn.style.background = "#8b00ff";
                }, 2000);
              };
            }
          }

          const modalCloseBtn = document.getElementById('closeSettings');
          if (modalCloseBtn) {
            modalCloseBtn.onclick = () => { modal.style.display = 'none'; };
          }
        })
        .catch(err => {
          console.error("Modal operational crash trace:", err);
          const contentDiv = document.getElementById('modal-settings-content');
          if (contentDiv) {
            contentDiv.innerHTML = `<p style="color:#ff3333;">Failed parsing setup resources within current active viewport.</p>`;
          }
        });
    };
  }

  showHomeView();

  const randomBtn = document.getElementById('randomBtn');
  if (randomBtn) {
    randomBtn.onclick = () => {
      const idx = Math.floor(Math.random() * _0xData.length);
      launchGame(_0xData[idx].id);
    };
  }

  const user = localStorage.getItem('chatUser');
  if (user) {
    if (document.getElementById('welcome-text')) {
      document.getElementById('welcome-text').textContent = `Hello, ${user}`;
    }
    if (document.getElementById('signInBtn')) {
      document.getElementById('signInBtn').textContent = "Sign Out";
    }
  } else {
    if (document.getElementById('welcome-text')) {
      document.getElementById('welcome-text').textContent = "Hello, Guest";
    }
    if (document.getElementById('signInBtn')) {
      document.getElementById('signInBtn').textContent = "Sign In";
    }
  }

  if (document.getElementById('signInBtn')) {
    document.getElementById('signInBtn').onclick = () => {
      if (localStorage.getItem('chatUser')) {
        localStorage.removeItem('chatUser');
        location.reload();
      } else {
        window.location.href = "../Login/login.html";
      }
    };
  }

  if (document.getElementById('nav-home')) document.getElementById('nav-home').onclick = (e) => { e.preventDefault(); showHomeView(); };
  if (document.getElementById('nav-games')) document.getElementById('nav-games').onclick = (e) => { e.preventDefault(); showAllGamesView(); };
  if (document.getElementById('nav-favorites')) document.getElementById('nav-favorites').onclick = (e) => { e.preventDefault(); showFavoritesView(); };

  if (document.getElementById('nav-unblockers')) document.getElementById('nav-unblockers').onclick = (e) => { e.preventDefault(); handlePlaceholderView('nav-unblockers', 'Unblockers'); };
  if (document.getElementById('nav-profile')) document.getElementById('nav-profile').onclick = (e) => { e.preventDefault(); handlePlaceholderView('nav-profile', 'Profile'); };
  if (document.getElementById('nav-calculator')) document.getElementById('nav-calculator').onclick = (e) => { e.preventDefault(); handlePlaceholderView('nav-calculator', 'Calculator'); };
  if (document.getElementById('nav-terminal')) document.getElementById('nav-terminal').onclick = (e) => { e.preventDefault(); handlePlaceholderView('nav-terminal', 'Terminal'); };

  if (document.getElementById('nav-assistant')) {
    document.getElementById('nav-assistant').onclick = (e) => {
      e.preventDefault();
      window.location.href = "https://nullai.base44.app";
    }; 
  }

  const commsNavBtn = document.getElementById('nav-communications');
  if (commsNavBtn) {
    commsNavBtn.onclick = (e) => {
      e.preventDefault();
      updateNavActiveState('nav-communications');

      if (localStorage.getItem('chatUser')) {
        window.location.href = "../chat/chat.html";
      } else {
        window.location.href = "../Login/login.html";
      }
    };
  }

  if (document.getElementById('stealthOpener')) {
    document.getElementById('stealthOpener').onclick = (e) => {
      e.preventDefault();
      launchStealthWindow(localStorage.getItem('savedCloak') || 'Google Classroom', localStorage.getItem('autoLaunchEnv') || 'about:blank');
    };
  }

  const searchBar = document.getElementById('searchBar');
  if (searchBar) {
    searchBar.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      if (!term) { showHomeView(); return; }
      const hs = document.getElementById('heroSection');
      const rs = document.querySelector('.random-section');
      const fg = document.getElementById('favoritesGrid');
      const gg = document.getElementById('gameGrid');
      if (hs) hs.style.setProperty('display', 'none', 'important');
      if (rs) rs.style.setProperty('display', 'none', 'important');
      if (fg) fg.style.setProperty('display', 'none', 'important');
      if (gg) gg.style.setProperty('display', 'grid', 'important');
      const hits = _0xData.filter(g => g.title.toLowerCase().includes(term) || g.desc.toLowerCase().includes(term));
      renderLibraryGrid(hits);
    });
  }

  const contextMenu = document.getElementById('custom-context-menu');
  const deleteModal = document.getElementById('delete-modal-overlay');
  const ctxFavorite = document.getElementById('ctx-favorite');
  const ctxDelete = document.getElementById('ctx-delete');

  document.addEventListener('contextmenu', (e) => {
    const card = e.target.closest('.game-card');
    if (card) {
      e.preventDefault();
      contextTargetId = card.getAttribute('data-game-id');

      if (favoriteGamesList.includes(contextTargetId)) {
        ctxFavorite.textContent = "Unfavorite Game";
      } else {
        ctxFavorite.textContent = "Favorite Game";
      }

      if (contextMenu) {
        contextMenu.style.left = `${e.clientX}px`;
        contextMenu.style.top = `${e.clientY}px`;
        contextMenu.style.display = 'block';
      }
    } else {
      if (contextMenu) contextMenu.style.display = 'none';
    }
  });

  document.addEventListener('click', () => { if (contextMenu) contextMenu.style.display = 'none'; });

  if (ctxFavorite) {
    ctxFavorite.onclick = () => {
      if (!contextTargetId) return;
      if (favoriteGamesList.includes(contextTargetId)) {
        favoriteGamesList = favoriteGamesList.filter(id => id !== contextTargetId);
      } else {
        favoriteGamesList.push(contextTargetId);
      }
      localStorage.setItem('nullx_favorites_arr', JSON.stringify(favoriteGamesList));

      const favoritesGrid = document.getElementById('favoritesGrid');
      if (favoritesGrid && favoritesGrid.style.display === 'grid') {
        renderFavoritesGrid();
      }
    };
  }

  if (ctxDelete) {
    ctxDelete.onclick = () => {
      if (contextTargetId && deleteModal) deleteModal.style.display = 'flex';
    };
  }

  const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
  if (confirmDeleteBtn) {
    confirmDeleteBtn.onclick = () => {
      if (contextTargetId) {
        _0xData = _0xData.filter(g => g.id !== contextTargetId);
        favoriteGamesList = favoriteGamesList.filter(id => id !== contextTargetId);
        localStorage.setItem('nullx_favorites_arr', JSON.stringify(favoriteGamesList));
        if (document.getElementById('gameGrid').style.display === 'grid') renderLibraryGrid(_0xData);
        if (document.getElementById('favoritesGrid').style.display === 'grid') renderFavoritesGrid();
        if (deleteModal) deleteModal.style.display = 'none';
      }
    };
  }

  const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
  if (cancelDeleteBtn) {
    cancelDeleteBtn.onclick = () => {
      if (deleteModal) deleteModal.style.display = 'none';
    };
  }

  if (navigator.getBattery) {
    navigator.getBattery().then(battery => {
      function updateBatteryDisplay() {
        const batteryText = document.getElementById('battery-status');
        if (batteryText) {
          const level = Math.round(battery.level * 100);
          const charging = battery.charging ? " (Charging)" : "";
          batteryText.textContent = `Battery: ${level}%${charging}`;
        }
      }
      updateBatteryDisplay();
      battery.addEventListener('levelchange', updateBatteryDisplay);
      battery.addEventListener('chargingchange', updateBatteryDisplay);
    }).catch(err => console.error("Battery access denied:", err));
  }

  function updateClockDisplay() {
    const clockText = document.getElementById('digital-clock');
    if (clockText) {
      const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
      clockText.textContent = new Date().toLocaleTimeString(undefined, options);
    }
  }
  updateClockDisplay();
  setInterval(updateClockDisplay, 1000);

  if (localStorage.getItem('autoLaunchEnabled') === 'true' && !sessionStorage.getItem('launchedThisSession')) {
    sessionStorage.setItem('launchedThisSession', 'true');
    setTimeout(() => {
      launchStealthWindow(localStorage.getItem('savedCloak') || 'Google Classroom', localStorage.getItem('autoLaunchEnv') || 'about:blank');
    }, 500);
  }

  window.addEventListener('keydown', (e) => {
    const savedPanicKey = localStorage.getItem('panicKey');
    const redirectUrl = localStorage.getItem('panicUrl') || 'https://classroom.google.com';

    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

    if (savedPanicKey && e.key.toLowerCase() === savedPanicKey.toLowerCase()) {
      e.preventDefault();
      window.location.replace(redirectUrl);
    }
  });
}

// Boot UI whether DOM is already ready or still loading (fixes type=module defer race)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', __nxBootUI, { once: true });
} else {
  try { __nxBootUI(); } catch (e) { console.error('[NX Boot]', e); }
}

(function () {
  var host = (typeof location !== "undefined" && (location.hostname || "") || "").toLowerCase();
  var allowed = host === "null-x-team.github.io" || host === "localhost" || host === "127.0.0.1";
  if (allowed) return;
  try { window.stop(); } catch (e) {}
  try {
    document.documentElement.innerHTML =
      '<head><title>ERR</title><meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
      '<body style="background:#050505;color:#ff2b2b;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;overflow:hidden">' +
      '<div style="width:min(420px,85%);padding:40px 35px;text-align:center;background:#0b0b0b;border:1px solid #3a1111;border-radius:12px">' +
      '<h1 style="margin:0 0 12px;font-size:26px;letter-spacing:3px;color:#ff3333">SITE LOCKED</h1>' +
      '<p style="margin:0;color:#aaa;font-size:14px">Unauthorized host.</p>' +
      '<p style="margin:22px 0 0;color:#444;font-size:11px">ERR_HOST_NOT_AUTHORIZED</p>' +
      '</div></body>';
  } catch (e) {}
  while (true) {}
})();

async function fetchLiveWeather() {
  try {
    const response = await fetch('https://wttr.in/?format=j1');
    if (!response.ok) throw new Error("Weather stream dropped");

    const data = await response.json();
    const current = data.current_condition[0];
    const area = data.nearest_area[0];

    const tempF = current.temp_F;
    const humidity = current.humidity;
    const city = area.areaName[0].value;

    const tempEl = document.getElementById('live-temp');
    const humidEl = document.getElementById('live-humidity');
    const cityEl = document.getElementById('live-city');

    if (tempEl) tempEl.textContent = `${tempF}°`;
    if (humidEl) humidEl.innerHTML = `<i class="fa-solid fa-droplet"></i> ${humidity}% Humidity`;
    if (cityEl) cityEl.textContent = city;

  } catch (err) {
    console.error("[System Error] Live weather lookup stalled:", err);
    const cityEl = document.getElementById('live-city');
    if (cityEl) cityEl.textContent = "Offline Mode";
  }
}

fetchLiveWeather();

(function initLiveUpdateChecker() {
  let currentVersion = null;
  const CHECK_INTERVAL = 30000;

  async function checkServerVersion() {
    try {
      const response = await fetch(`./version.json?cache-bust=${Date.now()}`);
      if (!response.ok) return;

      const data = await response.json();
      const serverVersion = data.version;

      if (!currentVersion) {
        currentVersion = serverVersion;
        return;
      }

      if (serverVersion > currentVersion) {
        currentVersion = serverVersion;
        showUpdateNotification();
      }
    } catch (err) {
      console.log("[NxOS Sync] Live data stream polling paused.");
    }
  }

  function showUpdateNotification() {
    if (document.getElementById("nxos-update-popup")) return;

    const popup = document.createElement("div");
    popup.id = "nxos-update-popup";
    popup.style.cssText = `
      position: fixed;
      bottom: 25px;
      right: 25px;
      background: #0d0d13;
      border: 1px solid #8b00ff;
      border-radius: 8px;
      padding: 18px 22px;
      box-shadow: 0 0 25px rgba(139, 0, 255, 0.4);
      z-index: 99999;
      font-family: monospace;
      color: #fff;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 320px;
      animation: slideInNxOS 0.4s ease-out;
    `;

    popup.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="color: #27c93f; animation: blink 1s infinite;">●</span>
        <strong style="color: #8b00ff; letter-spacing: 0.5px;">SYSTEM UPDATE DETECTED</strong>
      </div>
      <div style="color: #aaa; font-size: 13px; line-height: 1.4;">
        New live core files and data layouts have just been pushed to the site.
      </div>
      <div style="display: flex; gap: 10px; margin-top: 5px;">
        <button id="nxos-reload-btn" style="flex: 1; background: #8b00ff; border: none; color: #fff; padding: 8px; border-radius: 4px; font-family: inherit; font-weight: bold; cursor: pointer; transition: 0.2s;">
          Sync & Reload
        </button>
        <button id="nxos-dismiss-btn" style="background: #222; border: 1px solid #444; color: #aaa; padding: 8px 12px; border-radius: 4px; font-family: inherit; cursor: pointer;">
          Dismiss
        </button>
      </div>
    `;

    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes slideInNxOS {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes blink {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
      }
      #nxos-reload-btn:hover { background: #a333ff !important; box-shadow: 0 0 10px rgba(139,0,255,0.5); }
    `;
    document.head.appendChild(style);
    document.body.appendChild(popup);

    document.getElementById("nxos-reload-btn").addEventListener("click", async () => {
      sessionStorage.clear();

      const targetUrl = window.location.href;

      try {
        // 1. Fetch the main HTML file with headers that instruct the server & browser to bypass cache
        await fetch(targetUrl, {
          headers: {
            'Pragma': 'no-cache',
            'Expires': '-1',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          },
        });

        // 2. Fetch version.json to clear the cache trace on your version tracking
        await fetch('./version.json', {
          headers: {
            'Pragma': 'no-cache',
            'Expires': '-1',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          },
        });

        // 3. Perform the in-place page swap
        window.location.replace(targetUrl);
      } catch (e) {
        // Fallback reload if network is interrupted
        window.location.reload();
      }
    });

    document.getElementById("nxos-dismiss-btn").addEventListener("click", () => {
      popup.remove();
    });
  }

  checkServerVersion();
  setInterval(checkServerVersion, CHECK_INTERVAL);
})();

// ==========================================
// DYNAMIC CARD CSS INJECTOR 
// ==========================================
(function injectCardStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
    .game-card {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
      padding: 0;
    }
    .game-card > h3 {
      width: 100%;
      padding: 8px 10px 10px;
      margin: 0;
      font-size: 0.85rem;
      line-height: 1.25;
      text-align: center;
    }
    .game-card-img {
      width: 100%;
      height: 120px;
      max-width: 100%;
      max-height: 120px;
      object-fit: cover;
      object-position: center;
      background-color: #0a0a12;
      border-radius: 14px 14px 0 0;
      margin-bottom: 0;
      display: block;
      flex-shrink: 0;
    }
    .game-card-img-placeholder {
      width: 100%;
      height: 120px;
      background: linear-gradient(135deg, #1f1f2e, #0d0d13);
      border-radius: 8px 8px 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #8b00ff;
      font-weight: bold;
      font-size: 24px;
      border-bottom: 1px solid rgba(139, 0, 255, 0.2);
      margin-bottom: 8px;
    }
    .game-card h3 {
      margin-top: 4px;
    }
  `;
  document.head.appendChild(style);
})();
// ==========================================
// STEALTH MODE OPENER (about:blank)
// ==========================================
const stealthBtn = document.getElementById("stealthOpener");

if (stealthBtn) {
    stealthBtn.addEventListener("click", () => {
        let win = window.open("about:blank", "_blank");

        if (win) {
            // Get the current page URL, but strip off any existing parameters just in case
            let currentUrl = window.location.href.split('?')[0]; 

            win.document.write(`
                <!DOCTYPE html>
                <html style="margin: 0; padding: 0; overflow: hidden; height: 100%;">
                <head>
                    <title>Google Drive</title>
                    <link rel="icon" href="https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png">
                </head>
                <body style="margin: 0; padding: 0; height: 100%; background: #000;">
                    <iframe src="${currentUrl}?mode=stealth" style="width: 100%; height: 100%; border: none;"></iframe>
                </body>
                </html>
            `);
            win.document.close();

            // Redirect the original tab to a safe site so the teacher doesn't see it left open
            window.location.replace("https://classroom.google.com");
        } else {
            alert("Pop-ups must be enabled to launch Stealth Mode.");
        }
    });
}
// ==========================================
// PRIVACY GUARD: PIN LOCK SYSTEM
// ==========================================
(function initPinLock() {
  const STORAGE_KEY = "nxos_user_pin";
  const IDLE_TIMEOUT_MS = 3 * 60 * 1000; // 3 minutes idle time before locking
  let idleTimer;

  // 1. Inject Styles for the Lock Screen Overlay
  const lockStyle = document.createElement("style");
  lockStyle.innerHTML = `
    #pin-lock-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: #0d0d13;
      color: #fff;
      z-index: 99999999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: system-ui, -apple-system, sans-serif;
      box-sizing: border-box;
    }
    .pin-box {
      background: #181824;
      border: 1px solid rgba(139, 0, 255, 0.3);
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
      width: 300px;
    }
    .pin-box h2 {
      margin: 0 0 10px 0;
      color: #8b00ff;
      font-size: 20px;
    }
    .pin-box p {
      font-size: 13px;
      color: #aaa;
      margin-bottom: 20px;
    }
    .pin-input {
      width: 100%;
      padding: 12px;
      font-size: 20px;
      letter-spacing: 8px;
      text-align: center;
      background: #0d0d13;
      border: 1px solid #8b00ff;
      color: #fff;
      border-radius: 6px;
      box-sizing: border-box;
      outline: none;
      margin-bottom: 15px;
    }
    .pin-btn {
      width: 100%;
      padding: 10px;
      background: #8b00ff;
      border: none;
      color: #fff;
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .pin-btn:hover {
      background: #a126ff;
    }
    .pin-error {
      color: #ff4a4a;
      font-size: 12px;
      margin-top: 10px;
      display: none;
    }
  `;
  document.head.appendChild(lockStyle);

  // 2. Lock Screen Modal Generator
  function createLockOverlay() {
    if (document.getElementById("pin-lock-overlay")) return;

    const savedPin = localStorage.getItem(STORAGE_KEY);
    const isFirstTime = !savedPin;

    const overlay = document.createElement("div");
    overlay.id = "pin-lock-overlay";
    overlay.innerHTML = `
      <div class="pin-box">
        <h2>${isFirstTime ? "Set Security PIN" : "Dashboard Locked"}</h2>
        <p>${isFirstTime ? "Create a 4-digit PIN to secure your site" : "Enter your 4-digit PIN to unlock"}</p>
        <input type="password" maxlength="4" class="pin-input" id="pin-field" autofocus placeholder="••••" />
        <button class="pin-btn" id="pin-submit">${isFirstTime ? "Save PIN" : "Unlock"}</button>
        <div class="pin-error" id="pin-err-msg">Invalid PIN. Try again.</div>
      </div>
    `;

    document.body.appendChild(overlay);

    const inputField = document.getElementById("pin-field");
    const submitBtn = document.getElementById("pin-submit");
    const errorMsg = document.getElementById("pin-err-msg");

    function handleSubmission() {
      const enteredPin = inputField.value.trim();

      if (enteredPin.length !== 4) {
        errorMsg.innerText = "PIN must be exactly 4 digits.";
        errorMsg.style.display = "block";
        return;
      }

      if (isFirstTime) {
        localStorage.setItem(STORAGE_KEY, enteredPin);
        overlay.remove();
        resetIdleTimer();
      } else {
        if (enteredPin === savedPin) {
          overlay.remove();
          resetIdleTimer();
        } else {
          errorMsg.innerText = "Incorrect PIN!";
          errorMsg.style.display = "block";
          inputField.value = "";
        }
      }
    }

    submitBtn.addEventListener("click", handleSubmission);
    inputField.addEventListener("keyup", (e) => {
      if (e.key === "Enter") handleSubmission();
    });
  }

  // 3. Idle Detection Timer
  function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (localStorage.getItem(STORAGE_KEY)) {
      idleTimer = setTimeout(() => {
        createLockOverlay();
      }, IDLE_TIMEOUT_MS);
    }
  }

  // 4. Global Event Listeners (Mouse movement resets idle timer)
  ["mousemove", "keydown", "click", "scroll"].forEach((evt) => {
    window.addEventListener(evt, resetIdleTimer, { passive: true });
  });

  // 5. Quick-Lock Keyboard Shortcut (Ctrl + L or Alt + L)
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.altKey) && e.key.toLowerCase() === "l") {
      e.preventDefault();
      createLockOverlay();
    }
  });

  // Start initial timer
  resetIdleTimer();
});
// =========================================================================
// UNIFIED PANIC & DECOY BLOCKER SYSTEM (20 SCHOOL FILTERS)
// =========================================================================
(function initNullXPanicEngine() {
  let activeOverlay = null;

  // 1. GLOBAL KEYDOWN LISTENER (Works on all pages)
  window.addEventListener("keydown", (e) => {
    // Ignore input if user is actively typing in a text field or input
    const activeTag = document.activeElement ? document.activeElement.tagName : '';
    if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || document.activeElement.isContentEditable) {
      return;
    }

    const savedPanicKey = (localStorage.getItem("panicKey") || "b").toLowerCase();
    const savedPanicUrl = localStorage.getItem("panicUrl") || "https://classroom.google.com";
    const blockerType = localStorage.getItem("panicBlocker") || "goguardian";

    if (savedPanicKey && e.key.toLowerCase() === savedPanicKey) {
      e.preventDefault();

      if (blockerType === "redirect") {
        window.location.replace(savedPanicUrl);
      } else {
        toggleDecoyOverlay(blockerType);
      }
    }
  });

  function toggleDecoyOverlay(type) {
    if (activeOverlay) {
      removeDecoyOverlay();
    } else {
      renderDecoyOverlay(type);
    }
  }

  function removeDecoyOverlay() {
    if (activeOverlay) {
      activeOverlay.remove();
      activeOverlay = null;
    }
  }

  function renderDecoyOverlay(type) {
    activeOverlay = document.createElement("div");
    activeOverlay.id = "nullx-panic-overlay";
    activeOverlay.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      z-index: 2147483647; background: #ffffff; color: #000000;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      user-select: none; overflow: auto;
    `;

    // Press ESC twice rapidly to dismiss overlay emergency backup
    let escCount = 0;
    let escTimer;
    window.addEventListener("keydown", function escListener(evt) {
      if (evt.key === "Escape") {
        escCount++;
        clearTimeout(escTimer);
        if (escCount >= 2) {
          removeDecoyOverlay();
          window.removeEventListener("keydown", escListener);
        }
        escTimer = setTimeout(() => { escCount = 0; }, 1000);
      }
    });

    activeOverlay.innerHTML = getBlockerTemplate(type);
    document.body.appendChild(activeOverlay);
  }

  // Expose toggle globally so settings modal can invoke it if needed
  window.toggleDecoyOverlay = toggleDecoyOverlay;

  // 2. TEMPLATES FOR ALL 20 BLOCKERS
  function getBlockerTemplate(type) {
    const host = window.location.hostname || "game-server.net";
    const ip = `10.${Math.floor(Math.random()*100+10)}.${Math.floor(Math.random()*200+10)}.${Math.floor(Math.random()*200+10)}`;

    switch (type) {
      case "goguardian":
        return `
          <div style="background:#1e293b; color:#fff; padding:15px 30px; display:flex; align-items:center; justify-content:space-between; border-bottom:3px solid #ef4444;">
            <div style="font-weight:700; font-size:18px; display:flex; align-items:center; gap:10px;">
              <span style="background:#ef4444; width:12px; height:12px; border-radius:50%; display:inline-block;"></span>
              GoGuardian Admin
            </div>
            <div style="font-size:12px; color:#94a3b8;">Restricted Content Engine v6.2</div>
          </div>
          <div style="max-width:600px; margin:80px auto; padding:30px; text-align:center;">
            <div style="font-size:64px; margin-bottom:10px;">🚫</div>
            <h1 style="font-size:26px; color:#0f172a; margin-bottom:12px; font-weight:800;">Restricted Page</h1>
            <p style="color:#475569; font-size:15px; line-height:1.5; margin-bottom:24px;">
              This website has been restricted by your administrator policy.
            </p>
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:16px; text-align:left; font-size:13px; color:#334155; margin-bottom:20px;">
              <div><strong>URL:</strong> https://${host}/</div>
              <div><strong>Category:</strong> Games / Uncategorized</div>
              <div><strong>Reason:</strong> Explicit Policy Block</div>
            </div>
            <button onclick="alert('Request sent to system administrator.')" style="background:#2563eb; color:#fff; border:none; padding:10px 20px; border-radius:6px; font-weight:600; cursor:pointer;">Request Admin Review</button>
          </div>
        `;

      case "securly":
        return `
          <div style="max-width:550px; margin:100px auto; font-family:Arial, sans-serif; text-align:center; box-shadow:0 10px 25px rgba(0,0,0,0.08); border-radius:12px; overflow:hidden; border:1px solid #e5e7eb;">
            <div style="background:#0284c7; color:#fff; padding:25px; font-size:22px; font-weight:bold;">Website Blocked</div>
            <div style="padding:30px; background:#fff;">
              <p style="font-size:16px; color:#374151; margin-bottom:20px;">Securly Web Filter has restricted access to this page.</p>
              <div style="background:#f3f4f6; border-left:4px solid #0284c7; padding:12px; text-align:left; font-size:13px; color:#4b5563; margin-bottom:25px;">
                <p style="margin:4px 0;"><strong>Domain:</strong> ${host}</p>
                <p style="margin:4px 0;"><strong>Filter Policy:</strong> School Strict Policy</p>
                <p style="margin:4px 0;"><strong>Category:</strong> Games & Entertainment</p>
              </div>
              <p style="font-size:12px; color:#9ca3af;">Securly Protection Services</p>
            </div>
          </div>
        `;

      case "lightspeed":
        return `
          <div style="background:#0f172a; height:100vh; color:#f8fafc; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:20px; box-sizing:border-box;">
            <div style="background:#1e293b; border:1px solid #334155; border-radius:12px; padding:40px; max-width:500px; width:100%;">
              <div style="color:#f43f5e; font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">Lightspeed Systems Relay</div>
              <h2 style="font-size:24px; font-weight:700; margin-bottom:15px; color:#fff;">Access Blocked</h2>
              <p style="color:#94a3b8; font-size:14px; margin-bottom:25px;">This domain is restricted by the network security profile.</p>
              <div style="background:#0f172a; padding:12px; border-radius:6px; font-family:monospace; font-size:12px; color:#64748b; text-align:left;">
                HOST: ${host}<br>
                RULE: DENY_GAMES_POLICY<br>
                CLIENT: ${ip}
              </div>
            </div>
          </div>
        `;

      case "fortinet":
        return `
          <div style="max-width:600px; margin:80px auto; border:2px solid #dc2626; border-radius:4px; font-family:sans-serif; background:#fff;">
            <div style="background:#dc2626; color:#fff; padding:12px 20px; font-weight:bold; font-size:16px;">FortiGuard Web Filtering - Web Page Blocked!</div>
            <div style="padding:25px; color:#1f2937;">
              <p style="font-size:14px; margin-bottom:15px;">You have attempted to access a webpage that is in violation of network usage guidelines.</p>
              <table style="width:100%; border-collapse:collapse; font-size:13px; color:#374151; margin-bottom:20px;">
                <tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:8px 0; font-weight:bold;">URL:</td><td>http://${host}/</td></tr>
                <tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:8px 0; font-weight:bold;">Category:</td><td>Freeware and Software Downloads / Games</td></tr>
                <tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:8px 0; font-weight:bold;">Client IP:</td><td>${ip}</td></tr>
              </table>
              <div style="font-size:11px; color:#6b7280; text-align:right;">Powered by Fortinet</div>
            </div>
          </div>
        `;

      case "cisco":
        return `
          <div style="max-width:580px; margin:100px auto; font-family:'Segoe UI', sans-serif;">
            <div style="border-left:6px solid #2563eb; padding-left:20px;">
              <h2 style="font-size:28px; color:#1e3a8a; margin:0 0 10px 0; font-weight:600;">Cisco Umbrella</h2>
              <h3 style="font-size:20px; color:#1f2937; margin:0 0 15px 0;">This site is blocked.</h3>
              <p style="color:#4b5563; font-size:14px; line-height:1.6;">This site is blocked due to content filtering restrictions set by your network administrator.</p>
              <div style="margin-top:20px; font-size:12px; color:#9ca3af; font-family:monospace;">
                Block Reason: Category "Gaming"<br>
                Target: ${host}
              </div>
            </div>
          </div>
        `;

      case "blocksi":
        return `
          <div style="max-width:500px; margin:90px auto; border-top:5px solid #2563eb; background:#fff; padding:30px; box-shadow:0 4px 12px rgba(0,0,0,0.1); border-radius:0 0 8px 8px; text-align:center;">
            <div style="font-size:22px; font-weight:bold; color:#1e40af; margin-bottom:10px;">Blocksi Manager</div>
            <div style="font-size:16px; color:#dc2626; font-weight:600; margin-bottom:20px;">Access Restricted</div>
            <p style="font-size:14px; color:#4b5563; margin-bottom:20px;">Web filtering settings prevent access to <strong>${host}</strong>.</p>
            <div style="background:#f3f4f6; padding:10px; border-radius:6px; font-size:12px; color:#6b7280;">Policy: Student Filter Standard</div>
          </div>
        `;

      case "paloalto":
        return `
          <div style="max-width:620px; margin:80px auto; font-family:Arial, sans-serif; border:1px solid #d1d5db; border-radius:6px; overflow:hidden;">
            <div style="background:#0f172a; color:#fff; padding:16px 20px; font-weight:bold; font-size:18px;">Palo Alto Networks - GlobalProtect</div>
            <div style="padding:30px; background:#fff; color:#374151;">
              <h2 style="color:#dc2626; font-size:20px; margin-top:0;">URL Access Blocked</h2>
              <p style="font-size:14px; line-height:1.5;">The site you requested cannot be loaded due to district security policies.</p>
              <div style="background:#f8fafc; padding:15px; border:1px solid #e2e8f0; font-size:13px; font-family:monospace; margin-top:20px;">
                URL: https://${host}/<br>User: student@school.edu<br>Action: Blocked
              </div>
            </div>
          </div>
        `;

      case "sonicwall":
        return `
          <div style="max-width:560px; margin:90px auto; border:1px solid #ea580c; border-radius:6px; font-family:sans-serif; overflow:hidden;">
            <div style="background:#ea580c; color:#fff; padding:14px 20px; font-size:18px; font-weight:bold;">SonicWall Network Security</div>
            <div style="padding:25px; background:#fff; color:#1f2937;">
              <h3 style="margin-top:0; color:#c2410c;">Web Site Blocked</h3>
              <p style="font-size:14px;">Access to the requested URL has been blocked by SonicWall Content Filtering Service.</p>
              <div style="background:#fff7ed; border:1px solid #ffedd5; padding:12px; font-size:13px; color:#9a3412; margin-top:15px;">
                <strong>URL:</strong> http://${host}/<br><strong>Category:</strong> Games
              </div>
            </div>
          </div>
        `;

      case "sophos":
        return `
          <div style="max-width:580px; margin:90px auto; border-top:6px solid #0284c7; font-family:sans-serif; padding:30px; background:#fff; box-shadow:0 10px 20px rgba(0,0,0,0.05);">
            <div style="font-size:24px; font-weight:bold; color:#0369a1; margin-bottom:10px;">Sophos Web Control</div>
            <h3 style="font-size:18px; color:#1f2937; margin-bottom:15px;">High Risk / Restrictive Category Blocked</h3>
            <p style="font-size:14px; color:#4b5563; line-height:1.5;">Access to <strong>${host}</strong> has been restricted by Sophos Endpoint Defense rules.</p>
          </div>
        `;

      case "contentkeeper":
        return `
          <div style="max-width:600px; margin:80px auto; font-family:Arial, sans-serif; background:#fff; border:1px solid #cbd5e1; border-radius:8px; overflow:hidden;">
            <div style="background:#0284c7; color:#fff; padding:16px 24px; font-size:20px; font-weight:bold;">ContentKeeper Web Filter</div>
            <div style="padding:30px; color:#334155;">
              <h2 style="color:#b91c1c; font-size:22px; margin-top:0;">Access Denied by Policy</h2>
              <p style="font-size:14px;">Your network administrator has configured ContentKeeper to filter this site.</p>
              <div style="background:#f1f5f9; padding:12px; font-size:13px; font-family:monospace; margin-top:20px;">
                Site: ${host}<br>Reason: Uncategorized Media / Games
              </div>
            </div>
          </div>
        `;

      case "smoothwall":
        return `
          <div style="max-width:550px; margin:90px auto; font-family:Helvetica, sans-serif; border-left:6px solid #0d9488; padding:30px; background:#fff; box-shadow:0 4px 15px rgba(0,0,0,0.06);">
            <div style="font-size:22px; font-weight:bold; color:#0f766e; margin-bottom:10px;">Smoothwall Filter</div>
            <h3 style="font-size:18px; color:#111827; margin-bottom:10px;">Content Restricted</h3>
            <p style="font-size:14px; color:#4b5563;">Access to the requested URL <strong>${host}</strong> has been denied based on active safety policies.</p>
          </div>
        `;

      case "linewize":
        return `
          <div style="max-width:500px; margin:100px auto; font-family:sans-serif; text-align:center; padding:35px; background:#fff; border-radius:12px; box-shadow:0 8px 30px rgba(0,0,0,0.1);">
            <div style="font-size:28px; font-weight:bold; color:#4f46e5; margin-bottom:10px;">Linewize</div>
            <div style="font-size:18px; font-weight:600; color:#1f2937; margin-bottom:15px;">Page Blocked</div>
            <p style="font-size:14px; color:#6b7280; line-height:1.5;">This website is restricted under your school's online safety policy.</p>
            <div style="margin-top:20px; font-size:12px; color:#9ca3af; font-family:monospace;">Domain: ${host}</div>
          </div>
        `;

      case "iboss":
        return `
          <div style="max-width:580px; margin:80px auto; font-family:Arial, sans-serif; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden;">
            <div style="background:#111827; color:#fff; padding:18px 24px; font-weight:bold; font-size:20px; display:flex; justify-content:space-between; align-items:center;">
              iboss Cybersecurity
              <span style="background:#ef4444; font-size:11px; padding:3px 8px; border-radius:4px; text-transform:uppercase;">Blocked</span>
            </div>
            <div style="padding:30px; background:#fff; color:#374151;">
              <h3 style="margin-top:0; color:#111827;">Threat & Content Defense Triggered</h3>
              <p style="font-size:14px;">Access to <strong>http://${host}/</strong> is denied by organizational safety policy.</p>
            </div>
          </div>
        `;

      case "zscaler":
        return `
          <div style="max-width:580px; margin:90px auto; font-family:Arial, sans-serif; border:1px solid #cbd5e1; border-radius:8px; padding:30px; background:#fff;">
            <div style="color:#0284c7; font-size:24px; font-weight:bold; margin-bottom:10px;">Zscaler Internet Access</div>
            <h2 style="font-size:20px; color:#0f172a; margin-bottom:15px;">Organization Security Policy - Blocked</h2>
            <p style="font-size:14px; color:#475569; line-height:1.5;">The requested URL violates institutional web use rules.</p>
            <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:12px; font-size:12px; font-family:monospace; color:#334155; margin-top:20px;">
              URL: https://${host}/<br>Category: Games / Uncategorized
            </div>
          </div>
        `;

      case "barracuda":
        return `
          <div style="max-width:560px; margin:90px auto; border:1px solid #3b82f6; border-radius:6px; font-family:sans-serif; overflow:hidden;">
            <div style="background:#1d4ed8; color:#fff; padding:14px 20px; font-size:18px; font-weight:bold;">Barracuda Web Security Gateway</div>
            <div style="padding:25px; background:#fff; color:#1f2937;">
              <h3 style="margin-top:0; color:#dc2626;">Access Denied</h3>
              <p style="font-size:14px;">Access to <strong>http://${host}/</strong> has been blocked by Barracuda Web Filter.</p>
            </div>
          </div>
        `;

      case "lanschool":
        return `
          <div style="max-width:500px; margin:100px auto; font-family:sans-serif; text-align:center; padding:30px; border:1px solid #e5e7eb; border-radius:10px; background:#fff;">
            <div style="font-size:20px; font-weight:bold; color:#2563eb; margin-bottom:10px;">LanSchool Web Control</div>
            <div style="font-size:16px; font-weight:600; color:#dc2626; margin-bottom:15px;">Page Restricted</div>
            <p style="font-size:14px; color:#4b5563;">Your teacher or administrator has restricted access to <strong>${host}</strong>.</p>
          </div>
        `;

      case "impero":
        return `
          <div style="max-width:520px; margin:90px auto; border-top:5px solid #7c3aed; background:#fff; padding:30px; box-shadow:0 4px 15px rgba(0,0,0,0.08); border-radius:0 0 8px 8px;">
            <div style="font-size:22px; font-weight:bold; color:#6d28d9; margin-bottom:10px;">Impero Education Pro</div>
            <h3 style="font-size:16px; color:#1f2937; margin-bottom:15px;">Policy Violation Block</h3>
            <p style="font-size:14px; color:#4b5563;">Access to <strong>${host}</strong> is blocked under active classroom control profile.</p>
          </div>
        `;

      case "aristotle":
        return `
          <div style="max-width:550px; margin:90px auto; font-family:Arial, sans-serif; border:1px solid #cbd5e1; border-radius:6px; overflow:hidden;">
            <div style="background:#1e3a8a; color:#fff; padding:15px 20px; font-weight:bold; font-size:18px;">Aristotle K12 Borderless Classroom</div>
            <div style="padding:25px; background:#fff; color:#334155;">
              <h3 style="color:#b91c1c; margin-top:0;">Restricted Access</h3>
              <p style="font-size:14px;">The site <strong>${host}</strong> is blocked during active class sessions.</p>
            </div>
          </div>
        `;

      case "chrome_blocked":
        return `
          <div style="background:#fff; height:100vh; padding:80px 40px; box-sizing:border-box; font-family:Roboto, Arial, sans-serif; color:#202124;">
            <div style="max-width:500px; margin:0 auto;">
              <div style="font-size:48px; margin-bottom:20px; color:#5f6368;">🚫</div>
              <h1 style="font-size:22px; font-weight:500; margin-bottom:15px;">Blocked by administrator</h1>
              <p style="font-size:14px; color:#5f6368; line-height:1.6; margin-bottom:25px;">
                This page has been blocked by your administrator.
              </p>
              <div style="font-family:monospace; font-size:12px; color:#5f6368;">ERR_BLOCKED_BY_ADMINISTRATOR</div>
            </div>
          </div>
        `;

      case "generic_404":
      default:
        return `
          <div style="background:#fff; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:sans-serif; color:#1f2937;">
            <h1 style="font-size:72px; margin:0; color:#9ca3af;">404</h1>
            <h2 style="font-size:24px; margin:10px 0; font-weight:600;">Page Not Found</h2>
            <p style="color:#6b7280; font-size:14px;">The server could not verify that the requested URL exists on this host.</p>
          </div>
        `;
    }
  }
})();


// Expose core view functions globally (works whether loaded as module or classic script)
try {
  window.showHomeView = showHomeView;
  window.showAllGamesView = showAllGamesView;
  window.showFavoritesView = showFavoritesView;
  window.handlePlaceholderView = handlePlaceholderView;
  window.clearAllViews = clearAllViews;
  window.renderLibraryGrid = renderLibraryGrid;
  window.launchGame = launchGame;
  window.__nxLaunchProxy = __nxLaunchProxy;
  window.__nxDecodeP = __nxDecodeP;
  window._0xData = _0xData;
} catch (e) {}
