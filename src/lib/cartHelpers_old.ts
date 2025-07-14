// src/lib/cartHelpers.ts

interface CartItem {
  productId: number;
  quantity: number;
}

const getCartKey = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return user ? `cart_${user.id}` : "guest_cart";
};

export const getCartItems = (): CartItem[] => {
  const data = localStorage.getItem(getCartKey());
  return data ? JSON.parse(data) : [];
};

export const saveCartItems = (items: CartItem[]) => {
  localStorage.setItem(getCartKey(), JSON.stringify(items));
};

export const addToCart = (productId: number) => {
  const items = getCartItems();
  const index = items.findIndex((item) => item.productId === productId);

  if (index !== -1) {
    items[index].quantity += 1;
  } else {
    items.push({ productId, quantity: 1 });
  }

  saveCartItems(items);
};

export const removeCartItem = (productId: number) => {
  const items = getCartItems().filter((item) => item.productId !== productId);
  saveCartItems(items);
};

export const updateCartItem = (productId: number, quantity: number) => {
  const items = getCartItems().map((item) =>
    item.productId === productId ? { ...item, quantity } : item
  );
  saveCartItems(items);
};

export function calculateSubtotal(cartItems, products) {
  return cartItems.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}
