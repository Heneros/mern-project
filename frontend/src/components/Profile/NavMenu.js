import React from "react";
import { useLocation } from "react-router-dom";
import { Nav, Col } from "react-bootstrap";
import { selectCurrentUserGoogleToken, selectCurrentUserToken } from './../../redux/slices/auth';
import { useSelector } from 'react-redux';
import { decodeToken } from 'react-jwt';


export default function NavMenu() {
  const token = useSelector(selectCurrentUserToken);
  const googleToken = useSelector(selectCurrentUserGoogleToken);

  console.log(token)

  let isAdmin = false;
  let isEditor = false;
  let accessRight = 'User';


  const location = useLocation();
  const isCurrentPath = (path) => location.pathname === path;

  if (token) {
    const decodedToken = decodeToken(token);
    const { roles } = decodedToken;

    isAdmin = roles.includes('Admin');
    isEditor = roles.includes('Editor');

    if (isAdmin) {
      return (<>
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
      </>)
    } else if (isEditor) {
      return (
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
        </>)
    }
    return (
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
              className={isCurrentPath("/favorites") ? "active" : ""}
              href="/profile/favorites"
            >
              Favorites
            </Nav.Link>
          </Nav>
        </Col>
      </>)


  }

}
