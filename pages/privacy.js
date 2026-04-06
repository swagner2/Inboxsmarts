import { layout } from '../layout.js';

// TODO: Review with a lawyer before launch. This is a starting template.
// Customize: company name, state of incorporation, data practices, Klaviyo/n8n data flows.

const EFFECTIVE_DATE = 'April 15, 2025';
const COMPANY        = 'Sales Ignition LLC';
const STATE          = 'South Carolina';
const EMAIL          = 'privacy@inboxsmarts.com';
const SITE           = 'inboxsmarts.com';

export const privacyPage = (env) => layout({
  title: 'Privacy Policy',
  path: '/privacy',
  head: `
  <style>
    .policy-body h2 {
      font-family: var(--display);
      font-size: 24px;
      font-weight: 700;
      text-transform: uppercase;
      margin: 48px 0 16px;
      color: var(--text);
    }
    .policy-body h3 {
      font-family: var(--mono);
      font-size: 13px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--accent);
      margin: 28px 0 10px;
    }
    .policy-body p, .policy-body li {
      font-size: 15px;
      color: var(--muted);
      line-height: 1.8;
      margin-bottom: 14px;
    }
    .policy-body ul {
      padding-left: 20px;
      margin-bottom: 16px;
    }
    .policy-body li { margin-bottom: 6px; }
    .policy-body a { color: var(--accent); }
    .last-updated {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--muted);
      letter-spacing: 1px;
      margin-bottom: 48px;
    }
  </style>`,
  body: `
  <section class="section" style="padding-top:140px;">
    <div class="container" style="max-width:780px;">
      <div class="section-label">// legal</div>
      <h1 class="page-title" style="font-size:clamp(36px,5vw,72px);margin-bottom:12px;">
        PRIVACY<br><span class="accent-text">POLICY</span>
      </h1>
      <div class="last-updated">Effective date: ${EFFECTIVE_DATE}</div>

      <div class="policy-body">
        <p>
          ${COMPANY} ("InboxSmarts", "we", "us", or "our") operates ${SITE}. This Privacy Policy explains
          how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          Please read it carefully. If you disagree with its terms, please discontinue use of the site.
        </p>

        <h2>1. Information We Collect</h2>

        <h3>Information you provide directly</h3>
        <ul>
          <li>Name and email address (when you submit a scan request or contact form)</li>
          <li>Domain name (submitted for scanning)</li>
          <li>Email sending volume and ESP platform (to tailor recommendations)</li>
          <li>Any information you include in free-text fields</li>
        </ul>

        <h3>Information collected automatically</h3>
        <ul>
          <li>IP address and approximate geographic location</li>
          <li>Browser type and version</li>
          <li>Pages visited and time spent on each page</li>
          <li>Referring URL</li>
          <li>Device type (desktop / mobile)</li>
        </ul>
        <p>
          We use Cloudflare for hosting and security, which may collect access logs.
          We do not currently use third-party analytics (e.g. Google Analytics) but may add them in the future,
          at which point this policy will be updated.
        </p>

        <h3>DNS and domain data</h3>
        <p>
          When you submit a domain for scanning, we perform public DNS lookups (SPF, DKIM, DMARC, MX, PTR records)
          and cross-reference your domain against public blacklist databases. This data is publicly available.
          We store the results to deliver your report and to improve our scanning accuracy over time.
        </p>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To deliver your domain health report and any purchased services</li>
          <li>To send you service-related emails (scan results, account updates)</li>
          <li>To send you marketing emails if you opt in — you may unsubscribe at any time</li>
          <li>To respond to support inquiries and contact form submissions</li>
          <li>To improve our scanning technology and service quality</li>
          <li>To comply with legal obligations</li>
        </ul>
        <p>
          We will never sell your personal information to third parties.
        </p>

        <h2>3. Email Communications & CAN-SPAM Compliance</h2>
        <p>
          If you submit your email address through this site, you may receive transactional emails
          related to your scan or account, and (with your consent) marketing communications about
          InboxSmarts services. Every marketing email includes an unsubscribe link.
          We comply with the CAN-SPAM Act and GDPR where applicable.
        </p>
        <p>
          Our email platform is Klaviyo. Your email address and name may be stored in Klaviyo.
          You can review Klaviyo's privacy policy at <a href="https://www.klaviyo.com/legal/privacy-notice" target="_blank">klaviyo.com</a>.
        </p>

        <h2>4. Data Sharing & Third Parties</h2>
        <p>We share data only with the following categories of service providers, solely to operate our business:</p>
        <ul>
          <li><strong style="color:var(--text)">Cloudflare</strong> — hosting, CDN, and DDoS protection</li>
          <li><strong style="color:var(--text)">Klaviyo</strong> — email marketing platform</li>
          <li><strong style="color:var(--text)">Spiffy</strong> — payment processing and checkout</li>
          <li><strong style="color:var(--text)">Calendly</strong> — appointment scheduling (if you book a call)</li>
        </ul>
        <p>
          We do not share your information with advertisers, data brokers, or unaffiliated third parties.
        </p>

        <h2>5. Data Retention</h2>
        <p>
          We retain your personal information for as long as necessary to provide our services and comply
          with legal obligations. Scan results are retained for 12 months. You may request deletion of
          your data at any time by emailing <a href="mailto:${EMAIL}">${EMAIL}</a>.
        </p>

        <h2>6. Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data ("right to be forgotten")</li>
          <li>Opt out of marketing communications at any time</li>
          <li>Lodge a complaint with your local data protection authority (EEA users)</li>
        </ul>
        <p>To exercise any of these rights, email us at <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>

        <h2>7. Security</h2>
        <p>
          We implement commercially reasonable security measures to protect your information.
          All data is transmitted over HTTPS. However, no method of transmission over the internet
          is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2>8. Children's Privacy</h2>
        <p>
          InboxSmarts is not directed at children under 13. We do not knowingly collect personal
          information from children under 13. If you believe we have done so inadvertently,
          please contact us immediately at <a href="mailto:${EMAIL}">${EMAIL}</a>.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted to this page
          with an updated effective date. Continued use of the site after changes constitutes acceptance.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          For questions about this Privacy Policy or your data, contact us at:<br>
          <a href="mailto:${EMAIL}">${EMAIL}</a><br>
          ${COMPANY}, ${STATE}, USA
        </p>

        <p style="margin-top:48px;padding:16px;background:rgba(255,184,48,0.06);border-left:2px solid var(--warn);font-size:13px;color:var(--muted);">
          <strong style="color:var(--warn);font-family:var(--mono);font-size:11px;letter-spacing:1px;">// TODO — LEGAL REVIEW REQUIRED</strong><br>
          This is a template. Have a qualified attorney review this policy before launch, especially
          if you serve customers in the EU (GDPR), California (CCPA), or other regulated jurisdictions.
          Remove this notice before going live.
        </p>
      </div>
    </div>
  </section>
`});
