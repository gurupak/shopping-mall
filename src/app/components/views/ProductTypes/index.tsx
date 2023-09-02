import Image from "next/image";
import { event1, event2, event3 } from "../../assets";

const ProductType = () => {
  return (
    <div className="py-16 px2 space-y-5">
      <div className="text-center space-y-3">
        <p className="text-blue-800 text-sm">PROMOTIONS</p>
        <h3 className="text-3xl text-gray-800 font-bold">
          Our Promotions Events
        </h3>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 sm:gap-2 gap-4 px-2 text-gray-800">
        <div className="order-1 w-full flex flex-col md:flex-row col-span-1 md:col-span-2 items-center justify-between sm:flex-row  bg-cat1 px-12">
          <div className="max-w-[13rem] py-8">
            <h4 className="text-3xl font-extrabold">GET UP TO 60%</h4>
            <p className="text-xl">For the summer season</p>
          </div>
          <div className="w-64">
            <Image
              src={event1}
              alt="Summer Season"
              width={1000}
              height={1000}
            />
          </div>
        </div>
        <div className="order-2 w-full row-span-1 sm:row-span-2 h-full bg-cat2">
          <div className="p-4">
            <p>Flex Sweatshirt</p>
            <span className="line-through text-lg">$100.00</span>{" "}
            <span className="font-bold text-lg">$75.00</span>
          </div>
          <div className="w-1/2 md:w-full items-center justify-center flex mx-auto">
            <Image src={event2} alt={"sweater"} height={1000} width={1000} />
          </div>
        </div>
        <div className="order-3 w-full row-span-1 sm:row-span-2 h-full bg-cat3 items-center">
          <div className="p-4 flex flex-col justify-start">
            <p>Flex Push Button Bomber</p>
            <div>
              <span className="line-through text-lg">$225.00</span>{" "}
              <span className="font-bold text-lg">$190.00</span>
            </div>
          </div>
          <div className="w-1/2 md:w-full items-center justify-center flex mx-auto">
            <Image src={event3} alt={"sweater"} height={1000} width={1000} />
          </div>
        </div>
        <div className=" order-1 lg:order-4 py-9 space-y-3 bg-cat4 text-primaryWhite flex flex-col col-span-1 md:col-span-2 justify-center items-center">
          <h3 className="font-extrabold text-4xl">GET 30% Off</h3>
          <p>USE PROMO CODE</p>
          <button
            className="py-1 px-8 text-lg font-medium bg-gray-600 rounded-lg tracking-widest"
            aria-label="Redirect user to Dine Week End Sale"
          >
            DINEWEEKENDSALE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductType;
