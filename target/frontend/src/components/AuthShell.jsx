import { Activity, ShieldCheck, Zap } from 'lucide-react';

export default function AuthShell({ title, subtitle, children }) {
  return (
    <main className="auth-screen">
      <section className="auth-panel">
        <div className="brand-row">
          <div className="brand-mark">N</div>
          <span>NexSOC</span>
        </div>
        <div className="auth-copy">
          <p className="eyebrow">secure commerce simulation</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="signal-card">
          <div>
            <Activity size={18} />
            <span>HTTP telemetry</span>
          </div>
          <strong>live</strong>
        </div>
        <div className="feature-strip">
          <span><ShieldCheck size={16} /> JWT auth</span>
          <span><Zap size={16} /> SIEM ready</span>
        </div>
      </section>
      <section className="auth-form-shell">
        {children}
      </section>
    </main>
  );
}
