import Image from "next/image";
import Link from "next/link";
import Search from "./search";
import SideMenu from "./sidemenu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  MenuIcon,
  X,
  Home,
  Users,
  Briefcase,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import Noty from "./icons/noty";
import Profile from "./profile";



export default async function NavigationBar(){
  const session = await auth.api.getSession({headers: await headers()});
  

    return (
      <nav className="nav-bar">
        <Link href={"/"} className="nav-logo-link">
          <img src={"/header-image.png"} width={40} height={20} alt="logo" />
          <h1 className="nav-text-link">ProConnect</h1>
        </Link>
        <Search />

        <SideMenu />
        {session ? (
          <div className=" flex text-xs max-lg:hidden items-center text-nowrap gap-2 ">
            <ul className="side-menu-links flex text-xs  gap-2 items-center text-nowrap *:p-2 *:gap-1.5 *:rounded">
              <li>
                <Home size={20} />
                <span>Home</span>
              </li>
              <li>
                <Users size={20} />
                <span>My Network</span>
              </li>
              <li>
                <Briefcase size={20} />

                <span>Jobs</span>
              </li>
              <li>
                <span className="relative">
                  <MessageSquare size={20} />
                </span>
                <span>Messaging</span>
              </li>
              <li>
                <span className="relative">
                  <Bell size={20} />
                  <Noty count={4} />
                </span>
                <span>Notifications</span>
              </li>
            </ul>
            <Profile session={session}/>
          </div>
        ) : (
          <div className="btn-auth-container">
            <Link href={"/signin"} className="btn-sign-in">
              Sign In
            </Link>
            <Link href={"/signup"} className="btn-register">
              Join Now
            </Link>
          </div>
        )}
      </nav>
    );
}