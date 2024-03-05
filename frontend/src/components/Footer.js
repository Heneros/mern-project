import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

import FooterSocial from "./Footer/FooterSocial";
import FooterCategories from "./Footer/FooterCategories";
import FooterTags from "./Footer/FooterTags";
import FooterLinksPages from "./Footer/FooterLinksPages";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTop({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop} className="btn btn-dark back-to-top">
          <FontAwesomeIcon icon={faAngleUp} className="m-auto" />
        </button>
      )}
      <div className="container-fluid bg-light pt-5 px-sm-3 px-md-5">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-5">
            <Link to={"/"} className="navbar-brand">
              <h1 className="mb-2 mt-n2 display-5 text-uppercase">
                <span className="text-primary">News</span>Room
              </h1>
            </Link>
            <p>
              Volup amet magna clita tempor. Tempor sea eos vero ipsum. Lorem
              lorem sit sed elitr sed kasd et
            </p>
            <FooterSocial />
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="font-weight-bold mb-4">Categories</h4>
            <FooterCategories />
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="font-weight-bold mb-4">Tags</h4>
            <FooterTags />
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="font-weight-bold mb-4">Quick Links</h4>
            <div className="d-flex flex-column justify-content-start">
              <FooterLinksPages />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid py-4 px-sm-3 px-md-5">
        <p className="m-0 text-center">
          &copy;{" "}
          <Link className="font-weight-bold" to="#">
            News site
          </Link>
          . All Rights Reserved. Designed by{" "}
          <Link className="font-weight-bold" to="https://htmlcodex.com">
            HTML Codex
          </Link>{" "}
          Code:
          <Link
            className="font-weight-bold"
            target="_blank"
            to="https://github.com/heneros"
          >
            Heneros
          </Link>
        </p>
      </div>
    </>
  );
}
