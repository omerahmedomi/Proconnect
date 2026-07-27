import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import profile from "@/models/profile";
import LeftSidebar from "@/components/home/LeftSidebar";
import RightSidebar from "@/components/home/RightSidebar";
import Link from "next/link";
import ProfileImage from "@/components/profileimage";
import { redirect } from "next/navigation";
import Connect from "@/components/connect";

export default async function ConnectionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  await dbConnect();
  
  if (!session) {
    redirect("/signin");
  }

  // Get current user's profile for sidebar rendering
  const myProfileDoc = await profile.findOne({ user: session?.user.id }).lean();
  const myProfile = JSON.parse(JSON.stringify(myProfileDoc));

  // Get the target profile and populate their connections
  const targetProfileDoc = await profile
    .findById(id)
    .populate("connections")
    .lean();
    
  if (!targetProfileDoc) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
        <div className="text-center mt-20 text-gray-500">Profile not found.</div>
      </div>
    );
  }

  const targetProfile = JSON.parse(JSON.stringify(targetProfileDoc));
  const connections = targetProfile.connections || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <LeftSidebar session={session} userProfile={myProfile} />

        <div className="col-span-1 md:col-span-9 lg:col-span-6 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {targetProfile.name?.firstName}'s Connections
            </h2>
            <div className="text-sm text-gray-500 mb-4">
              {connections.length} {connections.length === 1 ? 'connection' : 'connections'}
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {connections.length > 0 ? (
                connections.map((conn: any) => (
                  <div key={conn._id} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition">
                    <Link href={`/profile/${conn._id}`}>
                      <ProfileImage 
                        styles="w-12 h-12 mr-3 cursor-pointer"
                        image={conn.profile_picture}
                      />
                    </Link>
                    <div className="flex-1">
                      <Link href={`/profile/${conn._id}`} className="hover:underline">
                        <h4 className="font-semibold text-gray-900">
                          {conn.name?.firstName} {conn.name?.lastName}
                        </h4>
                      </Link>
                      <p className="text-xs text-gray-500 line-clamp-1">{conn.headline}</p>
                    </div>
                    <div>
                      <Connect profileId={conn._id.toString()} userProfileId={myProfile._id.toString()} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No connections found.
                </div>
              )}
            </div>
          </div>
        </div>

        <RightSidebar />
      </div>
    </div>
  );
}
