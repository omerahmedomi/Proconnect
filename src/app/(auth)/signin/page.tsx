import AuthComponent from "@/components/auth";
import { signInAction } from "../../actions/auth";

export default function SignInPage() {
  return <AuthComponent type={"signin"} />;
}
