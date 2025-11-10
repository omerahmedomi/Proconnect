import { SearchIcon, X } from "lucide-react";

export default function Search(){


    return (
      <div className="relative  self-stretch ">
        <input
          type="text"
          className="shadow bg-gray-50  w-full  rounded-full h-full px-11 text-sm focus:outline-cyan-500 peer focus:bg-white"
          placeholder="Search for people,jobs,companies"
        />
        <SearchIcon
          className="absolute top-1/2 -translate-y-1/2 pl-3.5 shrink-0 text-gray-400 peer-focus:text-cyan-500"
          size={33}
        />
        <X className="absolute right-0 top-1/2 pr-3.5 -translate-y-1/2 shrink-0 hidden peer-focus:block text-gray-400 hover:text-black" size={30}/>
      </div>
    );
}