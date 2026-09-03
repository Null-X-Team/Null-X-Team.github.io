# Chat avatar fix

## 1. This PR adds `chat/avatar-safe.js`

## 2. One line in `chat/chat.html`

Find:
```html
<script src="chat.js"></script>
```

Change to:
```html
<script src="avatar-safe.js"></script>
<script src="chat.js"></script>
```

That is all. Do **not** merge branch `hotfix/chat-avatars` (it has a truncated chat.html).

## What it does
Broken / missing / huge data-URL profile pics in chat fall back to the default image, then to initials.
