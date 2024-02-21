import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Popular() {
  return (
    <Row className="mb-3">
      <Col className="col-12">
        <div class="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
          <h3 class="m-0">Popular</h3>
          <Link
            class="text-secondary font-weight-medium text-decoration-none"
            to={"/"}
          >
            View All
          </Link>
              </div>
              
      </Col>
    </Row>
  );
}
