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

const PersonalProfile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  }); 
  await dbConnect();
  const userProfile = await profile
    .findOne({
      user: session?.user?.id,
    })
    .lean();

  console.log("Server",userProfile)
  console.log("SESSION USER ID:", session?.user.id);

  return (
    <div className="flex flex-col md:flex-row md:justify-end md:gap-x-5 mx-auto w-fit md:px-5">
      <div className=" ">
        <div className="profile-view sm:rounded-lg w-full flex-col flex items-start profile-div ">
          <div className="cover-image h-30 self-stretch sm:rounded-lg sm:rounded-t-lg border-gray-200 relative ">
            
            
            <MyCover styles={'h-30'} profile={userProfile} showEdit={true}/>
          </div>
          <MyProfile session={session} profile={userProfile}/>
          <ProfileInfo session={session} profile={userProfile}/>
        </div>
        <div className="profile-div p-6 flex flex-col gap-y-5 ">
          <EditIcon />

          <h5 className="text-lg font-semibold">About</h5>
          <h6>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
            adipisci, autem provident earum molestiae maxime dicta repellat,
            dolore et possimus est eum laboriosam deserunt ducimus mollitia.
            Commodi repellat doloremque deserunt.
          </h6>
        </div>
        <div className="profile-div flex flex-col gap-5 p-6 ">
          <EditIcon />
          <div className="sm:flex sm:justify-between">
            <div className="font-semibold text-lg">
              <h3>Activity</h3>
              <h6 className="text-sm text-cyan-700">799 followers</h6>
            </div>
            <div className="px-2 py-1 border border-cyan-500 text-cyan-500 rounded-full self-start  hover:bg-cyan-50 cursor-pointer transition sm:mr-15 w-fit">
              Create a post
            </div>
          </div>
          <div className="flex flex-col leading-tight">
            <h5 className="font-semibold">You haven’t posted yet.</h5>

            <h6>Posts you share will be displayed here.</h6>
          </div>
        </div>
        <div className="profile-div p-6">
          <div className="flex justify-between">
            {" "}
            <h4 className="font-semibold  text-lg">Experience</h4>
            <div>
              <PlusIcon styles="mr-15" />
              <EditIcon />
            </div>
          </div>
        </div>
        <div className="profile-div p-6">
          <div className="flex justify-between">
            {" "}
            <h4 className="font-semibold  text-lg">Education</h4>
            <div>
              <PlusIcon styles="mr-15" />
              <EditIcon />
            </div>
          </div>
        </div>
        <div className="profile-div p-6">
          <div className="flex justify-between">
            {" "}
            <h4 className="font-semibold  text-lg">Skills</h4>
            <div>
              <PlusIcon styles="mr-15" />
              <EditIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="self-start profile-div p-6 max-md:mt-0 max-md:w-full md:w-100 ">
        <div className="">
          <h1 className="font-semibold ">People you may know</h1>
        </div>
        <div className="mt-1 flex flex-col gap-y-2 ">
          <MayKnowPerson session={session} />
          <div className="w-full h-px bg-gray-500"></div>
          
          
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile;
