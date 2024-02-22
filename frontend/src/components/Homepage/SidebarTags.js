import React from "react";
import { Link } from "react-router-dom";

export default function SidebarTags() {
  return (
    <div class="pb-3">
      <div class="bg-light py-2 px-4 mb-3">
        <h3 class="m-0">Follow Us</h3>
      </div>
      <div class="d-flex mb-3">
        <Link
          href=""
          class="d-block w-50 py-2 px-3 text-white text-decoration-none mr-2"
          style={{ background: "#39569E" }}
        >
          <small class="fab fa-facebook-f mr-2"></small>
          <small>12,345 Fans</small>
        </Link>
        <Link
          to=""
          class="d-block w-50 py-2 px-3 text-white text-decoration-none ml-2"
          style={{ background: "#52AAF4" }}
        >
          <small class="fab fa-twitter mr-2"></small>
          <small>12,345 Followers</small>
        </Link>
      </div>
      <div class="d-flex mb-3">
        <Link
          href=""
          class="d-block w-50 py-2 px-3 text-white text-decoration-none mr-2"
          style={{ background: "#0185AE" }}
        >
          <small class="fab fa-linkedin-in mr-2"></small>
          <small>12,345 Connects</small>
        </Link>
        <Link
          href=""
          class="d-block w-50 py-2 px-3 text-white text-decoration-none ml-2"
          style={{ background: "#C8359D" }}
        >
          <small class="fab fa-instagram mr-2"></small>
          <small>12,345 Followers</small>
        </Link>
      </div>
      <div class="d-flex mb-3">
        <Link
          href=""
          class="d-block w-50 py-2 px-3 text-white text-decoration-none mr-2"
          style={{ background: "#DC472E" }}
        >
          <small class="fab fa-youtube mr-2"></small>
          <small>12,345 Subscribers</small>
        </Link>
        <Link
          href=""
          class="d-block w-50 py-2 px-3 text-white text-decoration-none ml-2"
          style={{ background: "#1AB7EA" }}
        >
          <small class="fab fa-vimeo-v mr-2"></small>
          <small>12,345 Followers</small>
        </Link>
      </div>
    </div>
  );
}
