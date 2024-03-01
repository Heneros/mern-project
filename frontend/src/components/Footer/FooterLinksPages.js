import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

export default function FooterLinksPages() {


  return (
    <>
      <Link className="text-secondary mb-2" to={"/"}>
        <FontAwesomeIcon icon={faAngleRight} className="text-dark mr-2" />
        Homepage
      </Link>
      <Link className="text-secondary mb-2" to={"/about"}>
        <FontAwesomeIcon icon={faAngleRight} className="text-dark mr-2" />
        About
      </Link>
      <Link className="text-secondary mb-2" to={"/news"}>
        <FontAwesomeIcon icon={faAngleRight} className="text-dark mr-2" />
        News
      </Link>
      <Link className="text-secondary mb-2" to={"/all-authors"}>
        <FontAwesomeIcon icon={faAngleRight} className="text-dark mr-2" />
        All Authors
      </Link>
    </>
  );
}
