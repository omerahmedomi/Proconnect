
import NavigationBar from "@/components/navbar";
import { signUpAction } from "../actions/auth";
import Password from './../../components/password';

export default function SignUpPage() {
  return (
    <div>
      <NavigationBar />
      <h1 className="text-3xl font-semibold text-center mt-10 text-gray-700">
        Create your account
      </h1>
      <div className="flex flex-col mt-3 items-center justify-center  gap-4   p-4 w-100 border mx-auto rounded-lg shadow-lg border-blue-200">
        <form action={signUpAction} className="flex flex-col gap-5  w-full">
          <label>
          Full Name 
            <input
              type="text"
              name="name"
              placeholder="e.g John Doe"
              required
              className="auth-input "
            />
          </label>
          <label>
            Email 
            <input
              type="email"
              name="email"
              placeholder="e.g johndoe@example.com"
              required
              className="auth-input"
            />
          </label>
          <label>
            Password 
            <Password />
          </label>
          <label>
           
           Confirm Password 
            <Password />
          </label>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
