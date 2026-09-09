// --- CONFIGURATION: Turso via Cloudflare Worker (bypasses network filters) ---
// IMPORTANT: Before this works, you MUST:
// 1. Create a Cloudflare Worker with the code from the instructions
// 2. Deploy it and get your worker URL
// 3. Replace 'YOUR_WORKER_URL' below with your actual Cloudflare worker URL
// Example: https://null-api-proxy.yourname.workers.dev/api-proxy
const TURSO_API_BASE = 'YOUR_WORKER_URL';
const TURSO_HEADERS = { 'Content-Type': 'application/json' };

// If TURSO_API_BASE still has the placeholder, show an error
if (TURSO_API_BASE === 'YOUR_WORKER_URL') {
  console.error('❌ TURSO_API_BASE not configured! Update chat.js line 2 with your Cloudflare worker URL');
}
