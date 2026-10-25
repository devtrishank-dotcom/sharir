# SHARIR — Marketing Website

A fast, dependency-free static website (HTML + CSS). No build step, no npm packages.

## Files

```
website/
├── index.html            → landing page (hero, features, how it works, screenshots, FAQ, download CTA)
├── styles.css            → dark theme matching the app
├── privacy-policy.html   → required by both app stores
├── delete-account.html   → required by both app stores
└── assets/
    ├── logo.png
    └── favicon.png
```

## Run locally

```powershell
cd C:\sharir\website
python -m http.server 5174
```

Open http://localhost:5174

## Host it on your domain (Cloudflare tunnel)

Recommended mapping — the website on the root domain and the admin panel on a subdomain:

```yaml
tunnel: <YOUR-TUNNEL-ID>
credentials-file: C:\Users\<You>\.cloudflared\<TUNNEL-ID>.json

ingress:
  - hostname: api.yourdomain.com
    service: http://localhost:8000      # backend
  - hostname: admin.yourdomain.com
    service: http://localhost:5173      # admin panel
  - hostname: yourdomain.com
    service: http://localhost:5174      # website  <-- changed
  - hostname: www.yourdomain.com
    service: http://localhost:5174      # website  <-- changed
  - service: http_status:404
```

Then the public URLs become:

| URL | What |
|---|---|
| https://yourdomain.com | Marketing website |
| https://admin.yourdomain.com | Admin panel |
| https://api.yourdomain.com | Backend API |

## Add real screenshots

Take screenshots in the app (Home, Workout, Meal scan, Progress) and place them in `assets/`, then replace the placeholder blocks in `index.html`:

```html
<div class="shot"><img src="assets/shot-home.png" alt="Home screen" /></div>
```

Recommended size: **1080 × 1920** (9:16).

## Play Store / App Store links

Update the download buttons (search for `play.google.com/store/apps`) once the app is published:

- Android: `https://play.google.com/store/apps/details?id=com.sharirapp.fitness`
- iOS: `https://apps.apple.com/app/id<YOUR_APP_ID>` (after App Store approval)

## Customising

- Colours: `:root` variables in `styles.css` (`--brand`, `--surface`, …)
- Texts: all copy is plain HTML in `index.html`
- Support email: search for `support@sharirapp.com`
