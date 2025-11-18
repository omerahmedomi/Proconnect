"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { APIError } from "better-auth";
import { NextResponse } from "next/server";

export const signUpAction = async (prevState: any, formData: FormData) => {
  const email = formData.get("email") as string;

  const password = formData.get("password") as string;

  const name = formData.get("name") as string;

  const confirmPassword = formData.get("confirmPassword") as string;

  try {
    if (confirmPassword !== password) {
      throw new Error("Passwords do not match");
    }
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        callbackURL: "/",
      },
    });
    return {
      sucess: true,
      message:
        "A verification link has been sent to your specified email. Please go to your email and continue from the link.",
    };
  } catch (error) {
    // if (error instanceof APIError) {

    return {
      error: error.message,
      values: {
        name,
        email,
        password,
        confirmPassword,
      },

      // };
    };
  }
  // redirect("/");
};

export const signInAction = async (prevState: any, formData: FormData) => {
  const email = formData.get("email") as string;

  const password = formData.get("password") as string;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: "/",
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      return {
        error:
          error.message == "Email not verified"
            ? error.message + ". Check your email for a verification link."
            : error.message,
        values: {
          email,
          password,
        },
      };
    }
  }
  redirect("/");
};

export const signOutAction = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/");
};

export const signInGoogleAction = async () => {
  const { url } = await auth.api.signInSocial({
    body: {
      provider: "google",
      callbackURL: "/",
    },
  });
  if (url) redirect(url);
};

export const requestPasswordResetPage = async (email: string) => {
  console.log("hi");
  try {
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: process.env.BASE_URL + "/reset-password",
      },
    });

    return {
      message: "Password reset link has been sent to your email.",
    };
  } catch (error) {
    return {
      sucess: false,
      error: error.message,
    };
  }
};

export const resetUserPassword = async (prevState:any,formData: FormData) => {
  

  const newPassword = formData.get("newPassword") as string

  const confirmPassword = formData.get("confirmPassword") as string;

    const token = formData.get("token") as string;

  try {
    if (newPassword != confirmPassword) {
      throw new Error(`Passwords don't match`);
    }

    if (!token) {
      throw new Error("Something went wrong");
    }

    await auth.api.resetPassword({
      body: {
        newPassword,
        token,
      },
    });
     redirect("/signin");
    return {
      success:true,
      message:"Your password has been successfully reset"
    }
  } catch (error) {
    return{
      error:error.message,
      values:{
        newPassword,
        confirmPassword
      }
    }
  }
 
 
};
