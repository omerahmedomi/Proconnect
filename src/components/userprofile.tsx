import Link from "next/link"
import ProfileImage from "./profileimage"
export default function UserProfile({profile,showViewProfile}){
    return(
        <div className="profile-wrapper w-full flex items-center  gap-2 bg-cyan-50 p-4">
                      <div className="image  rounded-full  border border-cyan-200">
                        {profile?.profile_picture ? (
                          <ProfileImage image={profile.profile_picture} styles={'w-20 h-20'}/>
                        ) : (
                          <h5 className="bg-cyan-500  rounded-full size-20 flex justify-center items-center text-2xl text-white">
                            {" "}
                            {profile.name.firstName[0]+profile.name.lastName[0]}
                          </h5>
                        )}
                      </div>
                      <div className="info-wrapper">
                        <h2 className="font-semibold text-lg">{profile?.name?.firstName +" " + profile?.name.lastName}</h2>
                       <h4 className="text-sm text-gray-500">{profile?.headline}</h4>
                       { showViewProfile && <Link
                          // href={`/profile/${session?.user?.id}`}
                          href={'/'}
                          className="text-semibold text-cyan-600 text-sm hover:text-cyan-700"
                        >
                          View Profile
                        </Link>}
                      </div>
                    </div>
    )
}