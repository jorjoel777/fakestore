type CartItem = {
  productId: number;
  quantity: number;
};

function getCurrentCartKey(): string {
  const userId = localStorage.getItem("userId");
  return userId ? `cart_${userId}` : "guestcart";
}
export function getCartItems(): CartItem[] {
  const cart = getCart();
  return cart.items;
}
export function getCart(): { items: CartItem[] } {
  const cartKey = getCurrentCartKey();
  const raw = localStorage.getItem(cartKey);

  try {
    const parsed = raw ? JSON.parse(raw) : { items: [] };
    return Array.isArray(parsed.items)
      ? parsed
      : { items: [] }; // fallback si items no es array
  } catch {
    return { items: [] };
  }
}

export function saveCart(cart: { items: CartItem[] }) {
  const cartKey = getCurrentCartKey();
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

export function addToCart(productId: number, quantity = 1): CartItem[] {
  const cart = getCart();
  const index = cart.items.findIndex((item) => item.productId === productId);

  if (index >= 0) {
    cart.items[index].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  saveCart(cart);
  return cart.items;
}

export function removeFromCart(productId: number): CartItem[] {
  const cart = getCart();
  cart.items = cart.items.filter((item) => item.productId !== productId);
  saveCart(cart);
  return cart.items;
}

export function updateCartQuantity(productId: number, quantity: number): CartItem[] {
  const cart = getCart();
  const index = cart.items.findIndex((item) => item.productId === productId);

  if (index >= 0) {
    cart.items[index].quantity = quantity;
  }

  saveCart(cart);
  return cart.items;
}

export function clearCart() {
  const cartKey = getCurrentCartKey();
  localStorage.removeItem(cartKey);
}
