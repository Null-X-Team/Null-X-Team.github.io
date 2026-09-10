// UNIVERSAL AD BLOCKER FOR ALL GAMES
// This script blocks ALL ads network-wide

(function() {
  'use strict';

  // Block common ad networks
  const adNetworks = [
    'google',
    'googleadservices',
    'googlesyndication',
    'doubleclick',
    'amazon-adsystem',
    'ads',
    'adservice',
    'adtagserver',
    'adserver',
    'adsense',
    'pagead2',
    'pagead',
    'ads.google',
    'ads.amazon',
    'ads.facebook',
    'ads.microsoft',
    'ads.yahoo',
    'ads.bing'
  ];

  // Block ad-related domains in fetch/XHR
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    const url = args[0]?.toString?.() || '';
    if (isAdURL(url)) {
      console.log('[AD BLOCKER] Blocked fetch:', url);
      return Promise.reject(new Error('Ad request blocked'));
    }
    return originalFetch.apply(this, args);
  };

  // Block XMLHttpRequest for ads
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    if (isAdURL(url)) {
      console.log('[AD BLOCKER] Blocked XHR:', url);
      this._blocked = true;
      return;
    }
    this._blocked = false;
    return originalOpen.call(this, method, url, ...rest);
  };

  const originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function(...args) {
    if (this._blocked) return;
    return originalSend.apply(this, args);
  };

  // Hide ad elements
  function hideAds() {
    const adSelectors = [
      '[id*="ad"]',
      '[class*="ad"]',
      '[id*="advertisement"]',
      '[class*="advertisement"]',
      '[id*="ads"]',
      '[class*="ads"]',
      'div[id^="google_ads"]',
      'iframe[src*="ads"]',
      'iframe[src*="google"]',
      'iframe[src*="doubleclick"]',
      '[style*="advertisement"]',
      '.google-ads',
      '.ad-banner',
      '.ad-section',
      '.advertisement',
      '.adsense'
    ];

    adSelectors.forEach(selector => {
      try {
        document.querySelectorAll(selector).forEach(el => {
          el.style.display = 'none !important';
          el.style.visibility = 'hidden !important';
          el.style.height = '0 !important';
          el.remove?.();
        });
      } catch (e) {}
    });
  }

  function isAdURL(url) {
    return adNetworks.some(domain => url.toLowerCase().includes(domain));
  }

  // Block third-party ad scripts
  const originalAppendChild = Element.prototype.appendChild;
  Element.prototype.appendChild = function(node) {
    if (node.tagName === 'SCRIPT' && isAdURL(node.src || '')) {
      console.log('[AD BLOCKER] Blocked script:', node.src);
      return node;
    }
    if (node.tagName === 'IFRAME' && isAdURL(node.src || '')) {
      console.log('[AD BLOCKER] Blocked iframe:', node.src);
      return node;
    }
    return originalAppendChild.call(this, node);
  };

  // Run ad-hiding on page load and periodically
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideAds);
  } else {
    hideAds();
  }

  // Keep checking for new ads every 100ms
  setInterval(hideAds, 100);

  // Block common ad events
  window.addEventListener('load', hideAds, true);
  window.addEventListener('resize', hideAds, true);

  console.log('[AD BLOCKER] Universal ad blocker initialized - Your site is now 100% ad-free!');
})();
