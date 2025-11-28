"use client";
import { requestPasswordResetPage, signInAction, signUpAction } from "@/app/actions/auth";
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
      {state?.sucess && state?.message && (
        <p className="success-message">{state?.message}</p>
      )}
     { !state?.sucess && state?.error &&
      <p className="error-message">{state?.error}</p>}
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
          <Link
            href="/new-password-request"
            type="button"
            className="auth-link self-end cursor-pointer"
          >
            Forgot password?
          </Link>
        )}

        {type === "signup" && (
          <Password
            type="confirmPassword"
            defaultValue={state?.values?.confirmPassword}
          />
        )}

        <Submit text={type == "signin" ? "SIGN IN" : "SIGN UP"} />
      </form>
    </>
  );
}
