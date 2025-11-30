import Link from "next/link"
export default function UserProfile({session}){
    return(
        <div className="profile-wrapper w-full flex items-center  gap-2 bg-cyan-50 p-4">
                      <div className="image bg-white rounded-full p-1 border border-cyan-200">
                        {session?.user?.image ? (
                          <img
                            src={session?.user?.image || `/header-image.png`}
                            className="w-20"
                          ></img>
                        ) : (
                          <h5 className="bg-cyan-500  rounded-full size-20 flex justify-center items-center text-2xl text-white">
                            {" "}
                            {session?.user?.name.split("")[0].toUpperCase() +
                              "" +
                              session?.user?.name
                                ?.split(" ")[1]
                                .split("")[0]
                                .toUpperCase()}
                          </h5>
                        )}
                      </div>
                      <div className="info-wrapper">
                        <h2 className="font-semibold text-lg">{session?.user?.name}</h2>
                        <h4 className="text-sm text-gray-500">Professional</h4>
                        <Link
                          href={`/profile/${session?.user?.id}`}
                          className="text-semibold text-cyan-600 text-sm hover:text-cyan-700"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
    )
}