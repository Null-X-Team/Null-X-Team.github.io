// auto-save.js (Hybrid Automatic + Manual Engine)
// Protects against overwriting cloud saves with an empty local cache.
(function() {
    const SUPABASE_URL = 'https://sczkzwfcpmngwglbydmu.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjemt6d2ZjcG1uZ3dnbGJ5ZG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMDYxNTksImV4cCI6MjA5Njc4MjE1OX0.0O2pPwasyorT86MmJDoTccIlDKFFwRLoUIEZ_npDUII';

    // Session / UI keys that do NOT count as real game progress
    const NON_PROGRESS_KEYS = new Set([
        'chatUser',
        'selectedTheme',
        'disableStudyCloak',
        'savedCloak',
        'autoLaunchEnabled',
        'autoLaunchEnv',
        'panicKey',
        'panicUrl',
        'panicBlocker',
        'nxos_user_pin'
    ]);

    let lastSavedString = '';
    let exportPaused = false;      // true while empty-cache warning modal is open
    let autoSaveReady = false;     // false until grace period + cloak done
    let autoSaveTimer = null;

    function isEducationalCloakActive() {
        const cloak = document.getElementById('educational-cloak');
        if (!cloak) return false;
        if (localStorage.getItem('disableStudyCloak') === 'true') return false;
        if (cloak.classList.contains('hidden')) return false;
        const style = window.getComputedStyle(cloak);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
        // If it covers the screen and is still in the DOM without hidden, treat as active
        return true;
    }

    function waitForEducationalCloakDone() {
        return new Promise((resolve) => {
            if (!isEducationalCloakActive()) {
                resolve();
                return;
            }

            const cloak = document.getElementById('educational-cloak');
            let settled = false;
            const done = () => {
                if (settled) return;
                settled = true;
                observer.disconnect();
                clearInterval(poll);
                clearTimeout(maxWait);
                resolve();
            };

            const observer = new MutationObserver(() => {
                if (!isEducationalCloakActive()) done();
            });
            if (cloak) {
                observer.observe(cloak, { attributes: true, attributeFilter: ['class', 'style'] });
            }

            const poll = setInterval(() => {
                if (!isEducationalCloakActive()) done();
            }, 250);

            // Safety: never wait forever (cloak is ~10s)
            const maxWait = setTimeout(done, 15000);
        });
    }

    function isProgressCacheEmpty() {
        let progressKeyCount = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key) continue;
            if (NON_PROGRESS_KEYS.has(key)) continue;
            const val = localStorage.getItem(key);
            if (val === null || val === '' || val === '{}' || val === '[]' || val === 'null') continue;
            progressKeyCount++;
        }
        return progressKeyCount === 0;
    }

    function ensureEmptyCacheModal() {
        if (document.getElementById('empty-cache-warning-modal')) return;

        const style = document.createElement('style');
        style.id = 'empty-cache-warning-styles';
        style.textContent = `
            #empty-cache-warning-modal {
                position: fixed; inset: 0; z-index: 2147483646;
                background: rgba(20, 0, 0, 0.92);
                backdrop-filter: blur(10px);
                display: flex; align-items: center; justify-content: center;
                font-family: system-ui, -apple-system, sans-serif;
            }
            #empty-cache-warning-modal.hidden { display: none !important; }
            #empty-cache-warning-modal .ecw-box {
                background: #1a0f0f;
                border: 2px solid #ff4444;
                border-radius: 14px;
                padding: 28px 26px;
                width: min(420px, 92vw);
                text-align: center;
                color: #fff;
                box-shadow: 0 0 50px rgba(255, 68, 68, 0.35);
            }
            #empty-cache-warning-modal .ecw-box h2 {
                color: #ff4444; margin: 0 0 12px; font-size: 1.35rem; letter-spacing: 0.5px;
            }
            #empty-cache-warning-modal .ecw-box p {
                color: #ccc; font-size: 0.92rem; line-height: 1.5; margin: 0 0 18px;
            }
            #empty-cache-warning-modal .ecw-actions {
                display: flex; flex-direction: column; gap: 10px;
            }
            #empty-cache-warning-modal .ecw-btn {
                width: 100%; padding: 12px 16px; border-radius: 8px;
                font-weight: 700; font-size: 0.95rem; cursor: pointer; border: none;
            }
            #empty-cache-warning-modal .ecw-btn-import {
                background: #8b00ff; color: #fff;
            }
            #empty-cache-warning-modal .ecw-btn-import:hover { background: #a033ff; }
            #empty-cache-warning-modal .ecw-btn-dismiss {
                background: transparent; color: #ff8888;
                border: 1px solid rgba(255,68,68,0.45);
            }
            #empty-cache-warning-modal .ecw-btn-dismiss:hover {
                background: rgba(255,68,68,0.12); color: #ffaaaa;
            }
            #empty-cache-warning-modal .ecw-status {
                margin-top: 12px; min-height: 18px; font-size: 0.8rem; font-weight: 600;
            }
        `;
        document.head.appendChild(style);

        const modal = document.createElement('div');
        modal.id = 'empty-cache-warning-modal';
        modal.className = 'hidden';
        modal.innerHTML = `
            <div class="ecw-box" role="dialog" aria-modal="true" aria-labelledby="ecw-title">
                <div style="font-size:42px;line-height:1;margin-bottom:8px;">⚠️</div>
                <h2 id="ecw-title">WARNING</h2>
                <p>
                    <strong style="color:#ff6666;">PLEASE IMPORT YOUR DATA OR YOU WILL LOSE ANY AND ALL PROGRESS.</strong>
                </p>
                <p style="font-size:0.85rem;color:#aaa;">
                    This device's local cache looks empty. Auto-export is paused so an empty save cannot overwrite your cloud backup.
                    Click <strong>Import Save</strong> to restore your progress from the cloud first.
                </p>
                <div class="ecw-actions">
                    <button type="button" class="ecw-btn ecw-btn-import" id="ecw-import-btn">Import Save Now</button>
                    <button type="button" class="ecw-btn ecw-btn-dismiss" id="ecw-dismiss-btn">I understand — continue without importing</button>
                </div>
                <div class="ecw-status" id="ecw-status"></div>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('ecw-import-btn').addEventListener('click', async () => {
            const status = document.getElementById('ecw-status');
            if (status) {
                status.textContent = 'Importing from cloud...';
                status.style.color = '#a033ff';
            }
            await window.cloudLoad('ecw-status', true);
            if (!isProgressCacheEmpty()) {
                hideEmptyCacheWarning();
                if (status) {
                    status.textContent = 'Import complete. Auto-save resumed.';
                    status.style.color = '#00c853';
                }
            } else {
                if (status) {
                    status.textContent = 'Still no progress data found in the cloud for this account.';
                    status.style.color = '#ff8888';
                }
            }
        });

        document.getElementById('ecw-dismiss-btn').addEventListener('click', () => {
            hideEmptyCacheWarning();
        });
    }

    function showEmptyCacheWarning() {
        ensureEmptyCacheModal();
        const modal = document.getElementById('empty-cache-warning-modal');
        if (!modal) return;
        modal.classList.remove('hidden');
        exportPaused = true;
        console.warn('[CloudSync] Export paused — empty local cache warning shown.');
    }

    function hideEmptyCacheWarning() {
        const modal = document.getElementById('empty-cache-warning-modal');
        if (modal) modal.classList.add('hidden');
        exportPaused = false;
        console.log('[CloudSync] Export resumed.');
    }

    // Public helpers for debugging
    window.showEmptyCacheWarning = showEmptyCacheWarning;
    window.isProgressCacheEmpty = isProgressCacheEmpty;
    window.isCloudExportPaused = function() {
        return exportPaused || !autoSaveReady || isEducationalCloakActive();
    };

    // --- CLOUD SAVE ---
    window.cloudSave = async function(statusElementId = null, isManual = false) {
        const loggedInUser = localStorage.getItem('chatUser');
        const statusBox = statusElementId ? document.getElementById(statusElementId) : null;

        if (!loggedInUser) {
            if (isManual) alert('Please log in to back up your data!');
            return;
        }

        // Block while educational overlay is up
        if (isEducationalCloakActive()) {
            if (statusBox) {
                statusBox.textContent = 'Save paused (overlay active)';
                statusBox.style.color = '#888';
            }
            return;
        }

        // Hard stop while warning modal is open
        if (exportPaused) {
            if (statusBox) {
                statusBox.textContent = 'Export paused — import your data first';
                statusBox.style.color = '#ff8888';
            }
            return;
        }

        // Block auto-saves until grace period ends
        if (!isManual && !autoSaveReady) return;

        // Never auto-upload an empty progress cache
        if (!isManual && isProgressCacheEmpty()) {
            if (statusBox) {
                statusBox.textContent = 'Auto-save skipped (empty local cache)';
                statusBox.style.color = '#ffaa00';
            }
            return;
        }

        // Manual export of empty cache → force warning
        if (isManual && isProgressCacheEmpty()) {
            showEmptyCacheWarning();
            if (statusBox) {
                statusBox.textContent = 'Local cache is empty — import first';
                statusBox.style.color = '#ff4444';
            }
            return;
        }

        try {
            let allLocalData = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                allLocalData[key] = localStorage.getItem(key);
            }

            const completeJsonString = JSON.stringify(allLocalData);

            if (!isManual && completeJsonString === lastSavedString) {
                if (statusBox) {
                    statusBox.textContent = 'Cloud synced (No changes)';
                    statusBox.style.color = '#888';
                }
                return;
            }

            if (statusBox) statusBox.textContent = isManual ? 'Packing and uploading data...' : 'Auto-saving to cloud...';

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
                lastSavedString = completeJsonString;
                if (statusBox) {
                    statusBox.textContent = isManual ? 'Backup successful!' : 'Auto-saved successfully!';
                    statusBox.style.color = '#00c853';
                }
            } else {
                throw new Error('Upload failed.');
            }
        } catch (err) {
            console.error('Cloud Save Error:', err);
            if (statusBox) {
                statusBox.textContent = isManual ? 'Upload unsuccessful. Check connection.' : 'Auto-save failed.';
                statusBox.style.color = '#ff4444';
            }
        }
    };

    // --- CLOUD LOAD ---
    window.cloudLoad = async function(statusElementId = null, isManual = false) {
        const loggedInUser = localStorage.getItem('chatUser');
        const statusBox = statusElementId ? document.getElementById(statusElementId) : null;

        if (!loggedInUser) return;
        if (statusBox) statusBox.textContent = 'Syncing cloud data...';

        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/Gamesavedata?username=eq.${encodeURIComponent(loggedInUser)}&select=*`,
                { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
            );
            const data = await response.json();

            if (data && data[0] && data[0].save_string) {
                const cloudBackup = JSON.parse(data[0].save_string);

                Object.keys(cloudBackup).forEach(key => {
                    localStorage.setItem(key, cloudBackup[key]);
                });

                localStorage.setItem('chatUser', loggedInUser);
                lastSavedString = data[0].save_string;

                if (statusBox) {
                    statusBox.textContent = isManual ? 'All data successfully restored from cloud!' : 'Cloud data synced!';
                    statusBox.style.color = '#00c853';
                }
            } else {
                if (statusBox) {
                    statusBox.textContent = 'ℹ️ No cloud save found. Ready for your first backup!';
                    statusBox.style.color = '#aaa';
                }
            }
        } catch (err) {
            console.error('Cloud Load Error:', err);
            if (statusBox) {
                statusBox.textContent = '❌ Sync failed.';
                statusBox.style.color = '#ff4444';
            }
        }
    };

    function interceptSignOut() {
        const btn = document.getElementById('signInBtn');
        if (!btn || btn.dataset.ecwHooked === '1') return;
        btn.dataset.ecwHooked = '1';

        btn.addEventListener('click', function onSignOutClick(e) {
            const user = localStorage.getItem('chatUser');
            if (!user) return;

            if (isProgressCacheEmpty()) {
                e.preventDefault();
                e.stopImmediatePropagation();
                showEmptyCacheWarning();
                const status = document.getElementById('dashboard-sync-msg');
                if (status) {
                    status.textContent = 'Import before signing out';
                    status.style.color = '#ff4444';
                }
            }
        }, true);
    }

    // --- STARTUP ---
    document.addEventListener('DOMContentLoaded', async () => {
        interceptSignOut();
        ensureEmptyCacheModal(); // build DOM early so it exists

        // Never save while educational overlay is running
        // Wait for it to finish before load/check/autosave
        console.log('[CloudSync] Waiting for educational overlay...');
        await waitForEducationalCloakDone();
        console.log('[CloudSync] Educational overlay done.');

        // Pull cloud data after overlay
        await window.cloudLoad('dashboard-sync-msg', false);

        // Show warning only after overlay, if still empty
        if (localStorage.getItem('chatUser') && isProgressCacheEmpty()) {
            showEmptyCacheWarning();
        }

        // Extra 5s grace after overlay before auto-save starts
        setTimeout(() => {
            autoSaveReady = true;
            console.log('[CloudSync] Auto-save enabled.');

            if (autoSaveTimer) clearInterval(autoSaveTimer);
            autoSaveTimer = setInterval(() => {
                if (isEducationalCloakActive() || exportPaused) return;
                window.cloudSave('dashboard-sync-msg', false);
            }, 30000);
        }, 5000);
    });

    window.addEventListener('beforeunload', () => {
        if (exportPaused || !autoSaveReady || isEducationalCloakActive() || isProgressCacheEmpty()) return;
        window.cloudSave(null, false);
    });
})();
