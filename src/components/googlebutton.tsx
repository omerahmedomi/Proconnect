"use client"
import { authClient } from "@/lib/auth-clients";

export default function GoogleButton(){

    return (
      <button className="border px-2 py-1 w-full rounded text-lg" onClick={async()=>{
       const result =await authClient.signIn.social({
            provider:"google",
            callbackURL:'/dashboard'
        })
        
       
        
      }}>
        Sign In with Google
      </button>
    );
}