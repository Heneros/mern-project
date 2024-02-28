import React from "react";
import { Link } from "react-router-dom";
import { useGetPostsQuery } from "../../redux/slices/postsApiSlice";
import Loader from "../Loader";
import Message from "../Message";

export default function FooterCategories() {
  const { data: postItems, isLoading, error } = useGetPostsQuery();

  const uniqueCategories = new Set();

  const uniquePostItems = postItems?.filter((item) => {
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
            {uniquePostItems.map((item) => (
              <>
                <span className="btn btn-sm btn-outline-secondary m-1">
                  {item.category}
                </span>
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
}
