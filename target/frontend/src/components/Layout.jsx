import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Activity,
  Boxes,
  CreditCard,
  LayoutDashboard,
  LogIn,
  LogOut,
  Search,
  Shield,
  ShoppingCart,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Layout({ children, search, onSearchChange }) {
  const { user, logout, isAuthenticated } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand-row sidebar-brand" to="/">
          <div className="brand-mark">N</div>
          <span>NexSOC</span>
        </Link>
        <nav className="side-nav">
          <p>Pages</p>
          <NavLink to="/">
            <LayoutDashboard size={18} />
            Catalog
          </NavLink>
          <NavLink to="/checkout">
            <CreditCard size={18} />
            Checkout
            {count > 0 && <b>{count}</b>}
          </NavLink>
          {!isAuthenticated && (
            <>
              <NavLink to="/login">
                <LogIn size={18} />
                Login
              </NavLink>
              <NavLink to="/register">
                <UserPlus size={18} />
                Register
              </NavLink>
            </>
          )}
        </nav>
        <div className="soc-panel">
          <Shield size={20} />
          <span>Wazuh traffic target</span>
          <small>API logs write to access.log</small>
        </div>
      </aside>

      <div className="content-shell">
        <header className="topbar">
          <div className="search-box">
            <Search size={18} />
            <input
              placeholder="Search products, tags, devices"
              value={search || ''}
              onChange={(event) => onSearchChange?.(event.target.value)}
            />
          </div>
          <div className="top-actions">
            <span className="status-pill">
              <Activity size={15} />
              API ready
            </span>
            <Link className="cart-button" to="/checkout" aria-label="Open checkout cart">
              <ShoppingCart size={19} />
              <span>{count}</span>
            </Link>
            <div className="profile-chip">
              <div className="avatar">{user?.name?.[0] || 'G'}</div>
              <span>{user?.name || 'Guest'}</span>
            </div>
            {isAuthenticated && (
              <button className="icon-button" onClick={handleLogout} aria-label="Logout">
                <LogOut size={18} />
              </button>
            )}
          </div>
        </header>
        <main className="main-content">
          <div className="hero-band">
            <div>
              <p className="eyebrow">cyberpunk hardware marketplace</p>
              <h1>Neon-ready devices for realistic SOC traffic.</h1>
            </div>
            <div className="hero-stats">
              <span><Boxes size={18} /> 8 assets</span>
              <span><Shield size={18} /> logged API</span>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
