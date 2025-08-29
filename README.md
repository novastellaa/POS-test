# POS REST API

Sebuah REST API sederhana untuk sistem **Point of Sale (POS)**, dibangun menggunakan **Node.js + Express** dengan database **Supabase (PostgreSQL)**.

Project ini dibuat sebagai syarat test Backend Developer di PT. Cazh Teknologi Inovasi.

---

## ✨ Fitur

- **Products**
  - Tambah produk baru
  - Lihat semua produk
  - Lihat detail produk berdasarkan ID
  - Update produk (nama, harga, stok)
  - Hapus produk

- **Transactions**
  - Membuat transaksi baru dengan item produk & kuantitas
  - Update stok otomatis setelah transaksi berhasil
  - Lihat semua transaksi beserta itemnya
  - Lihat detail transaksi berdasarkan ID

- **Validasi**
  - Menggunakan [Zod](https://zod.dev) untuk validasi skema body request
  - Error handling yang rapi untuk menampilkan pesan kesalahan

---

## ⚙️ Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **ORM/Client:** [@supabase/supabase-js](https://supabase.com/docs/reference/javascript)
- **Validation:**
  - [Zod](https://zod.dev) (skema validasi request)
  - [express-validator](https://express-validator.github.io/docs/) (basic validation rules)
- **Middleware:**
  - `morgan` (HTTP request logger)
  - `cors` (Cross-Origin Resource Sharing)
  - Custom `errorHandler` & `validate` middleware

---

## 🛠️ Instalasi dan Penggunaan

### 1. Clone Repository

```bash
git clone https://github.com/novastellaa/test-CAZH-posSystem.git
cd mini-pos-api
```

### 2. Setup Database

Copy `schema.sql` in your SQL Editor (Supabase project).

### 3.  Install Depedencies

```bash
npm install
```

### 4. Setup Environment Variables

```bash
PORT=3000
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-or-service-role-key
```

### 5. Jalankan Server

```bash
npm run dev
```

---

## 🚀 API Endpoints

### Products

- POST /api/products → Tambah produk baru

- GET /api/products → Lihat semua produk

- GET /api/products/:id → Lihat produk by ID

- PUT /api/products/:id → Update produk

- DELETE /api/products/:id → Hapus produk

### Transactions

- POST /api/transactions → Buat transaksi baru (otomatis update stok & hitung total)

- GET /api/transactions → Lihat semua transaksi

- GET /api/transactions/:id → Lihat transaksi by ID

---

## 📄 Contoh Request

### Tambah Produk

```bash
POST /api/products
Content-Type: application/json

{
  "name": "Teh Botol",
  "price": 5000,
  "stock": 50
}
```

### Tambah Transaksi

```bash
POST /api/transactions
Content-Type: application/json

{
  "items": [
    { "product_id": "uuid-produk-1", "quantity": 2 },
    { "product_id": "uuid-produk-2", "quantity": 1 }
  ]
}
```
---

## ✏️ Author

Muhammad Nova Stella

---
