# NexSOC Commerce

Website e-commerce simulasi target traffic untuk project SOC/SIEM menggunakan Wazuh. Project ini memakai Vite React untuk frontend dan Node.js + Express untuk backend.

## Struktur

```text
frontend/
backend/
```

## Port

- Frontend: `5173`
- Backend: `3000`

## Backend API

- `POST /register`
- `POST /login`
- `GET /products`
- `GET /products/:id`
- `GET /products/categories`
- `GET /products/stats`
- `POST /checkout`
- `GET /health`
- `GET /activity/ping`
- `POST /activity/client-event`
- `GET /metrics/demo`

HTTP request log disimpan di:

```text
backend/logs/access.log
```

## Cara Menjalankan di Ubuntu Server

Pastikan Node.js LTS dan npm sudah terpasang.

### 1. Jalankan backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend akan berjalan di:

```text
http://localhost:3000
```

### 2. Jalankan frontend

Buka terminal kedua.

```bash
cd frontend
npm install
npm run dev
```

Frontend akan berjalan di:

```text
http://localhost:5173
```

## Simulasi Traffic Ringan

Contoh request normal:

```bash
curl http://localhost:3000/products
curl http://localhost:3000/health
curl http://localhost:3000/activity/ping
```

Contoh traffic berulang untuk demo log:

```bash
for i in {1..100}; do curl -s http://localhost:3000/products > /dev/null; done
```

Contoh dengan ApacheBench:

```bash
ab -n 500 -c 20 http://localhost:3000/products
```

Gunakan hanya pada environment lab/demo yang Anda miliki izin untuk uji.

## Package Utama

Frontend:

- `react`
- `vite`
- `react-router-dom`
- `axios`
- `lucide-react`

Backend:

- `express`
- `cors`
- `morgan`
- `jsonwebtoken`
- `bcryptjs`
- `dotenv`
- `nodemon`
