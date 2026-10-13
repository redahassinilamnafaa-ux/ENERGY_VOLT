/* VOLT. — compteur de fréquentation du site, affiché dans l'admin (Statistiques → Site web).
   Sans cookie ni stockage sur l'appareil, sans adresse IP conservée : une page vue = la page, le site d'où
   l'on vient, le type d'appareil et la langue. La ville est déduite côté serveur (Vercel), jamais par le navigateur.
   « Nouvelle visite » = page ouverte depuis l'extérieur du site (ni rechargement, ni retour arrière). */
(function () {
  try {
    var el = document.currentScript;
    var api = (el && el.getAttribute('data-api')) || 'https://volt-backend-final.vercel.app/api/v1';
    if (!(el && el.getAttribute('data-api')) && !/(^|\.)volt-energy\.ch$/.test(location.hostname)) return;
    if (navigator.webdriver) return;

    function send() {
      var ref = document.referrer, ext = true;
      try { ext = !ref || new URL(ref).host !== location.host; } catch (e) {}
      var nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
      if (nav && (nav.type === 'reload' || nav.type === 'back_forward')) ext = false;
      var q = new URLSearchParams(location.search);
      var data = JSON.stringify({
        p: location.pathname,
        r: ref ? ref.split('?')[0] : '',
        s: q.get('utm_source') || q.get('ref') || '',
        l: navigator.language || '',
        n: ext,
      });
      var url = api + '/track';
      if (!(navigator.sendBeacon && navigator.sendBeacon(url, data))) {
        fetch(url, { method: 'POST', body: data, keepalive: true, mode: 'no-cors' }).catch(function () {});
      }
    }
    // Une page pré-chargée par le navigateur n'est comptée que si elle est réellement affichée.
    if (document.prerendering) document.addEventListener('prerenderingchange', send, { once: true });
    else send();
  } catch (e) {}
})();
