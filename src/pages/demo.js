import { layout } from '../layout.js';

// Google Calendar "Appointment schedule" embed URL
const CAL_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3yTi9fajh-J5Hxe7iXrQ3G36lb9z5eaxNnV2wnxB6KsAioFisGEEivDt_9hEMo3nld_e5mukXA?gv=true';

export const demoPage = (env) => layout({
  title: 'Book a Demo',
  path: '/demo',
  head: `
  <style>
    .demo-hero { padding: 170px 0 90px; text-align: center; position: relative; overflow: hidden; }
    .demo-badge { display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--green-dark);background:var(--green-tint);border:1px solid var(--green);border-radius:999px;padding:8px 18px;margin-bottom:28px; }
    .demo-hero h1 { font-family:var(--display);font-size:clamp(44px,7vw,92px);font-weight:900;line-height:0.94;text-transform:uppercase;letter-spacing:-1px;max-width:20ch;margin:0 auto 24px; }
    .demo-hero h1 .hl { color:var(--green); }
    .demo-hero p.sub { font-size:clamp(17px,2vw,21px);color:var(--ink-soft);max-width:60ch;margin:0 auto 36px;line-height:1.6; }
    .cta-row { display:flex;gap:16px;justify-content:center;flex-wrap:wrap;align-items:center; }

    /* MARQUEE */
    .marquee { overflow:hidden;border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:28px 0;background:var(--surface); }
    .marquee-track { display:flex;gap:16px;width:max-content;animation:scroll 40s linear infinite; }
    .marquee:hover .marquee-track { animation-play-state:paused; }
    @keyframes scroll { from{transform:translateX(0);} to{transform:translateX(-50%);} }
    .quote-card { flex:0 0 340px;background:var(--bg);border:1px solid var(--border);padding:22px 24px; }
    .stars { color:var(--yellow);letter-spacing:2px;font-size:14px;margin-bottom:10px; }
    .quote-card p { font-size:14px;line-height:1.6;color:var(--ink);margin-bottom:12px; }
    .quote-who { font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:1px; }

    /* SECTION HEADERS */
    .demo-label { font-family:var(--mono);font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--green-dark);margin-bottom:14px;text-align:center; }
    .demo-title { font-family:var(--display);font-size:clamp(34px,4.5vw,58px);font-weight:900;text-transform:uppercase;line-height:1;text-align:center;margin-bottom:16px; }
    .demo-intro { text-align:center;color:var(--muted);max-width:60ch;margin:0 auto 52px;font-size:18px;line-height:1.6; }

    /* RESULTS */
    .results-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
    .result-card { background:var(--surface);border:1px solid var(--border);padding:34px 30px;position:relative;overflow:hidden; }
    .result-card::before { content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--green); }
    .result-metric { font-family:var(--mono);font-size:clamp(30px,4vw,44px);font-weight:600;color:var(--green-dark);line-height:1;margin-bottom:12px; }
    .result-brand { font-family:var(--display);font-size:20px;font-weight:800;text-transform:uppercase;margin-bottom:8px; }
    .result-card p { color:var(--muted);font-size:14px;line-height:1.6; }

    /* FEATURES */
    .feat-band { background:var(--dark);color:#fff;border-top:1px solid var(--border);border-bottom:1px solid var(--border); }
    .feat-band .demo-title,.feat-band .demo-label { color:#fff; }
    .feat-band .demo-label { color:var(--green); }
    .feat-band .demo-intro { color:rgba(255,255,255,0.6); }
    .feat-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:28px; }
    .feat-item { border-top:2px solid var(--green);padding-top:20px; }
    .feat-num { font-family:var(--mono);font-size:13px;color:var(--green);letter-spacing:2px;margin-bottom:14px; }
    .feat-item h3 { font-family:var(--display);font-size:24px;font-weight:800;text-transform:uppercase;margin-bottom:10px;line-height:1.05;color:#fff; }
    .feat-item p { color:rgba(255,255,255,0.65);font-size:15px;line-height:1.65; }

    /* SHOWCASE */
    .show-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
    .show-card { background:var(--surface);border:1px solid var(--border);padding:0;overflow:hidden;display:flex;flex-direction:column; }
    .show-thumb { height:150px;background:var(--green-tint);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--green-dark);font-family:var(--mono);font-size:12px;letter-spacing:2px; }
    .show-body { padding:24px; }
    .show-body h3 { font-family:var(--display);font-size:22px;font-weight:800;text-transform:uppercase;margin-bottom:8px; }
    .show-body p { color:var(--muted);font-size:14px;line-height:1.6;margin-bottom:14px; }
    .show-link { font-family:var(--mono);font-size:12px;letter-spacing:1px;color:var(--green-dark); }

    /* TRUST */
    .trust { text-align:center; }
    .trust-stat { font-family:var(--mono);font-size:clamp(40px,6vw,72px);font-weight:600;color:var(--green-dark);line-height:1; }
    .logo-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:14px;margin-top:44px; }
    .logo-pill { border:1px solid var(--border);padding:18px 12px;font-family:var(--mono);font-size:13px;color:var(--muted);letter-spacing:1px; }

    /* BOOKING / CALENDAR */
    .cal-embed { max-width:840px;margin:0 auto;background:var(--bg);border:1px solid var(--border);overflow:hidden; }
    .cal-embed iframe { display:block;width:100%;border:0; }
    .cal-placeholder { max-width:840px;margin:0 auto;border:2px dashed var(--border);background:var(--bg);min-height:520px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;text-align:center;padding:40px; }
    .cal-placeholder .ico { font-size:44px; }
    .cal-placeholder .big { font-family:var(--display);font-size:26px;font-weight:800;text-transform:uppercase; }
    .cal-placeholder .small { font-family:var(--mono);font-size:12px;color:var(--muted);letter-spacing:1px;max-width:44ch;line-height:1.7; }

    /* FINAL */
    .demo-final { text-align:center; }
    .demo-final h2 { font-family:var(--display);font-size:clamp(36px,5vw,68px);font-weight:900;text-transform:uppercase;line-height:0.98;max-width:20ch;margin:0 auto 22px; }
    .demo-final p { color:var(--muted);font-size:18px;max-width:52ch;margin:0 auto 34px;line-height:1.6; }

    @media (max-width:860px){
      .results-grid,.feat-grid,.show-grid { grid-template-columns:1fr; }
    }
  </style>`,
  body: `
  <!-- HERO -->
  <header class="demo-hero grid-bg">
    <div class="container">
      <div class="demo-badge">★ See InboxSmarts in Action ★</div>
      <h1>AI alone won't get you<br>into the <span class="hl">inbox</span></h1>
      <p class="sub">InboxSmarts is the execution engine for deliverability. AI finds the gaps, InboxSmarts fixes what's broken, and you drive more revenue from the emails you already send.</p>
      <div class="cta-row">
        <a href="#book" class="btn-primary">Book a Demo</a>
        <a href="/#scan" class="btn-outline">Run a Free Scan</a>
      </div>
    </div>
  </header>

  <!-- TESTIMONIAL MARQUEE -->
  <div class="marquee">
    <div class="marquee-track">
      ${(() => {
        const quotes = [
          ['This moved us out of Gmail spam in under two weeks.', 'DTC founder, Skincare'],
          ['Open rates nearly doubled. It paid for itself instantly.', 'Head of CRM, Apparel'],
          ['Finally a team that actually understands ISP signals.', 'Ecommerce Director'],
          ['Our Promotions-tab problem is just… gone.', 'Lifecycle Marketer'],
          ['Set up in days, revenue up the next campaign.', 'Founder, Supplements'],
          ['The domain scan alone found issues our ESP missed.', 'Growth Lead'],
        ];
        const one = quotes.map(([q,w]) => `
          <div class="quote-card">
            <div class="stars">★★★★★</div>
            <p>"${q}"</p>
            <div class="quote-who">${w}</div>
          </div>`).join('');
        return one + one;
      })()}
    </div>
  </div>

  <!-- BOOKING -->
  <section class="section" id="book" style="background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
    <div class="container">
      <p class="demo-label">Book Your Demo</p>
      <h2 class="demo-title">Grab a 20-Minute Slot</h2>
      <p class="demo-intro">Pick a time that works — we'll scan your domain live and map your fastest path to the inbox.</p>
      ${CAL_URL
        ? `<div class="cal-embed"><iframe src="${CAL_URL}" width="100%" height="640" frameborder="0"></iframe></div>`
        : `<div class="cal-placeholder">
             <div class="ico">📅</div>
             <div class="big">Your Google Calendar Booking Widget</div>
             <div class="small">Add your Google Calendar appointment-schedule embed link and it will render here so visitors can book a demo without leaving the page.</div>
           </div>`}
    </div>
  </section>

  <!-- RESULTS -->
  <section class="section">
    <div class="container">
      <p class="demo-label">Real Results</p>
      <h2 class="demo-title">Real Placement. Real Growth.</h2>
      <p class="demo-intro">Senders using InboxSmarts reach more inboxes, recover lost revenue, and stop guessing where their email lands.</p>
      <div class="results-grid">
        <div class="result-card">
          <div class="result-metric">2.4×</div>
          <div class="result-brand">Northbound Apparel</div>
          <p>More opens in the first 30 days after clearing the spam folder.</p>
        </div>
        <div class="result-card">
          <div class="result-metric">+38%</div>
          <div class="result-brand">Jade Forest Co.</div>
          <p>Lift in primary-inbox placement across Gmail, Outlook, and Yahoo.</p>
        </div>
        <div class="result-card">
          <div class="result-metric">$14k</div>
          <div class="result-brand">Bloom Supplements</div>
          <p>Recovered monthly email revenue that was landing in Promotions.</p>
        </div>
      </div>
      <div style="text-align:center;margin-top:44px;">
        <a href="#book" class="btn-primary">Book a Demo</a>
      </div>
    </div>
  </section>

  <!-- FEATURES -->
  <section class="section feat-band">
    <div class="container">
      <p class="demo-label">Built for Senders</p>
      <h2 class="demo-title">Works With the Stack You Already Have</h2>
      <p class="demo-intro">No rip-and-replace. InboxSmarts sits alongside your ESP and amplifies the signals that decide placement.</p>
      <div class="feat-grid">
        <div class="feat-item">
          <div class="feat-num">01</div>
          <h3>No New Tools to Learn</h3>
          <p>Keep Klaviyo, Mailchimp, or HubSpot. We work behind the scenes on the reputation layer.</p>
        </div>
        <div class="feat-item">
          <div class="feat-num">02</div>
          <h3>Signals ISPs Reward</h3>
          <p>Real opens, clicks, and replies from an engaged seed list teach mailbox providers you're wanted.</p>
        </div>
        <div class="feat-item">
          <div class="feat-num">03</div>
          <h3>Proof, Not Guesswork</h3>
          <p>Placement testing and monitoring show exactly where you land — before a campaign costs you revenue.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SHOWCASE -->
  <section class="section">
    <div class="container">
      <p class="demo-label">What We Optimize</p>
      <h2 class="demo-title">The Deliverability Playbook</h2>
      <p class="demo-intro">Every lever that moves you from spam to the primary inbox — handled for you.</p>
      <div class="show-grid">
        <div class="show-card">
          <div class="show-thumb">AUTHENTICATION</div>
          <div class="show-body">
            <h3>Auth Hardening</h3>
            <p>SPF, DKIM, and DMARC audited and fixed so ISPs trust every message you send.</p>
            <a href="/how-it-works" class="show-link">See how →</a>
          </div>
        </div>
        <div class="show-card">
          <div class="show-thumb">WARM-UP</div>
          <div class="show-body">
            <h3>Seed List Warm-Up</h3>
            <p>An engaged audience reads, clicks, and replies — rebuilding your sender reputation daily.</p>
            <a href="/how-it-works" class="show-link">See how →</a>
          </div>
        </div>
        <div class="show-card">
          <div class="show-thumb">MONITORING</div>
          <div class="show-body">
            <h3>Placement Monitoring</h3>
            <p>Real-time inbox, promotions, and spam tracking across 80+ blacklists and every major provider.</p>
            <a href="/how-it-works" class="show-link">See how →</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- TRUST -->
  <section class="section trust" style="background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
    <div class="container">
      <p class="demo-label">Trusted at Scale</p>
      <div class="trust-stat">3,142+ senders</div>
      <p class="demo-intro" style="margin-top:16px;">Amplifying their sending signals with InboxSmarts.</p>
      <div class="logo-grid">
        ${['Klaviyo','Shopify','Mailchimp','HubSpot','Gmail','Outlook','Yahoo','Braze','Sendlane','Omnisend','ActiveCampaign','Attentive']
          .map(n => `<div class="logo-pill">${n}</div>`).join('')}
      </div>
    </div>
  </section>

  <!-- FINAL CTA -->
  <section class="section demo-final">
    <div class="container">
      <p class="demo-label">Ready When You Are</p>
      <h2>See Where Your Emails Actually Land</h2>
      <p>Book a 20-minute demo and we'll scan your domain live, show your inbox score, and map the fastest path to the primary inbox.</p>
      <div class="cta-row">
        <a href="#book" class="btn-primary">Book a Demo</a>
        <a href="/signup" class="btn-outline">Get Started</a>
      </div>
    </div>
  </section>
`});
