import React, { useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Link, useParams } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import { useGetPostsQuery } from "../redux/slices/postsApiSlice";
import Message from "./Message";
import Loader from "./Loader";

export default function TrendingCarousel() {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetPostsQuery({ pageNumber });
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
        >
          {data?.posts.map((item, index) => (
            <SwiperSlide key={index + item._id}>
              <div className="text-truncate">
                <Link className="text-secondary" to={`/news/${item._id}`}>
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
