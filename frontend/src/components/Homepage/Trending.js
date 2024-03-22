import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Row } from "react-bootstrap";

export default function Trending({ data, isLoading, error }) {
  const [randomPosts, setRandomPosts] = useState([]);

  useEffect(() => {
    if (data?.posts && data?.posts.length > 0) {
      const shuffledPosts = [...data?.posts].sort(() => Math.random() - 0.5);
      setRandomPosts(shuffledPosts.slice(0, 4));
    }
  }, [data?.posts]);

  const uniqueTags = new Set();

  data?.posts?.forEach((item) => {
    item.tag.forEach((tag) => {
      uniqueTags.add(tag);
    });
  });
  const uniqueTagsArray = Array.from(uniqueTags);
  // console.log(data?.posts);
  // console.log(uniquePostItems);
  return (
    <>
      <div className="pb-3">
        <div className="bg-light py-2 px-4 mb-3">
          <h3 className="m-0">Trending</h3>
        </div>
        {isLoading && <p>Loading posts...</p>}
        {error && <p>Error fetching posts: {error.message}</p>}
        {randomPosts.length > 0 && (
          <Row className="trending">
            {randomPosts.map((post, index) => (
              <div
                className=" d-flex mb-3 item-trending"
                style={{ width: "100%", height: "100%" }}
                key={index}
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  style={{
                    objectFit: "cover",
                    maxWidth: "100px",
                    maxHeight: "100px",
                  }}
                />
                <div
                  className="w-100 d-flex flex-column justify-content-center bg-light px-3"
                  style={{ height: "100px" }}
                >
                  <div className="mb-1" style={{ fontSize: "13px" }}>
                    <Link to={`/category/${post.category.toLowerCase()}`}>
                      {post.category}
                    </Link>
                    <span className="px-1">/</span>
                    <span>
                      {format(new Date(post.createdAt), "MMMM dd, yyyy")}
                    </span>
                  </div>
                  <Link className="h6 m-0" to={`/news/${post._id}`}>
                    {post.title}
                  </Link>
                </div>
              </div>
            ))}
          </Row>
        )}
      </div>
      <div className="pb-3">
        <div className="bg-light py-2 px-4 mb-3">
          <h3 className="m-0">Tags</h3>
        </div>
        <div className="d-flex flex-wrap m-n1">
          {uniqueTagsArray?.map((item, index) => (
            <Link
              to={`/tag/${item.toLowerCase()}`}
              className="btn btn-sm btn-outline-secondary m-1"
              key={index}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
