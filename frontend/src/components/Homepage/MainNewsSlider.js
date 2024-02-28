import React, { useEffect, useState } from "react";
import { Carousel, Image } from "react-bootstrap";

import data from "../../data/data.json";
import { useGetPostsQuery } from "../../redux/slices/postsApiSlice";

export default function MainNewsSlider() {
  const { data: postItems, isLoading, error } = useGetPostsQuery();

  const [posts, setPosts] = useState([]);

  // console.log(postItems);

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
        interval={null}
        className="mb-4"
      >
        {postItems
          ? postItems.slice(0, 3).map((post, index) => (
              <Carousel.Item key={index} style={{ height: "435px" }}>
                <Image
                  src={post.imageUrl}
                  className="d-block w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
                <div className="overlay">
                  <div className="mb-1">
                    <a className="text-white" href="#!">
                      {post.title}
                    </a>
                    <span className="px-2 text-white">/</span>
                    <a className="text-white" href="#!">
                      Exist
                    </a>
                  </div>
                  <a className="h2 m-0 text-white font-weight-bold" href="#!">
                    {post.content}
                  </a>
                </div>
              </Carousel.Item>
            ))
          : posts.map((post, index) => (
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
