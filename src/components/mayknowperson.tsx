import Connect from "./connect";
import ProfileImage from "./profileimage";

export default function MayKnowPerson({profile}){
    return (
      <div className="grid grid-cols-[repeat(2,auto)] gap-x-2 justify-start">
        <span className="row-span-2">
          <ProfileImage image={profile?.cover_picture} styles="w-15 h-15 border-[0.5px] border-gray-700" />
        </span>
        <div className="text-left mt-1">
          <h2 className="font-semibold">
            {profile?.name.firstName + " " + profile?.name?.lastName}
          </h2>
          <h3 className="text-sm">{profile?.headline}</h3>
        </div>
        <div className="rounded-full px-2 border w-fit mt-1">
          <Connect />
        </div>
      </div>
    );
}