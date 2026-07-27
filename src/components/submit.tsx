"use client"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react";

export default function Submit({text,styles}:{text:string,styles?:string}){
    const {pending,method,data,action} = useFormStatus()
return (
  <button
    type="submit"
    disabled={pending}
    className={`w-full p-3 bg-black rounded flex items-center justify-center gap-2 text-white font-semibold hover:bg-white hover:text-black cursor-pointer transition-colors border duration-300 active:text-black active:bg-white disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:text-black disabled:border-gray-200 disabled:cursor-not-allowed ${styles}`}
  >
    {pending && <Loader2 size={18} className="animate-spin" />}
    {text}
  </button>
);
}