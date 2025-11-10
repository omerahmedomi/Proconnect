import Image from "next/image";
import Link from "next/link";
import Search from "./search";
import { MenuIcon } from "lucide-react";


export default function NavigationBar(){

    return(
        <nav className="flex items-center justify-between px-4 py-3">
            <Link href={'/'} className="flex items-center shrink-0">
                <Image src={'/header-image.png'} width={40} height={20} alt="logo" />
                <h1 className="text-2xl hidden sm:block">ProConnect</h1>
            </Link>
            <Search/>
          <MenuIcon className="shrink-0 hover:bg-gray-100 rounded-lg transition duration-200 px-2" size={40}/>
            

        </nav>
    )
}