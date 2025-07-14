// src/pages/ProductList.tsx

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import CartSidebar from "../components/CartSidebar";
import { Button } from "@/components/ui/button";
import { addToCart, getCartItems } from "@/lib/cartHelpers";

interface ProductListProps {
  refreshCart: () => void;
  updateCartCount: (count: number) => void;
}

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
}

const ITEMS_PER_PAGE = 6;

const slugify = (str: string) =>
  str.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");

const ProductList = ({
  refreshCart,
  updateCartCount,
}: {
  refreshCart: () => void;
  updateCartCount: (count: number) => void;
}) => {

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [showCart, setShowCart] = useState(true);
  const [refreshCartKey, setRefreshCartKey] = useState(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const enhanced = data.map((p: Product) => ({
          ...p,
          rating: Math.random() * 2 + 3,
          stock: Math.floor(Math.random() * 20 + 5),
        }));
        setProducts(enhanced);
      });
  }, []);


    const handleAddToCart = async (productId: number) => {
      await addToCart(productId);
      const items = getCartItems(); // obtiene desde localStorage
      updateCartCount(items.length);
      refreshCart?.(); // <-- esto hace el trigger al CartSidebar
      setRefreshCartKey((prev) => prev + 1); // en caso lo estés usando dentro del componente
    };



  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const sorted = [...filteredProducts];
  if (sortBy === "asc") sorted.sort((a, b) => a.title.localeCompare(b.title));
  if (sortBy === "desc") sorted.sort((a, b) => b.title.localeCompare(a.title));
  if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex">
      <main className="flex-1 p-4 max-w-6xl mx-auto">
        <div className="flex justify-between items-center my-4 flex-wrap gap-4">
          <h2 className="text-xl font-bold">Products ({filteredProducts.length})</h2>

          <div className="flex gap-4 items-center">
            <label className="text-sm font-medium">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-x-2">
            <button
              onClick={() => setSortBy("asc")}
              className={`px-3 py-1 border border-[#262626] rounded text-sm ${
                sortBy === "asc" ? "bg-[#262626] text-white" : "bg-white"
              }`}
            >
              A-Z
            </button>
            <button
              onClick={() => setSortBy("desc")}
              className={`px-3 py-1 border border-[#262626] rounded text-sm ${
                sortBy === "desc" ? "bg-[#262626] text-white" : "bg-white"
              }`}
            >
              Z-A
            </button>
            <button
              onClick={() => setSortBy("price-asc")}
              className={`px-3 py-1 border border-[#262626] rounded text-sm ${
                sortBy === "price-asc" ? "bg-[#262626] text-white" : "bg-white"
              }`}
            >
              Price ↑
            </button>
            <button
              onClick={() => setSortBy("price-desc")}
              className={`px-3 py-1 border border-[#262626] rounded text-sm ${
                sortBy === "price-desc" ? "bg-[#262626] text-white" : "bg-white"
              }`}
            >
              Price ↓
            </button>
          </div>
        </div>

        <div className="grid min-h-screen sm:grid-cols-1 md:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow hover:shadow-md transition">
              <Link to={`/product/${slugify(product.category)}/${slugify(product.title)}`}>
                <ProductCard {...product} />
              </Link>

              <Button
                onClick={() => {
                  handleAddToCart(product.id);
                  refreshCart(); // 👈 aquí fuerzas a refrescar el carrito visible
                }}
                className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Add to cart
              </Button>

            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded border text-sm ${
                page === currentPage ? "bg-gray-800 text-white" : "bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </main>

    </div>
  );
};

export default ProductList;
