// auto-save.js (Hybrid Automatic + Manual Engine)
(function() {
    const SUPABASE_URL = 'https://sczkzwfcpmngwglbydmu.supabase.co'; 
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjemt6d2ZjcG1uZ3dnbGJ5ZG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMDYxNTksImV4cCI6MjA5Njc4MjE1OX0.0O2pPwasyorT86MmJDoTccIlDKFFwRLoUIEZ_npDUII'; 

    let lastSavedString = ""; // Stores local state cache to avoid unnecessary DB uploads

    // --- CLOUD SAVE (Handles Manual Clicks + Background Auto-Saves) ---
    window.cloudSave = async function(statusElementId = null, isManual = false) {
        const loggedInUser = localStorage.getItem('chatUser');
        const statusBox = statusElementId ? document.getElementById(statusElementId) : null;
        
        if (!loggedInUser) {
            if (isManual) alert("Please log in to back up your data!");
            return;
        }

        try {
            // Collect all current localStorage key-values
            let allLocalData = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                allLocalData[key] = localStorage.getItem(key);
            }

            const completeJsonString = JSON.stringify(allLocalData);

            // Skip auto-save if nothing has changed (Unless clicked manually)
            if (!isManual && completeJsonString === lastSavedString) {
                if (statusBox) {
                    statusBox.textContent = "Cloud synced (No changes)";
                    statusBox.style.color = "#888";
                }
                return;
            }

            if (statusBox) statusBox.textContent = isManual ? "Packing and uploading data..." : "Auto-saving to cloud...";

            const response = await fetch(`${SUPABASE_URL}/rest/v1/Gamesavedata`, {
                method: 'POST',
                headers: { 
                    'apikey': SUPABASE_KEY, 
                    'Authorization': `Bearer ${SUPABASE_KEY}`, 
                    'Content-Type': 'application/json',
                    'Prefer': 'resolution=merge-duplicates' 
                },
                body: JSON.stringify({ 
                    username: loggedInUser, 
                    save_string: completeJsonString,
                    updated_at: new Date().toISOString()
                })
            });

            if (response.ok) {
                lastSavedString = completeJsonString; // Update cache
                if (statusBox) {
                    statusBox.textContent = isManual ? "Backup successful!" : "Auto-saved successfully!";
                    statusBox.style.color = "#00c853";
                }
            } else {
                throw new Error("Upload failed.");
            }
        } catch (err) {
            console.error("Cloud Save Error:", err);
            if (statusBox) {
                statusBox.textContent = isManual ? "Upload unsuccessful. Check connection." : "Auto-save failed.";
                statusBox.style.color = "#ff4444";
            }
        }
    };

    // --- CLOUD LOAD (Handles Manual Downloads + Startup Sync) ---
    window.cloudLoad = async function(statusElementId = null, isManual = false) {
        const loggedInUser = localStorage.getItem('chatUser');
        const statusBox = statusElementId ? document.getElementById(statusElementId) : null;

        if (!loggedInUser) return;
        if (statusBox) statusBox.textContent = "Syncing cloud data...";

        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/Gamesavedata?username=eq.${encodeURIComponent(loggedInUser)}&select=*`, {
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
            });
            const data = await response.json();

            if (data && data[0] && data[0].save_string) {
                const cloudBackup = JSON.parse(data[0].save_string);

                // Restore items into local storage
                Object.keys(cloudBackup).forEach(key => {
                    localStorage.setItem(key, cloudBackup[key]);
                });
                
                localStorage.setItem('chatUser', loggedInUser); // Keep current session
                lastSavedString = data[0].save_string; // Cache save state
                
                if (statusBox) {
                    statusBox.textContent = isManual ? "All data successfully restored from cloud!" : "Cloud data synced!";
                    statusBox.style.color = "#00c853";
                }
            } else {
                if (statusBox) {
                    statusBox.textContent = "ℹ️ No cloud save found. Ready for your first backup!";
                    statusBox.style.color = "#aaa";
                }
            }
        } catch (err) {
            console.error("Cloud Load Error:", err);
            if (statusBox) {
                statusBox.textContent = "❌ Sync failed.";
                statusBox.style.color = "#ff4444";
            }
        }
    };

    // --- AUTOMATIC TIMERS & EVENT LISTENERS ---
    document.addEventListener('DOMContentLoaded', async () => {
        // 1. Automatically fetch cloud save when page opens
        await window.cloudLoad('dashboard-sync-msg', false);

        // 2. Automatically save every 30 seconds in the background
        setInterval(() => {
            window.cloudSave('dashboard-sync-msg', false);
        }, 30000);
    });

    // 3. Emergency backup right before tab/browser closes
    window.addEventListener('beforeunload', () => {
        window.cloudSave(null, false);
    });

})();
