import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { addToCart } from "../lib/cartHelpers";


interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
}
const CategoryPage = ({ refreshCart }: { refreshCart: () => void }) => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshCartKey, setRefreshCartKey] = useState(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const enhanced = data.map((p: Product) => ({
          ...p,
          rating: Math.random() * 2 + 3,
          stock: Math.floor(Math.random() * 20 + 5),
        }));
        const filtered = enhanced.filter(
          (p) => p.category.toLowerCase() === categoryName?.toLowerCase()
        );
        setProducts(filtered);
        setLoading(false);
      });
  }, [categoryName]);

  const handleAddToCart = async (productId: number) => {
    await addToCart(productId);
    setRefreshCartKey((prev) => prev + 1);
    refreshCart();
  };
  if (loading) return <div className="text-center py-10">Cargando...</div>;

  const slugify = (str: string) =>
    str.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");

  return (
    <div className="flex">
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1">
        <h2 className="text-2xl font-bold mb-6 capitalize">Categoría: {categoryName}</h2>
        {products.length === 0 ? (
          <p>No hay productos en esta categoría.</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded shadow hover:shadow-md transition"
              >
                <Link to={`/product/${slugify(product.category)}/${slugify(product.title)}`}>
                  <ProductCard {...product} />
                </Link>

                <Button
                  onClick={() => handleAddToCart(product.id)}
                  className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  Añadir al carrito
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>


    </div>
  );
};

export default CategoryPage;