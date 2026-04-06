import { layout } from '../layout.js';

// TODO: Review with a lawyer before launch.
const EFFECTIVE_DATE = 'April 15, 2025';
const COMPANY        = 'Sales Ignition LLC';
const STATE          = 'South Carolina';
const EMAIL          = 'hello@inboxsmarts.com';
const SITE           = 'inboxsmarts.com';

export const termsPage = (env) => layout({
  title: 'Terms of Service',
  path: '/terms',
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
    .policy-body ul { padding-left: 20px; margin-bottom: 16px; }
    .policy-body li { margin-bottom: 6px; }
    .policy-body a  { color: var(--accent); }
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
        TERMS OF<br><span class="accent-text">SERVICE</span>
      </h1>
      <div class="last-updated">Effective date: ${EFFECTIVE_DATE}</div>

      <div class="policy-body">
        <p>
          These Terms of Service ("Terms") govern your access to and use of the InboxSmarts website
          and services operated by ${COMPANY} ("Company", "we", "us", "our").
          By using our services, you agree to be bound by these Terms.
          If you do not agree, do not use the services.
        </p>

        <h2>1. Services</h2>
        <p>
          InboxSmarts provides email deliverability diagnostic, monitoring, and improvement services
          including domain health scanning, seed list warm-up programs, inbox placement testing,
          and ongoing reputation monitoring. Specific features are determined by your chosen subscription plan.
        </p>
        <p>
          We reserve the right to modify, suspend, or discontinue any aspect of the service at any time
          with reasonable notice.
        </p>

        <h2>2. Eligibility & Accounts</h2>
        <p>
          You must be at least 18 years old and able to form a legally binding contract to use InboxSmarts.
          You are responsible for maintaining the confidentiality of any login credentials and for all
          activity under your account.
        </p>
        <p>
          You agree to provide accurate, current, and complete information during registration
          and to keep it updated.
        </p>

        <h2>3. Acceptable Use</h2>
        <p>You agree that you will NOT use InboxSmarts to:</p>
        <ul>
          <li>Send spam, unsolicited bulk email, or any communication that violates CAN-SPAM, CASL, GDPR, or any applicable law</li>
          <li>Send emails to purchased, rented, or scraped lists without verified consent from recipients</li>
          <li>Warm up sending infrastructure for any illegal, deceptive, or abusive purpose</li>
          <li>Probe or scan systems you do not own or have authorization to test</li>
          <li>Resell or sublicense our services without written permission</li>
          <li>Reverse engineer, decompile, or attempt to extract source code from our systems</li>
          <li>Use the service in a way that creates disproportionate load on our infrastructure</li>
        </ul>
        <p>
          We reserve the right to suspend or terminate accounts that violate these terms without refund.
        </p>

        <h2>4. Subscription, Billing & Cancellation</h2>

        <h3>Subscription plans</h3>
        <p>
          Paid plans are billed monthly in advance. You authorize us (via our payment processor, Spiffy)
          to charge your payment method on the same date each month.
        </p>

        <h3>Cancellation</h3>
        <p>
          You may cancel your subscription at any time. Cancellations take effect at the end of the
          current billing period. You will retain access to paid features until the period ends.
          We do not pro-rate cancellations.
        </p>

        <h3>Refunds</h3>
        <p>
          We offer a 14-day money-back guarantee on first-time subscriptions. If you are not satisfied
          within 14 days of your first payment, contact us at <a href="mailto:${EMAIL}">${EMAIL}</a>
          for a full refund. After 14 days, payments are non-refundable except where required by law.
        </p>

        <h3>Price changes</h3>
        <p>
          We may change subscription pricing with 30 days advance notice. Continued use after the
          price change constitutes acceptance of the new pricing.
        </p>

        <h2>5. Free Domain Scans</h2>
        <p>
          Free domain scans are provided for informational purposes only. By submitting a domain,
          you represent that you own or are authorized to test the domain. Scan results are estimates
          based on publicly available DNS data and do not constitute a guarantee of deliverability.
        </p>

        <h2>6. Intellectual Property</h2>
        <p>
          All content, trademarks, software, and technology on InboxSmarts are the property of
          ${COMPANY} or its licensors and are protected by applicable intellectual property laws.
          You may not use our branding, content, or technology without express written permission.
        </p>

        <h2>7. Disclaimer of Warranties</h2>
        <p>
          THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND.
          WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR THAT
          ANY PARTICULAR INBOX PLACEMENT RESULT WILL BE ACHIEVED. EMAIL DELIVERABILITY DEPENDS
          ON MANY FACTORS OUTSIDE OUR CONTROL, INCLUDING ISP POLICIES, CONTENT QUALITY,
          AND RECIPIENT ENGAGEMENT.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, ${COMPANY.toUpperCase()} SHALL NOT BE LIABLE
          FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM
          YOUR USE OF THE SERVICES, INCLUDING LOST REVENUE, LOST DATA, OR BUSINESS INTERRUPTION.
          OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM SHALL NOT EXCEED THE AMOUNT YOU PAID US
          IN THE THREE MONTHS PRECEDING THE CLAIM.
        </p>

        <h2>9. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless ${COMPANY}, its officers, directors, employees,
          and agents from any claims, damages, or expenses (including attorney's fees) arising from
          your use of the services, your violation of these Terms, or your violation of any third-party rights.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the State of ${STATE}, USA,
          without regard to conflict of law principles. Any disputes shall be resolved
          in the state or federal courts located in ${STATE}.
        </p>

        <h2>11. Changes to These Terms</h2>
        <p>
          We may update these Terms at any time. We will notify you by email or by posting a notice
          on the site. Continued use of the services after the effective date constitutes acceptance.
        </p>

        <h2>12. Contact</h2>
        <p>
          Questions about these Terms? Contact us at:<br>
          <a href="mailto:${EMAIL}">${EMAIL}</a><br>
          ${COMPANY}, ${STATE}, USA
        </p>

        <p style="margin-top:48px;padding:16px;background:rgba(255,184,48,0.06);border-left:2px solid var(--warn);font-size:13px;color:var(--muted);">
          <strong style="color:var(--warn);font-family:var(--mono);font-size:11px;letter-spacing:1px;">// TODO — LEGAL REVIEW REQUIRED</strong><br>
          This is a template. Have a qualified attorney review these terms before launch.
          Sections on liability, warranties, and governing law carry significant legal weight.
          Remove this notice before going live.
        </p>
      </div>
    </div>
  </section>
`});
