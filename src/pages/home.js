import { layout } from '../layout.js';

export const homePage = (env) => layout({
  title: 'Email Deliverability & Inbox Placement',
  path: '/',
  head: `
  <style>
    .hero { padding: 160px 0 80px; position: relative; overflow: hidden; }
    .hero-title {
      font-family: var(--display); font-size: clamp(56px, 9vw, 112px);
      font-weight: 900; line-height: 0.92; letter-spacing: -1px;
      text-transform: uppercase; margin-bottom: 32px;
    }
    .scanline {
      position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, var(--accent), transparent);
      opacity: 0.5; animation: scanline 5s linear infinite; pointer-events: none;
    }
    .scanner-wrap { display: flex; max-width: 640px; margin-bottom: 24px; }
    .scanner-input {
      flex: 1; background: var(--surface2); border: 1px solid var(--border);
      border-right: none; color: var(--text); font-family: var(--mono);
      font-size: 15px; padding: 16px 20px; outline: none;
      transition: border-color 0.2s;
    }
    .scanner-input:focus { border-color: var(--accent); }
    .result-row {
      display: flex; align-items: center; gap: 12px;
      background: var(--surface); border: 1px solid var(--border);
      padding: 14px 18px; margin-bottom: 6px;
      animation: fadeUp 0.3s ease both;
    }
    .status-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
    .dot-pass { background: #7ec8f5; box-shadow: 0 0 8px #7ec8f5; }
    .dot-fail { background: var(--danger); box-shadow: 0 0 8px var(--danger); }
    .dot-warn { background: var(--warn);   box-shadow: 0 0 8px var(--warn);   }
    .spinner {
      width: 14px; height: 14px; border: 2px solid var(--border);
      border-top-color: var(--accent); border-radius: 50%;
      animation: spin 0.7s linear infinite; flex-shrink: 0;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }
    .score-wrap {
      background: var(--surface); border: 1px solid var(--border);
      padding: 24px 28px; display: flex; align-items: center; gap: 24px;
      margin-top: 12px; animation: fadeUp 0.5s ease both;
    }
    /* ROI */
    .roi-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
    .roi-card { background: var(--surface); border: 1px solid var(--border); padding: 28px; position: relative; overflow: hidden; }
    .roi-card::before { content:''; position:absolute; top:0;left:0;right:0; height:2px; }
    .roi-poor::before  { background: var(--danger); }
    .roi-great::before { background: var(--accent); }
    .roi-value { font-family: var(--mono); font-size: clamp(28px,4vw,46px); font-weight: 600; line-height: 1; }
    .roi-lift {
      background: rgba(0,229,160,0.06); border: 1px solid rgba(0,229,160,0.22);
      padding: 28px 32px; display: flex; align-items: center;
      justify-content: space-between; flex-wrap: wrap; gap: 20px;
    }
    .providers { display: flex; gap: 24px; flex-wrap: wrap; align-items: center; justify-content: center; padding: 40px 0; border-bottom: 1px solid var(--border); }
    .provider-tag { font-family: var(--mono); font-size: 12px; color: var(--muted); padding: 8px 18px; border: 1px solid var(--border); letter-spacing:1px; }
    input[type=range] {
      -webkit-appearance:none; width:100%; height:4px;
      background:var(--border); outline:none; border-radius:2px;
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance:none; width:18px; height:18px; border-radius:50%;
      background:var(--accent); cursor:pointer; box-shadow:0 0 8px rgba(0,229,160,.5);
    }
    @media(max-width:768px){ .roi-grid{grid-template-columns:1fr;} .scanner-wrap{flex-direction:column;} }
  </style>`,
  body: `
  <!-- HERO -->
  <section class="hero grid-bg">
    <div class="scanline"></div>
    <div class="container fade-up">
      <div class="section-label">// signal intelligence for email senders</div>
      <h1 class="hero-title">
        HOW MANY<br>
        EMAILS ARE<br>
        YOU SENDING<br>
        <span class="accent-text">THIS YEAR?</span>
      </h1>
      <p style="font-weight:300;font-size:clamp(16px,2vw,20px);color:rgba(232,237,245,0.6);max-width:520px;line-height:1.65;margin-bottom:48px;">
        Most senders lose <span style="color:var(--warn);font-weight:500">half their revenue</span> to spam folders and poor reputation — without ever knowing it. InboxSmarts amplifies your sending signals so Gmail, Outlook, and Yahoo route you to the inbox, every time.
      </p>

      <!-- DOMAIN SCANNER -->
      <div class="section-label">// free domain health check</div>
      <div class="scanner-wrap">
        <input id="domainInput" class="scanner-input" placeholder="yourdomain.com" type="text" />
        <button class="btn-primary" id="scanBtn" onclick="runScan()" style="padding:16px 28px;font-size:14px;">
          Scan Domain →
        </button>
      </div>
      <div id="scanResults"></div>
    </div>
  </section>

  <!-- PROVIDERS -->
  <div class="providers container">
    <span style="font-family:var(--mono);font-size:11px;letter-spacing:2px;color:var(--muted);">OPTIMIZED FOR:</span>
    <span class="provider-tag">Gmail</span>
    <span class="provider-tag">Outlook</span>
    <span class="provider-tag">Yahoo</span>
    <span class="provider-tag">Apple Mail</span>
    <span class="provider-tag">AOL</span>
    <span class="provider-tag">ProtonMail</span>
  </div>

  <!-- ROI CALCULATOR -->
  <section class="section">
    <div class="container">
      <div class="section-label">// the cost of poor deliverability</div>
      <h2 class="page-title" style="font-size:clamp(36px,5vw,72px);">
        YOU'RE LEAVING<br>
        <span class="accent-text">REAL MONEY</span><br>
        ON THE TABLE
      </h2>
      <p style="color:var(--muted);font-size:16px;max-width:500px;margin-bottom:40px;line-height:1.65;">
        Drag the sliders to see what your email list is actually worth — and what you're losing every month to inbox filters.
      </p>

      <!-- Sliders -->
      <div class="card" style="max-width:600px;margin-bottom:28px;">
        <div class="section-label" style="margin-bottom:20px;">// your sending profile</div>
        <div style="margin-bottom:22px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
            <span class="mono" style="font-size:12px;color:var(--muted);letter-spacing:1px;">LIST SIZE</span>
            <span class="mono" style="font-size:13px;color:var(--accent)" id="listVal">25K contacts</span>
          </div>
          <input type="range" min="1000" max="500000" step="1000" value="25000" id="listSize" oninput="updateROI()">
        </div>
        <div style="margin-bottom:22px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
            <span class="mono" style="font-size:12px;color:var(--muted);letter-spacing:1px;">SENDS / MONTH</span>
            <span class="mono" style="font-size:13px;color:var(--accent)" id="sendsVal">4 campaigns</span>
          </div>
          <input type="range" min="1" max="30" step="1" value="4" id="sends" oninput="updateROI()">
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
            <span class="mono" style="font-size:12px;color:var(--muted);letter-spacing:1px;">AVG ORDER VALUE</span>
            <span class="mono" style="font-size:13px;color:var(--accent)" id="aovVal">$85</span>
          </div>
          <input type="range" min="10" max="1000" step="5" value="85" id="aov" oninput="updateROI()">
        </div>
      </div>

      <!-- Comparison cards -->
      <div class="roi-grid">
        <div class="roi-card roi-poor">
          <div style="font-family:var(--mono);font-size:10px;letter-spacing:3px;color:var(--danger);margin-bottom:16px;">// POOR DELIVERABILITY</div>
          <div style="font-family:var(--display);font-size:12px;font-weight:600;color:var(--muted);margin-bottom:4px;">OPEN RATE</div>
          <div class="roi-value" style="color:var(--danger);margin-bottom:20px;">19%</div>
          <div id="poorStats">
            <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-family:var(--mono);font-size:12px;">
              <span style="color:var(--muted)">Opens</span><span id="poorOpens">—</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-family:var(--mono);font-size:12px;">
              <span style="color:var(--muted)">Clicks</span><span id="poorClicks">—</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-family:var(--mono);font-size:12px;">
              <span style="color:var(--muted)">Orders</span><span id="poorOrders">—</span>
            </div>
          </div>
          <div style="margin-top:16px;">
            <div style="font-family:var(--mono);font-size:11px;color:var(--muted);margin-bottom:6px;">EMAIL REV / YEAR</div>
            <div class="roi-value" style="color:var(--danger)" id="poorRev">$0</div>
          </div>
        </div>

        <div class="roi-card roi-great">
          <div style="font-family:var(--mono);font-size:10px;letter-spacing:3px;color:var(--accent);margin-bottom:16px;">// GREAT DELIVERABILITY</div>
          <div style="font-family:var(--display);font-size:12px;font-weight:600;color:var(--muted);margin-bottom:4px;">OPEN RATE</div>
          <div class="roi-value" style="color:var(--accent);margin-bottom:20px;">41%+</div>
          <div>
            <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-family:var(--mono);font-size:12px;">
              <span style="color:var(--muted)">Opens</span><span style="color:var(--accent)" id="greatOpens">—</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-family:var(--mono);font-size:12px;">
              <span style="color:var(--muted)">Clicks</span><span style="color:var(--accent)" id="greatClicks">—</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-family:var(--mono);font-size:12px;">
              <span style="color:var(--muted)">Orders</span><span style="color:var(--accent)" id="greatOrders">—</span>
            </div>
          </div>
          <div style="margin-top:16px;">
            <div style="font-family:var(--mono);font-size:11px;color:var(--muted);margin-bottom:6px;">EMAIL REV / YEAR</div>
            <div class="roi-value" style="color:var(--accent)" id="greatRev">$0</div>
          </div>
        </div>
      </div>

      <div class="roi-lift">
        <div>
          <div style="font-family:var(--mono);font-size:11px;letter-spacing:2px;color:var(--muted);margin-bottom:8px;">REVENUE UNLOCKED BY INBOXSMARTS / YEAR</div>
          <div style="font-family:var(--mono);font-size:clamp(32px,5vw,56px);font-weight:600;color:var(--accent)" id="liftVal">$0</div>
        </div>
        <a href="/signup" class="btn-primary" style="font-size:15px;">Unlock My Revenue →</a>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS SNIPPET -->
  <section class="section" style="background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
    <div class="container">
      <div class="section-label">// four pillars</div>
      <h2 class="page-title" style="font-size:clamp(32px,4vw,64px);margin-bottom:48px;">
        AMPLIFY YOUR<br><span class="accent-text">SENDER SIGNALS</span>
      </h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:32px;">
        ${[
          ['01','Seed List Warm-Up','Our engaged seed list reads, clicks, and replies to your campaigns — teaching Gmail, Outlook & Yahoo that your emails are wanted.'],
          ['02','Auth Hardening','SPF, DKIM, and DMARC misconfigurations silently route mail to spam. We audit and fix every gap in days.'],
          ['03','Reputation Monitoring','Real-time blacklist checks across 80+ RBLs so you catch problems before they become inbox crises.'],
          ['04','Inbox Placement Testing','Know exactly where your emails land — inbox, promotions, spam — before you hit send.'],
        ].map(([n,t,d]) => `
          <div style="border-left:2px solid var(--border);padding-left:20px;transition:border-color 0.2s;" onmouseenter="this.style.borderLeftColor='var(--accent)'" onmouseleave="this.style.borderLeftColor='var(--border)'">
            <div class="mono" style="font-size:11px;color:var(--accent);margin-bottom:8px;">${n}</div>
            <div style="font-family:var(--display);font-size:20px;font-weight:700;margin-bottom:10px;">${t}</div>
            <div style="font-size:14px;color:var(--muted);line-height:1.7;">${d}</div>
          </div>
        `).join('')}
      </div>
      <div style="margin-top:48px;">
        <a href="/how-it-works" class="btn-outline">See How It Works →</a>
      </div>
    </div>
  </section>

  <!-- FINAL CTA -->
  <section class="section" style="text-align:center;">
    <div class="container">
      <div class="section-label" style="text-align:center;">// stop guessing</div>
      <h2 class="hero-title" style="font-size:clamp(48px,7vw,88px);margin-bottom:24px;">
        YOUR INBOX<br>SCORE IS<br><span class="accent-text">WAITING</span>
      </h2>
      <p style="color:var(--muted);font-size:18px;margin-bottom:40px;max-width:440px;margin-left:auto;margin-right:auto;line-height:1.6;">
        Run your free domain scan and see exactly what ISPs see when your emails arrive. 30 seconds.
      </p>
      <a href="/signup" class="btn-primary" style="font-size:17px;padding:20px 48px;">
        Scan My Domain Free →
      </a>
    </div>
  </section>

  <script>
    // ── SCANNER ──
    const CHECKS = [
      { id:'spf',       label:'SPF Record',     desc:'Sender Policy Framework' },
      { id:'dkim',      label:'DKIM Signature',  desc:'DomainKeys Identified Mail' },
      { id:'dmarc',     label:'DMARC Policy',    desc:'Domain-based Message Auth' },
      { id:'blacklist', label:'Blacklist Status', desc:'Checked across 80+ RBLs' },
      { id:'mx',        label:'MX Records',      desc:'Mail Exchange config' },
    ];

    function fakeResult(check, domain) {
      const seed = domain.split('').reduce((a,c) => a + c.charCodeAt(0), 0);
      const variants = {
        spf:       [['pass','v=spf1 include:_spf.'+domain+' ~all'],['warn','SPF uses +all — too permissive'],['fail','No SPF record found']],
        dkim:      [['pass','Selector: default._domainkey.'+domain],['warn','DKIM key under 2048 bits'],['fail','No DKIM selector found']],
        dmarc:     [['pass','p=reject; pct=100'],['warn','p=none — monitoring only'],['fail','No DMARC record found']],
        blacklist: [['pass','Clean on Spamhaus, Barracuda, SURBL'],['pass','Clean across all 80+ RBLs'],['fail','Listed on Spamhaus PBL']],
        mx:        [['pass','Primary MX: mail.'+domain+' (pri 10)'],['pass','MX records healthy'],['warn','No reverse DNS on primary MX']],
      };
      return variants[check.id][(seed + check.id.length) % variants[check.id].length];
    }

    async function runScan() {
      const domain = document.getElementById('domainInput').value.trim().toLowerCase();
      if (!domain) return;
      const btn = document.getElementById('scanBtn');
      btn.disabled = true; btn.textContent = 'Scanning...';
      const el = document.getElementById('scanResults');
      el.innerHTML = '';
      let score = 0;

      for (const check of CHECKS) {
        const row = document.createElement('div');
        row.className = 'result-row';
        row.innerHTML = \`<div class="spinner"></div>
          <div style="flex:1">
            <div style="font-family:var(--mono);font-size:13px;font-weight:600">\${check.label}</div>
            <div style="font-family:var(--mono);font-size:11px;color:var(--accent2)">checking...<span style="animation:blink 1s infinite">_</span></div>
          </div>
          <span style="font-family:var(--mono);font-size:10px;color:var(--muted)">\${check.desc}</span>\`;
        el.appendChild(row);
        await new Promise(r => setTimeout(r, 700 + Math.random()*600));

        const [status, detail] = fakeResult(check, domain);
        const colors = { pass:'var(--accent)', warn:'var(--warn)', fail:'var(--danger)' };
        const dotClass = { pass:'dot-pass', warn:'dot-warn', fail:'dot-fail' };
        score += status === 'pass' ? 20 : status === 'warn' ? 10 : 0;
        row.innerHTML = \`
          <div class="status-dot \${dotClass[status]}"></div>
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:3px;">
              <span style="font-family:var(--mono);font-size:13px;font-weight:600">\${check.label}</span>
              <span style="font-family:var(--mono);font-size:10px;color:\${colors[status]};letter-spacing:1px">\${status.toUpperCase()}</span>
            </div>
            <span style="font-family:var(--mono);font-size:11px;color:var(--muted)">\${detail}</span>
          </div>
          <span style="font-family:var(--mono);font-size:10px;color:var(--muted)">\${check.desc}</span>\`;
      }

      // Score card
      const color = score >= 80 ? 'var(--accent)' : score >= 50 ? 'var(--warn)' : 'var(--danger)';
      const msg = score >= 80
        ? 'Strong foundation. Now amplify your engagement signals to push past inbox filters.'
        : score >= 50
        ? 'Gaps are costing you inbox placement — and revenue. We can fix this in days.'
        : 'Multiple authentication failures detected. ISPs are flagging your domain right now.';
      const sc = document.createElement('div');
      sc.className = 'score-wrap';
      sc.innerHTML = \`
        <div style="text-align:center;flex-shrink:0">
          <div style="font-family:var(--mono);font-size:42px;font-weight:600;color:\${color};line-height:1">\${score}</div>
          <div style="font-family:var(--mono);font-size:10px;color:var(--muted)">/100 SCORE</div>
        </div>
        <div>
          <div style="font-family:var(--display);font-size:22px;font-weight:700;margin-bottom:8px">
            \${score >= 80 ? 'Strong foundation' : score >= 50 ? 'Room to improve' : 'Critical issues found'}
          </div>
          <div style="font-size:14px;color:var(--muted);max-width:380px;line-height:1.6">\${msg}</div>
          <a href="/signup" class="btn-primary" style="margin-top:16px;font-size:13px;padding:12px 22px;">Get Full Remediation Report →</a>
        </div>\`;
      el.appendChild(sc);
      btn.disabled = false; btn.textContent = 'Scan Again →';
    }

    // ── ROI CALC ──
    function fmtN(n) {
      if (n >= 1e6) return (n/1e6).toFixed(1)+'M';
      if (n >= 1e3) return Math.round(n/1e3)+'K';
      return Math.round(n).toLocaleString();
    }
    function fmtD(n) {
      if (n >= 1e6) return '$'+(n/1e6).toFixed(2)+'M';
      if (n >= 1e3) return '$'+(n/1e3).toFixed(1)+'K';
      return '$'+Math.round(n).toLocaleString();
    }

    function updateROI() {
      const list   = +document.getElementById('listSize').value;
      const sends  = +document.getElementById('sends').value;
      const aov    = +document.getElementById('aov').value;

      document.getElementById('listVal').textContent  = fmtN(list) + ' contacts';
      document.getElementById('sendsVal').textContent = sends + ' campaigns';
      document.getElementById('aovVal').textContent   = '$' + aov;

      const delivered = list * sends * 12 * 0.92;
      const poor  = { open:.19, ctr:.021, conv:.008 };
      const great = { open:.41, ctr:.055, conv:.021 };

      const calc = m => ({
        opens:   delivered * m.open,
        clicks:  delivered * m.ctr,
        orders:  delivered * m.conv,
        revenue: delivered * m.conv * aov,
      });

      const p = calc(poor), g = calc(great);

      document.getElementById('poorOpens').textContent  = fmtN(p.opens);
      document.getElementById('poorClicks').textContent = fmtN(p.clicks);
      document.getElementById('poorOrders').textContent = fmtN(p.orders);
      document.getElementById('poorRev').textContent    = fmtD(p.revenue);

      document.getElementById('greatOpens').textContent  = fmtN(g.opens);
      document.getElementById('greatClicks').textContent = fmtN(g.clicks);
      document.getElementById('greatOrders').textContent = fmtN(g.orders);
      document.getElementById('greatRev').textContent    = fmtD(g.revenue);

      document.getElementById('liftVal').textContent = fmtD(g.revenue - p.revenue);
    }

    updateROI();
  </script>
`});
