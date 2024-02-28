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
import { Link } from "react-router-dom";

export default function Featured() {
  const { data: postItems, isLoading, error } = useGetPostsQuery();
  return (
    <>
      <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
        <h3 className="m-0">Featured</h3>
        <Link
          className="text-secondary font-weight-medium text-decoration-none"
          to={`/`}
        >
          View All
        </Link>
      </div>
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
            delay: 3332500,
            disableOnInteraction: false,
          }}
        >
          {postItems.map((item, index) => (
            <SwiperSlide>
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
                    <Link className="text-white" to={`/news/${item._id}`}>
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
