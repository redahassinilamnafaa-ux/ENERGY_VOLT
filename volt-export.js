/* VOLT. — export Excel (.xlsx) partagé par l'admin et l'Espace fitness.
   SheetJS est chargé à la demande (rien au chargement de la page) ; si le CDN est injoignable, repli sur un CSV
   que Excel ouvre correctement (BOM UTF-8, séparateur « ; »). */
(function () {
  var XLSX_URL = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
  var loading = null;

  function loadXlsx() {
    if (window.XLSX) return Promise.resolve(window.XLSX);
    if (!loading) loading = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = XLSX_URL; s.async = true;
      s.onload = function () { window.XLSX ? resolve(window.XLSX) : reject(new Error('xlsx')); };
      s.onerror = function () { loading = null; reject(new Error('xlsx')); };
      document.head.appendChild(s);
    });
    return loading;
  }

  function saveBlob(blob, name) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
  }

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function cellText(v) {
    if (v == null) return '';
    if (v instanceof Date) return pad(v.getDate()) + '.' + pad(v.getMonth() + 1) + '.' + v.getFullYear();
    return String(v);
  }
  function saveCsv(name, rows) {
    var csv = rows.map(function (r) { return r.map(function (v) { return '"' + cellText(v).replace(/"/g, '""') + '"'; }).join(';'); }).join('\n');
    saveBlob(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }), name);
  }

  /* rows : tableau de lignes (1re ligne = en-têtes) ; les objets Date deviennent de vraies dates Excel (jj.mm.aaaa).
     opts : { sheet:'Membres', widths:[22, 18, ...] }  →  retourne 'xlsx' ou 'csv' (repli). */
  window.voltExport = function (filename, rows, opts) {
    opts = opts || {};
    return loadXlsx().then(function (X) {
      var ws = X.utils.aoa_to_sheet(rows, { cellDates: true });
      var ref = X.utils.decode_range(ws['!ref'] || 'A1');
      for (var r = 1; r <= ref.e.r; r++) for (var c = ref.s.c; c <= ref.e.c; c++) {
        var cell = ws[X.utils.encode_cell({ r: r, c: c })];
        if (cell && cell.t === 'd') cell.z = 'dd.mm.yyyy';
      }
      ws['!cols'] = (opts.widths || rows[0].map(function (h) { return String(h).length + 6; })).map(function (w) { return { wch: Math.max(10, w) }; });
      ws['!autofilter'] = { ref: ws['!ref'] };
      ws['!freeze'] = { xSplit: 0, ySplit: 1 };
      var wb = X.utils.book_new();
      X.utils.book_append_sheet(wb, ws, String(opts.sheet || 'Export').slice(0, 31));
      var out = X.write(wb, { bookType: 'xlsx', type: 'array', cellDates: true });
      saveBlob(new Blob([out], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), filename);
      return 'xlsx';
    }).catch(function () {
      saveCsv(filename.replace(/\.xlsx$/i, '.csv'), rows);
      return 'csv';
    });
  };
})();
