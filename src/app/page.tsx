import { headers } from "next/headers";
import Link from "next/link";

import { auth } from "@/lib/auth";

import { signOutAction } from "./actions/auth";
import NavigationBar from "@/components/navbar";
import HeroSection from "@/components/herosection";
import { Globe, Network, Target, Zap } from "lucide-react";
import WhyCard from "@/components/whycard";
import CountUpData from "@/components/countupdata";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <>
        <NavigationBar />
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
              icon={<Target className="why-logo"  size={50} />}
            />
            <WhyCard
              title="Instand Insights"
              description="Share your expertise and stay updated with industry trends"
              icon={<Zap className="why-logo" size={50}/>}
            />
            <WhyCard
              title="Global Reach"
              description="Connect with professionals from companies around the world"
              icon={<Globe className="why-logo" size={50}/>}
            />
          </div>
        </div>
        <CountUpData/>
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <h1 className="text-4xl font-bold">Cosden Solutions</h1>
          <div className="flex gap-4 mt-8">
            <button>
              <Link href="/signup">Sign Up</Link>
            </button>
            <button>
              <Link href="/signin">Sign In</Link>
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold">Cosden Solutions</h1>
      <div className="mt-8 text-center">
        <p className="text-lg mb-4">
          User ID: {session.user.id} {session.user.name}
        </p>

        <form action={signOutAction}>
          <button type="submit">Logout</button>
        </form>
      </div>
    </div>
  );
}
