import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import SidebarSocial from "../components/Homepage/SidebarSocial";
import Newsletter from "../components/Homepage/Newsletter";

import Trending from "../components/Homepage/Trending";
import AllPostsTag from "../components/AllPostsTag";

export default function Tag() {
  return (
    <Container>
      <Row>
        <Col lg="8">
          <AllPostsTag />
        </Col>
        <Col lg="4">
          <SidebarSocial />
          <Newsletter />
          <Trending />
        </Col>
      </Row>
    </Container>
  );
}
