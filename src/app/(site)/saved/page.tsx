import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import "@/models/user";
import post from "@/models/post";
import dbConnect from "@/lib/mongodb";
import profile from "@/models/profile";

import LeftSidebar from "@/components/home/LeftSidebar";
import RightSidebar from "@/components/home/RightSidebar";
import FeedList from "@/components/home/FeedList";
import { redirect } from "next/navigation";

export default async function SavedItems() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  await dbConnect();
  
  if (!session) {
    redirect("/signin");
  }

  const userProfileDoc = await profile
    .findOne({ user: session?.user.id })
    .populate({
      path: "savedPosts",
      strictPopulate: false,
      populate: [
        { path: "profile" },
        { path: "comments.by" }
      ]
    })
    .lean();
    
  if (!userProfileDoc) {
    redirect("/");
  }

  const userProfile = JSON.parse(JSON.stringify(userProfileDoc));
  const savedPosts = userProfile.savedPosts ? userProfile.savedPosts.reverse() : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <LeftSidebar session={session} userProfile={userProfile} />

        <div className="col-span-1 md:col-span-9 lg:col-span-6 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex gap-3 items-start">
             <h2 className="text-xl font-bold text-gray-800">Saved Items</h2>
          </div>

          {savedPosts.length > 0 ? (
            <FeedList initialPosts={savedPosts} userProfile={userProfile} />
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
              No saved items yet.
            </div>
          )}
        </div>

        <RightSidebar />
      </div>
    </div>
  );
}
