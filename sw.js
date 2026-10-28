
const CACHE = "mi-quincena-v1";

const ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.json"
];

self.addEventListener("install", evento => {
  evento.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll(ARCHIVOS)
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", evento => {
  evento.waitUntil(
    caches.keys().then(claves =>
      Promise.all(
        claves
          .filter(clave => clave !== CACHE)
          .map(clave => caches.delete(clave))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", evento => {
  if (evento.request.method !== "GET") return;

  evento.respondWith(
    fetch(evento.request).catch(() =>
      caches.match(evento.request)
    )
  );
});

