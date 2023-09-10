"use client";

import { FC, useState } from "react";
import { oneProductType } from "../utils/SanityDataandTypes";
import Image from "next/image";
import ImageUrlBuilder from "@sanity/image-url";
import { client } from "../../../../sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { BsCart2 } from "react-icons/bs";
import { useContext } from "react";
import { ctxCart } from "@/context/context";
import toast, { Toaster } from "react-hot-toast";
import { useAuth, useUser } from "@clerk/nextjs";

const builder = ImageUrlBuilder(client);
const Details: FC<{ productItem: oneProductType }> = ({ productItem }) => {
  const { state, dispatch } = useContext(ctxCart);
  const { userId } = useAuth()
  const { user } = useUser();
  // console.log(state)

  const makeImgUrl = (srcUrl: any): any => {
    return builder.image(srcUrl);
  };
  const [imgSelected, setImgSelected] = useState(
    makeImgUrl(productItem.image[0]).width(1000).url()
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [maxQuantity, setmaxQuantity] = useState(false);
  // console.log(imgSelected);
  function increaseQuantity() {
    if (quantity < productItem.quantity) {
      setQuantity((q) => q + 1);
    }
    if (quantity === productItem.quantity - 1) {
      setmaxQuantity(true);
    }
  }
  function decreaseQuantity() {
    if (quantity - 1 !== 0) {
      setQuantity(quantity - 1);
      setmaxQuantity(false);
    }
  }

  const notifiction = () => toast.success(`${quantity} ${productItem.productName} added to cart`);

  function handleAddToCart() {    
    let dataToAdd = {
      uuid: productItem._id,
      quantity: quantity,
      price: productItem.price,
      id: userId,
    };
    // console.log(productItem._id)
    dispatch("addToCart",dataToAdd);
    // dispatch({ payload: "addToCart", data: dataToAdd });
    notifiction();
  }
  
  return (
    <div className="flex flex-col">
      <Toaster />
      <div className="flex space-x-4 flex-col lg:flex-row">
        <div className="flex w-full">
          <div>
            <div className="flex flex-col space-y-4">
              {productItem.image.map((img: any, index: number) => (
                <div key={index} className="w-20 md:w-28">
                  <Image
                    src={makeImgUrl(img).width(200).url()}
                    alt={img.alt}
                    height={200}
                    width={200}
                    onMouseOver={(e) =>
                      setImgSelected(makeImgUrl(img).width(200).url())
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-3/4 h-full lg:w-full mx-4">
            <Image
              src={imgSelected}
              alt={""}
              width={200}
              height={200}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-6  mt-16 lg:mt-0">
          <div>
            <h1 className="text-2xl">{productItem.productName}</h1>
            <p className="text-xl text-gray-400 font-bold">
              {productItem.productTypes[0]}
            </p>
          </div>
          <div>
            <p className="text-base font-bold">SELECT SIZE</p>
            <div className="flex flex-row space-x-4 mt-4">
              {productItem.size.map((subSize, index) => (
                <div
                  key={index}
                  className="rounded-full hover:shadow-lg bg-gray-100 text-center w-10 p-2 cursor-pointer"
                >
                  {subSize}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row items-center">
            <p className="text-base font-bold">Quantity:</p>
            <div className="flex ">
              <div
                onClick={decreaseQuantity}
                className="select-none cursor-pointer ml-6 w-12 p-2 rounded-full bg-gray-200 text-center text-xl"
              >
                -
              </div>
              <div className="w-12 p-2 text-xl ml-2 text-center">
                {quantity}
              </div>
              <div
                onClick={increaseQuantity}
                className="select-none cursor-pointer w-12 p-2 border rounded-full text-center text-xl"
              >
                +
              </div>
              <div className="flex items-center justify-center ml-4">
                {maxQuantity ? (
                  <p className="text-xs text-red-600">
                    Max purchase quantity reached
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => handleAddToCart()}
              className="w-72 bg-gray-900 p-2 text-primaryWhite flex items-center justify-center"
            >
              <BsCart2 size={20} className="mr-4" /> Add to Cart
            </button>
            <p className="ml-3 text-2xl font-bold">
              ${productItem.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 mt-16 space-y-8">
        <div className="relative flex h-40 items-center border-b border-black">
          <div className="text-6xl sm:text-8xl lg:text-9xl font-extrabold text-gray-100 absolute -z-10">
            Overview
          </div>
          <h2 className="text-2xl font-bold">Product Information</h2>
        </div>
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row">
          <div className="flex flex-1 text-base font-bold text-gray-500">
            PRODUCT DETAILS
          </div>
          <div className="flex flex-[2] flex-col">
            {
              <PortableText
                value={productItem.description}
                components={components}
              />
            }
          </div>
        </div>
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row">
          <div className="flex flex-1 text-base font-bold text-gray-500">
            PRODUCT CARE
          </div>
          <div className="flex flex-[2] flex-col">
            {
              <PortableText
                value={productItem.productcare as any}
                components={components}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

const components = {
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({ children }: any) => (
      <li className="m-4" style={{ listStyleType: "disclosure-closed" }}>
        {children}
      </li>
    ),
  },
};
export default Details;
