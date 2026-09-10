# Null-X Portal

A clean, minimal web proxy portal with black and orange design.

## Features

- **Real Proxy Backend** - Actual Node.js proxy server, not browser-based
- **Fast & Simple** - Minimal interface, maximum functionality
- **Black & Orange** - Clean aesthetic without fluff
- **Mobile Friendly** - Works on all devices
- **Quick Links** - Fast access to popular sites

## File Structure

```
newnewhomepage/
├── index.html       # Frontend homepage
├── styles.css       # Styling (black & orange)
├── proxy.js         # Client-side proxy handler
├── server.js        # Backend proxy server (Node.js)
├── package.json     # Node dependencies
├── vercel.json      # Vercel deployment config
└── README.md        # This file
```

## How It Works

1. User enters a URL in the input field
2. Frontend sends request to `/api/proxy` endpoint
3. Backend validates the URL
4. User is redirected to `/proxy?url=...` which streams the proxied content
5. Website loads through the proxy server

## Setup

### Local Development
```bash
cd newnewhomepage
npm install
npm start
```

Then open `http://localhost:3000`

### Vercel Deployment
1. Push to your repo
2. Vercel automatically deploys using `vercel.json` config
3. Frontend and proxy API both run on Vercel

## Usage

1. Type or paste a website URL
2. Press Enter or click "Go"
3. Website loads through the proxy

Alternatively, click quick links:
- Google
- YouTube  
- GitHub

## Technical Details

### Backend (server.js)
- Node.js HTTP/HTTPS proxy
- Handles both HTTP and HTTPS requests
- Sets proper User-Agent and headers
- Error handling for failed connections
- 5 second timeout per request

### Frontend (proxy.js)
- Simple, clean JavaScript
- URL normalization (converts "google.com" to "https://google.com")
- Error messages
- Loading states

## Customization

### Change Colors
Edit `styles.css`:
- `#ff8c00` - Orange
- `#0a0a0a` - Black
- `#1a1a1a` - Dark gray
- `#ffffff` - White

### Add Quick Links
Edit `index.html` quick-links section:
```html
<a href="#" class="quick-link" data-url="example.com">Example</a>
```

### Change Server Port
Edit `server.js` last line or set `PORT` environment variable:
```bash
PORT=8080 npm start
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Notes

- This proxy is for legitimate use only
- Some websites may block proxy requests
- JavaScript required on frontend
- Backend requires Node.js 18+