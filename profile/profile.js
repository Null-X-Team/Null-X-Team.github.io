const SUPABASE_URL = 'https://ldojzaikkolrxkiwyqvq.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkb2p6YWlra29scnhraXd5cXZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMDM2NjksImV4cCI6MjA5NDg3OTY2OX0.CXZf1jaNJ3njQhIWoaYFxuJWx2J0HQ9CPF5imQoxtMw'; 

const DEFAULT_PFP = 'https://Glaxyias.github.io/imgs/download.jpeg';

document.addEventListener('DOMContentLoaded', async () => {
    const loggedInUser = localStorage.getItem('chatUser');
    if (!loggedInUser) { window.location.href = "../Login/login.html"; return; }

    // 🔥 URL Parser: Check if we are viewing someone else or our own profile settings
    const urlParams = new URLSearchParams(window.location.search);
    const targetUser = urlParams.get('user') || loggedInUser;
    const isOwnProfile = (targetUser.toLowerCase() === loggedInUser.toLowerCase());

    document.getElementById('display-username').textContent = targetUser;
    document.getElementById('info-username').textContent = targetUser;

    const pfpPreview = document.getElementById('pfp-preview');
    const pfpUrlInput = document.getElementById('pfp-url-input');
    const bioInput = document.getElementById('bio-input');
    const saveBtn = document.getElementById('save-profile-btn');
    const statusEl = document.getElementById('save-status');

    // Hide editing elements if viewing another user's bio card
    if (!isOwnProfile) {
        if(pfpUrlInput) pfpUrlInput.style.display = 'none';
        if(saveBtn) saveBtn.style.display = 'none';
        bioInput.setAttribute('readonly', 'true');
        bioInput.style.background = '#111';
        bioInput.style.borderColor = '#222';
    }

    const loadProfile = async () => {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?username=eq.${encodeURIComponent(targetUser)}&select=*`, {
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
            });
            const data = await response.json();

            if (data && data[0]) {
                const profile = data[0];
                
                if (profile.bio) bioInput.value = profile.bio;
                
                if (profile.pfp_url) {
                    pfpPreview.src = profile.pfp_url;
                    if(pfpUrlInput) pfpUrlInput.value = profile.pfp_url;
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

    if (isOwnProfile && pfpUrlInput) {
        pfpUrlInput.addEventListener('input', () => {
            const urlValue = pfpUrlInput.value.trim();
            pfpPreview.src = urlValue ? urlValue : DEFAULT_PFP;
        });
    }

    if (isOwnProfile && saveBtn) {
        saveBtn.onclick = async () => {
            const bio = bioInput.value;
            const pfpUrl = pfpUrlInput.value.trim();

            statusEl.textContent = "Saving...";
            statusEl.style.color = "white";

            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?username=eq.${encodeURIComponent(loggedInUser)}`, {
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
    }

    loadProfile();
});
