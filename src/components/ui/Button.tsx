// src/components/ui/button.tsx
import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost";
}

export const Button = ({ className, variant = "default", ...props }: Props) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded text-sm font-medium transition",
        variant === "default" && "bg-yellow-500 text-white hover:bg-yellow-600",
        variant === "ghost" && "bg-transparent text-gray-800 hover:bg-gray-200",
        className
      )}
      {...props}
    />
  );
};

export default Button;
