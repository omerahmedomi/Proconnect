"use client"

import { useState } from "react";
import ProfileModal from "./profilemodal";
import ProfileImage from "./profileimage";


export default function Profile({
  profile
}) {
    const [isProfileModalOpen,setIsProfileModalOpne]= useState(false);
   
  return (
    <div
      className="profile rounded-full hover:bg-cyan-100 p-0.5 cursor-pointer"
      onClick={() => setIsProfileModalOpne((prev) => !prev)}
    >
      {profile?.profile_picture ? (
        <ProfileImage
          image={profile?.profile_picture}
          styles={"w-10 h-10 border border-gray-300 bg-cyan-50"}
        />
      ) : (
        <h5 className="bg-cyan-500  rounded-full size-10 flex justify-center items-center text text-white">
          {" "}
          {profile.name.firstName[0].toUpperCase() +
            "" +
            profile.name.lastName[0].split("")[0].toUpperCase()}
        </h5>
      )}
      {isProfileModalOpen && <ProfileModal profile={profile} />}
    </div>
  );
}