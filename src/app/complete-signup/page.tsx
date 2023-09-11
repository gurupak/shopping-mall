"use client";
import React, { useEffect } from "react";
import BAST_PATH_API from "../components/shared/BasePath";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { getIPAddress } from "../components/utils/helper";

type userData = string | null | undefined;

async function SaveUserData(name: userData, email: any, phone: any, clerkid:any) {
    if (name && email || phone && clerkid) {
      const data = {
        name: name,
        email: email,
        phone: phone,
        clerkid: clerkid,
      };

      console.log('new data', data)
      const res = await fetch(`${BAST_PATH_API}/api/cartfunc`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      
      // console.log('new', await res.json())
      let insertId = await res.json();
      if (insertId.message === "Record inserted"){
        const IP = await getIPAddress();

        let response = await fetch(
          `${BAST_PATH_API}/api/cartfunc?clerkid=${IP}`
        );
        let id = await response.json();

        if (id.cartAllData.length !== 0) {
          // console.log("old id", id.cartAllData[0]['users'].id);
          id = id.cartAllData[0]["users"].id;
          response = await fetch(`${BAST_PATH_API}/api/cartfunc`, {
            method: "PUT",
            body: JSON.stringify({ clerkid: insertId.id, usrid: id }),
          });
          id = await response.json();

          console.log("add", id);
        }
      }
      

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

  return <div>Thank you for signing up. Please browse products in our Dine Mall.</div>;
};

export default CompleteSignUp;
