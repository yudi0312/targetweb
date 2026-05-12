import { products } from '../data/products.js';

export function getProducts(req, res) {
  const { search, category, limit } = req.query;
  let result = [...products];

  if (search) {
    const term = search.toLowerCase();
    result = result.filter((product) => {
      return product.name.toLowerCase().includes(term)
        || product.category.toLowerCase().includes(term)
        || product.tags.some((tag) => tag.toLowerCase().includes(term));
    });
  }

  if (category && category !== 'All') {
    result = result.filter((product) => product.category.toLowerCase() === category.toLowerCase());
  }

  if (limit) {
    result = result.slice(0, Number(limit));
  }

  res.json({
    count: result.length,
    products: result
  });
}

export function getProductById(req, res) {
  const product = products.find((item) => item.id === req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.json({ product });
}

export function getCategories(req, res) {
  const categories = ['All', ...new Set(products.map((product) => product.category))];
  res.json({ categories });
}

export function getProductStats(req, res) {
  const inventoryValue = products.reduce((total, product) => total + product.price * product.stock, 0);
  const lowStock = products.filter((product) => product.stock <= 10);

  res.json({
    totalProducts: products.length,
    inventoryValue,
    lowStockCount: lowStock.length,
    lowStock
  });
}
