"use client";
import React, { useEffect } from "react";
import BAST_PATH_API from "../components/shared/BasePath";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type userData = string | null | undefined;

async function SaveUserData(name: userData, email: any, phone: any, clerkid:any) {
    if (name && email || phone && clerkid) {
      const data = {
        name: name,
        email: email,
        phone: phone,
        clerkid: clerkid,
      };

      console.log(data)
      const res = await fetch(`${BAST_PATH_API}/api/cartfunc`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return await res.json();
    } else {
        console.log('missing');
    }

}

const CompleteSignUp = () => {
  const { user } = useUser();
  const router = useRouter();
  

  useEffect(() => {    
    
    SaveUserData(user?.fullName, user?.emailAddresses[0].emailAddress, user?.phoneNumbers[0]?.phoneNumber, user?.id);
    router.push('/')
  }, [user]);

  return <div>Thank you for signing up. Please browser products in our Dine Mall.</div>;
};

export default CompleteSignUp;
