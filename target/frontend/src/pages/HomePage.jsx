import { useEffect, useMemo, useState } from 'react';
import { Filter, ServerCrash } from 'lucide-react';
import Layout from '../components/Layout.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { api } from '../api/client.js';
import { useCart } from '../context/CartContext.jsx';

export default function HomePage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        const [productsResponse, categoriesResponse] = await Promise.all([
          api.get('/products', {
            params: { search, category: selectedCategory },
            signal: controller.signal
          }),
          api.get('/products/categories', { signal: controller.signal })
        ]);
        setProducts(productsResponse.data.products);
        setCategories(categoriesResponse.data.categories);
        setError('');
      } catch (requestError) {
        if (requestError.name !== 'CanceledError') {
          setError('Tidak bisa mengambil data produk dari backend.');
        }
      } finally {
        setLoading(false);
      }
    }

    const delay = setTimeout(fetchProducts, 250);
    return () => {
      controller.abort();
      clearTimeout(delay);
    };
  }, [search, selectedCategory]);

  useEffect(() => {
    api.post('/activity/client-event', {
      event: 'catalog_view',
      page: 'homepage',
      timestamp: new Date().toISOString()
    }).catch(() => {});
  }, []);

  const inventoryValue = useMemo(() => {
    return products.reduce((sum, product) => sum + product.price * product.stock, 0);
  }, [products]);

  return (
    <Layout search={search} onSearchChange={setSearch}>
      <section className="summary-grid">
        <div className="summary-card accent-orange">
          <span>Visible catalog</span>
          <strong>{products.length}</strong>
          <small>products returned by API</small>
        </div>
        <div className="summary-card">
          <span>Inventory value</span>
          <strong>${inventoryValue.toLocaleString()}</strong>
          <small>based on filtered data</small>
        </div>
        <div className="summary-card">
          <span>Traffic source</span>
          <strong>REST</strong>
          <small>GET /products every search</small>
        </div>
      </section>

      <section className="catalog-toolbar">
        <div>
          <Filter size={18} />
          <span>Categories</span>
        </div>
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={category === selectedCategory ? 'active' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {error && (
        <div className="empty-state">
          <ServerCrash size={34} />
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="product-grid">
          {Array.from({ length: 6 }).map((_, index) => <div className="product-card skeleton" key={index} />)}
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      )}
    </Layout>
  );
}
