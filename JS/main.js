import { applyCloak } from '../Cloaks/Cloaks.js';

let _0xData = [
  { id: "b_ap", title: "Brotato All Pain No Gain", url: "Games/brotatoAPNG/Brotato.html", desc: "The newest version of Brotato with the All Pain No Gain update.", popular: true },
  { id: "y_io", title: "Yohoho.io", url: "Games/yohoho/index.html", desc: "A pirate battle royale game where you collect gold and fight opponents.", popular: true },
  { id: "s_lp", title: "Slope", url: "Games/slope/index.html", desc: "A fast-paced 3D platformer. Stay on the track!", popular: true },
  { id: "d_md", title: "Drive0ad", url: "Games/drivemad/index.html", desc: "Challenging physics-based driving. Don't flip your truck!", popular: true },
  { id: "b_ft", title: "Bullet Force", url: "Games/bulletforce/index.html", desc: "Action-packed multiplayer FPS. Dominate the battlefield.", popular: true },
  { id: "b_bb", title: "Baseball Bros", url: "Games/baseballbros/Baseballbros.html", desc: "An arcade baseball game with fast-paced matches.", popular: true },
  { id: "b_kt", title: "BasketBros", url: "Games/basketbros/Basketbros.html", desc: "Chaotic basketball with crazy dunks and quick matches.", popular: true },
  { id: "b_sts", title: "Basketball Stars", url: "Games/basketballstars/Basketballstars.html", desc: "Fast-paced 1v1 street-style basketball matches.", popular: true },
  { id: "c_cc", title: "Cookie Clicker", url: "Games/cookie clicker/Cookieclicker.html", desc: "Click cookies to build an industrial empire.", popular: true },
  { id: "b_rd", title: "Basket Random", url: "Games/basketrandom/Basketrandom.html", desc: "Fun basketball game featuring completely random physics parameters.", popular: true },
  { id: "r_bw", title: "Retro Bowl", url: "Games/retrobowl/Retrobowl.html", desc: "Manage your team and lead them to gridiron glory.", popular: true },
  { id: "a_us", title: "Among Us", url: "Games/amongus/Amongus.html", desc: "Complete tasks while avoiding hidden impostors.", popular: true },
  { id: "d_dk", title: "Doki Doki Literature Club", url: "Games/dokidoki/index.html", desc: "A deep psychological horror visual novel experience.", popular: true },
  { id: "p_tr", title: "PolyTrack", url: "Games/polytrack/index.html", desc: "A fast-paced low-poly racing game with crisp drifting controls.", popular: true },
  { id: "a_gr", title: "Agar.io", url: "Games/agar/index.html", desc: "Multiplayer cells-eating battle arena. (May experience latency issues)", popular: true },
  { id: "t_ts", title: "Truck Sim", url: "Games/trucksim/index.html", desc: "Navigate tricky roads transporting heavy structural cargo safely.", popular: true },
  { id: "g_ta", title: "Grand Theft Auto", url: "Games/GTA/index.html", desc: "Classic open-world sandbox environment full of sandbox operations.", popular: true },
  { id: "t_pa", title: "Throw a Potato", url: "Games/TAPA/index.html", desc: "Physics arcade game where you launch a potato over complex obstacles.", popular: true },
  { id: "t_p2", title: "Throw a Potato 2", url: "Games/TAPA2/index.html", desc: "The official sequel featuring refined launch engines and bigger stages.", popular: true },
  { id: "t_to", title: "Tung Tung Tung Sahur Obby", url: "Games/T^3sahurobby/index.html", desc: "Meme-inspired obstacle map built to test jumping accuracy.", popular: true },
  { id: "t_bb", title: "Tung Baldi Basics", url: "Games/tungbaldibasics/index.html", desc: "Horror puzzle game featuring surreal environments and puzzle challenges.", popular: true },
  { id: "w_dl", title: "Wordle", url: "Games/wordle/index.html", desc: "Figure out the daily hidden five-letter word within six attempts.", popular: true },
  { id: "v_3x", title: "Vex 3 Xmas", url: "Games/Vex/Vex 3 Xmas/index.html", desc: "Festive holiday edition of the classic stickman parkour challenge.", popular: true },
  { id: "v_4", title: "Vex 4", url: "Games/Vex/Vex 4/index.html", desc: "Sprint, leap, and dodge deadly stage traps dynamically.", popular: true },
  { id: "v_5", title: "Vex 5", url: "Games/Vex/Vex 5/index.html", desc: "Hardcore level obstacles matching elite timing requirements.", popular: true },
  { id: "v_6", title: "Vex 6", url: "Games/Vex/Vex 6/index.html", desc: "Refined stickman parkour tracks with brand new stage assets.", popular: true },
  { id: "v_7", title: "Vex 7", url: "Games/Vex/Vex 7/index.html", desc: "Complex levels engineered to test your reflexes.", popular: true },
  { id: "v_8", title: "Vex 8", url: "Games/Vex/Vex 8/index.html", desc: "The absolute latest installment in the Vex platforming franchise.", popular: true },
  { id: "v_ch", title: "Vex Challenges", url: "Games/Vex/Vex Challenges/index.html", desc: "Bite-sized high-speed speedrunning tasks for testing agility.", popular: true },
  { id: "v_x2", title: "Vex x3m 2", url: "Games/Vex/Vex x3m 2/index.html", desc: "Extreme driving mechanics combined with classic Vex obstacle formats.", popular: true },
  { id: "v_xm", title: "Vex x3m", url: "Games/Vex/Vex x3m/index.html", desc: "Blast through motorcycle speed trials with tight balance adjustments.", popular: true },
  { id: "v_3", title: "Vex 3", url: "Games/Vex/Vex3/index.html", desc: "The iconic original entry into the parkour system.", popular: true },
  { id: "slice_master", title: "Slice Master", url: "Games/slicemaster/index.html", desc: "Flip your blades accurately to chop items clean in half down the line.", popular: true },
  { id: "skinwalker", title: "Skinwalker", url: "Games/skinwalker/index.html", desc: "Atmospheric survival horror centered around staying undetected outdoors.", popular: true },
  { id: "skib_shooter", title: "Skib Shooters", url: "Games/skibshooter/index.html", desc: "Dynamic target arena where waves of attackers stream in continuously.", popular: true },
  { id: "ragdoll_drop", title: "Ragdoll Drop", url: "Games/ragdrop/index.html", desc: "Drop your structural targets down pins to clear high score records.", popular: true },
  { id: "g_spin", title: "Gun Spin", url: "Games/gunspin/gunspin.html", desc: "Launch your firearm through the air and use recoil strategically to travel the greatest distance possible.", popular: true },
  { id: "gm_1", title: "Gun Mayhem", url: "Games/GunMayhem/gunmayhem/gunmayhem.html", desc: "Fast-paced multiplayer arena shooter featuring powerful weapons, explosions, and chaotic battles.", popular: true },
  { id: "gm_2", title: "Gun Mayhem 2", url: "Games/GunMayhem/gunmayhem2/gunmayhem2.html", desc: "The sequel to Gun Mayhem with more weapons, maps, customization, and intense combat.", popular: true },
  { id: "gm_r", title: "Gun Mayhem Redux", url: "Games/GunMayhem/gunmayhemredux/gunmayhemredux.html", desc: "A remastered Gun Mayhem experience with improved gameplay, expanded content, and smoother action.", popular: true },
  { id: "m_d", title: "Mutilate a Doll", url: "Games/mutilateadoll/mutilateadoll.html", desc: "A sandbox ragdoll simulation game where you can experiment with physics, weapons, and chaos. (Will Cause Massive Lag)", popular: true },
];

// Context Management variables
let favoriteGamesList = JSON.parse(localStorage.getItem('nullx_favorites_arr')) || [];
let contextTargetId = null;

function launchStealthWindow(maskType, targetEnv) {
  const currentUrl = window.location.href;
  let title = "Google Docs";
  let escapeRedirect = "https://docs.google.com";

  const customCloaks = {
    'Google Classroom': { t: "Classes", r: "https://classroom.google.com" },
    'Google Drive': { t: "My Drive - Google Drive", r: "https://drive.google.com" },
    'Gmail': { t: "Inbox", r: "https://mail.google.com" },
    'Canvas': { t: "Dashboard", r: "https://canvas.instructure.com" },
    'Canva': { t: "Home - Canva", r: "https://www.canva.com" },
    'Microsoft 365': { t: "Microsoft 365", r: "https://www.office.com" },
    'NoRedInk': { t: "NoRedInk", r: "https://www.noredink.com" },
    'Neptune Navigate': { t: "Neptune Navigate", r: "https://neptunenavigate.com" },
    'Pear Assessment': { t: "Pear Assessment", r: "https://www.pearassessment.com" },
    'Membean': { t: "Membean: Dashboard", r: "https://membean.com" },
    'i-Ready Reading': { t: "i-Ready", r: "https://login.i-ready.com" },
    'i-Ready Math': { t: "i-Ready", r: "https://login.i-ready.com" },
    'DeltaMath': { t: "DeltaMath", r: "https://www.deltamath.com" },
    'ExploreLearning Gizmos': { t: "Gizmos Dashboard", r: "https://www.explorelearning.com" },
    'Progress Learning': { t: "Progress Learning", r: "https://progresslearning.com" },
    'Student Support Time': { t: "Student Support Time", r: "https://studentsupporttime.com" },
    'Kahoot': { t: "Enter Game PIN - Kahoot!", r: "https://kahoot.it" },
    'Nearpod': { t: "Nearpod", r: "https://nearpod.com" }
  };

  if (customCloaks[maskType]) {
    title = customCloaks[maskType].t;
    escapeRedirect = customCloaks[maskType].r;
  }

  let targetTab;
  if (targetEnv === 'blob') {
    const htmlPayload = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <style>
          body, html { margin:0; padding:0; width:100%; height:100%; overflow:hidden; background:#000; }
          iframe { width:100%; height:100%; border:none; margin:0; padding:0; }
        </style>
      </head>
      <body><iframe src="${currentUrl}"></iframe></body>
      </html>
    `;
    const blob = new Blob([htmlPayload], { type: 'text/html' });
    targetTab = window.open(URL.createObjectURL(blob), '_blank');
  } else {
    targetTab = window.open('about:blank', '_blank');
    if (targetTab) {
      targetTab.document.title = title;
      const frame = targetTab.document.createElement('iframe');
      frame.src = currentUrl;
      frame.style = "position:fixed; top:0; left:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;";
      targetTab.document.body.appendChild(frame);
    }
  }

  if (!targetTab) {
    alert("Pop-up blocked! Please allow popup permissions.");
    return;
  }
  window.location.replace(escapeRedirect);
}

function launchGame(gameId) {
  const game = _0xData.find(g => g.id === gameId);
  if (game) {
    const baseHrefLocation = window.location.href.split('?')[0].split('#')[0];
    const baseDir = baseHrefLocation.substring(0, baseHrefLocation.lastIndexOf('/') + 1);
    
    document.open();
    document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${game.title}</title>
        <style>body,html{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:#000;}iframe{width:100%;height:100%;border:none;display:block;}</style>
      </head>
      <body><iframe src="${baseDir + game.url}"></iframe></body>
      </html>
    `);
    document.close();

    const backNav = document.createElement('div');
    backNav.style = "position: fixed; top: 15px; left: 15px; z-index: 99999999; font-family: sans-serif;";
    backNav.innerHTML = `<button onclick="window.location.replace('/');" style="background:#0a0a0a; color:#8b00ff; border:2px solid #8b00ff; padding:8px 14px; font-weight:bold; border-radius:6px; cursor:pointer; box-shadow:0 0 10px rgba(139,0,255,0.5);">← Back to Home</button>`;
    document.body.appendChild(backNav);
  }
}

function renderLibraryGrid(gamesArray) {
  const gameGrid = document.getElementById('gameGrid');
  if (!gameGrid) return;
  gameGrid.innerHTML = '';
  gamesArray.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.setAttribute('data-game-id', game.id);
    card.innerHTML = `<h3>${game.title}</h3><div class="game-desc-overlay">${game.desc}</div>`;
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
    emptyMsg.style.display = 'block';
  } else {
    emptyMsg.style.display = 'none';
    favoriteGamesList.forEach(gameId => {
      const game = _0xData.find(g => g.id === gameId);
      if (game) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.setAttribute('data-game-id', game.id);
        card.innerHTML = `<h3>${game.title}</h3><div class="game-desc-overlay">${game.desc}</div>`;
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

  if (_0xData.length > 0 && heroTitle) {
    const randomGameSelection = _0xData[Math.floor(Math.random() * _0xData.length)];
    heroTitle.textContent = randomGameSelection.title;
    if (heroDesc) heroDesc.textContent = randomGameSelection.desc;
    if (playFeaturedBtn) {
      playFeaturedBtn.onclick = () => launchGame(randomGameSelection.id);
    }
  }
}

function updateNavActiveState(activeId) {
  ['nav-home', 'nav-games', 'nav-favorites', 'nav-unblockers', 'nav-profile', 'nav-communications', 'nav-terminal'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  const currentActive = document.getElementById(activeId);
  if (currentActive) currentActive.classList.add('active');
}

function clearAllViews() {
  const heroSection = document.getElementById('heroSection');
  const randomSection = document.querySelector('.random-section');
  const gameGrid = document.getElementById('gameGrid');
  const favGrid = document.getElementById('favoritesGrid');

  if (heroSection) heroSection.style.display = 'none';
  if (randomSection) randomSection.style.display = 'none';
  if (gameGrid) gameGrid.style.display = 'none';
  if (favGrid) favGrid.style.display = 'none';
}

function showHomeView() {
  clearAllViews();
  updateNavActiveState('nav-home');
  
  const heroSection = document.getElementById('heroSection');
  const randomSection = document.querySelector('.random-section');
  const gameGrid = document.getElementById('gameGrid');
  
  if (heroSection) heroSection.style.display = 'flex';
  if (randomSection) randomSection.style.display = 'block';
  if (gameGrid) {
    gameGrid.style.display = 'grid';
  }
  initFeaturedModule();
}

function showAllGamesView() {
  clearAllViews();
  updateNavActiveState('nav-games');
  
  const gameGrid = document.getElementById('gameGrid');
  if (gameGrid) gameGrid.style.display = 'grid';
  
  renderLibraryGrid(_0xData);
}

function showFavoritesView() {
  clearAllViews();
  updateNavActiveState('nav-favorites');
  
  const favGrid = document.getElementById('favoritesGrid');
  if (favGrid) favGrid.style.display = 'grid';
  
  renderFavoritesGrid();
}

function handlePlaceholderView(navId, viewName) {
  clearAllViews();
  updateNavActiveState(navId);
  console.log(`${viewName} section is active on the same page structure.`);
}

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('autoLaunchStealth') === 'true') {
    localStorage.removeItem('autoLaunchStealth');
    setTimeout(() => {
      launchStealthWindow(localStorage.getItem('savedCloak') || 'Google Classroom', localStorage.getItem('autoLaunchEnv') || 'about:blank');
    }, 300);
    return;
  }

  showHomeView();

  const randomBtn = document.getElementById('randomBtn');
  if (randomBtn) {
    randomBtn.onclick = () => {
      const idx = Math.floor(Math.random() * _0xData.length);
      launchGame(_0xData[idx].id);
    };
  }

  // Cloak Timer Script logic
  const cloakElement = document.getElementById('educational-cloak');
  const cloakTimerText = document.getElementById('cloak-timer');
  const isSplashDisabled = localStorage.getItem('disableStudyCloak') === 'true';

  const toggleStudyCloakInput = document.getElementById('toggle-study-cloak');
  if (toggleStudyCloakInput) {
    toggleStudyCloakInput.checked = isSplashDisabled;
    toggleStudyCloakInput.onchange = (e) => {
      localStorage.setItem('disableStudyCloak', e.target.checked ? 'true' : 'false');
    };
  }

  if (isSplashDisabled) {
    if (cloakElement) cloakElement.style.display = 'none';
  } else {
    let secs = 10; 
    if (cloakTimerText) cloakTimerText.textContent = secs;
    const loop = setInterval(() => {
      secs--;
      if (cloakTimerText) cloakTimerText.textContent = secs;
      if (secs <= 0) {
        clearInterval(loop);
        if (cloakElement) {
          cloakElement.style.opacity = '0';
          setTimeout(() => cloakElement.style.display = 'none', 500);
        }
      }
    }, 1000);
  }

  const savedCloak = localStorage.getItem('savedCloak');
  if (savedCloak && savedCloak !== "none") {
    try { applyCloak(savedCloak); } catch(e) {}
  }

  // --- Dynamic Greeting & Authentic Sign-In Updates ---
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
        window.location.href = "Login/login.html";
      }
    };
  }

  // Bind Standard Menus
  if (document.getElementById('settingsBtn')) document.getElementById('settingsBtn').onclick = () => document.getElementById('settingsModal').style.display = 'flex';
  if (document.getElementById('closeSettings')) document.getElementById('closeSettings').onclick = () => document.getElementById('settingsModal').style.display = 'none';
  
  // Navigation Routing System Overrides
  if (document.getElementById('nav-home')) document.getElementById('nav-home').onclick = (e) => { e.preventDefault(); showHomeView(); };
  if (document.getElementById('nav-games')) document.getElementById('nav-games').onclick = (e) => { e.preventDefault(); showAllGamesView(); };
  if (document.getElementById('nav-favorites')) document.getElementById('nav-favorites').onclick = (e) => { e.preventDefault(); showFavoritesView(); };
  
  // Clean single-page dynamic links routing logic block
  if (document.getElementById('nav-unblockers')) document.getElementById('nav-unblockers').onclick = (e) => { e.preventDefault(); handlePlaceholderView('nav-unblockers', 'Unblockers'); };
  if (document.getElementById('nav-profile')) document.getElementById('nav-profile').onclick = (e) => { e.preventDefault(); handlePlaceholderView('nav-profile', 'Profile'); };
  if (document.getElementById('nav-terminal')) document.getElementById('nav-terminal').onclick = (e) => { e.preventDefault(); handlePlaceholderView('nav-terminal', 'Terminal'); };

  // --- Communications Shield Controller ---
  const commsNavBtn = document.getElementById('nav-communications');
  if (commsNavBtn) {
    commsNavBtn.onclick = (e) => {
      e.preventDefault();
      updateNavActiveState('nav-communications');
      if (localStorage.getItem('chatUser')) {
        window.location.href = "chat/chat.html";
      } else {
        window.location.href = "Login/login.html";
      }
    };
  }

  if (document.getElementById('stealthOpener')) {
    document.getElementById('stealthOpener').onclick = (e) => {
      e.preventDefault();
      launchStealthWindow(localStorage.getItem('savedCloak') || 'Google Classroom', localStorage.getItem('autoLaunchEnv') || 'about:blank');
    };
  }

  const cloakSelector = document.getElementById('cloakSelector');
  if (cloakSelector) {
    if (savedCloak) cloakSelector.value = savedCloak;
    cloakSelector.onchange = (e) => {
      if (e.target.value === "none") localStorage.removeItem('savedCloak');
      else localStorage.setItem('savedCloak', e.target.value);
      location.reload();
    };
  }

  const searchBar = document.getElementById('searchBar');
  if (searchBar) {
    searchBar.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      if (!term) { showHomeView(); return; }
      document.getElementById('heroSection').style.display = 'none';
      document.querySelector('.random-section').style.display = 'none';
      if (document.getElementById('favoritesGrid')) document.getElementById('favoritesGrid').style.display = 'none';
      if (document.getElementById('gameGrid')) document.getElementById('gameGrid').style.display = 'grid';
      const hits = _0xData.filter(g => g.title.toLowerCase().includes(term) || g.desc.toLowerCase().includes(term));
      renderLibraryGrid(hits);
    });
  }

  // Panic Button Key Triggers
  window.addEventListener('keydown', (e) => {
    if (e.key === localStorage.getItem('panicKey')) {
      window.location.href = localStorage.getItem('panicUrl') || "https://classroom.google.com";
    }
  });

  // --- RIGHT CLICK CONTROLLER LOGIC ---
  const contextMenu = document.getElementById('custom-context-menu');
  const deleteModal = document.getElementById('delete-modal-overlay');
  const ctxFavorite = document.getElementById('ctx-favorite');
  const ctxDelete = document.getElementById('ctx-delete');

  document.addEventListener('contextmenu', (e) => {
    const card = e.target.closest('.game-card');
    if (card) {
      e.preventDefault();
      contextTargetId = card.getAttribute('data-game-id');
      
      // Toggle string text dynamically
      if (favoriteGamesList.includes(contextTargetId)) {
        ctxFavorite.textContent = "Unfavorite Game";
      } else {
        ctxFavorite.textContent = "Favorite Game";
      }

      contextMenu.style.left = `${e.clientX}px`;
      contextMenu.style.top = `${e.clientY}px`;
      contextMenu.style.display = 'block';
    } else {
      contextMenu.style.display = 'none';
    }
  });

  document.addEventListener('click', () => { if (contextMenu) contextMenu.style.display = 'none'; });

  ctxFavorite.onclick = () => {
    if (!contextTargetId) return;
    if (favoriteGamesList.includes(contextTargetId)) {
      favoriteGamesList = favoriteGamesList.filter(id => id !== contextTargetId);
    } else {
      favoriteGamesList.push(contextTargetId);
    }
    localStorage.setItem('nullx_favorites_arr', JSON.stringify(favoriteGamesList));
    
    // Auto update live content lookups if currently browsing favorites tab
    if (document.getElementById('favoritesGrid').style.display === 'grid') {
      renderFavoritesGrid();
    }
  };

  ctxDelete.onclick = () => {
    if (contextTargetId) deleteModal.style.display = 'flex';
  };

  document.getElementById('confirm-delete-btn').onclick = () => {
    if (contextTargetId) {
      _0xData = _0xData.filter(g => g.id !== contextTargetId);
      favoriteGamesList = favoriteGamesList.filter(id => id !== contextTargetId);
      localStorage.setItem('nullx_favorites_arr', JSON.stringify(favoriteGamesList));
      
      const activeFavoritesTab = document.getElementById('favoritesGrid').style.display === 'grid';
      if (activeFavoritesTab) {
        renderFavoritesGrid();
      } else {
        renderLibraryGrid(_0xData);
      }
    }
    deleteModal.style.display = 'none';
    contextTargetId = null;
  };

  document.getElementById('cancel-delete-btn').onclick = () => {
    deleteModal.style.display = 'none';
    contextTargetId = null;
  };
});
