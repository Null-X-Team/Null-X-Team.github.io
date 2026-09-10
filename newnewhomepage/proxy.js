// Proxy Service Handler
class ProxyService {
    constructor() {
        this.proxyEndpoint = '/api/proxy'; // This will use your server's proxy endpoint
        this.urlInput = document.getElementById('urlInput');
        this.proxyBtn = document.getElementById('proxyBtn');
        this.exampleLinks = document.querySelectorAll('.example-link');
        
        this.init();
    }
    
    init() {
        this.proxyBtn.addEventListener('click', () => this.handleProxy());
        this.urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleProxy();
            }
        });
        
        this.exampleLinks.forEach(link => {
            link.addEventListener('click', () => {
                const url = link.getAttribute('data-url');
                this.urlInput.value = url;
                this.handleProxy();
            });
        });
    }
    
    normalizeUrl(url) {
        // Remove whitespace
        url = url.trim();
        
        // If URL doesn't start with http:// or https://, add https://
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        return url;
    }
    
    handleProxy() {
        const url = this.urlInput.value.trim();
        
        if (!url) {
            alert('Please enter a URL');
            return;
        }
        
        const normalizedUrl = this.normalizeUrl(url);
        
        // For a static site on GitHub Pages, we need to encode the URL for the proxy
        // This sends the request through our API proxy endpoint
        this.proxyRequest(normalizedUrl);
    }
    
    async proxyRequest(url) {
        try {
            // Show loading state
            const originalText = this.proxyBtn.textContent;
            this.proxyBtn.textContent = '⏳ Loading...';
            this.proxyBtn.disabled = true;
            
            // Encode the URL for the API
            const encodedUrl = encodeURIComponent(url);
            
            // For GitHub Pages, we'll use a simpler approach:
            // Open the URL with the proxy service
            // You can configure different proxy services here
            
            // Option 1: Direct navigation (browser's built-in proxy capability)
            // Option 2: Use a third-party proxy service
            const proxyService = 'https://corsproxy.io/?';
            const proxyUrl = proxyService + encodedUrl;
            
            // Try to open in a new tab
            window.open(proxyUrl, '_blank');
            
            // Reset button
            setTimeout(() => {
                this.proxyBtn.textContent = originalText;
                this.proxyBtn.disabled = false;
            }, 500);
            
        } catch (error) {
            console.error('Proxy error:', error);
            alert('Error: Could not connect to proxy service');
            this.proxyBtn.textContent = 'Browse';
            this.proxyBtn.disabled = false;
        }
    }
}

// Initialize proxy service when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ProxyService();
    });
} else {
    new ProxyService();
}