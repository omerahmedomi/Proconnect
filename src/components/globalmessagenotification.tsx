"use client";

import { useEffect } from "react";
import { getPusherClient } from "@/lib/pusher-client";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { MessageSquare } from "lucide-react";

export default function GlobalMessageNotification({ userProfileId }: { userProfileId: string }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!userProfileId) return;

    const pusher = getPusherClient();
    const channelName = `user-${userProfileId}`;
    const channel = pusher.subscribe(channelName);

    channel.bind("new-message-notification", (message: any) => {
      // Don't show toast if they are already on the messages page
      if (pathname === "/messages") return;

      const senderName = message.sender?.name?.firstName 
        ? `${message.sender.name.firstName} ${message.sender.name.lastName}`
        : "Someone";

      toast(
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/messages")}>
          <div className="bg-cyan-100 p-2 rounded-full text-cyan-600">
            <MessageSquare size={16} />
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900">{senderName} sent you a message</p>
            <p className="text-xs text-gray-500 truncate max-w-[200px]">{message.text}</p>
          </div>
        </div>,
        {
          duration: 4000,
          position: "bottom-right",
          style: { padding: '12px' }
        }
      );
    });

    return () => {
      pusher.unsubscribe(channelName);
    };
  }, [userProfileId, pathname, router]);

  return null;
}
