"use client";
import { MenuIcon, X,Home, Users, Briefcase, MessageSquare, Bell, Settings,LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-clients";
import Noty from "./icons/noty";
import { signOutAction } from "@/app/actions/auth";
import UserProfile from "./userprofile";
export default function SideMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession(); 

   useEffect(() => {
    if(isMenuOpen)
     document.body.style.overflow = 'hidden';
     return ()=> document.body.style.overflow = 'unset';
  }, [isMenuOpen]);
 
  return (
    <div className="lg:hidden overflow-hidden!">
      <MenuIcon
        className="menu-icon"
        size={40}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      />

      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/40  z-40 transition-opacity duration-500"
        />
      )}

      <div
        className={`menu-container  w-80  ${
          isMenuOpen ? "translate-x-0" : " translate-x-full"
        }`}
      >
        <div className="menu-header">
          <p>Menu</p>
          <X
            className="menu-cancel"
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
            }}
            size={40}
          />
        </div>

        {session ? (
          <div className="">
            <UserProfile session={session} showViewProfile={true}/>
            <ul className="side-menu-links text-sm">
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
              <li>
                <Settings size={20} />

                <span>Settings & Privacy</span>
              </li>
              <li onClick={()=>{
                signOutAction();
                refetch();
                setIsMenuOpen(false);
              }} className="text-red-500">
                
                <LogOut size={20} />

                <span>Logout</span>
              </li>
            </ul>
          </div>
        ) : (
          <div className="btn-auth-side-container">
            <Link href="/signin" className="btn-lg-sign-in">
              Sign In
            </Link>

            <Link href="/signup" className="btn-lg-register">
              Join Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
