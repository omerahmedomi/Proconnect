"use client";
import { useState, useEffect, useRef } from "react";
import PlusIcon from "./icons/addicon";
import EditIcon from "./icons/editicon";
import Modal from "./modal";
import SaveButton from "./savebutton";
import {
  addEducation,
  deleteEducation,
  EducationState,
  fetchEducation,
} from "@/app/actions/profile";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader } from "lucide-react";
import DeleteButton from "./deletebutton";

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
export default function EducationInfo() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEducationEditModalOpen, setIsEducationEditModalOpen] =
    useState(false);
  const [selectedEducation, setSelectedEducaiton] = useState({});
  const [education, setEducation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAddModalOpen || isEditModalOpen || isEducationEditModalOpen)
      document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, [isEditModalOpen, isAddModalOpen, isEducationEditModalOpen]);

  useEffect(() => {
    if (!isEditModalOpen) {
      setEducation([]); // reset when closed
      return;
    }

    let alive = true;

    (async () => {
      setIsLoading(true);
      const edu = await fetchEducation();
      if (alive) {
        setEducation(JSON.parse(JSON.stringify(edu)));
      }
      setIsLoading(false);
    })();

    return () => {
      alive = false;
    };
  }, [isEditModalOpen]);

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
      {isEducationEditModalOpen && (
        <Modal
          title={"Edit this"}
          styles={"profile-modal-styles "}
          clearFunction={() => setIsEducationEditModalOpen(false)}
          content={
            <EditEducationContent
              selectedEducation={selectedEducation}
              back={() => {
                setIsEditModalOpen(true);
                
              }}
            />
          }
        />
      )}
      {isEditModalOpen && (
        <Modal
          title="Edit Educaton"
          clearFunction={() => setIsEditModalOpen(false)}
          styles={"profile-modal-styles"}
          content={
            isLoading ? (
              <span className=" flex justify-center w-full">
                <Loader color="black" />
              </span>
            ) : (
              <div className=" text-black w-full space-y-2  overflow-y-auto">
                {education?.map((e, i) => (
                  <div
                    key={i}
                    className="flex justify-between rounded border-gray-300 shadow  px-3 py-1 items-start border-px"
                  >
                    <div>
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
                    <span
                      onClick={() => {
                        setIsEducationEditModalOpen(true);
                        setIsEditModalOpen(false);
                        setSelectedEducaiton(e);
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
          key={isAddModalOpen ? "add-modal-open" : "add-modal-closed"}
          title={isEditModalOpen ? "Edit Education" : "Add Educaton"}
          clearFunction={() => {
            setIsAddModalOpen(false);
          }}
          styles={"profile-modal-styles"}
          content={<AddEducationContent />}
        />
      )}
      {(isEditModalOpen || isAddModalOpen || isEducationEditModalOpen) && (
        <div
          className=" fixed inset-0  bg-black/20 z-49 cursor-pointer"
          onClick={() => {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            setIsEducationEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export function AddEducationContent() {
  const initialState: EducationState = {
    success: false,
    errors: {},
  };
  const [state, formAction] = useActionState<EducationState, FormData>(
    addEducation,
    initialState,
  );
  return (
    <form
      // key={formKey}
      className="w-full  space-y-3 overflow-y-auto px-2 flex flex-col"
      action={formAction}
    >
      <h6 className="text-xs"> * indicates required</h6>
      <div className=" modal-input-container">
        <span>School* </span>
        <input
          type="text"
          name="school"
          defaultValue={state?.values?.school || ""}
        />
        {state?.errors?.school && (
          <span className="text-red-500 text-[11px]">
            {state?.errors?.school}
          </span>
        )}
      </div>
      <div className=" modal-input-container flex flex-row gap-x-4 items-center">
        <span className="">Degree </span>

        <select
          name="degree"
          key={state?.values?.degree || "initial"}
          className="border px-2 py-1 rounded"
          defaultValue={state?.values?.degree || ""}
        >
          <option value={""} disabled>
            Select your degree
          </option>
          <option value="Bachelors">Bachelors</option>
          <option value="Masters">Masters</option>
          <option value="Phd">Phd</option>
          <option value="Diploma">Diploma</option>
        </select>
      </div>
      <div className=" modal-input-container">
        <span>Field of study </span>
        <input
          className="mt-0"
          name="field"
          defaultValue={state?.values?.field || ""}
        />
      </div>
      <div className="modal-input-container">
        <span>Start date</span>

        <div
          className="flex gap-2"
          key={state?.values?.startMonth || "initial"}
        >
          <select
            name="startMonth"
            className="border rounded-md px-2  bg-white grow"
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
            name="startYear"
            className="border rounded-md px-2 py-2 
             bg-white grow"
            key={state?.values?.startYear || "initial"}
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
      </div>

      <div className="modal-input-container">
        <span>End date (or expected)</span>

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
            name="endYear"
            className="border rounded-md px-2 py-2 bg-white grow"
            key={state?.values?.endYear || "initial"}
            defaultValue={state?.values?.endYear || ""}
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
      {state?.errors?.date && (
        <span className="text-red-500 text-[11px]">{state?.errors?.date}</span>
      )}

      <div className="modal-input-container">
        <span>Description</span>
        <textarea
          maxLength={1000}
          name="description"
          defaultValue={state?.values?.description || ""}
        />
      </div>
      <SaveButton />
    </form>
  );
}

export function EditEducationContent({ selectedEducation, back }) {
  const initialState: EducationState = {
    success: false,
    errors: {},
  };
  const [state, formAction] = useActionState<EducationState, FormData>(
    addEducation,
    initialState,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <form
      className="w-full  space-y-3  px-2 flex flex-col "
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
                <span>Education Deletion Alert!</span>
              </div>
              <div className="flex flex-col items-center text-base gap-y-4">
                <p>Are you sure you want to delete the selected education?</p>
                <div className="flex gap-5">
                  <button
                    className="btn-register rounded-sm disabled:bg-gray-300 disabled:text-white disabled:cursor-not-allowed"
                    disabled={isLoading}
                    onClick={async () => {
                      setIsLoading(true);
                      await deleteEducation(selectedEducation?.id);
                      setIsLoading(false);
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
        <span>School* </span>
        <input
          type="hidden"
          name="educationId"
          value={selectedEducation?.id ?? ""}
        />
        <input
          type="text"
          name="school"
          defaultValue={
            state?.values?.school ||
            (state?.values?.school != 0 && selectedEducation?.school) ||
            ""
          }
        />
        {state?.errors && (
          <span className="text-red-500 text-[11px]">
            {state?.errors?.school}
          </span>
        )}
      </div>
      <div className=" modal-input-container flex flex-row gap-x-4 items-center">
        <span className="">Degree </span>

        <select
          key={state?.values?.degree || "initial"}
          name="degree"
          className="border px-2 py-1 rounded"
          defaultValue={
            state?.values?.degree ||
            (state?.values?.degree != 0 && selectedEducation?.degree) ||
            ""
          }
        >
          <option value={""} disabled>
            Select your degree
          </option>
          <option value="Bachelors">Bachelors</option>
          <option value="Masters">Masters</option>
          <option value="Phd">Phd</option>
          <option value="Diploma">Diploma</option>
        </select>
      </div>
      <div className=" modal-input-container">
        <span>Field of study </span>
        <input
          className="mt-0"
          name="field"
          defaultValue={
            state?.values?.field ||
            (state?.values?.field != 0 && selectedEducation?.field) ||
            ""
          }
        />
      </div>
      <div className="modal-input-container">
        <span>Start date</span>

        <div
          className="flex gap-2"
          key={state?.values?.startMonth || "initial"}
        >
          <select
            name="startMonth"
            className="border rounded-md px-2   bg-white grow"
            defaultValue={
              state?.values?.startMonth || selectedEducation?.startMonth || ""
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
            name="startYear"
            key={state?.values?.startYear || "initial"}
            className="border rounded-md px-2 py-2 bg-white grow"
            defaultValue={
              state?.values?.startYear || selectedEducation?.startYear || ""
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
      </div>

      <div
        className="modal-input-container"
        key={state?.values?.endMonth || "initial"}
      >
        <span>End date (or expected)</span>

        <div className="flex gap-2">
          <select
            name="endMonth"
            className="border rounded-md px-2 py-2  bg-white grow"
            defaultValue={
              state?.values?.endMonth || selectedEducation?.endMonth || ""
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
            name="endYear"
            key={state?.values?.endYear || "initial"}
            className="border rounded-md px-2 py-2  bg-white grow"
            defaultValue={
              state?.values?.endYear || selectedEducation?.endYear || ""
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
      </div>
      {state?.errors?.date && (
        <span className="text-red-500 text-[11px]">{state?.errors?.date}</span>
      )}

      <div className="modal-input-container">
        <span>Description</span>
        <textarea
          maxLength={1000}
          name="description"
          defaultValue={
            state?.values?.description || selectedEducation?.description
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
