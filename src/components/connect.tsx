import { UserPlus } from "lucide-react";
export default function Connect(){
    return (
      <p className="connect flex items-center text-cyan-600 hover:text-cyan-500 transition-colors duration-300 cursor-pointer gap-1">
        <UserPlus size={14} />
        Connect
      </p>
    );
}