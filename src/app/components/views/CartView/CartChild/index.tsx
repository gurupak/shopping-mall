"use client";
import BAST_PATH_API from "@/app/components/shared/BasePath";
import { oneProductType } from "@/app/components/utils/SanityDataandTypes";
import { ctxCart } from "@/context/context";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import ImageUrlBuilder from "@sanity/image-url";
import { client } from "../../../../../../sanity/lib/client";
import Link from "next/link";
import products from "../../../../../../sanity/products";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const builder = ImageUrlBuilder(client);
const makeImgUrl = (srcUrl: any): any => {
  return builder.image(srcUrl);
};
// export async function fetchAllProducts() {
//   let res: any = await fetch(
//     `${BAST_PATH_API}/api/products?start=0&end=10`
//   ).then((res: any) => res.json());

//   return res;
// }

const CartChild = () => {
  //   let allProducts = fetchAllProducts();
  const { cartArray, dispatch } = useContext(ctxCart);
  const [allProductsCart, setAllProductsCart] = useState<Array<any>>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const router = useRouter();
  //   const { status } = router.query;
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();
  //   console.log(userId);

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey as string);
  // console.log(JSON.stringify(cartArray));
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

  // console.log(cartArray);
  useEffect(() => {
    const fetchAllProducts = async () => {
      let res: any = await fetch(`${BAST_PATH_API}/api/products`).then(
        (res: any) => res.json()
      );

      // console.log(res);
      let itemsToAdd: any = [];
      let itemPrice: number = 0;
      cartArray?.forEach((element: any) => {
        for (let index = 0; index < res.message.length; index++) {
          let item = res.message[index];
          // item.quantity = element.quantity;
          if (element["cart-products"] !== null) {
            if (item._id === element["cart-products"].productUuid) {
              itemsToAdd.push({
                ...item,
                cartid: element["cart-products"].id as number,
              });
              itemPrice =
                itemPrice + item.price * element["cart-products"].quantity;
              // console.log('added', item);
            }
          }
        }
        // console.log('price',itemPrice);
        setAllProductsCart(itemsToAdd);
        setTotalPrice(itemPrice);
      });
      // console.log(cartArray?.length);
      if (cartArray?.length === 0) {
        setAllProductsCart([]);
        setTotalPrice(0);
      }
    };
    fetchAllProducts();
  }, [cartArray]);

  //   console.log(allProductsCart);
  function getQty(id: string, cartid: any) {
    let qty = 0;
    if (cartArray.length > 0) {
      cartArray?.forEach((item: any) => {
        if (item["cart-products"] !== null) {
          if (
            item["cart-products"].productUuid === id &&
            item["cart-products"].id === cartid
          ) {
            qty = item["cart-products"].quantity;
          }
        }
      });
    }
    return qty;
  }
  function getTotalQty() {
    let qty = 0;
    // console.log(cartArray);
    if (cartArray.length > 0) {
      cartArray?.forEach((item: any) => {
        if (item["cart-products"] !== null) {
          qty = qty + item["cart-products"].quantity;
        }
      });
    }
    return qty;
  }

  function deleteCartProduct(id: string, cartid: number | undefined) {
    const revisedCart = setNewCartAndCookie(id, undefined, cartid);
    setAllProductsCart(revisedCart);
  }
  function setNewCartAndCookie(id: string, qty?: number, cartid?: number) {
    const revisedCart = allProductsCart.filter(
      (item: oneProductType) => item._id !== id
    );
    let dataToAdd = {
      productId: id,
      quantity: qty,
      cartid: cartid,
    };
    dispatch("removeFromCart", dataToAdd);
    return revisedCart;
  }
  function decreaseCartProduct(id: string, qty: number, cartid?: number) {
    let revisedCart: any = [];
    // console.log(qty);
    if (qty - 1 === 0) {
      // revisedCart = setNewCartAndCookie(id);
      // setAllProductsCart(revisedCart);
      // setTotalPrice(0);
      let dataToAdd = {
        productId: id,
        quantity: qty,
        cartid: cartid,
      };
      dispatch("removeFromCart", dataToAdd);
      setTotalPrice(0);
      return;
    }
    for (let index = 0; index < cartArray?.length; index++) {
      const element = cartArray[index];
      // console.log(id);
      if (element["cart-products"].productUuid === id) {
        // element.quantity = element.quantity - 1;
        let dataToAdd = {
          uuid: id,
          price: element["cart-products"].price,
          quantity: element["cart-products"].quantity,
          increase: false,
          cartid: cartid,
        };
        // console.log(dataToAdd)
        dispatch("updateCart", dataToAdd);
      }
    }
  }
  function increaseCartProduct(id: string, qty: number, cartid?: number) {
    let revisedCart: any = [];
    // console.log(allProductsCart);
    let itemMaxQty = 0;
    for (const i of allProductsCart) {
      if (i._id === id) {
        itemMaxQty = i.quantity;
      }
    }
    // console.log(itemMaxQty);
    if (qty < itemMaxQty) {
      for (let index = 0; index < cartArray?.length; index++) {
        const element = cartArray[index];
        // console.log(id);
        if (element["cart-products"].productUuid === id) {
          // element.quantity = element.quantity - 1;
          let dataToAdd = {
            uuid: id,
            price: element["cart-products"].price,
            quantity: element["cart-products"].quantity,
            increase: true,
            cartid: cartid,
          };
          // console.log(dataToAdd)
          dispatch("updateCart", dataToAdd);
        }
      }
    }
  }

  return (
    <div className="py-10 px-4 md:px-10">
      <div className="py-6">
        <h1 className="font-bold text-2xl">Shopping Cart</h1>
      </div>
      <div className="flex gap-6 flex-col lg:flex-row">
        <div className="flex flex-col gap-10 basis-3/4 ">
          {allProductsCart.length > 0 ? (
            allProductsCart?.map((item: oneProductType, index: number) => (
              <div key={index} className="flex gap-6 flex-col sm:flex-row">
                <div className="w-72">
                  <Image
                    className="rounded-xl"
                    alt={"cart"}
                    width={1000}
                    height={1000}
                    src={makeImgUrl(item.image[0]).url()}
                  />
                </div>
                <div className="w-full space-y-1 md:space-y-4">
                  <div className="flex justify-between pr-2">
                    <h2 className="text-base md:text-xl text-gray-500">
                      {item.productName}
                    </h2>
                    <div
                      onClick={() => deleteCartProduct(item._id, item.cartid)}
                      className="cursor-pointer"
                    >
                      <RiDeleteBinLine size={28} />
                    </div>
                  </div>
                  <p className="text-base text-gray-500 font-bold">
                    {item.productTypes[0]}
                  </p>
                  <h3 className="text-base text-black font-bold">
                    Delivery Estimation
                  </h3>
                  <h4 className="text-base text-yellow-500">5 Working days</h4>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-xl">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex justify-between items-center">
                      <div
                        className="select-none cursor-pointer  w-8 h-8 rounded-full bg-gray-200 text-center text-xl"
                        onClick={() =>
                          decreaseCartProduct(
                            item._id,
                            getQty(item._id, item.cartid),
                            item.cartid
                          )
                        }
                      >
                        -
                      </div>
                      <div className="w-8 p-2 text-lg  text-center">
                        {getQty(item._id, item.cartid)}
                      </div>
                      <div
                        className="select-none cursor-pointer w-8 h-8 border rounded-full text-center text-xl"
                        onClick={() =>
                          increaseCartProduct(
                            item._id,
                            getQty(item._id, item.cartid),
                            item.cartid
                          )
                        }
                      >
                        +
                      </div>
                      <div className="flex items-center justify-center ml-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Shopping Cart Empty</div>
          )}
        </div>
        <div className="flex basis-1/4 bg-gray-50 flex-col p-4 space-y-6">
          <div className="font-bold text-lg">Order Summary</div>
          <div className="flex justify-between">
            <p>Quanity</p>
            <p>{getTotalQty()} Products</p>
          </div>
          <div className="flex justify-between">
            <p>Sub Total</p>
            <p>${totalPrice}</p>
          </div>
          <div>
            <button
              disabled={loading}
              className="bg-black text-primaryWhite w-full px-4 py-2"
              onClick={createCheckOutSession}
            >
              {loading ? (
                <span className="loading loading-bars loading-md"></span>
              ) : (
                "Process to Checkout"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartChild;
