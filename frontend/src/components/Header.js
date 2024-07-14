import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Search from "./Homepage/Search";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import HeaderDate from "./HeaderDate";
import TrendingCarousel from "./TrendingCarousel";
import {
  useGetProfileQuery
} from "../redux/slices/userApiSlice";
import {
  useLogoutMutation
} from "../redux/slices/authApiSlice";
import Meta from "./Meta";

export default function Header() {
  const { error } = useGetProfileQuery();

  const navigate = useNavigate();
  const location = useLocation();

  const isCurrentPath = (path) => location.pathname === path;

  const [logout, {data, isSuccess}] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      navigate("/");
     // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Meta />
      <div className="container-fluid">
        <div className="row align-items-center bg-light px-lg-5">
          <div className="col-12 col-md-8">
            <div className="d-flex justify-content-between">
              <div
                className="bg-primary text-white text-center py-2"
                style={{ width: "100px" }}
              >
                Trending
              </div>
              <TrendingCarousel />
            </div>
          </div>
          <HeaderDate />
        </div>
        <div className="row align-items-center py-2 px-lg-5">
          <div className="col-lg-4">
            <Link to={`/`} className="navbar-brand d-none d-lg-block">
              <h1 className="m-0 display-5 text-uppercase">
                <span className="text-primary">News</span>Room
              </h1>
            </Link>
          </div>
          <div className="col-lg-8 text-center text-lg-right"></div>
        </div>
      </div>

      <div className="container-fluid p-0 mb-3">
        <Navbar bg="light" expand="lg" className="py-2 py-lg-0 px-lg-5">
          <Link to={`/`} className="d-block d-lg-none">
            <h1 className="m-0 display-5 text-uppercase">
              <span className="text-primary">News</span>Room
            </h1>
          </Link>
          <Navbar.Toggle aria-controls="navbarCollapse" />
          <Navbar.Collapse
            id="navbarCollapse"
            className="justify-content-between px-0 px-lg-3"
          >
            <Nav className="mr-auto py-0">
              <Nav.Link href="/" className={isCurrentPath("/") ? "active" : ""}>
                Home
              </Nav.Link>
              <Nav.Link
                href="/news"
                className={isCurrentPath("/news") ? "active" : ""}
              >
                News
              </Nav.Link>
              <Nav.Link
                className={isCurrentPath("/contact-us") ? "active" : ""}
                href="/contact-us"
              >
                Contact Us
              </Nav.Link>
              {error ? (
                <>
                  <Nav.Link
                    className={isCurrentPath("/login") ? "active" : ""}
                    href={`/login`}
                  >
                    Login
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    className={isCurrentPath("/profile") ? "active" : ""}
                    href={`/profile`}
                  >
                    Profile
                  </Nav.Link>
                  <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                </>
              )}
            </Nav>
            <Search />
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}
