const MAILBOX_PROVIDERS = new Set(['gmail', 'outlook', 'yahoo']);

const providerLabels = {
  gmail:   'Gmail / Google Workspace',
  outlook: 'Outlook / Microsoft 365',
  yahoo:   'Yahoo',
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });

const clean = (value, max = 300) =>
  String(value || '').trim().slice(0, max);

const normalizeDomain = (value) =>
  clean(value, 255)
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .split('/')[0]
    .toLowerCase();

const isEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isDomain = (value) =>
  /^(?!-)(?:[a-z0-9-]{1,63}\.)+[a-z]{2,}$/i.test(value);

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));

const buildSummaryText = (intake) => `New post-payment seed setup intake

Checkout email: ${intake.checkoutEmail}
Plan: ${intake.plan || 'Not provided'}
Stripe session: ${intake.stripeSessionId || 'Not provided'}

Mailbox providers to seed:
${intake.mailboxProviders.map((provider) => `- ${providerLabels[provider]}`).join('\n')}

Sender email address: ${intake.senderEmail}
Sending domain: ${intake.sendingDomain}
Sending platform / ESP: ${intake.sendingPlatform || 'Not provided'}

Notes:
${intake.notes || 'None'}

Submitted at: ${intake.submittedAt}
`;

const buildSummaryHtml = (intake) => `
  <h2>New post-payment seed setup intake</h2>
  <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
    <tr><td><strong>Checkout email</strong></td><td>${escapeHtml(intake.checkoutEmail)}</td></tr>
    <tr><td><strong>Plan</strong></td><td>${escapeHtml(intake.plan || 'Not provided')}</td></tr>
    <tr><td><strong>Stripe session</strong></td><td>${escapeHtml(intake.stripeSessionId || 'Not provided')}</td></tr>
    <tr><td><strong>Mailbox providers</strong></td><td>${intake.mailboxProviders.map((provider) => escapeHtml(providerLabels[provider])).join('<br>')}</td></tr>
    <tr><td><strong>Sender email</strong></td><td>${escapeHtml(intake.senderEmail)}</td></tr>
    <tr><td><strong>Sending domain</strong></td><td>${escapeHtml(intake.sendingDomain)}</td></tr>
    <tr><td><strong>Sending platform / ESP</strong></td><td>${escapeHtml(intake.sendingPlatform || 'Not provided')}</td></tr>
    <tr><td><strong>Submitted at</strong></td><td>${escapeHtml(intake.submittedAt)}</td></tr>
  </table>
  <h3>Notes</h3>
  <p style="white-space:pre-wrap;font-family:Arial,sans-serif;font-size:14px;">${escapeHtml(intake.notes || 'None')}</p>
`;

const sendSummaryEmail = async (intake, env) => {
  if (!env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const to = clean(env.INTAKE_EMAIL_TO || 'hello@inboxsmarts.com')
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean);

  const from = clean(env.INTAKE_EMAIL_FROM || 'InboxSmarts <onboarding@inboxsmarts.com>');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: intake.checkoutEmail,
      subject: `New seed setup intake: ${intake.senderEmail}`,
      text: buildSummaryText(intake),
      html: buildSummaryHtml(intake),
    }),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`Resend email failed: ${message}`);
  }
};

export const handlePostPurchaseIntake = async (request, env) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid JSON payload' }, 400);
  }

  const mailboxProviders = Array.isArray(payload.mailboxProviders)
    ? payload.mailboxProviders.map((provider) => clean(provider, 30).toLowerCase()).filter((provider) => MAILBOX_PROVIDERS.has(provider))
    : [];

  const intake = {
    checkoutEmail:   clean(payload.checkoutEmail, 255).toLowerCase(),
    mailboxProviders,
    senderEmail:     clean(payload.senderEmail, 255).toLowerCase(),
    sendingDomain:   normalizeDomain(payload.sendingDomain),
    sendingPlatform: clean(payload.sendingPlatform, 120),
    notes:           clean(payload.notes, 1500),
    plan:            clean(payload.plan, 80),
    stripeSessionId: clean(payload.stripeSessionId, 160),
    submittedAt:     new Date().toISOString(),
  };

  const errors = [];
  if (!isEmail(intake.checkoutEmail)) errors.push('Enter the email used at checkout.');
  if (intake.mailboxProviders.length === 0) errors.push('Choose at least one mailbox provider.');
  if (!isEmail(intake.senderEmail)) errors.push('Enter a valid sender email address.');
  if (!isDomain(intake.sendingDomain)) errors.push('Enter a valid sending domain.');

  if (errors.length) {
    return json({ error: errors.join(' ') }, 400);
  }

  try {
    await sendSummaryEmail(intake, env);
  } catch (error) {
    console.error('Post-purchase intake email failed', error);
    return json({
      error: 'We received your details, but the summary email could not be sent. Please email hello@inboxsmarts.com.',
    }, 502);
  }

  return json({ ok: true });
};
