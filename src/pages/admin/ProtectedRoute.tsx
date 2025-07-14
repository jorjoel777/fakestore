import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  adminOnly?: boolean;
};

export default function ProtectedRoute({ children, adminOnly = false }: Props) {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>; // Wrap in fragment for ReactNode
}
