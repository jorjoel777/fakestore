import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import {
  getCartItems,
  calculateSubtotal,
  removeCartItem,
  updateCartItem,
} from "../lib/cartHelpers";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartSidebarProps {
  onCheckout?: () => void;
  refreshTrigger?: number; // para forzar el refresh desde fuera
}


export default function CartSidebar({ onCartUpdate, cartCount, onCheckout, refreshTrigger }: CartSidebarProps) {
  const [cartItems, setCartItems] = useState<{ productId: number; quantity: number }[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);



const loadCart = async () => {
  try {
    const [productsRes, cartItemsRes] = await Promise.all([
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
      getCartItems()
    ]);
    setCartItems(cartItemsRes);
    setProducts(productsRes);
    setSubtotal(calculateSubtotal(cartItemsRes, productsRes));
  } catch (e) {
  console.error("Error loading cart", e);
  setCartItems([]);
  setProducts([]); // <- Añadir esta línea
  setSubtotal(0);
}
};






  useEffect(() => {
    loadCart();
  }, [refreshTrigger]);

  const handleToggleCart = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) loadCart();
  };

  return (
    <div>
      <button
        className="fixed top-4 right-4 bg-black text-white p-2 rounded shadow z-50"
        onClick={handleToggleCart}
      >
        🛒 Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
      </button>

      {isOpen && (
        <aside className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-40 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mt-10 mb-4">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) {
                  console.warn(`Product not found for ID: ${item.productId}`);
                  return (
                    <div key={`missing-${item.productId}`} className="text-red-500">
                      Product #{item.productId} not found.
                    </div>
                  );
                }
                return (
                  <CartItem
                    key={item.productId}
                    product={{ ...product, quantity: item.quantity }}
                    reloadCart={loadCart}
                  />
                );
              })}
              <div className="text-right font-semibold">
                Subtotal: ${subtotal.toFixed(2)}
              </div>
              {onCheckout && (
                <button
                  onClick={onCheckout}
                  className="w-full bg-black text-white py-2 mt-4 rounded"
                >
                  Checkout
                </button>
              )}
            </div>
          )}
        </aside>
      )}
    </div>
  );
}
