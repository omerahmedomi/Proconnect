"use client"
import { useState,useEffect } from "react";
import EditIcon from "./icons/editicon";
import Modal from "./modal";
import { updateAbout } from "@/app/actions/profile";
import SaveButton from "./savebutton";
export default function AboutInfo({profile,self}) {

  const [isModalOpen,setIsModalOpen] = useState(false);
  const [aboutLength,setAboutLength] = useState(profile?.about?.length||0)
  useEffect(()=>{
    if (isModalOpen) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  },[isModalOpen])
  return (
    <div className="profile-div p-6  flex flex-col gap-y-5 ">
   {self &&   <span
        onClick={() => {
          setIsModalOpen((prev) => !prev);
        }}
      >
        <EditIcon />
      </span>
}
      <h5 className="text-lg font-semibold">About</h5>
      <h6>{profile?.about}</h6>
      {isModalOpen && self(
        <Modal
        title={"Edit About"}
          content={
            <form
              className="w-full modal-input-container overflow-y-auto "
              action={updateAbout}
            >
              <textarea
                className="field-sizing-content min-h-30 selection:bg-cyan-600 selection:text-white"
                placeholder="Say something about yourself..."
                name="about"
                defaultValue={profile?.about}
                onChange={(e) => setAboutLength(e.target.value.length)}
              />
              <span className="self-end text-gray-500 text-[10px]">
                {aboutLength}/2600
              </span>

              <SaveButton disabled={aboutLength > 2600} />
            </form>
          }
          clearFunction={() => {
            setIsModalOpen(false);
            setAboutLength(profile?.about?.length);
          }}
          styles={"profile-modal-styles "}
        />
      )}
      {isModalOpen && (
        <div
          className=" fixed inset-0 bg-black/20 z-45 cursor-pointer"
          onClick={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
