import Connect from "./connect";
import ProfileImage from "./profileimage";

export default function MayKnowPerson({session}){
    return (
      <div className="flex gap-1  ">
        <ProfileImage session={session} styles="w-15" />
        <div className="text-left  self-end mt-1">
          <h2 className="font-semibold">Jane Smith</h2>
          <h3 className="text-sm">Professional | Developer</h3>
          <div className="rounded-full px-2 border w-fit mt-1">
            <Connect />
          </div>
        </div>
      </div>
    );
}