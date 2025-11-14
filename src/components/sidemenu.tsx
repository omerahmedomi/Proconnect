"use client";
import { MenuIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function SideMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

 
  return (

    <div className="lg:hidden overflow-hidden!">
      <MenuIcon
        className="menu-icon w-"
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
          isMenuOpen ? "translate-x-0" : " translate-x-full"
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

          <Link href="/signin" className="btn-lg-sign-in">Sign In</Link>

          <Link href="/signup" className="btn-lg-register">Join Now</Link>
        </div>
      </div>
    </div>
  );
}
