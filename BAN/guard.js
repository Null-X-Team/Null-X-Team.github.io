// BAN/guard.js
(async function initSecurityGuard() {
    // 1. Identify the current active session username from your local authentication layer
    // (Adjust this string to match how your main.js tracks the logged-in user, e.g., localStorage.getItem("username"))
    const currentUsername = localStorage.getItem("nxos_logged_user") || "TEST USER";

    if (!currentUsername) return;

    try {
        // 2. Query your Supabase database to check the ban state for this specific user
        // Assumes your profiles/users table has a text column 'username' and a boolean column 'is_banned'
        const { data, error } = await supabase
            .from('profiles') 
            .select('is_banned')
            .eq('username', currentUsername)
            .single();

        if (error) {
            console.log("[Security System] Guard verification deferred.");
            return;
        }

        // 3. If the ban flag is verified as true, trigger the overlay shield
        if (data && data.is_banned === true) {
            applySystemLockout();
        }

    } catch (err) {
        console.error("[Security System] Guard execution fault:", err);
    }

    // Function to generate and lock down the visual ban barrier
    function applySystemLockout() {
        // Prevent duplicates
        if (document.getElementById("nxos-hard-lock")) return;

        const overlay = document.createElement("div");
        overlay.id = "nxos-hard-lock";
        overlay.className = "nxos-ban-overlay";

        overlay.innerHTML = `
            <div class="nxos-ban-box">
                <div class="nxos-ban-title">TERMINAL ACCESS RESTRICTED</div>
                <p class="nxos-ban-msg">
                    You're Banned.<br><br>
                    This hardware configuration or profile identifier has been restricted from accessing the NxOS node matrix.
                </p>
            </div>
        `;

        // Intercept keyboard commands to block anyone trying to inspect element or refresh out of it easily
        window.addEventListener("keydown", (e) => {
            if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
                e.preventDefault();
            }
        });

        document.body.appendChild(overlay);
    }
})();
