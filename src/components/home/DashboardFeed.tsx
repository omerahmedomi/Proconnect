import PostInput from "@/components/postinput";
import FeedList from "./FeedList";
import ProfileImage from "@/components/profileimage";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

export default function DashboardFeed({ session, userProfile, userPost }: { session: any, userProfile: any, userPost: any[] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <LeftSidebar session={session} userProfile={userProfile} />

        <div className="col-span-1 md:col-span-9 lg:col-span-6 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex gap-3 items-start">
            <ProfileImage
              styles="w-12 h-12 shrink-0 border border-gray-100"
              image={userProfile?.profile_picture}
            />
            <div className="flex-1">
              <PostInput />
            </div>
          </div>

          <FeedList initialPosts={userPost} userProfile={userProfile} />
        </div>

        <RightSidebar />
      </div>
    </div>
  );
}
