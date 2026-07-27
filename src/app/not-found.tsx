import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import "./globals.css";
import { Roboto, Dancing_Script } from "next/font/google";

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin']
});

const dancing = Dancing_Script({
  variable: '--font-dancing',
  subsets: ['latin']
});

export default function NotFound() {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${dancing.variable} antialiased min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4`}>
        <div className="text-center max-w-md">
          <h1 className="text-9xl font-extrabold text-cyan-600 font-dancing mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Page not found</h2>
          <p className="text-gray-500 mb-8 text-sm md:text-base">
            Oops! The page you're looking for doesn't exist, has been removed, or is temporarily unavailable.
          </p>
          
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white font-medium rounded-full hover:bg-cyan-700 transition-colors shadow-md hover:shadow-lg"
          >
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
        </div>
      </body>
    </html>
  );
}
