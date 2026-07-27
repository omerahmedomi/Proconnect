"use client";

import { SearchIcon, X, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { searchProfilesAction } from "@/app/actions/search";
import Link from "next/link";
import ProfileImage from "./profileimage";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Click outside to close
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 0) {
        setIsSearching(true);
        const data = await searchProfilesAction(query);
        setResults(data);
        setIsSearching(false);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="search-container relative z-40" ref={searchRef}>
      <input
        type="text"
        className="search-input peer"
        placeholder="Search for people..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (e.target.value.length > 0) setIsOpen(true);
        }}
        onFocus={() => {
          if (query.length > 0) setIsOpen(true);
        }}
      />
      <SearchIcon
        className="search-icon"
        size={33}
      />
      {query.length > 0 && (
        <X 
          className="absolute right-0 top-1/2 pr-3.5 -translate-y-1/2 shrink-0 text-gray-400 hover:text-black cursor-pointer" 
          size={30} 
          onClick={handleClear}
        />
      )}

      {/* Dropdown Results */}
      {isOpen && query.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden max-h-[400px] overflow-y-auto">
          {isSearching ? (
            <div className="flex justify-center p-4">
              <Loader2 className="animate-spin text-cyan-600" size={24} />
            </div>
          ) : results.length > 0 ? (
            <div className="flex flex-col py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                People
              </div>
              {results.map((profile) => (
                <Link
                  key={profile._id}
                  href={`/profile/${profile._id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <ProfileImage image={profile.profile_picture} styles="w-10 h-10 border border-gray-200" />
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-semibold text-sm text-gray-900 truncate">
                      {profile.name.firstName} {profile.name.lastName}
                    </span>
                    <span className="text-xs text-gray-500 truncate">
                      {profile.headline || "ProConnect Member"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-sm text-gray-500 text-center">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}