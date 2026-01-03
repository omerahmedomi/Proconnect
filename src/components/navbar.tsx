import Link from "next/link";
import Search from "./search";
import SideMenu from "./sidemenu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Profile from "./profile";
import NavigationLink from "./navlinks";
import profile from "@/models/profile";
import dbConnect from "@/lib/mongodb";

export default async function NavigationBar() {
  const session = await auth.api.getSession({ headers: await headers() });
  await dbConnect();
  const userProfileDoc = await profile.findOne({ user: session?.user.id });
  const userProfile = JSON.parse(JSON.stringify(userProfileDoc));
  console.log("From navbar:", userProfile);

  return (
    <nav className="nav-bar">
      <Link href={"/"} className="nav-logo-link">
        <img src={"/header-image.png"} width={40} height={20} alt="logo" />
        <h1 className="nav-text-link">ProConnect</h1>
      </Link>
      <Search />

      <SideMenu profile={userProfile} />
      {session ? (
        <div className=" flex text-xs max-lg:hidden items-center text-nowrap gap-2 ">
          <NavigationLink />

          <Profile profile={userProfile} />
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
