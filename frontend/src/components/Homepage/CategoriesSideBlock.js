import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  useGetCategoriesQuery,
  useGetPostsQuery,
} from "../../redux/slices/postsApiSlice";
import { Image } from "react-bootstrap";

import Message from "../Message";
import Loader from "../Loader";

export default function CategoriesSideBlock() {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetPostsQuery({ pageNumber });

  const uniqueCategories = new Set();

  const uniquePostItems = data?.posts?.filter((item) => {
    if (!uniqueCategories.has(item.category)) {
      uniqueCategories.add(item.category);
      return true;
    }
    return false;
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
            <h3 className="m-0">All Categories </h3>
            <Link
              className="text-secondary font-weight-medium text-decoration-none"
              to={"/news"}
            >
              View All
            </Link>
          </div>
          {uniquePostItems.slice(0, 4).map((post, index) => (
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
              <Link
                to={`/category/${post.category.toLowerCase()}`}
                className="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none"
              >
                {post.category}
              </Link>
            </div>
          ))}
        </>
      )}
    </>
  );
}
