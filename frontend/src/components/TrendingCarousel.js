import React, { useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import { useGetPostsQuery } from "../redux/slices/postsApiSlice";
import Message from "./Message";
import Loader from "./Loader";

export default function TrendingCarousel() {
  const { data: postItems, isLoading, error } = useGetPostsQuery();


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Swiper
          className="tranding-carousel position-relative d-inline-flex align-items-center ml-3"
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          slidesPerView={1}
          navigation
          autoplay={{
            delay: 3332500,
            disableOnInteraction: false,
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {postItems.map((item, index) => (
            <SwiperSlide>
              <div class="text-truncate" key={index}>
                <Link class="text-secondary" to={`/blog/${item._id}`}>
                  {item.title}
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
