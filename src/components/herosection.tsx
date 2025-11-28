import { ArrowRight, Briefcase, MessageSquare, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default function HeroSection(){

    return (
      <section className="hero-container ">
        <div className="space-y-7 flex-1 ">
          <div className="space-y-7">
            <h1 className="text-48-bold">
              Welcome to your professional network
            </h1>
            <h2 className="text-20-gray ">
              Connect with industry leaders, share your expertise, and discover
              opportunities that shape your career journey
            </h2>
          </div>

          <div className="hero-btn-auth-wrapper">
            <Link href={"/signup"} className="group hero-btn-signup">
              <span>Join now - it's free</span>
              <ArrowRight className="inline group-hover:translate-x-1 transition-all duration-300" />
            </Link>
            <Link href={"signin"} className="hero-btn-signin">
              {" "}
              Sign In
            </Link>
          </div>

          <div className="flex gap-x-2 text-sm text-gray-600">
            <p className="flex-2-center">
              <Users size={18} />
              <span>1M+ professionals</span>
            </p>
            <p className="flex-2-center">
              <Briefcase size={18} />
              <span>50K+ companies</span>
            </p>
          </div>
        </div>

        <div className="hero-2-wrapper ">
          <div className="hero-2-card">
            <Users className="bg-cyan-400 rounded-full p-3 text-white" size={50} />
            <div className="hero-card-texts">
              <h3>Professional Network</h3>
              <p>Connect with industry experts</p>
            </div>
          </div>
          <div className="hero-2-card">
            <span className="rounded-full bg-cyan-400 text-white">
              <MessageSquare className="w-full h-full p-3" size={27} />
            </span>

            <div className="hero-card-texts">
              <h3>Share Insights</h3>
              <p>Post update and engage</p>
            </div>
          </div>
          <div className="hero-2-card">
            <TrendingUp className="bg-cyan-400 rounded-full p-3 text-white" size={50} />
            <div className="hero-card-texts">
              <h3>Grow Your Career</h3>
              <p>Discover new opportunities</p>
            </div>
          </div>
        </div>
      </section>
    );
}