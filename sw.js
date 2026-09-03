/* Minimal shell cache for Null-X dashboard */
var CACHE = "nx-shell-v1";
var SHELL = [
  "/",
  "/index.html",
  "/Newhomepage/index.html",
  "/Newhomepage/newpage.css",
  "/CSS/style.css",
  "/JS/nx-ux.js",
  "/CSS/nx-ux.css",
  "/version.json"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(SHELL.map(function (u) {
        return new Request(u, { cache: "reload" });
      })).catch(function () {});
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (r) {
          return r || caches.match("/Newhomepage/index.html") || caches.match("/index.html");
        });
      })
    );
    return;
  }
  if (/\.(css|js|svg|png|woff2)$/i.test(url.pathname) || url.pathname === "/version.json") {
    event.respondWith(
      caches.match(req).then(function (hit) {
        var fetcher = fetch(req).then(function (res) {
          if (res && res.ok) {
            var copy = res.clone();
            caches.open(CACHE).then(function (c) { c.put(req, copy); });
          }
          return res;
        }).catch(function () { return hit; });
        return hit || fetcher;
      })
    );
  }
});
