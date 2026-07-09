// BAN/guard.js
(async function initSecurityGuard() {
    console.log("[Security System] Guard active. Initializing direct database link...");

    // Hardcoded connection credentials so it never loses track of the repository
    const SUPABASE_URL = "https://ldojzaikkolrxkiwyqvq.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkb2p6YWlra29scnhraXd5cXZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMDM2NjksImV4cCI6MjA5NDg3OTY2OX0.CXZf1jaNJ3njQhIWoaYFxuJWx2J0HQ9CPF5imQoxtMw";

    // Fallback client creation if the main app instance isn't globally accessible
    let localSupabase;
    if (typeof supabase !== 'undefined' && supabase.createClient) {
        localSupabase = supabase;
    } else if (typeof Supabase !== 'undefined' && Supabase.createClient) {
        localSupabase = Supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    } else {
        // If the Supabase CDN script hasn't loaded yet, fetch it dynamically
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

    // Try to discover who is logged in based on your dashboard DOM text layout
    let currentUsername = localStorage.getItem("nxos_logged_user") || localStorage.getItem("username");
    if (!currentUsername) {
        const pageText = document.body.innerText || "";
        const match = pageText.match(/Hello,\s*([A-Za-z0-9_\s\-]+)/);
        if (match && match[1]) {
            currentUsername = match[1].trim();
        }
    }

    console.log("[Security System] Target identifier:", currentUsername);
    if (!currentUsername) return;

    try {
        // Direct table look-up matching your profiles scheme
        const { data, error } = await localSupabase
            .from('profiles') 
            .select('is_banned, last_action_reason')
            .eq('username', currentUsername)
            .maybeSingle();

        if (error) {
            console.error("[Security System] Database query failed:", error.message);
            return;
        }

        if (data) {
            console.log("[Security System] Profile sync status:", data);
            
            // Check if user state matches target parameters
            if (data.is_banned === true || String(data.is_banned).toUpperCase() === "TRUE") {
                const banReason = data.last_action_reason || "No explicit reason specified by administration.";
                applySystemLockout(banReason);
            }
        }

    } catch (err) {
        console.error("[Security System] Guard execution fault:", err);
    }

    function applySystemLockout(reasonText) {
        if (document.getElementById("nxos-hard-lock")) return;

        const overlay = document.createElement("div");
        overlay.id = "nxos-hard-lock";
        overlay.className = "nxos-ban-overlay";

        overlay.innerHTML = `
            <div class="nxos-ban-box">
                <div class="nxos-ban-title">TERMINAL ACCESS RESTRICTED</div>
                <p class="nxos-ban-msg">You're Banned.</p>
                <div class="nxos-ban-reason-container">
                    <span class="nxos-ban-reason-label">Reason:</span>
                    <p class="nxos-ban-reason-text">${reasonText}</p>
                </div>
            </div>
        `;

        window.addEventListener("keydown", (e) => {
            if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
                e.preventDefault();
            }
        });

        document.body.appendChild(overlay);
    }
})();
