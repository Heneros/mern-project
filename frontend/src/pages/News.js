import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import SidebarSocial from "../components/Homepage/SidebarSocial";
import Newsletter from "../components/Homepage/Newsletter";
import Latest from "../components/Homepage/Latest";
import Trending from "../components/Homepage/Trending";
import AllPosts from "../components/AllPosts";
import Paginate from "../components/Paginate";
import { useGetPostsQuery } from "../redux/slices/postsApiSlice";

export default function News() {
  // const { id } = useParams();
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetPostsQuery({ pageNumber });
  // console.log(data);
  const currentPage = 1;
  return (
    <Container>
      <Row>
        <Col lg="8">
          <AllPosts data={data} error={error} isLoading={isLoading} />
        </Col>
        <Col lg="4">
          <SidebarSocial />
          <Newsletter />
          <Trending data={data} error={error} isLoading={isLoading} />
        </Col>
        <Paginate pages={data?.pages} page={currentPage} isAdmin={true} />
      </Row>
    </Container>
  );
}
