"use client";
import { useState,useEffect, useActionState } from "react";
import PlusIcon from "./icons/addicon";
import EditIcon from "./icons/editicon";
import Modal from "./modal";
import SaveButton from "./savebutton";
import { addExperience, ExperienceState, fetchExperience } from "@/app/actions/profile";
import { Loader } from "lucide-react";

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
  (_, i) => new Date().getFullYear() - i,
);

export default function ExperienceInfo() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
   const [isExperienceEditModalOpen, setIsExperienceEditModalOpen] =
      useState(false);
    const [selectedExperience, setSelectedExperience] = useState({});
    const [experience, setExperience] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
   useEffect(() => {
      if (!isEditModalOpen) {
        setExperience([]); // reset when closed
        return;
      }
  
      let alive = true;
  
      (async () => {
        setIsLoading(true);
        const edu = await fetchExperience();
        if (alive) {
          setExperience(JSON.parse(JSON.stringify(edu)));
        }
        setIsLoading(false);
      })();
  
      return () => {
        alive = false;
      };
    }, [isEditModalOpen]);
  useEffect(() => {
    if (isAddModalOpen || isEditModalOpen )
      document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, [isEditModalOpen, isAddModalOpen]);
  return (
    <div className="profile-div p-6">
      <div className="flex justify-between">
        {" "}
        <h4 className="font-semibold  text-lg">Experience</h4>
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
          title="Edit Experience"
          clearFunction={() => setIsEditModalOpen(false)}
          styles={"profile-modal-styles"}
          content={
            isLoading ? (
              <span className=" flex justify-center w-full">
                <Loader color="black" />
              </span>
            ) : (
              <div className=" text-black w-full space-y-2  overflow-y-auto">
                {experience?.map((e, i) => (
                  <div
                    key={i}
                    className="flex justify-between rounded border-gray-300 shadow  px-3 py-1 items-start border-px"
                  >
                    <div>
                      <p className="font-semibold text-sm">{e?.title}</p>
                      <p className="text-xs">
                        {e?.company} {e?.type && ". " + e?.type}
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
                      <p className="text-gray-500">
                        {e?.location}{" "}
                        {e?.locationType && ". " + e?.locationType}
                      </p>
                    </div>
                    <span
                      onClick={() => {
                        setIsExperienceEditModalOpen(true);
                        setIsEditModalOpen(false);
                        setSelectedExperience(e);
                      }}
                    >
                      <EditIcon styles="static" />
                    </span>
                  </div>
                ))}
              </div>
            )
          }
        />
      )}
      {isAddModalOpen && (
        <Modal
          title="Add Experience"
          clearFunction={() => setIsAddModalOpen(false)}
          styles={"profile-modal-styles"}
          content={<AddExperienceContent />}
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
 export function AddExperienceContent(){
  const initialState: ExperienceState = {
    success: false,
    errors: {},
  };
  const [state, formAction] = useActionState<ExperienceState, FormData>(
    addExperience,
    initialState,
  );
  return (
    <form
      className="w-full  space-y-3 overflow-y-auto px-2 flex flex-col"
      action={formAction}
    >
      <h6 className="text-xs"> * indicates required</h6>
      <div className=" modal-input-container">
        <span>Title* </span>
        <input
          type="text"
          name="title"
          placeholder="Ex. Managing Partner"
          defaultValue={state?.values?.title || ""}
        />
        {state?.errors?.title && (
          <span className="text-red-500 text-[10px]">
            {state?.errors?.title}
          </span>
        )}
      </div>
      <div className=" modal-input-container  ">
        <span className="">Employment Type</span>

        <select
          key={state?.values?.type || ""}
          name="type"
          className="border px-2 py-1 rounded"
          defaultValue={state?.values?.type || ""}
        >
          <option value={""} disabled selected>
            Please Select
          </option>
          <option value="Fulltime">Full-time</option>
          <option value="Partime">Part-time</option>
          <option value="Contractual">Contractual</option>
          <option value="Internship">Internship</option>
          <option value="Freelance">Freelance</option>
        </select>
      </div>
      <div className=" modal-input-container">
        <span>Company or Organization*</span>
        <input
          className="mt-0"
          name="company"
          placeholder="Ex. Apple"
          defaultValue={state?.values?.company || ""}
        />
        {state?.errors?.company && (
          <span className="text-red-500 text-[10px]">
            {state?.errors?.company}
          </span>
        )}
      </div>
      <div className="modal-input-container ">
        <span>Start date*</span>

        <div
          className="flex gap-2"
          key={state?.values?.startMonth || "initial"}
        >
          <select
            name="startMonth"
            className="border rounded-md px-2 bg-white grow"
            defaultValue={state?.values?.startMonth || ""}
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
            key={state?.values?.startYear || "initial"}
            name="startYear"
            className="border rounded-md px-2 py-2  bg-white grow"
            defaultValue={state?.values?.startYear || ""}
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
        {state?.errors?.startDate && (
          <span className="text-red-500 text-[10px]">
            {state?.errors?.startDate}
          </span>
        )}
      </div>

      <div className="modal-input-container">
        <span>End date* </span>

        <div className="flex gap-2" key={state?.values?.endMonth || "initial"}>
          <select
            name="endMonth"
            className="border rounded-md px-2 py-2  bg-white grow"
            defaultValue={state?.values?.endMonth || ""}
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
            key={state?.values?.endYear || "initial"}
            name="endYear"
            className="border rounded-md px-2 py-2 bg-white grow"
            defaultValue={state?.values?.endYear|| ""}
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
        {state?.errors?.endDate && (
          <span className="text-red-500 text-[10px]">
            {state?.errors?.endDate}
          </span>
        )}
      </div>
      <div className=" modal-input-container">
        <span>Location </span>
        <input
          type="text"
          name="location"
          placeholder="Ex. Addis Ababa, Ethiopia"
          defaultValue={state?.values?.location || ""}
        />
      </div>
      <div className=" modal-input-container  ">
        <span className="">Location Type</span>

        <select
          key={state?.values?.locationType || "initial"}
          name="locationType"
          className="border px-2 py-1 rounded"
          defaultValue={state?.values?.locationType || ""}
        >
          <option value={""} disabled selected>
            Please Select
          </option>
          <option value="Onsite">On-site</option>
          <option value="Partime">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      <div className="modal-input-container">
        <span>Description</span>
        <textarea
          maxLength={1000}
          name="description"
          placeholder="Major duties,projects and successes"
          defaultValue={state?.values?.description || ""}
        />
      </div>
      <SaveButton />
    </form>
  );
 }


 export function EditExperienceContent(){
  return(
<form></form>
  )
 }