import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { useGetPostsQuery } from "../../redux/slices/postsApiSlice";
import Message from "../Message";
import Loader from "../Loader";

export default function Entertainment() {
  const { data: postItems, isLoading, error } = useGetPostsQuery();

  const businessItems = postItems?.filter((item) => {
    return item.category === "Entertainment";
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <div className="bg-light py-2 px-4 mb-3 slider-arrows entertainment-arrows">
            <h3 className="m-0">Entertainment</h3>
            <div className="swiper-buttons">
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
          </div>
          <Swiper
            className="slider-small"
            spaceBetween={35}
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 1,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
            navigation={{
              nextEl: ".entertainment-arrows .swiper-button-next",
              prevEl: ".entertainment-arrows .swiper-button-prev",
            }}
            autoplay={{
              delay: 3332500,
              disableOnInteraction: false,
            }}
          >
            {businessItems.map((item, index) => (
              <SwiperSlide>
                <div className="position-relative">
                  <img
                    className="img-fluid w-100"
                    src={item.imageUrl}
                    alt="Imge slider"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="overlay position-relative bg-light">
                    <div className="mb-2" style={{ fontSize: "13px" }}>
                      <Link to={`/news/${item._id}`}>{item.category}</Link>
                      <span className="px-1">/</span>

                      <span>
                        {" "}
                        {format(new Date(item.createdAt), "MMMM dd, yyyy")}
                      </span>
                    </div>
                    <Link to={`/news/${item._id}`} className="h4 m-0">
                      {item.title}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </>
  );
}
