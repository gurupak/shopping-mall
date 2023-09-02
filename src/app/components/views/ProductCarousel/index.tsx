"use client";
import { FC } from "react";
import { oneProductType } from "../../utils/SanityDataandTypes";
import Card from "../Card";
// New carosel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./styles.css";
import Heading from "../Heading";

const ProductCarousel: FC<{ ProductData: Array<oneProductType> }> = ({
  ProductData,
}) => {
  // console.log(ProductData);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    // <div className="flex">
    //   {ProductData.map((item: oneProductType, index: number) => (
    //     <Card data={item} key={index} />
    //   ))}
    // </div>
    <>
      <Heading heading={"PRODUCTS"} details={"Check What We Have"} />
      <Carousel responsive={responsive} swipeable={true} draggable={true}>
        {ProductData.sort(() => 0.5 - Math.random())
          .slice(0, 15)
          .map((item: oneProductType, index: number) => (
            <Card data={item} key={index} />
          ))}
      </Carousel>
      ;
      {/* <Swiper
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
      </Swiper> */}
    </>
  );
};

export default ProductCarousel;
