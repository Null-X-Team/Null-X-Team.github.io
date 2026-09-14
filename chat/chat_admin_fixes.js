// FIXED ADMIN BAN/WARN FUNCTIONS
// Place these in chat.js to replace the broken versions

// FIXED adminExecute function
window.adminExecute = async (action) => {
    let target = document.getElementById(action === 'warn' ? 'warn-search' : 'ban-search').value.trim();
    const reason = document.getElementById(action === 'warn' ? 'warn-reason' : 'ban-reason').value.trim();
    const cat = document.getElementById('ban-category')?.value || 'Both';

    if (!target) return alert("Enter a username.");
    if (target.startsWith('@')) target = target.substring(1);

    try {
        // Step 1: Fetch the user-role record to get the ID
        const getRes = await fetch(`${TURSO_API_BASE}/user-roles?username=${encodeURIComponent(target)}`, {
            headers: TURSO_HEADERS
        });
        if (!getRes.ok) throw new Error('User role not found');
        const userRoleData = await getRes.json();
        
        // Handle array response
        const roleRecord = Array.isArray(userRoleData) ? userRoleData[0] : userRoleData;
        if (!roleRecord || !roleRecord.id) throw new Error('Could not find user role record with ID');

        // Step 2: Prepare update data with ID
        let data = { 
            id: roleRecord.id,
            last_action_reason: reason, 
            last_action_type: action, 
            last_action_category: cat 
        };
        
        if (action === 'ban') { 
            data.is_banned = 1; 
        } else if (action === 'unban') { 
            data.is_banned = 0; 
            data.warned = 0; 
            data.temp_ban_until = null; 
        } else if (action === 'warn') { 
            data.warned = 1; 
        }

        // Step 3: PATCH with the correct data
        const patchRes = await fetch(`${TURSO_API_BASE}/user-roles`, {
            method: 'PATCH',
            headers: TURSO_HEADERS,
            body: JSON.stringify(data)
        });
        
        if (!patchRes.ok) {
            const errText = await patchRes.text();
            throw new Error('API error: ' + errText);
        }
        
        alert(`✓ ${action.charAt(0).toUpperCase() + action.slice(1)} applied to ${target}!`);
        fetchAllUsers();
        
        // Clear input fields
        if (action === 'warn') {
            document.getElementById('warn-search').value = '';
            document.getElementById('warn-reason').value = '';
        } else {
            document.getElementById('ban-search').value = '';
            document.getElementById('ban-reason').value = '';
        }
        
    } catch (err) {
        console.error("Admin action failed:", err);
        alert("Failed to " + action + " user: " + err.message);
    }
};

// FIXED executeTempBan function
window.executeTempBan = async () => {
    let target = document.getElementById('temp-ban-search').value.trim();
    if (target.startsWith('@')) target = target.substring(1);
    if (!target) return alert("Enter a username.");
    
    const durationInput = document.getElementById('temp-ban-duration').value;
    const duration = parseInt(durationInput);
    if (isNaN(duration) || duration <= 0) return alert("Please enter a valid number of minutes for the ban duration!");
    
    const reason = document.getElementById('temp-ban-reason').value.trim();
    const expiry = new Date(); 
    expiry.setMinutes(expiry.getMinutes() + duration);

    try {
        // Step 1: Get the user role ID
        const getRes = await fetch(`${TURSO_API_BASE}/user-roles?username=${encodeURIComponent(target)}`, {
            headers: TURSO_HEADERS
        });
        if (!getRes.ok) throw new Error('User role not found');
        const userRoleData = await getRes.json();
        
        const roleRecord = Array.isArray(userRoleData) ? userRoleData[0] : userRoleData;
        if (!roleRecord || !roleRecord.id) throw new Error('Could not find user role record');

        // Step 2: PATCH with temp ban
        const res = await fetch(`${TURSO_API_BASE}/user-roles`, {
            method: 'PATCH',
            headers: TURSO_HEADERS,
            body: JSON.stringify({ 
                id: roleRecord.id,
                last_action_type: 'temp_ban', 
                last_action_reason: reason, 
                temp_ban_until: expiry.toISOString() 
            })
        });
        if (!res.ok) throw new Error(await res.text());
        
        alert(`✓ Temporary ban applied to ${target} for ${duration} minutes!`);
        
        // Clear inputs
        document.getElementById('temp-ban-search').value = '';
        document.getElementById('temp-ban-duration').value = '';
        document.getElementById('temp-ban-reason').value = '';
        
        fetchAllUsers();
    } catch (err) {
        console.error("Temp ban failed:", err);
        alert("Failed to apply temporary ban: " + err.message);
    }
};

// FIXED quickAdminAction function
window.quickAdminAction = async (action, username) => {
    let reason = "";
    if (action === 'warn' || action === 'ban') {
        reason = prompt(`Reason for ${action === 'warn' ? 'warning' : 'banning'} ${username}:`, "") || "";
        if (reason === null) return;
    }
    if ((action === 'promote' || action === 'demote') && !confirm(`${action === 'promote' ? 'Grant' : 'Remove'} admin privileges for ${username}?`)) return;

    try {
        // Fetch the user role record to get ID
        const getRes = await fetch(`${TURSO_API_BASE}/user-roles?username=${encodeURIComponent(username)}`, {
            headers: TURSO_HEADERS
        });
        if (!getRes.ok) throw new Error('User not found');
        const userRoleData = await getRes.json();
        
        const roleRecord = Array.isArray(userRoleData) ? userRoleData[0] : userRoleData;
        if (!roleRecord || !roleRecord.id) throw new Error('Could not find user role');

        // Prepare data
        let data = { 
            id: roleRecord.id,
            last_action_reason: reason, 
            last_action_type: action 
        };
        
        if (action === 'ban') data.is_banned = 1;
        else if (action === 'unban') { 
            data.is_banned = 0; 
            data.warned = 0; 
            data.temp_ban_until = null; 
        }
        else if (action === 'warn') data.warned = 1;
        else if (action === 'promote') data.is_admin = 1;
        else if (action === 'demote') data.is_admin = 0;

        // PATCH
        const res = await fetch(`${TURSO_API_BASE}/user-roles`, {
            method: 'PATCH',
            headers: TURSO_HEADERS,
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(await res.text());

        // Update local cache
        const target = allUsers.find(u => u.username === username);
        if (target) {
            if (action === 'ban') target.is_banned = true;
            if (action === 'unban') target.is_banned = false;
            if (action === 'warn') target.warned = true;
            if (action === 'promote') target.is_admin = true;
            if (action === 'demote') target.is_admin = false;
        }
        
        alert(`✓ ${action.charAt(0).toUpperCase() + action.slice(1)} completed for ${username}!`);
        renderAdminStats();
        renderAdminUserTable(document.getElementById('admin-quick-search')?.value || "");
    } catch (err) {
        console.error("Quick action failed:", err);
        alert("Action failed: " + err.message);
    }
};
