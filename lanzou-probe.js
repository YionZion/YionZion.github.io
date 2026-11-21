/* 蓝奏云 domain probe, shared by index.html and edit.html.

   A domain counts as usable only if https://www.<domain>/favicon.ico
   loads as an image in the visitor's own browser: every lanzou domain
   serves that icon directly (status 200, no redirect). A web page
   cannot see whether another site answered with a redirect (browsers
   hide that, whatever request mode is used), so the image is the
   check: a domain that is blocked, times out, or is sent to some
   other page (an ISP block page, a parked page...) gives no image.
   No external service is used; the domains come from site.json. */
(function () {
  var TIMEOUT = 8000;

  /* One domain. Resolves { ok, timeout, ms }; `stop` (an AbortSignal)
     ends it early (then ok and timeout are both false). */
  function probe(domain, stop) {
    return new Promise(function (resolve) {
      var img = new Image();
      var t0 = performance.now();
      var settled = false;
      var timer = setTimeout(function () { finish('timeout'); }, TIMEOUT);
      function onStop() { finish('stopped'); }
      function finish(state) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        if (stop) stop.removeEventListener('abort', onStop);
        img.onload = img.onerror = null;
        img.src = '';
        resolve({ ok: state === 'ok', timeout: state === 'timeout', ms: performance.now() - t0 });
      }
      if (stop) stop.addEventListener('abort', onStop);
      img.onload = function () { finish('ok'); };
      img.onerror = function () { finish('fail'); };
      img.referrerPolicy = 'no-referrer';
      img.src = 'https://www.' + domain + '/favicon.ico?_=' + Date.now();
    });
  }

  /* Many domains, opts.parallel (default 6) at a time, in list order.
     opts.enough: stop as soon as that many work (default: test all).
     opts.signal: an AbortSignal to cancel the whole run.
     opts.onResult(domain, result) is called for each finished domain
     (not for those cut short by a stop). Resolves when all are done
     or the run stopped. */
  function test(domains, opts) {
    opts = opts || {};
    var ctrl = new AbortController();
    if (opts.signal) opts.signal.addEventListener('abort', function () { ctrl.abort(); });
    var enough = opts.enough || Infinity;
    var next = 0, found = 0;
    function worker() {
      if (next >= domains.length || ctrl.signal.aborted) return Promise.resolve();
      var d = domains[next++];
      return probe(d, ctrl.signal).then(function (r) {
        if (ctrl.signal.aborted) return;
        if (opts.onResult) opts.onResult(d, r);
        if (r.ok && ++found >= enough) ctrl.abort();
      }).then(worker);
    }
    var all = [];
    for (var i = 0; i < Math.min(opts.parallel || 6, domains.length); i++) all.push(worker());
    return Promise.all(all);
  }

  window.LanzouProbe = { probe: probe, test: test };
})();
