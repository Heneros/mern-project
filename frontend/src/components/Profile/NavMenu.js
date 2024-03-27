import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Nav, Col, Row, Form, Button } from "react-bootstrap";

export default function NavMenu({ dataProfile }) {
  const location = useLocation();

  const isCurrentPath = (path) => location.pathname === path;
  return (
    <>
      {dataProfile?.isAdmin ? (
        <>
          <Col md={3}>
            <Nav className="flex-column profile-menu">
              <Nav.Link
                className={isCurrentPath("/profile") ? "active" : ""}
                href="/profile"
              >
                My profile
              </Nav.Link>
              <Nav.Link
                className={isCurrentPath("/profile/favorites") ? "active" : ""}
                href="/profile/favorites"
              >
                Favorites
              </Nav.Link>
              <Nav.Link
                className={isCurrentPath("/admin/users-list") ? "active" : ""}
                href="/admin/users-list"
              >
                Users List
              </Nav.Link>
              <Nav.Link
                className={isCurrentPath("/admin/posts-list") ? "active" : ""}
                href="/admin/posts-list"
              >
                Posts List
              </Nav.Link>
              <Nav.Link
                className={isCurrentPath("/admin/create-post") ? "active" : ""}
                href="/admin/create-post"
              >
                Create Post
              </Nav.Link>
            </Nav>
          </Col>
        </>
      ) : (
        <Col md={3}>
          <Nav className="flex-column profile-menu">
            <Nav.Link
              className={isCurrentPath("/profile") ? "active" : ""}
              href="/profile"
            >
              My profile
            </Nav.Link>
            <Nav.Link
              className={isCurrentPath("/favorites") ? "active" : ""}
              href="/profile/favorites"
            >
              Favorites
            </Nav.Link>
          </Nav>
        </Col>
      )}
    </>
  );
}
