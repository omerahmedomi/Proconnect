import Link from "next/link";
import {
  signInAction,
  signInGoogleAction,
  signUpAction,
} from "@/app/actions/auth";
import Password from "./password";
import Submit from "./submit";
import AuthForm from "./authform";
import GoogleIcon from "./icons/google";

export default function AuthComponent({ type }: { type: string }) {
  return (
    <div className="flex flex-col items-center  justify-center  gap-4 px-22  py-10 w-full max-w-[555px] border mx-4 rounded-lg shadow-2xl border-blue-200">
      <h1 className="text-3xl font-semibold text-center  text-gray-700">
        {type == "signup" ? "Create a free account" : "Sign in to your account"}
      </h1>
      <p>
        {type == "signup"
          ? "Already have an account?"
          : `Don't have an account`}
        <Link
          href={`${type == "signup" ? "/signin" : "/signup"}`}
          className="auth-link"
        >
          {type == "signup" ? "Sign In" : "Sign Up"}
        </Link>
      </p>
      <form action={signInGoogleAction} className="w-full">
        <button className="border border-0.5 px-2 py-1 w-full rounded text-lg flex items-center gap-3 justify-center hover:bg-gray-50 transiton duration-200  cursor-pointer">
          <GoogleIcon/>
          Sign {type.slice(-2)} with Google
        </button>
      </form>
      <div className="flex items-center justify-center gap-5 w-full text-gray-400">
        <div className="w-4 h-px bg-gray-200 grow"></div>
        <p>or</p>
        <div className="w-4 h-px bg-gray-200 grow"></div>
      </div>
      <AuthForm type={type} />
    </div>
  );
}
