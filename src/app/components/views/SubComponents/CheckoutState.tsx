"use client";
import { useAuth } from "@clerk/nextjs";
import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { ctxCart } from "@/context/context";

const CheckoutState = () => {
  const { cartArray } = useContext(ctxCart);  
  const router = useRouter();
//   const { status } = router.query;
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();
//   console.log(userId);

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey as string);
  console.log(JSON.stringify(cartArray));
  const createCheckOutSession = async () => {
    setLoading(true);
    const stripe: any = await stripePromise;
    const checkoutSession = await fetch("/api/stripe_session", {
      method: "POST",
      body: JSON.stringify(cartArray), 
    });
    let id = await checkoutSession.json();
    const result = await stripe.redirectToCheckout({
      sessionId: id.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    createCheckOutSession();
  }, [cartArray]);

  return <div onClick={createCheckOutSession}>Please wait redirecting to Payment page...</div>;
};

export default CheckoutState;
