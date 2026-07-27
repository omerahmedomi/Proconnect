"use client"

import { useState, useRef, useEffect } from "react";
import ProfileModal from "./profilemodal";
import ProfileImage from "./profileimage";

export default function Profile({
  profile
}: { profile: any }) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsProfileModalOpen(false);
      }
    }
    
    if (isProfileModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileModalOpen]);
   
  return (
    <div
      ref={containerRef}
      className="profile rounded-full p-0.5 relative"
    >
      <div 
        onClick={() => setIsProfileModalOpen((prev) => !prev)}
        className="cursor-pointer hover:bg-cyan-100 rounded-full"
      >
        <ProfileImage
          image={profile?.profile_picture}
          styles={"w-10 h-10 border border-gray-300 bg-cyan-50"}
        />
      </div>
      {isProfileModalOpen && <ProfileModal profile={profile} closeModal={() => setIsProfileModalOpen(false)} />}
    </div>
  );
}