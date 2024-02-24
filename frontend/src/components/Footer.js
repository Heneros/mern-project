import React from "react";

import { Link } from "react-router-dom";

import FooterSocial from "./Footer/FooterSocial";
import FooterCategories from "./Footer/FooterCategories";

export default function Footer() {
  return (
    <>
      <div class="container-fluid bg-light pt-5 px-sm-3 px-md-5">
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-5">
            <Link to={"/"} class="navbar-brand">
              <h1 class="mb-2 mt-n2 display-5 text-uppercase">
                <span class="text-primary">News</span>Room
              </h1>
            </Link>
            <p>
              Volup amet magna clita tempor. Tempor sea eos vero ipsum. Lorem
              lorem sit sed elitr sed kasd et
            </p>
            <FooterSocial />
          </div>
          <div class="col-lg-3 col-md-6 mb-5">
            <h4 class="font-weight-bold mb-4">Categories</h4>
         
              <FooterCategories />
   
          </div>

          <div class="col-lg-3 col-md-6 mb-5">
            <h4 class="font-weight-bold mb-4">Tags</h4>
            <div class="d-flex flex-wrap m-n1">
              {/* Map iteration tags*/}
              <Link to="" class="btn btn-sm btn-outline-secondary m-1">
                Politics
              </Link>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-5">
            <h4 class="font-weight-bold mb-4">Quick Links</h4>
            <div class="d-flex flex-column justify-content-start">
              {/* Pages all */}
              <Link class="text-secondary mb-2" to={"/"}>
                <i class="fa fa-angle-right text-dark mr-2"></i>About
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid py-4 px-sm-3 px-md-5">
        <p class="m-0 text-center">
          &copy;{" "}
          <Link class="font-weight-bold" to="#">
            Your Site Name
          </Link>
          . All Rights Reserved. Designed by{" "}
          <Link class="font-weight-bold" to="https://htmlcodex.com">
            HTML Codex
          </Link>
        </p>
      </div>
    </>
  );
}
