# Enable UX pack on classic homepage (`index.html`)

`Newhomepage/index.html` is already wired. For the classic root `index.html` (large file), add these two lines manually:

**In `<head>` near other stylesheets:**
```html
<link rel="stylesheet" href="CSS/nx-ux.css">
```

**Near the other scripts (after `JS/main.js` / `themes/themes.js`):**
```html
<script src="JS/nx-ux.js"></script>
```

Optional: set document title to `Null-X Team` if it still says Glaxyias.
