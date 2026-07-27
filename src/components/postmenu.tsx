"use client";

import { Ellipsis, Bookmark } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toggleSavePostAction } from "@/app/actions/post";

export default function PostMenu({ postId, userProfileId, isSaved, onRemovePost }: { postId: string, userProfileId: string, isSaved: boolean, onRemovePost?: () => void }) {
  const [open, setOpen] = useState(false);
  const [optimisticSaved, setOptimisticSaved] = useState(isSaved);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setOptimisticSaved(isSaved);
  }, [isSaved]);
  
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleSave = async () => {
    setOpen(false);
    setOptimisticSaved(!optimisticSaved);
    if (optimisticSaved && onRemovePost) {
      onRemovePost();
    }
    await toggleSavePostAction(postId, userProfileId);
  };

  return (
    <div
      ref={ref}
      className="relative transition"
    >
      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded hover:text-gray-500 transition cursor-pointer text-gray-600"
      >
        <Ellipsis size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-sm text-sm z-20 py-1">
          <button
            onClick={handleToggleSave}
            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 transition hover:cursor-pointer text-gray-700 font-medium text-left"
          >
            <Bookmark size={16} className="text-gray-500" />
            {optimisticSaved ? "Unsave" : "Save"}
          </button>
        </div>
      )}
    </div>
  );
}
