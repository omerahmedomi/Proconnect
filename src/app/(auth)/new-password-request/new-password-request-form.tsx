"use client"
import Submit from "@/components/submit";
import { requestPasswordResetPage } from "@/app/actions/auth";
import { useActionState } from "react";

export default function NewPasswordRequestForm() {
    const [state,formAction] = useActionState(requestPasswordResetPage,{
        error:null,
        success:false,
        message:null
    })
  return (
    <form action={formAction} className="space-y-6">
        <p className='success-message'>{state?.sucess && state?.message}</p>
        <p className="error-message">{!state?.sucess && state?.error}</p>
      <input
        type="text"
        name="email"
        className="auth-input"
        placeholder="Email address"
      />
      <Submit text="Send Email" />
    </form>
  );
}
