import Link from 'next/link'
import { signInAction, signUpAction } from '@/app/actions/auth';
import Password from './password';

export default function AuthComponent({type}){
    return (
      <div className="flex flex-col items-center  justify-center  gap-4 px-18 py-10 w-full max-w-[555px] border mx-4 rounded-lg shadow-2xl border-blue-200">
        <h1 className="text-3xl font-semibold text-center  text-gray-700">
          {type == "signup"
            ? "Create a free account"
            : "Sign in to your account"}
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
        <button className="border px-2 py-1 w-full rounded text-lg">
          Sign {type.slice(-2)} with Google
        </button>
        <div className="flex items-center justify-center gap-5 w-full text-gray-400">
          <div className="w-4 h-px bg-gray-200 grow"></div>
          <p>or</p>
          <div className="w-4 h-px bg-gray-200 grow"></div>
        </div>
        <form
          action={type === "signup" ? signUpAction : signInAction}
          className="flex flex-col gap-5  w-full"
        >
          {type === "signup" && (
            <input
              type="text"
              name="name"
              required
              placeholder="Your Full Name"
              className="auth-input"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="auth-input"
          />

          <Password type="password" />
          {type == "signin" && (
            <Link href="/" className="auth-link self-end">
              Forgot password?
            </Link>
          )}

          {type === "signup" && <Password type="confirmPassword" />}

          <button
            type="submit"
            className="w-full p-3 bg-black rounded text-white font-semibold hover:bg-white hover:text-black cursor-pointer transition-colors border duration-300 active:text-black active:bg-white"
          >
            SIGN {type.slice(-2).toUpperCase()}
          </button>
        </form>
      </div>
    );
}