// --- CONFIGURATION CORRECTION ---
const SUPABASE_URL = 'https://ldojzaikkolrxkiwyqvq.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkb2p6YWlra29scnhraXd5cXZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMDM2NjksImV4cCI6MjA5NDg3OTY2OX0.CXZf1jaNJ3njQhIWoaYFxuJWx2J0HQ9CPF5imQoxtMw'; 

const DEFAULT_PFP = "https://Glaxyias.github.io/imgs/download.jpeg";
let allUsers = [];
let allRolesCache = [];
let lastMessageTime = 0;
let chatPollingInterval = null; 
let heartbeatInterval = null;

// Track active menu state
let selectedChatUser = { username: '', handler: '' };

// Track the live authorization status dynamically from Supabase
let currentUserIsAdmin = false;

// ==========================================================================
// LOCAL CHAT SETTINGS SYSTEM (theme / cloak / background / message style)
// ==========================================================================
const SETTINGS_KEYS = {
    theme: 'nullchat_theme',
    cloakEnabled: 'nullchat_cloak_enabled',
    cloakType: 'nullchat_cloak_type',
    bgImage: 'nullchat_bg_image',
    bgOverlay: 'nullchat_bg_overlay',
    bubbleStyle: 'nullchat_bubble_style',
};

const CLOAK_PRESETS = {
    docs:      { title: 'Google Docs',        icon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico' },
    classroom: { title: 'Home',                icon: 'https://ssl.gstatic.com/classroom/favicon.png' },
    drive:     { title: 'My Drive - Google Drive', icon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png' },
    mail:      { title: 'Inbox (2) - Gmail',    icon: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico' },
    canvas:    { title: 'Dashboard',            icon: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico' },
};

function applyTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
    document.querySelectorAll('.theme-swatch').forEach(sw => {
        sw.classList.toggle('active-swatch', sw.getAttribute('data-theme') === themeName);
    });
    localStorage.setItem(SETTINGS_KEYS.theme, themeName);
}

function applyCloak(enabled, type) {
    const preset = CLOAK_PRESETS[type] || CLOAK_PRESETS.docs;
    const titleEl = document.getElementById('page-title');
    const favicon = document.getElementById('dynamic-favicon');

    if (enabled) {
        if (titleEl) titleEl.textContent = preset.title;
        if (favicon) favicon.href = preset.icon;
    } else {
        if (titleEl) titleEl.textContent = 'NULL Grades';
        if (favicon) favicon.href = 'data:,';
    }

    const label = document.getElementById('cloak-toggle-label');
    if (label) label.textContent = enabled ? `Cloak Enabled (${preset.title})` : 'Cloak Disabled';
}

function applyBackground(dataUrl, overlayPercent) {
    const layer = document.getElementById('custom-bg-layer');
    const dropzone = document.getElementById('bg-upload-dropzone');
    const dzText = document.getElementById('bg-upload-text');

    if (dataUrl) {
        layer.style.display = 'block';
        layer.style.backgroundImage = `url(${dataUrl})`;
        layer.style.setProperty('--bg-overlay-alpha', (overlayPercent ?? 70) / 100);
        document.body.classList.add('has-custom-bg');
        if (dropzone) dropzone.classList.add('has-image');
        if (dzText) dzText.textContent = 'Custom background active — click to change';
    } else {
        layer.style.display = 'none';
        layer.style.backgroundImage = '';
        document.body.classList.remove('has-custom-bg');
        if (dropzone) dropzone.classList.remove('has-image');
        if (dzText) dzText.textContent = 'Click to choose an image, or drag one here';
    }
}

function applyBubbleStyle(styleName) {
    document.querySelectorAll('.bubble-style-option').forEach(opt => {
        opt.classList.toggle('selected-style', opt.getAttribute('data-style') === styleName);
    });
    localStorage.setItem(SETTINGS_KEYS.bubbleStyle, styleName);
    // Re-render messages so the style takes effect immediately on existing bubbles
    document.querySelectorAll('.my-bubble-color').forEach(bubble => {
        bubble.className = bubble.className.replace(/style-\S+/g, '').trim();
        if (styleName !== 'default') bubble.classList.add(`style-${styleName}`);
    });
}

function getSavedBubbleStyle() {
    return localStorage.getItem(SETTINGS_KEYS.bubbleStyle) || 'default';
}

function loadAllSettings() {
    // Theme
    const savedTheme = localStorage.getItem(SETTINGS_KEYS.theme) || 'amber';
    applyTheme(savedTheme);

    // Cloak
    const cloakEnabled = localStorage.getItem(SETTINGS_KEYS.cloakEnabled) === 'true';
    const cloakType = localStorage.getItem(SETTINGS_KEYS.cloakType) || 'docs';
    const cloakToggle = document.getElementById('toggle-chat-cloak');
    const cloakSelect = document.getElementById('cloak-disguise-select');
    if (cloakToggle) cloakToggle.checked = cloakEnabled;
    if (cloakSelect) cloakSelect.value = cloakType;
    applyCloak(cloakEnabled, cloakType);

    // Background
    const savedBg = localStorage.getItem(SETTINGS_KEYS.bgImage);
    const savedOverlay = parseInt(localStorage.getItem(SETTINGS_KEYS.bgOverlay) || '70');
    const overlayRange = document.getElementById('bg-overlay-range');
    if (overlayRange) overlayRange.value = savedOverlay;
    applyBackground(savedBg, savedOverlay);

    // Bubble style
    const savedStyle = getSavedBubbleStyle();
    applyBubbleStyle(savedStyle);
}

function initSettingsPanelBindings() {
    // Theme swatches
    document.querySelectorAll('.theme-swatch').forEach(sw => {
        sw.addEventListener('click', () => applyTheme(sw.getAttribute('data-theme')));
    });

    // Cloak toggle + select
    const cloakToggle = document.getElementById('toggle-chat-cloak');
    const cloakSelect = document.getElementById('cloak-disguise-select');
    if (cloakToggle) {
        cloakToggle.addEventListener('change', (e) => {
            const enabled = e.target.checked;
            const type = cloakSelect ? cloakSelect.value : 'docs';
            localStorage.setItem(SETTINGS_KEYS.cloakEnabled, enabled ? 'true' : 'false');
            applyCloak(enabled, type);
        });
    }
    if (cloakSelect) {
        cloakSelect.addEventListener('change', (e) => {
            localStorage.setItem(SETTINGS_KEYS.cloakType, e.target.value);
            const enabled = cloakToggle ? cloakToggle.checked : false;
            applyCloak(enabled, e.target.value);
        });
    }

    // Escape key panic - jump to a neutral page instantly
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const cloakEnabled = localStorage.getItem(SETTINGS_KEYS.cloakEnabled) === 'true';
            if (cloakEnabled) {
                window.location.href = 'https://docs.google.com';
            }
        }
    });

    // Background upload
    const bgInput = document.getElementById('bg-file-input');
    const removeBgBtn = document.getElementById('remove-bg-btn');
    const overlayRange = document.getElementById('bg-overlay-range');

    if (bgInput) {
        bgInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            if (!file.type.startsWith('image/')) {
                alert('Please choose a valid image file.');
                return;
            }
            const reader = new FileReader();
            reader.onload = (evt) => {
                const dataUrl = evt.target.result;
                try {
                    localStorage.setItem(SETTINGS_KEYS.bgImage, dataUrl);
                } catch (err) {
                    alert('That image is too large to save locally. Try a smaller/compressed image.');
                    return;
                }
                const overlay = overlayRange ? parseInt(overlayRange.value) : 70;
                applyBackground(dataUrl, overlay);
            };
            reader.readAsDataURL(file);
        });
    }

    if (removeBgBtn) {
        removeBgBtn.addEventListener('click', () => {
            localStorage.removeItem(SETTINGS_KEYS.bgImage);
            applyBackground(null);
            if (bgInput) bgInput.value = '';
        });
    }

    if (overlayRange) {
        overlayRange.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            localStorage.setItem(SETTINGS_KEYS.bgOverlay, val);
            const layer = document.getElementById('custom-bg-layer');
            if (layer) layer.style.setProperty('--bg-overlay-alpha', val / 100);
        });
    }

    // Message bubble style picker
    document.querySelectorAll('.bubble-style-option').forEach(opt => {
        opt.addEventListener('click', () => applyBubbleStyle(opt.getAttribute('data-style')));
    });
}

// Globally scoped Quick Reply utility handler
window.mentionUser = function(rawEncodedName) {
    const input = document.getElementById('message-input');
    if (!input) return;
    
    const targetName = decodeURIComponent(rawEncodedName).trim();
    if (input.value.includes(`@${targetName}`)) return;
    
    input.value = input.value ? `${input.value.trim()} @${targetName} ` : `@${targetName} `;
    input.focus();
    
    const counter = document.getElementById('char-counter');
    if (counter) {
        const len = input.value.length;
        counter.textContent = `${len} / 250`;
    }
};

// --- USER CONTEXT MENU LOGIC ---
window.openUserMenu = function(event, targetUsername) {
    event.preventDefault();
    event.stopPropagation();

    selectedChatUser = { 
        username: targetUsername, 
        handler: `@${targetUsername.toLowerCase().replace(/\s+/g, '_')}` 
    };

    const menu = document.getElementById('chat-user-menu');
    const usernameEl = document.getElementById('menu-username');
    const handlerEl = document.getElementById('menu-handler');

    if (usernameEl) usernameEl.textContent = selectedChatUser.username;
    if (handlerEl) handlerEl.textContent = selectedChatUser.handler;

    if (menu) {
        // Prevent overflowing outside screen edges
        let posX = event.clientX;
        let posY = event.clientY;

        const menuWidth = 220;
        const menuHeight = 180;

        if (posX + menuWidth > window.innerWidth) {
            posX = window.innerWidth - menuWidth - 10;
        }
        if (posY + menuHeight > window.innerHeight) {
            posY = window.innerHeight - menuHeight - 10;
        }

        menu.style.left = `${posX}px`;
        menu.style.top = `${posY}px`;
        menu.classList.remove('hidden');
    }
};

// Global click event to dismiss context menu when clicking elsewhere
document.addEventListener('click', (e) => {
    const menu = document.getElementById('chat-user-menu');
    if (menu && !e.target.closest('#chat-user-menu') && !e.target.closest('.chat-clickable')) {
        menu.classList.add('hidden');
    }
});

// Menu Action Button Bindings
document.addEventListener('DOMContentLoaded', () => {
    const profileBtn = document.getElementById('menu-btn-profile');
    const pmBtn = document.getElementById('menu-btn-pm');
    const friendBtn = document.getElementById('menu-btn-friend');
    const blockBtn = document.getElementById('menu-btn-block');

    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            if (selectedChatUser.username) {
                window.location.href = `../profile/profile.html?user=${encodeURIComponent(selectedChatUser.username)}`;
            }
            document.getElementById('chat-user-menu')?.classList.add('hidden');
        });
    }

    if (pmBtn) {
        pmBtn.addEventListener('click', () => {
            alert(`Opening private conversation with ${selectedChatUser.username}...`);
            document.getElementById('chat-user-menu')?.classList.add('hidden');
        });
    }

    if (friendBtn) {
        friendBtn.addEventListener('click', () => {
            alert(`Friend request sent to ${selectedChatUser.username}!`);
            document.getElementById('chat-user-menu')?.classList.add('hidden');
        });
    }

    if (blockBtn) {
        blockBtn.addEventListener('click', () => {
            if (!selectedChatUser.username) return;
            
            if (confirm(`Are you sure you want to block ${selectedChatUser.username}? You won't see their messages in chat.`)) {
                let blockedUsers = JSON.parse(localStorage.getItem('blockedUsers') || '[]');
                if (!blockedUsers.includes(selectedChatUser.username)) {
                    blockedUsers.push(selectedChatUser.username);
                    localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
                }
                alert(`User blocked successfully.`);
                document.getElementById('chat-user-menu')?.classList.add('hidden');
                
                // Trigger refresh to immediately hide messages from blocked user
                if (window.refreshChatMessages) window.refreshChatMessages();
            }
        });
    }

    // Load and bind all local settings as soon as the DOM is ready
    loadAllSettings();
    initSettingsPanelBindings();
});

// Global initialization hook exposed directly to main.js router
window.initializeChatEngine = async function() {
    const user = localStorage.getItem('chatUser');
    
    if (!user) {
        window.location.href = "../Login/login.html";
        return;
    }

    if (chatPollingInterval) clearInterval(chatPollingInterval);
    if (heartbeatInterval) clearInterval(heartbeatInterval);

    try {
        const verifyRes = await fetch(`${SUPABASE_URL}/rest/v1/users?select=username`, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        const verifyData = await verifyRes.json();

        const userExists = verifyData && verifyData.some(u => u.username && u.username.trim().toLowerCase() === user.trim().toLowerCase());
        if (!userExists) {
            localStorage.removeItem('chatUser');
            localStorage.clear();
            window.location.href = "../Login/login.html";
            return;
        }
    } catch (authError) {
        console.error("Security handshake failed:", authError);
    }

    // Dynamic background online indicator loop
    async function executePresenceHeartbeat() {
        try {
            await fetch(`${SUPABASE_URL}/rest/v1/user_roles?username=eq.${encodeURIComponent(user)}`, {
                method: 'PATCH',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ last_seen: new Date().toISOString() })
            });
        } catch (e) { console.error("Heartbeat sync lost:", e); }
    }
    
    executePresenceHeartbeat();
    heartbeatInterval = setInterval(executePresenceHeartbeat, 10000);

    try {
        const banRes = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?select=username,is_banned,temp_ban_until,pfp_url,is_admin,role_tag,last_seen`, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        const banData = await banRes.json();
        
        if (banData && Array.isArray(banData)) {
            const profile = banData.find(r => r.username && r.username.trim().toLowerCase() === user.trim().toLowerCase());
            
            if (profile) {
                currentUserIsAdmin = (profile.is_admin === true || String(profile.is_admin).toLowerCase() === 'true' || String(profile.role_tag).toLowerCase() === 'admin');

                if (profile.is_banned === true || String(profile.is_banned).toLowerCase() === 'true') {
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
        }
    } catch (banCheckErr) {
        console.error("Ban check failed:", banCheckErr);
    }

    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay) usernameDisplay.textContent = user;
    
    if (currentUserIsAdmin) {
        const adminTab = document.getElementById('admin-tab');
        if (adminTab) adminTab.style.display = 'block';

        const pmTab = document.getElementById('pm-tab');
        if (pmTab) pmTab.style.display = 'block';
    }

    const msgContainer = document.getElementById('chat-messages');

    // --- TAB NAVIGATION UPDATE ---
    window.switchTab = (target) => {
        ['chat-view', 'rules-view', 'admin-panel-view', 'users-view', 'private-messages-view', 'settings-view'].forEach(v => {
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
        else if (target === 'private-messages') {
            const pmView = document.getElementById('private-messages-view');
            if (pmView) pmView.style.display = 'block';
            const pmTab = document.getElementById('pm-tab');
            if (pmTab) pmTab.classList.add('active');
            fetchAdminPrivateMessages(); // Fetch all PMs
        }
        else if (target === 'settings') {
            const settingsView = document.getElementById('settings-view');
            if (settingsView) settingsView.style.display = 'block';
            const settingsTab = document.getElementById('chan-settings');
            if (settingsTab) settingsTab.classList.add('active');
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

    // --- ADMIN DATALIST UPDATE (For autocomplete @ users) ---
    function updateAdminUserDatalist() {
        const datalist = document.getElementById('admin-user-suggestions');
        if (!datalist) return;
        
        datalist.innerHTML = allUsers.map(u => `<option value="${u.username}">`).join('');

        ['warn-search', 'ban-search', 'temp-ban-search'].forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.setAttribute('list', 'admin-user-suggestions');
                input.setAttribute('placeholder', 'Type @ or username...');
                
                input.oninput = (e) => {
                    if (e.target.value.startsWith('@')) {
                        e.target.value = e.target.value.replace(/^@+/, '');
                    }
                };
            }
        });
    }

    // --- ADMIN PM FETCHING ---
    window.fetchAdminPrivateMessages = async function() {
        const container = document.getElementById('admin-pm-container');
        if (!container || !currentUserIsAdmin) return;

        try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/private_messages?select=*&order=created_at.desc`, {
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
            });
            const pmData = await res.json();

            if (!pmData || pmData.length === 0) {
                container.innerHTML = '<p style="color:var(--text-muted); text-align:center;">No private messages found in database.</p>';
                return;
            }

            container.innerHTML = pmData.map(pm => {
                const time = new Date(pm.created_at).toLocaleString();
                return `
                    <div style="border-bottom: 1px solid var(--border-soft); padding: 10px 0; display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <div style="font-size: 12px; color: var(--accent);">
                                <strong>${pm.sender_username}</strong> ➔ <strong>${pm.recipient_username}</strong>
                                <span style="color: var(--text-muted); margin-left: 8px;">${time}</span>
                            </div>
                            <div style="color: #e0e0e0; margin-top: 4px; font-size: 14px;">
                                ${pm.content}
                            </div>
                        </div>
                        <button style="background: #ff4444; color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 10px; cursor: pointer;" 
                                onclick="deletePrivateMsg('${pm.id}')">
                            Delete
                        </button>
                    </div>
                `;
            }).join('');
        } catch (err) {
            console.error("Failed to load PM log:", err);
            container.innerHTML = '<p style="color:#ff4444;">Error fetching private messages.</p>';
        }
    };

    window.deletePrivateMsg = async (id) => {
        if (!confirm("Are you sure you want to delete this private message?")) return;
        try {
            await fetch(`${SUPABASE_URL}/rest/v1/private_messages?id=eq.${id}`, {
                method: 'DELETE',
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
            });
            fetchAdminPrivateMessages();
        } catch (e) {
            console.error("Deletion failed:", e);
        }
    };

    // --- USER DIRECTORY ---
    async function fetchAllUsers() {
        try {
            const usersRes = await fetch(`${SUPABASE_URL}/rest/v1/users?select=username`, {
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
            });
            const usersData = await usersRes.json();

            const rolesRes = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?select=*`, {
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
            });
            const rolesData = await rolesRes.json();
            allRolesCache = rolesData || [];

            const uniqueNames = [...new Set(usersData.map(u => u.username))].filter(name => name != null);
            
            allUsers = uniqueNames.map(name => {
                const foundProfile = rolesData.find(r => r.username === name);
                const checkAdminStatus = foundProfile ? foundProfile.is_admin : false;
                return {
                    username: name,
                    pfp_url: foundProfile ? foundProfile.pfp_url : DEFAULT_PFP,
                    role_tag: foundProfile ? foundProfile.role_tag : 'User',
                    last_seen: foundProfile ? foundProfile.last_seen : null,
                    is_banned: foundProfile ? (foundProfile.is_banned === true || String(foundProfile.is_banned).toLowerCase() === 'true') : false,
                    is_admin: (checkAdminStatus === true || String(checkAdminStatus).toLowerCase() === 'true' || (foundProfile && String(foundProfile.role_tag).toLowerCase() === 'admin'))
                };
            });
            
            renderUserDirectory();
            updateAdminUserDatalist(); // Bind users to autocomplete menu

            if (currentUserIsAdmin) {
                renderAdminStats();
                renderAdminUserTable();
            }
        } catch (err) { console.error("Could not fetch user database collection:", err); }
    }

    function renderUserDirectory(filterTerm = "") {
        const listContainer = document.getElementById('user-list-display');
        if (!listContainer) return;
        const filtered = allUsers.filter(u => u.username.toLowerCase().includes(filterTerm.toLowerCase()));
        
        listContainer.innerHTML = filtered.map(u => {
            const displayTag = u.is_admin ? 'ADMIN' : u.role_tag;
            
            let onlineDot = "rgba(160, 146, 141, 0.4)";
            let statusLabel = "OFFLINE";
            if (u.last_seen) {
                const diff = Date.now() - new Date(u.last_seen).getTime();
                if (diff < 5 * 60 * 1000) {
                    onlineDot = "#22c55e";
                    statusLabel = "ONLINE";
                }
            }

            return `
                <div class="admin-card" style="text-align:center; position: relative;">
                    <div style="position: absolute; top: 10px; right: 10px; font-size: 9px; font-weight: bold; color: ${onlineDot}; border: 1px solid ${onlineDot}; padding: 1px 4px; border-radius: 3px;">
                        ${statusLabel}
                    </div>
                    <img class="avatar chat-clickable" src="${u.pfp_url || DEFAULT_PFP}" style="margin: 0 auto 10px; width:50px; height:50px; display:block; object-fit:cover; border-radius:50%; border: 2px solid ${onlineDot};" onclick="openUserMenu(event, '${u.username}')">
                    <span class="chat-clickable" style="color:white; font-weight:bold; cursor:pointer;" onclick="openUserMenu(event, '${u.username}')">
                        ${u.username}
                    </span>
                    <div style="font-size:11px; color:var(--text-muted); margin-top:5px; text-transform:uppercase;">[${displayTag}]</div>
                </div>
            `;
        }).join('');
    }

    // --- IMPROVED ADMIN: STATS ROW ---
    function renderAdminStats() {
        const row = document.getElementById('admin-stats-row');
        if (!row) return;

        const total = allUsers.length;
        const bannedCount = allUsers.filter(u => u.is_banned).length;
        const adminCount = allUsers.filter(u => u.is_admin).length;
        const onlineCount = allUsers.filter(u => u.last_seen && (Date.now() - new Date(u.last_seen).getTime() < 5 * 60 * 1000)).length;

        row.innerHTML = `
            <div class="admin-stat-card">
                <div class="stat-value">${total}</div>
                <div class="stat-label">Total Users</div>
            </div>
            <div class="admin-stat-card stat-good">
                <div class="stat-value">${onlineCount}</div>
                <div class="stat-label">Online Now</div>
            </div>
            <div class="admin-stat-card">
                <div class="stat-value">${adminCount}</div>
                <div class="stat-label">Admins</div>
            </div>
            <div class="admin-stat-card stat-danger">
                <div class="stat-value">${bannedCount}</div>
                <div class="stat-label">Banned</div>
            </div>
        `;
    }

    // --- IMPROVED ADMIN: QUICK USER MANAGEMENT TABLE ---
    function renderAdminUserTable(filterTerm = "") {
        const table = document.getElementById('admin-user-table');
        if (!table) return;

        const filtered = allUsers.filter(u => u.username.toLowerCase().includes(filterTerm.toLowerCase()));

        if (filtered.length === 0) {
            table.innerHTML = `<p style="color:var(--text-muted); font-size:13px; text-align:center; padding:20px 0;">No users match that search.</p>`;
            return;
        }

        table.innerHTML = filtered.map(u => {
            let onlineDot = "rgba(160, 146, 141, 0.4)";
            if (u.last_seen && (Date.now() - new Date(u.last_seen).getTime() < 5 * 60 * 1000)) {
                onlineDot = "#22c55e";
            }
            const tagLabel = u.is_admin ? 'ADMIN' : (u.role_tag || 'User');
            const banLabel = u.is_banned ? `<span style="color:#ff4444; font-weight:bold;"> · BANNED</span>` : '';

            return `
                <div class="admin-user-row">
                    <img src="${u.pfp_url || DEFAULT_PFP}" style="border: 2px solid ${onlineDot};" alt="">
                    <div class="aur-name">
                        <strong>${u.username}</strong>
                        <span>[${tagLabel}]${banLabel}</span>
                    </div>
                    <div class="aur-actions">
                        <button class="aur-btn warn" onclick="quickAdminAction('warn', '${u.username.replace(/'/g, "\\'")}')">Warn</button>
                        ${u.is_banned
                            ? `<button class="aur-btn unban" onclick="quickAdminAction('unban', '${u.username.replace(/'/g, "\\'")}')">Unban</button>`
                            : `<button class="aur-btn ban" onclick="quickAdminAction('ban', '${u.username.replace(/'/g, "\\'")}')">Ban</button>`
                        }
                    </div>
                </div>
            `;
        }).join('');
    }

    // Quick inline action from the table (uses a lightweight prompt for reason on warn/ban)
    window.quickAdminAction = async (action, username) => {
        let reason = "";
        if (action === 'warn' || action === 'ban') {
            reason = prompt(`Reason for ${action === 'warn' ? 'warning' : 'banning'} ${username}:`, "") || "";
            if (reason === null) return;
        }

        let data = { last_action_reason: reason, last_action_type: action };
        if (action === 'ban') data.is_banned = true;
        else if (action === 'unban') { data.is_banned = false; data.warned = false; data.temp_ban_until = null; }
        else if (action === 'warn') data.warned = true;

        try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?username=eq.${encodeURIComponent(username)}`, {
                method: 'PATCH',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error(await res.text());

            // Reflect the change immediately without a full page reload
            const target = allUsers.find(u => u.username === username);
            if (target) {
                if (action === 'ban') target.is_banned = true;
                if (action === 'unban') target.is_banned = false;
            }
            renderAdminStats();
            renderAdminUserTable(document.getElementById('admin-quick-search')?.value || "");
        } catch (err) {
            console.error("Quick action failed:", err);
            alert("Action failed. Check console for details.");
        }
    };

    const quickSearchInput = document.getElementById('admin-quick-search');
    if (quickSearchInput) {
        quickSearchInput.oninput = (e) => renderAdminUserTable(e.target.value);
    }

    // --- MESSAGE ENGINE ---
    async function fetchMessages() {
        if (!document.getElementById('chat-messages')) {
            clearInterval(chatPollingInterval);
            clearInterval(heartbeatInterval);
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

            const activeHeaderSpan = document.getElementById('room-status-indicator');
            if (activeHeaderSpan && roles) {
                const selfCheck = roles.find(r => r.username === user);
                if (selfCheck) {
                    activeHeaderSpan.textContent = "ONLINE";
                    activeHeaderSpan.style.color = "#22c55e";
                }
            }

            const isAtBottom = msgContainer.scrollHeight - msgContainer.scrollTop <= msgContainer.clientHeight + 100;
            const blockedUsers = JSON.parse(localStorage.getItem('blockedUsers') || '[]');
            const myBubbleStyle = getSavedBubbleStyle();

            msgContainer.innerHTML = '';
            messages.forEach(msg => {
                // Ignore messages sent by blocked users
                if (blockedUsers.includes(msg.username)) return;

                const isDel = msg.content === "Message Was Deleted By Owner";
                const role = roles && roles.find ? roles.find(r => r.username === msg.username) : null;
                const time = new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                const userPfp = role && role.pfp_url ? role.pfp_url : DEFAULT_PFP;
                const evaluatedRole = role && role.role_tag ? role.role_tag : 'User';
                const isMsgSenderAdmin = role ? (role.is_admin === true || String(role.is_admin).toLowerCase() === 'true' || String(role.role_tag).toLowerCase() === 'admin') : false;
                
                let tag = "";
                if (isMsgSenderAdmin || evaluatedRole.toLowerCase() === 'admin') {
                    tag = `<span class="badge admin-badge">ADMIN</span>`;
                } else if (evaluatedRole && evaluatedRole.toLowerCase() !== 'user') {
                    tag = `<span class="badge custom-badge">[${evaluatedRole.toUpperCase()}]</span>`;
                }

                let senderStatusColor = "transparent";
                if (role && role.last_seen) {
                    if (Date.now() - new Date(role.last_seen).getTime() < 5 * 60 * 1000) {
                        senderStatusColor = "#22c55e";
                    }
                }

                const isMine = msg.username === user;
                const bubbleExtraClass = (isMine && myBubbleStyle !== 'default') ? ` style-${myBubbleStyle}` : '';

                const div = document.createElement('div');
                div.className = `message-wrapper ${isMine ? 'my-message-wrapper' : 'other-message-wrapper'}`;
                
                div.innerHTML = `
                    <img src="${userPfp}" class="chat-pfp chat-clickable" alt="Avatar" style="border: 2px solid ${senderStatusColor};" onclick="openUserMenu(event, '${msg.username}')">
                    <div class="message-content-node">
                        <div class="message-meta-header">
                            <span class="chat-username-link chat-clickable" onclick="openUserMenu(event, '${msg.username}')">
                                <strong>${msg.username}</strong>
                            </span>
                            <span style="font-size:10px; color:var(--accent); cursor:pointer; margin-left:4px;" onclick="window.mentionUser('${encodeURIComponent(msg.username)}')">[reply]</span>
                            ${tag}
                            <span class="message-timestamp">${time}</span>
                        </div>
                        <div class="message-text-bubble ${isMine ? 'my-bubble-color' : 'other-bubble-color'}${bubbleExtraClass}" style="${isDel ? 'font-style:italic; opacity:0.5;' : ''}">
                            ${msg.content}
                        </div>
                         ${(currentUserIsAdmin && !isDel) ? `<button style="background:none; color:red; font-size:10px; padding:0; margin-top:5px; cursor:pointer; width:auto; display:block;" onclick="deleteMsg('${msg.id}')">Delete</button>` : ""}
                    </div>
                `;
                msgContainer.appendChild(div);
            });

            if (isAtBottom) {
                msgContainer.scrollTop = msgContainer.scrollHeight;
            }
        } catch (e) { console.error(e); }
    }

    window.refreshChatMessages = fetchMessages;

    // --- CHARACTER COUNTER LOGIC MOUNT ---
    const msgInput = document.getElementById('message-input');
    const charCounter = document.getElementById('char-counter');
    if (msgInput && charCounter) {
        msgInput.oninput = (e) => {
            const len = e.target.value.length;
            charCounter.textContent = `${len} / 250`;
            if (len >= 230) {
                charCounter.style.color = "#ff4444";
            } else if (len >= 200) {
                charCounter.style.color = "var(--accent)";
            } else {
                charCounter.style.color = "var(--text-muted)";
            }
        };
    }

    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
        chatForm.onsubmit = async (e) => {
            e.preventDefault();
            const now = Date.now();
            const input = document.getElementById('message-input');
            if (now - lastMessageTime < 2000 && !currentUserIsAdmin) return alert("Please wait between messages.");
            
            const val = input.value.trim();
            if (!val) return;
            
            if (val.length > 250) {
                alert(`Your message is too long (${val.length}/250 characters). Please shorten it.`);
                return;
            }
            
            input.disabled = true;

            try {
                // --- CLIENT-SIDE BAD WORD FILTER INTEGRATION ---
                // Checks if badword.js has loaded successfully and runs the filter
                if (typeof filterBadWords === 'function') {
                    const cleanText = filterBadWords(val);
                    if (cleanText !== val) {
                        alert("Message blocked by filter! Please remove inappropriate language before sending.");
                        input.disabled = false;
                        input.focus();
                        return;
                    }
                }
                
                input.value = ""; 
                if (charCounter) charCounter.textContent = "0 / 250";
                lastMessageTime = now;

                // Send directly to Supabase
                await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
                    method: 'POST',
                    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: user, content: val })
                });
                
                fetchMessages().then(() => {
                    msgContainer.scrollTop = msgContainer.scrollHeight;
                });
            } catch (err) {
                console.error("Message send failed:", err);
                alert("Database connection failed.");
            } finally {
                input.disabled = false;
                input.focus();
            }
        };
    }

    // --- FIX: ADMIN ACTIONS USING PATCH TO UPDATE EXISTING ROWS ---
    window.adminExecute = async (action) => {
        let target = document.getElementById(action === 'warn' ? 'warn-search' : 'ban-search').value.trim();
        const reason = document.getElementById(action === 'warn' ? 'warn-reason' : 'ban-reason').value.trim();
        const cat = document.getElementById('ban-category')?.value || 'Both';

        if (!target) return alert("Enter a username.");
        if (target.startsWith('@')) target = target.substring(1);

        // Define what we are updating
        let data = { last_action_reason: reason, last_action_type: action, last_action_category: cat };
        if (action === 'ban') { data.is_banned = true; }
        else if (action === 'unban') { data.is_banned = false; data.warned = false; data.temp_ban_until = null; }
        else if (action === 'warn') data.warned = true;

        try {
            // Using PATCH to UPDATE the existing row where username matches
            const res = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?username=eq.${encodeURIComponent(target)}`, {
                method: 'PATCH',
                headers: { 
                    'apikey': SUPABASE_KEY, 
                    'Authorization': `Bearer ${SUPABASE_KEY}`, 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) throw new Error(await res.text());
            alert("Action completed successfully!");
            fetchAllUsers();
            
        } catch (err) {
            console.error("Database update failed:", err);
            alert("Failed to update user. Check console for details.");
        }
    };

    window.executeTempBan = async () => {
        let target = document.getElementById('temp-ban-search').value.trim();
        if (target.startsWith('@')) target = target.substring(1);
        if (!target) return alert("Enter a username.");
        
        // Grab the duration and make sure it is actually a number
        const durationInput = document.getElementById('temp-ban-duration').value;
        const duration = parseInt(durationInput);
        
        if (isNaN(duration) || duration <= 0) {
            return alert("Please enter a valid number of minutes for the ban duration!");
        }
        
        const reason = document.getElementById('temp-ban-reason').value.trim();
        const expiry = new Date(); 
        expiry.setMinutes(expiry.getMinutes() + duration);

        try {
            // Using PATCH to UPDATE the existing row
            const res = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?username=eq.${encodeURIComponent(target)}`, {
                method: 'PATCH',
                headers: { 
                    'apikey': SUPABASE_KEY, 
                    'Authorization': `Bearer ${SUPABASE_KEY}`, 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ 
                    last_action_type: 'temp_ban', 
                    last_action_reason: reason,
                    temp_ban_until: expiry.toISOString() 
                })
            });

            if (!res.ok) throw new Error(await res.text());
            alert("Temporary ban applied successfully!");

        } catch (err) {
            console.error("Temp ban failed:", err);
            alert("Failed to apply temp ban. Check console for details.");
        }
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
    fetchMessages().then(() => {
        msgContainer.scrollTop = msgContainer.scrollHeight;
    });
};

if (document.getElementById('chat-messages')) {
    window.initializeChatEngine();
}
