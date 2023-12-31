import Hero from "./components/views/Hero";
import ProductType from "./components/views/ProductTypes";
import BAST_PATH_API from "./components/shared/BasePath";
import {
  oneProductType,
  responseType,
} from "./components/utils/SanityDataandTypes";
import ProductCarousel from "./components/views/ProductCarousel";
import Vintage from "./components/views/Vintage";
import Newsletter from "./components/views/Newsletter";
// import Footer from "./components/views/Footer";

async function fetchAllProducts() {
  const data = await fetch(`${BAST_PATH_API}/api/products`, {
    cache: "no-store",
  })    
  if (!data.ok) {
    throw new Error("Failed to fetch");
  }
  let dataRet = await data.json()
  // console.log("new ", dataRet);
  return dataRet;
}

export default async function Home() {
  // let { result }:responseType = await fetchAllProducts();
  const { message }: responseType = await fetchAllProducts();
  // let {message}:any = await fetchAllProducts();
  // console.log("data:", message);
  return (
    <div>
      <Hero />
      <ProductType />
      <ProductCarousel ProductData={message} />
      <Vintage />
      <Newsletter />
    </div>
  );
}
