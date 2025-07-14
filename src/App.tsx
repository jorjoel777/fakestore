import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import fakeLogo from "./assets/fakeLogo.svg";
import { LogIn, ShoppingCart } from "lucide-react";
import ProductList from "./pages/ProductList";
import SingleProduct from "./pages/SingleProduct";
import CategoryPage from "./pages/CategoryPage";
import LoginPage from "./pages/admin/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductListAdmin from "./pages/admin/ProductListAdmin";
import UserListAdmin from "./pages/admin/UserListAdmin";
import CartSidebar from "./components/CartSidebar";

import "./index.css";

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartRefresh, setCartRefresh] = useState(false);
  const triggerCartRefresh = () => setCartRefresh((prev) => !prev);
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
    setCartRefresh((prev) => !prev); // refresh on open
  };
  const ProtectedRoute = () => {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/admin/login" replace />;
  };

  useEffect(() => {
    const syncUserFromLocalStorage = () => {
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername);
    };

    syncUserFromLocalStorage();

    const handleLoginSuccess = () => {
      syncUserFromLocalStorage();
    };

    window.addEventListener("loginSuccess", handleLoginSuccess);
    return () => window.removeEventListener("loginSuccess", handleLoginSuccess);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUsername(null);
    window.location.href = "/";
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-[#262626] text-center p-4">
        <div className="maintop justify-between items-center px-6 py-4 bg-white shadow-md w-full max-w-9/10 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4">
            <a href="/" rel="noopener noreferrer">
              <img src={fakeLogo} className="h-16 w-auto animate-spin-slow" alt="FakeStore logo" />
            </a>
          </div>

          <nav className="flex items-center space-x-1 justify-between gap-2">
            <ul className="flex space-x-2 text-sm font-medium text-gray-700">
              <li><Link to="/category/men's clothing">Men</Link></li>
              <li><Link to="/category/women's clothing">Women</Link></li>
              <li><Link to="/category/jewelery">Jewelery</Link></li>
              <li><Link to="/category/electronics">Electronics</Link></li>
            </ul>

            {username ? (
              <ul className="ml-4 flex items-center space-x-2 text-sm">
                <li className="text-[#262626]">Hello, <strong>{username}</strong></li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 border border-[#262626] rounded-md hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="ml-4">
                <li>
                  <Link
                    to="/admin/login"
                    className="flex items-center gap-2 px-3 py-1 border border-[#262626] rounded-md text-sm hover:bg-gray-100 transition"
                  >
                    <LogIn size={16} />
                    Login
                  </Link>
                </li>
              </ul>
            )}

            <div className="relative cursor-pointer" onClick={toggleCart}>
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                  {cartCount}
                </span>
              )}
            </div>
          </nav>
        </div>

        <Routes>
          <Route
            path="/"
            element={<ProductList refreshCart={triggerCartRefresh} updateCartCount={setCartCount} />}
          />
          <Route
            path="/product/:category/:slug"
            element={<SingleProduct refreshCart={triggerCartRefresh} />}
          />
          <Route
            path="/category/:categoryName"
            element={<CategoryPage refreshCart={triggerCartRefresh} />}
          />
          <Route
            path="/admin/login"
            element={<LoginPage />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<ProductListAdmin />} />
            <Route path="/admin/users" element={<UserListAdmin />} />
          </Route>
        </Routes>

        {isCartOpen && (
          <CartSidebar
            key={Number(cartRefresh)}
            onClose={toggleCart}
            updateCartCount={setCartCount}
            refreshSignal={cartRefresh}/>
        )}

        <footer className="mt-10 py-6 border-t text-center w-full bg-white">
          <div className="flex flex-col items-center justify-center space-y-2">
            <img src={fakeLogo} alt="Logo" className="h-10 animate-spin-slow" />
            <p className="text-sm text-gray-600">© 2025 | Created by Jorge Vega</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;