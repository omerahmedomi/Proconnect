import PlusIcon from "@/components/icons/addicon";
import EditIcon from "@/components/icons/editicon";
import MayKnowPerson from "@/components/mayknowperson";
import MyCover from "@/components/mycover";
import MyProfile from "@/components/myprofile";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import profile from "@/models/profile";
import { headers } from "next/headers";
import ProfileInfo from "@/components/profileinfo";
import AboutInfo from "@/components/aboutinfo";
import ProfileActivityPost from "@/components/profile-activity-post";
import post from "@/models/post";
import { notFound, redirect } from "next/navigation";
import mongoose from "mongoose";
import SkillsInfo from "@/components/skillsinfo";
import EducationInfo from "@/components/educationinfo";
import ExperienceInfo from "@/components/experienceinfo";
import education from "@/models/education";
import experience from "@/models/experience";

const PersonalProfile = async ({ params }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/");
  const { id: profileID } = await params;
  if (!mongoose.Types.ObjectId.isValid(profileID)) {
    notFound();
  }

  await dbConnect();
  const userProfileDoc = await profile.findById(profileID).populate("school position").lean();
  const userProfile = userProfileDoc
    ? JSON.parse(JSON.stringify(userProfileDoc))
    : null;
  if (!userProfile) notFound();

  const userPosts = await post
    .find({ profile: profileID })
    .sort({ createdAt: -1 })
    .lean();
  const posts = JSON.parse(JSON.stringify(userPosts));

  const userEducationDoc = await education.find({profile:profileID}).lean()
  const userExperienceDoc = await experience.find({profile:profileID}).lean()
  const userEducations = userEducationDoc ? JSON.parse(JSON.stringify(userEducationDoc)) : null;
  const userExperiences = userExperienceDoc ? JSON.parse(JSON.stringify(userExperienceDoc)) : null

  return (
    <div className="flex flex-col md:flex-row  md:gap-x-5 mx-auto w-full max-w-250 md:px-5 text-sm ">
      <div className="w-full">
        <div className="profile-view sm:rounded-lg w-full flex-col flex items-start profile-div">
          <div className="cover-image h-30 self-stretch sm:rounded-lg sm:rounded-t-lg border-gray-200 relative ">
            <MyCover styles={"h-30"} profile={userProfile} showEdit={true} />
          </div>
          <MyProfile profile={userProfile} />
          <ProfileInfo profile={userProfile} education={userEducations} experience={userExperiences} />
        </div>
        <AboutInfo profile={userProfile} />
        <div className="profile-div flex flex-col gap-5 p-6 ">
          <div className="sm:flex sm:justify-between">
            <div className="font-semibold text-lg">
              <h3>Activity</h3>
              <h6 className="text-sm text-cyan-700">799 followers</h6>
            </div>
          </div>
          <div className="flex flex-col leading-tight">
            {posts?.length > 0 ? (
              <div className="flex flex-col gap-4">
                <h6 className="text-sm text-cyan-700">{posts?.length} posts</h6>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3">
                  {posts.map((post) => (
                    <ProfileActivityPost key={post._id} post={post} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col leading-tight">
                <h5 className="font-semibold">You haven’t posted yet.</h5>
                <h6>Posts you share will be displayed here.</h6>
              </div>
            )}
          </div>
        </div>
        <ExperienceInfo />
        <EducationInfo />
        <SkillsInfo />
      </div>
      <div className="self-start profile-div p-6 max-md:mt-0 max-md:w-full md:w-100 ">
        <div className="">
          <h1 className="font-semibold ">People you may know</h1>
        </div>
        <div className="mt-1 flex flex-col gap-y-2 ">
          <MayKnowPerson profile={userProfile} />
          <div className="w-full h-px bg-gray-500"></div>
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile;
