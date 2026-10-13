/* VOLT. — consentement cookies.
   Google Analytics (seul service qui dépose des cookies) n'est chargé QU'APRÈS « Accepter » : avant ou après un refus,
   aucune requête ne part vers Google. Le choix est mémorisé 13 mois (localStorage « volt-consent »), puis redemandé.
   « Gérer les cookies » (lien [data-cookie-settings]) rouvre le bandeau ; un refus après acceptation efface les cookies _ga. */
(function () {
  var KEY = 'volt-consent', GA = 'G-ZBHD9KVG4C', TTL = 395 * 864e5; // 13 mois
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  function read() {
    try {
      var raw = localStorage.getItem(KEY); if (!raw) return null;
      if (raw === 'granted' || raw === 'denied') { write(raw); return raw; } // ancien format : daté à partir d'aujourd'hui
      var c = JSON.parse(raw);
      if (!c || (c.v !== 'granted' && c.v !== 'denied') || !(Date.now() - c.at < TTL)) { localStorage.removeItem(KEY); return null; }
      return c.v;
    } catch (e) { return null; }
  }
  function write(v) { try { localStorage.setItem(KEY, JSON.stringify({ v: v, at: Date.now() })); } catch (e) {} }

  var loaded = false;
  function loadGA() {
    if (loaded) return; loaded = true;
    gtag('consent', 'update', { analytics_storage: 'granted' });
    var s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA, { cookie_expires: 395 * 86400 });
  }
  function clearGA() {
    gtag('consent', 'update', { analytics_storage: 'denied' });
    var host = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (!/^_ga/.test(name)) return;
      ['', '; domain=' + host, '; domain=.' + host].forEach(function (d) { document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d; });
    });
  }
  function apply(v) {
    var before = read();
    write(v);
    if (v === 'granted') loadGA();
    else { clearGA(); if (before === 'granted' && loaded) location.reload(); } // décharge le script Google déjà présent
  }

  function close(el) {
    el.style.opacity = '0'; el.style.transform = 'translateY(20px)';
    setTimeout(function () { el.remove(); }, 350);
  }
  function show() {
    if (document.getElementById('volt-cookies')) return;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var el = document.createElement('div');
    el.id = 'volt-cookies';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Cookies');
    el.style.cssText = "position:fixed;left:20px;right:20px;bottom:20px;z-index:9999;max-width:440px;box-sizing:border-box;background:#041C42;color:#FFFFFF;border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:24px;font-family:'Plus Jakarta Sans',sans-serif;box-shadow:0 30px 80px -20px rgba(0,0,0,.55);display:flex;flex-direction:column;gap:16px;transition:opacity .35s cubic-bezier(.2,.8,.2,1),transform .45s cubic-bezier(.2,.8,.2,1);" + (reduce ? '' : 'opacity:0;transform:translateY(20px);');
    el.innerHTML =
      '<div style="display:flex;flex-direction:column;gap:8px;">' +
        '<span style="font-weight:800;letter-spacing:-.03em;font-size:22px;line-height:1.1;">Un cookie<span style="color:#F02C38;">?</span></span>' +
        '<p style="margin:0;font-size:14px;line-height:1.6;font-weight:500;color:rgba(250,250,250,.72);">Avec ton accord, on utilise Google Analytics (cookies) pour mieux comprendre comment le site est utilisé. Si tu refuses, rien n’est envoyé à Google. Aucune publicité. <a href="/cookies" style="color:#FFFFFF;font-weight:700;text-decoration:underline;">En savoir plus</a></p>' +
      '</div>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;">' +
        '<button type="button" data-v="denied" style="flex:1;min-width:120px;height:48px;border-radius:50px;border:1.5px solid rgba(255,255,255,.25);background:transparent;color:#FFFFFF;font-family:inherit;font-size:13px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;cursor:pointer;">Refuser</button>' +
        '<button type="button" data-v="granted" style="flex:1;min-width:120px;height:48px;border-radius:50px;border:none;background:#F02C38;color:#FFFFFF;font-family:inherit;font-size:13px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;cursor:pointer;box-shadow:0 8px 24px rgba(240,44,56,.35);">Accepter</button>' +
      '</div>';
    el.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-v]'); if (!b) return;
      apply(b.getAttribute('data-v')); close(el);
    });
    document.body.appendChild(el);
    if (!reduce) requestAnimationFrame(function () { requestAnimationFrame(function () { el.style.opacity = '1'; el.style.transform = 'none'; }); });
  }
  window.voltCookies = show;
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-cookie-settings]'); if (t) { e.preventDefault(); show(); }
  });

  var saved = read();
  if (saved === 'granted') loadGA();
  else if (!saved) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show); else show(); }
})();
