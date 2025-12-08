import { headers } from "next/headers";
import Link from "next/link";
import React from "react";
import { cache } from "react";

import { auth } from "@/lib/auth";

import HeroSection from "@/components/herosection";
import { ArrowRight, Bookmark, Globe, Mails, Network, Target, Users, Zap, CalendarDays } from "lucide-react";
import WhyCard from "@/components/whycard";
import CountUpData from "@/components/countupdata";

import ProfileImage from "@/components/profileimage";
import Profile from "@/components/profile";


 async function Home() {
 const session = await auth.api.getSession({
  headers:await headers()
 })

  if (!session) {
    return (
      <>
        <HeroSection />
        <div className="px-4 py-20 space-y-9">
          <div className="flex flex-col items-center gap-y-5 text-center">
            <h3 className="text-4xl font-bold lg:text-5xl">
              Join millions of professionals
            </h3>
            <p className="text-xl max-w-200">
              Discover why professionals choose our platform to build meaningful
              connections and advance ther careers 
            </p>
          </div>
          <div className="flex flex-col sm:grid gap-6 grid-cols-2 lg:grid-cols-4">
            <WhyCard
              title="Build Your Network"
              description="Connect with like-minded professionals and industry leaders worldwide"
              icon={<Network className="why-logo " size={50} />}
            />
            <WhyCard
              title="Targeted Opportunities"
              description="Discover personalized job opportunities and career advancement paths"
              icon={<Target className="why-logo" size={50} />}
            />
            <WhyCard
              title="Instand Insights"
              description="Share your expertise and stay updated with industry trends"
              icon={<Zap className="why-logo" size={50} />}
            />
            <WhyCard
              title="Global Reach"
              description="Connect with professionals from companies around the world"
              icon={<Globe className="why-logo" size={50} />}
            />
          </div>
        </div>
        <CountUpData />

        <div
          className="ready 
        "
        >
          <h2 className="text-4xl font-bold lg:text-5xl max-w-4xl">
            Ready to shape your professional story?
          </h2>
          <p className="text-xl max-w-4xl text-gray-600">
            Join professionals who are already building their network and
            advancing their careers on our platform
          </p>
          <div className="flex flex-col gap-3 bg items-center sm:flex-row">
            <Link
              href={"/signup"}
              className="hero-btn-signup px-4 group self-center"
            >
              Get started today
              <ArrowRight className="inline group-hover:translate-x-1 transition-all duration-300" />
            </Link>
            <Link href={"/signin"} className="hero-btn-signin px-4">
              Already have an account?
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="md:px-6 max-w-xl  mx-auto  md:mx-0 md:flex md:gap-x-10  md:max-w-full! min-[1200px]:justify-center bg-slate-50 ">
      <div className="relative md:min-w-50">
        <div className="profile-view w-full  h-40 flex-col flex items-start mt-3 border sm:rounded-lg border-gray-200 bg-white">
          <div className="cover-image h-14 bg-yellow-400 self-stretch sm:rounded-t-lg border-gray-200"></div>
          <ProfileImage
            session={session}
            styles={"w-17 absolute top-7 left-2"}
          />
          <div className="info text-black mt-10 px-2 ">
            <h5>{session?.user?.name}</h5>
            <h5 className="text-[13px] text-gray-800 font-light">
              Professional
            </h5>
            <h5 className="text-xs text-gray-500">Addis Ababa</h5>
          </div>
        </div>
        <div className="links  mt-3 px-2 text-xs space-y-3 font-bold border sm:rounded-lg p-2 border-gray-200 bg-white">
          <div className="saved-items flex gap-x-2 group cursor-pointer ">
            <Bookmark size={15} strokeWidth={2.5} />
            <p className="group-hover:underline">Saved items</p>
          </div>
          <div className="saved-items flex gap-x-2 group cursor-pointer">
            <Users size={15} strokeWidth={2.5} />
            <p className="group-hover:underline">Groups</p>
          </div>
          <div className="saved-items flex gap-x-2 group cursor-pointer">
            <Mails size={15} strokeWidth={2.5} />
            <p className="group-hover:underline">Newsletters</p>
          </div>
          <div className="saved-items flex gap-x-2 group cursor-pointer">
            <CalendarDays size={15} strokeWidth={2.5} />
            <p className="group-hover:underline">Events</p>
          </div>
        </div>
      </div>
      <div className="mt-3  rounded-lg lg:flex-2 md:min-w-[500px] lg:max-w-xl space-y-2">
        <div className="post px-2 flex items-center gap-2 border p-2 sm:rounded-lg border-gray-200 bg-white">
          <ProfileImage session={session} styles={"w-13"} />
          <input
            className="border border-gray-300 text-sm rounded-full p-2 focus:outline-none w-full"
            placeholder="Start a Post "
          />
        </div>
        <div className="sm:rounded-lg border border-gray-200 p-2 bg-white">
          <div className="flex items-center gap-2">
            <ProfileImage session={session} styles={'w-12'}/>
            <div className="text-left! -space-y-0.5">
              <h5 className='text-sm font-semibold'>Jhon Doe</h5>
              <h5 className="text-xs line-clamp-1">Professional</h5>
              <h5 className="text-xs font-light">4d</h5>


            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block mt-3 rounded-lg border-gray-200 border p-2 bg-white ">
        <h1>Add the following to your feed</h1>
      </div>
    </div>
  );
}
;
export default Home;