import React from "react";
import { Row, Col } from "react-bootstrap";

import { useLocation, useParams } from "react-router-dom";

import Message from "./Message";
import Loader from "./Loader";
import Breadcrumbs from "./Breadcrumbs";
import { useGetPostsQuery } from "../redux/slices/postsApiSlice";
import Title from "./Title";
import Post from "./Post";

export default function AllPosts() {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetPostsQuery({ pageNumber });

  console.log(data);
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
          <Message>{error?.message}</Message>
        ) : (
          <>
            <Post postItems={data?.posts} />
          </>
        )}
      </Row>
    </>
  );
}
