import React from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";

import "easymde/dist/easymde.min.css";

import {
  useGetPostDetailsQuery,
  useGetPostsQuery,
} from "../redux/slices/postsApiSlice";
import Breadcrumbs from "../components/Breadcrumbs";
import Loader from "../components/Loader";
import Message from "../components/Message";
import SidebarSocial from "../components/Homepage/SidebarSocial";
import Newsletter from "../components/Homepage/Newsletter";
import Trending from "../components/Homepage/Trending";

export default function SinglePost() {
  const { id: postId, pageNumber } = useParams();
  const {
    data: post,
    error,
    refetch,
    isLoading,
  } = useGetPostDetailsQuery({ postId });

  const {
    data,
    isLoading: postsLoading,
    errorPosts,
  } = useGetPostsQuery({ pageNumber });

  // console.log(post);
  return (
    <>
      <Breadcrumbs title={post?.title} />
      <Row>
        <Col lg={8}>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {error?.message || error?.error || error?.data?.message}
            </Message>
          ) : (
            <div className="position-relative mb-3">
              <Image
                src={post?.imageUrl}
                alt={post?.title}
                className="img-fluid w-100"
                style={{ objectFit: "cover", height: "400px" }}
              />
              <div className="overlay position-relative bg-light">
                <div className="mb-3">
                  <Link to={`/category/${post?.category}`}>
                    {post?.category}
                  </Link>
                  <span class="px-1">/</span>
                  <span>
                    {format(new Date(post?.createdAt), "MMMM dd, yyyy")}
                  </span>
                </div>
                <div>
                  <h3 className="mb-3">{post?.title}</h3>
                  <ReactMarkdown children={post?.content} />
                </div>
              </div>
            </div>
          )}
        </Col>
        <Col lg={4}>
          <SidebarSocial />
          <Newsletter />
          <Trending data={data} error={errorPosts} isLoading={postsLoading} />
        </Col>
      </Row>
    </>
  );
}
