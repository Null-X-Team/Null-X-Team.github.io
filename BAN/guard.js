// BAN/guard.js
(async function initSecurityGuard() {
    // 1. Identify the current active session username from your local storage authentication layer
    // Based on your dashboard image, it reads "TEST USER"
    const currentUsername = localStorage.getItem("nxos_logged_user") || "TEST USER";

    if (!currentUsername) return;

    try {
        // 2. Query your Supabase database to check the ban state and reason for this user
        const { data, error } = await supabase
            .from('profiles') 
            .select('is_banned, last_action_reason')
            .eq('username', currentUsername)
            .single();

        if (error) {
            console.log("[Security System] Guard verification deferred.");
            return;
        }

        // 3. If the ban flag is verified as true, trigger the overlay shield with the reason
        if (data && data.is_banned === true) {
            // Fallback text if last_action_reason is empty or NULL in the database row
            const banReason = data.last_action_reason || "No explicit reason specified by administration.";
            applySystemLockout(banReason);
        }

    } catch (err) {
        console.error("[Security System] Guard execution fault:", err);
    }

    // Function to generate and lock down the visual ban barrier
    function applySystemLockout(reasonText) {
        // Prevent duplicates
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

        // Intercept keyboard commands to block easy escapes (F12 / Inspect)
        window.addEventListener("keydown", (e) => {
            if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
                e.preventDefault();
            }
        });

        document.body.appendChild(overlay);
    }
})();
