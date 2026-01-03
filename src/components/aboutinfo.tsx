"use client"
import { useState } from "react";
import EditIcon from "./icons/editicon";
import Modal from "./modal";
import { updateAbout } from "@/app/actions/profile";
import SaveButton from "./savebutton";
export default function AboutInfo({profile}) {

  const [isModalOpen,setIsModalOpen] = useState(false);
  return (
    <div className="profile-div p-6 flex flex-col gap-y-5 ">
      <span
        onClick={() => {
          setIsModalOpen((prev) => !prev);
        }}
      >
        <EditIcon />
      </span>

      <h5 className="text-lg font-semibold">About</h5>
      <h6>
        {profile?.about}
      </h6>
      {isModalOpen && (
        <Modal
          content={<form className="w-full modal-input-container" action={updateAbout}>
            <textarea className="field-sizing-content " placeholder="Say something about yourself..." name="about" defaultValue={profile?.about} />
            <SaveButton/>
          </form>}
          clearFunction={() => setIsModalOpen(false)}
          styles={"profile-modal-styles"}
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
