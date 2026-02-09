"use server";

import { auth } from "@/lib/auth";
import { requireAuth } from "@/lib/auth-middleware";
import education from "@/models/education";
import profile from "@/models/profile";
import { formatDate } from "date-fns";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import experience from "@/models/experience";
import { error } from "console";

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
export type EducationState = {
  success: boolean;
  errors?: EducationErrors;
  values?: any;
};

export type EducationErrors = {
  school?: string;
  date?: string;
};

export type ExperienceState = {
  success: boolean;
  errors?: ExperienceErrors;
  values?: any;
};

export type ExperienceErrors = {
  title?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
};

export async function saveProfile(
  prevState: ProfileFormState,
  formData: FormData,
) {
  const user = await requireAuth();
  const userProfile = await profile.findOne({ user: user.user.id });

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
    errors.lastName = "Last Name is required";
  }
  if (!headline) {
    errors.headline = "Headline is required";
  }
  if (!city) {
    errors.city = "City is required";
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
    { user: user.user.id },
    {
      name: { firstName, lastName },
      location: { city, country },
      headline,
    },
    { new: true },
  );
  redirect(`/profile/${userProfile._id}`);
  // return {
  //   success: true,
  //   errors: {},
  //   values: {
  //     firstName,
  //   },
  // };
}

export async function updateAbout(formData: FormData) {
  const user = await requireAuth();
  const userProfile = await profile.findOne({ user: user.user.id });

  const about = formData.get("about");

  await profile.findOneAndUpdate({ user: user.user.id }, { about });

  redirect(`/profile/${userProfile._id}`);
}

export async function addEducation(
  prevState: EducationState,
  formData: FormData,
) {
  console.log(formData);
  const educationId = formData.get("educationId");
  const user = await requireAuth();
  const educationData = Object.fromEntries(formData.entries());
  const userProfile = await profile.findOne({ user: user.user.id });
  const errors: EducationErrors = {};
  const school = formData.get("school");
  const startMonth = formData.get("startMonth");
  const endMonth = formData.get("endMonth");
  const startYear = formData.get("startYear");
  const endYear = formData.get("endYear");
  if (!school) {
    errors.school = "School is required";
  }
  if (startYear && endYear && Number(startYear) > Number(endYear)) {
    errors.date = "Start Date can't be greater than End Date";
  }
  if (
    startYear &&
    endYear &&
    startMonth &&
    endMonth &&
    startYear == endYear &&
    startMonth > endMonth
  ) {
    errors.date = "Start Date can't be greater than End Date";
  }
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      values: { ...educationData },
    };
  }

  if (educationId)
    await education.findByIdAndUpdate(educationId, educationData);
  else await education.create({ profile: userProfile.id, ...educationData });
  redirect(`/profile/${userProfile.id}`);
}

export const fetchEducation = async () => {
  try {
    const user = await requireAuth();
    console.log("From edu", user);
    const userProfile = await profile.findOne({ user: user?.user?.id });
    console.log(userProfile.id);
    const data = await education.find({ profile: userProfile?.id }).lean();
    console.log(data);
    return data.map((e) => ({
      id: e._id.toString(),
      school: e.school,
      degree: e.degree,
      field: e.field,
      description: e.description,
      startMonth: e.startMonth,
      startYear: e.startYear,
      endMonth: e.endMonth,
      endYear: e.endYear,
    }));
  } catch (error) {
    console.log(error);
  }
};

export async function deleteEducation(id: string) {
  try {
    console.log("ID from ", id);
    const user = await requireAuth();
    await education.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
}

export async function addExperience(
  prevState: ExperienceState,
  formData: FormData,
) {
  console.log(formData);
  const experienceId = formData.get("experienceId");
  const user = await requireAuth();
  const experienceData = Object.fromEntries(formData.entries());
  const userProfile = await profile.findOne({ user: user.user.id });
  const errors: ExperienceErrors = {};
  const title = formData.get("title");
  const startYear = formData.get("startYear");
  const endYear = formData.get("endYear");
  const startMonth = formData.get("startMonth");
  const endMonth = formData.get("endMonth");
  const company = formData.get("company");
  if (!title) {
    errors.title = "Title is required";
  }
  if (!company) {
    errors.company = "Company is required";
  }
  if (!startMonth || !startYear) {
    errors.startDate = "Start date is required";
  }
  if (!endMonth || !endYear) {
    errors.endDate = "End date is required";
  }
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      values: { ...experienceData },
    };
  }

  if (experienceId)
    await experience.findByIdAndUpdate(experienceId, experienceData);
  else await experience.create({ profile: userProfile.id, ...experienceData });
  redirect(`/profile/${userProfile.id}`);
}

export const fetchExperience = async () => {
  try {
    const user = await requireAuth();
    console.log("From exp", user);
    const userProfile = await profile.findOne({ user: user?.user?.id });
    console.log(userProfile.id);
    const data = await experience.find({ profile: userProfile?.id }).lean();
    console.log(data);
    return data.map((e) => ({
      id: e._id.toString(),
      title: e.title,
      type: e.type,
      location: e.location,
      company: e.company,
      locationType: e.locationType,
      description: e.description,
      startMonth: e.startMonth,
      startYear: e.startYear,
      endMonth: e.endMonth,
      endYear: e.endYear,
    }));
  } catch (error) {
    console.log(error);
  }
};

export async function deleteExperience(id: string) {
  try {
    console.log("ID from ", id);
    const user = await requireAuth();
    await experience.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
}