import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import SidebarSocial from "../components/Homepage/SidebarSocial";
import Newsletter from "../components/Homepage/Newsletter";

import Trending from "../components/Homepage/Trending";
import AllPostsCategory from "../components/AllPostsCategory";

import { useGetPostsQuery } from "../redux/slices/postsApiSlice";
import Paginate from "../components/Paginate";
export default function Category() {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetPostsQuery({ pageNumber });

  return (
    <Container>
      <Row>
        <Col lg="8">
          <AllPostsCategory data={data} error={error} isLoading={isLoading} />
        </Col>
        <Col lg="4">
          <SidebarSocial />
          <Newsletter />
          <Trending data={data} error={error} isLoading={isLoading} />
        </Col>
        <Paginate pages={data?.pages} page={data?.page} isAdmin={true} />
      </Row>
    </Container>
  );
}
