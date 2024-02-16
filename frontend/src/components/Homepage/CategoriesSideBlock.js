import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetCategoriesQuery,
  useGetPostsQuery,
} from "../../redux/slices/postsApiSlice";
import { Image } from "react-bootstrap";

import Message from "../Message";
import Loader from "../Loader";

export default function CategoriesSideBlock() {
  const { data: postItems, isLoading, error } = useGetPostsQuery();

  useEffect(() => {}, [postItems]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <div class="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
            <h3 class="m-0">Latest Posts </h3>
            <Link
              class="text-secondary font-weight-medium text-decoration-none"
              to={"/blog"}
            >
              View All
            </Link>
          </div>
          {postItems.slice(0, 4).map((post, index) => (
            <div
              className="position-relative overflow-hidden mb-3"
              style={{ height: "80px" }}
              key={index}
            >
              <Image
                src={post.imageUrl}
                fluid
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
              <span className="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none">
                {post.title}
              </span>
            </div>
          ))}
        </>
      )}
    </>
  );
}
