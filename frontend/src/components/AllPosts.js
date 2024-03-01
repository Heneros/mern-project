import React from "react";
import { Row, Col } from "react-bootstrap";

import { useLocation } from "react-router-dom";

import Message from "./Message";
import Loader from "./Loader";
import Breadcrumbs from "./Breadcrumbs";
import { useGetPostsQuery } from "../redux/slices/postsApiSlice";
import Title from "./Title";
import Post from "./Post";

export default function AllPosts() {
  const { data: postItems, isLoading, error } = useGetPostsQuery();

  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split("/");
  const lastPart = parts[parts.length - 1];

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
            <Post postItems={postItems} />
          </>
        )}
      </Row>
    </>
  );
}
