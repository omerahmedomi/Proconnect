import { X, XCircleIcon } from "lucide-react";

export default function PostModal(){
    return (
      <div className="absolute flex flex-col items-center z-50 justify-center top-2 rounded-lg shadow border border-cyan-500 w-200 mx-auto  bg-white right-1/2 translate-x-1/2 p-4 ">
        <X className="self-end rounded-full p-2 hover:bg-gray-300" size={40} />
        <div className="self-start flex flex-col">
          <input
            type="text"
            className="text-lg "
            placeholder="What do you want to talk about?"
          />
       
        </div>
      </div>
    );
}