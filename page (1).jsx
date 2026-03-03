
:root{
  --bg:#0a0a0a; --surface:#101010; --muted:#9aa0a6; --text:#e6e6e6; --brand:#f5d76e; --brand-2:#f0b90b;
}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:var(--bg);color:var(--text);font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif}
a{color:inherit;text-decoration:none}
.container{max-width:1100px;margin:0 auto;padding:24px}
.nav{display:flex;align-items:center;gap:16px;padding:14px 18px;background:#0d0d0d;border-bottom:1px solid #1a1a1a;position:sticky;top:0;z-index:10}
.nav .brand{font-weight:700;letter-spacing:.4px}
.badge{display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border-radius:999px;background:linear-gradient(135deg,var(--brand),var(--brand-2));color:#000;font-weight:700}
.card{background:var(--surface);border:1px solid #1a1a1a;border-radius:16px;padding:18px}
.btn{background:#161616;color:var(--text);border:1px solid #2a2a2a;border-radius:12px;padding:10px 14px;cursor:pointer}
.btn:hover{background:#1b1b1b}
.input, .select, .textarea{width:100%;background:#0b0b0b;color:var(--text);border:1px solid #242424;border-radius:12px;padding:10px 12px}
.grid{display:grid;gap:16px}
@media(min-width:720px){.grid-2{grid-template-columns:1fr 1fr}}
.header-hero{padding:48px 18px;border-bottom:1px solid #1a1a1a;background:radial-gradient(1200px 600px at 10% -20%,rgba(245,215,110,.1),transparent)}
