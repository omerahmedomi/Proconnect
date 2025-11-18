"use client"
import { resetUserPassword } from "@/app/actions/auth";
import Password from "@/components/password";
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
      <form action={formAction} className="flex flex-col gap-3">
        {state?.message && (
          <p className="text-sm text-green-500">{state?.message}</p>
        )}
        {state?.error && <p className="text-sm text-red-500">{state?.error}</p>}
        <input type='hidden' name='token' value={token || ''}/>
        <Password type="newPassword" defaultValue={state?.values?.newPassword} />
        <Password type="confirmPassword" defaultValue={state?.values?.confirmPassword} />
        <button
          type="submit"
          className="font-semibold text-lg bg-cyan-500 rounded p-2 text-white hover:bg-cyan-600 transition-colors duration-300 cursor-pointer disabled:bg-gray-300 disabled:text-black disabled:hover:bg-gray-300"
          disabled={isPending}
        >
          Reset Password
        </button>
      </form>
    );
}
