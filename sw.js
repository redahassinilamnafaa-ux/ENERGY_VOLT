// VOLT Service Worker — nécessaire pour que la PWA soit installable
//
// RÈGLE : le HTML n'est JAMAIS servi depuis le cache quand le réseau répond.
//
// Pourquoi : la version précédente ne servait en « réseau d'abord » que les
// navigations, et tout le reste en « cache d'abord ». VoltApp.html, pré-mis en
// cache à l'installation, pouvait donc rester figé indéfiniment — un client
// gardait une ancienne version de l'app après un déploiement, avec le symptôme
// classique « ça marche sur mon téléphone mais pas sur mon ordinateur ».
//
// Conséquence voulue : plus aucun numéro de version à incrémenter à la main.
// Le cache ne sert plus qu'à faire fonctionner l'app hors ligne.
const CACHE = 'volt-v10';

// Ressources vraiment statiques : leur contenu ne change pas sans que leur nom
// change. Le HTML n'en fait PAS partie.
const PRECACHE = ['/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      // cache: 'reload' — ignorer le cache HTTP du navigateur, sinon on
      // pré-enregistre une copie déjà périmée.
      cache.addAll(PRECACHE.map(u => new Request(u, { cache: 'reload' })))
    ).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/** Le HTML doit toujours venir du réseau quand il est joignable. */
function isHtml(request) {
  if (request.mode === 'navigate') return true;
  const accept = request.headers.get('accept') || '';
  if (accept.includes('text/html')) return true;
  return new URL(request.url).pathname.endsWith('.html');
}

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Ne jamais intercepter les appels au backend.
  if (url.origin !== self.location.origin) return;
  if (e.request.method !== 'GET') return;

  if (isHtml(e.request)) {
    // Réseau d'abord : une mise en ligne est prise en compte immédiatement.
    // Le cache ne sert que de filet hors ligne.
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone)).catch(() => {});
          return res;
        })
        .catch(() =>
          caches.match(e.request).then(cached =>
            cached || new Response('Hors ligne', {
              status: 503, headers: { 'Content-Type': 'text/plain' }
            })
          )
        )
    );
    return;
  }

  // Images, icônes, manifeste : cache d'abord, puis complété en arrière-plan.
  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone)).catch(() => {});
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
