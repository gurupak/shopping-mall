import BAST_PATH_API from "@/app/components/shared/BasePath";
import AllProducts from "@/app/components/views/AllProducts/page";
import React, { FC } from "react";

async function fetchAllProductData(slug: [] | string) {
  let queryFilter: string = "";
  if (slug === undefined) {
    console.log("all products");
  } else {
    // console.log(Array.isArray(slug));
    if (Array.isArray(slug)) {
      queryFilter = slug.join("--");
    }
  }
  // console.log(queryFilter);
  let res = await fetch(
    `${BAST_PATH_API}/api/products?start=0&end=10&type=${queryFilter}`,
    { cache: "no-store" }
  );
  // console.log(res)

  if (!res.ok) {
    throw new Error("Failed to ");
  }

  return res.json();
}

const Product = async ({ params }: { params: { slug: string } }) => {
  
  const data = await fetchAllProductData(params.slug);
  let heading = "";
  if (Array.isArray(params.slug)) {
    heading = params.slug.join(" > ");
  } else {
    heading = "All Products";
  }
  console.log(data);
  return (
    <div>
      {data.arrProduct !== "Not found" ? (
        <AllProducts
          ProductData={data}
          headingData={""}
          detailsData={heading}
          slug={params.slug}
          type={'product'}
        />
      ) : (
        <div className="text-center text-xl font-bold p-8">No product found</div>
      )}
    </div>
  );
};

export default Product;
