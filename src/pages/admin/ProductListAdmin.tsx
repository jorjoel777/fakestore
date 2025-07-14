// src/pages/admin/ProductListAdmin.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  image: string;
}

export default function ProductListAdmin() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Error loading products:", err));
  }, []);



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Product Management</h1>
      <div className="mb-4">
        <Link to="/admin/products/new" className="text-blue-500 underline">
          ➕ Add New Product
        </Link>
      </div>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center">
              <td className="border p-2">
                <img src={product.image} alt={product.title} className="h-12 mx-auto" />
              </td>
              <td className="border p-2">{product.title}</td>
              <td className="border p-2">

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
