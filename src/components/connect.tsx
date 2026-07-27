"use client";
import { getConnectionStatus, requestConnection, handleConnectionAction } from "@/app/actions/profile";
import { UserPlus, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Connect({ profileId, userProfileId }: { profileId: string, userProfileId: string }) {
  const [connectionStatus, setConnectionStatus] = useState<string>("loading");

  useEffect(() => {
    if (profileId === userProfileId) {
      setConnectionStatus("self");
      return;
    }
    let isMounted = true;
    getConnectionStatus(userProfileId, profileId).then((status) => {
      if (isMounted) setConnectionStatus(status);
    });
    return () => { isMounted = false; };
  }, [profileId, userProfileId]);

  if (profileId === userProfileId || connectionStatus === "self") return null;

  if (connectionStatus === "loading") {
    return <Loader2 size={14} className="animate-spin text-gray-400" />;
  }

  if (connectionStatus === "sent") {
    return <span className="text-gray-500 text-xs font-medium">Request Sent</span>;
  }

  if (connectionStatus === "connected") {
    return null; // or <span className="text-green-600">Connected</span>
  }

  if (connectionStatus === "received") {
    return (
      <button
        onClick={async () => {
          setConnectionStatus("loading");
          await handleConnectionAction(profileId, "accept");
          setConnectionStatus("connected");
          toast.success("Connection accepted!");
        }}
        className="connect flex items-center text-cyan-600 hover:text-cyan-500 transition-colors duration-300 cursor-pointer gap-1"
      >
        <UserPlus size={14} />
        Accept Request
      </button>
    );
  }

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setConnectionStatus("sent");
    toast.success("Connection request sent!");
    await requestConnection(profileId);
  };

  return (
    <form onSubmit={handleConnect}>
      <button
        className="connect flex items-center text-cyan-600 hover:text-cyan-500 transition-colors duration-300 cursor-pointer gap-1"
        type="submit"
      >
        <UserPlus size={14} />
        Connect
      </button>
    </form>
  );
}
