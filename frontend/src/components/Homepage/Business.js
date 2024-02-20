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

export default function Business() {
  const { data: postItems, isLoading, error } = useGetPostsQuery();

  const businessItems = postItems?.filter((item) => {
    return item.category === "Business";
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <div class="bg-light py-2 px-4 mb-3 business-arrows">
            <h3 class="m-0">Business</h3>
            <div class="swiper-buttons">
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
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
              nextEl: ".business-arrows .swiper-button-next",
              prevEl: ".business-arrows .swiper-button-prev",
            }}
            autoplay={{
              delay: 3332500,
              disableOnInteraction: false,
            }}
          >
            {businessItems.map((item, index) => (
              <SwiperSlide>
                <div
                  class="position-relative overflow-hidden"
                  style={{ height: "300px" }}
                >
                  <img
                    class="img-fluid w-100 h-100"
                    src={item.imageUrl}
                    alt="Imge slider"
                    style={{ objectFit: "cover" }}
                  />
                  <div class="overlay">
                    <div class="mb-1" style={{ fontSize: "13px" }}>
                      <Link class="text-white" to={`/blog/${item._id}`}>
                        {item.category}
                      </Link>
                      <span class="px-1 text-white">/</span>
                      <Link class="text-white" to={`/blog/${item._id}`}>
                        {format(new Date(item.createdAt), "MMMM dd, yyyy")}
                      </Link>
                    </div>
                    <Link class="text-white" to={`/blog/${item._id}`}>
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
