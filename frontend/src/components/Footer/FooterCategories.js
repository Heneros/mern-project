import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetPostsQuery } from "../../redux/slices/postsApiSlice";
import Loader from "../Loader";
import Message from "../Message";

export default function FooterCategories() {
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
          <div className="d-flex flex-wrap m-n1">
            {uniquePostItems.map((item, index) => (
              <Link
                to={`/category/${item.category.toLowerCase()}`}
                className="btn btn-sm btn-outline-secondary m-1"
                key={index}
              >
                {item.category}
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
