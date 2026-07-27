import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50/50 space-y-4">
      <Loader2 className="w-12 h-12 text-cyan-600 animate-spin" />
      <p className="text-gray-500 font-medium animate-pulse">Loading ProConnect...</p>
    </div>
  );
}