"use client";
import EditIcon from "./icons/editicon";
import { useState, useEffect } from "react";
import Modal from "./modal";
import { useActionState } from "react";
import { saveProfile } from "@/app/actions/profile";
import { ProfileFormState } from "@/app/actions/profile";
import SaveButton from "./savebutton";
// import { useRouter } from "next/navigation";
export default function ProfileInfo({profile }) {

  // const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {

    if (isModalOpen) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, [isModalOpen]);
  console.log("Client", profile);

  
  

  const initialState: ProfileFormState = {
    success: false,
    errors: {},
  };

  const [state, formAction, isPending] = useActionState<
    ProfileFormState,
    FormData
  >(saveProfile, initialState);

  // const router = useRouter();

 

  return (
    <div className="info mt-11 text-sm px-6 flex flex-col">
      <span onClick={() => setIsModalOpen((prev) => !prev)}>
        <EditIcon styles="right-3 top-35 " />
      </span>{" "}
      <h5 className="text-2xl font-semibold">
        {profile?.name?.firstName + " " + profile?.name?.lastName}
      </h5>
      <h5 className="  ">{profile?.headline}</h5>
      <h5 className=" text-gray-500">{profile?.location?.city}</h5>
      <div className="companies  text-gray-500 flex items-center gap-1 text-xs sm:text-sm">
        <p>Addis Ababa University</p>
        <div className="rounded-full size-1 bg-gray-500"></div>
        <p className="">Addis Ababa University</p>
      </div>
      <h4 className="text-cyan-600 hover:underline cursor-pointer">
        500 + connections
      </h4>
      {isModalOpen && (
        <Modal
          content={
            <form
              className="w-full  space-y-7 overflow-y-scroll px-2 flex flex-col"
              action={formAction}
            >
              <div className="space-y-3">
                <h6 className="text-xs"> * indicates required</h6>
                <div className=" modal-input-container">
                  <span>First Name* </span>
                  <input
                    className="mt-0"
                    name="firstName"
                    defaultValue={
                      state?.values?.firstName ||
                      (state?.values?.firstName != 0 &&
                        profile?.name?.firstName) ||
                      ""
                    }
                  />
                  {state?.errors?.firstName && (
                    <h6 className="text-red-500 text-[11px] ">
                      {state?.errors?.firstName}
                    </h6>
                  )}
                </div>
                <div className="modal-input-container">
                  <span>Last Name*</span>
                  <input
                    className="input"
                    name="lastName"
                    defaultValue={
                      state?.values?.lastName ||
                      (state?.values?.lastName != 0 &&
                        profile?.name?.lastName) ||
                      ""
                    }
                  />
                  {state?.errors?.lastName && (
                    <h6 className="text-red-500 text-[11px] ">
                      {state?.errors?.lastName}
                    </h6>
                  )}
                </div>
              </div>
              <div className="modal-input-container">
                <span> Headline*</span>
                <textarea
                  className="px-2 py-1 "
                  placeholder="e.g Designer | Developer"
                  name="headline"
                  defaultValue={
                    state?.values?.headline ||
                    (state?.values?.headline != 0 && profile?.headline) ||
                    ""
                  }
                />
                {state?.errors?.headline && (
                  <h6 className="text-red-500 text-[11px] ">
                    {state?.errors?.headline}
                  </h6>
                )}
              </div>
              <div className="modal-input-container">
                <h4 className="text-base font-semibold">Current Position</h4>
                <span>Position*</span>
                <select className="">
                  <option value="" className="bg-white text-black">
                    a
                  </option>
                </select>
              </div>
              <div className="modal-input-container">
                <span>Industry*</span>
                <input className="input" name="industry" />
              </div>
              <div className="modal-input-container">
                <h4 className="text-base font-semibold">Education</h4>
                <span>School*</span>
                <select className="">
                  <option value="" className="bg-white text-black">
                    a
                  </option>
                </select>
              </div>
              <div className="modal-input-container">
                <h4 className="text-base font-semibold">Location</h4>
                <span>Country/Region*</span>
                <input
                  className="input"
                  name="country"
                  defaultValue={
                    state?.values?.country ||
                    (state?.values?.country != 0 &&
                      profile?.location?.country) ||
                    ""
                  }
                />
                {state?.errors?.country && (
                  <h6 className="text-red-500 text-[11px] ">
                    {state?.errors?.country}
                  </h6>
                )}
                <span>City*</span>
                <input
                  className="input"
                  name="city"
                  defaultValue={
                    state?.values?.city ||
                    (state?.values?.city != 0 && profile?.location?.city) ||
                    ""
                  }
                />
                {state?.errors?.city && (
                  <h6 className="text-red-500 text-[11px] ">
                    {state?.errors?.city}
                  </h6>
                )}
              </div>
              <SaveButton/>
            </form>
          }
          clearFunction={() => setIsModalOpen(false)}
          styles="profile-modal-styles"
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
