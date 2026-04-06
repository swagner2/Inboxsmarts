# InboxSmarts — Cloudflare Workers Site

Full marketing site for inboxsmarts.com. Built as a single Cloudflare Worker with page-based routing.
No build step required. Pure ESM JS modules served directly by the worker.

---

## Pages

| Route           | File                         | Status       |
|-----------------|------------------------------|--------------|
| `/`             | `src/pages/home.js`          | ✅ Built      |
| `/pricing`      | `src/pages/pricing.js`       | ✅ Stub ready |
| `/signup`       | `src/pages/signup.js`        | ✅ Stub ready |
| `/thank-you`    | `src/pages/thank-you.js`     | ✅ Built      |
| `/how-it-works` | `src/pages/how-it-works.js`  | ✅ Built      |
| `/contact`      | `src/pages/contact.js`       | ✅ Stub ready |
| `/privacy`      | `src/pages/privacy.js`       | ✅ Template   |
| `/terms`        | `src/pages/terms.js`         | ✅ Template   |

---

## Project Structure

```
inboxsmarts/
├── wrangler.toml          # Cloudflare Worker config
├── package.json
├── src/
│   ├── index.js           # Router — maps paths to page handlers
│   ├── layout.js          # Shared CSS, nav, footer, layout wrapper
│   └── pages/
│       ├── home.js
│       ├── pricing.js
│       ├── signup.js
│       ├── thank-you.js
│       ├── how-it-works.js
│       ├── contact.js
│       ├── privacy.js
│       └── terms.js
└── README.md
```

---

## Setup & Deploy

### 1. Install dependencies

```bash
cd inboxsmarts
npm install
```

### 2. Authenticate with Cloudflare

```bash
npx wrangler login
```

### 3. Local development

```bash
npm run dev
# → http://localhost:8787
```

### 4. Deploy to Cloudflare

```bash
npm run deploy
# → https://inboxsmarts.workers.dev
```

### 5. Connect custom domain

In `wrangler.toml`, uncomment and update the `[[routes]]` block:

```toml
[[routes]]
pattern = "inboxsmarts.com/*"
zone_name = "inboxsmarts.com"
```

Make sure `inboxsmarts.com` is added to Cloudflare and DNS is proxied through Cloudflare (orange cloud).

---

## TODOs Before Launch

### Functionality
- [ ] Wire signup form to real endpoint (n8n webhook or Worker POST route)
- [ ] Wire contact form to real endpoint
- [ ] Replace simulated domain scanner with real DNS lookup API (emaildelivery.co)
- [ ] Add Spiffy checkout URLs to `src/pages/pricing.js` (3 plan links)
- [ ] Add Calendly URL to `src/pages/contact.js`
- [ ] Add customer portal / login URL to `src/pages/signup.js`
- [ ] Wire Klaviyo form for email capture (public key: `Mzfpkb`)

### Legal (do before launch)
- [ ] Have attorney review `/privacy` and `/terms`
- [ ] Remove the yellow TODO callout boxes from both legal pages
- [ ] Update `EFFECTIVE_DATE` in both files to actual launch date
- [ ] Add your registered business address

### Content
- [ ] Swap phone number in contact page (`+19494080710`) to InboxSmarts-specific line or remove
- [ ] Add real testimonials / client results to home page
- [ ] Add real case studies once available (True Citrus, Milton's numbers)

### Analytics & Tracking
- [ ] Add Cloudflare Web Analytics (free, privacy-first, no GDPR banner needed)
- [ ] Add UTM parameter passthrough to thank-you page for ad tracking

---

## Adding a New Page

1. Create `src/pages/yourpage.js`:

```js
import { layout } from '../layout.js';

export const yourPage = (env) => layout({
  title: 'Your Page Title',
  path: '/your-path',
  body: `<section class="section" style="padding-top:140px;">
    <div class="container">
      <!-- content here -->
    </div>
  </section>`
});
```

2. Import and register in `src/index.js`:

```js
import { yourPage } from './pages/yourpage.js';

const ROUTES = {
  // ...existing routes...
  '/your-path': yourPage,
};
```

That's it — no build step, no bundler.

---

## Design System Reference

All CSS variables live in `src/layout.js`:

| Variable      | Value      | Use              |
|---------------|------------|------------------|
| `--bg`        | `#060810`  | Page background  |
| `--surface`   | `#0d1117`  | Cards            |
| `--accent`    | `#00e5a0`  | Green highlight  |
| `--danger`    | `#ff4060`  | Errors / fail    |
| `--warn`      | `#ffb830`  | Warnings         |
| `--muted`     | `#5a7080`  | Secondary text   |
| `--mono`      | IBM Plex Mono | Data/labels   |
| `--display`   | Barlow Condensed | Headlines  |
| `--body`      | Barlow     | Body copy        |

Utility classes: `.container`, `.section`, `.section-label`, `.page-title`,
`.btn-primary`, `.btn-outline`, `.card`, `.form-input`, `.form-label`, etc.
