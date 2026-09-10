// cloud-save-hotfix.js
// Drop-in after auto-save.js. Fully replaces cloudLoad. No PRs needed — just host this file.
(function () {
  const CLOUDFLARE_WORKER = 'https://apithingy.jlsniperelite4.workers.dev/api-worker';
  
  function setStatus(elId, text, color) {
    var box = elId ? document.getElementById(elId) : null;
    if (!box) return;
    box.textContent = text;
    box.style.color = color || '#ccc';
  }

  function hideEmptyCacheModal() {
    var modal = document.getElementById('empty-cache-warning-modal');
    if (modal) modal.classList.add('hidden');
  }

  // Proven repair for over-escaped Turso blobs (TEST USER case).
  function parseSaveString(raw) {
    if (raw == null) return null;
    if (typeof raw === 'object') return raw;

    var s = String(raw);
    var attempts = [s];

    // Layer: reduce \\ " -> \ " (the fix that yields ~212 keys)
    attempts.push(s.replace(/\\\\"/g, '\\"'));
    attempts.push(s.replace(/\\+"/g, '\\"'));

    // Double-encoded whole blob
    try {
      var once = JSON.parse(s);
      if (typeof once === 'string') attempts.push(once);
    } catch (e) {}

    for (var i = 0; i < attempts.length; i++) {
      try {
        var parsed = JSON.parse(attempts[i]);
        if (typeof parsed === 'string') {
          try {
            parsed = JSON.parse(parsed);
          } catch (e2) {
            continue;
          }
        }
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e3) {}
    }
    return null;
  }

  function applyBackup(cloudBackup, user) {
    Object.keys(cloudBackup).forEach(function (key) {
      if (key === 'chatUser') return;
      var val = cloudBackup[key];
      localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
    });
    localStorage.setItem('chatUser', user);
  }

  function install() {
    if (typeof window.cloudLoad !== 'function') {
      setTimeout(install, 40);
      return;
    }
    if (window.cloudLoad.__nxFinalFix) return;

    window.cloudLoad = async function (statusElementId, isManual, expectedUser) {
      var user = expectedUser || localStorage.getItem('chatUser');
      if (!user) return false;

      setStatus(statusElementId, 'Syncing cloud data...', '#a033ff');

      try {
        var response = await fetch(
          CLOUDFLARE_WORKER + '/load?username=' + encodeURIComponent(user),
          { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        );

        if (response.status === 404) {
          setStatus(statusElementId, 'No cloud backup found for this account.', '#ff8888');
          return false;
        }
        if (!response.ok) {
          throw new Error('Load failed with HTTP ' + response.status);
        }

        var data = await response.json();
        if (localStorage.getItem('chatUser') !== user) return false;

        if (!(data && data.found && data.save_string)) {
          setStatus(
            statusElementId,
            'No cloud save was found. Create progress before backing up.',
            '#aaa'
          );
          return false;
        }

        var cloudBackup = parseSaveString(data.save_string);
        if (!cloudBackup) {
          console.error('[CloudSync hotfix] Could not parse save_string even after repair');
          setStatus(
            statusElementId,
            'Cloud backup is corrupt. Use Export after playing to overwrite it.',
            '#ffaa00'
          );
          // Do NOT leave the scary "remains locked" text on the modal path
          hideEmptyCacheModal();
          return false;
        }

        applyBackup(cloudBackup, user);
        hideEmptyCacheModal();

        setStatus(
          statusElementId,
          isManual ? 'All data successfully restored from cloud!' : 'Cloud data restored!',
          '#00c853'
        );
        console.log('[CloudSync hotfix] Restored', Object.keys(cloudBackup).length, 'keys');
        return true;
      } catch (err) {
        console.error('[CloudSync hotfix]', err);
        setStatus(
          statusElementId,
          'Cloud restore failed. Try again or use a local Import file.',
          '#ff4444'
        );
        return false;
      }
    };

    window.cloudLoad.__nxFinalFix = true;
    console.log('[CloudSync hotfix] final install OK');

    // If already logged in, retry import once so the gate can clear
    try {
      if (localStorage.getItem('chatUser') && typeof window.forceCloudImportBeforeSave === 'function') {
        setTimeout(function () {
          window.forceCloudImportBeforeSave('dashboard-sync-msg', false);
        }, 400);
      }
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install);
  } else {
    install();
  }
})();
