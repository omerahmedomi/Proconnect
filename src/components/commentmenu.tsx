"use client";

import { Ellipsis } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function CommentMenu({ onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="relative opacity-100 md:opacity-0 md:group-hover:opacity-100 transition"
    >
      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded hover:text-gray-500 transition cursor-pointer"
      >
        <Ellipsis size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-24 bg-white border  border-gray-300 rounded text-xs z-20">
          <button
            onClick={onDelete}
            className="w-full rounded  hover:bg-gray-100 transition hover:cursor-pointer text-red-500"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
