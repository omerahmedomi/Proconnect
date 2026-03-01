import ConnectionRequestCard from "./ConnectionRequestCard";
import EmptyState from "./EmptyState";

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


export default function ConnectionRequestList({requests}) {
  if (requests?.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {requests.map((user) => (
        <ConnectionRequestCard key={user._id} user={user} />
      ))}
    </section>
  );
}
