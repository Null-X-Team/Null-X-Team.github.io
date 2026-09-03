# Critical fix for JS/main.js

## Cause
The domain-lock block in `JS/main.js` contained a raw multi-line string with `</script>` which made the **entire file a SyntaxError**.
Browsers never executed main.js → stuck on "Loading Identity...", dead tabs, academic overlay never dismissed.

## Replace this broken block (search for `null-x-team.github.io") return;` near domain lock)

Delete from the `(function () {` that starts with `var host = (typeof location` through the closing `})();` **just before** `async function fetchLiveWeather()`.

Paste this instead:

```js
(function () {
  var host = (typeof location !== "undefined" && (location.hostname || "") || "").toLowerCase();
  var allowed = host === "null-x-team.github.io" || host === "localhost" || host === "127.0.0.1";
  if (allowed) return;
  try { window.stop(); } catch (e) {}
  try {
    document.documentElement.innerHTML =
      '<head><title>ERR</title><meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
      '<body style="background:#050505;color:#ff2b2b;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;overflow:hidden">' +
      '<div style="width:min(420px,85%);padding:40px 35px;text-align:center;background:#0b0b0b;border:1px solid #3a1111;border-radius:12px">' +
      '<h1 style="margin:0 0 12px;font-size:26px;letter-spacing:3px;color:#ff3333">SITE LOCKED</h1>' +
      '<p style="margin:0;color:#aaa;font-size:14px">Unauthorized host.</p>' +
      '<p style="margin:22px 0 0;color:#444;font-size:11px">ERR_HOST_NOT_AUTHORIZED</p>' +
      '</div></body>';
  } catch (e) {}
  while (true) {}
})();
```

Fixed full `main.js` is also in the PR conversation / sandbox if available.
