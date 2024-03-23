import React from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Message from "./Message";
import Loader from "./Loader";
import Breadcrumbs from "./Breadcrumbs";
import { useGetPostsQuery } from "../redux/slices/postsApiSlice";
import Title from "./Title";
import Post from "./Post";
import Meta from "./Meta";

export default function AllPostsCategory({ data, isLoading, error }) {
  const location = useLocation();
  const pathname = decodeURIComponent(location.pathname);
  const parts = pathname.split("/");

  const lastPart = parts[parts.length - 1];

  const categoryPost = data?.posts?.filter((item) => {
    ///   item.category.toLowerCase() === lastPart;
    return item.category.toLowerCase() === lastPart;
  });

  // const partsName = parts?.filter((item) =>
  //   item.includes("category").join(", ")
  // );
  // const partsName = parts
  //   .filter((item) => item.includes("category"))
  //   .join(", ");
  // console.log(data?.posts);
  // console.log(lastPart);

  return (
    <>
      <Meta title={lastPart} />
      <Breadcrumbs />
      <Row className="py-3">
        <Title name={lastPart} />
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error?.message}</Message>
        ) : (
          <>
            <Post postItems={categoryPost} />
          </>
        )}
      </Row>
    </>
  );
}
