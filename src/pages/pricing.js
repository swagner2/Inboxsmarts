import { layout } from '../layout.js';

// TODO: Wire SPIFFY_URL to your actual Spiffy checkout links
const PLANS = [
  {
    id:       'starter',
    name:     'Starter',
    price:    '$97',
    period:   '/mo',
    badge:    null,
    desc:     'For senders getting serious about inbox placement.',
    features: [
      'Domain health scan (SPF / DKIM / DMARC)',
      'Blacklist monitoring — 80+ RBLs',
      'Inbox placement test — 5 seed addresses',
      'Monthly deliverability report',
      'Email support',
    ],
    cta:      'Get Started',
    ctaUrl:   'https://saleignite.spiffy.co/inboxsmarts-starter', // TODO
    highlight: false,
  },
  {
    id:       'growth',
    name:     'Growth',
    price:    '$297',
    period:   '/mo',
    badge:    'Most Popular',
    desc:     'For DTC brands sending 50K+ emails per month.',
    features: [
      'Everything in Starter',
      'Full seed list warm-up (50-address network)',
      'Inbox placement test — 50 seed addresses',
      'Weekly deliverability reporting',
      'DMARC aggregate report analysis',
      'Dedicated Slack channel',
      'Priority email + Zoom support',
    ],
    cta:      'Get Started',
    ctaUrl:   'https://saleignite.spiffy.co/inboxsmarts-growth', // TODO
    highlight: true,
  },
  {
    id:       'pro',
    name:     'Pro',
    price:    '$597',
    period:   '/mo',
    badge:    null,
    desc:     'For high-volume senders who need managed deliverability.',
    features: [
      'Everything in Growth',
      'Full seed list warm-up (200-address network)',
      'Dedicated IP setup & warm-up strategy',
      'Custom suppression list management',
      'Weekly 30-min strategy call',
      'SLA — 4-hour response time',
      'White-glove onboarding',
    ],
    cta:      'Get Started',
    ctaUrl:   'https://saleignite.spiffy.co/inboxsmarts-pro', // TODO
    highlight: false,
  },
];

export const pricingPage = (env) => layout({
  title: 'Pricing',
  path: '/pricing',
  head: `
  <style>
    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2px;
      background: var(--border);
      margin-bottom: 64px;
    }
    .plan-card {
      background: var(--surface);
      padding: 36px 32px;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .plan-card.featured {
      background: var(--surface2);
    }
    .plan-card.featured::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: var(--accent);
    }
    .plan-badge {
      display: inline-block;
      background: var(--accent);
      color: #000;
      font-family: var(--mono);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 4px 10px;
      margin-bottom: 16px;
    }
    .plan-price {
      font-family: var(--mono);
      font-size: 48px;
      font-weight: 600;
      line-height: 1;
      margin-bottom: 4px;
    }
    .plan-feature {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 10px 0;
      border-bottom: 1px solid var(--border);
      font-size: 14px;
      line-height: 1.5;
    }
    .plan-feature::before {
      content: '→';
      font-family: var(--mono);
      font-size: 12px;
      color: var(--accent);
      flex-shrink: 0;
      margin-top: 1px;
    }
    .faq-item {
      border-bottom: 1px solid var(--border);
      padding: 24px 0;
    }
    .faq-q {
      font-family: var(--display);
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .faq-a {
      font-size: 15px;
      color: var(--muted);
      line-height: 1.7;
      max-width: 700px;
    }
    .compare-row {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 1px;
      background: var(--border);
      margin-bottom: 1px;
    }
    .compare-cell {
      background: var(--surface);
      padding: 12px 16px;
      font-family: var(--mono);
      font-size: 12px;
    }
    .compare-header .compare-cell {
      background: var(--surface2);
      color: var(--muted);
      letter-spacing: 1px;
    }
    @media(max-width:768px){ .compare-row{grid-template-columns:1fr 1fr;} .compare-row .compare-cell:nth-child(n+3){display:none;} }
  </style>`,
  body: `
  <section class="section" style="padding-top:140px;">
    <div class="container">
      <div class="section-label">// choose your plan</div>
      <h1 class="page-title">
        SIMPLE,<br>
        <span class="accent-text">TRANSPARENT</span><br>
        PRICING
      </h1>
      <p style="color:var(--muted);font-size:17px;max-width:480px;margin-bottom:64px;line-height:1.65;">
        Every plan includes a 14-day money-back guarantee. No long-term contracts. Cancel any time.
      </p>

      <!-- PLAN CARDS -->
      <div class="pricing-grid">
        ${PLANS.map(plan => `
        <div class="plan-card ${plan.highlight ? 'featured' : ''}">
          ${plan.badge ? `<div class="plan-badge">${plan.badge}</div>` : '<div style="height:26px;margin-bottom:16px;"></div>'}
          <div style="font-family:var(--display);font-size:28px;font-weight:900;text-transform:uppercase;margin-bottom:8px;">${plan.name}</div>
          <div class="plan-price" style="color:${plan.highlight ? 'var(--accent)' : 'var(--text)'}">
            ${plan.price}<span style="font-size:18px;color:var(--muted)">${plan.period}</span>
          </div>
          <div style="font-size:14px;color:var(--muted);margin:12px 0 24px;line-height:1.6;">${plan.desc}</div>
          <div style="flex:1;margin-bottom:28px;">
            ${plan.features.map(f => `<div class="plan-feature">${f}</div>`).join('')}
          </div>
          <a href="${plan.ctaUrl}" class="${plan.highlight ? 'btn-primary' : 'btn-outline'}" style="text-align:center;display:block;">
            ${plan.cta} →
          </a>
        </div>`).join('')}
      </div>

      <!-- FEATURE COMPARISON TABLE -->
      <div class="section-label">// full feature comparison</div>
      <div style="overflow-x:auto;margin-bottom:64px;">
        <div class="compare-row compare-header">
          <div class="compare-cell">FEATURE</div>
          <div class="compare-cell">STARTER</div>
          <div class="compare-cell">GROWTH</div>
          <div class="compare-cell">PRO</div>
        </div>
        ${[
          ['Domain health scan',       '✓','✓','✓'],
          ['Blacklist monitoring',      '✓','✓','✓'],
          ['Inbox placement tests',     '5 seeds','50 seeds','200 seeds'],
          ['Seed list warm-up',         '—','✓','✓'],
          ['DMARC report analysis',     '—','✓','✓'],
          ['Dedicated IP setup',        '—','—','✓'],
          ['Weekly strategy calls',     '—','—','✓'],
          ['Slack channel',             '—','✓','✓'],
          ['Response SLA',              'Best effort','24hr','4hr'],
        ].map(([feat,...vals]) => `
        <div class="compare-row">
          <div class="compare-cell" style="color:var(--text)">${feat}</div>
          ${vals.map(v => `<div class="compare-cell" style="color:${v==='—'?'var(--muted)':v==='✓'?'var(--accent)':'var(--text)'}">${v}</div>`).join('')}
        </div>`).join('')}
      </div>

      <!-- FAQ -->
      <div class="section-label">// frequently asked questions</div>
      ${[
        ['Do I need to change my ESP?','No. InboxSmarts works alongside any ESP — Klaviyo, ActiveCampaign, Omnisend, Mailchimp. We fix your domain infrastructure and warm your reputation. Your ESP stays the same.'],
        ['How long before I see results?','Most clients see measurable inbox placement improvements within 7–14 days. Authentication fixes take effect immediately; seed list warm-up signal compounds over 30–90 days.'],
        ['What if I\'m already blacklisted?','We handle blacklist removal as part of onboarding for Growth and Pro plans. Starter customers receive a remediation checklist they can follow.'],
        ['Is there a setup fee?','Yes, there is a setup fee.'],
        ['Can I upgrade or downgrade?','Yes — anytime. Upgrades take effect immediately. Downgrades take effect at your next billing cycle.'],
        ['What ESP integrations do you support?','Currently Klaviyo, ActiveCampaign, Omnisend, Mailchimp, and Mailgun. Additional platforms available on Pro.'],
      ].map(([q,a]) => `
      <div class="faq-item">
        <div class="faq-q">${q}</div>
        <div class="faq-a">${a}</div>
      </div>`).join('')}

      <!-- BOTTOM CTA -->
      <div style="margin-top:80px;text-align:center;">
        <div class="section-label" style="text-align:center;">// not sure which plan?</div>
        <h2 class="page-title" style="font-size:clamp(36px,5vw,64px);margin-bottom:20px;">
          START WITH A<br><span class="accent-text">FREE SCAN</span>
        </h2>
        <p style="color:var(--muted);margin-bottom:32px;font-size:16px;">
          Run a free domain health check and we'll recommend the right plan for your sending volume.
        </p>
        <a href="/" class="btn-primary">Scan My Domain Free →</a>
      </div>
    </div>
  </section>
`});
