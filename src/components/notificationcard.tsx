import { formatTime, getNotificationLink, getNotificationMessage } from "@/lib/notificaionhelper";
import Link from "next/link";

export default function NotificationCard({ notif }) {
  const sender = notif.sender;

  const message = getNotificationMessage(notif);

  return (
    <Link
      href={getNotificationLink(notif)}
      className={`flex items-start gap-3 p-4 rounded-lg border border-gray-300 transition hover:bg-gray-50 ${
        !notif.read ? "bg-blue-50 border-blue-100" : "bg-white"
      }`}
    >
      {/* Avatar */}
      <img
        src={sender?.profile_picture || "./empty-profile.jpg"}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover"
      />

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm text-gray-800">{message}</p>

        <span className="text-xs text-gray-500 mt-1 block">
          {formatTime(notif.createdAt)}
        </span>
      </div>
    </Link>
  );
}