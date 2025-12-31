"use server";

import { auth } from "@/lib/auth";
import profile from "@/models/profile";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type ProfileFormState = {
  success: boolean;
  errors?: ProfileErrors;
  values?: any;
};

export type ProfileErrors = {
  firstName?: string;
  lastName?: string;
  headline?: string;
  city?: string;
  country?: string;
};

export async function saveProfile(
  prevState: ProfileFormState,
  formData: FormData
){
  const session = await auth.api.getSession({
    headers: await headers()
  })
   if (!session?.user?.id) throw new Error("Not authenticated");

  const firstName = formData.get("firstName") as string | null;
  const lastName = formData.get("lastName") as string | null;
  const headline = formData.get("headline") as string | null;
  const city = formData.get("city") as string | null;
  const country = formData.get("country") as string | null;
  const errors: ProfileErrors = {};

  if (!firstName) {
    errors.firstName = "First Name is required";
  }
  if (!lastName) {
    errors.lastName= "Last Name is required";
  }
  if (!headline) {
    errors.headline = "Headline is required";
  }
  if (!city) {
    errors.city= "City is required";
  }
  if (!country) {
    errors.country = "Country is required";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      values: {
        firstName,
        lastName,
        city,
        country,
        headline,
      },
    };
  }

  const updatedValue = await profile.findOneAndUpdate(
    { user: session.user.id },
    {
      name: { firstName, lastName },
      location: { city, country },
      headline,
    },
    { new: true }
  );
  redirect(`/profile/${session.user.id}`);
  // return {
  //   success: true,
  //   errors: {},
  //   values: {
  //     firstName,
  //   },
  // };
}
