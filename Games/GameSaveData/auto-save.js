// auto-save.js
(function() {
    const SUPABASE_URL = 'https://sczkzwfcpmngwglbydmu.supabase.co'; 
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjemt6d2ZjcG1uZ3dnbGJ5ZG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMDYxNTksImV4cCI6MjA5Njc4MjE1OX0.0O2pPwasyorT86MmJDoTccIlDKFFwRLoUIEZ_npDUII'; 

    const loggedInUser = localStorage.getItem('chatUser');
    
    if (!loggedInUser) {
        console.log("⚠️ Global Cloud Saver: No active user session found. Auto-save idle.");
        return;
    }

    console.log(`✅ Global Cloud Saver Active! Tracking player: ${loggedInUser}`);

    // --- THE 5-SECOND AUTOMATIC UPLOAD FUNCTION ---
    async function saveGameDataCloud() {
        try {
            // 1. Pack EVERYTHING currently inside local storage into a snapshot object
            let allLocalData = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                allLocalData[key] = localStorage.getItem(key);
            }

            const completeJsonString = JSON.stringify(allLocalData);

            // 2. Fire the object straight to Supabase
            await fetch(`${SUPABASE_URL}/rest/v1/Gamesavedata`, {
                method: 'POST',
                headers: { 
                    'apikey': SUPABASE_KEY, 
                    'Authorization': `Bearer ${SUPABASE_KEY}`, 
                    'Content-Type': 'application/json',
                    'Prefer': 'resolution=merge-duplicates' // Overwrites old rows smoothly
                },
                body: JSON.stringify({ 
                    username: loggedInUser, 
                    save_string: completeJsonString,
                    updated_at: new Date().toISOString()
                })
            });

            console.log("☁️ Global Auto-Save: Sync successful.");
        } catch (err) {
            console.error("☁️ Global Auto-Save Error:", err);
        }
    }

    // Start backing up immediately, then repeat every 5 seconds (5000ms)
    saveGameDataCloud();
    setInterval(saveGameDataCloud, 5000);
})();
