const SUPABASE_URL = 'https://ukwjojxutcjkvabnybtj.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrd2pvanh1dGNqa3ZhYm55YnRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyNzk5NDAsImV4cCI6MjA5Mzg1NTk0MH0.iLr9OrIZlRBrbcI1XDE0zl7t_wpwVg3ko3DgppxbUh8';

const DEFAULT_PFP = 'https://Glaxyias.github.io/imgs/download.jpeg';

document.addEventListener('DOMContentLoaded', async () => {
    const user = localStorage.getItem('chatUser');
    if (!user) { window.location.href = "../Login/login.html"; return; }

    document.getElementById('display-username').textContent = user;
    document.getElementById('info-username').textContent = user;

    const pfpPreview = document.getElementById('pfp-preview');
    const pfpUrlInput = document.getElementById('pfp-url-input');
    const bioInput = document.getElementById('bio-input');
    const statusEl = document.getElementById('save-status');

    // --- 1. LOAD EXISTING PROFILE ---
    const loadProfile = async () => {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?username=eq.${encodeURIComponent(user)}&select=*`, {
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
            });
            const data = await response.json();

            if (data && data[0]) {
                const profile = data[0];
                
                if (profile.bio) bioInput.value = profile.bio;
                
                if (profile.pfp_url) {
                    pfpPreview.src = profile.pfp_url;
                    pfpUrlInput.value = profile.pfp_url;
                } else {
                    pfpPreview.src = DEFAULT_PFP;
                }
                
                if (profile.created_at) {
                    const joined = new Date(profile.created_at).toLocaleDateString();
                    document.getElementById('join-date').textContent = joined;
                }
            }
        } catch (err) { 
            console.error("Error loading profile:", err); 
        }
    };

    // --- 2. LIVE AVATAR PREVIEW ---
    pfpUrlInput.addEventListener('input', () => {
        const urlValue = pfpUrlInput.value.trim();
        pfpPreview.src = urlValue ? urlValue : DEFAULT_PFP;
    });

    // --- 3. SAVE PROFILE DATA ---
    document.getElementById('save-profile-btn').onclick = async () => {
        const bio = bioInput.value;
        const pfpUrl = pfpUrlInput.value.trim();

        statusEl.textContent = "Saving...";
        statusEl.style.color = "white";

        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?username=eq.${encodeURIComponent(user)}`, {
                method: 'PATCH',
                headers: { 
                    'apikey': SUPABASE_KEY, 
                    'Authorization': `Bearer ${SUPABASE_KEY}`, 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ 
                    bio: bio, 
                    pfp_url: pfpUrl || DEFAULT_PFP
                })
            });

            if (response.ok) {
                statusEl.textContent = "Profile Updated Successfully!";
                statusEl.style.color = "#00c853";
            } else {
                throw new Error("Database rejected update request.");
            }
        } catch (err) {
            statusEl.textContent = "Error saving profile. Try again.";
            statusEl.style.color = "#ff4444";
            console.error(err);
        }
    };

    loadProfile();
});
