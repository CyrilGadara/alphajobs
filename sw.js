const cacheName = "CSV3.5";

const cachedFiles = [
    "/",
    "/alphajobs/manifest.json",
    "/alphajobs/assets/script/main.js",
    "/alphajobs/assets/css/styles.css",
    "/alphajobs/assets/css/fonts.css",
    "/alphajobs/assets/fonts/material_icons.woff2",
];

self.addEventListener("install", (event) => {
    // console.log("Service Worker Install Event");

    //add files to the cache
    event.waitUntil(
        caches
            .open(cacheName)
            .then((cache) => {
                // console.log("Caching Files");
                return cache.addAll(cachedFiles);
            })
            .then(() => {
                return self.skipWaiting();
            })
            .catch((error) => {
                console.log(`Cache Failed ${error}`);
            })
    );
});

self.addEventListener("activate", (event) => {
    // console.log("Service Worker Activated");

    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== cacheName) {
                        console.log("Removing Old Cache", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );

    return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    // console.log(`Fetch Event ${event.request.url}`);

    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
