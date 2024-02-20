import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import MainNewsSlider from "../components/Homepage/MainNewsSlider";
import CategoriesSideBlock from "../components/Homepage/CategoriesSideBlock";
import TopNewsCarousel from "../components/Homepage/TopNewsCarousel";
import Featured from "../components/Homepage/Featured";
import Technology from "../components/Homepage/Technology";
import Business from "../components/Homepage/Business";

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
        <Row className="py-3">
          <Col md="12">
            <Featured />
          </Col>
        </Row>
        <Row className="py-3">
          <Col lg="6">
            <Technology />
          </Col>
          <Col lg="6">
            <Business />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
