import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-auto py-6 text-sm text-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="font-dancing font-extrabold text-xl text-cyan-600">ProConnect</span>
          <span>&copy; {currentYear}. All rights reserved.</span>
        </div>
        <div className="flex gap-4 sm:gap-6">
          <Link href="#!" className="hover:text-cyan-600 transition-colors">About</Link>
          <Link href="#!" className="hover:text-cyan-600 transition-colors">Privacy Policy</Link>
          <Link href="#!" className="hover:text-cyan-600 transition-colors">Terms of Service</Link>
          <Link href="#!" className="hover:text-cyan-600 transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}