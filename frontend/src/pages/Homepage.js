import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import MainNewsSlider from "../components/Homepage/MainNewsSlider";
import CategoriesSideBlock from "../components/Homepage/CategoriesSideBlock";
import TopNewsCarousel from "../components/Homepage/TopNewsCarousel";
import Featured from "../components/Homepage/Featured";
import Technology from "../components/Homepage/Technology";
import Business from "../components/Homepage/Business";
import Entertainment from "../components/Homepage/Entertainment";
import Sports from "../components/Homepage/Sports";
import Popular from "../components/Homepage/Popular";
import SidebarSocial from "../components/Homepage/SidebarSocial";
import Newsletter from "../components/Homepage/Newsletter";
import Latest from "../components/Homepage/Latest";
import Trending from "../components/Homepage/Trending";

import { useGetPostsQuery } from "../redux/slices/postsApiSlice";
export default function Homepage() {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetPostsQuery({ pageNumber });

  return (
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
        <Col className="py-3" lg="6" md="12">
          <Technology />
        </Col>
        <Col className="py-3" lg="6" md="12">
          <Business />
        </Col>
        <Col className="py-3" lg="6" md="12">
          <Entertainment />
        </Col>
        <Col className="py-3" lg="6" md="12">
          <Sports />
        </Col>
      </Row>
      <Row>
        <Col lg="8">
          <Popular />
        </Col>
        <Col lg="4">
          <SidebarSocial />
          <Newsletter />
        </Col>
      </Row>
      <Row>
        <Col lg="8">
          <Latest data={data} error={error} isLoading={isLoading} />
        </Col>
        <Col lg="4">
          <Trending data={data} error={error} isLoading={isLoading} />
        </Col>
      </Row>
    </Container>
  );
}
