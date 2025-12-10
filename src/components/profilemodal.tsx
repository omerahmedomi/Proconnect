import { Settings, LogOut, User } from "lucide-react";
import { signOutAction } from "@/app/actions/auth";
import UserProfile from "./userprofile";
import { authClient } from "@/lib/auth-clients";
import Link from "next/link";
export default function ProfileModal({session}) {
  return (
    <div className="absolute top-full right-2 border rounded border-cyan-300 shadow w-80 z-50 bg-white">
        <UserProfile session={session} showViewProfile={false}/>

      <ul className="side-menu-links text-sm">
        <Link href={`/profile/${session?.user?.id}`}>
          <User />
          <span>View Profile</span>
        </Link>
        <Link href={'/settings'}>
          <Settings size={20} />

          <span>Settings & Privacy</span>
        </Link>
        <li
          onClick={() => {
            signOutAction();
              authClient.signOut();
              
           
          }}
          className="text-red-500"
        >
          <LogOut size={20} />

          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
}
