"use client";
import { removeCoverPhoto } from "@/app/actions/profile";
import axios from "axios";
import { Edit2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef,useState,useEffect } from "react";
export default function MyCover({ styles, profile, self }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isUploading,setIsUploading] = useState(false)
  const [menuOpen,setMenuOpen] = useState(false)
  const modalRef = useRef(null);
  async function uploadCoverPicture(image: File) {
    if (!image) return;
    const formData = new FormData();
    formData.set("coverImage", image);
    try {
      setIsUploading(true);
      const uploadedImage = await axios.post(
        "/api/upload/cover-picture",
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
    }finally{
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
    <>
      {self && (
        <div
          className="rounded-full bg-cyan-200 absolute right-3 top-3 hover:bg-cyan-400 transition-colors duration-500 cursor-pointer p-2"
          onClick={() => setMenuOpen((prev)=>!prev)}
        >
          <Edit2 size={17} />
        </div>
      )}
      <div>
        <input
          type="file"
          accept="image/*"
          className="absolute right-[999999px]"
          ref={fileInputRef}
          disabled={isUploading}
          onChange={async (e) => {
            const imageFile = e.target.files[0];
            await uploadCoverPicture(imageFile);
            setMenuOpen(false);
          }}
        />
        <div
          ref={modalRef}
          className={`shadow flex flex-col absolute text-nowrap top-1/2 right-0 z-100 bg-white text-sm *:transition-all *:duration-300 *:hover:cursor-pointer *:px-2 *:py-1 rounded divide-y divide-gray-300 *:hover:bg-cyan-100 *:active:bg-cyan-200 duration-300   *:rounded ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
        >
          <button
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            Change Photo
          </button>
       {profile?.cover_picture && <button onClick={removeCoverPhoto}>Remove Photo</button>}
        </div>
      </div>

      <div className={`${styles} border-b border-gray-300 bg-cover bg-center ${!profile?.cover_picture && 'cover-photo'} `}  style={
          profile?.cover_picture
            ? { backgroundImage: `url(${profile.cover_picture})` }
            : undefined
        }>
        {/* <img
          src={profile?.cover_picture}
          alt="cover-image"
          // width={100}
          // height={100}
          className={`w-full h-full object-cover sm:rounded-t-lg ${isUploading && "blur-[1px]"}`}
        /> */}
      </div>
    </>
  );
}
