// profile/profile.js

const SUPABASE_URL = 'https://ldojzaikkolrxkiwyqvq.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkb2p6YWlra29scnhraXd5cXZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMDM2NjksImV4cCI6MjA5NDg3OTY2OX0.CXZf1jaNJ3njQhIWoaYFxuJWx2J0HQ9CPF5imQoxtMw'; 

const DEFAULT_PFP = 'https://Glaxyias.github.io/imgs/download.jpeg';

// Global headers mapping
const SUPABASE_HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
};

window.initProfileSystem = async () => {
    const loggedInUser = localStorage.getItem('chatUser');
    if (!loggedInUser) { 
        window.location.href = "../Login/login.html"; 
        return; 
    }

    // Parse URL parameters to determine if we are looking at our own card or an external profile
    const urlParams = new URLSearchParams(window.location.search);
    const targetUser = urlParams.get('user') || loggedInUser;
    const isOwnProfile = (targetUser.toLowerCase().trim() === loggedInUser.toLowerCase().trim());

    // Map UI layout fields
    const displayUsername = document.getElementById('display-username');
    const infoUsername = document.getElementById('info-username');
    
    if (displayUsername) displayUsername.value = targetUser;
    if (infoUsername) infoUsername.textContent = targetUser;

    const pfpPreview = document.getElementById('pfp-preview');
    const pfpFileInput = document.getElementById('pfp-file-input');
    const uploadSection = document.querySelector('.upload-section'); 
    const bioInput = document.getElementById('bio-input');
    const saveBtn = document.getElementById('save-profile-btn');
    const statusEl = document.getElementById('save-status');

    let uploadedImageDataUrl = "";

    // Lock interactive fields down if this profile does not belong to the logged-in session user
    if (!isOwnProfile) {
        if (uploadSection) uploadSection.style.display = 'none';
        if (saveBtn) saveBtn.style.display = 'none';
        if (bioInput) {
            bioInput.setAttribute('readonly', 'true');
            bioInput.style.background = '#111';
            bioInput.style.borderColor = '#222';
        }
    }

    // --- FETCH CURRENT USER INFORMATION ---
    const loadProfile = async () => {
        try {
            // 1. Fetch profile details (Bio, PFP, Admin status) from user_roles
            const response = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?username=ilike.${encodeURIComponent(targetUser)}&select=*`, {
                headers: SUPABASE_HEADERS
            });
            const data = await response.json();

            // 2. Fetch the join date from the original users table!
            const userResponse = await fetch(`${SUPABASE_URL}/rest/v1/users?username=ilike.${encodeURIComponent(targetUser)}&select=created_at`, {
                headers: SUPABASE_HEADERS
            });
            const userData = await userResponse.json();

            if (data && data[0]) {
                const profile = data[0];
                
                // Set the bio field value if it exists in the row
                if (profile.bio && bioInput) {
                    bioInput.value = profile.bio;
                }
                
                // Map the profile picture URL
                if (profile.pfp_url && pfpPreview) {
                    pfpPreview.src = profile.pfp_url;
                    uploadedImageDataUrl = profile.pfp_url; 
                } else if (pfpPreview) {
                    pfpPreview.src = DEFAULT_PFP;
                }
                
                // Map joining metadata using our SECOND fetch result (userData)
                if (userData && userData[0] && userData[0].created_at) {
                    const joined = new Date(userData[0].created_at).toLocaleDateString(undefined, { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    });
                    const joinDateEl = document.getElementById('join-date');
                    if (joinDateEl) joinDateEl.textContent = joined;
                }

                // Show admin panels if looking at another user account card
                if (!isOwnProfile) {
                    checkAndSetupAdminControls(profile.is_admin);
                }
            }
        } catch (err) { 
            console.error("Error loading profile details:", err); 
        }
    };

    // --- ADMINISTRATIVE CAPABILITIES MANAGER ---
    const checkAndSetupAdminControls = async (targetUserIsAdmin) => {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?username=ilike.${encodeURIComponent(loggedInUser)}&select=is_admin`, {
                headers: SUPABASE_HEADERS
            });
            const data = await response.json();

            if (data && data[0] && data[0].is_admin === true) {
                const adminContainer = document.getElementById('admin-actions-container');
                const adminBtn = document.getElementById('toggle-admin-btn');

                if (adminContainer && adminBtn) {
                    adminContainer.style.display = 'block';
                    updateAdminButtonUI(targetUserIsAdmin);

                    adminBtn.onclick = async () => {
                        const currentIsAdmin = adminBtn.getAttribute('data-is-admin') === 'true';
                        const newAdminStatus = !currentIsAdmin;
                        const newRoleTag = newAdminStatus ? 'ADMIN' : 'User';

                        adminBtn.textContent = "Updating...";
                        adminBtn.disabled = true;

                        const updateResponse = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?username=ilike.${encodeURIComponent(targetUser)}`, {
                            method: 'PATCH',
                            headers: SUPABASE_HEADERS,
                            body: JSON.stringify({ 
                                is_admin: newAdminStatus,
                                role_tag: newRoleTag 
                            })
                        });

                        adminBtn.disabled = false;

                        if (updateResponse.ok) {
                            updateAdminButtonUI(newAdminStatus);
                        } else {
                            alert("Failed to modify database permissions.");
                            updateAdminButtonUI(currentIsAdmin);
                        }
                    };
                }
            }
        } catch (err) {
            console.error("Error configuring admin systems:", err);
        }
    };

    const updateAdminButtonUI = (isAdmin) => {
        const adminBtn = document.getElementById('toggle-admin-btn');
        if (!adminBtn) return;
        
        adminBtn.setAttribute('data-is-admin', isAdmin);
        if (isAdmin) {
            adminBtn.textContent = 'Revoke Admin Status';
            adminBtn.style.background = '#333333';
        } else {
            adminBtn.textContent = 'Give Admin Status';
            adminBtn.style.background = '#ff4444';
        }
    };

    // --- FILE INTERCEPT DATA WRAPPER ROUTINE ---
    if (isOwnProfile && pfpFileInput) {
        pfpFileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            
            if (file) {
                if (file.size > 2 * 1024 * 1024) {
                    alert("This image is too large! Please choose an image under 2MB.");
                    pfpFileInput.value = ""; 
                    return;
                }

                const reader = new FileReader();
                reader.onload = function(e) {
                    uploadedImageDataUrl = e.target.result; 
                    if (pfpPreview) pfpPreview.src = uploadedImageDataUrl; 
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- COMMITTING UPDATES TO SUPABASE ---
    if (isOwnProfile && saveBtn) {
        saveBtn.onclick = async () => {
            const bio = bioInput ? bioInput.value : "";
            const finalPfp = uploadedImageDataUrl || DEFAULT_PFP;

            if (statusEl) {
                statusEl.textContent = "Saving...";
                statusEl.style.color = "#b3a1cf";
            }

            try {
                // We use a PATCH request to specifically update the row matching the logged-in user
                const response = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?username=eq.${encodeURIComponent(loggedInUser)}`, {
                    method: 'PATCH',
                    headers: SUPABASE_HEADERS,
                    body: JSON.stringify({ 
                        bio: bio, 
                        pfp_url: finalPfp
                    })
                });

                if (response.ok) {
                    if (statusEl) {
                        statusEl.textContent = "Profile Updated Successfully!";
                        statusEl.style.color = "#00ff66";
                        setTimeout(() => { statusEl.textContent = ""; }, 3000);
                    }
                    // We don't need to loadProfile() again unless we want to, but it's safe to keep
                    loadProfile(); 
                } else {
                    const errorDetails = await response.json().catch(() => ({}));
                    console.error("Database feedback:", errorDetails);
                    throw new Error("Database refused transaction.");
                }
            } catch (err) {
                if (statusEl) {
                    statusEl.textContent = "Error saving profile. Try again.";
                    statusEl.style.color = "#ff4a4a";
                }
                console.error(err);
            }
        };
    }

    loadProfile();
};

// Run the script immediately when it is loaded
window.initProfileSystem();
