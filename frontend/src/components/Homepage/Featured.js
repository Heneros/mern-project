import React from "react";
import { format } from "date-fns";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { useGetPostsQuery } from "../../redux/slices/postsApiSlice";
import Loader from "../Loader";
import Message from "../Message";
import { Link, useParams } from "react-router-dom";
import Title from "../Title";

export default function Featured() {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetPostsQuery({ pageNumber });
  return (
    <>
      <Title name={"News"} />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Swiper
          className="slider-featured"
          spaceBetween={35}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          navigation
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
        >
          {data?.posts.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="position-relative overflow-hidden"
                style={{ height: "300px" }}
              >
                <img
                  className="img-fluid w-100 h-100"
                  src={item.imageUrl}
                  alt="Imge slider"
                  style={{ objectFit: "cover" }}
                />
                <div className="overlay">
                  <div className="mb-1" style={{ fontSize: "13px" }}>
                    <Link
                      className="text-white"
                      to={`/category/${item.category.toLowerCase()}`}
                    >
                      {item.category}
                    </Link>
                    <span className="px-1 text-white">/</span>
                    <Link className="text-white" to={`/news/${item._id}`}>
                      {format(new Date(item.createdAt), "MMMM dd, yyyy")}
                    </Link>
                  </div>
                  <Link className="text-white" to={`/news/${item._id}`}>
                    {item.title}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
