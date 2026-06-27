// auto-save.js (Manual Mode Engine)
(function() {
    const SUPABASE_URL = 'https://sczkzwfcpmngwglbydmu.supabase.co'; 
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjemt6d2ZjcG1uZ3dnbGJ5ZG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMDYxNTksImV4cCI6MjA5Njc4MjE1OX0.0O2pPwasyorT86MmJDoTccIlDKFFwRLoUIEZ_npDUII'; 

    // --- MANUAL BACKUP: UPLOAD EVERYTHING ---
    window.cloudSave = async function(statusElementId) {
        const loggedInUser = localStorage.getItem('chatUser');
        const statusBox = document.getElementById(statusElementId);
        
        if (!loggedInUser) {
            alert("Please log in to back up your data!");
            return;
        }

        if (statusBox) statusBox.textContent = "Packing and uploading data...";

        try {
            let allLocalData = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                allLocalData[key] = localStorage.getItem(key);
            }

            const completeJsonString = JSON.stringify(allLocalData);

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
                if (statusBox) {
                    statusBox.textContent = "Backup successful";
                    statusBox.style.color = "#00c853";
                }
            } else {
                throw new Error("Upload failed.");
            }
        } catch (err) {
            console.error(err);
            if (statusBox) {
                statusBox.textContent = "Upload unsuccessful. Check connection.";
                statusBox.style.color = "#ff4444";
            }
        }
    };

    // --- MANUAL RESTORE: DOWNLOAD EVERYTHING ---
    window.cloudLoad = async function(statusElementId) {
        const loggedInUser = localStorage.getItem('chatUser');
        const statusBox = document.getElementById(statusElementId);

        if (!loggedInUser) return;
        if (statusBox) statusBox.textContent = "Syncing cloud data...";

        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/Gamesavedata?username=eq.${encodeURIComponent(loggedInUser)}&select=*`, {
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
            });
            const data = await response.json();

            if (data && data[0] && data[0].save_string) {
                const cloudBackup = JSON.parse(data[0].save_string);

                Object.keys(cloudBackup).forEach(key => {
                    localStorage.setItem(key, cloudBackup[key]);
                });
                
                localStorage.setItem('chatUser', loggedInUser); // Keep logged in
                
                if (statusBox) {
                    statusBox.textContent = "All data successfully restored from cloud!";
                    statusBox.style.color = "#00c853";
                }
            } else {
                if (statusBox) {
                    statusBox.textContent = "ℹ️ No cloud save found. Ready for your first backup!";
                    statusBox.style.color = "#aaa";
                }
            }
        } catch (err) {
            console.error(err);
            if (statusBox) {
                statusBox.textContent = "❌ Sync failed.";
                statusBox.style.color = "#ff4444";
            }
        }
    };
})();
