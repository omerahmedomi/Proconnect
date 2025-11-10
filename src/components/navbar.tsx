import Image from "next/image";
import Link from "next/link";
import Search from "./search";
import SideMenu from "./sidemenu";



export default function NavigationBar(){

    return (
      <nav className="flex items-center justify-between px-4 py-3">
        <Link href={"/"} className="flex items-center shrink-0">
          <Image src={"/header-image.png"} width={40} height={20} alt="logo" />
          <h1 className="text-2xl hidden sm:block">ProConnect</h1>
        </Link>
        <Search />

        <SideMenu />
        <div className=" hidden lg:flex gap-4">
          <button className=" hover:bg-cyan-100 hover:text-cyan-900 transition-all duration-300  py-1 px-4  text-gray-800  rounded-2xl  cursor-pointer">
            Sign In
          </button>
          <button className="text-white hover:bg-cyan-600 cursor-pointer transition-all duration-700 bg-cyan-500 border border-cyan-50  rounded-2xl py-1 px-4 ">
            Join Now
          </button>
        </div>
      </nav>
    );
}