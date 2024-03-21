import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import "easymde/dist/easymde.min.css";

import {
  useCreateCommentMutation,
  useGetPostDetailsQuery,
  useGetPostsQuery,
} from "../redux/slices/postsApiSlice";
import Breadcrumbs from "../components/Breadcrumbs";
import Loader from "../components/Loader";
import Message from "../components/Message";
import SidebarSocial from "../components/Homepage/SidebarSocial";
import Newsletter from "../components/Homepage/Newsletter";
import Trending from "../components/Homepage/Trending";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function SinglePost() {
  const { id: postId, pageNumber } = useParams();
  const {
    data: post,
    error,
    refetch,
    isLoading,
  } = useGetPostDetailsQuery({ postId });
  const [comment, setComment] = useState("");

  const [createComment, { isLoading: loadingPostReview }, errorComment] =
    useCreateCommentMutation();

  const {
    data,
    errorPosts,
    isLoading: postsLoading,
  } = useGetPostsQuery({ pageNumber });

  const submitHandler = async (e) => {
    e.preventDefault();
    await createComment({ postId, comment }).unwrap();
    refetch();
    console.log("Comments success");
    // try {
    //   await createComment({ postId, comment }).unwrap();
    //   refetch();
    //   console.log("Comments success");
    // } catch (error) {
    //   console.log(error?.message || error?.data.msg);
    // }
  };
  console.log(errorComment);

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
            <>
              <div className="position-relative mb-3">
                <Image
                  src={post?.imageUrl}
                  alt={post?.title}
                  className="img-fluid w-100"
                  style={{ objectFit: "cover", height: "400px" }}
                />
                <div className="overlay position-relative bg-light">
                  <div className="mb-3 top-info-post">
                    <div className="item-post-info">
                      <Link to={`/category/${post?.category}`}>
                        {post?.category}
                      </Link>
                      <span className="px-1">/</span>
                      <span>
                        {format(new Date(post?.createdAt), "MMMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="item-post-info">
                      <FontAwesomeIcon
                        icon={faEye}
                        className="text-dark mr-2"
                      />
                      <span className="views">Views {post?.views}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3">{post?.title}</h3>
                    <ReactMarkdown children={post?.content} />
                  </div>
                </div>
              </div>
              <div className="bg-light mb-3" style={{ padding: "30px" }}>
                <h3 className="mb-4">Comments</h3>

                {post?.comments.length > 0 ? (
                  post?.comments.map((item) => (
                    <>
                      <div className="media mb-4">
                        {/* <img src="img/user.jpg" alt="Image" className="img-fluid mr-3 mt-1" style="width: 45px;" /> */}
                        <div className="media-body">
                          <h6>
                            <Link to="#!">{item?.username}</Link>
                            <small>
                              <i>
                                {format(
                                  new Date(post?.createdAt),
                                  "MMMM dd, yyyy, h:mm "
                                )}
                              </i>
                            </small>
                          </h6>
                          <p>{item?.comment}</p>
                          <button className="btn btn-sm btn-outline-secondary">
                            Reply
                          </button>
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  <p>No comments</p>
                )}
              </div>

              <div className="bg-light mb-3" style={{ padding: "30px" }}>
                {loadingPostReview ? (
                  <Loader />
                ) : error ? (
                  <Message variant="danger">
                    {errorComment?.data?.message || errorComment?.message}
                  </Message>
                ) : (
                  <>
                    <h3 className="mb-4">Leave a comment</h3>
                    <Form onSubmit={submitHandler}>
                      <Form.Group>
                        <Form.Label label="message">Message *</Form.Label>
                        <Form.Control
                          id="message"
                          cols="30"
                          rows="5"
                          as="textarea"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <div className="form-group mb-0">
                        <Button
                          type="submit"
                          className="btn btn-primary font-weight-semi-bold py-2 px-3"
                          disabled={loadingPostReview}
                        >
                          Leave a comment
                        </Button>
                      </div>
                    </Form>
                  </>
                )}
              </div>
            </>
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
