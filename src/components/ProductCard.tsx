// src/components/ProductCard.tsx
interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  stock?: number;
}

const ProductCard = ({ title, price, image, category, rating, stock }: ProductCardProps) => {
  return (
    <div className="p-4 rounded-lg shadow-sm hover:shadow-md transition text-left">
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-contain mb-2"
      />
      <h3 className="font-semibold text-md line-clamp-2">{title}</h3>
      <p className="text-sm text-gray-500">{category}</p>
      <p className="text-lg font-bold">${price.toFixed(2)}</p>
      <div className="text-sm text-yellow-600">⭐ {rating?.toFixed(1)} / 5</div>
      <div className="text-xs mt-1 text-green-700">
        {stock && stock > 0 ? `Stock: ${stock} units` : "No stock"}
      </div>
    </div>
  );
};

export default ProductCard;
