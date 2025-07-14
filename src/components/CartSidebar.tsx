import { useEffect, useState } from "react";
import CartItemDisplay from "./CartItem";
import {
  getCart,
  removeFromCart,
  updateCartQuantity,
  calculateSubtotal,
} from "../lib/cartHelpers";
interface Props {
  refreshSignal: number;
}
interface CartSidebarProps {
      onClose?: () => void; 
}

export default function CartSidebar({ refreshSignal, onClose }: Props & CartSidebarProps) {

  const [cartItems, setCartItems] = useState<{ productId: number; quantity: number }[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cart = await getCart();
        const items = Array.isArray(cart.items) ? cart.items : [];
        setCartItems(items);
        updateSubtotal(items);

      } catch (e) {
        console.error("Error loading cart", e);
      }
    };

    loadCart();
  }, [refreshSignal]); // 👈 Se vuelve a ejecutar cada vez que cambia refreshSignal

  const updateSubtotal = async (items: { productId: number; quantity: number }[]) => {
    try {
      let total = 0;
      for (const item of items) {
        const res = await fetch(`https://fakestoreapi.com/products/${item.productId}`);
        const product = await res.json();
        total += product.price * item.quantity;
      }
      setSubtotal(total);
    } catch (e) {
      console.error("Failed to calculate subtotal", e);
    }
  };

  const removeItem = (productId: number) => {
    const updated = removeFromCart(productId);
    setCartItems(updated);
    updateSubtotal(updated);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    const updated = updateCartQuantity(productId, quantity);
    setCartItems(updated);
    updateSubtotal(updated);
  };

  return (
    <div className="fixed top-0 right-0 h-full w-96 bg-gray-100 shadow-lg z-50 p-4 overflow-y-auto">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Shopping Cart</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black text-lg font-bold px-2"
          >
            ✕
          </button>
        )}
      </div>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItemDisplay
              key={item.productId}
              item={item}
              onRemove={removeItem}
              onUpdateQty={updateQuantity}
            />
          ))}
        </div>
      )}

      <div className="mt-6 border-t pt-4">
        <p className="text-lg font-semibold">Subtotal: {subtotal.toFixed(2)} €</p>
      </div>
    </div>
  );
}
