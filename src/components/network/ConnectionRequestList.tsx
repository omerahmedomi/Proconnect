"use client";
import { startTransition, useOptimistic } from "react";
import ConnectionRequestCard from "./ConnectionRequestCard";
import EmptyState from "./EmptyState";
import { handleConnectionAction } from "@/app/actions/profile";

const mockRequests = [
  {
    id: "1",
    name: "Abel Tesfaye",
    title: "Frontend Developer",
    avatar: "/avatar-1.png",
  },
  {
    id: "2",
    name: "Sara Bekele",
    title: "UI/UX Designer",
    avatar: "/avatar-2.png",
  },
  {
    id: "1",
    name: "Abel Tesfaye",
    title: "Frontend Developer",
    avatar: "/avatar-1.png",
  },
  {
    id: "2",
    name: "Sara Bekele",
    title: "UI/UX Designer",
    avatar: "/avatar-2.png",
  },
  {
    id: "1",
    name: "Abel Tesfaye",
    title: "Frontend Developer",
    avatar: "/avatar-1.png",
  },
  {
    id: "2",
    name: "Sara Bekele",
    title: "UI/UX Designer",
    avatar: "/avatar-2.png",
  },
];

export default function ConnectionRequestList({ requests }) {
  const [optimisticRequests, removeOptimistic] = useOptimistic(
    requests,
    (current, reqId: string) => 
      current.filter((req) => req._id != reqId)
   
  );
const pendingRequests = optimisticRequests.filter(
  (r) => r.status === "pending"
);
  async function handleAction(userId: string,reqId:string ,action: "accept" | "ignore") {
    console.log(reqId,action)
    console.log('jo')
    removeOptimistic(reqId)
    try {
    await handleConnectionAction(userId, action);
  } catch (err) {
    console.error(err);
    // optional: rollback logic later
  }
  }
  if (pendingRequests?.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {pendingRequests?.map((req) => (
        <ConnectionRequestCard
          key={req._id}
          req={req}
          onAction={handleAction}
        />
      ))}
    </section>
  );
}
