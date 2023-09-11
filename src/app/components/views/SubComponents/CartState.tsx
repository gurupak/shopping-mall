"use client";
import { ctxCart } from "@/context/context";
import Link from "next/link";
import { useContext, useEffect} from "react";
import { BsCart2 } from "react-icons/bs";

const CartState = () => {
  const { quantity, cartArray } = useContext(ctxCart);

  //, setQuantity, getQuantityFromCart
  // useEffect(() => {
  //   const qty:number = getQuantityFromCart();
  //   // console.log("nav qty", qty);
  //   setQuantity(qty);
  // }, [cartArray, setQuantity, quantity]);

  return (
    <Link href="/cart">
      <div className="flex-shrink-0 relative w-11 h-10 rounded-full bg-gray-300 items-center justify-center flex">
        <div className="absolute top-1 right-2 bg-red-400 text-xs font-light rounded-full w-4 h-4 flex justify-center items-center">
          {quantity}
        </div>
        <BsCart2 size={24} />
      </div>
    </Link>
  );
};

export default CartState;
