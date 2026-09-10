# Null-X Beautiful Homepage with Proxy

A modern, feature-rich homepage with integrated web proxy and theme system.

## Features

✨ **Multiple Themes**
- Dark Theme (Default)
- Light Theme
- Neon Theme (High contrast)
- Cyberpunk Theme (Vibrant)

🌐 **Web Proxy**
- Fast URL proxying
- Support for multiple websites
- Example quick links
- URL normalization

🎨 **Design**
- Modern, glassmorphic UI
- Responsive design
- Smooth animations
- Beautiful gradients

📱 **Mobile Friendly**
- Works on all devices
- Touch-friendly buttons
- Responsive grid layout

## File Structure

```
newnewhomepage/
├── index.html          # Main HTML file
├── styles.css          # Core styling
├── themes.js           # Theme management
├── proxy.js            # Proxy functionality
├── api-handler.js      # Backend proxy logic
├── themes/
│   ├── dark.css        # Dark theme
│   ├── light.css       # Light theme
│   ├── neon.css        # Neon theme
│   └── cyberpunk.css   # Cyberpunk theme
└── README.md           # This file
```

## How to Use

### Basic Usage
1. Enter a URL in the input field (e.g., google.com)
2. Click "Browse" or press Enter
3. The proxy will open the website in a new tab

### Switching Themes
Click the theme button (🌙, ☀️, ⚡, 🤖) in the top-right to cycle through themes.
Your preference is saved in browser storage.

### Example Links
Click on "Google", "YouTube", or "GitHub" to quickly proxy those sites.

## Technical Details

### Proxy System
The proxy uses CORS proxy services to bypass restrictions:
- Default: corsproxy.io
- URLs are properly normalized
- Opens in new tabs for better UX

### Theme System
- CSS variables for easy customization
- LocalStorage for persistence
- Real-time switching without reload

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px
- Flexible grid layouts

## Customization

### Adding a New Theme
1. Create `themes/mytheme.css`
2. Define CSS variables:
```css
:root {
    --primary-color: #yourcolor;
    --secondary-color: #yourcolor;
    /* ... other variables ... */
}
```
3. Add theme name to `themes.js` array
4. Add icon to `updateToggleIcon()` method

### Changing Proxy Service
Edit `proxy.js` line with `proxyService` variable to use a different proxy:
```javascript
const proxyService = 'https://yourproxy.com/?';
```

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes
- This proxy is for educational/legitimate use only
- Some websites may have specific restrictions
- JavaScript is required for full functionality
- Theme preference persists across sessions

## Future Enhancements
- User bookmarks
- History tracking
- Advanced proxy options
- Custom URL shortcuts
- Search suggestions