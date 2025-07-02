# Mazal Importaciones Web

Static/Client-Side website for **Mazal Importaciones**, a wholesale importer of hardware accessories (chains, hooks, fittings, etc.) based in Argentina.

---

## 📝 Overview

- **Company Presentation**
- **Product Catalog** organized by categories
- **Product Details** with packaging formats, measurements, and codes
- **Contact Information** page
- **Image carousel** and **Featured Products** section

This staging version is built with:

- **Next.js** (SSG + CSR)
- **TypeScript**
- **Tailwind CSS**
- **Prisma** + PostgreSQL (Neon)
- **API Routes** for CRUD operations on products, formats, and categories
- **Vercel** for hosting and deployment

**Live Demo:** [https://mazal-web.vercel.app](https://mazal-web.vercel.app)

---

## 🛠️ Tech Stack

| Technology        | Purpose                                   |
| ----------------- | ----------------------------------------- |
| Next.js           | React framework with SSG/CSR capabilities |
| TypeScript        | Static typing                             |
| Tailwind CSS      | Utility-first CSS framework               |
| Prisma            | ORM for PostgreSQL                        |
| PostgreSQL (Neon) | Hosted relational database                |
| Axios             | HTTP client for client-side API calls     |
| Vercel            | Deployment and hosting platform           |

---

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-username>/mazal-web.git
   cd mazal-web
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environmental Variables**
   Copy .env.example to .env and set:

   ```env
      DATABASE_URL="postgres://USER:PASS@HOST:PORT/DATABASE"
      NEXT_PUBLIC_API_URL="http://localhost:3000"
   ```

4. **Run migrations & generate Prisma client**

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

6. **Build for production**

   ```bash
   npm run build
   npm start
   ```

   ***

## 🔧 Project Structure

```text
/mazal-web
├─ /pages # Next.js Pages Router
├─ /components # React components (Header, Footer, Carousel…)
├─ /lib # Helpers (Prisma client, API wrapper)
├─ /prisma # Prisma schema & migrations
├─ /public/images # Static images & assets
├─ /styles # Global Tailwind CSS files
├─ README.md # This file
├─ package.json # Scripts & dependencies
└─ tsconfig.json # TypeScript configuration

---

## 📦 API Endpoints

GET /api/categories → List all categories

GET /api/categories/[slug] → Get category with products

GET /api/products → List products (?categoryId=ID&take=N)

GET /api/products/[id] → Get product details with formats & images
```
