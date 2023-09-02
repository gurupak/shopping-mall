import React from "react";
import BAST_PATH_API from "../components/shared/BasePath";
import AllProducts from "../components/views/AllProducts/page";

async function fetchAllProductData() {
  let res = await fetch(`${BAST_PATH_API}/api/products?start=0&end=10`);
  // console.log(res)

  if (!res.ok) {
    throw new Error("Failed to ");
  }

  return res.json();
}

const GetProducts = async () => {
  const productData = await fetchAllProductData();
  return (
    <div>
      {productData.arrProduct !== "Not found" ? (
        <AllProducts
          ProductData={productData}
          headingData={""}
          detailsData={"All Products"}
          slug={""}
          type={'product'}
        />
      ) : (
        <div className="text-center text-xl font-bold p-8">
          No product found
        </div>
      )}
    </div>
  );
};

export default GetProducts;
