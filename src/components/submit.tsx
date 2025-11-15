"use client"
import { useFormStatus } from "react-dom"
export default function Submit({type}:{type:string}){
    const {pending,method,data,action} = useFormStatus()
    console.log(pending, method, data, action);
    console.log("From Submit")
return (
  <button
    type="submit"
    disabled={pending}
    className={`w-full p-3 bg-black rounded text-white font-semibold hover:bg-white hover:text-black cursor-pointer transition-colors border duration-300 active:text-black active:bg-white disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:text-black disabled:border-gray-200 disabled:cursor-not-allowed`}
    
  >
    SIGN{pending && 'ING'} {type.slice(-2).toUpperCase()} 
  </button>
);
}