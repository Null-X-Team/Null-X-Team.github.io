// cloud-save-hotfix.js — fixes Turso load response shape (object, not array)
(function () {
  function install() {
    if (typeof window.cloudLoad !== 'function') {
      setTimeout(install, 50);
      return;
    }
    if (window.cloudLoad.__nxData0Fixed) return;

    const original = window.cloudLoad;

    window.cloudLoad = async function (statusElementId, isManual, expectedUser) {
      const user = expectedUser || localStorage.getItem('chatUser');
      const statusBox = statusElementId ? document.getElementById(statusElementId) : null;

      if (!user) return false;

      if (statusBox) {
        statusBox.textContent = 'Syncing cloud data...';
        statusBox.style.color = '#a033ff';
      }

      try {
        const response = await fetch(
          'https://null-x-team-github-io.vercel.app/api/load?username=' +
            encodeURIComponent(user),
          { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        );

        if (response.status === 404) {
          if (statusBox) {
            statusBox.textContent = 'No cloud backup found for this account.';
            statusBox.style.color = '#ff8888';
          }
          return false;
        }

        if (!response.ok) {
          throw new Error('Load failed with HTTP ' + response.status);
        }

        const data = await response.json();

        if (localStorage.getItem('chatUser') !== user) {
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

          Object.keys(cloudBackup).forEach(function (key) {
            if (key !== 'chatUser') {
              localStorage.setItem(key, cloudBackup[key]);
            }
          });

          localStorage.setItem('chatUser', user);

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
        console.error('[CloudSync hotfix] Cloud Load Error:', err);

        // Fall back to original only if it might still work
        try {
          return await original.apply(this, arguments);
        } catch (e2) {
          if (statusBox) {
            statusBox.textContent =
              'Cloud restore failed. Saving remains locked.';
            statusBox.style.color = '#ff4444';
          }
          return false;
        }
      }
    };

    window.cloudLoad.__nxData0Fixed = true;
    console.log('[CloudSync hotfix] installed (Turso object response)');

    // Re-run import gate if user is already logged in
    try {
      if (
        localStorage.getItem('chatUser') &&
        typeof window.forceCloudImportBeforeSave === 'function'
      ) {
        window.forceCloudImportBeforeSave('dashboard-sync-msg', false);
      }
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install);
  } else {
    install();
  }
})();
