"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { APIError } from "better-auth";

export const signUpAction = async (prevState:any,formData: FormData) => {
  const email = formData.get("email") as string;

  const password = formData.get("password") as string;

  const name = formData.get("name") as string;
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        callbackURL:'/'
      },
    });
    redirect('/')
  } catch (error) {
    if(error instanceof APIError){

      return {
        // ...prevState,
        error: error.message,
        success: false,
      };
    }
    
  }
};

export const signInAction = async (prevState:any,formData: FormData) => {

  
  const email = formData.get("email") as string;

  const password = formData.get("password") as string;

 try {
   await auth.api.signInEmail({
     body: {
       email,
       password,
       callbackURL:'/'
      
     },
   });
 } catch (error) {
  if(error instanceof APIError){
    return {
      // ...prevState,
      error: error.message,
      success: false,
    };
  }
 }
  redirect("/");
};

export const signOutAction =async()=>{
   await auth.api.signOut({
    headers: await headers()
    
   })

   redirect('/')
}
