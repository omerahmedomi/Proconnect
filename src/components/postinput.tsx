"use client"

import { useState } from "react";
import PostModal from "./postmodal";

export default function PostInput(){
    const [isModalOpen,setIsModalOpen] = useState<boolean>(false);
    return (
      <button
      onClick={()=>{
        setIsModalOpen((prev) => !prev);
      }}

        
      
        className="border cursor-pointer border-gray-300 text-sm rounded-full px-4 py-2 bg-gray-50 text-gray-600 w-full text-left"
       
      >
        Start a post
      {isModalOpen &&  <PostModal/>}
      {isModalOpen && <div className=" absolute inset-0 bg-black/20"/>}
        </button>
    );
}