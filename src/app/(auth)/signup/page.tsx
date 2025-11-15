import Link from 'next/link'
import { signUpAction } from "../../actions/auth";
import Password from "../../../components/password";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center  justify-center  gap-4 px-18 py-10 w-full max-w-[555px] border mx-4 rounded-lg shadow-2xl border-blue-200">
      <h1 className="text-3xl font-semibold text-center  text-gray-700">
        Create a free account
      </h1>
      <p>
        Already have an account?{" "}
        <Link
          href={"/signin"}
          className="underline underline-offset-5 text-sm  text-blue-600"
        >
          Sign in
        </Link>
      </p>
      <button className="border px-2 py-1 w-full rounded text-lg">
        Sign up with Google
      </button>
      <div className="flex items-center justify-center gap-5 w-full text-gray-400">
        <div className="w-4 h-px bg-gray-200 grow"></div>
        <p>or</p>
        <div className="w-4 h-px bg-gray-200 grow"></div>
      </div>
      <form action={signUpAction} className="flex flex-col gap-5  w-full">
        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          className="auth-input "
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="auth-input"
        />

        <Password type="password" />

        <Password type="confirmPassword" />

        <button type="submit" className="w-full p-3 bg-black rounded text-white font-semibold hover:bg-white hover:text-black cursor-pointer transition-colors border duration-300 active:text-black active:bg-white">
          Sign Up
        </button>
      </form>
    </div>
  );
}
