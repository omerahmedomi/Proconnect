export default function EmptyState() {
  return (
    <div className="border rounded-xl border-gray-200 shadow-md p-10 text-center text-gray-500">
      <p className="text-lg font-medium">No connection requests</p>
      <p className="text-sm mt-1">
        When someone sends you a request, it will appear here.
      </p>
    </div>
  );
}
