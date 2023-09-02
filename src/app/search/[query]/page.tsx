import BAST_PATH_API from "@/app/components/shared/BasePath";
import AllProducts from "@/app/components/views/AllProducts/page";
import React, { FC } from "react";

async function fetchAllProductData(slug:string) {
  let queryFilter: string = "";
  if (slug === undefined) {
    console.log("all products");
  } else {
    // console.log(Array.isArray(slug));
    queryFilter = slug
  }
  // console.log(queryFilter);
  let res = await fetch(
    `${BAST_PATH_API}/api/products?start=0&end=10&search=${queryFilter}`,
    { cache: "no-store" }
  );
  // console.log(res)

  if (!res.ok) {
    throw new Error("Failed to ");
  }

  return res.json();
}

const Search = async ({ params }: { params: { query: string } }) => {
  const data = await fetchAllProductData(params.query);
  let heading = "";
  if (Array.isArray(params.query)) {
    heading = params.query.join(" > ").toUpperCase();
  } else {
    heading = "Searching: " + params.query ;
  }
  console.log(data);
  return (
    <div>
      {data.arrProduct !== "Not found" ? (
        <AllProducts
          ProductData={data}
          headingData={""}
          detailsData={heading}
          slug={params.query}
          type={'search'}
        />
      ) : (
        <div className="text-center text-xl font-bold p-8">
          No product found
        </div>
      )}
    </div>
  );
};

export default Search;
