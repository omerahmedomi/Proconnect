import { Check, Users, X } from "lucide-react";
import Link from "next/link";
import ConnectionRequestForm from "./ConnectionRequestForm";


export default function ConnectionRequestCard({ req ,onAction}) {
 
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg overflow-hidden">
      {/* Header */}
      <div
        className={`h-16 relative bg-cover bg-center ${
          !req.from.cover_picture &&
          "cover-photo"
        }`}
        style={
          req.from.cover_picture
            ? { backgroundImage: `url(${req.from.cover_picture})` }
            : undefined
        }
      >
        <div className="absolute left-1/2 -bottom-8 -translate-x-1/2">
          <img
            src={req.from.profile_picture || '/empty-profile.jpg'}
            alt={req.from.name.firstName}
            className="size-16 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      {/* Body */}
      <div className="pt-10 px-4 text-center">
        <Link className="font-semibold text-lg hover:underline underline-offset-2" href={`/profile/${req?.from?._id}`}>
          {req.from.name.firstName + " " + req.from.name.lastName}
        </Link>
        <p className="text-sm text-gray-600 mt-1">{req.from.headline}</p>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-3">
          <Users size={18} />
          <span>{req.mutuals} mutual connections</span>
        </div>
      </div>

      
      <ConnectionRequestForm userId={req?.from?._id} onAction={onAction} reqId={req._id}/>
    </div>
  );
}
