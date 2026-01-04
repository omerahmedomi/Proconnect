"use client";
import { useState } from "react";
import PlusIcon from "./icons/addicon";
import EditIcon from "./icons/editicon";
import Modal from "./modal";
import SaveButton from "./savebutton";
export default function EducationInfo() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);const months = [
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
        />
      )}
      {isAddModalOpen && (
        <Modal
          title="Add Educaton"
          clearFunction={() => setIsAddModalOpen(false)}
          styles={"profile-modal-styles"}
          content={
            <form className="w-full  space-y-3 overflow-y-scroll px-2 flex flex-col">
              <h6 className="text-xs"> * indicates required</h6>
              <div className=" modal-input-container">
                <span>School* </span>
                <input />
              </div>
              <div className=" modal-input-container">
                <span>Degree </span>
                <input className="mt-0" />
              </div>
              <div className=" modal-input-container">
                <span>Field of study </span>
                <input className="mt-0" />
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
                <textarea maxLength={1000} />
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
