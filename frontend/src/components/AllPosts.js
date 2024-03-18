import React from "react";
import { Row, Col } from "react-bootstrap";

import { useLocation, useParams } from "react-router-dom";

import Message from "./Message";
import Loader from "./Loader";
import Breadcrumbs from "./Breadcrumbs";
import { useGetPostsQuery } from "../redux/slices/postsApiSlice";
import Title from "./Title";
import Post from "./Post";

export default function AllPosts({ data, isLoading, error }) {
  // const { pageNumber } = useParams();

  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split("/");
  const lastPart = parts[parts.length - 1];

  // const partsName = parts.map((item) => {
  //   return item.includes("news") ? item.join("") : item;
  // });
  // console.log(partsName);
  const partsName = parts.filter((item) => item.includes("news")).join(", ");
  console.log(partsName);
  return (
    <>
      <Breadcrumbs />
      <Row className="py-3">
        <Title name={partsName} />
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
