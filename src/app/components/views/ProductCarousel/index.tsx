"use client";
import { FC } from "react";
import { oneProductType } from "../../utils/SanityDataandTypes";
import Card from "../Card";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./styles.css";
import Heading from "../Heading";

const ProductCarousel: FC<{ ProductData: Array<oneProductType> }> = ({
  ProductData,
}) => {
  // console.log(ProductData);
  return (
    // <div className="flex">
    //   {ProductData.map((item: oneProductType, index: number) => (
    //     <Card data={item} key={index} />
    //   ))}
    // </div>
    <>      
      <Heading heading={"PRODUCTS"} details={"Check What We Have"} />
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        className="mySwiper"
        onSwiper={() => console.log("swipe over")}
      >
        {ProductData.sort(() => 0.5 - Math.random())
          .slice(0, 15)
          .map((item: oneProductType, index: number) => (
            <SwiperSlide key={index}>
              <Card data={item} key={index} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default ProductCarousel;
