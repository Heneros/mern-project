import React from "react";
import { useLocation } from "react-router-dom";
import { Nav, Col } from "react-bootstrap";
import { selectCurrentUserGoogleToken, selectCurrentUserToken } from './../../redux/slices/auth';
import { useSelector } from 'react-redux';
import { decodeToken } from 'react-jwt';

export default function NavMenu() {
  const token = useSelector(selectCurrentUserToken);
  const googleToken = useSelector(selectCurrentUserGoogleToken);

  const location = useLocation();
  const isCurrentPath = (path) => location.pathname === path;

  //
  // console.log('Token:', token);
  // console.log('Google Token:', googleToken);

  let isAdmin = false;
  let isEditor = false;

  if (token) {
    const decodedToken = decodeToken(token);
    console.log('Decoded Token:', decodedToken);
    const { roles } = decodedToken;
    isAdmin = roles.includes('Admin');
    isEditor = roles.includes('Editor');
  } else if (googleToken) {
    const gDecodedToken = decodeToken(googleToken);
    console.log('Decoded Google Token:', gDecodedToken);
    const { roles } = gDecodedToken;
    isAdmin = roles.includes('Admin');
    isEditor = roles.includes('Editor');
  }

  return (
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
        {isAdmin && (
          <>
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
          </>
        )}
        {isEditor &&  (
          <>
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
          </>
        )}
      </Nav>
    </Col>
  );
}