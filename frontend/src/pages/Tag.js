import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import SidebarSocial from "../components/Homepage/SidebarSocial";
import Newsletter from "../components/Homepage/Newsletter";

import Trending from "../components/Homepage/Trending";
import AllPostsTag from "../components/AllPostsTag";

import Paginate from "../components/Paginate";
import {
  useGetAllQuery,
  useGetPostsQuery,
} from "../redux/slices/postsApiSlice";

export default function Tag() {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetAllQuery({ pageNumber });

  return (
    <Container>
      <Row>
        <Col lg="8">
          <AllPostsTag data={data} error={error} isLoading={isLoading} />
        </Col>
        <Col lg="4">
          <SidebarSocial />
          <Newsletter />
          <Trending data={data} error={error} isLoading={isLoading} />
        </Col>
      </Row>
    </Container>
  );
}
