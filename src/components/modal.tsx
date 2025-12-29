
import {  X } from "lucide-react";
import EmojiPickerLayout from "./emojipickerlayout";
import React from "react";

export default function Modal({clearFunction,content,styles}){
  
    return (
      <div className={`modal ${styles}`}>
        <X className="self-end rounded-full p-2 hover:bg-gray-200 cursor-pointer shrink-0" size={40} onClick={clearFunction}/>
        
        {content}
      </div>
    );
}