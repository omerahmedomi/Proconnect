import { Edit2 } from "lucide-react";
export default function EditIcon({styles}:{styles?:string}){
    return (
      <div
        className={`absolute hover:bg-gray-100   rounded-full p-2 transition-colors duration-500 cursor-pointer text-cyan-500 top-6 right-2 ${styles}`}
      >
        <Edit2 size={20} strokeWidth={3} />
      </div>
    );
}