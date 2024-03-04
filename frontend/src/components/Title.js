import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Title({ name }) {
  return (
    <Col className="col-12">
      <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
        <h3 className="m-0" style={{ textTransform: "capitalize" }}>
          {name}
        </h3>
        <Link to={`/news`}>View All</Link>
      </div>
    </Col>
  );
}
