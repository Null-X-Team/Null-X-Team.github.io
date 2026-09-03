# Classic homepage + UX pack

No manual edits to root `index.html` are required.

Classic already loads `themes/themes.js`, which now also injects:

- `/CSS/nx-ux.css`
- `/JS/nx-ux.js`

After merging PR #144, hard-refresh the classic homepage. You should get:

- Recently played
- Search ranking
- Lazy images
- Update toast
- Report broken game link
- Mobile CSS tweaks
- Service worker registration (on null-x-team.github.io)

Newhomepage is still wired explicitly in `Newhomepage/index.html` as well (harmless if both loaders run; scripts guard with `data-nx-ux`).
