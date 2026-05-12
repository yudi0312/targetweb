import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  function persist(nextItems) {
    setItems(nextItems);
    localStorage.setItem('cart', JSON.stringify(nextItems));
  }

  function addToCart(product) {
    const existing = items.find((item) => item.id === product.id);
    const nextItems = existing
      ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...items, { ...product, quantity: 1 }];

    persist(nextItems);
  }

  function removeFromCart(productId) {
    persist(items.filter((item) => item.id !== productId));
  }

  function updateQuantity(productId, quantity) {
    const safeQuantity = Math.max(1, Number(quantity));
    persist(items.map((item) => item.id === productId ? { ...item, quantity: safeQuantity } : item));
  }

  function clearCart() {
    persist([]);
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(() => ({
    items,
    total,
    count,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }), [items, total, count]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
