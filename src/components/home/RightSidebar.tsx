import { Plus } from "lucide-react";
import { getRecommendations } from "@/app/actions/profile";
import Link from "next/link";
import Connect from "../connect";
import { requireAuth } from "@/lib/auth-middleware";
import profile from "@/models/profile";

export default async function RightSidebar() {
  const recommendations = await getRecommendations(3);
  const user = await requireAuth();
  let userProfileId = "";
  if (user) {
    const myProfileDoc = await profile.findOne({ user: user.user.id }).select("_id").lean();
    if (myProfileDoc) userProfileId = myProfileDoc._id.toString();
  }

  return (
    <div className="hidden lg:block lg:col-span-3 space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-4">Add to your feed</h3>
        
        <div className="space-y-4">
          {recommendations.length > 0 ? recommendations.map((rec) => (
            <div key={rec._id} className="flex gap-3">
              <Link href={`/profile/${rec._id}`} className="shrink-0">
                <img 
                  src={rec.profile_picture || '/empty-profile.jpg'} 
                  className="w-12 h-12 bg-gray-100 rounded-full border border-gray-200 object-cover cursor-pointer" 
                  alt="avatar"
                />
              </Link>
              <div className="flex flex-col justify-center">
                <Link href={`/profile/${rec._id}`} className="hover:underline">
                  <p className="text-sm font-semibold text-gray-900">{rec.name?.firstName} {rec.name?.lastName}</p>
                </Link>
                <p className="text-xs text-gray-500 mb-1 line-clamp-1">{rec.headline}</p>
                <Connect profileId={rec._id} userProfileId={userProfileId} />
              </div>
            </div>
          )) : (
            <div className="text-sm text-gray-500">No new recommendations at this time.</div>
          )}
        </div>
      </div>
    </div>
  );
}
