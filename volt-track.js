/* VOLT. — compteur de fréquentation du site, affiché dans l'admin (Statistiques → Site web).
   Sans cookie, sans stockage sur l'appareil et sans identifiant de visiteur ; l'adresse IP n'est pas conservée.
   Page vue : la page, le site d'où l'on vient, le type d'appareil et la langue (la ville est déduite côté serveur).
   « Nouvelle visite » = page ouverte depuis l'extérieur du site (ni rechargement, ni retour arrière).
   Actions : formulaire de contact et quiz (window.voltTrack), clics téléphone / email / WhatsApp, liens sortants,
   et à la sortie de la page : jusqu'où elle a été lue (%) et le temps passé à l'écran (s). */
(function () {
  window.voltTrack = function () {};
  try {
    var el = document.currentScript;
    var api = (el && el.getAttribute('data-api')) || 'https://volt-backend-final.vercel.app/api/v1';
    if (!(el && el.getAttribute('data-api')) && !/(^|\.)volt-energy\.ch$/.test(location.hostname)) return;
    if (navigator.webdriver) return;
    var url = api + '/track', q = new URLSearchParams(location.search);
    var ref = document.referrer ? document.referrer.split('?')[0] : '', src = q.get('utm_source') || q.get('ref') || '';

    function beacon(o) {
      var data = JSON.stringify(o);
      try {
        if (navigator.sendBeacon && navigator.sendBeacon(url, data)) return;
        fetch(url, { method: 'POST', body: data, keepalive: true, mode: 'no-cors' }).catch(function () {});
      } catch (e) {}
    }
    // Action : e = contact | quiz | tel | mail | whatsapp | sortie | lecture
    function track(kind, label, extra) {
      var o = { e: kind, x: label || '', p: location.pathname, r: ref, s: src };
      if (extra) for (var k in extra) o[k] = extra[k];
      beacon(o);
    }
    window.voltTrack = track;

    function view() {
      var ext = true;
      try { ext = !ref || new URL(ref).host !== location.host; } catch (e) {}
      var nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
      if (nav && (nav.type === 'reload' || nav.type === 'back_forward')) ext = false;
      beacon({ p: location.pathname, r: ref, s: src, l: navigator.language || '', n: ext });
    }

    // Clics sur les moyens de contact et les liens vers d'autres sites.
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]'); if (!a) return;
      var h = a.getAttribute('href') || '';
      if (/^tel:/i.test(h)) return track('tel');
      if (/^mailto:/i.test(h)) return track('mail');
      if (/wa\.me|whatsapp\.com/i.test(h)) return track('whatsapp');
      if (a.host && a.host !== location.host && /^https?:/.test(a.protocol)) track('sortie', a.hostname.replace(/^www\./, ''));
    }, true);

    // Lecture : profondeur maximale atteinte et temps passé avec la page visible, envoyés une fois en quittant la page.
    var maxDepth = 0, visibleMs = 0, since = document.visibilityState === 'visible' ? Date.now() : 0, sent = false;
    function depth() {
      var h = Math.max(document.documentElement.scrollHeight, document.body ? document.body.scrollHeight : 0);
      var d = h > 0 ? Math.round(Math.min(1, (window.scrollY + window.innerHeight) / h) * 100) : 100;
      if (d > maxDepth) maxDepth = d;
    }
    window.addEventListener('scroll', depth, { passive: true });
    function leave() {
      if (since) { visibleMs += Date.now() - since; since = 0; }
      if (sent) return; sent = true;
      depth();
      track('lecture', '', { d: maxDepth, t: Math.round(visibleMs / 1000) });
    }
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') leave();
      else if (!since) since = Date.now();
    });
    window.addEventListener('pagehide', leave);

    // Une page pré-chargée par le navigateur n'est comptée que si elle est réellement affichée.
    if (document.prerendering) document.addEventListener('prerenderingchange', function () { since = Date.now(); view(); depth(); }, { once: true });
    else { view(); setTimeout(depth, 0); }
  } catch (e) {}
})();
