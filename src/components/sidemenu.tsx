"use client";
import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
export default function SideMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div className="lg:hidden">
      <MenuIcon
        className="menu-icon"
        size={40}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      />

      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/40  z-40 transition-opacity duration-500"
        />
      )}

      <div
        className={`menu-container  ${
          isMenuOpen ? "w-100" : "w-0"
        }`}
      >
        <div className="menu-header">
          <p>Menu</p>
          <X
            className="menu-cancel"
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
            }}
            size={40}
          />
        </div>

        <div className="btn-auth-side-container">
          <button className="btn-lg-sign-in">
            Sign In
          </button>
          <button className="btn-lg-register">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}
