// auto-save.js
// Cloud-save engine with mandatory import-before-save protection.
//
// Rule:
// A user account may never upload until an import attempt for that exact
// account has finished. This prevents a fresh/empty local cache from
// overwriting a cloud backup immediately after sign-in.

(function () {
    // Turso via Vercel serverless API (replaces Supabase)
    const TURSO_API_BASE = 'https://null-x-team-github-io.vercel.app/api';

    // Keys that identify a session/UI preference, but are not actual game progress.
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
    let exportPaused = false;
    let autoSaveReady = false;
    let autoSaveTimer = null;

    /*
     * Import gate state.
     *
     * importReadyForUser:
     *   The account for which a cloud-import attempt has fully completed.
     *
     * importInFlightForUser:
     *   The account currently being imported.
     *
     * A save is allowed only when:
     *   importReadyForUser === localStorage.getItem('chatUser')
     */
    let importReadyForUser = null;
    let importInFlightForUser = null;
    let importPromise = null;
    let knownUser = null;

    function currentUser() {
        return localStorage.getItem('chatUser');
    }

    function hasCompletedImportForCurrentUser() {
        const user = currentUser();
        return Boolean(user && importReadyForUser === user);
    }

    function isEducationalCloakActive() {
        const cloak = document.getElementById('educational-cloak');

        if (!cloak) return false;
        if (localStorage.getItem('disableStudyCloak') === 'true') return false;
        if (cloak.classList.contains('hidden')) return false;

        const style = window.getComputedStyle(cloak);

        if (
            style.display === 'none' ||
            style.visibility === 'hidden' ||
            style.opacity === '0'
        ) {
            return false;
        }

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
                observer.observe(cloak, {
                    attributes: true,
                    attributeFilter: ['class', 'style']
                });
            }

            const poll = setInterval(() => {
                if (!isEducationalCloakActive()) done();
            }, 250);

            // Do not deadlock if the cloak implementation breaks.
            const maxWait = setTimeout(done, 15000);
        });
    }

    function isProgressCacheEmpty() {
        let progressKeyCount = 0;

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if (!key) continue;
            if (NON_PROGRESS_KEYS.has(key)) continue;

            const value = localStorage.getItem(key);

            if (
                value === null ||
                value === '' ||
                value === '{}' ||
                value === '[]' ||
                value === 'null'
            ) {
                continue;
            }

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
                position: fixed;
                inset: 0;
                z-index: 2147483646;
                background: rgba(20, 0, 0, 0.92);
                backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: system-ui, -apple-system, sans-serif;
            }

            #empty-cache-warning-modal.hidden {
                display: none !important;
            }

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
                color: #ff4444;
                margin: 0 0 12px;
                font-size: 1.35rem;
                letter-spacing: 0.5px;
            }

            #empty-cache-warning-modal .ecw-box p {
                color: #ccc;
                font-size: 0.92rem;
                line-height: 1.5;
                margin: 0 0 18px;
            }

            #empty-cache-warning-modal .ecw-actions {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            #empty-cache-warning-modal .ecw-btn {
                width: 100%;
                padding: 12px 16px;
                border-radius: 8px;
                font-weight: 700;
                font-size: 0.95rem;
                cursor: pointer;
                border: none;
            }

            #empty-cache-warning-modal .ecw-btn-import {
                background: #8b00ff;
                color: #fff;
            }

            #empty-cache-warning-modal .ecw-btn-import:hover {
                background: #a033ff;
            }

            #empty-cache-warning-modal .ecw-btn-dismiss {
                background: transparent;
                color: #ff8888;
                border: 1px solid rgba(255, 68, 68, 0.45);
            }

            #empty-cache-warning-modal .ecw-btn-dismiss:hover {
                background: rgba(255, 68, 68, 0.12);
                color: #ffaaaa;
            }

            #empty-cache-warning-modal .ecw-status {
                margin-top: 12px;
                min-height: 18px;
                font-size: 0.8rem;
                font-weight: 600;
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
                    <strong style="color:#ff6666;">
                        PLEASE IMPORT YOUR DATA OR YOU WILL LOSE ANY AND ALL PROGRESS.
                    </strong>
                </p>

                <p style="font-size:0.85rem;color:#aaa;">
                    This device's local cache looks empty. Saving is paused so an empty
                    local save cannot overwrite your cloud backup.
                </p>

                <div class="ecw-actions">
                    <button type="button" class="ecw-btn ecw-btn-import" id="ecw-import-btn">
                        Import Save Now
                    </button>

                    <button type="button" class="ecw-btn ecw-btn-dismiss" id="ecw-dismiss-btn">
                        I understand — continue without importing
                    </button>
                </div>

                <div class="ecw-status" id="ecw-status"></div>
            </div>
        `;

        document.body.appendChild(modal);

        document
            .getElementById('ecw-import-btn')
            .addEventListener('click', async () => {
                const status = document.getElementById('ecw-status');

                if (status) {
                    status.textContent = 'Importing from cloud...';
                    status.style.color = '#a033ff';
                }

                // forceImportGate() is the only correct route: it ensures
                // no uploads can run until the restore attempt is done.
                await forceImportGate('ecw-status', true);

                if (!isProgressCacheEmpty()) {
                    hideEmptyCacheWarning();

                    if (status) {
                        status.textContent = 'Import complete. Auto-save resumed.';
                        status.style.color = '#00c853';
                    }
                } else if (status) {
                    status.textContent =
                        'No progress data was found in the cloud. Saving remains paused.';
                    status.style.color = '#ff8888';
                }
            });

        document
            .getElementById('ecw-dismiss-btn')
            .addEventListener('click', () => {
                /*
                 * Do NOT unpause uploads here.
                 *
                 * Dismissing is allowed only to let the user view the page,
                 * but an empty cache is never authorized to upload. The user
                 * must gain real progress data or import a backup first.
                 */
                const modalElement = document.getElementById(
                    'empty-cache-warning-modal'
                );

                if (modalElement) {
                    modalElement.classList.add('hidden');
                }

                exportPaused = true;

                console.warn(
                    '[CloudSync] Warning dismissed; export remains paused because progress cache is empty.'
                );
            });
    }

    function showEmptyCacheWarning() {
        ensureEmptyCacheModal();

        const modal = document.getElementById('empty-cache-warning-modal');

        if (!modal) return;

        exportPaused = true;
        modal.classList.remove('hidden');

        console.warn(
            '[CloudSync] Export paused — local cache is empty or cloud restore is incomplete.'
        );
    }

    function hideEmptyCacheWarning() {
        const modal = document.getElementById('empty-cache-warning-modal');

        if (modal) {
            modal.classList.add('hidden');
        }

        // Never resume merely because a dialog disappeared.
        // Resumption happens only after import is complete AND real progress exists.
        exportPaused = isProgressCacheEmpty();

        if (!exportPaused) {
            console.log('[CloudSync] Export resumed.');
        }
    }

    function setSyncStatus(statusElementId, message, color) {
        if (!statusElementId) return;

        const box = document.getElementById(statusElementId);

        if (!box) return;

        box.textContent = message;
        box.style.color = color;
    }

    /*
     * This is the sign-in safety gate.
     *
     * It blocks all cloud uploads for the signed-in user, attempts a cloud
     * import, and only unlocks saving if real progress is present afterward.
     */
    async function forceImportGate(statusElementId = null, isManual = false) {
        const userAtStart = currentUser();

        if (!userAtStart) {
            importReadyForUser = null;
            importInFlightForUser = null;
            importPromise = null;
            exportPaused = true;
            return false;
        }

        // This exact account has already completed its import gate.
        if (
            importReadyForUser === userAtStart &&
            importInFlightForUser === null
        ) {
            exportPaused = isProgressCacheEmpty();

            if (exportPaused) {
                showEmptyCacheWarning();
            }

            return !exportPaused;
        }

        // Reuse the existing import request rather than launching parallel loads.
        if (
            importPromise &&
            importInFlightForUser === userAtStart
        ) {
            return importPromise;
        }

        exportPaused = true;
        importInFlightForUser = userAtStart;

        setSyncStatus(
            statusElementId,
            'Restoring cloud save before enabling sync...',
            '#a033ff'
        );

        importPromise = (async () => {
            const imported = await window.cloudLoad(
                statusElementId,
                isManual,
                userAtStart
            );

            /*
             * If the user signed out or switched accounts while fetch was
             * pending, do not unlock saving for the new account.
             */
            if (currentUser() !== userAtStart) {
                return false;
            }

            // The import request finished for this user, even if no save exists.
            importReadyForUser = userAtStart;

            /*
             * Critical protection:
             * - Backup restored / game has real data: uploads may resume.
             * - No cloud save, failed import, or still-empty cache: uploads stay blocked.
             */
            if (!imported || isProgressCacheEmpty()) {
                exportPaused = true;
                showEmptyCacheWarning();
                return false;
            }

            exportPaused = false;
            hideEmptyCacheWarning();

            setSyncStatus(
                statusElementId,
                'Cloud data restored. Sync is now enabled.',
                '#00c853'
            );

            return true;
        })()
            .catch((err) => {
                console.error('[CloudSync] Mandatory import gate failed:', err);

                if (currentUser() === userAtStart) {
                    exportPaused = true;
                    showEmptyCacheWarning();
                }

                return false;
            })
            .finally(() => {
                if (importInFlightForUser === userAtStart) {
                    importInFlightForUser = null;
                }

                importPromise = null;
            });

        return importPromise;
    }

    // Debug helpers.
    window.showEmptyCacheWarning = showEmptyCacheWarning;
    window.isProgressCacheEmpty = isProgressCacheEmpty;
    window.forceCloudImportBeforeSave = forceImportGate;

    window.isCloudExportPaused = function () {
        return (
            exportPaused ||
            !autoSaveReady ||
            isEducationalCloakActive() ||
            !hasCompletedImportForCurrentUser() ||
            isProgressCacheEmpty()
        );
    };

    // --- CLOUD SAVE ---
    window.cloudSave = async function (statusElementId = null, isManual = false) {
        const loggedInUser = currentUser();
        const statusBox = statusElementId
            ? document.getElementById(statusElementId)
            : null;

        if (!loggedInUser) {
            if (isManual) {
                alert('Please log in to back up your data!');
            }

            return false;
        }

        /*
         * Absolute first save gate:
         *
         * Even if another script calls cloudSave() immediately after setting
         * chatUser, this awaits cloud restoration before it can reach POST.
         */
        if (!hasCompletedImportForCurrentUser()) {
            if (statusBox) {
                statusBox.textContent =
                    'Restoring cloud data before saving is allowed...';
                statusBox.style.color = '#a033ff';
            }

            await forceImportGate(statusElementId, isManual);

            // Re-read account after await; it could have changed.
            if (
                currentUser() !== loggedInUser ||
                !hasCompletedImportForCurrentUser() ||
                exportPaused ||
                isProgressCacheEmpty()
            ) {
                if (statusBox) {
                    statusBox.textContent =
                        'Save blocked until cloud data is restored.';
                    statusBox.style.color = '#ff8888';
                }

                return false;
            }
        }

        if (isEducationalCloakActive()) {
            if (statusBox) {
                statusBox.textContent = 'Save paused (overlay active)';
                statusBox.style.color = '#888';
            }

            return false;
        }

        if (exportPaused) {
            if (statusBox) {
                statusBox.textContent =
                    'Export paused — import or create progress first.';
                statusBox.style.color = '#ff8888';
            }

            return false;
        }

        if (!isManual && !autoSaveReady) {
            return false;
        }

        /*
         * Empty-cache uploads are forbidden for BOTH manual and automatic saves.
         * A manual save should not provide a bypass around data-loss protection.
         */
        if (isProgressCacheEmpty()) {
            exportPaused = true;
            showEmptyCacheWarning();

            if (statusBox) {
                statusBox.textContent =
                    'Save blocked — local progress cache is empty.';
                statusBox.style.color = '#ff4444';
            }

            return false;
        }

        try {
            const allLocalData = {};

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);

                if (key) {
                    allLocalData[key] = localStorage.getItem(key);
                }
            }

            const completeJsonString = JSON.stringify(allLocalData);

            if (!isManual && completeJsonString === lastSavedString) {
                if (statusBox) {
                    statusBox.textContent = 'Cloud synced (no changes)';
                    statusBox.style.color = '#888';
                }

                return true;
            }

            if (statusBox) {
                statusBox.textContent = isManual
                    ? 'Packing and uploading data...'
                    : 'Auto-saving to cloud...';
            }

            const response = await fetch(`${TURSO_API_BASE}/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: loggedInUser,
                    save_string: completeJsonString
                })
            });

            if (!response.ok) {
                throw new Error(`Upload failed with HTTP ${response.status}.`);
            }

            lastSavedString = completeJsonString;

            if (statusBox) {
                statusBox.textContent = isManual
                    ? 'Backup successful!'
                    : 'Auto-saved successfully!';
                statusBox.style.color = '#00c853';
            }

            return true;
        } catch (err) {
            console.error('Cloud Save Error:', err);

            if (statusBox) {
                statusBox.textContent = isManual
                    ? 'Upload unsuccessful. Check connection.'
                    : 'Auto-save failed.';
                statusBox.style.color = '#ff4444';
            }

            return false;
        }
    };

    // --- CLOUD LOAD ---
    //
    // expectedUser prevents a fetch begun for User A from restoring into the
    // browser after the person has signed out or switched to User B.
    window.cloudLoad = async function (
        statusElementId = null,
        isManual = false,
        expectedUser = currentUser()
    ) {
        const loggedInUser = expectedUser;
        const statusBox = statusElementId
            ? document.getElementById(statusElementId)
            : null;

        if (!loggedInUser) {
            return false;
        }

        if (statusBox) {
            statusBox.textContent = 'Syncing cloud data...';
            statusBox.style.color = '#a033ff';
        }

        try {
            const response = await fetch(
                `${TURSO_API_BASE}/load?username=${encodeURIComponent(loggedInUser)}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // 404 = no save yet (not a hard failure)
            if (response.status === 404) {
                if (currentUser() !== loggedInUser) return false;
                if (statusBox) {
                    statusBox.textContent = 'No cloud backup found for this account.';
                    statusBox.style.color = '#ff8888';
                }
                return false;
            }

            if (!response.ok) {
                throw new Error(`Load failed with HTTP ${response.status}.`);
            }

            const data = await response.json();

            /*
             * Do not apply a response if the current account changed while
             * this request was waiting for the network.
             */
            if (currentUser() !== loggedInUser) {
                console.warn(
                    '[CloudSync] Ignored cloud-load result because account changed during import.'
                );

                return false;
            }

            if (data && data.found && data.save_string) {
                const cloudBackup = JSON.parse(data.save_string);

                if (
                    !cloudBackup ||
                    typeof cloudBackup !== 'object' ||
                    Array.isArray(cloudBackup)
                ) {
                    throw new Error('Cloud save has an invalid format.');
                }

                Object.keys(cloudBackup).forEach((key) => {
                    /*
                     * Keep the active account identity from the current
                     * session, not whatever was stored in an older backup.
                     */
                    if (key !== 'chatUser') {
                        localStorage.setItem(key, cloudBackup[key]);
                    }
                });

                localStorage.setItem('chatUser', loggedInUser);
                lastSavedString = data[0].save_string;

                if (statusBox) {
                    statusBox.textContent = isManual
                        ? 'All data successfully restored from cloud!'
                        : 'Cloud data restored!';
                    statusBox.style.color = '#00c853';
                }

                return true;
            }

            if (statusBox) {
                statusBox.textContent =
                    'No cloud save was found. Create progress before backing up.';
                statusBox.style.color = '#aaa';
            }

            return false;
        } catch (err) {
            console.error('Cloud Load Error:', err);

            if (statusBox) {
                statusBox.textContent = 'Cloud restore failed. Saving remains locked.';
                statusBox.style.color = '#ff4444';
            }

            return false;
        }
    };

    /*
     * Called whenever chatUser changes.
     *
     * Sign in:
     *   lock exports immediately -> wait for overlay -> force cloud import.
     *
     * Sign out:
     *   reset the account authorization state and lock exports.
     */
    async function handleUserChange(nextUser) {
        if (nextUser === knownUser) {
            return;
        }

        const previousUser = knownUser;
        knownUser = nextUser || null;

        // Every account change invalidates previous permission to upload.
        importReadyForUser = null;
        importInFlightForUser = null;
        importPromise = null;
        lastSavedString = '';
        exportPaused = true;

        if (!nextUser) {
            console.log('[CloudSync] Signed out; cloud export locked.');
            return;
        }

        console.log(
            `[CloudSync] Account changed from ${previousUser || 'none'} to ${nextUser}; importing before save.`
        );

        setSyncStatus(
            'dashboard-sync-msg',
            'Restoring cloud data before sync is enabled...',
            '#a033ff'
        );

        // Do not restore/save beneath an overlay.
        await waitForEducationalCloakDone();

        // Ensure the account did not change while waiting for the overlay.
        if (currentUser() !== nextUser) {
            return;
        }

        await forceImportGate('dashboard-sync-msg', false);
    }

    /*
     * Watch same-tab assignments:
     *
     * `storage` does not notify the document that performed setItem(), so
     * observing chatUser through this wrapper is necessary for immediate
     * sign-in protection in the active tab.
     */
    function installChatUserWatcher() {
        if (window.__cloudSyncChatUserWatcherInstalled) return;

        window.__cloudSyncChatUserWatcherInstalled = true;

        const nativeSetItem = Storage.prototype.setItem;
        const nativeRemoveItem = Storage.prototype.removeItem;
        const nativeClear = Storage.prototype.clear;

        Storage.prototype.setItem = function (key, value) {
            const oldValue = this.getItem(key);
            nativeSetItem.call(this, key, value);

            if (
                this === window.localStorage &&
                key === 'chatUser' &&
                String(value) !== oldValue
            ) {
                queueMicrotask(() => handleUserChange(String(value)));
            }
        };

        Storage.prototype.removeItem = function (key) {
            const wasChatUser = this === window.localStorage && key === 'chatUser';

            nativeRemoveItem.call(this, key);

            if (wasChatUser) {
                queueMicrotask(() => handleUserChange(null));
            }
        };

        Storage.prototype.clear = function () {
            const hadUser =
                this === window.localStorage && this.getItem('chatUser');

            nativeClear.call(this);

            if (hadUser) {
                queueMicrotask(() => handleUserChange(null));
            }
        };

        /*
         * Watch sign-ins/sign-outs initiated in a different tab.
         * This does not fire in the tab that wrote the data, hence the
         * Storage.prototype wrapper above.
         */
        window.addEventListener('storage', (event) => {
            if (event.storageArea !== window.localStorage) return;

            if (event.key === 'chatUser') {
                handleUserChange(event.newValue);
            }

            if (event.key === null) {
                handleUserChange(currentUser());
            }
        });
    }

    function interceptSignOut() {
        const btn = document.getElementById('signInBtn');

        if (!btn || btn.dataset.ecwHooked === '1') return;

        btn.dataset.ecwHooked = '1';

        btn.addEventListener(
            'click',
            function onSignOutClick(event) {
                const user = currentUser();

                if (!user) return;

                /*
                 * Preserve your original warning before sign-out when local
                 * progress is empty. Export is already blocked in that state.
                 */
                if (isProgressCacheEmpty()) {
                    event.preventDefault();
                    event.stopImmediatePropagation();

                    showEmptyCacheWarning();

                    setSyncStatus(
                        'dashboard-sync-msg',
                        'Import or create progress before signing out.',
                        '#ff4444'
                    );
                }
            },
            true
        );
    }

    // --- STARTUP ---
    document.addEventListener('DOMContentLoaded', async () => {
        ensureEmptyCacheModal();
        interceptSignOut();
        installChatUserWatcher();

        knownUser = currentUser();

        console.log('[CloudSync] Waiting for educational overlay...');
        await waitForEducationalCloakDone();
        console.log('[CloudSync] Educational overlay done.');

        /*
         * If the user is already logged in when this script starts,
         * treat it exactly like a fresh sign-in:
         *
         *   exports locked -> import cloud -> unlock only if cache has progress.
         */
        if (currentUser()) {
            await handleUserChange(currentUser());

            /*
             * handleUserChange returns early when knownUser already matches,
             * so force the first startup gate explicitly.
             */
            if (!hasCompletedImportForCurrentUser()) {
                await forceImportGate('dashboard-sync-msg', false);
            }
        } else {
            exportPaused = true;
        }

        // Grace period applies only to automatic saves, not to import.
        setTimeout(() => {
            autoSaveReady = true;
            console.log('[CloudSync] Auto-save eligible, subject to import gate.');

            if (autoSaveTimer) {
                clearInterval(autoSaveTimer);
            }

            autoSaveTimer = setInterval(() => {
                if (window.isCloudExportPaused()) {
                    return;
                }

                // Automatic background save to cloud.
                window.cloudSave('dashboard-sync-msg', false);
            }, 60000); // every 60 seconds
        }, 5000); // initial grace period before auto-save becomes eligible
    });
})();
