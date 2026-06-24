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
  { id: "b_md", title: "Bacon May Die", url: "Games/bakonmaydie/index.html", desc: "Fast-paced side-scrolling brawler where a fearless pig battles endless enemy waves using melee attacks and powerful weapons.", popular: true },
  { id: "a_df", title: "A Dance of Fire and Ice", url: "Games/ADOFAI/index.html", desc: "Rhythm-based precision game where you guide two orbiting planets through challenging musical tracks.", popular: true },
  { id: "a_sr", title: "Amazing Strange Rope Police", url: "Games/ASRP/index.html", desc: "Open-world action game where you use superhuman abilities, vehicles, and gadgets to fight crime across a massive city.", popular: true },
  { id: "a_oc", title: "Ages of Conflict", url: "Games/AOC/index.html", desc: "Strategic world simulation where nations wage wars, form alliances, and reshape the map through dynamic conflicts.", popular: true },
  { id: "mx3", title: "Moto X3M", url: "Games/MotoX3m/MotoX3m/index.html", desc: "Race through explosive obstacle courses packed with ramps, traps, and high-speed motorcycle stunts.", popular: true },
  { id: "mx3_2", title: "Moto X3M 2", url: "Games/MotoX3m/MotoX3m2/index.html", desc: "The sequel featuring tougher tracks, bigger jumps, and even more dangerous stunt challenges.", popular: true },
  { id: "mx3_3", title: "Moto X3M 3", url: "Games/MotoX3m/MotoX3m3/index.html", desc: "Take on intense new levels filled with hazards, precision jumps, and fast-paced motorcycle action.", popular: true },
  { id: "mx3_w", title: "Moto X3M Winter", url: "Games/MotoX3m/MotoX3m Winter/index.html", desc: "A festive winter-themed Moto X3M adventure featuring snowy tracks and holiday-inspired obstacles.", popular: true },
  { id: "mx3_s", title: "Moto X3M Spooky Land", url: "Games/MotoX3m/MotoX3m Spooky Land/index.html", desc: "Halloween-themed motorcycle racing with haunted tracks, creepy decorations, and dangerous traps.", popular: true },
  { id: "mx3_p", title: "Moto X3M Pool Party", url: "Games/MotoX3m/MotoX3m Pool Party/index.html", desc: "Splash through water-filled stunt courses packed with slides, loops, and summer-themed challenges.", popular: true },
  { id: "dad", title: "Daddish", url: "Games/daddish/index.html", desc: "Charming platformer where a radish dad embarks on a journey to rescue his missing children through challenging levels.", popular: true },
];

// Context Management variables
let favoriteGamesList = JSON.parse(localStorage.getItem('nullx_favorites_arr')) || [];
let contextTargetId = null;

function launchStealthWindow(maskType, targetEnv) {
  const currentUrl = window.location.href;
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
    'Schoology': { t: "Schoology - Learning Management System", r: "https://www.schoology.com/" },
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
    'Tynker': { t: "Tynker - Coding for Kids", r: "https://www.tynker.com/" },
    'Outschool': { t: "Outschool - Online Classes", r: "https://outschool.com/" },
    'XtraMath': { t: "XtraMath - Math Fact Practice", r: "https://xtramath.org/" },
    'Raz-Kids': { t: "Raz-Kids - Online Reading", r: "https://www.raz-kids.com/" },
    'Epic!': { t: "Epic! - Digital Library", r: "https://www.getepic.com/" },
    'DreamBox': { t: "DreamBox Learning", r: "https://www.dreambox.com/" },
    'ST Math': { t: "ST Math - Visual Math Program", r: "https://www.stmath.com/" },
    'Zearn': { t: "Zearn Math", r: "https://www.zearn.org/" },
    'Newsela': { t: "Newsela - Differentiated Reading", r: "https://newsela.com/" },
    'CommonLit': { t: "CommonLit - Free Reading Program", r: "https://www.commonlit.org/" },
    'ReadWorks': { t: "ReadWorks - Reading Comprehension", r: "https://www.readworks.org/" },
    'Achieve the Core': { t: "Achieve the Core", r: "https://achievethecore.org/" },
    'Illustrative Mathematics': { t: "Illustrative Mathematics", r: "https://illustrativemathematics.org/" },
    'PhET Simulations': { t: "PhET Interactive Simulations", r: "https://phet.colorado.edu/" },
    'GeoGebra': { t: "GeoGebra - Math & Science Tools", r: "https://www.geogebra.org/" },
    'Wolfram MathWorld': { t: "Wolfram MathWorld", r: "https://mathworld.wolfram.com/" },
    'SparkNotes': { t: "SparkNotes - Study Guides", r: "https://www.sparknotes.com/" },
    'CliffsNotes': { t: "CliffsNotes - Study Guides", r: "https://www.cliffsnotes.com/" },
    'Bartleby': { t: "Bartleby - Homework Help", r: "https://www.bartleby.com/" }
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
    if (emptyMsg) emptyMsg.style.display = 'block';
  } else {
    if (emptyMsg) emptyMsg.style.display = 'none';
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
  const viewElements = [
    document.getElementById('heroSection'),
    document.querySelector('.random-section'),
    document.getElementById('gameGrid'),
    document.getElementById('favoritesGrid'),
    document.getElementById('unblockersSection'),
    document.getElementById('profileSection'),
    document.getElementById('terminalSection')
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
  
  if (heroSection) heroSection.style.display = 'flex';
  if (randomSection) randomSection.style.display = 'block';
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
  
  if (favGrid) favGrid.style.setProperty('display', 'none', 'important');
  if (gameGrid) {
    gameGrid.style.display = 'grid';
    renderLibraryGrid(_0xData);
  }
}

function showFavoritesView() {
  clearAllViews();
  updateNavActiveState('nav-favorites');
  
  const gameGrid = document.getElementById('gameGrid');
  const favGrid = document.getElementById('favoritesGrid');
  
  if (gameGrid) gameGrid.style.setProperty('display', 'none', 'important');
  if (favGrid) {
    favGrid.style.display = 'grid';
    renderFavoritesGrid();
  }
}

// Rewritten asynchronous content parser engine
async function handlePlaceholderView(navId, viewName) {
  clearAllViews();
  updateNavActiveState(navId);
  
  const viewLower = viewName.toLowerCase();
  const targetSectionId = `${viewLower}Section`;
  let customSectionContainer = document.getElementById(targetSectionId);
  
  // Create container section on the fly if index.html is missing it
  if (!customSectionContainer) {
    customSectionContainer = document.createElement('div');
    customSectionContainer.id = targetSectionId;
    customSectionContainer.className = 'custom-view-panel';
    
    // Attempt alignment target injection inside the central visual area wrapper
    const mainSectionNode = document.querySelector('.main-content .section') || document.querySelector('.main-content');
    if (mainSectionNode) {
      mainSectionNode.appendChild(customSectionContainer);
    }
  }
  
  customSectionContainer.style.display = 'block';
  customSectionContainer.innerHTML = `<p style="color: #8b00ff; padding: 20px; font-family: sans-serif; font-style: italic; animation: pulse 1.5s infinite;">Mounting filesystem directory node...</p>`;
  
  try {
    // Dynamic matching: checks your exact root tree path logic (e.g. Terminal folder vs terminal.html)
    const targetFolder = viewLower === 'terminal' ? 'Terminal' : viewLower;
    const fetchPath = `${targetFolder}/${viewLower}.html`;
    
    const response = await fetch(fetchPath);
    if (!response.ok) throw new Error(`Status error ${response.status}`);
    
    const dynamicCodeContent = await response.text();
    customSectionContainer.innerHTML = dynamicCodeContent;
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

  if (document.getElementById('settingsBtn')) document.getElementById('settingsBtn').onclick = () => document.getElementById('settingsModal').style.display = 'flex';
  if (document.getElementById('closeSettings')) document.getElementById('closeSettings').onclick = () => document.getElementById('settingsModal').style.display = 'none';
  
  if (document.getElementById('nav-home')) document.getElementById('nav-home').onclick = (e) => { e.preventDefault(); showHomeView(); };
  if (document.getElementById('nav-games')) document.getElementById('nav-games').onclick = (e) => { e.preventDefault(); showAllGamesView(); };
  if (document.getElementById('nav-favorites')) document.getElementById('nav-favorites').onclick = (e) => { e.preventDefault(); showFavoritesView(); };
  
  if (document.getElementById('nav-unblockers')) document.getElementById('nav-unblockers').onclick = (e) => { e.preventDefault(); handlePlaceholderView('nav-unblockers', 'Unblockers'); };
  if (document.getElementById('nav-profile')) document.getElementById('nav-profile').onclick = (e) => { e.preventDefault(); handlePlaceholderView('nav-profile', 'Profile'); };
  if (document.getElementById('nav-terminal')) document.getElementById('nav-terminal').onclick = (e) => { e.preventDefault(); handlePlaceholderView('nav-terminal', 'Terminal'); };

 const commsNavBtn = document.getElementById('nav-communications');
  if (commsNavBtn) {
    commsNavBtn.onclick = (e) => {
      e.preventDefault();
      updateNavActiveState('nav-communications');
      
      // Keep your login guard intact
      if (localStorage.getItem('chatUser')) {
        // This takes you directly to the full standalone chat page
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

  window.addEventListener('keydown', (e) => {
    if (e.key === localStorage.getItem('panicKey')) {
      window.location.href = localStorage.getItem('panicUrl') || "https://classroom.google.com";
    }
  });

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
});
