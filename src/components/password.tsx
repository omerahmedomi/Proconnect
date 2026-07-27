"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Password({ 
  type, 
  defaultValue,
  value,
  onChange,
  className
}: { 
  type: string;
  defaultValue?: any;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className="relative w-full">
      <input
        name={type}
        type={isVisible ? "text" : "password"}
        className={className || "auth-input"}
        placeholder={
          type === "confirmPassword"
            ? "Confirm Password"
            : type === "newPassword"
            ? "New Password"
            : "Password"
        }
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        required
      />

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setIsVisible((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
      >
        {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}
