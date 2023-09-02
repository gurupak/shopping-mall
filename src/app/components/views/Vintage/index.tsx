import Image from "next/image";
import { feature } from "../../assets";

const Vintage = () => {
  return (
    <div className="px-1 text-gray-700 ">
      <div className="text-4xl md:text-5xl flex justify-start md:justify-end font-bold py-4">
        <h6 className="max-w-[30rem]">
          Unique and Authentic Vintage Designer Jewellery
        </h6>
      </div>
      <div className="flex justify-between py-4 mt-2  flex-col md:flex-row gap-5">
        <div className="relative basis-1/2 grid grid-cols-2 grid-rows-2 gap-10">
          <div className="font-bold absolute -z-50 text-[5rem] md:text-[6rem] lg:text-[7.3rem] leading-[5.9rem] text-gray-100">
            Different from others
          </div>
          <div className="max-w-[13rem] space-y-2">
            <p className="font-semibold text-xl">
              Using Good Quality Materials
            </p>
            <p className="text-lg leading-5">
              Lorem ipsum dolor sit amt, consectetur adipiscing elit.
            </p>
          </div>
          <div className="max-w-[13rem] space-y-2">
            <p className="font-semibold text-xl">100% Handmade Products</p>
            <p className="text-lg leading-5">
              Lorem ipsum dolor sit amt, consectetur adipiscing elit.
            </p>
          </div>
          <div className="max-w-[13rem] space-y-2">
            <p className="font-semibold text-xl">Modern Fashion Design</p>
            <p className="text-lg leading-5">
              Lorem ipsum dolor sit amt, consectetur adipiscing elit.
            </p>
          </div>
          <div className="max-w-[13rem] space-y-2">
            <p className="font-semibold text-xl">Discount for Bulk Orders</p>
            <p className="text-lg leading-5">
              Lorem ipsum dolor sit amt, consectetur adipiscing elit.
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row basis-1/2">
          <div className="w-full px-4 lg:px-0 lg:w-80">
            <Image
              width={1000}
              height={1000}
              src={feature}
              alt={"Designer Jewellery"}
            />
          </div>
          <div className="space-y-6 md:space-y-4 p-6">
            <p
              style={{ wordSpacing: "0.8rem" }}
              className="h-[90%] lg:max-w-[15rem]"
            >
              This piece is ethically crafted in our small family-owned workshop
              in Peru with unmatched attention to detail and care. The Natural
              color is the actual natural color of the fiber, undyed and 100%
              traceable.
            </p>
            <button className="text-white bg-gray-900 rounded-md py-2 px-6">
              See All Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vintage;
