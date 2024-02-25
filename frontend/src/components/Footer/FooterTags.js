import React from "react";
import { Link } from "react-router-dom";
import { useGetPostsQuery } from "../../redux/slices/postsApiSlice";

export default function FooterTags() {
  const { data: postItems, isLoading, error } = useGetPostsQuery();

  const uniqueTags = new Set();

  postItems?.forEach((item) => {
    item.tag.forEach((tag) => {
      uniqueTags.add(tag);
    });
  });
  const uniqueTagsArray = Array.from(uniqueTags);

  console.log(uniqueTagsArray);
  return (
    <div class="d-flex flex-wrap m-n1">
      {uniqueTagsArray.map((item) => (
        <>
          <Link to="" class="btn btn-sm btn-outline-secondary m-1">
            {item}
          </Link>
        </>
      ))}
    </div>
  );
}
