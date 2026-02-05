
import {  X } from "lucide-react";
import EmojiPickerLayout from "./emojipickerlayout";
import React from "react";

export default function Modal({clearFunction,content,styles,title,data}){
  
    return (
      <div className={`modal ${styles}`}>
        <div className="flex items-center justify-between w-full">
          <h4 className="font-semibold text-base">{title}</h4>
          <X
            className="self-end rounded-full p-2 hover:bg-gray-200 cursor-pointer shrink-0"
            size={40}
            onClick={clearFunction}
          />
        </div>

        {content}
      </div>
    );
}