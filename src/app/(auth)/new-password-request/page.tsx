import { ArrowLeft } from "lucide-react";

import Link from 'next/link'


export default function NewPasswordRequestPage() {
  return (
    <div className="p-8 border shadow-lg border-gray-100 flex flex-col gap-5 max-w-110">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold"> Forgot your password?</h2>
        <p className="text-left! text-gray-400 ">
          No worries, Enter your email address and we'll email you a link to
          reset it.
        </p>
      </div>

      <div className=''>
        
      </div>
      <Link href='/signin' className=" flex gap-1 text-sm items-center auth-link">
        {" "}
        <span>
          <ArrowLeft size={20} />
        </span>
        Back to sign in
      </Link>
    </div>
  );
}
