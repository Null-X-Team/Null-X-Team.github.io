// API Proxy - Use Cloudflare Worker to bypass network filters
// The Cloudflare Worker acts as a middleman between your browser and Vercel

const CLOUDFLARE_WORKER = 'https://apithingy.jlsniperelite4.workers.dev';
const VERCEL_API_BASE = 'https://null-x-team-github-io.vercel.app/api';

// Override fetch for API calls to route through Cloudflare Worker
const originalFetch = window.fetch;

window.fetch = async function(url, options = {}) {
  // Check if this is a Vercel API call
  if (url && url.includes('null-x-team-github-io.vercel.app')) {
    try {
      console.log('🔀 Routing through Cloudflare Worker:', url);
      
      // Extract the API path (e.g., "/api/messages" becomes "messages")
      const apiPath = url.split('null-x-team-github-io.vercel.app/api/')[1];
      
      if (!apiPath) {
        return originalFetch(url, options);
      }

      // Build the worker URL - add /api-worker/ prefix for worker routing
      const workerUrl = `${CLOUDFLARE_WORKER}/api-worker/${apiPath}`;
      
      // Forward the request through the worker
      const response = await originalFetch(workerUrl, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        }
      });

      console.log('✓ Worker response received:', response.status);
      return response;

    } catch (err) {
      console.error('❌ Cloudflare Worker failed:', err.message);
      // Fall back to direct request (will still be blocked, but worth trying)
      return originalFetch(url, options);
    }
  }

  // For non-API requests, use normal fetch
  return originalFetch(url, options);
};

console.log('✓ API Proxy loaded - All Vercel API calls will use Cloudflare Worker');
console.log('🌍 Worker URL:', CLOUDFLARE_WORKER);
