import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import users from "/src/data/users.json"; // Asegúrate de que apunta correctamente
import { getLocalUsers } from "@/services/authService";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let user =
      users.find(
        (u) => u.username === form.username && u.password === form.password
      ) || null;

    if (!user) {
      const localUsers = getLocalUsers();
      user =
        localUsers.find(
          (u) => u.username === form.username && u.password === form.password
        ) || null;
    }

    if (!user) {
      setError("Invalid credentials");
      return;
    }

    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "mor_2314", password: "83r5^_" }), // credenciales válidas para bypass
      });

      const data = await res.json();

      if (!data.token) {
        setError("Authentication failed with FakeStore API");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", user.id.toString());
      localStorage.setItem("username", user.username);
      localStorage.setItem("isAdmin", user.isAdmin?.toString() || "false");

      window.dispatchEvent(new Event("loginSuccess"));

      navigate(user.isAdmin ? "/admin/adminDashboard" : "/");
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md min-h-screen mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
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
          Login
        </button>
      </form>
      <p className="mt-10">username: <b>mor_2314</b> </p>
      <p>password: <b>1234</b></p>
    </div>
  );
}
