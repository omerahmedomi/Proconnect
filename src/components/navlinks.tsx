'use client'
import {
  Home,
  Users,
  MessageSquare,
  Bell,
} from "lucide-react";
import Link from "next/link";
import Noty from "./icons/noty";
import { usePathname } from "next/navigation";


export const active='font-bold text-cyan-600';

export default function NavigationLink(){
  const pathname = usePathname();


return (
  <ul className="side-menu-links flex text-xs  gap-2 items-center text-nowrap *:p-2 *:gap-1.5 *:rounded">
    <Link href={"/"} className={`${pathname == "/" && active}`}>
      <Home size={20} />
      <span>Home</span>
    </Link>
    <Link href={"/my-network"} className={`${pathname == "/my-network" && active}`}>
      <Users size={20} />
      <span>My Network</span>
    </Link>
    
    <Link href={"/messages"} className={`${pathname == "/messages" && active}`}>
      <span className="relative">
        <MessageSquare size={20} />
      </span>
      <span>Messaging</span>
    </Link>
    <Link href={"/notifications"} className={`${pathname == "/notifications" && active}`}>
      <span className="relative">
        <Bell size={20} />
        <Noty count={4} />
      </span>
      <span>Notifications</span>
    </Link>
  </ul>
);
    
}