import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import profile from "@/models/profile";
import postModel from "@/models/post";

import LeftSidebar from "@/components/home/LeftSidebar";
import RightSidebar from "@/components/home/RightSidebar";
import Post from "@/components/post";
import { redirect } from "next/navigation";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  await dbConnect();
  
  if (!session) {
    redirect("/signin");
  }

  const userProfileDoc = await profile
    .findOne({ user: session?.user.id })
    .lean();
    
  if (!userProfileDoc) {
    redirect("/");
  }

  const userProfile = JSON.parse(JSON.stringify(userProfileDoc));

  const postDoc = await postModel
    .findById(id)
    .populate("profile")
    .populate("comments.by")
    .lean();

  if (!postDoc) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <LeftSidebar session={session} userProfile={userProfile} />
          <div className="col-span-1 md:col-span-9 lg:col-span-6 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
              Post not found.
            </div>
          </div>
          <RightSidebar />
        </div>
      </div>
    );
  }

  const singlePost = JSON.parse(JSON.stringify(postDoc));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <LeftSidebar session={session} userProfile={userProfile} />

        <div className="col-span-1 md:col-span-9 lg:col-span-6 space-y-4">
          <Post post={singlePost} userProfile={userProfile} />
        </div>

        <RightSidebar />
      </div>
    </div>
  );
}
