import { requireAuth } from "@/lib/auth-middleware";
import profile from "@/models/profile";
import dbConnect from "@/lib/mongodb";
import { getConversationsAction } from "@/app/actions/message";
import MessagesClient from "@/components/messages/messages-client";

export default async function MessagesPage() {
  const session = await requireAuth();
  
  await dbConnect();
  const userProfileDoc = await profile.findOne({ user: session.user.id });
  const userProfile = userProfileDoc ? JSON.parse(JSON.stringify(userProfileDoc)) : null;

  if (!userProfile) {
    return <div className="p-8 text-center">Please complete your profile first.</div>;
  }

  const initialConversations = await getConversationsAction(userProfile._id);

  return (
    <div className="max-w-7xl mx-auto md:px-4 w-full" style={{ height: "calc(100vh - 64px)" }}>
      <div className="bg-white md:rounded-xl shadow-sm border border-gray-200 h-full overflow-hidden flex">
        <MessagesClient 
          initialConversations={initialConversations} 
          userProfileId={userProfile._id} 
        />
      </div>
    </div>
  );
}
