"use client";
import { MenuIcon, X,Home, Users, Briefcase, MessageSquare, Bell, Settings,LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-clients";
import Noty from "./icons/noty";
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
            <div className="profile-wrapper w-full flex items-center  gap-2 bg-cyan-50 p-4">
              <div className="image bg-white rounded-full p-1 border border-cyan-200">
                {session?.user?.image ? (
                  <img
                    src={session?.user?.image || `/header-image.png`}
                    className="w-20"
                  ></img>
                ) : (
                  <h5 className="bg-cyan-500  rounded-full size-20 flex justify-center items-center text-2xl text-white">
                    {" "}
                    {session?.user?.name.split("")[0].toUpperCase() +
                      "" +
                      session?.user?.name
                        ?.split(" ")[1]
                        .split("")[0]
                        .toUpperCase()}
                  </h5>
                )}
              </div>
              <div className="info-wrapper">
                <h2 className="font-semibold text-lg">{session?.user?.name}</h2>
                <h4 className="text-sm text-gray-500">Professional</h4>
                <Link
                  href={`/profile/${session?.user?.id}`}
                  className="text-semibold text-cyan-600 text-sm hover:text-cyan-700"
                >
                  View Profile
                </Link>
              </div>
            </div>
            <ul className="side-menu-links">
              <li>
                <Home />
                <span>Home</span>
              </li>
              <li>
                <Users />
                <span>My Network</span>
              </li>
              <li>
                <Briefcase />

                <span>Jobs</span>
              </li>
              <li>
                <span className="relative">
                  <MessageSquare />
                </span>
                <span>Messaging</span>
              </li>
              <li>
                <span className="relative">
                  <Bell />
                  <Noty count={4} />
                </span>
                <span>Notifications</span>
              </li>
              <li>
               
                  <Settings />

                <span>Settings & Privacy</span>
              </li>
              <li className="text-red-500">
               
                 <LogOut/>
                
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
