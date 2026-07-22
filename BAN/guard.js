// BAN/guard.js
(async function initSecurityGuard() {
    console.log("[Security System] Guard active. Connecting to user_roles repository...");

    // Hardcoded project credentials 
    const SUPABASE_URL = "https://ldojzaikkolrxkiwyqvq.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkb2p6YWlra29scnhraXd5cXZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMDM2NjksImV4cCI6MjA5NDg3OTY2OX0.CXZf1jaNJ3njQhIWoaYFxuJWx2J0HQ9CPF5imQoxtMw";

    // Capture the logged-in username directly from your header elements
    let currentUsername = null;
    const welcomeEl = document.getElementById("welcome-text");
    
    if (welcomeEl && welcomeEl.innerText) {
        currentUsername = welcomeEl.innerText.replace("Hello,", "").trim();
    }
    
    // FIX: Look for 'chatUser' because that is what your site actually uses!
    if (!currentUsername || currentUsername === "Guest") {
        currentUsername = localStorage.getItem("chatUser") || localStorage.getItem("nxos_logged_user") || localStorage.getItem("username");
    }

    console.log("[Security System] Checking access status for:", currentUsername);
    if (!currentUsername || currentUsername === "Guest") return;

    try {
        // FIX: Using fast REST API instead of waiting for a slow CDN script to load
        const response = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?username=eq.${encodeURIComponent(currentUsername)}&select=is_banned,temp_ban_until,last_action_reason`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });

        if (!response.ok) throw new Error("Query fault");
        
        const data = await response.json();

        if (data && data.length > 0) {
            const userStatus = data[0];
            const statusString = String(userStatus.is_banned).toUpperCase();
            const isPermanentlyBanned = (userStatus.is_banned === true || statusString === "TRUE");
            
            // Check for temporary bans
            let isTemporarilyBanned = false;
            if (userStatus.temp_ban_until) {
                const expiryTime = new Date(userStatus.temp_ban_until).getTime();
                if (expiryTime > Date.now()) {
                    isTemporarilyBanned = true;
                }
            }

            // If they are banned in any way, lock them out
            if (isPermanentlyBanned || isTemporarilyBanned) {
                let banReason = userStatus.last_action_reason || "Access restricted by administration.";
                
                // Add expiry date to the screen if it's a temp ban
                if (isTemporarilyBanned && !isPermanentlyBanned) {
                    const expiryDate = new Date(userStatus.temp_ban_until).toLocaleString();
                    banReason = `${banReason} <br><br><span style="color:#ffaa00;">Ban expires at: ${expiryDate}</span>`;
                }

                applySystemLockout(banReason);
            }
        }

    } catch (err) {
        console.error("[Security System] Execution exception:", err);
    }

    function applySystemLockout(reasonText) {
        if (document.getElementById("nxos-hard-lock")) return;

        const overlay = document.createElement("div");
        overlay.id = "nxos-hard-lock";
        overlay.className = "nxos-ban-overlay";

        overlay.innerHTML = `
            <div class="nxos-ban-box">
                <div class="nxos-ban-title">ACCESS RESTRICTED</div>
                <p class="nxos-ban-msg">You've Been BANNED.</p>
                <div class="nxos-ban-reason-container">
                    <span class="nxos-ban-reason-label">Reason:</span>
                    <p class="nxos-ban-reason-text">${reasonText}</p>
                </div>
            </div>
        `;

        // Blocks dev tools keys to enforce layout lockdown
        window.addEventListener("keydown", (e) => {
            if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
                e.preventDefault();
            }
        });

        document.body.appendChild(overlay);
    }
})();
