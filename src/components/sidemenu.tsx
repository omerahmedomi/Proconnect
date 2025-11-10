"use client";
import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
export default function SideMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div className="lg:hidden">
      <MenuIcon
        className="shrink-0 hover:bg-gray-100 rounded-lg transition duration-200 px-2 cursor-pointer"
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
        className={`fixed right-0 top-0 h-screen z-50 bg-white transition-all ease-in-out shadow-lg  ${
          isMenuOpen ? "w-100" : "w-0"
        }`}
      >
        <div className="flex justify-between p-4 items-center border-b">
          <p>Menu</p>
          <X
            className="hover:bg-gray-100 rounded-lg transition duration-200 px-2"
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
            }}
            size={40}
          />
        </div>

        <div className="space-y-3 px-10 py-3  flex flex-col">
          <button className=" hover:bg-cyan-100 hover:text-cyan-900 transition-all duration-300  p-1  text-gray-800  rounded-2xl  cursor-pointer">
            Sign In
          </button>
          <button className="text-white hover:bg-cyan-600 cursor-pointer transition-all duration-700 bg-cyan-500 border border-cyan-50  rounded-2xl p-1 ">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}
