"use client";
import { useRef, useState } from "react";
import ProfileImage from "./profileimage";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function MyProfile({profile,self }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

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

  return (
    <div
      className={`${self && 'hover:cursor-pointer'}`}
      onClick={() => {
        fileInputRef.current?.click();
      }}
    >
  {self && <input
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

}
      <ProfileImage
        image={profile?.profile_picture}
        styles={
          "w-25 h-25 border border-gray-300 absolute top-15 left-6 bg-cyan-50"
        }
        imgStyles={`${isUploading && 'blur-[2px]'}`}
      />
    </div>
  );
}
