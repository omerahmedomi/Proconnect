import { ArrowRight, Briefcase, Users } from "lucide-react";

export default function HeroSection(){

    return (
      <section className="flex bg-linear-to-br from-indigo-50 to-white flex-col gap-y-5 px-4 py-15">
        <div className="space-y-7">
          <div className="space-y-7">
            <h1 className="text-5xl font-bold leading-14">
              Welcome to your professional network
            </h1>
            <p className="text-xl text-gray-500">
              Connect with industry leaders, share your expertise, and discover
              opportunities that shape your career journey
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <button className="group rounded-lg bg-linear-to-r from-blue-300 to-indigo-100 font-semibold py-2 text-lg space-x-1 cursor-pointer hover:from-blue-400 hover:to-indigo-200 transition-colors duration-700">
              <span>Join now - it's free</span>
              <ArrowRight className="inline group-hover:translate-x-1 transition-all duration-300"  />
            </button>
            <button className="border-2 hover:bg-gray-50 transition-colors duration-500 border-cyan-100 rounded-lg bg-white font-semibold py-2 text-lg shadow cursor-pointer">
              {" "}
              Sign In
            </button>
          </div>

          <div className="flex gap-x-2 text-sm text-gray-600">
            <p className="flex gap-x-2 items-center">
              <Users size={18} />
              <span>1M+ professionals</span>
            </p>
            <p className="flex gap-x-2 items-center">
              <Briefcase size={18} />
              <span>50K+ companies</span>
            </p>
          </div>
        </div>
        <div></div>
      </section>
    );
}