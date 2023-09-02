import BAST_PATH_API from "@/app/components/shared/BasePath";
import React, { FC } from "react";
import ImageUrlBuilder from "@sanity/image-url";
import { client } from "../../../../sanity/lib/client";
import ContextWrapper from "@/context/context";
import Details from "@/app/components/views/Details";
import { oneProductType } from "@/app/components/utils/SanityDataandTypes";
import { Metadata } from "next";

export async function generateMetadata({params}: {params: {slug: string}}){
  let res = await fetch(
    `${BAST_PATH_API}/api/products?start=0&end=10&slug=${params.slug}`
  ).then((res) => res.json());
  
  const data = res.arrProduct[0];
  return {
    title: data.productName,
    description: data.description[0].children[0].text,
  }
}

//stopping for vercel
// export async function generateStaticParams(){
//   let res:any = await fetch(
//     `${BAST_PATH_API}/api/products?start=0&end=10`
//   ).then((res:any) => res.json())
//     // console.log(res.arrProduct);
//   let allData = res.arrProduct.map((item: oneProductType) => {
//     slug: item.slug;
//   });
//   return allData;

// }

async function fetchPreviewData(slug: string) {
  let res = await fetch(
    `${BAST_PATH_API}/api/products?start=0&end=10&slug=${slug}`
  );
  return res.json();
}
const builder = ImageUrlBuilder(client);

const ProductDetails = async ({ params }: { params: { slug: string } }) => {
  const res = await fetchPreviewData(params.slug);
  let productItem: any = "";
  if (res.arrProduct !== "Not found") {
    productItem = res.arrProduct[0];
  } else {
    productItem = "Product not available";
  }
  const makeImgUrl = (srcUrl: any): any => {
    return builder.image(srcUrl);
  };
  // console.log(makeImgUrl(res.arrProduct[0].image[0]).url());
  return (
    <ContextWrapper>
      <Details productItem={productItem} />{" "}
    </ContextWrapper>
  );
}; 

export default ProductDetails;
