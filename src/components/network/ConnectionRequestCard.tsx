import { Check, Users, X } from "lucide-react";

type User = {
  id: string;
  name: string;
  title: string;
  avatar: string;
  mutuals: number;
};

export default function ConnectionRequestCard({ user }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
      {/* Header */}
      <div
        className={`h-16 relative bg-cover bg-center ${
          !user.cover_picture &&
          "bg-linear-to-r from-[#0070B0]/15 via-[#0070B0]/8 to-[#0070B0]/4"
        }`}
        style={
          user.cover_picture
            ? { backgroundImage: `url(${user.cover_picture})` }
            : undefined
        }
      >
        <div className="absolute left-1/2 -bottom-8 -translate-x-1/2">
          <img
            src={user.profile_picture}
            alt={user.name}
            className="size-16 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      {/* Body */}
      <div className="pt-10 px-4 text-center">
        <p className="font-semibold text-lg">
          {user.name.firstName + " " + user.name.lastName}
        </p>
        <p className="text-sm text-gray-600 mt-1">{user.headline}</p>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-3">
          <Users size={18} />
          <span>{user.mutuals} mutual connections</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 border-t border-gray-200 p-4 flex justify-center items-center gap-x-2 *:rounded-md *:cursor-pointer">
        <button className=" w-1/2 py-1.5 text-sm font-medium text-gray-600 hover:bg-cyan-600 transition flex items-center justify-center gap-x-2 hover:text-white">
          <X size={18} /> Ignore
        </button>

        <button className="w-1/2  py-1.5 text-sm font-medium bg-cyan-600 text-white hover:bg-cyan-700 transition flex items-center justify-center gap-x-2">
          <Check size={15} /> Accept
        </button>
      </div>
    </div>
  );
}
