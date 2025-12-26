"use client";
import axios from "axios";
import { Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef,useState } from "react";
export default function MyCover({ styles, profile, showEdit }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isUploading,setIsUploading] = useState(false)
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
  return (
    <>
      {showEdit && (
        <div
          className="rounded-full bg-cyan-200 absolute right-3 top-3 hover:bg-cyan-400 transition-colors duration-500 cursor-pointer p-2"
          onClick={() => fileInputRef.current?.click()}
        >
          <Edit2 size={17} />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        className="absolute right-[999999px]"
        ref={fileInputRef}
        disabled={isUploading}
        onChange={async (e) => {
          const imageFile = e.target.files[0];
          await uploadCoverPicture(imageFile);
        }}
      />
      <div className={`${styles} border-b border-gray-300 `}>
        <img
          src={profile?.cover_picture || "./sample-cover.jpg"}
          alt="cover-image"
          className={`w-full h-full object-cover sm:rounded-t-lg ${isUploading && 'blur-[1px]'}`}
        />
      </div>
    </>
  );
}
