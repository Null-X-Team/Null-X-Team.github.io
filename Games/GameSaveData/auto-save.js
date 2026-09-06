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
        const u = currentUser();
        return !!u && importReadyForUser === u;
    }

    function isEducationalCloakActive() {
        const el = document.getElementById('educational-cloak');
        if (!el) return false;
        if (el.classList.contains('hidden')) return false;
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden';
    }

    function isProgressCacheEmpty() {
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (!key) continue;
                if (NON_PROGRESS_KEYS.has(key)) continue;
                if (key === 'chatUser') continue;
                const val = localStorage.getItem(key);
                if (val != null && String(val).length > 0) return false;
            }
        } catch (e) {}
        return true;
    }

    function showEmptyCacheWarning() {
        console.warn(
            '[CloudSync] Export paused — local cache is empty or cloud restore is incomplete.'
        );
    }

    function collectProgressSnapshot() {
        const out = {};
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (!key) continue;
                out[key] = localStorage.getItem(key);
            }
        } catch (e) {}
        return out;
    }

    function snapshotString() {
        try {
            return JSON.stringify(collectProgressSnapshot());
        } catch (e) {
            return '';
        }
    }

    async function forceImportGate(statusElementId, isManual) {
        const user = currentUser();
        if (!user) return false;

        if (importReadyForUser === user) return true;

        if (importInFlightForUser === user && importPromise) {
            return importPromise;
        }

        importInFlightForUser = user;
        importPromise = (async () => {
            const statusBox = statusElementId
                ? document.getElementById(statusElementId)
                : null;

            if (statusBox) {
                statusBox.textContent =
                    'Restoring cloud save before enabling sync...';
                statusBox.style.color = '#a033ff';
            }

            try {
                const imported = await window.cloudLoad(
                    statusElementId,
                    !!isManual,
                    user
                );

                if (currentUser() !== user) return false;

                importReadyForUser = user;

                if (imported) {
                    exportPaused = false;
                    if (statusBox) {
                        statusBox.textContent =
                            'Cloud data restored. Sync is now enabled.';
                        statusBox.style.color = '#00c853';
                    }
                    return true;
                }

                /*
                 * No cloud save, failed import, or still-empty cache: uploads stay blocked
                 * until the user creates real local progress (or a later import succeeds).
                 */
                if (isProgressCacheEmpty()) {
                    exportPaused = true;
                    if (statusBox) {
                        statusBox.textContent =
                            'No progress data was found in the cloud. Saving remains paused.';
                        statusBox.style.color = '#ff8888';
                    }
                } else {
                    exportPaused = false;
                    if (statusBox) {
                        statusBox.textContent =
                            'No cloud backup found. Local progress can now be saved.';
                        statusBox.style.color = '#00c853';
                    }
                }

                return !exportPaused;
            } catch (err) {
                console.error('[CloudSync] Mandatory import gate failed:', err);
                exportPaused = true;
                if (statusBox) {
                    statusBox.textContent =
                        'Cloud restore failed. Saving remains locked.';
                    statusBox.style.color = '#ff4444';
                }
                return false;
            } finally {
                if (importInFlightForUser === user) {
                    importInFlightForUser = null;
                    importPromise = null;
                }
            }
        })();

        return importPromise;
    }

    window.forceCloudImportBeforeSave = forceImportGate;

    window.isCloudExportPaused = function () {
        return exportPaused || !hasCompletedImportForCurrentUser();
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

        if (!hasCompletedImportForCurrentUser()) {
            if (statusBox) {
                statusBox.textContent =
                    'Restoring cloud data before saving is allowed...';
                statusBox.style.color = '#a033ff';
            }

            await forceImportGate(statusElementId, isManual);

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

        if (isProgressCacheEmpty()) {
            exportPaused = true;
            showEmptyCacheWarning();
            if (statusBox) {
                statusBox.textContent =
                    'Save blocked — local progress cache is empty.';
                statusBox.style.color = '#ff8888';
            }
            return false;
        }

        const payload = snapshotString();
        if (!payload || payload === lastSavedString) {
            if (statusBox && isManual) {
                statusBox.textContent = 'Cloud synced (no changes)';
                statusBox.style.color = '#888';
            }
            return true;
        }

        if (statusBox) {
            statusBox.textContent = isManual
                ? 'Saving to cloud...'
                : 'Auto-saving to cloud...';
            statusBox.style.color = '#a033ff';
        }

        try {
            const response = await fetch(`${TURSO_API_BASE}/save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: loggedInUser,
                    save_string: payload
                })
            });

            if (!response.ok) {
                const errBody = await response.json().catch(() => ({}));
                throw new Error(
                    errBody.error || `Save failed with HTTP ${response.status}`
                );
            }

            lastSavedString = payload;
            exportPaused = false;

            if (statusBox) {
                statusBox.textContent = isManual
                    ? 'Cloud backup saved!'
                    : 'Cloud auto-save complete';
                statusBox.style.color = '#00c853';
            }
            return true;
        } catch (err) {
            console.error('Cloud Save Error:', err);
            if (statusBox) {
                statusBox.textContent =
                    'Cloud save failed: ' + (err.message || 'unknown error');
                statusBox.style.color = '#ff4444';
            }
            return false;
        }
    };

    // --- CLOUD LOAD ---
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
                    if (key !== 'chatUser') {
                        localStorage.setItem(key, cloudBackup[key]);
                    }
                });

                localStorage.setItem('chatUser', loggedInUser);
                // API returns a single object, not an array
                lastSavedString = data.save_string;

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
                statusBox.textContent =
                    'Cloud restore failed. Saving remains locked.';
                statusBox.style.color = '#ff4444';
            }

            return false;
        }
    };

    // --- Import / Export UI helpers (if present on page) ---
    window.exportLocalSaveFile = function () {
        try {
            const blob = new Blob([snapshotString()], {
                type: 'application/json'
            });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download =
                'nullx-save-' +
                (currentUser() || 'guest') +
                '-' +
                Date.now() +
                '.json';
            a.click();
            URL.revokeObjectURL(a.href);
        } catch (e) {
            console.error(e);
            alert('Export failed.');
        }
    };

    window.importLocalSaveFile = function (file) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function () {
            try {
                const parsed = JSON.parse(String(reader.result || '{}'));
                if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
                    throw new Error('Invalid save file');
                }
                Object.keys(parsed).forEach((key) => {
                    if (key !== 'chatUser') {
                        localStorage.setItem(key, parsed[key]);
                    }
                });
                exportPaused = false;
                lastSavedString = '';
                alert('Import complete. Cloud sync can save this progress.');
            } catch (e) {
                console.error(e);
                alert('Import failed: invalid file.');
            }
        };
        reader.readAsText(file);
    };

    // Watch chatUser changes -> force import gate
    function onAccountMaybeChanged() {
        const nextUser = currentUser();
        if (nextUser === knownUser) return;
        const previousUser = knownUser;
        knownUser = nextUser;

        if (!nextUser) {
            importReadyForUser = null;
            exportPaused = true;
            console.log('[CloudSync] Signed out; cloud export locked.');
            return;
        }

        console.log(
            `[CloudSync] Account changed from ${previousUser || 'none'} to ${nextUser}; importing before save is allowed.`
        );
        exportPaused = true;
        importReadyForUser = null;
        forceImportGate('dashboard-sync-msg', false);
    }

    function installChatUserWatcher() {
        if (window.__cloudSyncChatUserWatcherInstalled) return;
        window.__cloudSyncChatUserWatcherInstalled = true;

        const originalSetItem = localStorage.setItem.bind(localStorage);
        localStorage.setItem = function (key, value) {
            originalSetItem(key, value);
            if (key === 'chatUser') onAccountMaybeChanged();
        };

        const originalRemoveItem = localStorage.removeItem.bind(localStorage);
        localStorage.removeItem = function (key) {
            originalRemoveItem(key);
            if (key === 'chatUser') onAccountMaybeChanged();
        };

        knownUser = currentUser();
        if (knownUser) {
            forceImportGate('dashboard-sync-msg', false);
        }
    }

    function waitForOverlayThenStart() {
        console.log('[CloudSync] Waiting for educational overlay...');
        const tick = () => {
            if (isEducationalCloakActive()) {
                setTimeout(tick, 400);
                return;
            }
            console.log('[CloudSync] Educational overlay done.');
            autoSaveReady = true;
            installChatUserWatcher();

            if (autoSaveTimer) clearInterval(autoSaveTimer);
            autoSaveTimer = setInterval(() => {
                if (!currentUser()) return;
                if (window.isCloudExportPaused()) return;
                if (isEducationalCloakActive()) return;
                if (isProgressCacheEmpty()) return;
                window.cloudSave('dashboard-sync-msg', false);
            }, 45000);

            console.log('[CloudSync] Auto-save eligible, subject to import gate.');
        };
        tick();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForOverlayThenStart);
    } else {
        waitForOverlayThenStart();
    }
})();
