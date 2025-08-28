const CACHE_NAME = "face-dtr-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/admin.html",
  "/service-worker.js",
  "/models/face_recognition_model-weights_manifest.json",
  "/models/face_landmark_68_model-weights_manifest.json",
  "/models/ssd_mobilenetv1_model-weights_manifest.json",
  "https://cdn.jsdelivr.net/npm/face-api.js" 
];

// Install SW and cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch from cache first, then network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Update cache when new version comes
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
});
