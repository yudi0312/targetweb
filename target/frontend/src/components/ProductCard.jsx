import { ShoppingCart, Star } from 'lucide-react';

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span>{product.category}</span>
      </div>
      <div className="product-body">
        <div>
          <h3>{product.name}</h3>
          <p>{product.tags.join(' / ')}</p>
        </div>
        <div className="product-meta">
          <span><Star size={15} /> {product.rating}</span>
          <span>{product.stock} stock</span>
        </div>
        <div className="product-footer">
          <strong>${product.price.toLocaleString()}</strong>
          <button onClick={() => onAdd(product)} aria-label={`Add ${product.name} to cart`}>
            <ShoppingCart size={18} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
