// profile/profile.js

const SUPABASE_URL = 'https://ldojzaikkolrxkiwyqvq.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkb2p6YWlra29scnhraXd5cXZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMDM2NjksImV4cCI6MjA5NDg3OTY2OX0.CXZf1jaNJ3njQhIWoaYFxuJWx2J0HQ9CPF5imQoxtMw'; 

const DEFAULT_PFP = 'https://Glaxyias.github.io/imgs/download.jpeg';

document.addEventListener('DOMContentLoaded', async () => {
    const loggedInUser = localStorage.getItem('chatUser');
    if (!loggedInUser) { window.location.href = "../Login/login.html"; return; }

    // URL Parser: Check if we are viewing someone else or our own profile settings
    const urlParams = new URLSearchParams(window.location.search);
    const targetUser = urlParams.get('user') || loggedInUser;
    const isOwnProfile = (targetUser.toLowerCase() === loggedInUser.toLowerCase());

    document.getElementById('display-username').textContent = targetUser;
    document.getElementById('info-username').textContent = targetUser;

    const pfpPreview = document.getElementById('pfp-preview');
    const pfpFileInput = document.getElementById('pfp-file-input');
    const uploadWrapper = document.getElementById('upload-wrapper');
    const bioInput = document.getElementById('bio-input');
    const saveBtn = document.getElementById('save-profile-btn');
    const statusEl = document.getElementById('save-status');

    // Holds updated base64 image data strings securely across actions
    let uploadedImageDataUrl = "";

    // Hide editing elements if viewing another user's bio card
    if (!isOwnProfile) {
        if(uploadWrapper) uploadWrapper.style.display = 'none';
        if(saveBtn) saveBtn.style.display = 'none';
        bioInput.setAttribute('readonly', 'true');
        bioInput.style.background = '#111';
        bioInput.style.borderColor = '#222';
    }

    // Load user bio profile properties data values from remote api table schema rows
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
                    uploadedImageDataUrl = profile.pfp_url; // Set baseline reference
                } else {
                    pfpPreview.src = DEFAULT_PFP;
                }
                
                if (profile.created_at) {
                    const joined = new Date(profile.created_at).toLocaleDateString();
                    document.getElementById('join-date').textContent = joined;
                }

                // Check and show admin controls if looking at someone else's profile
                if (!isOwnProfile) {
                    checkAndSetupAdminControls(profile.is_admin);
                }
            }
        } catch (err) { 
            console.error("Error loading profile:", err); 
        }
    };

    // Verifies if the viewer holds admin privileges and displays the action layout components
    const checkAndSetupAdminControls = async (targetUserIsAdmin) => {
        try {
            // Fetch the logged-in viewer's boolean flag from user_roles
            const response = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?username=eq.${encodeURIComponent(loggedInUser)}&select=is_admin`, {
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
            });
            const data = await response.json();

            // Check if current viewer has authorization access enabled (is_admin is true)
            if (data && data[0] && data[0].is_admin === true) {
                const adminContainer = document.getElementById('admin-actions-container');
                const adminBtn = document.getElementById('toggle-admin-btn');

                if (adminContainer && adminBtn) {
                    adminContainer.style.display = 'block';
                    updateAdminButtonUI(targetUserIsAdmin);

                    adminBtn.onclick = async () => {
                        const currentIsAdmin = adminBtn.getAttribute('data-is-admin') === 'true';
                        const newAdminStatus = !currentIsAdmin;
                        
                        // Automatically flip role_tag label alongside your authorization flag
                        const newRoleTag = newAdminStatus ? 'ADMIN' : 'User';

                        adminBtn.textContent = "Updating...";
                        adminBtn.disabled = true;

                        const updateResponse = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?username=eq.${encodeURIComponent(targetUser)}`, {
                            method: 'PATCH',
                            headers: { 
                                'apikey': SUPABASE_KEY, 
                                'Authorization': `Bearer ${SUPABASE_KEY}`, 
                                'Content-Type': 'application/json' 
                            },
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
            console.error("Error setting up admin controls:", err);
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

    // Monitor input changes to file-uploads to convert chosen desktop images immediately
    if (isOwnProfile && pfpFileInput) {
        pfpFileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            
            if (file) {
                // Safeguard against large structural file conversions slowing database synchronization down
                if (file.size > 2 * 1024 * 1024) {
                    alert("This image is too large! Please select an image under 2MB.");
                    pfpFileInput.value = ""; 
                    return;
                }

                const reader = new FileReader();

                reader.onload = function(e) {
                    uploadedImageDataUrl = e.target.result; // Encodes directly to raw string layout
                    pfpPreview.src = uploadedImageDataUrl;  // Refreshes view element instantly
                };

                reader.readAsDataURL(file);
            }
        });
    }

    // Process patches data uploads back into your hosted live backend data table
    if (isOwnProfile && saveBtn) {
        saveBtn.onclick = async () => {
            const bio = bioInput.value;
            // Keeps current base64 data string, fallback to default profile image template route
            const finalPfp = uploadedImageDataUrl || DEFAULT_PFP;

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
                        pfp_url: finalPfp
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
