// BAN/guard.js
(async function initSecurityGuard() {
    console.log("[Security System] Guard active. Connecting to user_roles repository...");

    // Hardcoded project credentials 
    const SUPABASE_URL = "https://ldojzaikkolrxkiwyqvq.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkb2p6YWlra29scnhraXd5cXZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMDM2NjksImV4cCI6MjA5NDg3OTY2OX0.CXZf1jaNJ3njQhIWoaYFxuJWx2J0HQ9CPF5imQoxtMw";

    let localSupabase;
    
    // Connect to the database instantly via global windows context or Cdn backup
    if (typeof supabase !== 'undefined' && supabase.createClient) {
        localSupabase = supabase;
    } else if (typeof window.Supabase !== 'undefined' && window.Supabase.createClient) {
        localSupabase = window.Supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    } else {
        await new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
            script.onload = () => {
                localSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
                resolve();
            };
            document.head.appendChild(script);
        });
    }

    // Capture the logged-in username directly from your header elements
    let currentUsername = null;
    const welcomeEl = document.getElementById("welcome-text");
    
    if (welcomeEl && welcomeEl.innerText) {
        currentUsername = welcomeEl.innerText.replace("Hello,", "").trim();
    }
    
    if (!currentUsername || currentUsername === "Guest") {
        currentUsername = localStorage.getItem("nxos_logged_user") || localStorage.getItem("username");
    }

    console.log("[Security System] Checking access status for:", currentUsername);
    if (!currentUsername || currentUsername === "Guest") return;

    try {
        // CHANGED: Querying 'user_roles' instead of 'profiles' to match your actual schema
        const { data, error } = await localSupabase
            .from('user_roles') 
            .select('is_banned, last_action_reason')
            .eq('username', currentUsername)
            .maybeSingle();

        if (error) {
            console.error("[Security System] Query fault:", error.message);
            return;
        }

        if (data) {
            const statusString = String(data.is_banned).toUpperCase();
            if (data.is_banned === true || statusString === "TRUE") {
                const banReason = data.last_action_reason || "Access restricted by administration.";
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
