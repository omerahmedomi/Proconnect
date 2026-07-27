"use client"

import Link from "next/link";
import { AlertCircle, ArrowLeft, RefreshCcw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-gray-50/50">
      <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-red-50 p-4 rounded-full">
            <AlertCircle size={48} className="text-red-500" />
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Something went wrong</h2>
        <p className="text-gray-500 mb-8 text-sm md:text-base">
          We hit an unexpected snag while trying to process your request. Don't worry, it's not you, it's us.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button 
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white font-medium rounded-full hover:bg-cyan-700 transition-colors shadow-md hover:shadow-lg cursor-pointer"
          >
            <RefreshCcw size={18} />
            <span>Try Again</span>
          </button>
          <Link 
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors shadow-sm hover:shadow-md cursor-pointer"
          >
            <ArrowLeft size={18} />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}