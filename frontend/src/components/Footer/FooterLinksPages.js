import React from "react";
import { useGetPostsQuery } from "../../redux/slices/postsApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

export default function FooterLinksPages() {
  const { data: postItems, isLoading, error } = useGetPostsQuery();

  return (
    <>
      <Link className="text-secondary mb-2" to={"/"}>
        <FontAwesomeIcon icon={faAngleRight} className="text-dark mr-2" />
        Homepage
      </Link>
      <Link className="text-secondary mb-2" to={"/"}>
        <FontAwesomeIcon icon={faAngleRight} className="text-dark mr-2" />
        About
      </Link>
      <Link className="text-secondary mb-2" to={"/blog"}>
        <FontAwesomeIcon icon={faAngleRight} className="text-dark mr-2" />
        Blog
      </Link>
      <Link className="text-secondary mb-2" to={"/all-authors"}>
        <FontAwesomeIcon icon={faAngleRight} className="text-dark mr-2" />
        All Authors
      </Link>
    </>
  );
}
