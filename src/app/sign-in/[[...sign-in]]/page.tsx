import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="m-10 flex w-full justify-center">     
      <SignIn />      
    </div>
  );
}

