import Image from "next/image";
import Link from "next/link";
import Search from "./search";
import SideMenu from "./sidemenu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";



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
        <div className="btn-auth-container">
          <Link href={'/signin'} className="btn-sign-in">
            Sign In
          </Link>
          <Link href={'/signup'}
          
          className="btn-register">
            Join Now
          </Link>
        </div>
        
      </nav>
    );
}