// Proxy endpoint to forward API requests to Vercel
// This bypasses network filters by making requests through github.io domain

const VERCEL_API_BASE = 'https://null-x-team-github-io.vercel.app/api';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Extract the endpoint from query string
    // Example: /api-proxy/proxy?endpoint=messages&method=GET
    const { endpoint, ...queryParams } = req.query;
    
    if (!endpoint) {
      return res.status(400).json({ error: 'Missing endpoint parameter' });
    }

    // Build the URL to Vercel
    const url = new URL(`${VERCEL_API_BASE}/${endpoint}`);
    
    // Add query parameters
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    // Forward the request to Vercel
    const forwardResponse = await fetch(url.toString(), {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' 
        ? JSON.stringify(req.body) 
        : undefined,
    });

    // Get the response data
    const data = await forwardResponse.json().catch(() => ({}));

    // Forward the response back to the client
    res.status(forwardResponse.status).json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({
      error: 'Proxy forwarding failed',
      details: error.message
    });
  }
}
