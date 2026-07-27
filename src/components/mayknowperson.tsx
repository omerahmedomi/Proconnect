import Connect from "./connect";
import ProfileImage from "./profileimage";
import Link from "next/link";

export default function MayKnowPerson({ profiles, userProfileId }: { profiles: any[], userProfileId: string }) {
  if (!profiles || profiles.length === 0) {
    return <div className="text-sm text-gray-500 py-4 text-center">No recommendations right now.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {profiles.map((profile) => (
        <div key={profile._id} className="grid grid-cols-[repeat(2,auto)] gap-x-3 justify-start items-center">
          <Link href={`/profile/${profile._id}`} className="row-span-2">
            <ProfileImage image={profile?.profile_picture} styles="w-12 h-12 border border-gray-200" />
          </Link>
          <div className="text-left mt-1">
            <Link href={`/profile/${profile._id}`} className="hover:underline">
              <h2 className="font-semibold text-gray-900 text-sm">
                {profile?.name.firstName + " " + profile?.name?.lastName}
              </h2>
            </Link>
            <h3 className="text-xs text-gray-500 line-clamp-1">{profile?.headline}</h3>
          </div>
          <div className="mt-1">
            <Connect profileId={profile?._id} userProfileId={userProfileId} />
          </div>
        </div>
      ))}
    </div>
  );
}