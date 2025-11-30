import { Settings, LogOut, User } from "lucide-react";
import { signOutAction } from "@/app/actions/auth";
import UserProfile from "./userprofile";
import { authClient } from "@/lib/auth-clients";
export default function ProfileModal({session}) {
  return (
    <div className="absolute top-full right-2 border rounded border-cyan-300 shadow w-80">
        <UserProfile session={session} showViewProfile={false}/>

      <ul className="side-menu-links text-sm">
        <li>
          <User />
          <span>View Profile</span>
        </li>
        <li>
          <Settings size={20} />

          <span>Settings & Privacy</span>
        </li>
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
