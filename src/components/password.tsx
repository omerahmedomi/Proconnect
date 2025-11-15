"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Password({ type }: { type: string }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className="relative">
      <input
        name={type}
        type={isVisible ? "text" : "password"}
        className="auth-input"
        placeholder={
          type === "confirmPassword" ? "Confirm Password" : "Password"
        }
        required
      />

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setIsVisible((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
      >
        {isVisible ? <EyeOff  size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}
