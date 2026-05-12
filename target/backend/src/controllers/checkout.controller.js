import { products } from '../data/products.js';

export function checkout(req, res) {
  const { items, customer } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Checkout items are required' });
  }

  if (!customer?.name || !customer?.address || !customer?.phone) {
    return res.status(400).json({ message: 'Customer name, address, and phone are required' });
  }

  const enrichedItems = items.map((item) => {
    const product = products.find((entry) => entry.id === item.id);

    if (!product) {
      return null;
    }

    return {
      id: product.id,
      name: product.name,
      quantity: Number(item.quantity || 1),
      price: product.price
    };
  }).filter(Boolean);

  if (enrichedItems.length === 0) {
    return res.status(400).json({ message: 'No valid products found in checkout' });
  }

  const total = enrichedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  res.status(201).json({
    message: 'Order submitted successfully',
    orderId: `ORD-${Date.now()}`,
    total,
    items: enrichedItems,
    createdAt: new Date().toISOString()
  });
}
