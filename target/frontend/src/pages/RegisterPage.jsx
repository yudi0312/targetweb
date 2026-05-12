import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import AuthShell from '../components/AuthShell.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password) {
      setError('Semua field wajib diisi.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }

    try {
      setLoading(true);
      await register(form);
      navigate('/');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Register gagal.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Create a test identity." subtitle="Akun tersimpan di mock JSON database agar demo SOC tetap ringan dan mudah direset.">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label>
          Name
          <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        </label>
        <label>
          Email
          <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        </label>
        <label>
          Password
          <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="primary-button" disabled={loading}>
          <UserPlus size={18} />
          {loading ? 'Creating...' : 'Create account'}
        </button>
        <p className="form-link">Sudah punya akun? <Link to="/login">Login</Link></p>
      </form>
    </AuthShell>
  );
}
