import BAST_PATH_API from "@/app/components/shared/BasePath";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="m-10 flex w-full justify-center">     
      <SignIn redirectUrl={`${BAST_PATH_API}/complete-signup`} />      
    </div>
  );
}

