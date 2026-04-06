import { homePage }       from './pages/home.js';
import { pricingPage }    from './pages/pricing.js';
import { signupPage }     from './pages/signup.js';
import { thankYouPage }   from './pages/thank-you.js';
import { howItWorksPage } from './pages/how-it-works.js';
import { contactPage }    from './pages/contact.js';
import { privacyPage }    from './pages/privacy.js';
import { termsPage }      from './pages/terms.js';

const ROUTES = {
  '/':              homePage,
  '/pricing':       pricingPage,
  '/signup':        signupPage,
  '/thank-you':     thankYouPage,
  '/how-it-works':  howItWorksPage,
  '/contact':       contactPage,
  '/privacy':       privacyPage,
  '/terms':         termsPage,
};

const html = (content, status = 200) =>
  new Response(content, {
    status,
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      'X-Content-Type-Options': 'nosniff',
    },
  });

const notFound = () => html(`<!DOCTYPE html>
<html><head><title>404 — InboxSmarts</title>
<meta charset="UTF-8"/>
<style>
  body{background:#060810;color:#e8edf5;font-family:'IBM Plex Mono',monospace;
  display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;}
  h1{font-size:80px;color:#00e5a0;line-height:1;}
  p{color:#5a7080;margin:16px 0 32px;}
  a{color:#00e5a0;}
</style></head>
<body>
  <div>
    <h1>404</h1>
    <p>Page not found.</p>
    <a href="/">← Back to InboxSmarts</a>
  </div>
</body></html>`, 404);

export default {
  async fetch(request, env, ctx) {
    const url    = new URL(request.url);
    const path   = url.pathname.replace(/\/$/, '') || '/';

    // Trailing slash redirect
    if (url.pathname !== '/' && url.pathname.endsWith('/')) {
      return Response.redirect(new URL(path, url.origin).toString(), 301);
    }

    const handler = ROUTES[path];
    if (handler) return html(handler(env));

    return notFound();
  },
};
