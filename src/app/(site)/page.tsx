import { headers } from "next/headers";
import Link from "next/link";

import { auth } from "@/lib/auth";

import { signOutAction } from "../actions/auth";
import NavigationBar from "@/components/navbar";
import HeroSection from "@/components/herosection";
import { ArrowRight, Bookmark, Globe, Mails, Network, Target, Users, Zap, CalendarDays } from "lucide-react";
import WhyCard from "@/components/whycard";
import CountUpData from "@/components/countupdata";
import Profile from "@/components/profile";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

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
    <div className="  ">
      <div className="relative max-w-xl rounded  mx-auto">
        <div className="profile-view w-full bg-green-500 h-40 flex-col flex items-start mt-3">
          <div className="cover-image h-14 bg-yellow-400 self-stretch"></div>
          <div className="profile rounded-full  p-0.5 w-17 absolute top-7 left-2 ">
            <img
              src={session?.user?.image || `/empty-profile.jpg`}
              className="w-full rounded-full"
            ></img>
          </div>
          <div className="info text-black mt-10 px-2">
            <h5>{session?.user?.name}</h5>
            <h5 className="text-[13px]">Professional</h5>
            <h5 className="text-xs">Addis Ababa</h5>
          </div>
        </div>
        <div className="links bg-pink-500 mt-3 px-2 text-sm space-y-3">
          <div className="saved-items flex gap-x-2">
            <Bookmark size={20} />
            <p>Saved items</p>
          </div>
          <div className="saved-items flex gap-x-2">
            <Users size={20} />
            <p>Groups</p>
          </div>
          <div className="saved-items flex gap-x-2">
            <Mails size={20} />
            <p>Newsletters</p>
          </div>
          <div className="saved-items flex gap-x-2">
            <CalendarDays size={20} />
            <p>Events</p>
          </div>
        </div>
      </div>
    </div>
  );
}
