(function NullXFunPack() {
  "use strict";

  if (window.__NULLX_FUN_PACK__) return;
  window.__NULLX_FUN_PACK__ = true;

  const waitFor = (selector, timeout = 10000) => new Promise((resolve) => {
    const started = Date.now();
    const timer = setInterval(() => {
      const element = document.querySelector(selector);
      if (element || Date.now() - started > timeout) {
        clearInterval(timer);
        resolve(element || null);
      }
    }, 50);
  });

  waitFor("#nx-reset-fun").then((resetButton) => {
    if (!resetButton || document.getElementById("nx-funpack-style")) return;

    const state = {
      style: null,
      trail: false,
      trailHandler: null,
      snow: false,
      snowCanvas: null,
      snowFrame: null,
      snowResize: null,
      emoji: false,
      emojiCanvas: null,
      emojiFrame: null,
      emojiResize: null,
      crt: false,
      pixel: false,
      vignette: false,
      mirror: false,
      rainbow: false,
      bounce: false,
      glitch: false,
      gravity: false,
      zoom: 100,
      fakeLoader: null,
      originalTransforms: new Map(),
      gravityTimer: null
    };

    const style = document.createElement("style");
    style.id = "nx-funpack-style";
    style.textContent = `
      #nx-funpack-overlay { position:fixed; inset:0; pointer-events:none; z-index:2147482990; overflow:hidden; }
      #nx-funpack-loader { position:fixed; inset:0; z-index:2147483500; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.86); color:#00ffcc; font:900 18px Consolas,monospace; letter-spacing:2px; text-align:center; }
      #nx-funpack-loader div { padding:28px 34px; border:1px solid #8b00ff; border-radius:12px; background:#12091c; box-shadow:0 0 45px rgba(139,0,255,.45); }
      #nx-funpack-loader small { display:block; color:#a99bb9; margin-top:12px; font-size:11px; letter-spacing:0; }
      .nx-funpack-crt { filter:contrast(1.15) saturate(1.15) !important; }
      .nx-funpack-crt::before { content:""; position:fixed; inset:0; z-index:2147482980; pointer-events:none; background:repeating-linear-gradient(to bottom,rgba(255,255,255,.045) 0 1px,rgba(0,0,0,.12) 1px 3px); mix-blend-mode:overlay; }
      .nx-funpack-pixel { image-rendering:pixelated; filter:contrast(1.25) saturate(.8) !important; }
      .nx-funpack-vignette::after { content:""; position:fixed; inset:0; z-index:2147482979; pointer-events:none; box-shadow:inset 0 0 180px 45px rgba(0,0,0,.8); }
      .nx-funpack-mirror { transform:scaleX(-1) !important; }
      .nx-funpack-rainbow *:not(#nx-hud):not(#nx-hud *) { outline:1px solid hsl(var(--nx-rainbow-hue,0) 100% 55% / .55) !important; }
      .nx-funpack-bounce > * { animation:nx-funpack-bounce 1s ease-in-out infinite alternate !important; }
      .nx-funpack-glitch { animation:nx-funpack-glitch .18s steps(2,end) infinite !important; }
      @keyframes nx-funpack-bounce { from { transform:translateY(0) } to { transform:translateY(-8px) } }
      @keyframes nx-funpack-glitch { 0% { transform:translate(0) } 25% { transform:translate(3px,-2px) skewX(1deg) } 50% { transform:translate(-3px,2px) skewX(-1deg) } 75% { transform:translate(2px,1px) } 100% { transform:translate(0) } }
    `;
    document.head.appendChild(style);
    state.style = style;

    const tools = document.querySelector("#nx-tab-tools .nx-grid");
    const card = document.createElement("div");
    card.className = "nx-card full";
    card.id = "nx-funpack-card";
    card.innerHTML = `
      <div class="nx-card-title">Fun Pack: Visuals and Overlays</div>
      <div class="nx-buttons">
        <button class="nx-btn" id="nx-fp-confetti">Confetti Burst</button>
        <button class="nx-btn" id="nx-fp-snow">Snow / Starfield</button>
        <button class="nx-btn" id="nx-fp-emoji">Emoji Rain</button>
        <button class="nx-btn" id="nx-fp-cursor">Neon Cursor Trail</button>
        <button class="nx-btn" id="nx-fp-glitch">Glitch Page</button>
        <button class="nx-btn" id="nx-fp-bounce">Bouncy UI</button>
        <button class="nx-btn" id="nx-fp-gravity">Gravity Mode</button>
        <button class="nx-btn" id="nx-fp-crt">Retro CRT</button>
        <button class="nx-btn" id="nx-fp-pixel">Pixel Mode</button>
        <button class="nx-btn" id="nx-fp-vignette">Dark Vignette</button>
        <button class="nx-btn" id="nx-fp-mirror">Mirror Page</button>
        <button class="nx-btn" id="nx-fp-rainbow">Rainbow Borders</button>
        <button class="nx-btn" id="nx-fp-loader">Fake Loader</button>
        <button class="nx-btn" id="nx-fp-font">Random Font</button>
        <button class="nx-btn" id="nx-fp-color">True Random Color</button>
        <button class="nx-btn danger" id="nx-fp-reset">Reset Fun Pack</button>
      </div>
      <div class="nx-row" style="margin-top:10px">
        <span>Page zoom</span>
        <span>
          <button class="nx-btn" id="nx-fp-zoom-out">−</button>
          <span id="nx-fp-zoom-value" style="padding:0 8px">100%</span>
          <button class="nx-btn" id="nx-fp-zoom-in">+</button>
          <button class="nx-btn" id="nx-fp-zoom-reset">100%</button>
        </span>
      </div>
    `;
    tools.insertBefore(card, resetButton.closest(".nx-card"));

    const toast = (message, type = "success") => {
      const wrap = document.getElementById("nx-toast-wrap");
      if (!wrap) return;
      const item = document.createElement("div");
      item.className = `nx-toast ${type}`;
      item.textContent = message;
      wrap.appendChild(item);
      setTimeout(() => item.remove(), 2600);
    };

    const randomHex = () => `#${crypto.getRandomValues(new Uint32Array(1))[0].toString(16).padStart(8, "0").slice(0, 6)}`;
    const body = () => document.body;

    const canvasEffect = (kind) => {
      const canvas = document.createElement("canvas");
      canvas.id = `nx-funpack-${kind}`;
      canvas.style.cssText = "position:fixed;inset:0;z-index:2147482990;pointer-events:none";
      document.body.appendChild(canvas);
      const context = canvas.getContext("2d");
      const characters = ["❄","✦","·","✧","✺"];
      const emojis = ["✨","💜","🟣","⭐","🎮","💻","🛸","🔥","😎","🍕"];
      let items = [];
      const resize = () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        items = Array.from({ length: kind === "snow" ? 130 : 70 }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: kind === "snow" ? 8 + Math.random() * 14 : 14 + Math.random() * 18,
          speed: .5 + Math.random() * 2.5,
          drift: Math.random() * 2 - 1,
          spin: Math.random() * Math.PI * 2
        }));
      };
      const draw = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = kind === "snow" ? "16px monospace" : "20px sans-serif";
        items.forEach((item, index) => {
          context.fillStyle = kind === "snow" ? `hsla(${180 + Math.random() * 80},100%,85%,.85)` : "#fff";
          context.fillText(kind === "snow" ? characters[index % characters.length] : emojis[index % emojis.length], item.x, item.y);
          item.y += item.speed;
          item.x += item.drift + Math.sin(item.y / 50) * .5;
          if (item.y > canvas.height + 30) { item.y = -30; item.x = Math.random() * canvas.width; }
        });
        const key = kind === "snow" ? "snowFrame" : "emojiFrame";
        state[key] = requestAnimationFrame(draw);
      };
      resize();
      window.addEventListener("resize", resize);
      return { canvas, resize, draw };
    };

    const stopCanvas = (kind) => {
      const isSnow = kind === "snow";
      cancelAnimationFrame(state[isSnow ? "snowFrame" : "emojiFrame"]);
      const canvas = state[isSnow ? "snowCanvas" : "emojiCanvas"];
      const resize = state[isSnow ? "snowResize" : "emojiResize"];
      if (resize) window.removeEventListener("resize", resize);
      canvas?.remove();
      state[isSnow ? "snow" : "emoji"] = false;
      state[isSnow ? "snowCanvas" : "emojiCanvas"] = null;
      state[isSnow ? "snowFrame" : "emojiFrame"] = null;
      state[isSnow ? "snowResize" : "emojiResize"] = null;
    };

    const toggleCanvas = (kind) => {
      const isSnow = kind === "snow";
      if (state[isSnow ? "snow" : "emoji"]) { stopCanvas(kind); toast(`${isSnow ? "Snow" : "Emoji rain"} stopped`); return; }
      const effect = canvasEffect(kind);
      state[isSnow ? "snow" : "emoji"] = true;
      state[isSnow ? "snowCanvas" : "emojiCanvas"] = effect.canvas;
      state[isSnow ? "snowResize" : "emojiResize"] = effect.resize;
      effect.draw();
      toast(`${isSnow ? "Snow / starfield" : "Emoji rain"} enabled`);
    };

    const confetti = () => {
      const overlay = document.createElement("div");
      overlay.id = "nx-funpack-overlay";
      document.body.appendChild(overlay);
      for (let i = 0; i < 150; i++) {
        const piece = document.createElement("i");
        piece.style.cssText = `position:absolute;top:-20px;left:${Math.random()*100}%;width:${5+Math.random()*8}px;height:${8+Math.random()*15}px;background:${randomHex()};transform:rotate(${Math.random()*360}deg);animation:nx-fp-drop ${1.5+Math.random()*2}s linear forwards`;
        overlay.appendChild(piece);
      }
      const style = document.createElement("style");
      style.textContent = "@keyframes nx-fp-drop{to{transform:translateY(110vh) rotate(900deg);opacity:0}}";
      overlay.appendChild(style);
      setTimeout(() => overlay.remove(), 3800);
      toast("Confetti deployed");
    };

    const toggleCursor = () => {
      state.trail = !state.trail;
      if (!state.trail) {
        document.removeEventListener("mousemove", state.trailHandler);
        state.trailHandler = null;
        toast("Cursor trail disabled");
        return;
      }
      state.trailHandler = (event) => {
        const dot = document.createElement("b");
        dot.style.cssText = `position:fixed;left:${event.clientX}px;top:${event.clientY}px;width:8px;height:8px;border-radius:50%;pointer-events:none;z-index:2147483001;background:${randomHex()};box-shadow:0 0 15px currentColor;transform:translate(-50%,-50%);transition:opacity .6s,transform .6s`;
        document.body.appendChild(dot);
        requestAnimationFrame(() => { dot.style.opacity="0"; dot.style.transform="translate(-50%,-50%) scale(4)"; });
        setTimeout(() => dot.remove(), 650);
      };
      document.addEventListener("mousemove", state.trailHandler);
      toast("Cursor trail enabled");
    };

    const toggleGravity = () => {
      state.gravity = !state.gravity;
      if (!state.gravity) {
        clearInterval(state.gravityTimer);
        state.originalTransforms.forEach((transform, element) => { element.style.transform = transform; element.style.position = ""; element.style.zIndex = ""; });
        state.originalTransforms.clear();
        toast("Gravity reset");
        return;
      }
      const targets = [...document.querySelectorAll(".game-card,.nx-card,.news-card,button")].filter((el) => !el.closest("#nx-hud"));
      targets.slice(0, 80).forEach((element, index) => {
        state.originalTransforms.set(element, element.style.transform || "");
        element.style.position = "relative";
        element.style.zIndex = "2";
        element.style.transform = `translate(${Math.round((Math.random()-.5)*120)}px, ${80 + (index%8)*40}px) rotate(${Math.round((Math.random()-.5)*20)}deg)`;
      });
      state.gravityTimer = setTimeout(() => { if (state.gravity) toast("Gravity mode active — use Reset Fun Pack to restore"); }, 400);
      toast("Gravity mode enabled", "warn");
    };

    const updateZoom = () => {
      document.documentElement.style.zoom = `${state.zoom}%`;
      document.getElementById("nx-fp-zoom-value").textContent = `${state.zoom}%`;
    };

    const trueRandomColor = () => {
      const color = randomHex();
      const companion = randomHex();
      document.documentElement.style.setProperty("--nx-border", color);
      document.documentElement.style.setProperty("--nx-accent", companion);
      document.documentElement.style.setProperty("--nx-rainbow-hue", Math.floor(Math.random() * 360));
      toast(`True random colors: ${color} / ${companion}`);
    };

    const randomFont = () => {
      const fonts = ["Comic Sans MS, cursive", "Impact, fantasy", "Georgia, serif", "Courier New, monospace", "Trebuchet MS, sans-serif", "Palatino, serif"];
      const font = fonts[Math.floor(Math.random() * fonts.length)];
      document.body.style.fontFamily = font;
      toast(`Font set to ${font.split(",")[0]}`);
    };

    const fakeLoader = () => {
      if (state.fakeLoader) { state.fakeLoader.remove(); state.fakeLoader = null; return; }
      const loader = document.createElement("div");
      loader.id = "nx-funpack-loader";
      loader.innerHTML = "<div>INITIALIZING NULL X CORE<span id='nx-fp-loader-percent'>0%</span><small>Click anywhere to dismiss.</small></div>";
      document.body.appendChild(loader);
      state.fakeLoader = loader;
      let percent = 0;
      const label = loader.querySelector("#nx-fp-loader-percent");
      const timer = setInterval(() => {
        percent = Math.min(100, percent + 3 + Math.floor(Math.random() * 12));
        label.textContent = `${percent}%`;
        if (percent === 100) clearInterval(timer);
      }, 150);
      loader.addEventListener("click", () => { clearInterval(timer); loader.remove(); state.fakeLoader = null; });
    };

    const reset = () => {
      stopCanvas("snow");
      stopCanvas("emoji");
      if (state.trail) toggleCursor();
      if (state.gravity) toggleGravity();
      state.fakeLoader?.remove(); state.fakeLoader = null;
      ["nx-funpack-crt","nx-funpack-pixel","nx-funpack-vignette","nx-funpack-mirror","nx-funpack-rainbow","nx-funpack-bounce","nx-funpack-glitch"].forEach((name) => body().classList.remove(name));
      document.body.style.fontFamily = "";
      document.documentElement.style.zoom = "";
      state.zoom = 100;
      document.getElementById("nx-fp-zoom-value").textContent = "100%";
      document.documentElement.style.removeProperty("--nx-border");
      document.documentElement.style.removeProperty("--nx-accent");
      toast("Fun Pack reset");
    };

    document.getElementById("nx-fp-confetti").onclick = confetti;
    document.getElementById("nx-fp-snow").onclick = () => toggleCanvas("snow");
    document.getElementById("nx-fp-emoji").onclick = () => toggleCanvas("emoji");
    document.getElementById("nx-fp-cursor").onclick = toggleCursor;
    document.getElementById("nx-fp-glitch").onclick = () => body().classList.toggle("nx-funpack-glitch");
    document.getElementById("nx-fp-bounce").onclick = () => body().classList.toggle("nx-funpack-bounce");
    document.getElementById("nx-fp-gravity").onclick = toggleGravity;
    document.getElementById("nx-fp-crt").onclick = () => body().classList.toggle("nx-funpack-crt");
    document.getElementById("nx-fp-pixel").onclick = () => body().classList.toggle("nx-funpack-pixel");
    document.getElementById("nx-fp-vignette").onclick = () => body().classList.toggle("nx-funpack-vignette");
    document.getElementById("nx-fp-mirror").onclick = () => body().classList.toggle("nx-funpack-mirror");
    document.getElementById("nx-fp-rainbow").onclick = () => { body().classList.toggle("nx-funpack-rainbow"); const timer = setInterval(() => { if (!body().classList.contains("nx-funpack-rainbow")) return clearInterval(timer); document.documentElement.style.setProperty("--nx-rainbow-hue", Math.floor(Math.random()*360)); }, 180); };
    document.getElementById("nx-fp-loader").onclick = fakeLoader;
    document.getElementById("nx-fp-font").onclick = randomFont;
    document.getElementById("nx-fp-color").onclick = trueRandomColor;
    document.getElementById("nx-fp-reset").onclick = reset;
    document.getElementById("nx-fp-zoom-out").onclick = () => { state.zoom = Math.max(50, state.zoom - 10); updateZoom(); };
    document.getElementById("nx-fp-zoom-in").onclick = () => { state.zoom = Math.min(175, state.zoom + 10); updateZoom(); };
    document.getElementById("nx-fp-zoom-reset").onclick = () => { state.zoom = 100; updateZoom(); };

    resetButton.addEventListener("click", reset);
  });
})();
