import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [form, setForm] = useState({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "price" ? parseFloat(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Failed to create product");

      setSuccess(true);
      setTimeout(() => navigate("/admin/products"), 1500);
    } catch (err) {
      console.error(err);
      setError("Error creating product");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">Product created successfully</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" className="w-full border p-2 rounded" onChange={handleChange} required />
        <input name="price" type="number" step="0.01" placeholder="Price" className="w-full border p-2 rounded" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" className="w-full border p-2 rounded" onChange={handleChange} required />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 w-full"
        >
          <option value="">Select category</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="women's clothing">Women's clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>
        <input name="image" placeholder="Image URL" className="w-full border p-2 rounded" onChange={handleChange} required />

        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800" type="submit">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
