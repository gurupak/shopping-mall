import BAST_PATH_API from "@/app/components/shared/BasePath";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp redirectUrl={`${BAST_PATH_API}/complete-signup`}/>;
}
