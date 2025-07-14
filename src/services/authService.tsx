// src/services/authService.ts

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
};

export const saveUserToLocalList = (newUser: User) => {
  const existing = localStorage.getItem("userList");
  const users = existing ? JSON.parse(existing) : [];
  users.push(newUser);
  localStorage.setItem("userList", JSON.stringify(users));
};

export const getLocalUsers = (): User[] => {
  const stored = localStorage.getItem("userList");
  return stored ? JSON.parse(stored) : [];
};

export const findUserByUsername = (username: string): User | undefined => {
  return getLocalUsers().find((user) => user.username === username);
};

export const loginWithFakeAPI = async (username: string, password: string) => {
  const res = await fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  return data.token;
};
