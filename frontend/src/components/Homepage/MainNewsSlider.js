import React, { useEffect, useState } from "react";
import { Carousel, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";

import data from "../../data/data.json";
import { useGetPostsQuery } from "../../redux/slices/postsApiSlice";

export default function MainNewsSlider() {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetPostsQuery({ pageNumber });

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(data);
  }, []);

  return (
    <>
      <Carousel
        fade
        controls={true}
        prevLabel=""
        nextLabel=""
        indicators={false}
        className="mb-4"
      >
        {data
          ? data.posts.slice(0, 3).map((post, index) => (
            <Carousel.Item
              key={index}
              style={{ height: "435px" }}
              interval={1800}
            >
              <Image
                src={post.imageUrl}
                className="d-block w-100 h-100"
                style={{ objectFit: "cover" }}
              />
              <div className="overlay">
                <div className="mb-1">
                  <Link className="text-white" to={`/news/${post._id}`}>
                    {post.title}
                  </Link>
                  <span className="px-2 text-white">/</span>
                  <Link className="text-white" href="#!">
                    {format(new Date(post.createdAt), "MMMM dd, yyyy")}
                  </Link>
                </div>
                <Link className="h2 m-0 text-white font-weight-bold" to={`/news/${post._id}`}>
                  {post.content}
                </Link>
              </div>
            </Carousel.Item>
          ))
          : posts?.map((post, index) => (
            <Carousel.Item key={index} style={{ height: "400px" }}>
              <Image src={post.imageUrl} style={{ objectFit: "contain" }} />
              <div className="overlay">
                <div className="mb-1">
                  <a className="text-white" href="#!">
                    {post.title}
                  </a>
                  <span className="px-2 text-white">/</span>
                  <a className="text-white" href="#!">
                    January 01, 2045
                  </a>
                </div>
                <a className="h2 m-0 text-white font-weight-bold" href="#!">
                  {post.content}
                </a>
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
    </>
  );
}
