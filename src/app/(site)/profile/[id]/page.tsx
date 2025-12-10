import PlusIcon from "@/components/icons/addicon";
import EditIcon from "@/components/icons/editicon";
import ProfileImage from "@/components/profileimage";
import { auth } from "@/lib/auth";
import { Edit2 } from "lucide-react";
import { headers } from "next/headers";
const PersonalProfile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="">
      <div className="profile-view sm:rounded-lg w-full flex-col flex items-start profile-div  ">
        <div className="cover-image h-30 self-stretch sm:rounded-lg sm:rounded-t-lg border-gray-200 relative">
          <div className="rounded-full bg-cyan-200 absolute right-3 top-3 hover:bg-cyan-400 transition-colors duration-500 cursor-pointer p-2">
            <Edit2 size={17} />
          </div>
          <EditIcon styles="right-3 top-full mt-2" />
          <img
            src="/sample-cover.jpg"
            alt="cover-image"
            className="w-full h-full object-cover max-w-full sm:rounded-t-lg"
          />
        </div>
        <ProfileImage
          session={session}
          styles={"w-25 absolute top-15 left-6 bg-cyan-50"}
        />
        <div className="info mt-13 text-sm px-6 flex flex-col">
          <h5 className="text-2xl">{session?.user?.name}</h5>
          <h5 className="  ">Professional</h5>
          <h5 className=" text-gray-500">Addis Ababa</h5>
          <div className="companies  text-gray-500 flex items-center gap-1">
            <p>Addis Ababa University</p>
            <div className="rounded-full size-1 bg-gray-500"></div>
            <p className="">Addis Ababa University</p>
          </div>
          <h4 className="text-cyan-600 hover:underline cursor-pointer">
            500 + connections
          </h4>
        </div>
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
          <div className="px-2 py-1 border border-cyan-500 text-cyan-500 rounded-full self-start  hover:bg-cyan-50 cursor-pointer transition sm:mr-10 w-fit">
            Create a post
          </div>
        </div>
        <div className="flex flex-col leading-tight">
          <h5 className="font-semibold">You haven’t posted yet.</h5>

          <h6>Posts you share will be displayed here.</h6>
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile;
