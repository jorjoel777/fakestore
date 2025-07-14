import { useEffect, useState } from "react";


interface User {
  id: number;
  username: string;
  password: string;
  token?: string;
  isAdmin: boolean;
}

export default function UserListAdmin() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load users from static JSON (local users.json)
    setUsers(usersData);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 mt-10">User Management</h1>

      <div className="flex justify-end mb-4">
        <Link
          to="/admin/users/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New User
        </Link>
      </div>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2 text-left">ID</th>
            <th className="border px-3 py-2 text-left">Username</th>
            <th className="border px-3 py-2 text-left">Password</th>
            <th className="border px-3 py-2 text-left">Token</th>
            <th className="border px-3 py-2 text-left">Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border px-3 py-2">{user.id}</td>
              <td className="border px-3 py-2">{user.username}</td>
              <td className="border px-3 py-2">{user.password}</td>
              <td className="border px-3 py-2 truncate max-w-xs">{user.token || "-"}</td>
              <td className="border px-3 py-2">{user.isAdmin ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
