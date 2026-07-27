import Link from "next/link";
import HeroSection from "@/components/herosection";
import { ArrowRight, Bookmark, Globe, Network, Target, Users, Zap } from "lucide-react";
import WhyCard from "@/components/whycard";
import CountUpData from "@/components/countupdata";

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen">
      <HeroSection />
      <div className="px-4 py-20 space-y-9 max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-y-5 text-center">
          <h3 className="text-4xl font-bold lg:text-5xl text-gray-900">
            Join millions of professionals
          </h3>
          <p className="text-xl max-w-2xl text-gray-600">
            Discover why professionals choose our platform to build meaningful
            connections and advance their careers.
          </p>
        </div>
        <div className="flex flex-col sm:grid gap-6 grid-cols-2 lg:grid-cols-4 pt-8">
          <WhyCard
            title="Build Your Network"
            description="Connect with like-minded professionals and industry leaders worldwide."
            icon={<Network className="text-cyan-600 mb-4" size={40} />}
          />
          <WhyCard
            title="Targeted Opportunities"
            description="Discover personalized job opportunities and career advancement paths."
            icon={<Target className="text-cyan-600 mb-4" size={40} />}
          />
          <WhyCard
            title="Instant Insights"
            description="Share your expertise and stay updated with industry trends."
            icon={<Zap className="text-cyan-600 mb-4" size={40} />}
          />
          <WhyCard
            title="Global Reach"
            description="Connect with professionals from companies around the world."
            icon={<Globe className="text-cyan-600 mb-4" size={40} />}
          />
        </div>
      </div>
      <CountUpData />

      <div className="py-24 bg-gray-50 flex flex-col items-center text-center px-4">
        <h2 className="text-4xl font-bold lg:text-5xl max-w-4xl text-gray-900 mb-6">
          Ready to shape your professional story?
        </h2>
        <p className="text-xl max-w-2xl text-gray-600 mb-10">
          Join professionals who are already building their network and
          advancing their careers on our platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href={"/signup"}
            className="flex items-center gap-2 px-8 py-3 bg-cyan-700 text-white font-semibold rounded-full hover:bg-cyan-800 transition shadow-md group"
          >
            Get started today
            <ArrowRight className="group-hover:translate-x-1 transition-all duration-300" size={20} />
          </Link>
          <Link
            href={"/signin"}
            className="px-8 py-3 text-cyan-700 font-semibold hover:bg-cyan-50 rounded-full transition border border-transparent hover:border-cyan-200"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
