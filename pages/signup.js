import { layout } from '../layout.js';

export const signupPage = (env) => layout({
  title: 'Get Started',
  path: '/signup',
  head: `
  <style>
    .signup-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 64px;
      align-items: start;
    }
    .trust-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 28px;
    }
    .trust-icon {
      font-family: var(--mono);
      font-size: 18px;
      color: var(--accent);
      flex-shrink: 0;
      margin-top: 2px;
    }
    .form-wrap {
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 40px;
    }
    .form-wrap::before {
      content: '';
      display: block;
      height: 2px;
      background: var(--accent);
      margin: -40px -40px 32px;
    }
    @media(max-width:900px){
      .signup-grid { grid-template-columns: 1fr; }
    }
  </style>`,
  body: `
  <section class="section" style="padding-top:140px;">
    <div class="container">
      <div class="section-label">// start amplifying your signals</div>
      <h1 class="page-title" style="margin-bottom:60px;">
        GET YOUR<br>
        <span class="accent-text">FREE SCAN</span>
      </h1>

      <div class="signup-grid">
        <!-- LEFT: Trust signals -->
        <div>
          <p style="font-size:17px;color:var(--muted);line-height:1.7;margin-bottom:40px;">
            Enter your details below and we'll run a full domain health audit — SPF, DKIM, DMARC, blacklists, MX records — and send you a prioritized remediation report within 24 hours.
          </p>

          ${[
            ['→','Free, no credit card required','Your scan and report are completely free. We\'ll only ask for payment if you want us to fix the problems.'],
            ['→','14-day money-back guarantee','If you sign up and aren\'t seeing improvement in inbox placement, we\'ll refund every penny.'],
            ['→','Works with any ESP','Klaviyo, ActiveCampaign, Omnisend, Mailchimp — we work alongside whatever you\'re already using.'],
            ['→','Results in 7–14 days','Most clients see measurable inbox placement improvements within two weeks of onboarding.'],
          ].map(([icon,title,body]) => `
          <div class="trust-item">
            <span class="trust-icon">${icon}</span>
            <div>
              <div style="font-family:var(--display);font-size:17px;font-weight:700;margin-bottom:4px;">${title}</div>
              <div style="font-size:14px;color:var(--muted);line-height:1.65;">${body}</div>
            </div>
          </div>`).join('')}

          <div style="margin-top:40px;padding:24px;background:var(--surface);border:1px solid var(--border);">
            <div class="section-label" style="margin-bottom:12px;">// already on a plan?</div>
            <p style="font-size:14px;color:var(--muted);margin-bottom:16px;">
              Login to your InboxSmarts dashboard to view your reports, placement tests, and warmup progress.
            </p>
            <!-- TODO: Wire to actual customer dashboard / portal URL -->
            <a href="#" class="btn-outline" style="font-size:13px;padding:10px 20px;">Customer Login →</a>
          </div>
        </div>

        <!-- RIGHT: Form -->
        <div>
          <div class="form-wrap">
            <div class="section-label" style="margin-bottom:24px;">// domain health check request</div>

            <!-- TODO: Wire form action to your form handler (n8n webhook, Klaviyo form, or Worker POST handler) -->
            <form id="signupForm" onsubmit="handleSignup(event)">
              <div class="form-field">
                <label class="form-label">First Name *</label>
                <input class="form-input" type="text" name="firstName" required placeholder="Jane" />
              </div>

              <div class="form-field">
                <label class="form-label">Last Name *</label>
                <input class="form-input" type="text" name="lastName" required placeholder="Smith" />
              </div>

              <div class="form-field">
                <label class="form-label">Business Email *</label>
                <input class="form-input" type="email" name="email" required placeholder="jane@yourbrand.com" />
              </div>

              <div class="form-field">
                <label class="form-label">Domain to Scan *</label>
                <input class="form-input" type="text" name="domain" required placeholder="yourbrand.com" />
              </div>

              <div class="form-field">
                <label class="form-label">Monthly Email Volume</label>
                <select class="form-select" name="volume">
                  <option value="">Select range...</option>
                  <option value="under-10k">Under 10K</option>
                  <option value="10k-50k">10K – 50K</option>
                  <option value="50k-200k">50K – 200K</option>
                  <option value="200k-1m">200K – 1M</option>
                  <option value="over-1m">Over 1M</option>
                </select>
              </div>

              <div class="form-field">
                <label class="form-label">ESP / Sending Platform</label>
                <select class="form-select" name="esp">
                  <option value="">Select platform...</option>
                  <option value="klaviyo">Klaviyo</option>
                  <option value="activecampaign">ActiveCampaign</option>
                  <option value="omnisend">Omnisend</option>
                  <option value="mailchimp">Mailchimp</option>
                  <option value="mailgun">Mailgun</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div class="form-field">
                <label class="form-label">What's your biggest deliverability challenge?</label>
                <textarea class="form-textarea" name="challenge" placeholder="e.g. Low open rates, landing in spam, blacklist issues..."></textarea>
              </div>

              <div id="formError" style="display:none;color:var(--danger);font-family:var(--mono);font-size:13px;margin-bottom:16px;"></div>

              <button type="submit" class="btn-primary" style="width:100%;font-size:15px;padding:18px;" id="submitBtn">
                Request My Free Scan →
              </button>

              <p style="font-family:var(--mono);font-size:11px;color:var(--muted);margin-top:16px;line-height:1.7;text-align:center;">
                By submitting, you agree to our
                <a href="/privacy">Privacy Policy</a> and
                <a href="/terms">Terms of Service</a>.
                We'll never share your information.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <script>
    async function handleSignup(e) {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      const errEl = document.getElementById('formError');
      btn.disabled = true;
      btn.textContent = 'Submitting...';
      errEl.style.display = 'none';

      const data = Object.fromEntries(new FormData(e.target));

      try {
        // TODO: Replace with your actual form submission endpoint
        // Options: n8n webhook, Klaviyo API, or a Worker POST handler
        // const res = await fetch('/api/signup', { method:'POST', body: JSON.stringify(data), headers:{'Content-Type':'application/json'} });
        // if (!res.ok) throw new Error('Submission failed');

        // Simulated success — remove when wired
        await new Promise(r => setTimeout(r, 1000));
        window.location.href = '/thank-you?domain=' + encodeURIComponent(data.domain);

      } catch(err) {
        errEl.textContent = 'Something went wrong. Please try again or email hello@inboxsmarts.com';
        errEl.style.display = 'block';
        btn.disabled = false;
        btn.textContent = 'Request My Free Scan →';
      }
    }
  </script>
`});
