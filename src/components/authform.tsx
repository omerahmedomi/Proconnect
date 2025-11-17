"use client";
import { signInAction, signUpAction } from "@/app/actions/auth";
import Password from "./password";
import Link from "next/link";
import Submit from "./submit";
import { useActionState } from "react";
export default function AuthForm({ type }) {
  const [state, formAction, isPending] = useActionState(
    type === "signup" ? signUpAction : signInAction,
    {
      error: null,
      success: false,
    }
  );

  return (
    <>
      {state?.error && <p className="text-red-500 text-sm">{state?.error}</p>}
      {state?.message && <p className="text-green-500 text-sm">{state?.message}</p>}

      <form action={formAction} className="flex flex-col gap-5  w-full">
        {type === "signup" && (
          <input
            type="text"
            name="name"
            required
            placeholder="Your Full Name"
            className="auth-input"
            defaultValue={state?.values?.name}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="auth-input"
          defaultValue={state?.values?.email}
        />

        <Password type="password" defaultValue={state?.values?.password} />
        {type == "signin" && (
          <Link href="/" className="auth-link self-end">
            Forgot password?
          </Link>
        )}

        {type === "signup" && (
          <Password
            type="confirmPassword"
            defaultValue={state?.values?.confirmPassword}
          />
        )}

        <Submit type={type} />
      </form>
    </>
  );
}
