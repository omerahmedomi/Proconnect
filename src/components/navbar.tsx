import Image from "next/image";
import Link from "next/link";
import Search from "./search";
import SideMenu from "./sidemenu";



export default function NavigationBar(){

    return (
      <nav className="nav-bar">
        <Link href={"/"} className="nav-logo-link">
          <img src={"/header-image.png"} width={40} height={20} alt="logo" />
          <h1 className="nav-text-link">ProConnect</h1>
        </Link>
        <Search />

        <SideMenu />
        <div className="btn-auth-container">
          <button className="btn-sign-in">
            Sign In
          </button>
          <button className="btn-register">
            Join Now
          </button>
        </div>
      </nav>
    );
}