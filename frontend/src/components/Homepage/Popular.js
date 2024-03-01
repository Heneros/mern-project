import React from "react";
import { Row, Col } from "react-bootstrap";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useGetPostsQuery } from "../../redux/slices/postsApiSlice";
import Message from "../Message";
import Loader from "../Loader";
import Title from "../Title";

export default function Popular() {
  const { data: postItems, isLoading, error } = useGetPostsQuery();

  //From most popular to less post
  const sortedPosts = postItems?.slice().sort((a, b) => b.views - a.views);
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
              <Title name={"News"} />
              <div className="col-lg-12">
                <div className="row">
                  {sortedPosts.map((item, index) => (
                    <div className="col-md-6" key={item._id}>
                      <div
                        className={
                          index < 2 ? "position-relative mb-3" : "d-flex mb-3"
                        }
                        key={index}
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
                            <Link to={`/category/${item.category}`}>
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
