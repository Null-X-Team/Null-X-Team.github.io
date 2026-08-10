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
  {id: "adofai", title: "ADOFAI", url: "../Games/ADOFAI/ADOFAI.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/ADOFAI/ADOFAI.jpeg" },
  {id: "aoc", title: "AOC", url: "../Games/AOC/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/AOC/images.jpeg" },
  {id: "asrp", title: "ASRP", url: "../Games/ASRP/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/ASRP/images (1).jpeg" },
  {id: "autoupdatefiletest", title: "Autoupdatefiletest", url: "../Games/Autoupdatefiletest/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/Autoupdatefiletest/images (9).jpeg" },
  {id: "bsv", title: "BSV", url: "../Games/BSV/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/BSV/images (2).jpeg" },
  {id: "bitcoin", title: "Bitcoin", url: "../Games/Bitcoin/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/Bitcoin/images (4).jpeg" },
  {id: "dbs", title: "DBS", url: "../Games/DBS/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/DBS/download.jpeg" },
  {id: "dogeminer1", title: "Dogeminer1", url: "../Games/Dogeminer1/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/Dogeminer1/images (3).jpeg" },
  {id: "dogeminer2", title: "Dogeminer2", url: "../Games/Dogeminer2/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/Dogeminer2/images (4).jpeg" },
  {id: "escaperoad", title: "Escaperoad", url: "../Games/Escaperoad/Escape Road/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/Escaperoad/Escape Road/images (5).jpeg" },
  {id: "gamesavedata", title: "GameSaveData", url: "../Games/GameSaveData/GSD.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "gunmayhem", title: "GunMayhem", url: "../Games/GunMayhem/gunmayhem2/gunmayhem2.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/GunMayhem/gunmayhem2/images (10).jpeg" },
  {id: "ime", title: "IME", url: "../Games/IME/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/IME/images (12).jpeg" },
  {id: "imt", title: "IMT", url: "../Games/IMT/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/IMT/images (13).jpeg" },
  {id: "jebieak", title: "JEBIEAK", url: "../Games/JEBIEAK/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "motox3m", title: "MotoX3m", url: "../Games/MotoX3m/MotoX3m Pool Party/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/MotoX3m/MotoX3m Pool Party/images (19).jpeg" },
  {id: "sortthecourt", title: "Sortthecourt", url: "../Games/Sortthecourt/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/Sortthecourt/index.apple-touch-icon.png" },
  {id: "tapa", title: "TAPA", url: "../Games/TAPA/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/TAPA/images (20).jpeg" },
  {id: "tapa2", title: "TAPA2", url: "../Games/TAPA2/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/TAPA2/images.png" },
  {id: "t_3sahurobby", title: "T^3sahurobby", url: "../Games/T^3sahurobby/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/T^3sahurobby/images (21).jpeg" },
  {id: "vex", title: "Vex", url: "../Games/Vex/Vexx3m2/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/Vex/Vex3/images (22).jpeg" },
  {id: "adarkroom", title: "adarkroom", url: "../Games/adarkroom/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/adarkroom/images (36).jpeg" },
  {id: "adatewithdeath", title: "adatewithdeath", url: "../Games/adatewithdeath/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/adatewithdeath/images.jpeg" },
  {id: "adventneon", title: "adventneon", url: "../Games/adventneon/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/adventneon/images (2).jpeg" },
  {id: "adventure_capitalist", title: "adventure capitalist", url: "../Games/adventure capitalist/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/adventure capitalist/images (3).jpeg" },
  {id: "agar", title: "agar", url: "../Games/agar/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "ahoysurvival", title: "ahoysurvival", url: "../Games/ahoysurvival/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/ahoysurvival/images (8).jpeg" },
  {id: "airline", title: "airline", url: "../Games/airline/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/airline/images (4).png" },
  {id: "amongus", title: "amongus", url: "../Games/amongus/Amongus.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/amongus/images (7).jpeg" },
  {id: "arenaking", title: "arenaking", url: "../Games/arenaking/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/arenaking/images (34).jpeg" },
  {id: "babeltower", title: "babeltower", url: "../Games/babeltower/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "backrooms", title: "backrooms", url: "../Games/backrooms/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "badbodyguard", title: "badbodyguard", url: "../Games/badbodyguard/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "bakonmaydie", title: "bakonmaydie", url: "../Games/bakonmaydie/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "baldisbasics", title: "baldisbasics", url: "../Games/baldisbasics/Baldisbasics.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "baseballbros", title: "baseballbros", url: "../Games/baseballbros/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/baseballbros/favicon.png" },
  {id: "basketballstars", title: "basketballstars", url: "../Games/basketballstars/Basketballstars.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/basketballstars/images (30).jpeg" },
  {id: "basketbros", title: "basketbros", url: "../Games/basketbros/Basketbros.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/basketbros/images (29).jpeg" },
  {id: "basketrandom", title: "basketrandom", url: "../Games/basketrandom/Basketrandom.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/basketrandom/images (5).jpeg" },
  {id: "bcadventure", title: "bcadventure", url: "../Games/bcadventure/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "bitplanes", title: "bitplanes", url: "../Games/bitplanes/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "brotatoapng", title: "brotatoAPNG", url: "../Games/brotatoAPNG/Brotato.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/brotatoAPNG/images (23).jpeg" },
  {id: "bulletforce", title: "bulletforce", url: "../Games/bulletforce/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/bulletforce/images (27).jpeg" },
  {id: "carcrash3", title: "carcrash3", url: "../Games/carcrash3/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "cookieclicker", title: "cookieclicker", url: "../Games/cookieclicker/cookieclicker.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/cookieclicker/images (35).jpeg" },
  {id: "daddish", title: "daddish", url: "../Games/daddish/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "dayintheoffice", title: "dayintheoffice", url: "../Games/dayintheoffice/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/dayintheoffice/images (1).jpeg" },
  {id: "dokidoki", title: "dokidoki", url: "../Games/dokidoki/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "drivemad", title: "drivemad", url: "../Games/drivemad/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/drivemad/images (26).jpeg" },
  {id: "eaglercraft", title: "eaglercraft", url: "../Games/eaglercraft/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "eggy", title: "eggy", url: "../Games/eggy/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "gunspin", title: "gunspin", url: "../Games/gunspin/gunspin.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "mutilateadoll", title: "mutilateadoll", url: "../Games/mutilateadoll/mutilateadoll.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "pokemon_emerald", title: "pokemon-emerald", url: "../Games/pokemon-emerald/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/pokemon-emerald/thumbnail.webp" },
  {id: "polytrack", title: "polytrack", url: "../Games/polytrack/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "ragdrop", title: "ragdrop", url: "../Games/ragdrop/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "retrobowl", title: "retrobowl", url: "../Games/retrobowl/Retrobowl.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/retrobowl/images (6).jpeg" },
  {id: "rocket", title: "rocket", url: "../Games/rocket/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "skibshooter", title: "skibshooter", url: "../Games/skibshooter/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "skinwalker", title: "skinwalker", url: "../Games/skinwalker/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "slicemaster", title: "slicemaster", url: "../Games/slicemaster/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "slope", title: "slope", url: "../Games/slope/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/slope/images (25).jpeg" },
  {id: "stickmerge", title: "stickmerge", url: "../Games/stickmerge/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/stickmerge/images (31).jpeg" },
  {id: "strikeforcekitty", title: "strikeforcekitty", url: "../Games/strikeforcekitty/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/strikeforcekitty/images (32).jpeg" },
  {id: "superhot", title: "superhot", url: "../Games/superhot/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/superhot/images (33).jpeg" },
  {id: "trucksim", title: "trucksim", url: "../Games/trucksim/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "tungbaldibasics", title: "tungbaldibasics", url: "../Games/tungbaldibasics/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "wordle", title: "wordle", url: "../Games/wordle/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true },
  {id: "yohoho", title: "yohoho", url: "../Games/yohoho/index.html", desc: "Coming soon. Edit this description in main.js.", popular: true, image: "../Games/yohoho/images (24).jpeg" },
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

      // More reliable original-tab close (browsers block the single-trick version inconsistently)
      // Try several methods that work across Chrome/Firefox/Edge under different policies
      function attemptCloseOriginalTab() {
        try {
          // Method 1: classic self-open + close (most common success case)
          const selfWin = window.open(window.location.href, '_self');
          if (selfWin) selfWin.close();
        } catch (e) {}

        try {
          // Method 2: direct close
          window.close();
        } catch (e) {}

        try {
          // Method 3: top-level close (helps when framed)
          if (window.top && window.top !== window) {
            window.top.close();
          }
        } catch (e) {}

        try {
          // Method 4: open blank then close (some Chromium builds allow this)
          window.open('', '_self');
          window.close();
        } catch (e) {}
      }

      // Run close attempts immediately and once more after a short delay
      attemptCloseOriginalTab();
      setTimeout(attemptCloseOriginalTab, 30);

      // Ultimate fallback: if the tab is still open, hide the site by redirecting
      // (gives the close attempts time to succeed before falling back)
      setTimeout(() => {
        try {
          // If we are still here, close failed — redirect away so the site is gone
          window.location.replace("https://www.google.com");
        } catch (e) {
          // last-ditch
          window.location.href = "https://www.google.com";
        }
      }, 120);

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
      /* Changed to 'contain' so the whole image fits without getting cropped */
      object-fit: contain; 
      /* Added a dark background to fill any empty space around the image */
      background-color: #0d0d13; 
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
