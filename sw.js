const CACHE = "fc26-random-v1";
const CORE = [
    "./",
    "./index.html",
    "./manifest.webmanifest",
    "./sw.js",
    "./icons/icon-180.png",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];

self.addEventListener("install", e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)));
    self.skipWaiting();
});

self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.map(k => k !== CACHE && caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", e => {
    if (e.request.url.startsWith(self.location.origin)) {
        e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
    } else {
        e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    }
});
