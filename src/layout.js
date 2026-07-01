export const FONTS = `https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500&display=swap`;

export const CSS = `
  :root {
    --bg:        #ffffff;
    --surface:   #f4f4f4;
    --surface2:  #efeeee;
    --border:    #e6e6e6;
    --accent:    #04bf62;
    --accent2:   #20cc78;
    --green:     #20cc78;
    --green-dark:#04bf62;
    --green-tint:rgba(32,204,120,0.1);
    --yellow:    #f8bb1e;
    --yellow-dark:#e1ac00;
    --dark:      #161616;
    --danger:    #e24b4a;
    --warn:      #e1ac00;
    --text:      #1e1e1e;
    --ink:       #1e1e1e;
    --ink-soft:  #383838;
    --muted:     #919191;
    --mono:      'IBM Plex Mono', monospace;
    --display:   'Barlow Condensed', sans-serif;
    --body:      'Barlow', sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--body);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  .grid-bg {
    background-image:
      linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px);
    background-size: 80px 80px;
  }

  a { color: var(--green-dark); text-decoration: none; }
  a:hover { text-decoration: underline; }

  /* ── NAV ── */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 16px 40px;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(255,255,255,0.88);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }

  .logo { font-family: var(--mono); font-size: 15px; font-weight: 600; letter-spacing: 1px; text-decoration: none; color: var(--text); }
  .logo span { color: var(--green-dark); }

  .nav-links { display: flex; gap: 32px; align-items: center; }
  .nav-links a {
    font-family: var(--mono); font-size: 12px; letter-spacing: 1px;
    text-transform: uppercase; color: var(--muted); text-decoration: none;
    transition: color 0.2s;
  }
  .nav-links a:hover, .nav-links a.active { color: var(--text); }

  .nav-cta {
    background: var(--yellow);
    border: 1px solid var(--yellow); color: #1e1e1e;
    font-family: var(--mono); font-weight: 600; font-size: 12px; letter-spacing: 2px;
    text-transform: uppercase; padding: 10px 20px; cursor: pointer;
    transition: all 0.2s; text-decoration: none; display: inline-block;
  }
  .nav-cta:hover { background: var(--yellow-dark); border-color: var(--yellow-dark); color: #1e1e1e; text-decoration: none; }

  /* ── FOOTER ── */
  footer {
    padding: 32px 40px;
    border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 16px;
  }

  .footer-links { display: flex; gap: 24px; flex-wrap: wrap; }
  .footer-links a { font-family: var(--mono); font-size: 11px; color: var(--muted); }
  .footer-links a:hover { color: var(--text); }

  /* ── TYPOGRAPHY ── */
  .section-label {
    font-family: var(--mono); font-size: 11px;
    letter-spacing: 3px; text-transform: uppercase;
    color: var(--green-dark); margin-bottom: 12px;
  }

  .page-title {
    font-family: var(--display);
    font-size: clamp(48px, 7vw, 96px);
    font-weight: 900; text-transform: uppercase;
    line-height: 0.92; margin-bottom: 24px; color: var(--text);
  }

  .accent-text { color: var(--green); }

  /* ── BUTTONS ── */
  .btn-primary {
    background: var(--yellow); color: #1e1e1e;
    border: none; font-family: var(--display);
    font-weight: 800; font-size: 15px;
    letter-spacing: 2px; text-transform: uppercase;
    padding: 16px 36px; cursor: pointer;
    transition: all 0.2s; text-decoration: none;
    display: inline-block;
  }
  .btn-primary:hover { background: var(--yellow-dark); transform: translateY(-1px); text-decoration: none; }

  .btn-outline {
    background: transparent; color: var(--green-dark);
    border: 1px solid var(--green); font-family: var(--display);
    font-weight: 700; font-size: 14px; letter-spacing: 2px;
    text-transform: uppercase; padding: 14px 28px; cursor: pointer;
    transition: all 0.2s; text-decoration: none; display: inline-block;
  }
  .btn-outline:hover { background: var(--green); color: #fff; text-decoration: none; }

  /* ── CARDS ── */
  .card {
    background: var(--surface); border: 1px solid var(--border); padding: 32px;
  }

  /* ── FORMS ── */
  .form-field { margin-bottom: 20px; }
  .form-label {
    display: block; font-family: var(--mono); font-size: 11px;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--muted); margin-bottom: 8px;
  }
  .form-input {
    width: 100%; background: var(--surface2); border: 1px solid var(--border);
    color: var(--text); font-family: var(--mono); font-size: 14px;
    padding: 14px 16px; outline: none; transition: border-color 0.2s;
  }
  .form-input:focus { border-color: var(--green); }
  .form-select {
    width: 100%; background: var(--surface2); border: 1px solid var(--border);
    color: var(--text); font-family: var(--mono); font-size: 14px;
    padding: 14px 16px; outline: none; cursor: pointer;
    -webkit-appearance: none; transition: border-color 0.2s;
  }
  .form-select:focus { border-color: var(--green); }
  .form-textarea {
    width: 100%; background: var(--surface2); border: 1px solid var(--border);
    color: var(--text); font-family: var(--mono); font-size: 14px;
    padding: 14px 16px; outline: none; resize: vertical; min-height: 120px;
    transition: border-color 0.2s;
  }
  .form-textarea:focus { border-color: var(--green); }

  input[type=range] {
    -webkit-appearance: none; width: 100%; height: 4px;
    background: var(--border); outline: none; border-radius: 2px;
  }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%;
    background: var(--green); cursor: pointer;
  }

  /* ── UTILITIES ── */
  .container { max-width: 1100px; margin: 0 auto; padding: 0 40px; }
  .section { padding: 80px 0; }
  .mono { font-family: var(--mono); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.7s ease both; }

  @keyframes scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }

  @media (max-width: 768px) {
    nav { padding: 14px 20px; }
    .nav-links { display: none; }
    .container { padding: 0 20px; }
    .section { padding: 60px 0; }
    footer { padding: 24px 20px; }
  }
`;

export const nav = (activePath = '/') => `
<nav>
  <a href="/" class="logo">inbox<span>smarts</span>.com</a>
  <div class="nav-links">
    <a href="/how-it-works" class="${activePath === '/how-it-works' ? 'active' : ''}">How It Works</a>
    <a href="/pricing"      class="${activePath === '/pricing'      ? 'active' : ''}">Pricing</a>
    <a href="/contact"      class="${activePath === '/contact'      ? 'active' : ''}">Contact</a>
  </div>
  <a href="/signup" class="nav-cta">Get Started</a>
</nav>
`;

export const footer = () => `
<footer>
  <a href="/" class="logo">inbox<span>smarts</span>.com</a>
  <div class="footer-links">
    <a href="/how-it-works">How It Works</a>
    <a href="/pricing">Pricing</a>
    <a href="/contact">Contact</a>
    <a href="/privacy">Privacy Policy</a>
    <a href="/terms">Terms of Service</a>
  </div>
  <span style="font-family:var(--mono);font-size:11px;color:var(--muted)">
    © 2025 InboxSmarts · A SJW Ventures Product
  </span>
</footer>
`;

export const layout = ({ title, path = '/', head = '', body }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — InboxSmarts</title>
  <meta name="description" content="Amplify your email sender signals. Better inbox placement. More revenue." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="${FONTS}" rel="stylesheet" />
  <style>${CSS}</style>
  ${head}
</head>
<body>
  ${nav(path)}
  ${body}
  ${footer()}
</body>
</html>`;
