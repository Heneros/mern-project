import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import { useGetPostsQuery } from "../../redux/slices/postsApiSlice";

export default function Trending() {
  const { data: postItems, isLoading, error } = useGetPostsQuery();
  const [randomPosts, setRandomPosts] = useState([]);

  useEffect(() => {
    if (postItems && postItems.length > 0) {
      const shuffledPosts = [...postItems].sort(() => Math.random() - 0.5);
      setRandomPosts(shuffledPosts.slice(0, 4));
    }
  }, [postItems]);

  return (
    <>
      <div class="pb-3">
        <div class="bg-light py-2 px-4 mb-3">
          <h3 class="m-0">Trending</h3>
        </div>

        {isLoading && <p>Loading posts...</p>}
        {error && <p>Error fetching posts: {error.message}</p>}
        {randomPosts.length > 0 && (
          <div className="row">
            {randomPosts.map((post) => (
              <div
                className=" d-flex mb-3 item-trending"
                style={{ width: "100%" }}
                key={post.id}
              >
                <img
                  src={post.imageUrl}
                  alt=""
                  style={{
                    objectFit: "cover",
                    height: "100px",
                  }}
                />
                <div
                  className="w-100  d-flex flex-column justify-content-center bg-light px-3"
                  style={{ height: "100px" }}
                >
                  <div className="mb-1" style={{ fontSize: "13px" }}>
                    <Link to={`/blog/${post._id}`}>{post.category}</Link>
                    <span className="px-1">/</span>
                    <span>
                      {format(new Date(post.createdAt), "MMMM dd, yyyy")}
                    </span>
                  </div>
                  <Link className="h6 m-0" to={`/blog/${post._id}`}>
                    {post.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div class="pb-3">
        <div class="bg-light py-2 px-4 mb-3">
          <h3 class="m-0">Tags</h3>
        </div>
        <div class="d-flex flex-wrap m-n1">
          <Link to="" class="btn btn-sm btn-outline-secondary m-1">
            Politics
          </Link>
        </div>
      </div>
    </>
  );
}
