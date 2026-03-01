import ConnectionRequestList from "@/components/network/ConnectionRequestList";
import { requireAuth } from "@/lib/auth-middleware";
import profile from "@/models/profile";

export default async function MyNetworkPage() {
  
  const user = await requireAuth()
  const connectionRequestDoc = await profile.findOne({user:user?.user?.id}).populate('connection_requests').lean()
 console.log("Requests",connectionRequestDoc.connection_requests)
  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">My Network</h1>

      <ConnectionRequestList requests={connectionRequestDoc.connection_requests}/>
    </main>
  );
}
