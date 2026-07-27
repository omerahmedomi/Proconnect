import { Settings, LogOut, User } from "lucide-react";
import { signOutAction } from "@/app/actions/auth";
import UserProfile from "./userprofile";
import { authClient } from "@/lib/auth-clients";
import Link from "next/link";
export default function ProfileModal({profile, closeModal}: { profile: any, closeModal?: () => void }) {
  return (
    <div className="absolute top-full right-2 border rounded border-cyan-300 shadow w-80 z-50 bg-white">
        <UserProfile profile={profile} showViewProfile={false}/>

      <ul className="side-menu-links text-sm">
        <li onClick={closeModal} className="p-0 border-0 hover:bg-transparent">
          <Link href={`/profile/${profile?._id}`} className="flex items-center gap-3 w-full p-2 hover:bg-gray-100 rounded">
            <User />
            <span>View Profile</span>
          </Link>
        </li>
        <li onClick={closeModal} className="p-0 border-0 hover:bg-transparent">
          <Link href={'/settings'} className="flex items-center gap-3 w-full p-2 hover:bg-gray-100 rounded">
            <Settings size={20} />
            <span>Settings & Privacy</span>
          </Link>
        </li>
        <li
          onClick={() => {
            if (closeModal) closeModal();
            signOutAction();
            authClient.signOut();
          }}
          className="text-red-500 cursor-pointer p-2 hover:bg-red-50 rounded flex items-center gap-3"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
}
