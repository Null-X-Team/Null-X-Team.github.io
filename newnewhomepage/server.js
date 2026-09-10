const http = require('http');
const https = require('https');
const url = require('url');
const querystring = require('querystring');

/**
 * Backend Proxy Server
 * Handles proxying requests to external websites
 */

class ProxyServer {
    constructor(port = 3000) {
        this.port = port;
        this.server = http.createServer((req, res) => this.handleRequest(req, res));
    }
    
    handleRequest(req, res) {
        // Enable CORS
        this.setCorsHeaders(res);
        
        // Handle preflight requests
        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }
        
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        
        if (pathname === '/api/proxy' && req.method === 'POST') {
            this.handleProxyRequest(req, res);
        } else if (pathname === '/proxy' && req.method === 'GET') {
            this.handleProxyPage(req, res, parsedUrl.query.url);
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not found' }));
        }
    }
    
    setCorsHeaders(res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
    
    handleProxyRequest(req, res) {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const targetUrl = data.url;
                
                if (!targetUrl) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'URL is required' }));
                    return;
                }
                
                if (!this.isValidUrl(targetUrl)) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid URL' }));
                    return;
                }
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, url: targetUrl }));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Server error' }));
            }
        });
    }
    
    handleProxyPage(req, res, targetUrl) {
        if (!targetUrl) {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end('<h1>No URL provided</h1>');
            return;
        }
        
        targetUrl = decodeURIComponent(targetUrl);
        
        if (!this.isValidUrl(targetUrl)) {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end('<h1>Invalid URL</h1>');
            return;
        }
        
        const isHttps = targetUrl.startsWith('https');
        const protocol = isHttps ? https : http;
        
        const parsedTarget = url.parse(targetUrl);
        
        const options = {
            hostname: parsedTarget.hostname,
            path: parsedTarget.path || '/',
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate',
                'Connection': 'keep-alive',
            },
            timeout: 5000,
        };
        
        const proxyReq = protocol.request(options, (proxyRes) => {
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(res);
        });
        
        proxyReq.on('error', (error) => {
            console.error('Proxy error:', error);
            res.writeHead(502, { 'Content-Type': 'text/html' });
            res.end(`<h1>Gateway Error</h1><p>${error.message}</p>`);
        });
        
        proxyReq.end();
    }
    
    isValidUrl(urlString) {
        try {
            new URL(urlString);
            return true;
        } catch {
            return false;
        }
    }
    
    start() {
        this.server.listen(this.port, () => {
            console.log(`Proxy server running on port ${this.port}`);
        });
    }
}

const server = new ProxyServer(process.env.PORT || 3000);
server.start();

module.exports = ProxyServer;