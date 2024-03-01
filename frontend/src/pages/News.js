import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import SidebarSocial from "../components/Homepage/SidebarSocial";
import Newsletter from "../components/Homepage/Newsletter";
import Latest from "../components/Homepage/Latest";
import Trending from "../components/Homepage/Trending";
import AllPosts from "../components/AllPosts";

export default function News() {
  return (
    <Container>
      <Row>
        <Col lg="8">
          <AllPosts />
        </Col>
        <Col lg="4">
          <SidebarSocial />
          <Newsletter />
          <Trending />
        </Col>
      </Row>
      {/* <Row>
        <Col lg="8">

        </Col>
        <Col lg="4">
    
        </Col>
      </Row> */}
    </Container>
  );
}
