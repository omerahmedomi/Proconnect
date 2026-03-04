"use client"
import { Check, X } from "lucide-react";


export default function ConnectionRequestForm({userId,reqId,onAction}){

   
    return (
      <div className="mt-4 border-t border-gray-200 p-4 flex justify-center items-center gap-x-2 *:rounded-md *:cursor-pointer">
        <button className=" w-1/2 py-1.5 text-sm font-medium text-gray-600 hover:bg-cyan-600 transition flex items-center justify-center gap-x-2 hover:text-white" onClick={()=>onAction(userId,reqId,'ignore')}>
          <X size={18} /> Ignore
        </button>

        <button className="w-1/2  py-1.5 text-sm font-medium bg-cyan-600 text-white hover:bg-cyan-700 transition flex items-center justify-center gap-x-2" onClick={()=>onAction(userId,reqId,'accept')}>
          <Check size={15}  /> Accept
        </button>
      </div>
    );
}