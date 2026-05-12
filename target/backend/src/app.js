import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import checkoutRoutes from './routes/checkout.routes.js';
import activityRoutes from './routes/activity.routes.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(requestLogger);

app.get('/', (req, res) => {
  res.json({
    name: 'SOC Commerce API',
    status: 'online',
    purpose: 'HTTP traffic and SIEM log simulation'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.use(authRoutes);
app.use(productRoutes);
app.use(checkoutRoutes);
app.use(activityRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
