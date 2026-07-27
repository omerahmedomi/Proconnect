import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import "@/models/user";
import post from "@/models/post";
import dbConnect from "@/lib/mongodb";
import profile from "@/models/profile";

import LandingPage from "@/components/home/LandingPage";
import DashboardFeed from "@/components/home/DashboardFeed";

async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  await dbConnect();
  
  if (!session) {
    return <LandingPage />;
  }

  const userProfileDoc = await profile
    .findOne({ user: session?.user.id })
    .lean();
  const userProfile = JSON.parse(JSON.stringify(userProfileDoc));

  const userPost = JSON.parse(JSON.stringify(await post.find().populate("profile").populate("comments.by").sort({ createdAt: -1 }).limit(10).lean()));
  
  return <DashboardFeed session={session} userProfile={userProfile} userPost={userPost} />;
}
export default Home;
