import Link from "next/link"
import ProfileImage from "./profileimage"
export default function UserProfile({profile,showViewProfile}: { profile: any; showViewProfile: boolean }){
    return(
        <div className="profile-wrapper w-full flex items-center  gap-2 bg-cyan-50 p-4">
                      <div className="image  rounded-full  border border-cyan-200">
                        <ProfileImage image={profile?.profile_picture} styles={'w-20 h-20 '}/>
                      </div>
                      <div className="info-wrapper">
                        <h2 className="font-semibold text-lg">{profile?.name?.firstName +" " + profile?.name.lastName}</h2>
                       <h4 className="text-sm text-gray-500">{profile?.headline}</h4>
                       { showViewProfile && <Link
                          // href={`/profile/${session?.user?.id}`}
                          href={`/profile/${profile?._id}`}
                          className="text-semibold text-cyan-600 text-sm hover:text-cyan-700"
                        >
                          View Profile
                        </Link>}
                      </div>
                    </div>
    )
}