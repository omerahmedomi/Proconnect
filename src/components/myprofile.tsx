"use client";
import { useEffect, useRef, useState } from "react";
import ProfileImage from "./profileimage";
import axios from "axios";
import { useRouter } from "next/navigation";
import { removeProfilePhoto } from "@/app/actions/profile";
export default function MyProfile({profile,self }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

const [menuOpen,setMenuOpen] = useState(false)
const modalRef = useRef(null);

  async function uploadProfilePicture(image: File) {
    if (!image) return;
    const formData = new FormData();
    formData.set("profileImage", image);
    try {
      setIsUploading(true);
      const uploadedImage = await axios.post(
        "/api/upload/profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  }


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`${self && "hover:cursor-pointer"} `}
      onClick = {()=>setMenuOpen((prev)=>!prev)}
      
    >
      {self && (
        <div className="">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            disabled={isUploading}
            className="absolute right-[99999px]"
            onChange={async (e) => {
              const imageFile = e.target.files[0]!;
              await uploadProfilePicture(imageFile);
            }}
          />
          <div ref={modalRef} className={`shadow flex flex-col absolute text-nowrap left-2/7 md:left-3/14 z-100 bg-white text-sm *:transition-all *:duration-300 *:hover:cursor-pointer *:px-2 *:py-1 rounded divide-y divide-gray-300 *:hover:bg-cyan-100 *:active:bg-cyan-200 duration-300   *:rounded ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}`}>
            <button onClick={() => {
        fileInputRef.current?.click();
      }}>Change Photo</button>
         {profile?.profile_picture &&   <button onClick={removeProfilePhoto}>Remove Photo</button>}

          </div>
        </div>
      )}

      <ProfileImage
        image={profile?.profile_picture}
        styles={
          "w-25 h-25 border border-gray-300 absolute top-15 left-6 bg-cyan-50"
        }
        imgStyles={`${isUploading && "blur-[2px]"}`}
      />
    </div>
  );
}
