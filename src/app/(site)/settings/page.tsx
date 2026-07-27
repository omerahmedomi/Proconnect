import { requireAuth } from "@/lib/auth-middleware";
import SettingsForm from "@/components/settings/settings-form";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";

export default async function SettingsPage() {
  const session = await requireAuth();
  
  await dbConnect();
  // Fetch account to see if user has credential login
  const accountCol = mongoose.connection.db?.collection('account');
  const accounts = accountCol ? await accountCol.find({ userId: session.user.id }).toArray() : [];
  const hasPassword = accounts.some(acc => acc.providerId === 'credential');
  const isOAuthOnly = accounts.length > 0 && !hasPassword;
  
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Settings & Privacy</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <SettingsForm user={session.user} isOAuthOnly={isOAuthOnly} />
        </div>
        <div className="col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Account Overview</h3>
            <p className="text-sm text-gray-600 break-words mb-1">
              <strong>Email:</strong> {session.user.email}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Name:</strong> {session.user.name}
            </p>
            {/* If they have email verified info */}
            {session.user.emailVerified && (
              <p className="text-sm text-green-600 font-medium">Email Verified ✓</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
