import React from "react";
import { Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";

import Message from "./Message";
import Loader from "./Loader";
import Breadcrumbs from "./Breadcrumbs";
import { useGetPostsQuery } from "../redux/slices/postsApiSlice";
import Title from "./Title";
import Post from "./Post";

export default function AllPostsTag() {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetPostsQuery({ pageNumber });

  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split("/");
  const lastPart = parts[parts.length - 1];

  //   const categoryPost = postItems?.filter((item) => {
  //     return item?.tag?.value.toLowerCase() === lastPart;
  //   });

  const categoryPost = data?.posts?.filter((item) => {
    const tags = item.tag.map((tag) => tag.toLowerCase());
    return tags.includes(lastPart.toLowerCase());
  });

  //   console.log(matchedTags);
  return (
    <>
      <Breadcrumbs />
      <Row className="py-3">
        <Title name={lastPart} />
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error?.data?.message || error.error}</Message>
        ) : (
          <>
            <Post postItems={categoryPost} />
          </>
        )}
      </Row>
    </>
  );
}
