// src/pages/SingleProduct.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { addToCart } from "../lib/cartHelpers";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  stock: number;
}
const SingleProduct = ({ refreshCart }: { refreshCart: () => void }) => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const enhanced = data.map((p: Product) => ({
          ...p,
          rating: Math.random() * 2 + 3,
          stock: Math.floor(Math.random() * 20 + 5),
        }));

        const slugify = (str: string) =>
          str.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
        const found = enhanced.find((p: Product) => slugify(p.title) === slug);
        setProduct(found || null);
      });
  }, [slug]);


    const handleAddToCart = async () => {
      if (!product) return;
      await addToCart(product.id);
      refreshCart(); // aquí llamamos al refresh real del App
    };
  if (!product)
    return <div className="text-center min-h-screen py-10 text-red-500">Producto no encontrado</div>;

  return (
    <div className="flex">
      <main className="max-w-5xl min-h-screen mx-auto p-6 flex flex-row md:flex-row gap-10 flex-1">
        {/* Imagen */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-xl object-contain border rounded"
          />
        </div>

        {/* Detalles */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-500 text-sm capitalize">{product.category}</p>
          <p className="text-2xl font-semibold text-gray-800">
            {product.price.toFixed(2)} €
          </p>

          <div className="text-sm text-gray-700">
            <p>
              Stock: <span className="font-medium">{product.stock}</span>
            </p>
            <p>
              Valoración:{" "}
              <span className="text-yellow-600">⭐ {product.rating.toFixed(1)}</span>
            </p>
          </div>

          <p className="text-sm text-gray-800">{product.description}</p>

          <Button
            onClick={handleAddToCart}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded w-full"
          >
            Add to cart
          </Button>
        </div>
      </main>

 
    </div>
  );
};

export default SingleProduct;