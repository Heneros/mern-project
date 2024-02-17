import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import MainNewsSlider from "../components/Homepage/MainNewsSlider";
import CategoriesSideBlock from "../components/Homepage/CategoriesSideBlock";
import TopNewsCarousel from "../components/Homepage/TopNewsCarousel";

export default function Homepage() {
  return (
    <Container className="">
      <Container>
        <TopNewsCarousel />
        <Row>
          <Col lg="8" md="12">
            <MainNewsSlider />
          </Col>
          <Col lg="4" md="12">
            <CategoriesSideBlock />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
