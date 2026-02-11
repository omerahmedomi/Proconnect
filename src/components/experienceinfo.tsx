"use client";
import { useState, useEffect, useActionState } from "react";
import PlusIcon from "./icons/addicon";
import EditIcon from "./icons/editicon";
import Modal from "./modal";
import SaveButton from "./savebutton";
import {
  addExperience,
  ExperienceState,
  fetchExperience,
  deleteExperience,
} from "@/app/actions/profile";
import { AlertTriangle, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import ExperienceDisplay from "./experiencedisplay";

export const months = [
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
    // if (!isEditModalOpen) {
    //   setExperience([]); // reset when closed
    //   return;
    // }

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
    if (isAddModalOpen || isEditModalOpen || isExperienceEditModalOpen)
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
      <div className="flex flex-col">
        <div className="flex flex-col divide-y divide-gray-300">
          {experience &&
            experience.map((e) => {
              console.log("From Info",e)
              return <ExperienceDisplay key={e.id} experience={e} />;
            })}
        </div>
      </div>
      {isExperienceEditModalOpen && (
        <Modal
          title={"Edit this"}
          styles={"profile-modal-styles "}
          clearFunction={() => setIsExperienceEditModalOpen(false)}
          content={
            <EditExperienceContent
              selectedExperience={selectedExperience}
              back={() => {
                setIsEditModalOpen(true);
              }}
            />
          }
        />
      )}
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
                  <div key={i} className="flex justify-between px-3">
                    <ExperienceDisplay key={e.id} experience={e} />
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
      {(isEditModalOpen || isAddModalOpen || isExperienceEditModalOpen) && (
        <div
          className=" fixed inset-0 bg-black/20 z-45 cursor-pointer"
          onClick={() => {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            setIsExperienceEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
export function AddExperienceContent() {
  const initialState: ExperienceState = {
    success: false,
    errors: {},
  };
  const [state, formAction] = useActionState<ExperienceState, FormData>(
    addExperience,
    initialState,
  );
  const [isCurrentChecked,setIsCurrentChecked] = useState(false)
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
          <span className="text-red-500 text-[11px]">
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
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
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
          <span className="text-red-500 text-[11px]">
            {state?.errors?.company}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 ">
        <input
          type="checkbox"
          className="focus:ring-0! size-4 accent-cyan-400"
          name="current"
          id="current-checkbox"
          defaultChecked={isCurrentChecked}
          value={isCurrentChecked ? "true" : "false"}
          onChange={()=>setIsCurrentChecked((prev)=>!prev)}
        />
        <label htmlFor="current-checkbox" className="">
          Are you currently working this?
        </label>
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
          <span className="text-red-500 text-[11px]">
            {state?.errors?.startDate}
          </span>
        )}
      </div>

      <div className="modal-input-container">
        <span>End date* </span>

        <div className="flex gap-2" key={state?.values?.endMonth || "initial"}>
          <select
            name="endMonth"
            className="border rounded-md px-2 py-2  bg-white grow disabled:bg-gray-300 disabled:cursor-not-allowed"
            defaultValue={state?.values?.endMonth || ""}
            disabled={isCurrentChecked}
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
            className="border rounded-md px-2 py-2 bg-white grow disabled:bg-gray-300 disabled:cursor-not-allowed"
            defaultValue={state?.values?.endYear || ""}
            disabled={isCurrentChecked}
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
          <span className="text-red-500 text-[11px]">
            {state?.errors?.endDate}
          </span>
        )}
        {state?.errors?.date && (
          <span className="text-red-500 text-[11px]">
            {state?.errors?.date}
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

export function EditExperienceContent({ selectedExperience, back }) {
  const initialState: ExperienceState = {
    success: false,
    errors: {},
  };
  const [state, formAction] = useActionState<ExperienceState, FormData>(
    addExperience,
    initialState,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [isCurrentChecked, setIsCurrentChecked] = useState(selectedExperience?.current);
  return (
    <form
      className="w-full  space-y-3 overflow-y-auto px-2 flex flex-col"
      action={formAction}
    >
      {isDeleteModalOpen && (
        <div
          className=" fixed inset-0 bg-black/20 -bottom-3 z-45 cursor-pointer"
          onClick={() => {
            setIsDeleteModalOpen(false);
          }}
        />
      )}
      {isDeleteModalOpen && (
        <Modal
          // title='Delete Post'
          content={
            <div className="flex flex-col items-center w-full gap-y-2">
              <div className="flex gap-1 items-center justify-center text-lg">
                <AlertTriangle className="text-red-700" />
                <span>Experience Deletion Alert!</span>
              </div>
              <div className="flex flex-col items-center text-base gap-y-4">
                <p>Are you sure you want to delete the selected experience?</p>
                <div className="flex gap-5">
                  <button
                    className="btn-register rounded-sm disabled:bg-gray-300 disabled:text-white disabled:cursor-not-allowed"
                    disabled={isLoading}
                    onClick={async () => {
                      setIsLoading(true);
                      await deleteExperience(selectedExperience?.id);
                      setIsLoading(false);
                      setIsDeleteModalOpen(false);
                      router.refresh();
                      back();
                    }}
                  >
                    {isLoading ? "Deleting" : "Delete"}
                  </button>

                  <button
                    className="btn-register rounded-sm"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          }
          clearFunction={() => setIsDeleteModalOpen(false)}
          styles={"top-1/4 bottom-1/3 max-w-100 h-fit"}
        />
      )}
      <h6 className="text-xs"> * indicates required</h6>
      <div className=" modal-input-container">
        <span>Title* </span>
        <input
          type="hidden"
          name="experienceId"
          value={selectedExperience?.id ?? ""}
        />
        <input
          type="text"
          name="title"
          placeholder="Ex. Managing Partner"
          defaultValue={
            state?.values?.title ||
            (state?.values?.title != 0 && selectedExperience?.title) ||
            ""
          }
        />
        {state?.errors?.title && (
          <span className="text-red-500 text-[11px]">
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
          defaultValue={
            state?.values?.type ||
            (state?.values?.type != 0 && selectedExperience?.type) ||
            ""
          }
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
          defaultValue={
            state?.values?.company ||
            (state?.values?.company != 0 && selectedExperience?.company) ||
            ""
          }
        />
        {state?.errors?.company && (
          <span className="text-red-500 text-[11px]">
            {state?.errors?.company}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 ">
        <input
          type="checkbox"
          className="focus:ring-0! size-4 accent-cyan-400"
          name="current"
          id="current-checkbox"
          defaultChecked={isCurrentChecked}
          value={isCurrentChecked ? "true" : "false"}
          onChange={() => setIsCurrentChecked((prev) => !prev)}
        />
        <label htmlFor="current-checkbox" className="">
          Are you currently working this?
        </label>
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
            defaultValue={
              state?.values?.startMonth ||
              (state?.values?.startMonth != 0 &&
                selectedExperience?.startMonth) ||
              ""
            }
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
            defaultValue={
              state?.values?.startYear ||
              (state?.values?.startYear != 0 &&
                selectedExperience?.startYear) ||
              ""
            }
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
          <span className="text-red-500 text-[11px]">
            {state?.errors?.startDate}
          </span>
        )}
      </div>

      <div className="modal-input-container">
        <span>End date* </span>

        <div className="flex gap-2" key={state?.values?.endMonth || "initial"}>
          <select
            name="endMonth"
            className="border rounded-md px-2 py-2  bg-white grow disabled:bg-gray-300 disabled:cursor-not-allowed"
            defaultValue={
              state?.values?.endMonth ||
              (state?.values?.endMonth != 0 && selectedExperience?.endMonth) ||
              ""
            }
            disabled={isCurrentChecked}
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
            className="border rounded-md px-2 py-2 bg-white grow disabled:bg-gray-300 disabled:cursor-not-allowed"
            defaultValue={
              state?.values?.endYear ||
              (state?.values?.endYear != 0 && selectedExperience?.endYear) ||
              ""
            }
            disabled={isCurrentChecked}
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
          <span className="text-red-500 text-[11px]">
            {state?.errors?.endDate}
          </span>
        )}
        {state?.errors?.date && (
          <span className="text-red-500 text-[11px]">
            {state?.errors?.date}
          </span>
        )}
      </div>
      <div className=" modal-input-container">
        <span>Location </span>
        <input
          type="text"
          name="location"
          placeholder="Ex. Addis Ababa, Ethiopia"
          defaultValue={
            state?.values?.location ||
            (state?.values?.location != 0 && selectedExperience?.location) ||
            ""
          }
        />
      </div>
      <div className=" modal-input-container  ">
        <span className="">Location Type</span>

        <select
          key={state?.values?.locationType || "initial"}
          name="locationType"
          className="border px-2 py-1 rounded"
          defaultValue={
            state?.values?.locationType ||
            (state?.values?.locationType != 0 &&
              selectedExperience?.locationType) ||
            ""
          }
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
          defaultValue={
            state?.values?.description ||
            (state?.values?.description != 0 &&
              selectedExperience?.description) ||
            ""
          }
        />
      </div>

      <span className="flex justify-between">
        <button
          type="button"
          disabled={isLoading}
          className="final-action-button disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed bg-red-500 hover:bg-red-400 transition"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete
        </button>

        <SaveButton />
      </span>
    </form>
  );
}
