import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import MainNewsSlider from "../components/Homepage/MainNewsSlider";
import CategoriesSideBlock from "../components/Homepage/CategoriesSideBlock";

export default function Homepage() {
  return (
    <Container className="py-3">
      <Container>
        <Row>
          <Col className="col-lg-8">
            <MainNewsSlider />
          </Col>
          <Col className="col-lg-4">
            <CategoriesSideBlock />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
