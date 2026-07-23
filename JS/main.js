if (window.top !== window.self) {
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

// ==========================================
// DYNAMIC CORE SYSTEMS & GAMES REGISTER DATA
// ==========================================
let _0xData = [
  { id: "b_ap", title: "Brotato All Pain No Gain", url: "../Games/brotatoAPNG/Brotato.html", image: "../Games/brotatoAPNG/images (23).jpeg", desc: "The newest version of Brotato with the All Pain No Gain update.", popular: true },
  { id: "y_io", title: "Yohoho.io", url: "../Games/yohoho/index.html", image: "../Games/yohoho/images (24).jpeg", desc: "A pirate battle royale game where you collect gold and fight opponents.", popular: true },
  { id: "b_er", title: "Bitcoin Clicker", url: "../Games/Bitcoin/Bitcoin.py", jsbin: "glaxyias.github.io/Bitcoin-clicker/", desc: "A Homemade Special.", popular: true },
  { id: "s_lp", title: "Slope", url: "../Games/slope/index.html", image: "../Games/slope/images (25).jpeg", desc: "A fast-paced 3D platformer. Stay on the track!", popular: true },
  { id: "d_md", title: "DriveMad", url: "../Games/drivemad/index.html", image: "../Games/drivemad/images (26).jpeg", desc: "Challenging physics-based driving. Don't flip your truck!", popular: true },
  { id: "b_ft", title: "Bullet Force", url: "../Games/bulletforce/index.html", image: "../Games/bulletforce/images (27).jpeg", desc: "Action-packed multiplayer FPS. Dominate the battlefield.", popular: true },
  { id: "b_bb", title: "Baseball Bros", url: "../Games/baseballbros/Baseballbros.html", image: "../Games/baseballbros/images (28).jpeg", desc: "An arcade baseball game with fast-paced matches.", popular: true },
  { id: "b_kt", title: "Basket Bros", url: "../Games/basketbros/Basketbros.html", image: "../Games/basketbros/images (29).jpeg", desc: "Chaotic basketball with crazy dunks and quick matches.", popular: true },
  { id: "b_sts", title: "Basketball Stars", url: "../Games/basketballstars/Basketballstars.html", image: "../Games/basketballstars/images (30).jpeg", desc: "Fast-paced 1v1 street-style basketball matches.", popular: true },
  { id: "c_cc", title: "Cookie Clicker", url: "../Games/cookieclicker/cookieclicker.html", jsbin: "https://codepen.io/Glaeesas/embed/EaZpPeO?default-tab=result&theme-id=dark", isEmbedCode: true, image: "../Games/cookieclicker/images (35).jpeg", desc: "Click cookies to build an industrial empire.", popular: true },
  { id: "b_rd", title: "Basket Random", url: "../Games/basketrandom/Basketrandom.html", desc: "Fun basketball game featuring completely random physics parameters.", popular: true },
  { id: "r_bw", title: "Retro Bowl", url: "../Games/retrobowl/Retrobowl.html", desc: "Manage your team and lead them to gridiron glory.", popular: true },
  { id: "a_us", title: "Among Us", url: "../Games/amongus/Amongus.html", desc: "Complete tasks while avoiding hidden impostors.", popular: true },
  { id: "d_dk", title: "Doki Doki Literature Club", url: "../Games/dokidoki/index.html", desc: "A deep psychological horror visual novel experience.", popular: true },
  { id: "p_tr", title: "PolyTrack", url: "../Games/polytrack/index.html", desc: "A fast-paced low-poly racing game with crisp drifting controls.", popular: true },
  { id: "a_gr", title: "Agar.io", url: "../Games/agar/index.html", desc: "Multiplayer cells-eating battle arena. (May experience latency issues)", popular: true },
  { id: "t_ts", title: "Truck Sim", url: "../Games/trucksim/index.html", desc: "Navigate tricky roads transporting heavy structural cargo safely.", popular: true },
  { id: "g_ta", title: "Grand Theft Auto", url: "../Games/GTA/index.html", desc: "Classic open-world sandbox environment full of sandbox operations.", popular: true },
  { id: "t_pa", title: "Throw a Potato", url: "../Games/TAPA/index.html", image: "../Games/TAPA/images (20).jpeg", desc: "Physics arcade game where you launch a potato over complex obstacles.", popular: true },
  { id: "t_p2", title: "Throw a Potato 2", url: "../Games/TAPA2/index.html", image: "../Games/TAPA2/images.png", desc: "The official sequel featuring refined launch engines and bigger stages.", popular: true },
  { id: "t_to", title: "Tung Tung Tung Sahur Obby", url: "../Games/T^3sahurobby/index.html", image: "../Games/T^3sahurobby/images (21).jpeg", desc: "Meme-inspired obstacle map built to test jumping accuracy.", popular: true },
  { id: "t_to", title: "Tung Baldi Basics", url: "../Games/tungbaldibasics/index.html", desc: "Horror puzzle game featuring surreal environments and puzzle challenges.", popular: true },
  { id: "w_dl", title: "Wordle", url: "../Games/wordle/index.html", desc: "Figure out the daily hidden five-letter word within six attempts.", popular: true },
  { id: "v_3x", title: "Vex 3 Xmas", url: "../Games/Vex/Vex3Xmas/index.html", desc: "Festive holiday edition of the classic stickman parkour challenge.", popular: true },
  { id: "v_4", title: "Vex 4", url: "../Games/Vex/Vex4/index.html", desc: "Sprint, leap, and dodge deadly stage traps dynamically.", popular: true },
  { id: "v_5", title: "Vex 5", url: "../Games/Vex/Vex5/index.html", desc: "Hardcore level obstacles matching elite timing requirements.", popular: true },
  { id: "v_6", title: "Vex 6", url: "../Games/Vex/Vex6/index.html", desc: "Refined stickman parkour tracks with brand new stage assets.", popular: true },
  { id: "v_7", title: "Vex 7", url: "../Games/Vex/Vex7/index.html", desc: "Complex levels engineered to test your reflexes.", popular: true },
  { id: "v_8", title: "Vex 8", url: "../Games/Vex/Vex8/index.html", desc: "The absolute latest installment in the Vex platforming franchise.", popular: true },
  { id: "v_ch", title: "Vex Challenges", url: "../Games/Vex/VexChallenges/index.html", desc: "Bite-sized high-speed speedrunning tasks for testing agility.", popular: true },
  { id: "v_x2", title: "Vex x3m 2", url: "../Games/Vex/Vexx3m2/index.html", desc: "Extreme driving mechanics combined with classic Vex obstacle formats.", popular: true },
  { id: "v_xm", title: "Vex x3m", url: "../Games/Vex/Vexx3m/index.html", desc: "Blast through motorcycle speed trials with tight balance adjustments.", popular: true },
  { id: "v_3", title: "Vex 3", url: "../Games/Vex/Vex3/index.html", image: "../Games/Vex/Vex3/images (22).jpeg", desc: "The iconic original entry into the parkour system.", popular: true },
  { id: "slice_master", title: "Slice Master", url: "../Games/slicemaster/index.html", desc: "Flip your blades accurately to chop items clean in half down the line.", popular: true },
  { id: "skinwalker", title: "Skinwalker", url: "../Games/skinwalker/index.html", desc: "Atmospheric survival horror centered around staying undetected outdoors.", popular: true },
  { id: "skib_shooter", title: "Skib Shooters", url: "../Games/skibshooter/index.html", desc: "Dynamic target arena where waves of attackers stream in continuously.", popular: true },
  { id: "ragdoll_drop", title: "Ragdoll Drop", url: "../Games/ragdrop/index.html", jsbin: "https://codepen.io/Glaeesas/embed/OPWZjEg?default-tab=result&theme-id=dark", isEmbedCode: true, desc: "Drop your structural targets down pins to clear high score records.", popular: true },
  { id: "g_spin", title: "Gun Spin", url: "../Games/gunspin/gunspin.html", desc: "Launch your firearm through the air and use recoil strategically to travel the greatest distance possible.", popular: true },
  { id: "gm_1", title: "Gun Mayhem", url: "../Games/GunMayhem/gunmayhem/gunmayhem.html", image: "../Games/GunMayhem/gunmayhem/images (9).jpeg", desc: "Fast-paced multiplayer arena shooter featuring powerful weapons, explosions, and chaotic battles.", popular: true },
  { id: "gm_2", title: "Gun Mayhem 2", url: "../Games/GunMayhem/gunmayhem2/gunmayhem2.html", image: "../Games/GunMayhem/gunmayhem2/images (10).jpeg", desc: "The sequel to Gun Mayhem with more weapons, maps, customization, and intense combat.", popular: true },
  { id: "gm_r", title: "Gun Mayhem Redux", url: "../Games/GunMayhem/gunmayhemredux/gunmayhemredux.html", image: "../Games/GunMayhem/gunmayhemredux/images (11).jpeg", desc: "A remastered Gun Mayhem experience with improved gameplay, expanded content, and smoother action.", popular: true },
  { id: "m_d", title: "Mutilate a Doll", url: "../Games/mutilateadoll/mutilateadoll.html", desc: "A sandbox ragdoll simulation game where you can experiment with physics, weapons, and chaos. (Will Cause Massive Lag)", popular: true },
  { id: "b_md", title: "Bacon May Die", url: "../Games/bakonmaydie/index.html", desc: "Fast-paced side-scrolling brawler where a fearless pig battles endless enemy waves using melee attacks and powerful weapons.", popular: true },
  { id: "a_df", title: "A Dance of Fire and Ice", url: "../Games/ADOFAI/ADOFAI.html", image: "../Games/ADOFAI/ADOFAI.jpeg", desc: "Rhythm-based precision game where you guide two orbiting planets through challenging musical tracks.", popular: true },
  { id: "a_sr", title: "Amazing Strange Rope Police", url: "../Games/ASRP/index.html", image: "../Games/ASRP/images (1).jpeg", desc: "Open-world action game where you use superhuman abilities, vehicles, and gadgets to fight crime across a massive city.", popular: true },
  { id: "a_oc", title: "Ages of Conflict", url: "../Games/AOC/index.html", desc: "Strategic world simulation where nations wage wars, form alliances, and reshape the map through dynamic conflicts.", popular: true },
  { id: "mx3", title: "Moto X3M", url: "../Games/MotoX3m/MotoX3m/index.html", image: "../Games/MotoX3m/MotoX3m/images (14).jpeg", desc: "Race through explosive obstacle courses packed with ramps, traps, and high-speed motorcycle stunts.", popular: true },
  { id: "mx3_2", title: "Moto X3M 2", url: "../Games/MotoX3m/MotoX3m2/index.html", image: "../Games/MotoX3m/MotoX3m2/images (15).jpeg", desc: "The sequel featuring tougher tracks, bigger jumps, and even more dangerous stunt challenges.", popular: true },
  { id: "mx3_3", title: "Moto X3M 3", url: "../Games/MotoX3m/MotoX3m3/index.html", image: "../Games/MotoX3m/MotoX3m3/images (16).jpeg", desc: "Take on intense new levels filled with hazards, precision jumps, and fast-paced motorcycle action.", popular: true },
  { id: "mx3_w", title: "Moto X3M Winter", url: "../Games/MotoX3m/MotoX3m Winter/index.html", image: "../Games/MotoX3m/MotoX3m Winter/images (17).jpeg", desc: "A festive winter-themed Moto X3M adventure featuring snowy tracks and holiday-inspired obstacles.", popular: true },
  { id: "mx3_s", title: "Moto X3M Spooky Land", url: "../Games/MotoX3m/MotoX3m Spooky Land/index.html", image: "../Games/MotoX3m/MotoX3m Spooky Land/images (18).jpeg", desc: "Halloween-themed motorcycle racing with haunted tracks, creepy decorations, and dangerous traps.", popular: true },
  { id: "mx3_p", title: "Moto X3M Pool Party", url: "../Games/MotoX3m/MotoX3m Pool Party/index.html", image: "../Games/MotoX3m/MotoX3m Pool Party/images (19).jpeg", desc: "Splash through water-filled stunt courses packed with slides, loops, and summer-themed challenges.", popular: true },
  { id: "dad", title: "Daddish", url: "../Games/daddish/index.html", desc: "Charming platformer where a radish dad embarks on a journey to rescue his missing children through challenging levels.", popular: true },
  { id: "eggy", title: "Eggy Car", url: "../Games/eggy/index.html", desc: "Drive carefully across hilly terrain while balancing a fragile egg on your vehicle without letting it fall.", popular: true },
  { id: "er_1", title: "Escape Road", url: "../Games/Escaperoad/Escape Road/index.html", image: "../Games/Escaperoad/Escape Road/images (5).jpeg", desc: "Outrun relentless pursuers in this high-speed driving game packed with sharp turns and daring escapes.", popular: true },
  { id: "er_2", title: "Escape Road 2", url: "../Games/Escaperoad/Escape Road 2/index.html", image: "../Games/Escaperoad/Escape Road 2/images (6).jpeg", desc: "The sequel expands the action with tougher chases, new vehicles, and more intense escape routes.", popular: true },
  { id: "er_3", title: "Escape Road 3", url: "../Games/Escaperoad/Escape Road 3/index.html", image: "../Games/Escaperoad/Escape Road 3/images (7).jpeg", desc: "Take on even greater challenges with faster pursuits, advanced obstacles, and nonstop driving action.", popular: true },
  { id: "erc_2", title: "Escape Road City 2", url: "../Games/Escaperoad/Escape Road City 2/index.html", image: "../Games/Escaperoad/Escape Road City 2/images (8).jpeg", desc: "Navigate a bustling city while evading capture through crowded streets, shortcuts, and dangerous intersections.", popular: true },
  { id: "imt", title: "Idle Miner Tycoon", url: "../Games/IMT/index.html", image: "../Games/IMT/images (13).jpeg", desc: "Build a mining empire from the ground up by managing resources, upgrading operations, and expanding your profits.", popular: true },
  { id: "ime_1", title: "Idle Mining Empire", url: "../Games/IME/index.html", jsbin: "https://codepen.io/Glaeesas/embed/bNgMxpg?default-tab=result&theme-id=dark", isEmbedCode: true, image: "../Games/IME/images (12).jpeg", desc: "Build your mining operation from the ground up, automate production, and expand your empire to earn massive profits even while idle.", popular: true },
  { id: "dbs", title: "Double Barrel Sniper", url: "../Games/DBS/index.html", image: "../Games/DBS/download.jpeg", desc: "Sharpen your aim in this precision sniper game featuring challenging missions, long-range shots, and tactical gameplay.", popular: true },
  { id: "dm_1", title: "Doge Miner", url: "../Games/Dogeminer1/index.html", image: "../Games/Dogeminer1/images (3).jpeg", desc: "Mine Dogecoins, hire Shiba workers, and upgrade your operation to reach the moon in this idle clicker game.", popular: true },
  { id: "dm_2", title: "Doge Miner 2", url: "../Games/Dogeminer2/index.html", image: "../Games/Dogeminer2/images (4).jpeg", desc: "The sequel expands the Dogecoin mining adventure with new upgrades, planets, and even more ways to grow your mining empire.", popular: true },
  { id: "babel_tower", title: "Babel Tower", url: "../Games/babeltower/index.html", desc: "Build the legendary tower of Babel by managing resources, hiring workers, and upgrading your production lines in this strategic idle game.", popular: true },
  { id: "baby_chicco", title: "Baby Chicco Adventure", url: "../Games/bcadventure/index.html", desc: "Guide a cute little penguin through a dangerous world filled with obstacles, enemies, and platforming challenges in this classic side-scrolling adventure.", popular: true },
  { id: "baby_sniper_vietnam", title: "Baby Sniper in Vietnam", url: "../Games/BSV/index.html", image: "../Games/BSV/images (2).jpeg", desc: "Take on critical missions, hone your long-range accuracy, and clear strategic targets under the cover of dense jungle terrain in this tactical sniping simulation.", popular: true },
  { id: "backrooms", title: "The Backrooms", url: "../Games/backrooms/index.html", desc: "Explore the eerie, endless yellow hallways of the Backrooms while trying to find an exit and avoid the terrifying entities lurking in the shadows.", popular: true },
  { id: "bad_bodyguard", title: "Bad Bodyguard", url: "../Games/badbodyguard/index.html", desc: "Navigate chaotic security situations, make split-second defensive decisions, and protect your high-profile clients from wild incoming hazards in this unpredictable simulation.", popular: true },
  { id: "car_crash_3", title: "Car Crash 3", url: "../Games/carcrash3/index.html", desc: "Test the limits of high-speed structural physics, unleash vehicle destruction across sandbox stunt arenas, and watch realistic damage dynamics play out in this high-impact driving simulator.", popular: true },
  { id: "stick_merge", title: "Stick Merge", url: "../Games/stickmerge/index.html", image: "../Games/stickmerge/images (31).jpeg", desc: "Merge various weapons together to create more powerful firearms and eliminate targets.", popular: true },
  { id: "strike_force_kitty", title: "Strike Force Kitty", url: "../Games/strikeforcekitty/index.html", image: "../Games/strikeforcekitty/images (32).jpeg", desc: "Lead a squad of adorable kittens to rescue the princess, defeating enemies and collecting outfits along the way.", popular: true },
  { id: "superhot", title: "SUPERHOT", url: "../Games/superhot/index.html", image: "../Games/superhot/images (33).jpeg", desc: "An innovative first-person shooter where time moves only when you move.", popular: true },
  { id: "arena_king", title: "Arena King", url: "../Games/arenaking/index.html", image: "../Games/arenaking/images (34).jpeg", desc: "Battle opponents in the arena, collect gold, and grow your crown to become the ultimate king.", popular: true },
  { id: "a_dark_room", title: "A Dark Room", url: "../Games/adarkroom/index.html", jsbin: "https://codepen.io/Glaeesas/embed/019f90ef-3bea-753d-be5c-54659e699c0a?default-tab=result&theme-id=dark", isEmbedCode: true, image: "../Games/adarkroom/images (36).jpeg", desc: "An atmospheric, text-based survival adventure that starts with a cold room and a single spark.", popular: true }
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

// ========================================================
// CORE GAME LAUNCH ENGINE WITH STABILIZED CONTROLS
// ========================================================
function launchGame(gameId) {
  const game = _0xData.find(g => g.id === gameId);
  if (game) {
    const rootUrl = "https://glaxyias.github.io/";
    const gameTab = window.open('about:blank', '_blank');
    
    if (gameTab) {
      gameTab.document.title = "Google Docs";
      gameTab.document.open();

      if (game.isEmbedCode) {
        // Enforcing sandbox security parameters to prevent escapes/top window redirect hijacking
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
                padding: 8px 14px; font-weight: bold; border-radius: 6px;
                cursor: pointer; box-shadow: 0 0 10px rgba(139,0,255,0.5);
                font-family: sans-serif; text-decoration: none; display: inline-block;
              }
            </style>
          </head>
          <body>
            <a href="https://glaxyias.github.io/" class="back-btn">← Back To Home</a>
            <iframe src="${game.jsbin}" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
          </body>
          </html>
        `);
      } else {
        const gameFullUrl = rootUrl + game.url.replace(/^\.\.\//, "");
        gameTab.document.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>${game.title}</title>
            <style>
              body, html { margin:0; padding:0; width:100%; height:100%; overflow:hidden; background:#000; }
              iframe { width:100%; height:100%; border:none; display:block; }
              .back-btn {
                position: fixed; top: 15px; left: 15px; z-index: 99999999;
                background: #0a0a0a; color: #8b00ff; border: 2px solid #8b00ff;
                padding: 8px 14px; font-weight: bold; border-radius: 6px;
                cursor: pointer; box-shadow: 0 0 10px rgba(139,0,255,0.5);
                font-family: sans-serif; text-decoration: none; display: inline-block;
              }
            </style>
          </head>
          <body>
            <a href="https://glaxyias.github.io/" class="back-btn">← Back To Home</a>
            <iframe src="${gameFullUrl}" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
          </body>
          </html>
        `);
      }
      
      gameTab.document.close();

      // Executing parent page closure immediately after streaming DOM layout to prevent sandbox context blocks
      window.close();
      
    } else {
      alert("Pop-up blocked! Please allow popup permissions to play games.");
      return;
    }
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

  customSectionContainer.style.display = 'block';
  customSectionContainer.innerHTML = `<p style="color: #8b00ff; padding: 20px; font-family: sans-serif; font-style: italic; animation: pulse 1.5s infinite;">Mounting filesystem directory node...</p>`;

  try {
    const targetFolder = viewLower === 'terminal' ? 'Terminal' : viewLower;
    const fetchPath = `../${targetFolder}/${viewLower}.html`;

    const response = await fetch(fetchPath);
    if (!response.ok) throw new Error(`Status error ${response.status}`);

    const dynamicCodeContent = await response.text();
    customSectionContainer.innerHTML = dynamicCodeContent;

    attachChatEventListeners();
    
    // Execute the profile script dynamically if the profile view is loaded
    if (viewLower === 'profile') {
      // Remove the old script if it exists so we get a fresh load
      const existingScript = document.getElementById('profile-dynamic-script');
      if (existingScript) existingScript.remove();
      
      // Inject and execute the script
      const script = document.createElement('script');
      script.id = 'profile-dynamic-script';
      script.type = 'module';
      // The timestamp trick forces the browser to run it every time instead of using a cached version
      script.src = `../profile/profile.js?v=${Date.now()}`; 
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

document.addEventListener('DOMContentLoaded', () => {
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
              const savedPanicKey = localStorage.getItem('panicKey') || '';
              shortcutInput.value = savedPanicKey ? `Key: ${savedPanicKey.toUpperCase()}` : '';
              panicLinkInput.value = localStorage.getItem('panicUrl') || '';

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
      document.getElementById('heroSection').style.display = 'none';
      document.querySelector('.random-section').style.display = 'none';
      if (document.getElementById('favoritesGrid')) document.getElementById('favoritesGrid').style.display = 'none';
      if (document.getElementById('gameGrid')) document.getElementById('gameGrid').style.display = 'grid';
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
});

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
    }
    .game-card-img {
      width: 100%;
      height: 140px;
      object-fit: cover;
      border-radius: 8px 8px 0 0;
      margin-bottom: 8px;
    }
    .game-card-img-placeholder {
      width: 100%;
      height: 140px;
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
