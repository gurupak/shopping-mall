import React from "react";

const Newsletter = () => {
  return (
    <div className="flex flex-col justify-center items-center relative space-y-4 px-6 py-32">
      <div className="absolute text-6xl text-gray-100 font-bold -z-50 md:text-[7.5rem]">
        Newsletter
      </div>
      <div className="text-4xl font-bold text-center">
        Subscribe Our Newsletter
      </div>
      <div className="text-base font-light text-center">
        Get the latest information and promo offers directly
      </div>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0">
        <div>
          <input
            type="text"
            className="border border-gray-500 px-4 py-2"
            placeholder="Enter email address"
          />
        </div>
        <div>
          <button className="px-4 py-2 bg-black text-white text-base ml-3">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
