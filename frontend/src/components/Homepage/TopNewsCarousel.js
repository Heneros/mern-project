import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Carousel, Image, Row, Col } from "react-bootstrap";

import Loader from "./../Loader";
import Message from "./../Message";
import { useGetPostsQuery } from "../../redux/slices/postsApiSlice";

export default function TopNewsCarousel() {
  const { pageNumber } = useParams();
  const {
    data,
    isLoading,
    error,
  } = useGetPostsQuery({ pageNumber });

  // const slidesPerView = 3;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 765) {
      setSlidesPerView(1);
    } else {
      setSlidesPerView(3);
    }
  }, [windowWidth]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Carousel
          fade
          controls={true}
          prevLabel=""
          nextLabel=""
          indicators={false}
          interval={null}
        >
          {data?.posts.slice(0, 5).map((post, index) => {
            const slideIndex = Math.floor(index / slidesPerView);
            return (
              <Carousel.Item className="full-width-slide" key={index}>
                <Row
                  className="d-flex align-items-center "
                  style={{ height: "250px" }}
                >
                  {data?.posts
                    .slice(index, index + slidesPerView)
                    .map((subPost, subIndex) => (
                      <Col md="4" sm="12" key={subIndex}>
                        <div className="d-flex">
                          <Image
                            src={subPost.imageUrl}
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                            }}
                          />
                          <div
                            className="d-flex align-items-center bg-light px-3"
                            style={{ height: "80px" }}
                          >
                            <Link
                              className="text-secondary font-weight-semi-bold"
                              to={`/news/${subPost._id}`}
                            >
                              {subPost.title}
                            </Link>
                          </div>
                        </div>
                      </Col>
                    ))}
                </Row>
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}
    </>
  );
}
