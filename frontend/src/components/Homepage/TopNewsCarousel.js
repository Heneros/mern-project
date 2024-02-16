import React from "react";

import { Carousel, Image, Row, Col, Card } from "react-bootstrap";

import { useGetPostsQuery } from "../../redux/slices/postsApiSlice";
import { Link } from "react-router-dom";
export default function TopNewsCarousel() {
  const { data: postItems, isLoading, error } = useGetPostsQuery();

  const slidesPerView = 3;

  return (
    <>
      <Carousel
        fade
        controls={true}
        prevLabel=""
        nextLabel=""
        indicators={false}
        interval={null}
      >
        {postItems ? (
          postItems.map((post, index) => {
            const slideIndex = Math.floor(index / slidesPerView);
            return (
              <Carousel.Item className="full-width-slide" key={slideIndex}>
                <Row
                  className="d-flex align-items-center "
                  style={{ height: "250px" }}
                >
                  {postItems
                    .slice(index, index + slidesPerView)
                    .map((subPost, subIndex) => (
                      <Col md="4">
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
                              to={`/blog/${subPost._id}`}
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
          })
        ) : (
          <>No items</>
        )}
      </Carousel>
    </>
  );
}
