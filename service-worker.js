const CACHE_NAME = "sochou-salon-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/services.html",
  "/galerie.html",
  "/contact.html",
  "/apropos.html",
  "/style.css",
  "/manifest.json",

  // Icônes
  "/icons/icon-192.png",
  "/icons/icon-512.png",

  // Images importantes (exemples)
  "/ressources/images/arriere-plan2.png"
];

// INSTALLATION
self.addEventListener("install", (event) => {
  console.log("Service Worker installé");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ACTIVATION (supprime anciens caches)
self.addEventListener("activate", (event) => {
  console.log("Service Worker activé");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// FETCH (offline)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
