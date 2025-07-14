import { useEffect, useState } from "react";

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartItemProps {
  item: CartItem;
  onUpdateQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItemDisplay({ item, onUpdateQty, onRemove }: CartItemProps) {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${item.productId}`)
      .then((res) => res.json())
      .then(setProduct);
  }, [item.productId]);

  if (!product) return null;

  return (
    <div className="flex gap-4 items-center">
      <img
        src={product.image}
        alt={product.title}
        className="w-12 h-12 object-contain"
      />
      <div className="flex-1">
        <p className="text-sm font-medium line-clamp-1">{product.title}</p>
        <p className="text-xs text-gray-500">
          {product.price.toFixed(2)} € x {item.quantity}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button
          className="text-lg px-2 border rounded"
          onClick={() => onUpdateQty(item.productId, item.quantity - 1)}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          className="text-lg px-2 border rounded"
          onClick={() => onUpdateQty(item.productId, item.quantity + 1)}
        >
          +
        </button>
        <button
          className="text-red-500 text-sm ml-2"
          onClick={() => onRemove(item.productId)}
          title="Remove item"
        >
          🗑
        </button>
      </div>
    </div>
  );
}
