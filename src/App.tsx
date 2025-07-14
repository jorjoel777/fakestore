import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import fakeLogo from "./assets/fakeLogo.svg";
import { LogIn, ShoppingCart } from "lucide-react";

import ProductList from "./pages/ProductList";
import SingleProduct from "./pages/SingleProduct";
import CategoryPage from "./pages/CategoryPage";
import LoginPage from "./pages/admin/LoginPage";
import RegisterPage from "./pages/admin/RegisterPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductListAdmin from "./pages/admin/ProductListAdmin";
import UserListAdmin from "./pages/admin/UserListAdmin";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import CartSidebar from "./components/CartSidebar";

import "./index.css";

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [userRefresh, setUserRefresh] = useState(false);
  const [cartRefresh, setCartRefresh] = useState(false);
  const triggerCartRefresh = () => {
    setCartRefresh(prev => !prev);
  };
  const refreshCart = () => setCartRefresh(prev => !prev);
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
    setCartRefresh(prev => !prev); // ensure refresh when opening
  };

  useEffect(() => {
    const syncUserFromLocalStorage = () => {
      const storedUsername = localStorage.getItem("username");
      const storedUserId = localStorage.getItem("userId");
      setUsername(storedUsername);
      setUserId(storedUserId ? Number(storedUserId) : null);
    };

    syncUserFromLocalStorage();

    const handleLoginSuccess = () => {
      syncUserFromLocalStorage();
      setUserRefresh(prev => !prev);
    };

    window.addEventListener("loginSuccess", handleLoginSuccess);

    return () => {
      window.removeEventListener("loginSuccess", handleLoginSuccess);
    };

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("guestCart");
    setUsername(null);
    setUserId(null);
    window.location.href = "/";
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-[#262626] text-center p-4">
        {/* Header */}
        <div className="maintop justify-between items-center px-6 py-4 bg-white shadow-md w-full max-w-9/10 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4">
            <a href="/" rel="noopener noreferrer">
              <img src={fakeLogo} className="h-16 w-auto animate-spin-slow" alt="FakeStore logo" />
            </a>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-1 justify-between items-center gap-2">
            <ul className="flex space-x-2 text-sm font-medium text-gray-700 ">
              <li><Link to="/category/men's clothing">Men</Link></li>
              <li><Link to="/category/women's clothing">Women</Link></li>
              <li><Link to="/category/jewelery">Jewelery</Link></li>
              <li><Link to="/category/electronics">Electronics</Link></li>
            </ul>

            {username ? (
              <ul className="ml-4 flex space-x-2  ml-4 space-x-2 items-center text-sm">
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
{/* Cart Icon */}
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

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <ProductList
                refreshCart={triggerCartRefresh} 
                updateCartCount={setCartCount}
              />
            }
          />
          <Route path="/product/:category/:slug" element={<SingleProduct />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/admin/login" element={<LoginPage onLoginSuccess={() => setUserRefresh(prev => !prev)} />} />
          <Route path="/admin/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
          <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<ProductListAdmin />} />
          <Route path="/admin/users" element={<UserListAdmin />} />
          <Route
            path="/product/:category/:slug"
            element={<SingleProduct refreshCart={() => setCartRefresh(prev => !prev)} />}
          />
          <Route
            path="/category/:categoryName"
            element={<CategoryPage refreshCart={() => setCartRefresh(prev => !prev)} />}
          />
          <Route path="/cart" element={<CartSidebar refreshCart={refreshCart} />} />
          <Route
            path="/category/:categoryName"
            element={<CategoryPage refreshCart={refreshCart} />}
          />

          </Route>
        </Routes>
      </div>

        {isCartOpen && (
          <CartSidebar
          key={cartRefresh.toString()} // 👈 forzamos un re-mount
          onClose={toggleCart}
          updateCartCount={setCartCount}
          refreshSignal={cartRefresh}
        />
        )}

      {/* Footer */}
      <footer className="mt-10 py-6 border-t text-center w-full bg-white">
        <div className="flex flex-col items-center justify-center space-y-2">
          <img src={fakeLogo} alt="Logo" className="h-10 animate-spin-slow" />
          <p className="text-sm text-gray-600">© 2025 | Created by Jorge Vega</p>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
