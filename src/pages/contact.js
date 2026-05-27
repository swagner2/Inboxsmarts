import { layout } from '../layout.js';

export const contactPage = (env) => layout({
  title: 'Contact',
  path: '/contact',
  head: `
  <style>
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.4fr;
      gap: 80px;
      align-items: start;
    }
    .contact-method {
      padding: 24px 0;
      border-bottom: 1px solid var(--border);
    }
    @media(max-width:900px){
      .contact-grid { grid-template-columns: 1fr; gap: 48px; }
    }
  </style>`,
  body: `
  <section class="section" style="padding-top:140px;">
    <div class="container">
      <div class="section-label">// get in touch</div>
      <h1 class="page-title" style="margin-bottom:64px;">
        LET'S TALK<br>
        <span class="accent-text">DELIVERABILITY</span>
      </h1>

      <div class="contact-grid">
        <!-- LEFT: Contact info -->
        <div>
          <p style="font-size:16px;color:var(--muted);line-height:1.7;margin-bottom:40px;">
            Whether you have a deliverability emergency, a question about plans, or just want to know if InboxSmarts is the right fit — we're here.
          </p>

          <div class="contact-method">
            <div class="section-label" style="margin-bottom:8px;">// email</div>
            <a href="mailto:hello@inboxsmarts.com" style="font-family:var(--mono);font-size:16px;color:var(--accent);">
              hello@inboxsmarts.com
            </a>
            <div style="font-size:13px;color:var(--muted);margin-top:6px;">Typical response: within 4 business hours</div>
          </div>

          <div class="contact-method">
            <div class="section-label" style="margin-bottom:8px;">// book a call</div>
            <div style="font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:12px;">
              Prefer to talk it through? Book a free 20-minute deliverability consultation.
            </div>
            <a href="https://calendar.app.google/ERH2VHjwXyJLeJYS6" target="_blank" rel="noopener" class="btn-outline" style="font-size:13px;padding:10px 20px;">
              Book a 20-min Call →
            </a>
          </div>

          <div class="contact-method" style="border-bottom:none;">
            <div class="section-label" style="margin-bottom:8px;">// existing customer support</div>
            <div style="font-size:14px;color:var(--muted);line-height:1.65;">
              Growth and Pro customers — use the Slack channel provided during onboarding for fastest response.
            </div>
          </div>
        </div>

        <!-- RIGHT: Form -->
        <div>
          <div class="card" style="border-top:2px solid var(--accent);">
            <div class="section-label" style="margin-bottom:24px;">// send a message</div>

            <!-- TODO: Wire to n8n webhook or Worker POST handler -->
            <form id="contactForm" onsubmit="handleContact(event)">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                <div class="form-field">
                  <label class="form-label">First Name *</label>
                  <input class="form-input" type="text" name="firstName" required placeholder="Jane" />
                </div>
                <div class="form-field">
                  <label class="form-label">Last Name *</label>
                  <input class="form-input" type="text" name="lastName" required placeholder="Smith" />
                </div>
              </div>

              <div class="form-field">
                <label class="form-label">Email *</label>
                <input class="form-input" type="email" name="email" required placeholder="jane@yourbrand.com" />
              </div>

              <div class="form-field">
                <label class="form-label">Subject *</label>
                <select class="form-select" name="subject" required>
                  <option value="">Select a topic...</option>
                  <option value="free-scan">Request a free domain scan</option>
                  <option value="plan-question">Question about plans / pricing</option>
                  <option value="existing-customer">Existing customer support</option>
                  <option value="emergency">Deliverability emergency</option>
                  <option value="partnership">Partnership / referral inquiry</option>
                  <option value="other">Something else</option>
                </select>
              </div>

              <div class="form-field">
                <label class="form-label">Domain (if applicable)</label>
                <input class="form-input" type="text" name="domain" placeholder="yourbrand.com" />
              </div>

              <div class="form-field">
                <label class="form-label">Message *</label>
                <textarea class="form-textarea" name="message" required placeholder="Tell us what's going on..." style="min-height:140px;"></textarea>
              </div>

              <div id="contactError" style="display:none;color:var(--danger);font-family:var(--mono);font-size:13px;margin-bottom:16px;"></div>
              <div id="contactSuccess" style="display:none;color:var(--accent);font-family:var(--mono);font-size:13px;margin-bottom:16px;padding:12px 16px;border:1px solid rgba(0,229,160,0.3);background:rgba(0,229,160,0.05);">
                ✓ Message sent. We'll be in touch within 4 business hours.
              </div>

              <button type="submit" class="btn-primary" style="width:100%;font-size:15px;padding:18px;" id="contactBtn">
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <script>
    async function handleContact(e) {
      e.preventDefault();
      const btn    = document.getElementById('contactBtn');
      const errEl  = document.getElementById('contactError');
      const succEl = document.getElementById('contactSuccess');
      btn.disabled = true;
      btn.textContent = 'Sending...';
      errEl.style.display = 'none';
      succEl.style.display = 'none';

      const data = Object.fromEntries(new FormData(e.target));

      try {
        // TODO: Replace with actual endpoint
        // await fetch('/api/contact', { method:'POST', body:JSON.stringify(data), headers:{'Content-Type':'application/json'} });
        await new Promise(r => setTimeout(r, 800)); // simulated
        succEl.style.display = 'block';
        e.target.reset();
        btn.textContent = 'Send Another →';
        btn.disabled = false;
      } catch(err) {
        errEl.textContent = 'Something went wrong. Email us directly at hello@inboxsmarts.com';
        errEl.style.display = 'block';
        btn.disabled = false;
        btn.textContent = 'Send Message →';
      }
    }
  </script>
`});
