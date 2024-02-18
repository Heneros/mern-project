import React from "react";
import { Link } from "react-router-dom";
import Search from "./Homepage/Search";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Container,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import HeaderDate from "./HeaderDate";
import TrendingCarousel from "./TrendingCarousel";

export default function Header() {
  return (
    <>
      <div class="container-fluid">
        <div class="row align-items-center bg-light px-lg-5">
          <div class="col-12 col-md-8">
            <div class="d-flex justify-content-between">
              <div
                class="bg-primary text-white text-center py-2"
                style={{ width: "100px;" }}
              >
                Trending
              </div>
              <TrendingCarousel />
            </div>
          </div>
          <HeaderDate />
        </div>
        <div class="row align-items-center py-2 px-lg-5">
          <div class="col-lg-4">
            <Link to={`/`} class="navbar-brand d-none d-lg-block">
              <h1 class="m-0 display-5 text-uppercase">
                <span class="text-primary">News</span>Room
              </h1>
            </Link>
          </div>
          <div class="col-lg-8 text-center text-lg-right">
            <img class="img-fluid" src="img/ads-700x70.jpg" alt="" />
          </div>
        </div>
      </div>

      <div className="container-fluid p-0 mb-3">
        <Navbar bg="light" expand="lg" className="py-2 py-lg-0 px-lg-5">
          <Navbar.Brand href="#" className="d-block d-lg-none">
            <h1 className="m-0 display-5 text-uppercase">
              <span className="text-primary">News</span>Room
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarCollapse" />
          <Navbar.Collapse
            id="navbarCollapse"
            className="justify-content-between px-0 px-lg-3"
          >
            <Nav className="mr-auto py-0">
              <Nav.Link href="#" className="active">
                Home
              </Nav.Link>
              <Nav.Link href="category.html">Categories</Nav.Link>
              <Nav.Link href="single.html">Single News</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#">Menu item 1</NavDropdown.Item>
                <NavDropdown.Item href="#">Menu item 2</NavDropdown.Item>
                <NavDropdown.Item href="#">Menu item 3</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="contact.html">Contact</Nav.Link>
            </Nav>
            <Search />
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}
