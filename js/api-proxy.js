// API Proxy - Client-side bypass for network filters
// Instead of calling Vercel directly, use a CORS proxy service

// List of free CORS proxy services (try them in order)
const CORS_PROXIES = [
  'https://cors-anywhere.herokuapp.com/',
  'https://api.allorigins.win/raw?url=',
  'https://cors.bridged.cc/',
];

const VERCEL_API_BASE = 'https://null-x-team-github-io.vercel.app/api';

let currentProxyIndex = 0;

async function fetchWithCorsProxy(url, options = {}) {
  for (let i = 0; i < CORS_PROXIES.length; i++) {
    try {
      const proxyIndex = (currentProxyIndex + i) % CORS_PROXIES.length;
      const proxy = CORS_PROXIES[proxyIndex];
      
      let proxiedUrl = url;
      if (proxy.includes('?url=')) {
        proxiedUrl = proxy + encodeURIComponent(url);
      } else {
        proxiedUrl = proxy + url;
      }

      const response = await fetch(proxiedUrl, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        }
      });

      if (response.ok) {
        currentProxyIndex = proxyIndex;
        return response;
      }
    } catch (err) {
      console.warn(`Proxy ${i} failed:`, err.message);
      continue;
    }
  }

  // If all proxies fail, try direct request (will fail if blocked, but worth trying)
  return fetch(url, options);
}

// Override global fetch for API calls
const originalFetch = window.fetch;
window.fetchWithProxy = async function(url, options = {}) {
  // Only proxy Vercel API calls
  if (url.includes('null-x-team-github-io.vercel.app')) {
    return fetchWithCorsProxy(url, options);
  }
  
  // Direct fetch for everything else
  return originalFetch(url, options);
};

// Monkey-patch fetch for easier use in existing code
const originalTursoGet = window.tursoGet;
if (originalTursoGet) {
  window.tursoGet = async function(path) {
    const url = `${VERCEL_API_BASE}${path}`;
    return fetchWithProxy(url, { headers: { 'Content-Type': 'application/json' } });
  };
}

const originalTursoJson = window.tursoJson;
if (originalTursoJson) {
  window.tursoJson = async function(path, options = {}) {
    const url = `${VERCEL_API_BASE}${path}`;
    const res = await fetchWithProxy(url, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options
    });
    const data = await res.json().catch(() => null);
    return { res, data };
  };
}

console.log('✓ API Proxy loaded - Vercel requests will use CORS proxy');
