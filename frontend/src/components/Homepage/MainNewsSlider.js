import React, { useEffect, useState } from "react";
import { Carousel, Image } from "react-bootstrap";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import data from "../../data/data.json";

export default function MainNewsSlider() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(data);
  }, []);

  console.log(posts);

  return (
    <>
      <Carousel pause="hover" className="bg-primary mb-4">
        {posts.map((post, index) => (
          <Carousel.Item key={index} style={{ height: "400px" }}>
            <Image src={post.imageUrl} style={{ objectFit: "contain" }} />
            <div class="overlay">
              <div class="mb-1">
                <a class="text-white" href="#!">
                  {post.title}
                </a>
                <span class="px-2 text-white">/</span>
                <a class="text-white" href="#!">
                  January 01, 2045
                </a>
              </div>
              <a class="h2 m-0 text-white font-weight-bold" href="#!">
                {post.content}
              </a>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}
