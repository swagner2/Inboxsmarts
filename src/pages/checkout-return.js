import { layout } from '../layout.js';

export const checkoutReturnPage = (env) => layout({
  title: 'Seed Setup',
  path: '/checkout-return',
  head: `
  <style>
    .return-grid {
      display: grid;
      grid-template-columns: 0.85fr 1.15fr;
      gap: 64px;
      align-items: start;
    }
    .provider-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
    .provider-option {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--surface2);
      border: 1px solid var(--border);
      color: var(--text);
      font-family: var(--mono);
      font-size: 13px;
      padding: 14px 12px;
      cursor: pointer;
    }
    .provider-option:has(input:checked) {
      border-color: var(--accent);
      background: rgba(0,229,160,0.06);
    }
    .provider-option input { accent-color: var(--accent); }
    .setup-note {
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 24px;
    }
    @media(max-width:900px){
      .return-grid { grid-template-columns: 1fr; gap: 40px; }
      .provider-grid { grid-template-columns: 1fr; }
    }
  </style>`,
  body: `
  <section class="section" style="padding-top:140px;">
    <div class="container">
      <div class="section-label">// payment received</div>
      <h1 class="page-title" style="margin-bottom:60px;">
        SET UP YOUR<br>
        <span class="accent-text">SEEDING</span>
      </h1>

      <div class="return-grid">
        <div>
          <p style="font-size:17px;color:var(--muted);line-height:1.7;margin-bottom:32px;">
            Tell us where to run your seed activity and which sender identity we should use. This gives us what we need to start onboarding your account.
          </p>

          <div class="setup-note">
            <div class="section-label" style="margin-bottom:12px;">// what we need</div>
            ${[
              ['01', 'Mailbox providers', 'Choose Gmail, Outlook, Yahoo, or any combination you want included in the seed network.'],
              ['02', 'Sender address', 'Use the exact email address you plan to send from.'],
              ['03', 'Sending domain', 'Use the domain that should build reputation through your campaigns.'],
            ].map(([n,t,d]) => `
            <div style="display:flex;gap:14px;padding:14px 0;border-bottom:1px solid var(--border);">
              <span style="font-family:var(--mono);font-size:12px;color:var(--accent);min-width:24px;">${n}</span>
              <div>
                <div style="font-family:var(--display);font-size:16px;font-weight:700;margin-bottom:4px;">${t}</div>
                <div style="font-size:13px;color:var(--muted);line-height:1.6;">${d}</div>
              </div>
            </div>`).join('')}
          </div>
        </div>

        <div class="card" style="border-top:2px solid var(--accent);">
          <div class="section-label" style="margin-bottom:24px;">// seed setup intake</div>

          <form id="postPurchaseForm" onsubmit="handlePostPurchaseIntake(event)">
            <input type="hidden" name="plan" id="planInput" />
            <input type="hidden" name="stripeSessionId" id="stripeSessionInput" />

            <div class="form-field">
              <label class="form-label">Email Used At Checkout *</label>
              <input class="form-input" type="email" name="checkoutEmail" required placeholder="jane@yourbrand.com" />
            </div>

            <div class="form-field">
              <label class="form-label">Mailbox Providers To Seed *</label>
              <div class="provider-grid">
                <label class="provider-option"><input type="checkbox" name="mailboxProviders" value="gmail" /> Gmail</label>
                <label class="provider-option"><input type="checkbox" name="mailboxProviders" value="outlook" /> Outlook</label>
                <label class="provider-option"><input type="checkbox" name="mailboxProviders" value="yahoo" /> Yahoo</label>
              </div>
            </div>

            <div class="form-field">
              <label class="form-label">Sender Email Address *</label>
              <input class="form-input" type="email" name="senderEmail" required placeholder="newsletter@yourbrand.com" />
            </div>

            <div class="form-field">
              <label class="form-label">Sending Domain *</label>
              <input class="form-input" type="text" name="sendingDomain" required placeholder="yourbrand.com" />
            </div>

            <div class="form-field">
              <label class="form-label">Sending Platform / ESP</label>
              <input class="form-input" type="text" name="sendingPlatform" placeholder="Klaviyo, Mailchimp, Google Workspace..." />
            </div>

            <div class="form-field">
              <label class="form-label">Notes</label>
              <textarea class="form-textarea" name="notes" placeholder="Anything else we should know before we set this up?"></textarea>
            </div>

            <div id="intakeError" style="display:none;color:var(--danger);font-family:var(--mono);font-size:13px;margin-bottom:16px;"></div>
            <div id="intakeSuccess" style="display:none;color:var(--accent);font-family:var(--mono);font-size:13px;margin-bottom:16px;padding:12px 16px;border:1px solid rgba(0,229,160,0.3);background:rgba(0,229,160,0.05);">
              Details received. We'll review this and start your setup.
            </div>

            <button type="submit" class="btn-primary" style="width:100%;font-size:15px;padding:18px;" id="intakeBtn">
              Send Setup Details →
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <script>
    const params = new URLSearchParams(window.location.search);
    document.getElementById('planInput').value = params.get('plan') || '';
    document.getElementById('stripeSessionInput').value = params.get('session_id') || params.get('checkout_session_id') || '';

    async function handlePostPurchaseIntake(e) {
      e.preventDefault();

      const form = e.target;
      const btn = document.getElementById('intakeBtn');
      const errEl = document.getElementById('intakeError');
      const successEl = document.getElementById('intakeSuccess');
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      data.mailboxProviders = formData.getAll('mailboxProviders');

      btn.disabled = true;
      btn.textContent = 'Sending...';
      errEl.style.display = 'none';
      successEl.style.display = 'none';

      try {
        const res = await fetch('/api/post-purchase-intake', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(body.error || 'Submission failed');

        form.reset();
        successEl.style.display = 'block';
        btn.textContent = 'Details Sent';
      } catch (err) {
        errEl.textContent = err.message || 'Something went wrong. Please email hello@inboxsmarts.com.';
        errEl.style.display = 'block';
        btn.disabled = false;
        btn.textContent = 'Send Setup Details →';
      }
    }
  </script>
`});
