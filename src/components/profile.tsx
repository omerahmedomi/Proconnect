"use client"

import { useState } from "react";
import ProfileModal from "./profilemodal";

export default function Profile({
  session
}: {
  session: Promise<{
    session: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      expiresAt: Date;
      token: string;
      ipAddress?: string | null | undefined;
      userAgent?: string | null | undefined;
    };
    user: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      email: string;
      emailVerified: boolean;
      name: string;
      image?: string | null | undefined;
    };
  } | null>;
}) {
    const [isProfileModalOpen,setIsProfileModalOpne]= useState<bool>(false);
  return (
    <div
      className="profile rounded-full hover:bg-cyan-100 p-0.5 cursor-pointer"
      onClick={() => setIsProfileModalOpne((prev) => !prev)}
    >
      {session?.user?.image ? (
        <img
          src={session?.user?.image || `/header-image.png`}
          className="w-20"
        ></img>
      ) : (
        <h5 className="bg-cyan-500  rounded-full size-10 flex justify-center items-center text text-white">
          {" "}
          {session?.user?.name.split("")[0].toUpperCase() +
            "" +
            session?.user?.name?.split(" ")[1].split("")[0].toUpperCase()}
        </h5>
      )}
      {isProfileModalOpen && <ProfileModal session={session}  />
      }
    </div>
  );
}