"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-clients";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import Password from "../password";
import { LogIn } from "lucide-react";

export default function SettingsForm({ user, isOAuthOnly }: { user: any, isOAuthOnly?: boolean }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isLoggingOutAll, setIsLoggingOutAll] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Custom Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    isDanger: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    isDanger: false,
    onConfirm: () => {},
  });
  
  const router = useRouter();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password must match");
      return;
    }
    
    setIsUpdatingPassword(true);
    const { error } = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: true
    });

    setIsUpdatingPassword(false);
    if (error) {
      toast.error(error.message || "Failed to change password. You may have signed up with Google/GitHub.");
    } else {
      toast.success("Password changed successfully! Other sessions revoked.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleLogoutAll = () => {
    setConfirmModal({
      isOpen: true,
      title: "Revoke Other Sessions",
      message: "Are you sure you want to log out of all other devices?",
      isDanger: false,
      onConfirm: async () => {
        setConfirmModal({ ...confirmModal, isOpen: false });
        setIsLoggingOutAll(true);
        const { error } = await authClient.revokeOtherSessions();
        setIsLoggingOutAll(false);
        
        if (error) {
          toast.error(error.message || "Failed to revoke sessions");
        } else {
          toast.success("Successfully logged out of other devices");
        }
      }
    });
  };

  const handleDeleteAccount = () => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Account",
      message: "DANGER: Are you absolutely sure you want to delete your account? This action cannot be undone.",
      isDanger: true,
      onConfirm: async () => {
        setConfirmModal({ ...confirmModal, isOpen: false });
        setIsDeleting(true);
        const { error } = await authClient.deleteUser();
        setIsDeleting(false);
        
        if (error) {
          toast.error(error.message || "Failed to delete account");
        } else {
          toast.success("Account deleted successfully");
          router.push("/");
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 overflow-hidden">
            <h3 className={`text-xl font-bold mb-2 ${confirmModal.isDanger ? 'text-red-600' : 'text-gray-900'}`}>
              {confirmModal.title}
            </h3>
            <p className="text-gray-600 mb-6">{confirmModal.message}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmModal.onConfirm}
                className={`px-4 py-2 text-white rounded-lg transition font-medium cursor-pointer ${
                  confirmModal.isDanger 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-cyan-600 hover:bg-cyan-700'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Update Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Change Password</h2>
        
        {isOAuthOnly ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 flex items-start gap-4">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-full shrink-0">
              <LogIn size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">Signed in via Provider</h4>
              <p className="text-sm text-blue-800 mt-1">
                You signed up using a social provider (like Google). You do not have a password set, and you must use your provider to log in.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Current Password</label>
            <Password
              type="password"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-600 w-full text-sm transition"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <Password
              type="newPassword"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-600 w-full text-sm transition"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
            <Password
              type="confirmPassword"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-600 w-full text-sm transition"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isUpdatingPassword}
            className="mt-2 px-6 py-2 cursor-pointer rounded-full font-semibold bg-cyan-600 text-white hover:bg-cyan-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isUpdatingPassword ? <Loader2 size={18} className="animate-spin" /> : "Update Password"}
          </button>
        </form>
        )}
      </div>

      {/* Account Management Section */}
      <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
        <h2 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h2>
        <div className="space-y-4">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-semibold text-gray-900">Revoke Other Sessions</h4>
              <p className="text-sm text-gray-500">Log out of all other devices except this one.</p>
            </div>
            <button
              onClick={handleLogoutAll}
              disabled={isLoggingOutAll}
              className="mt-3 sm:mt-0 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium flex items-center gap-2"
            >
              {isLoggingOutAll ? <Loader2 size={16} className="animate-spin" /> : "Log out all devices"}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-red-100 bg-red-50 rounded-lg">
            <div>
              <h4 className="font-semibold text-red-900">Delete Account</h4>
              <p className="text-sm text-red-700">Permanently delete your account and all data.</p>
            </div>
            <button
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="mt-3 sm:mt-0 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium flex items-center gap-2"
            >
              {isDeleting ? <Loader2 size={16} className="animate-spin" /> : "Delete Account"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
