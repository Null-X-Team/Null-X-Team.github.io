# Chat profanity filter fix

## Bug
`chat.js` called `filterBadWords()` which **does not exist**.
`Null-X-Team/badwordfilter` exposes `containsBadWords(text)` → true/false.

So the filter never ran and cuss words went through.

## Fix
1. `chat/profanity-guard.js` — polyfills `filterBadWords`, blocks form submit (general + PMs), reloads library if CDN fails, attaches to inputs.
2. Load order in `chat/chat.html`:
```html
<script src="https://cdn.jsdelivr.net/gh/Null-X-Team/badwordfilter@main/badword.js"></script>
<script src="profanity-guard.js"></script>
<script src="chat.js"></script>
```

If this PR does not update `chat.html`, add the `profanity-guard.js` line yourself after the badwordfilter script.
