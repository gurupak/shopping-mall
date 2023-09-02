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
  const { state, dispatch } = useContext(ctxCart);
  const [allProductsCart, setAllProductsCart] = useState<Array<any>>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchAllProducts = async () => {
      let res: any = await fetch(
        `${BAST_PATH_API}/api/products?start=0&end=10`
      ).then((res: any) => res.json());

      //   console.log(res);
      let itemsToAdd: any = [];
      let itemPrice: number = 0;
      state?.cart.forEach(
        (element: { productId: string; quantity: number }) => {
          for (let index = 0; index < res.arrProduct.length; index++) {
            let item = res.arrProduct[index];
            // item.quantity = element.quantity;
            if (item._id === element.productId) {
              itemsToAdd.push(item);
              itemPrice = itemPrice + item.price * element.quantity;
              // console.log('added', item);
            }
          }
          setAllProductsCart(itemsToAdd);
          setTotalPrice(itemPrice);
        }
      );
      console.log(state?.cart.length)
      if (state?.cart.length === 0) {
        setAllProductsCart([]);
        setTotalPrice(0);
      }
    };
    fetchAllProducts();
  }, [state.cart]);

  //   console.log(allProductsCart);
  function getQty(id: string) {
    let qty = 0;
    state?.cart.forEach((element: { productId: string; quantity: number }) => {
      if (element.productId === id) {
        qty = element.quantity;
      }
    });
    return qty;
  }
  function getTotalQty() {
    let qty = 0;
    state?.cart.forEach((element: { productId: string; quantity: number }) => {
      qty = qty + element.quantity;
    });
    return qty;
  }

  function deleteCartProduct(id: string) {
    const revisedCart = setNewCartAndCookie(id);
    setAllProductsCart(revisedCart);
  }
  function setNewCartAndCookie(id: string, qty?: number) {
    const revisedCart = allProductsCart.filter(
      (item: oneProductType) => item._id !== id
    );
    let dataToAdd = {
      productId: id,
      quantity: qty,
    };
    dispatch({ payload: "removeFromCart", data: dataToAdd });
    return revisedCart;
  }
  function decreaseCartProduct(id: string, qty: number) {
    let revisedCart: any = [];
    console.log(qty)
    if (qty - 1 === 0) {
      // revisedCart = setNewCartAndCookie(id);
      // setAllProductsCart(revisedCart);       
      // setTotalPrice(0);
      let dataToAdd = {
        productId: id,
        quantity: qty,        
      };
      dispatch({ payload: "removeFromCart", data: dataToAdd }); 
      setTotalPrice(0);
      return 
    }
    for (let index = 0; index < state?.cart.length; index++) {
        const element = state?.cart[index];               
        if(element.productId === id){            
            // element.quantity = element.quantity - 1;   
            let dataToAdd = {
              productId: id,
              quantity: element.quantity,
              increase: false,
            };
            dispatch({payload: 'updateCart', data: dataToAdd })         
        }        
    }
  }
  function increaseCartProduct(id: string, qty: number) {
    let revisedCart: any = [];
    // console.log(allProductsCart);
    let itemMaxQty = 0;
    for (const i of allProductsCart) {
      if (i._id === id) {
        itemMaxQty = i.quantity
      }
    }
    console.log(itemMaxQty);
    if (qty < itemMaxQty) {
      let dataToAdd = {
        productId: id,
        quantity: qty,
        increase: true,
      };
      dispatch({ payload: "updateCart", data: dataToAdd });
    }    
  }

  return (
    <div className="py-10 px-4 md:px-10">
      <div className="py-6">
        <h1 className="font-bold text-2xl">Shopping Cart</h1>
      </div>
      <div className="flex gap-6 flex-col lg:flex-row">
        <div className="flex flex-col gap-10 basis-3/4 ">
          {allProductsCart.length > 0 &&
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
                      onClick={() => deleteCartProduct(item._id)}
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
                          decreaseCartProduct(item._id, getQty(item._id))
                        }
                      >
                        -
                      </div>
                      <div className="w-8 p-2 text-lg  text-center">
                        {getQty(item._id)}
                      </div>
                      <div
                        className="select-none cursor-pointer w-8 h-8 border rounded-full text-center text-xl"
                        onClick={() =>
                          increaseCartProduct(item._id, getQty(item._id))
                        }
                      >
                        +
                      </div>
                      <div className="flex items-center justify-center ml-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
            <Link href={"/checkout"}>
              <button className="bg-black text-primaryWhite w-full px-4 py-2">
                Process to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartChild;
