"use client"
import EditIcon from "./icons/editicon";
import { useState ,useEffect} from "react";
import Modal from "./modal";
export default function ProfileInfo({ session }) {
    const [isModalOpen,setIsModalOpen] = useState(false);
     useEffect(() => {
            if(isModalOpen)
             document.body.style.overflow = 'hidden';
             return ()=> document.body.style.overflow = 'unset';
          }, [isModalOpen]);
  return (
    <div className="info mt-11 text-sm px-6 flex flex-col">
      <span onClick={() => setIsModalOpen((prev) => !prev)}>
        <EditIcon styles="right-3 top-35 " />
      </span>{" "}
      <h5 className="text-2xl font-semibold">{session?.user?.name}</h5>
      <h5 className="  ">Professional</h5>
      <h5 className=" text-gray-500">Addis Ababa</h5>
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
          content={<div>
            <input className="input"/>
          </div>}
          clearFunction={() => setIsModalOpen(false)}
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
