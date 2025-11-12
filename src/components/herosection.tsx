import { ArrowRight, Briefcase, Users } from "lucide-react";

export default function HeroSection(){

    return (
      <section className="hero-container ">
        <div className="space-y-7 flex-1 ">
          <div className="space-y-7">
            <h1 className="text-48-bold">
              Welcome to your professional network
            </h1>
            <p className="text-20-gray ">
              Connect with industry leaders, share your expertise, and discover
              opportunities that shape your career journey
            </p>
          </div>

          <div className="hero-btn-auth-wrapper">
            <button className="group hero-btn-signup">
              <span>Join now - it's free</span>
              <ArrowRight className="inline group-hover:translate-x-1 transition-all duration-300" />
            </button>
            <button className="hero-btn-signin"> Sign In</button>
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
            <Users className="bg-green-400 rounded-full p-3" size={50} />
            <div className="hero-card-texts">
              <h3>Professional Network</h3>
              <p>Connect with industry experts</p>
            </div>
          </div>
          <div className="hero-2-card">
            <Users className="bg-green-400 rounded-full p-3" size={50} />
            <div className="hero-card-texts">
              <h3>Professional Network</h3>
              <p>Connect with industry experts</p>
            </div>
          </div>
          <div className="hero-2-card">
            <Users className="bg-green-400 rounded-full p-3" size={50} />
            <div className="hero-card-texts">
              <h3>Professional Network</h3>
              <p>Connect with industry experts</p>
            </div>
          </div>
        </div>
      </section>
    );
}