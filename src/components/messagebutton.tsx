"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, Loader2 } from "lucide-react";
import { getOrCreateConversationAction } from "@/app/actions/message";

export default function MessageButton({ 
  userProfileId, 
  targetProfileId 
}: { 
  userProfileId: string; 
  targetProfileId: string; 
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleMessage = async () => {
    setIsLoading(true);
    await getOrCreateConversationAction(userProfileId, targetProfileId);
    router.push("/messages");
  };

  return (
    <button
      onClick={handleMessage}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-600 text-cyan-600 font-semibold text-sm hover:bg-cyan-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      {isLoading ? <Loader2 size={16} className="animate-spin" /> : <MessageSquare size={16} />}
      Message
    </button>
  );
}
