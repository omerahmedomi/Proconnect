import { getNotifications } from "@/app/actions/notification";
import NotificationCard from "@/components/notificationcard";
import { markAllAsRead } from "@/lib/notificaionhelper";
import Link from "next/link";

export default async function NotificationsPage() {

  await markAllAsRead();

  const notifications = await getNotifications();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
  

      {/* Empty state */}
      {notifications.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          <p className="text-lg font-medium">No notifications yet</p>
          <p className="text-sm mt-2">
            When something happens, you’ll see it here
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {notifications.map((notif) => (
            <NotificationCard key={notif._id} notif={notif} />
          ))}
        </div>
      )}
    </div>
  );
}
