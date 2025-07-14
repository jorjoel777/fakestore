# 🛒 FakeStore

**FakeStore** is a fully functional e-commerce frontend built with React + Vite, featuring category-based browsing, cart management with persistence, admin login, and a protected admin dashboard. It leverages the public [FakeStoreAPI](https://fakestoreapi.com/).

🔗 Live Demo: [https://fakestore-seven.vercel.app](https://fakestore-seven.vercel.app)

---

## 🚀 Tech Stack

- ⚛️ React + Vite
- 📦 TypeScript
- 📁 React Router DOM v6+
- 🛒 FakeStore API (External)
- 🧠 LocalStorage for cart/session
- 🧪 TailwindCSS (utility-based styling)

---

## 📂 Project Structure

src/

├── assets/ → Static assets (e.g., logo)

├── components/ → Shared UI components (CartSidebar, Button, etc.)

├── lib/ → Utility functions (cartHelpers)

├── pages/ → App pages (ProductList, CategoryPage, etc.)

│ └── admin/ → Admin dashboard views

├── App.tsx → Main app with routes

├── index.css → Base styles

└── main.tsx → Entry point

yaml
Copiar
Editar

---

## 🔐 Admin Access

Authentication uses FakeStoreAPI credentials:

```bash
Username: mor_2314
Password: 1234
🔒 Once logged in, the token is stored in localStorage and grants access to:

/admin/adminDashboard

/admin/products

/admin/users

🧪 Features
✅ Public:
View products by category

Detailed product pages

Add to cart (with persistence)

Interactive cart sidebar

✅ Admin:
Real API login

Protected routes

Admin dashboard (mock)

Product and user lists

⚙️ Getting Started
bash
Copiar
Editar
# 1. Clone the repository
git clone https://github.com/jorjoel777/fakestore
cd fakestore

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
Visit http://localhost:5173 in your browser.

📦 Build & Deploy
To generate the production build:

bash
Copiar
Editar
npm run build
To preview the build locally:

bash
Copiar
Editar
npm run preview
Deployed with Vercel.

🧠 Technical Notes
Route protection is handled by a custom ProtectedRoute wrapper.

CartSidebar refreshes on demand via a numeric signal.

Cart state persists using localStorage with custom helpers (addToCart, removeFromCart, etc.).

Products are enhanced client-side with fake stock and rating values.

Login logic integrates directly with FakeStoreAPI using hardcoded valid credentials.

🙌 Credits
Created by Jorge Vega as a front-end integration exercise.

