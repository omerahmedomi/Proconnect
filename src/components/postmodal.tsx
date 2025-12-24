
import {  X } from "lucide-react";
import EmojiPickerLayout from "./emojipickerlayout";

export default function PostModal({clearFunction}){
  
    return (
      <div className="fixed top-0 bottom-0 flex flex-col items-start z-100   rounded-lg shadow border border-cyan-500  mx-auto  bg-white right-1/2 w-full max-w-180 translate-x-1/2 p-4   ">
        <X className="self-end rounded-full p-2 hover:bg-gray-200 cursor-pointer shrink-0" size={40} onClick={clearFunction}/>
        
        <EmojiPickerLayout clearFunction={clearFunction}/>
      </div>
    );
}