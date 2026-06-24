// --- CONFIGURATION CORRECTION ---
const SUPABASE_URL = 'https://ldojzaikkolrxkiwyqvq.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkb2p6YWlra29scnhraXd5cXZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMDM2NjksImV4cCI6MjA5NDg3OTY2OX0.CXZf1jaNJ3njQhIWoaYFxuJWx2J0HQ9CPF5imQoxtMw'; 

const ADMIN_NAME = "glaeesas";
const DEFAULT_PFP = "https://Glaxyias.github.io/imgs/download.jpeg";
let allUsers = [];
let lastMessageTime = 0;
let chatPollingInterval = null; // Reference to prevent runaway background loops

// Global initialization hook exposed directly to main.js router
window.initializeChatEngine = async function() {
    const user = localStorage.getItem('chatUser');
    
    if (!user) {
        window.location.href = "../Login/login.html";
        return;
    }

    // Clear any pre-existing loops before establishing a fresh tracking session
    if (chatPollingInterval) clearInterval(chatPollingInterval);

    try {
        const verifyRes = await fetch(`${SUPABASE_URL}/rest/v1/users?username=eq.${encodeURIComponent(user)}&select=username`, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        const verifyData = await verifyRes.json();

        if (!verifyData || verifyData.length === 0) {
            localStorage.removeItem('chatUser');
            localStorage.clear();
            window.location.href = "../Login/login.html";
            return;
        }
    } catch (authError) {
        console.error("Security handshake failed:", authError);
    }

    try {
        const banRes = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?username=eq.${encodeURIComponent(user)}&select=is_banned,temp_ban_until,pfp_url`, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        const banData = await banRes.json();
        
        if (banData && banData[0]) {
            const profile = banData[0];
            if (profile.is_banned === true) {
                alert("This account has been permanently banned from the server.");
                localStorage.removeItem('chatUser');
                window.location.href = "../Login/login.html";
                return;
            }
            if (profile.temp_ban_until) {
                const expiryTime = new Date(profile.temp_ban_until).getTime();
                if (expiryTime > Date.now()) {
                    alert(`You are temporarily banned until: ${new Date(profile.temp_ban_until).toLocaleString()}`);
                    localStorage.removeItem('chatUser');
                    window.location.href = "../Login/login.html";
                    return;
                }
            }
            
            const systemFooterAvatar = document.getElementById('current-user-avatar');
            if (systemFooterAvatar) {
                systemFooterAvatar.src = profile.pfp_url || DEFAULT_PFP;
            }
        }
    } catch (banCheckErr) {
        console.error("Ban check failed:", banCheckErr);
    }

    const lowerUser = user.toLowerCase();
    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay) usernameDisplay.textContent = user;
    
    if (lowerUser === ADMIN_NAME.toLowerCase()) {
        const adminTab = document.getElementById('admin-tab');
        if (adminTab) adminTab.style.display = 'block';
    }

    const msgContainer = document.getElementById('chat-messages');

    // --- TAB NAVIGATION ---
    window.switchTab = (target) => {
        ['chat-view', 'rules-view', 'admin-panel-view', 'users-view'].forEach(v => {
            const el = document.getElementById(v);
            if (el) el.style.display = 'none';
        });
        
        document.querySelectorAll('.channel').forEach(c => c.classList.remove('active'));
        
        if (target === 'general' || target === 'dev-logs') {
            const chatView = document.getElementById('chat-view');
            if (chatView) chatView.style.display = 'flex';
            const tabId = target === 'general' ? 'chan-general' : 'chan-dev';
            const tabEl = document.getElementById(tabId);
            if (tabEl) tabEl.classList.add('active');
        } 
        else if (target === 'admin') {
            const adminView = document.getElementById('admin-panel-view');
            if (adminView) adminView.style.display = 'block';
            const adminTab = document.getElementById('admin-tab');
            if (adminTab) adminTab.classList.add('active');
            fetchAllUsers();
        } 
        else {
            const viewId = target + '-view';
            const v = document.getElementById(viewId);
            if (v) v.style.display = 'block';
            
            const tabId = 'chan-' + target;
            const t = document.getElementById(tabId);
            if (t) t.classList.add('active');
            
            if (target === 'users') fetchAllUsers();
        }
    };

    // --- USER DIRECTORY ---
    async function fetchAllUsers() {
        try {
            const rolesRes = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?select=*`, {
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
            });
            const rolesData = await rolesRes.json();
            const msgsRes = await fetch(`${SUPABASE_URL}/rest/v1/messages?select=username`, {
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
            });
            const msgsData = await msgsRes.json();

            const combinedNames = [...rolesData.map(u => u.username), ...msgsData.map(u => u.username)];
            const uniqueNames = [...new Set(combinedNames)].filter(name => name != null);
            
            allUsers = uniqueNames.map(name => {
                const foundProfile = rolesData.find(r => r.username === name);
                return {
                    username: name,
                    pfp_url: foundProfile ? foundProfile.pfp_url : DEFAULT_PFP,
                    role_tag: foundProfile ? foundProfile.role_tag : 'User'
                };
            });
            
            renderUserDirectory();
        } catch (err) { console.error(err); }
    }

    function renderUserDirectory(filterTerm = "") {
        const listContainer = document.getElementById('user-list-display');
        if (!listContainer) return;
        const filtered = allUsers.filter(u => u.username.toLowerCase().includes(filterTerm.toLowerCase()));
        listContainer.innerHTML = filtered.map(u => `
            <div class="admin-card" style="text-align:center;">
                <a href="../profile/profile.html?user=${encodeURIComponent(u.username)}">
                    <img class="avatar" src="${u.pfp_url || DEFAULT_PFP}" style="margin: 0 auto 10px; width:50px; height:50px; display:block; object-fit:cover; border-radius:50%;">
                </a>
                <a href="../profile/profile.html?user=${encodeURIComponent(u.username)}" style="color:white; text-decoration:none; font-weight:bold;">
                    ${u.username}
                </a>
                <div style="font-size:11px; color:#a0928d; margin-top:5px; text-transform:uppercase;">[${u.role_tag}]</div>
            </div>
        `).join('');
    }

    // --- MESSAGE ENGINE ---
    async function fetchMessages() {
        if (!document.getElementById('chat-messages')) {
            clearInterval(chatPollingInterval);
            return;
        }
        try {
            const mRes = await fetch(`${SUPABASE_URL}/rest/v1/messages?select=*&order=created_at.asc`, { 
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
            });
            const rRes = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?select=*`, { 
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
            });
            const messages = await mRes.json();
            const roles = await rRes.json();

            // Check if user is scrolled near the bottom before shifting content layouts
            // We give it a 100px threshold window padding zone
            const isAtBottom = msgContainer.scrollHeight - msgContainer.scrollTop <= msgContainer.clientHeight + 100;

            msgContainer.innerHTML = '';
            messages.forEach(msg => {
                const isDel = msg.content === "Message Was Deleted By Owner";
                const role = roles && roles.find ? roles.find(r => r.username === msg.username) : null;
                const time = new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                const userPfp = role && role.pfp_url ? role.pfp_url : DEFAULT_PFP;
                const evaluatedRole = role && role.role_tag ? role.role_tag : 'User';
                
                let tag = "";
                if (msg.username.toLowerCase() === ADMIN_NAME.toLowerCase() || evaluatedRole.toLowerCase() === 'admin') {
                    tag = `<span class="badge admin-badge">ADMIN</span>`;
                } else if (evaluatedRole && evaluatedRole.toLowerCase() !== 'user') {
                    tag = `<span class="badge custom-badge">[${evaluatedRole.toUpperCase()}]</span>`;
                }

                const div = document.createElement('div');
                div.className = `message-wrapper ${msg.username === user ? 'my-message-wrapper' : 'other-message-wrapper'}`;
                
                div.innerHTML = `
                    <a href="../profile/profile.html?user=${encodeURIComponent(msg.username)}">
                        <img src="${userPfp}" class="chat-pfp" alt="Avatar">
                    </a>
                    <div class="message-content-node">
                        <div class="message-meta-header">
                            <a href="../profile/profile.html?user=${encodeURIComponent(msg.username)}" class="chat-username-link">
                                <strong>${msg.username}</strong>
                            </a>
                            ${tag}
                            <span class="message-timestamp">${time}</span>
                        </div>
                        <div class="message-text-bubble ${msg.username === user ? 'my-bubble-color' : 'other-bubble-color'}" style="${isDel ? 'font-style:italic; opacity:0.5;' : ''}">
                            ${msg.content}
                        </div>
                         ${(lowerUser === ADMIN_NAME && !isDel) ? `<button style="background:none; color:red; font-size:10px; padding:0; margin-top:5px; cursor:pointer; width:auto; display:block;" onclick="deleteMsg('${msg.id}')">Delete</button>` : ""}
                    </div>
                `;
                msgContainer.appendChild(div);
            });

            // Only snap down if they were already viewing the baseline layout window layer
            if (isAtBottom) {
                msgContainer.scrollTop = msgContainer.scrollHeight;
            }
        } catch (e) { console.error(e); }
    }

    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
        chatForm.onsubmit = async (e) => {
            e.preventDefault();
            const now = Date.now();
            const input = document.getElementById('message-input');
            if (now - lastMessageTime < 2000 && lowerUser !== ADMIN_NAME) return alert("Please wait between messages.");
            
            const val = input.value.trim();
            if (!val) return;
            
            // Client-Side 250 Character Limit Filter Check
            if (val.length > 250) {
                alert(`Your message is too long (${val.length}/250 characters). Please shorten it.`);
                return;
            }
            
            // 1. Lock UI interaction during serverless API evaluation
            input.disabled = true;

            try {
                // 2. Ping your real Vercel web address instead of the broken local path
                if (lowerUser !== ADMIN_NAME.toLowerCase()) {
                    const modResponse = await fetch('https://project-qd4by.vercel.app/api/moderate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ text: val })
                    });

                    if (!modResponse.ok) {
                        throw new Error("Compliance pipeline validation mismatch.");
                    }

                    const safetyCheck = await modResponse.json();

                    if (safetyCheck.flagged) {
                        alert(`[SECURITY BLOCK] Message blocked by AI filter! (${safetyCheck.reason})`);
                        // Hard halt to block submission path entirely
                        input.disabled = false;
                        input.focus();
                        return; 
                    }
                }

                // 3. Success: Message is clean, proceed to push to Supabase
                input.value = ""; 
                lastMessageTime = now;

                await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
                    method: 'POST',
                    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: user, content: val })
                });
                
                // Force an absolute bottom snap since the user themselves explicitly sent this text node
                fetchMessages().then(() => {
                    msgContainer.scrollTop = msgContainer.scrollHeight;
                });
            } catch (err) {
                console.error("Moderation pipeline threw exception:", err);
                alert("Safety verification offline. Message could not be processed safely.");
                return;
            } finally {
                // Always restore text input capabilities safely
                input.disabled = false;
                input.focus();
            }
        };
    }

    window.adminExecute = async (action) => {
        let target = document.getElementById(action === 'warn' ? 'warn-search' : 'ban-search').value.trim();
        const reason = document.getElementById(action === 'warn' ? 'warn-reason' : 'ban-reason').value.trim();
        const cat = document.getElementById('ban-category')?.value || 'Both';

        if (!target) return alert("Enter a username.");
        if (target.startsWith('@')) target = target.substring(1);

        let data = { username: target, last_action_reason: reason, last_action_type: action, last_action_category: cat };
        if (action === 'ban') { data.is_banned = true; }
        else if (action === 'unban') { data.is_banned = false; data.warned = false; data.temp_ban_until = null; }
        else if (action === 'warn') data.warned = true;

        await fetch(`${SUPABASE_URL}/rest/v1/user_roles`, {
            method: 'POST',
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', 'Prefer': 'resolution=merge-duplicates' },
            body: JSON.stringify(data)
        });
        alert("Action completed.");
    };

    window.executeTempBan = async () => {
        let target = document.getElementById('temp-ban-search').value.trim();
        if (target.startsWith('@')) target = target.substring(1);
        
        const duration = parseInt(document.getElementById('temp-ban-duration').value);
        const reason = document.getElementById('temp-ban-reason').value.trim();
        const expiry = new Date(); 
        expiry.setMinutes(expiry.getMinutes() + duration);

        await fetch(`${SUPABASE_URL}/rest/v1/user_roles`, {
            method: 'POST',
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', 'Prefer': 'resolution=merge-duplicates' },
            body: JSON.stringify({ 
                username: target, 
                last_action_type: 'temp_ban', 
                last_action_reason: reason,
                temp_ban_until: expiry.toISOString() 
            })
        });
        alert("Temporary ban applied.");
    };

    window.deleteMsg = async (id) => {
        await fetch(`${SUPABASE_URL}/rest/v1/messages?id=eq.${id}`, { 
            method: 'PATCH', 
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ content: "Message Was Deleted By Owner" })
        });
        fetchMessages();
    };

    const dirSearch = document.getElementById('directory-search');
    if (dirSearch) {
        dirSearch.oninput = (e) => renderUserDirectory(e.target.value);
    }

    chatPollingInterval = setInterval(fetchMessages, 3000);
    // Initial load forces baseline structural alignment layer instantly
    fetchMessages().then(() => {
        msgContainer.scrollTop = msgContainer.scrollHeight;
    });
};

// Auto-run if the script is running in structural standalone isolation mode
if (document.getElementById('chat-messages')) {
    window.initializeChatEngine();
}
