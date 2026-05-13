import { Activity, ShieldCheck, Zap } from 'lucide-react';

export default function AuthShell({ title, subtitle, children }) {
  return (
    <main className="auth-screen">
      <section className="auth-panel">
        <div className="brand-row">
          <div className="brand-mark">IT</div>
          <span>ITech Shop</span>
        </div>
        <div className="auth-copy" style={{ marginTop: '150px' }}>
          <p className="eyebrow">E-commerce Hardware Specialist</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </section>
      <section className="auth-form-shell">
        {children}
      </section>
    </main>
  );
}
