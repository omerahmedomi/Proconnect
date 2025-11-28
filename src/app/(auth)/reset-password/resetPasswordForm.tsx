"use client"
import { resetUserPassword } from "@/app/actions/auth";
import Password from "@/components/password";
import Submit from "@/components/submit";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

    const [state,formAction,isPending]= useActionState(resetUserPassword,{
        error:null,
        success:false
    })
    return (
      <form action={formAction} className="flex flex-col gap-3 sm:min-w-xs">
       {!state?.sucess && state?.error && <p className="error-message">{state?.error}</p>}
        <input type="hidden" name="token" value={token || ""} />
        <Password
          type="newPassword"
          defaultValue={state?.values?.newPassword}
        />
        <Password
          type="confirmPassword"
          defaultValue={state?.values?.confirmPassword}
        />
        <Submit text="Reset Password" />
      </form>
    );
}
