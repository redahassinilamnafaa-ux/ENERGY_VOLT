(function () {
  var KEY = 'volt-consent';
  function gtagSafe() { window.dataLayer = window.dataLayer || []; window.dataLayer.push(arguments); }
  function apply(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
    gtagSafe('consent', 'update', { analytics_storage: v === 'granted' ? 'granted' : 'denied' });
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
        '<p style="margin:0;font-size:14px;line-height:1.6;font-weight:500;color:rgba(250,250,250,.72);">On utilise Google Analytics pour mesurer l\u2019audience du site, uniquement si tu es d\u2019accord. Aucune publicit\u00e9. <a href="/cookies" style="color:#FFFFFF;font-weight:700;text-decoration:underline;">En savoir plus</a></p>' +
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
  var saved = null; try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (!saved) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show); else show(); }
})();
