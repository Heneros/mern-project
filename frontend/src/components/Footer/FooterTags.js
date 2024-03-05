import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetPostsQuery } from "../../redux/slices/postsApiSlice";

export default function FooterTags() {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetPostsQuery({ pageNumber });

  const uniqueTags = new Set();

  data?.posts?.forEach((item) => {
    item.tag.forEach((tag) => {
      uniqueTags.add(tag);
    });
  });
  const uniqueTagsArray = Array.from(uniqueTags);

  // console.log(uniqueTagsArray);
  return (
    <div className="d-flex flex-wrap m-n1">
      {uniqueTagsArray.map((item, index) => (
        <Link
          to={`/tag/${item.toLowerCase()}`}
          className="btn btn-sm btn-outline-secondary m-1"
          key={index}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}
