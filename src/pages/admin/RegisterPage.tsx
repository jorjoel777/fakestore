// src/pages/admin/RegisterPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  saveUserToLocalList,
  findUserByUsername,
} from "/src/services/authService";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if username already exists
    if (findUserByUsername(form.username)) {
      setError("Username already exists");
      return;
    }

    // Create a new user object
    const newUser = {
      id: Date.now(), // Simple unique ID
      username: form.username,
      email: form.email,
      password: form.password,
      isAdmin: false, // Never register admin from this page
    };

    // Save to localStorage
    saveUserToLocalList(newUser);

    // Optional: Also try registering with fakeAPI for simulation
    try {
      await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
    } catch (err) {
      console.warn("FakeAPI registration failed, but user saved locally.");
    }

    // Redirect to login
    navigate("/admin/login");
  };

  return (
    <div className="max-w-md min-h-screen mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full border p-2 rounded"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Register
        </button>
        <div className="text-sm mt-2">
          Already have an account?{" "}
          <a href="/admin/login" className="text-blue-500 underline">
            Log in here
          </a>
        </div>
      </form>
    </div>
  );
}
