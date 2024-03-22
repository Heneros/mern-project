import React from "react";
import { Link } from "react-router-dom";

import { format } from "date-fns";

export default function Post({ postItems }) {
  return (
    <>
      {postItems.map((item, index) => (
        <div className="col-md-6" key={item._id}>
          <div
            className={index < 4 ? "position-relative mb-3" : "d-flex mb-3"}
            key={index}
          >
            <Link to={`/news/${item._id}`}>
              <img
                className={index < 4 ? "img-fluid w-100" : ""}
                alt="preview post "
                src={item.imageUrl}
                style={
                  index < 4
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
            </Link>
            <div className="overlay position-relative bg-light">
              <div className="mb-2" style={{ fontSize: "14px" }}>
                <Link to={`/category/${item.category.toLowerCase()}`}>
                  {item.category}
                </Link>
                <span className="px-1">/</span>
                <span>{format(new Date(item.createdAt), "MMMM dd, yyyy")}</span>
              </div>
              <Link
                className={index >= 4 ? "h6 m-0" : "h4"}
                to={`/news/${item._id}`}
              >
                {item.title}
              </Link>
              {index >= 4 ? (
                <></>
              ) : (
                <p className="m-0">
                  {item.content ? item.content.substring(0, 45) : ""}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
