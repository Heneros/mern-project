import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Col, Row } from "react-bootstrap";

import { useGetProfileQuery } from "../redux/slices/userApiSlice";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Profile() {
  const { data: dataProfile, error, isLoading } = useGetProfileQuery();
  console.log(dataProfile?.isAdmin);
  console.log(error);
  const navigate = useNavigate();

  useEffect(() => {
    if (!dataProfile && !isLoading) {
      navigate("/login");
    }
  });
  return (
    <>
      <Breadcrumbs />
      <Row className="my-5">
        {dataProfile?.isAdmin ? (
          <>
            <Col md={3}>
              <Nav className="flex-column">
                <Nav.Link href="/admin/userslist">Users List</Nav.Link>
                <Nav.Link href="/admin/posts-list">Posts List</Nav.Link>
                <Nav.Link href="/admin/create-post">Create Post</Nav.Link>
              </Nav>
            </Col>
          </>
        ) : (
          <></>
        )}

        <Col md={9}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
          laboriosam iusto, earum temporibus nisi reprehenderit voluptatibus
          similique voluptas veniam obcaecati et laborum voluptatem error
          possimus ullam expedita quasi unde id dolor deleniti repellat saepe.
          Molestiae aspernatur, quo vero expedita voluptates recusandae
          veritatis quis itaque vel nesciunt odio libero. Quos et eaque
          assumenda ullam sint dolorem corporis voluptatum reiciendis enim ipsa.
          Ipsa alias adipisci nam natus vero? Deleniti aperiam quaerat quae quo
          tenetur! Cum, incidunt, qui nobis neque veritatis alias dolore itaque
          atque ab non, voluptas quas earum quaerat vitae debitis et nostrum
          officia! Eaque aliquam magnam neque vel asperiores rerum fugiat facere
          explicabo! Cupiditate impedit, temporibus illo quas neque est sequi
          molestias cumque maxime perferendis nulla ut, earum maiores soluta,
          assumenda facere.
        </Col>
      </Row>
    </>
  );
}
