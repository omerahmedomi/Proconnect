import { requireAuth } from "@/lib/auth-middleware";
import notification from "@/models/notification";
import profile from "@/models/profile";
import { revalidatePath } from "next/cache";

export async function getNotifications() {
  const user = await requireAuth();

  const myProfile = await profile.findOne({ user: user.user.id });
  console.log("From noti serv", myProfile._id.toString());
  const notifications = await notification
    .find({
      recipient: myProfile._id.toString(),
    })
    .populate("sender", "name profile_picture")
    .populate("post", "content")
    .sort({ createdAt: -1 });

    
  return notifications;
}
