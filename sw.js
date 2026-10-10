/* Nani Teer wali - service worker (network first, falls back to cache when offline).
   Change VERSION whenever you replace audio/images so phones refresh their cache. */
var VERSION = 'ntw-v1';
var CORE = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png',
            'assets/img/bg.jpg', 'assets/img/avatar.jpg'];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(VERSION)
      .then(function (c) { return Promise.all(CORE.map(function (u) { return c.add(u).catch(function () {}); })); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) { return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET' || req.headers.has('range')) return;
  if (new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req).then(function (res) {
      if (res && res.status === 200) {
        var copy = res.clone();
        caches.open(VERSION).then(function (c) { c.put(req, copy); }).catch(function () {});
      }
      return res;
    }).catch(function () {
      return caches.match(req).then(function (r) { return r || caches.match('index.html'); });
    })
  );
});
