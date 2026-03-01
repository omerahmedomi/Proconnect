import { getConnectionStatus, requestConnection } from "@/app/actions/profile";
import { UserPlus } from "lucide-react";

export default async function Connect({ profileId,userProfileId }) {
  const connectionStatus = await getConnectionStatus(userProfileId,profileId) 
 if (
   profileId === userProfileId 
  //  connectionStatus === "sent" ||
  //  connectionStatus === "received"
 )
   return null;

 if (connectionStatus === "connected") {
   return <span className="text-green-600">Connected</span>;
 }

 if (connectionStatus === "sent") {
   return <span className="text-gray-500">Sent</span>;
 }
if (connectionStatus === "received") {
   return <span className="text-gray-500">Received</span>;
 }
  return (
  
    <form
      action={requestConnection.bind(null,profileId)}
    >
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
