(() => {
  const publisher = 'ca-pub-1649697742468223';
  const consentRegions = new Set('AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE IS LI NO GB CH'.split(' '));
  const optedOut = () => { try { return localStorage.getItem('atlas-advertising-opt-out') === '1'; } catch { return true; } };
  let loaded = false;
  const state = { publisher, status: 'waiting-for-region', country: '', policy: 'eea-uk-ch-no-ads-until-certified-cmp' };
  window.AtlasAdvertising = state;
  function evaluateRegion(country) {
    if (location.hostname !== 'atlas.fran-klin.me') { state.status = 'preview-disabled'; return; }
    if (document.body?.dataset.privacy || document.body?.dataset.credits) { state.status = 'content-page-without-ads'; return; }
    state.country = /^[A-Z]{2}$/.test(country || '') ? country : '';
    if (optedOut() || navigator.globalPrivacyControl === true) { state.status = 'opted-out'; return; }
    if (!state.country) { state.status = 'region-unavailable'; return; }
    if (consentRegions.has(state.country)) { state.status = 'certified-cmp-required'; return; }
    if (loaded) return;
    loaded = true;
    state.status = 'loading';
    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + publisher;
    script.dataset.atlasAdvertising = 'adsense';
    script.onload = () => { state.status = 'script-loaded'; };
    script.onerror = () => { state.status = 'script-unavailable'; };
    document.head.append(script);
  }
  document.addEventListener('atlas:location', event => evaluateRegion(event.detail?.country || window.AtlasI18n?.country));
  if (window.AtlasI18n?.country) evaluateRegion(window.AtlasI18n.country);
  function privacyControls() {
    const checkbox = document.getElementById('advertising-opt-out');
    if (!checkbox) return;
    checkbox.checked = optedOut();
    checkbox.addEventListener('change', () => {
      try { localStorage.setItem('atlas-advertising-opt-out', checkbox.checked ? '1' : '0'); } catch {}
      location.reload();
    });
    const message = document.getElementById('advertising-status');
    const status = () => { if(message) message.textContent = optedOut() ? '已停用本浏览器的广告加载。' : '广告加载取决于所在地区、隐私信号及 Google 的审核和投放情况。'; };
    status();
    const originals = new WeakMap();
    let translationGeneration = 0;
    function translatePrivacy() {
      const target = window.AtlasI18n?.locale() || 'zh-CN', generation = ++translationGeneration;
      for (const el of document.querySelectorAll('[data-privacy-text], #advertising-status')) {
        if (!originals.has(el)) originals.set(el, el.textContent);
        const source = originals.get(el);
        if(target === 'zh-CN') { el.textContent = source; continue; }
        window.AtlasI18n?.translate(source, target).then(result => { if(result.ok && generation === translationGeneration) el.textContent = result.text; });
      }
    }
    document.addEventListener('atlas:language', translatePrivacy);
    translatePrivacy();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', privacyControls); else privacyControls();
})();
