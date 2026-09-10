// API Proxy Handler
// This file handles the backend proxy logic
// For Vercel deployment, configure vercel.json to route /api/proxy requests

class APIProxyHandler {
    /**
     * Creates a proxy request to the specified URL
     * @param {string} targetUrl - The URL to proxy
     * @returns {Promise<Response>}
     */
    static async proxyRequest(targetUrl) {
        try {
            const response = await fetch(targetUrl, {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': '*/*',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Accept-Encoding': 'gzip, deflate, br',
                },
                redirect: 'follow',
                credentials: 'omit',
            });
            
            return response;
        } catch (error) {
            console.error('Proxy request error:', error);
            throw error;
        }
    }
    
    /**
     * Validates a URL
     * @param {string} url - The URL to validate
     * @returns {boolean}
     */
    static isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = APIProxyHandler;
}