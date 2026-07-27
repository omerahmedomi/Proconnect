import notification from "@/models/notification"


export type notificationType = 'connection_request' | 'connection_accepted' | 'like' | 'comment'

type NotificationInput = {
  type: notificationType;
  recipientId: string;
  senderId?: string;
  postId?: string;
};

export async function sendNotification({
  type,
  recipientId,
  senderId,
  postId,
}: NotificationInput) {
  await notification.create({
    recipient: recipientId, 
    sender: senderId,
    type,
    post: postId,
  });
}

export function getNotificationMessage(notif: any) {
  const name = `${notif.sender?.name?.firstName || ""} ${
    notif.sender?.name?.lastName || ""
  }`.trim();

  switch (notif.type) {
    case "like":
      return `${name} liked your post`;

    case "connection_request":
      return `${name} sent you a connection request`;

    case "connection_accepted":
      return `${name} accepted your connection request`;

    case "comment":
      return `${name} commented on your post`;

    default:
      return "You have a new notification";
  }
}

export function getNotificationLink(notif: any) {
  switch (notif.type) {
    case "like":
    case "comment":
      return `/post/${notif.post?._id}`;

    case "connection_request":
      return "/mynetwork";

    case "connection_accepted":
      return `/profile/${notif.sender?._id}`;

    default:
      return "/";
  }
}

export function formatTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;

  return `${Math.floor(diff / 86400)}d ago`;
}



