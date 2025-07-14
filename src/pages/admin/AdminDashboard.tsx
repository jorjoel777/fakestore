// src/pages/admin/AdminDashboard.tsx

import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mt-8">🛠️ Admin Dashboard</h1>
      </header>

      <nav className="bg-gray-100 p-3 mt-5 flex gap-4 border-b">
        <Link to="/admin/products" className="text-blue-600 hover:underline">Products</Link>

      </nav>

      <nav className="bg-gray-100 p-3 mt-5 flex gap-4 border-b">
        <Link to="/admin/users" className="text-blue-600 hover:underline">Users</Link>
      </nav>

      <main className="flex-1 p-6 ">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;