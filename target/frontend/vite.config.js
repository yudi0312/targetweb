import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    proxy: {
      '/products': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/register': 'http://localhost:3000',
      '/checkout': 'http://localhost:3000',
      '/me': 'http://localhost:3000',
      '/activity': 'http://localhost:3000',
      '/metrics': 'http://localhost:3000',
      '/health': 'http://localhost:3000'
    }
  }
});
