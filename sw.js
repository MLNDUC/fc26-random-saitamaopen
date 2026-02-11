const CACHE = "fc26-random-local-v3";
const CORE = [
    "./",
    "./index.html",
    "./manifest.webmanifest",
    "./sw.js",
    "./icons/icon-180.png",
    "./icons/icon-192.png",
    "./icons/icon-512.png",
    "./sounds/tick.mp3",
    "./sounds/dong.mp3",
    // logos
    "./logos/real-madrid.png",
    "./logos/barcelona.png",
    "./logos/psg.png",
    "./logos/liverpool.png",
    "./logos/man-city.png",
    "./logos/arsenal.png",
    "./logos/bayern.png",
    "./logos/atletico.png",
    "./logos/newcastle.png",
    "./logos/napoli.png",
    "./logos/tottenham.png",
    "./logos/chelsea.png",
    "./logos/man-united.png",
    "./logos/leverkusen.png",
    "./logos/spain.png",
    "./logos/france.png",
    "./logos/argentina.png",
    "./logos/england.png",
    "./logos/portugal.png",
    "./logos/germany.png",
    "./logos/inter.png"
];

self.addEventListener("install", (e) => {
    e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)));
    self.skipWaiting();
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.map((k) => (k !== CACHE ? caches.delete(k) : null)))
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((r) => r || fetch(e.request))
    );
});
