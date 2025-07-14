// src/components/ProtectedRoute.tsx
import React from "react"; // 👈 necesario para usar JSX.Element
import { Navigate } from "react-router-dom";


type Props = {
  children: JSX.Element;
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

  return children;
}