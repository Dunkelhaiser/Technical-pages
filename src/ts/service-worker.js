/* eslint-disable no-restricted-globals */
const offlineCache = "../../offline.html";
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(offlineCache).then((cache) => {
            cache.add(offlineCache).then(() => self.skipWaiting());
        })
    );
});

self.addEventListener("activate", (e) => {
    console.log("Service Worker - Activated");
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                // eslint-disable-next-line array-callback-return, consistent-return
                cacheNames.map((cache) => {
                    if (cache !== offlineCache) {
                        console.log("Service Worker: Clearing Old Cache");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", (e) => {
    console.log("Service Worker: Fetching");
    e.respondWith(fetch(e.request).catch(() => caches.match(offlineCache)));
});
