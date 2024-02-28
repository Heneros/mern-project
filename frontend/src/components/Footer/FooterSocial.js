import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faLinkedinIn,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export default function FooterSocial() {
  return (
    <div className="d-flex justify-content-start mt-4">
      <Link
        className="btn btn-outline-secondary text-center mr-2 px-0"
        style={{ width: "38px", height: "38px" }}
        to={"/"}
      >
        <FontAwesomeIcon icon={faTwitter} />
      </Link>
      <Link
        className="btn btn-outline-secondary text-center mr-2 px-0"
        style={{ width: "38px", height: "38px" }}
        to={"/"}
      >
        <FontAwesomeIcon icon={faFacebookF} />
      </Link>
      <Link
        className="btn btn-outline-secondary text-center mr-2 px-0"
        style={{ width: "38px", height: "38px" }}
        to="#"
      >
        <i className="fab fa-linkedin-in"></i>
        <FontAwesomeIcon icon={faInstagram} />
      </Link>
      <Link
        className="btn btn-outline-secondary text-center mr-2 px-0"
        style={{ width: "38px", height: "38px" }}
        to={"/"}
      >
        <FontAwesomeIcon icon={faLinkedinIn} />
      </Link>
      <Link
        className="btn btn-outline-secondary text-center mr-2 px-0"
        style={{ width: "38px", height: "38px" }}
        to={"/"}
      >
        <FontAwesomeIcon icon={faYoutube} />
      </Link>
    </div>
  );
}
