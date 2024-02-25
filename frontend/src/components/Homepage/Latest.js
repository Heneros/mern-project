import React from "react";
import { Row, Col } from "react-bootstrap";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useGetPostsQuery } from "../../redux/slices/postsApiSlice";
import Message from "../Message";
import Loader from "../Loader";

export default function Latest() {
  const { data: postItems, isLoading, error } = useGetPostsQuery();

  const sortedPosts = postItems?.toSorted(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  ///createdAt: "2024-02-15T13:55:15.836Z"
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Row className="mb-3">
            <Col className="col-12">
              <div class="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
                <h3 class="m-0">Recent</h3>
                <Link
                  class="text-secondary font-weight-medium text-decoration-none"
                  to={"/blog"}
                >
                  View All
                </Link>
              </div>
              <div className="col-lg-12">
                <div className="row">
                  {sortedPosts.map((item, index) => (
                    <>
                      <div className="col-md-6">
                        <div
                          class={
                            index < 2 ? "position-relative mb-3" : "d-flex mb-3"
                          }
                        >
                          <img
                            class={index < 2 ? "img-fluid w-100" : ""}
                            alt="preview post "
                            src={item.imageUrl}
                            style={
                              index < 2
                                ? {
                                    objectFit: "cover",
                                    height: "163px",
                                  }
                                : {
                                    objectFit: "cover",
                                    width: "100px",
                                    height: "100px",
                                  }
                            }
                          />
                          <div class="overlay position-relative bg-light">
                            <div class="mb-2" style={{ fontSize: "14px" }}>
                              <Link to={"/"}>{item.category}</Link>

                              <span class="px-1">/</span>
                              <span>
                                {format(
                                  new Date(item.createdAt),
                                  "MMMM dd, yyyy"
                                )}
                              </span>
                            </div>
                            <Link
                              class={index >= 2 ? "h6 m-0" : "h4"}
                              to={`/news/${item._id}`}
                            >
                              {item.title}
                            </Link>
                            {index >= 2 ? (
                              <></>
                            ) : (
                              <p class="m-0">
                                {item.content
                                  ? item.content.substring(0, 15)
                                  : ""}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
