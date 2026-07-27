import { Bookmark, Users } from "lucide-react";
import MyCover from "@/components/mycover";
import ProfileImage from "@/components/profileimage";
import Link from "next/link";

export default function LeftSidebar({ userProfile, session }: { userProfile: any, session: any }) {
  return (
    <div className="hidden md:block md:col-span-3 lg:col-span-3 space-y-4">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative pb-4">
        <MyCover
          styles="h-16 w-full object-cover"
          self={false}
          profile={userProfile}
        />
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <ProfileImage
            styles="w-16 h-16 border-2 border-white rounded-full bg-white shadow-sm"
            image={userProfile?.profile_picture}
          />
        </div>
        <div className="mt-14 px-4 text-center">
          <h5 className="font-semibold text-gray-900 hover:underline cursor-pointer">{session?.user?.name}</h5>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{userProfile?.headline || "Add a headline"}</p>
          <p className="text-xs text-gray-400 mt-2">{userProfile?.location?.city}</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 space-y-1">
        <Link href="/saved" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition text-sm text-gray-700 font-medium">
          <Bookmark size={18} className="text-gray-500" />
          <span>Saved items</span>
        </Link>
      </div>
    </div>
  );
}
