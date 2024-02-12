import React from "react";
import { Carousel, Image } from "react-bootstrap";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

export default function MainNewsSlider() {
 
  
  const slideImages = [
    {
      url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      caption: "Slide 1",
    },
    {
      url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
      caption: "Slide 2",
    },
    {
      url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      caption: "Slide 3",
    },
  ];
  return (
    <>
      <Carousel pause="hover" className="bg-primary mb-4">
        {slideImages.map((slideImage, index) => (
          // key index add later
          <Carousel.Item style={{ height: "400px" }}>
            <Image src={slideImage.url} style={{ objectFit: "cover" }} />
            <div class="overlay">
              <div class="mb-1">
                <a class="text-white" href="#!">
                  Technology
                </a>
                <span class="px-2 text-white">/</span>
                <a class="text-white" href="#!">
                  January 01, 2045
                </a>
              </div>
              <a class="h2 m-0 text-white font-weight-bold" href="#!">
                Sanctus amet sed amet ipsum lorem. Dolores et erat et elitr sea
                sed
              </a>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
    // <div class="">
    //   <Slide>
    //     {slideImages.map((slideImage, index) => (
    //       <div key={index} class="d-flex">
    //         <img
    //           src={slideImage.url}
    //           alt="post preview"
    //           style={{ width: "80px", height: "80px", objectFit: "cover" }}
    //         />
    //         <div
    //           class="d-flex align-items-center bg-light px-3"
    //           style={{ height: "80px" }}
    //         >
    //           <a class="text-secondary font-weight-semi-bold" href="#!">
    //             Lorem ipsum dolor sit amet consec adipis elit
    //           </a>
    //         </div>
    //       </div>
    //     ))}
    //   </Slide>
    // </div>
  );
}
