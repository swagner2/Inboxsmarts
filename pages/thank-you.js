import { layout } from '../layout.js';

export const thankYouPage = (env) => layout({
  title: 'You\'re In — Check Your Inbox',
  path: '/thank-you',
  head: `
  <style>
    @keyframes check-draw {
      from { stroke-dashoffset: 100; }
      to   { stroke-dashoffset: 0; }
    }
    @keyframes ring-expand {
      0%   { transform: scale(0.5); opacity: 0; }
      60%  { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    .check-circle {
      width: 96px; height: 96px;
      border-radius: 50%;
      background: rgba(0,229,160,0.08);
      border: 2px solid var(--accent);
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 32px;
      animation: ring-expand 0.5s ease both;
    }
    .check-circle svg { animation: ring-expand 0.6s ease 0.1s both; }
    .step-row {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 20px 0;
      border-bottom: 1px solid var(--border);
    }
    .step-num {
      font-family: var(--mono);
      font-size: 13px;
      color: var(--accent);
      flex-shrink: 0;
      min-width: 28px;
    }
  </style>`,
  body: `
  <section class="section" style="padding-top:160px;text-align:center;">
    <div class="container" style="max-width:680px;">
      <div class="check-circle">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="8,20 17,29 32,12" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
            stroke-dasharray="100" stroke-dashoffset="0" style="animation:check-draw 0.4s ease 0.3s both;stroke-dashoffset:100" />
        </svg>
      </div>

      <div class="section-label" style="text-align:center;">// submission received</div>
      <h1 class="page-title" style="font-size:clamp(48px,7vw,80px);margin-bottom:20px;">
        YOU'RE<br><span class="accent-text">ALL SET</span>
      </h1>

      <p style="font-size:18px;color:var(--muted);line-height:1.7;margin-bottom:48px;" id="confirmMsg">
        Your domain scan request is in. We'll have a full deliverability report in your inbox within 24 hours.
      </p>

      <!-- Next steps -->
      <div style="text-align:left;background:var(--surface);border:1px solid var(--border);padding:36px;margin-bottom:40px;">
        <div class="section-label">// what happens next</div>
        ${[
          ['01', 'Check your email','Look for a confirmation from hello@inboxsmarts.com. Add us to your contacts so the report doesn\'t land in your spam (the irony would be real).'],
          ['02', 'We run your scan','Our system checks your SPF, DKIM, DMARC, and blacklist status and compiles a prioritized remediation report.'],
          ['03', 'Review your report','You\'ll receive a detailed breakdown of what\'s working, what\'s broken, and exactly how to fix it — in plain English.'],
          ['04', 'We fix it together','If you want us to handle the remediation, you can upgrade to a paid plan directly from the report. No pressure.'],
        ].map(([n,t,d]) => `
        <div class="step-row">
          <span class="step-num">${n}</span>
          <div>
            <div style="font-family:var(--display);font-size:18px;font-weight:700;margin-bottom:4px;">${t}</div>
            <div style="font-size:14px;color:var(--muted);line-height:1.65;">${d}</div>
          </div>
        </div>`).join('')}
      </div>

      <!-- CTA row -->
      <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
        <a href="/pricing" class="btn-outline">View Plans →</a>
        <a href="/" class="btn-primary">← Back to Home</a>
      </div>

      <!-- Social proof nudge -->
      <div style="margin-top:56px;padding-top:32px;border-top:1px solid var(--border);">
        <div style="font-family:var(--mono);font-size:11px;letter-spacing:2px;color:var(--muted);margin-bottom:20px;">
          WHILE YOU WAIT — SHARE WITH A FOUNDER WHO NEEDS THIS
        </div>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <a href="https://twitter.com/intent/tweet?text=Just+ran+a+free+email+deliverability+scan+with+%40InboxSmarts+%E2%80%94+found+out+I+was+losing+revenue+to+spam+filters+without+knowing+it.+Check+yours:+https://inboxsmarts.com&via=InboxSmarts"
             target="_blank" rel="noopener" class="btn-outline" style="font-size:12px;padding:10px 20px;">
            Share on X / Twitter
          </a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://inboxsmarts.com"
             target="_blank" rel="noopener" class="btn-outline" style="font-size:12px;padding:10px 20px;">
            Share on LinkedIn
          </a>
        </div>
      </div>
    </div>
  </section>

  <script>
    // Personalize with domain from query string
    const params = new URLSearchParams(window.location.search);
    const domain = params.get('domain');
    if (domain) {
      document.getElementById('confirmMsg').innerHTML =
        'Your domain scan for <span style="color:var(--accent);font-family:var(--mono)">' + domain +
        '</span> is in. We\'ll have a full deliverability report in your inbox within 24 hours.';
    }
  </script>
`});
