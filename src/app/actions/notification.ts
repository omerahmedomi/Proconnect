"use server";
import { requireAuth } from "@/lib/auth-middleware";
import notification from "@/models/notification";
import profile from "@/models/profile";


export async function getNotifications() {
  const user = await requireAuth();

  const myProfile = await profile.findOne({ user: user.user.id });
  if (!myProfile) {
    return [];
  }
  const notifications = await notification
    .find({
      recipient: myProfile._id.toString(),
    })
    .populate("sender", "name profile_picture")
    .populate("post", "content")
    .sort({ createdAt: -1 });

    
  return notifications;
}

export async function markAllAsRead() {

  const user = await requireAuth();

  const myProfile = await profile.findOne({ user: user.user.id });

  if (!myProfile) {
    return;
  }

  await notification.updateMany(
    {
      recipient: myProfile._id,
      read: false,
    },
    {
      $set: { read: true },
    },
  );

}
