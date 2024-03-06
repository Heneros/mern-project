import React from "react";
import { Row, Col } from "react-bootstrap";
import { format } from "date-fns";
import { Link, useParams } from "react-router-dom";
import { useGetPostsQuery } from "../../redux/slices/postsApiSlice";
import Message from "../Message";
import Loader from "../Loader";

export default function Latest() {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetPostsQuery({ pageNumber });

  const sortedPosts = data?.posts?.toSorted(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.message}</Message>
      ) : (
        <>
          <Row className="mb-3">
            <Col className="col-12">
              <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
                <h3 className="m-0">Recent</h3>
                <Link
                  className="text-secondary font-weight-medium text-decoration-none"
                  to={"/news"}
                >
                  View All
                </Link>
              </div>
              <div className="col-lg-12">
                <div className="row">
                  {sortedPosts.map((item, index) => (
                    <div className="col-md-6" key={index}>
                      <div
                        className={
                          index < 2 ? "position-relative mb-3" : "d-flex mb-3"
                        }
                      >
                        <img
                          className={index < 2 ? "img-fluid w-100" : ""}
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
                        <div className="overlay position-relative bg-light">
                          <div className="mb-2" style={{ fontSize: "14px" }}>
                            <Link
                              to={`/category/${item.category.toLowerCase()}`}
                            >
                              {item.category}
                            </Link>
                            <span className="px-1">/</span>
                            <span>
                              {format(
                                new Date(item.createdAt),
                                "MMMM dd, yyyy"
                              )}
                            </span>
                          </div>
                          <Link
                            className={index >= 2 ? "h6 m-0" : "h4"}
                            to={`/news/${item._id}`}
                          >
                            {item.title}
                          </Link>
                          {index >= 2 ? (
                            <></>
                          ) : (
                            <p className="m-0">
                              {item.content
                                ? item.content.substring(0, 15)
                                : ""}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
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
