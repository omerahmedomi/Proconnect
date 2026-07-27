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
import { pinata } from "@/utils/config";
import { sendNotification } from "@/lib/notificaionhelper";


export type ProfileFormState = {
  success: boolean;
  errors?: ProfileErrors;
  values?: any;
};

export type ProfileErrors = {
  firstName?: string;
  lastName?: string;
  headline?: string;
  industry?: string;
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
  date?:string;
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
  const industry = formData.get("industry") as string | null;
  const selectedEducationId = formData.get("selectedEducationId") 
  const selectedExperienceId = formData.get("selectedExperienceId")
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
  if (!industry) {
    errors.industry = "Industry is required";
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
        industry,
        selectedEducationId,
        selectedExperienceId,
      },
    };
  }
  console.log(selectedEducationId,selectedExperienceId)
  const updatedValue = await profile.findOneAndUpdate(
    { user: user.user.id },
    {
      name: { firstName, lastName },
      location: { city, country },
      headline,
      industry,
      school:selectedEducationId,
      position:selectedExperienceId,
    },
    { new: true },
  );
  redirect(`/profile/${userProfile._id}`);
 
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
  const current = formData.get("current") as boolean | null;
  console.log("Current", current)
  if (!title) {
    errors.title = "Title is required";
  }
  if (!company) {
    errors.company = "Company is required";
  }
  if (!startMonth || !startYear) {
    errors.startDate = "Start date is required";
  }
  if ((!endMonth || !endYear) && !current) {
    errors.endDate = "End date is required";
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
      current:e.current
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

export async function removeProfilePhoto(){
  try {
    const user = await requireAuth();
    const userProfile = await profile.findOne({user:user?.user?.id})
    const picturecid = userProfile?.profile_picture.split("/")[4]
    console.log("picture id",picturecid)
    await profile.updateOne({_id:userProfile._id},{ $unset:{profile_picture:""}})
    revalidatePath('/profile')
      
const {files} = await pinata.files.public.list().cid(picturecid)
const pictureFileId = files[0]?.id;


console.log(files);

    await pinata.files.public.delete([pictureFileId])
  } catch (error) {
    console.log(error)
  }
}

export async function removeCoverPhoto() {
  try {
    const user = await requireAuth();
    const userProfile = await profile.findOne({ user: user?.user?.id });
    const picturecid = userProfile?.cover_picture.split("/")[4];
    console.log("picture id", picturecid);
    await profile.updateOne(
      { _id: userProfile._id },
      { $unset: { cover_picture: "" } },
    );
    revalidatePath("/profile");

    const { files } = await pinata.files.public.list().cid(picturecid);
    const pictureFileId = files[0]?.id;

    console.log(files);

    await pinata.files.public.delete([pictureFileId]);
  } catch (error) {
    console.log(error);
  }
}


export async function requestConnection(id:string){
  try {
    const user = await requireAuth();
    const userProfile = await profile.findOne({ user: user?.user?.id }).select("_id").lean();

    await profile.updateOne({_id:id},{
      $push:{
        connection_requests:{
        from:userProfile._id
        }
      }
    })
    
    await sendNotification({
      type: 'connection_request',
      recipientId: id,
      senderId: userProfile._id.toString()
    });
    
  } catch (error) {
    console.log(error)
  }

  revalidatePath('/')
}


export async function getConnectionStatus(
  myId: string,
  otherId: string
) {
  const me = await profile.findById(myId).select("connections connection_requests").lean();
  const other = await profile.findById(otherId).select("connection_requests").lean();

  if (me?.connections?.some((id: any) => id.toString() === otherId)) {
    return "connected";
  }

  for(const req of me?.connection_requests || []){
    if(req.from?.toString() === otherId && req.status !== 'ignored' )
      return 'received'
  }

  for(const req of other?.connection_requests || []){
    if(req.from?.toString() === myId)
      return 'sent'
  }

  return "none"
}

export async function handleConnectionAction(fromProfileId: string,
  action: "accept" | "ignore"){

  const user = await requireAuth();
  const myProfile = await profile.findOne({user:user.user.id}).select("_id").lean();
  if(!myProfile)
    throw new Error('Profile not found');
   if (action === "accept") {
    // 1️⃣ remove request
    await profile.updateOne(
      { _id: myProfile._id },
      {
        $pull: {
          connection_requests: { from: fromProfileId },
        },
        $addToSet: {
          connections: fromProfileId,
        },
      }
    );

    // 2️⃣ add reverse connection
    await profile.updateOne(
      { _id: fromProfileId },
      {
        $addToSet: {
          connections: myProfile._id,
        },
      }
    );

    await sendNotification({
      type: 'connection_accepted',
      recipientId: fromProfileId,
      senderId: myProfile._id.toString()
    });
  }

  if (action === "ignore") {
    await profile.updateOne(
      {
        _id: myProfile._id,
        "connection_requests.from": fromProfileId,
      },
      {
        $set: {
          "connection_requests.$.status": "ignored",
          "connection_requests.$.ignoredAt": new Date(),
        },
      }
    );
  }

  // refresh my-network page
  revalidatePath("/mynetwork");
}

export async function updateSkills(skills: string[]) {
  const user = await requireAuth();
  // await dbConnect();
  
  await profile.updateOne(
    { user: user.user.id },
    { $set: { skills } }
  );
  
  revalidatePath("/profile/[id]", "page");
  return { success: true };
}

export async function getRecommendations(limit: number = 3) {
  try {
    const user = await requireAuth();
    if (!user) return [];
    
    // Find the current user's profile to get connections and requests
    const myProfile = await profile.findOne({ user: user.user.id })
      .select("_id connections connection_requests")
      .lean();
      
    if (!myProfile) return [];

    // Collect IDs to exclude
    const excludedIds = [myProfile._id];
    
    if (myProfile.connections) {
      excludedIds.push(...myProfile.connections);
    }
    
    if (myProfile.connection_requests) {
      for (const req of myProfile.connection_requests) {
        if (req.from) excludedIds.push(req.from);
      }
    }

    // Also need to find profiles that WE have sent requests to
    // Wait, the requests array only contains incoming requests.
    // Outgoing requests are stored in the *other* user's profile.
    // So if another user has myProfile._id in their connection_requests, we should exclude them.
    // But querying that directly might be slow.
    // For now, we will query random profiles and then filter them out if we sent a request.
    
    // First, find candidates excluding ourselves and our connections
    const candidates = await profile.aggregate([
      { $match: { _id: { $nin: excludedIds } } },
      { $sample: { size: limit * 3 } } // Grab extra to filter out those we sent requests to
    ]);
    
    // Filter out candidates we have already sent a request to
    const finalRecommendations = [];
    for (const candidate of candidates) {
      const hasSentRequest = candidate.connection_requests?.some(
        (req: any) => req.from?.toString() === myProfile._id.toString()
      );
      if (!hasSentRequest) {
        finalRecommendations.push({
          _id: candidate._id.toString(),
          name: candidate.name,
          headline: candidate.headline,
          profile_picture: candidate.profile_picture,
          cover_picture: candidate.cover_picture
        });
      }
      if (finalRecommendations.length >= limit) break;
    }
    
    return finalRecommendations;
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return [];
  }
}
