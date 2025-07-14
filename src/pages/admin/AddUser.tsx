// src/pages/admin/AddUser.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usersData from "/src/data/users.json";

export default function AddUser() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const exists = usersData.some((u) => u.username === form.username);
    if (exists) {
      setError("Username already exists.");
      return;
    }

    try {
      const res = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: usersData.length + 1,
          username: form.username,
          password: form.password,
          email: form.email,
        }),
      });

      if (!res.ok) throw new Error("API request failed");

      // Optionally update local storage or local JSON if backed by server
      setSuccess("User added successfully.");
      setTimeout(() => {
        navigate("/admin/users");
      }, 1000);
    } catch (err) {
      setError("Failed to create user.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add New User</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Save
        </button>
      </form>
    </div>
  );
}
