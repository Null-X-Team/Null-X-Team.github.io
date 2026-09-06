// cloud-save-hotfix.js — Turso load shape + corrupt save recovery
(function () {
  function setStatus(statusBox, text, color) {
    if (!statusBox) return;
    statusBox.textContent = text;
    statusBox.style.color = color;
  }

  function tryParseSaveString(raw) {
    if (raw == null) return null;
    if (typeof raw === 'object') return raw;

    var s = String(raw);

    try {
      return JSON.parse(s);
    } catch (e1) {}

    try {
      var once = JSON.parse(s);
      if (typeof once === 'string') return JSON.parse(once);
    } catch (e2) {}

    try {
      var relaxed = s.replace(/\\\\"/g, '\\"');
      return JSON.parse(relaxed);
    } catch (e3) {}

    try {
      var stripped = s.replace(/\\+"/g, '\\"');
      return JSON.parse(stripped);
    } catch (e4) {}

    return null;
  }

  function install() {
    if (typeof window.cloudLoad !== 'function') {
      setTimeout(install, 50);
      return;
    }
    if (window.cloudLoad.__nxTursoFixed) return;

    window.cloudLoad = async function (statusElementId, isManual, expectedUser) {
      var user = expectedUser || localStorage.getItem('chatUser');
      var statusBox = statusElementId ? document.getElementById(statusElementId) : null;

      if (!user) return false;

      setStatus(statusBox, 'Syncing cloud data...', '#a033ff');

      try {
        var response = await fetch(
          'https://null-x-team-github-io.vercel.app/api/load?username=' +
            encodeURIComponent(user),
          { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        );

        if (response.status === 404) {
          setStatus(statusBox, 'No cloud backup found for this account.', '#ff8888');
          return false;
        }

        if (!response.ok) {
          throw new Error('Load failed with HTTP ' + response.status);
        }

        var data = await response.json();

        if (localStorage.getItem('chatUser') !== user) {
          return false;
        }

        if (!(data && data.found && data.save_string)) {
          setStatus(
            statusBox,
            'No cloud save was found. Create progress before backing up.',
            '#aaa'
          );
          return false;
        }

        var cloudBackup = tryParseSaveString(data.save_string);

        if (
          !cloudBackup ||
          typeof cloudBackup !== 'object' ||
          Array.isArray(cloudBackup)
        ) {
          console.error(
            '[CloudSync hotfix] Cloud save_string is corrupt JSON. Unlocking path for overwrite.'
          );
          setStatus(
            statusBox,
            'Cloud backup is corrupt. Saving unlocked — export to overwrite it.',
            '#ffaa00'
          );
          return false;
        }

        Object.keys(cloudBackup).forEach(function (key) {
          if (key !== 'chatUser') {
            var val = cloudBackup[key];
            localStorage.setItem(
              key,
              typeof val === 'string' ? val : JSON.stringify(val)
            );
          }
        });

        localStorage.setItem('chatUser', user);

        setStatus(
          statusBox,
          isManual
            ? 'All data successfully restored from cloud!'
            : 'Cloud data restored!',
          '#00c853'
        );

        return true;
      } catch (err) {
        console.error('[CloudSync hotfix] Cloud Load Error:', err);
        setStatus(
          statusBox,
          'Cloud restore failed. Check login name / API, then try Import Save.',
          '#ff4444'
        );
        return false;
      }
    };

    window.cloudLoad.__nxTursoFixed = true;
    console.log('[CloudSync hotfix] installed');

    try {
      if (
        localStorage.getItem('chatUser') &&
        typeof window.forceCloudImportBeforeSave === 'function'
      ) {
        setTimeout(function () {
          window.forceCloudImportBeforeSave('dashboard-sync-msg', false);
        }, 300);
      }
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install);
  } else {
    install();
  }
})();
