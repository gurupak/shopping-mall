import React, { FC } from "react";
import { oneProductType } from "../utils/SanityDataandTypes";
import Image from "next/image";
import ImageUrlBuilder from "@sanity/image-url";
import { client } from "../../../../sanity/lib/client";
import Link from "next/link";

const builder = ImageUrlBuilder(client);

const Card: FC<{ data: oneProductType }> = ({ data }) => {
  const makeImgUrl = (srcUrl: any): any => {
    return builder.image(srcUrl)
  }
  return (
    <Link href={`/details/${data.slug.current}`}>
      <div className="space-y-3 hover:scale-110 transition duration-500 p-8">
        <div className="max-w-[20rem] relative">
          <div className="absolute inset-0 z-10" />
          <Image
            src={makeImgUrl(data.image[0]).width(1000).url()}
            alt={data.image[0].alt}
            height={1000}
            width={1000}
            className="max-h-[22rem]"
          />
        </div>
        <div className="space-y-2 text-gray-800 font-semibold text-lg">
          <h6>{data.productName}</h6>
          <p className="text-gray-400 text-base">{data.productTypes[0]}</p>
          <p>${data.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
