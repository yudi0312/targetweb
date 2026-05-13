import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Minus, Plus, Trash2 } from 'lucide-react';
import { api } from '../api/client.js';
import Layout from '../components/Layout.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function CheckoutPage() {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');

    if (items.length === 0) {
      setError('Cart masih kosong.');
      return;
    }

    if (!form.name || !form.phone || !form.address) {
      setError('Lengkapi nama, telepon, dan alamat.');
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.post('/checkout', {
        customer: form,
        items: items.map((item) => ({ id: item.id, quantity: item.quantity }))
      });
      setMessage(`${data.message}. Order ID: ${data.orderId}`);
      clearCart();
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Checkout gagal.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <section className="checkout-grid">
        <div className="checkout-list">
          <div className="section-heading">
            <h2>Cart items</h2>
            <span>{items.length} item type</span>
          </div>

          {items.length === 0 ? (
            <div className="empty-state">
              <p>Cart kosong. Tambahkan produk dari catalog terlebih dahulu.</p>
              <Link className="primary-link" to="/">Back to catalog</Link>
            </div>
          ) : (
            items.map((item) => (
              <article className="cart-row" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>${item.price.toLocaleString()} per unit</p>
                </div>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                    <Minus size={15} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                    <Plus size={15} />
                  </button>
                </div>
                <strong>${(item.price * item.quantity).toLocaleString()}</strong>
                <button className="icon-button danger" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                  <Trash2 size={17} />
                </button>
              </article>
            ))
          )}
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="section-heading">
            <h2>Checkout</h2>
            <span>Complete your purchase</span>
          </div>
          <label>
            Full name
            <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          </label>
          <label>
            Phone
            <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
          </label>
          <label>
            Address
            <textarea value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} />
          </label>
          <div className="total-row">
            <span>Total</span>
            <strong>${total.toLocaleString()}</strong>
          </div>
          {message && <p className="form-success"><CheckCircle2 size={16} /> {message}</p>}
          {error && <p className="form-error">{error}</p>}
          <button className="primary-button" disabled={loading || items.length === 0}>
            {loading ? 'Submitting...' : 'Submit order'}
          </button>
        </form>
      </section>
    </Layout>
  );
}
