"use client";
import { useState,useEffect } from "react";
import PlusIcon from "./icons/addicon";
import EditIcon from "./icons/editicon";
import Modal from "./modal";
import SaveButton from "./savebutton";
import { addEducation, EducationState, fetchEducation} from "@/app/actions/profile";
import { useActionState } from "react";
import { format } from "date-fns";
export default function EducationInfo() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [education,setEducation] =  useState([]);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 60 },
    (_, i) => new Date().getFullYear() - i
  );

 
  useEffect(()=>{
    if (isAddModalOpen || isEditModalOpen) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  },[isEditModalOpen,isAddModalOpen]);

useEffect(() => {
  if (!isEditModalOpen) {
    setEducation([]); // reset when closed
    return;
  }

  let alive = true;

  (async () => {
    const edu = await fetchEducation();
    if (alive) {
      setEducation((JSON.parse(JSON.stringify(edu))));
    }
  })();

  return () => {
    alive = false;
  };
}, [isEditModalOpen]);


  const initialState: EducationState = {
      success: false,
      errors: {},
    };

  const [state,formAction] = useActionState(addEducation,initialState)

  return (
    <div className="profile-div p-6">
      <div className="flex justify-between">
        {" "}
        <h4 className="font-semibold  text-lg">Education</h4>
        <div>
          <button className="" onClick={() => setIsAddModalOpen(true)}>
            <PlusIcon styles="mr-15" />
          </button>
          <button onClick={() => setIsEditModalOpen(true)}>
            <EditIcon />
          </button>
        </div>
      </div>
      {isEditModalOpen && (
        <Modal
          title="Edit Educaton"
          clearFunction={() => setIsEditModalOpen(false)}
          styles={"profile-modal-styles"}
          content={
            <div className=" text-black w-full space-y-2 ">
              {education?.map((e, i) => (
                <div key={i} className="flex justify-between rounded border-gray-300 shadow  px-3 py-1 items-start border-px">
                  <div >
                    <p className="font-semibold text-sm">{e?.school}</p>
                    <p className="text-xs">
                      {e?.degree} {e?.field && ", " + e?.field}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {months[e?.startMonth - 1]?.slice(0, 3)} {e?.startYear}{" "}
                      {(e?.startMonth ||
                        e?.endMonth ||
                        e?.startYear ||
                        e?.endYear) &&
                        "-"}{" "}
                      {months[e?.endMonth - 1]?.slice(0, 3)} {e?.endYear}
                    </p>
                    
                    
                  </div>
                  <EditIcon styles="static "/>
                </div>
              ))}
            </div>
          }
        />
      )}

      {isAddModalOpen && (
        <Modal
          title="Add Educaton"
          clearFunction={() => setIsAddModalOpen(false)}
          styles={"profile-modal-styles"}
          content={
            <form
              className="w-full  space-y-3 overflow-y-scroll px-2 flex flex-col"
              action={formAction}
            >
              <h6 className="text-xs"> * indicates required</h6>
              <div className=" modal-input-container">
                <span>School* </span>
                <input type="text" name="school" />
                {state?.errors && (
                  <span className="text-red-500 text-[10px]">
                    {state?.errors?.school}
                  </span>
                )}
              </div>
              <div className=" modal-input-container flex flex-row gap-x-4 items-center">
                <span className="">Degree </span>

                <select
                  name="degree"
                  className="border px-2 py-1 rounded"
                  defaultValue={state?.values?.degree || ""}
                >
                  <option value={""} disabled>
                    Select your degree
                  </option>
                  <option value="Bachelors">Bachelors</option>
                  <option value="Masters">Masters</option>
                  <option value="Phd">Phd</option>
                  <option value="Phd">Diploma</option>
                </select>
              </div>
              <div className=" modal-input-container">
                <span>Field of study </span>
                <input className="mt-0" name="field" />
              </div>
              <div className="modal-input-container">
                <span>Start date</span>

                <div className="flex gap-2">
                  <select
                    name="startMonth"
                    className="border rounded-md px-2  text-sm bg-white grow"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Month
                    </option>
                    {months.map((m, i) => (
                      <option key={m} value={i + 1}>
                        {m}
                      </option>
                    ))}
                  </select>

                  <select
                    name="startYear"
                    className="border rounded-md px-2 py-2 text-sm bg-white grow"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Year
                    </option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-input-container">
                <span>End date (or expected)</span>

                <div className="flex gap-2">
                  <select
                    name="endMonth"
                    className="border rounded-md px-2 py-2 text-sm bg-white grow"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Month
                    </option>
                    {months.map((m, i) => (
                      <option key={m} value={i + 1}>
                        {m}
                      </option>
                    ))}
                  </select>

                  <select
                    name="endYear"
                    className="border rounded-md px-2 py-2 text-sm bg-white grow"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Year
                    </option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-input-container">
                <span>Description</span>
                <textarea maxLength={1000} name="description" />
              </div>
              <SaveButton />
            </form>
          }
        />
      )}
      {(isEditModalOpen || isAddModalOpen) && (
        <div
          className=" fixed inset-0 bg-black/20 z-45 cursor-pointer"
          onClick={() => {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
