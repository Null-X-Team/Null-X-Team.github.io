class ProxyService {
    constructor() {
        this.urlInput = document.getElementById('urlInput');
        this.proxyBtn = document.getElementById('proxyBtn');
        this.quickLinks = document.querySelectorAll('.quick-link');
        
        this.init();
    }
    
    init() {
        this.proxyBtn.addEventListener('click', () => this.handleProxy());
        this.urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleProxy();
            }
        });
        
        this.quickLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const url = link.getAttribute('data-url');
                this.urlInput.value = url;
                this.handleProxy();
            });
        });
    }
    
    normalizeUrl(url) {
        url = url.trim();
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        return url;
    }
    
    async handleProxy() {
        const url = this.urlInput.value.trim();
        
        if (!url) {
            this.showError('Please enter a URL');
            return;
        }
        
        const normalizedUrl = this.normalizeUrl(url);
        this.proxyRequest(normalizedUrl);
    }
    
    async proxyRequest(url) {
        try {
            const originalText = this.proxyBtn.textContent;
            this.proxyBtn.textContent = 'Loading...';
            this.proxyBtn.disabled = true;
            this.proxyBtn.classList.add('loading');
            
            const response = await fetch('/api/proxy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: url })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Open proxy in new tab or navigate
                window.location.href = `/proxy?url=${encodeURIComponent(url)}`;
            } else {
                this.showError(data.error || 'Error connecting to proxy');
            }
        } catch (error) {
            console.error('Proxy error:', error);
            this.showError('Connection failed. Please try again.');
        } finally {
            this.proxyBtn.textContent = 'Go';
            this.proxyBtn.disabled = false;
            this.proxyBtn.classList.remove('loading');
        }
    }
    
    showError(message) {
        const errorDiv = document.querySelector('.error-message') || this.createErrorDiv();
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
        setTimeout(() => errorDiv.classList.remove('show'), 4000);
    }
    
    createErrorDiv() {
        const div = document.createElement('div');
        div.className = 'error-message';
        document.querySelector('.proxy-card').insertBefore(div, document.querySelector('.input-wrapper'));
        return div;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ProxyService();
    });
} else {
    new ProxyService();
}