'use client'
import { useAuth } from '@clerk/nextjs';
import React from 'react'
import BAST_PATH_API from '../components/shared/BasePath';
import { useRouter } from 'next/navigation';


const PaymentSuccess = ({searchParams}:any) => {
  const paymentStatus = searchParams;
  const { userId } = useAuth();
  const router = useRouter()

  async function getUserDBID(){
    let res = await fetch(`${BAST_PATH_API}/api/cartfunc?clerkid=${userId}`)
    let data = await res.json()    
    const id = data.cartAllData[0]["users"].id;

    res = await fetch(`${BAST_PATH_API}/api/cartfunc`, {
        method: "DELETE",
        body: JSON.stringify({userid: id})
    })
    data = await res.json()
    console.log(data)
    router.push('/')
  }
  
  if( paymentStatus.status === 'success'){
    getUserDBID();
  }else{

  }
  return (
    <div>Payment failed</div>
  )
}

export default PaymentSuccess