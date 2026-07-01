import { layout } from '../layout.js';

export const howItWorksPage = (env) => layout({
  title: 'How It Works',
  path: '/how-it-works',
  head: `
  <style>
    .process-step {
      display: grid;
      grid-template-columns: 80px 1fr;
      gap: 32px;
      padding: 48px 0;
      border-bottom: 1px solid var(--border);
      align-items: start;
    }
    .process-step:last-child { border-bottom: none; }
    .step-label {
      font-family: var(--mono);
      font-size: 11px;
      letter-spacing: 3px;
      color: var(--accent);
      padding-top: 8px;
    }
    .signal-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2px;
      background: var(--border);
      margin: 40px 0;
    }
    .signal-card {
      background: var(--surface);
      padding: 24px;
    }
    .signal-card:hover { background: var(--surface2); }
    .timeline-row {
      display: grid;
      grid-template-columns: 100px 1fr;
      gap: 24px;
      padding: 20px 0;
      border-bottom: 1px solid var(--border);
    }
    .timeline-week {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--muted);
      letter-spacing: 1px;
      padding-top: 2px;
    }
    @media(max-width:768px){
      .process-step { grid-template-columns: 1fr; gap: 12px; }
    }
  </style>`,
  body: `
  <section class="section" style="padding-top:140px;">
    <div class="container">
      <div class="section-label">// the inboxsmarts method</div>
      <h1 class="page-title">
        HOW WE GET<br>
        YOU TO THE<br>
        <span class="accent-text">INBOX</span>
      </h1>
      <p style="color:var(--muted);font-size:17px;max-width:560px;margin-bottom:80px;line-height:1.7;">
        Email deliverability isn't a single switch you flip. It's a collection of trust signals you send to ISPs over time. We audit, fix, and amplify every one of them.
      </p>

      <!-- Process steps -->
      <div>
        ${[
          {
            n: '01',
            title: 'Domain Health Audit',
            summary: 'We start by diagnosing every technical factor that affects your sender reputation.',
            details: [
              'SPF record syntax and policy validation',
              'DKIM key presence, selector discovery, and 2048-bit enforcement',
              'DMARC policy check — p=none, quarantine, or reject',
              'Blacklist scan across 80+ RBLs including Spamhaus, Barracuda, SURBL',
              'MX record validation and reverse DNS check',
              'Sending domain age and history lookup',
            ],
            callout: 'Most senders have at least one critical misconfiguration they don\'t know about. We find them all in one pass.',
          },
          {
            n: '02',
            title: 'Authentication Hardening',
            summary: 'We fix every authentication gap so ISPs can verify your identity before your email even reaches a filter.',
            details: [
              'SPF record cleanup — remove +all, flatten includes, correct syntax',
              'DKIM key upgrade to 2048-bit with proper selector configuration',
              'DMARC enforcement path: none → quarantine → reject with RUA/RUF reporting',
              'BIMI record setup (Growth and Pro plans)',
              'Return-path alignment for DMARC compliance',
              'Step-by-step DNS change instructions or we handle it directly',
            ],
            callout: 'Authentication isn\'t about deliverability theory — it\'s the actual technical spec Gmail, Outlook, and Yahoo use to decide if your emails are legitimate.',
          },
          {
            n: '03',
            title: 'Seed List Warm-Up',
            summary: 'Our network of engaged inboxes sends positive engagement signals to every major ISP on your behalf.',
            details: [
              'Real inboxes at Gmail, Outlook, Yahoo, Apple Mail, and AOL',
              'Seed addresses open, click, and reply to your campaigns',
              'Signals teach ISPs that your emails are wanted and valuable',
              'Removes your domain from low-engagement penalty buckets',
              'Compounds over time — the longer you run it, the stronger your reputation',
              'Full reporting on seed inbox placement before you send to your list',
            ],
            callout: 'This is the signal amplification layer that separates InboxSmarts from a basic deliverability audit tool.',
          },
          {
            n: '04',
            title: 'Inbox Placement Testing',
            summary: 'Before you hit send to your real list, we tell you exactly where your emails will land.',
            details: [
              'Test rendering and placement across Gmail (primary, promotions, spam)',
              'Outlook inbox vs. junk folder',
              'Yahoo and AOL inbox vs. spam',
              'Apple Mail inbox testing',
              'Subject line and content scoring',
              'Full placement report with actionable recommendations',
            ],
            callout: 'Stop guessing. Know before you send.',
          },
          {
            n: '05',
            title: 'Ongoing Monitoring & Reporting',
            summary: 'Deliverability is a living score, not a one-time fix. We track it continuously.',
            details: [
              'Real-time blacklist monitoring with instant alerts',
              'Google Postmaster Tools integration and interpretation',
              'DMARC aggregate report analysis — who\'s sending on your behalf',
              'Monthly deliverability health report',
              'Sender score and domain reputation trending',
              'Proactive outreach if we detect a problem before you do',
            ],
            callout: 'Most reputation problems start small. We catch them early — before they become inbox crises.',
          },
        ].map(step => `
        <div class="process-step">
          <div class="step-label">${step.n}</div>
          <div>
            <h2 style="font-family:var(--display);font-size:clamp(28px,3vw,42px);font-weight:900;text-transform:uppercase;margin-bottom:12px;">${step.title}</h2>
            <p style="font-size:16px;color:var(--muted);margin-bottom:24px;line-height:1.7;max-width:600px;">${step.summary}</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px;margin-bottom:24px;">
              ${step.details.map(d => `
              <div style="display:flex;align-items:flex-start;gap:10px;font-size:14px;line-height:1.5;">
                <span style="color:var(--accent);font-family:var(--mono);font-size:12px;flex-shrink:0;margin-top:2px;">→</span>
                <span>${d}</span>
              </div>`).join('')}
            </div>
            <div style="background:rgba(32,204,120,0.05);border-left:2px solid var(--accent);padding:14px 20px;font-size:14px;color:var(--muted);line-height:1.6;max-width:600px;">
              ${step.callout}
            </div>
          </div>
        </div>`).join('')}
      </div>

      <!-- Signals we amplify -->
      <div style="margin-top:80px;">
        <div class="section-label">// signals we amplify</div>
        <h2 class="page-title" style="font-size:clamp(32px,4vw,64px);margin-bottom:40px;">
          WHAT ISPS<br><span class="accent-text">ACTUALLY MEASURE</span>
        </h2>
        <div class="signal-grid">
          ${[
            ['Authentication','SPF, DKIM, DMARC — the baseline trust layer every major ISP checks first.'],
            ['Engagement Rate','Opens, clicks, and replies tell ISPs your emails are wanted. We pump this signal.'],
            ['Complaint Rate','Spam reports tank your reputation fast. We monitor and help you stay under 0.1%.'],
            ['Sending Volume','Sudden spikes trigger spam filters. Consistent, growing volume builds trust.'],
            ['Domain Age & History','Older domains with clean histories get more trust. We protect yours.'],
            ['List Hygiene','Hard bounces and stale addresses hurt your score. We flag them early.'],
            ['Content Signals','Spam trigger words and certain HTML patterns affect placement. We test for them.'],
            ['Blacklist Status','Even one listing can collapse your deliverability. We monitor and remove you.'],
          ].map(([t,d]) => `
          <div class="signal-card">
            <div style="font-family:var(--display);font-size:16px;font-weight:700;margin-bottom:8px;">${t}</div>
            <div style="font-size:13px;color:var(--muted);line-height:1.65;">${d}</div>
          </div>`).join('')}
        </div>
      </div>

      <!-- Timeline -->
      <div style="margin-top:80px;">
        <div class="section-label">// typical results timeline</div>
        <h2 class="page-title" style="font-size:clamp(28px,3vw,52px);margin-bottom:32px;">
          WHAT TO EXPECT<br><span class="accent-text">AND WHEN</span>
        </h2>
        ${[
          ['Day 1–2',   'Audit complete, authentication fixes deployed, onboarding call scheduled.'],
          ['Week 1',    'Seed list warm-up begins. Blacklist issues resolved. Baseline placement report delivered.'],
          ['Week 2',    'First measurable inbox placement improvements. DMARC reporting enabled.'],
          ['Week 4',    'Engagement signals compounding. Open rate improvements becoming visible in your ESP.'],
          ['Month 2–3', 'Sustained inbox placement across all major providers. Revenue impact measurable.'],
          ['Ongoing',   'Continuous monitoring, monthly reports, proactive alerts. Your reputation protected.'],
        ].map(([w,d]) => `
        <div class="timeline-row">
          <div class="timeline-week">${w}</div>
          <div style="font-size:15px;line-height:1.6;">${d}</div>
        </div>`).join('')}
      </div>

      <!-- CTA -->
      <div style="margin-top:80px;text-align:center;">
        <h2 class="page-title" style="font-size:clamp(36px,5vw,64px);margin-bottom:24px;">
          READY TO<br><span class="accent-text">GET STARTED?</span>
        </h2>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
          <a href="/signup" class="btn-primary" style="font-size:16px;padding:18px 40px;">Start With a Free Scan →</a>
          <a href="/pricing" class="btn-outline" style="font-size:16px;padding:18px 40px;">See Pricing</a>
        </div>
      </div>
    </div>
  </section>
`});
