import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetProfileQuery,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../redux/slices/userApiSlice";
import { Nav, Col, Row, Form, Button, Table } from "react-bootstrap";

import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Breadcrumbs from "../../components/Breadcrumbs";
import NavMenu from "../../components/Profile/NavMenu";
import FormContainer from "../../components/FormContainer";

export default function UserEdit() {
  const { id: userId } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    err,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  const { data: dataProfile } = useGetProfileQuery();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, username, email, isAdmin });
      refetch();
      navigate("/admin/users-list");
    } catch (err) {
      alert(err?.message);
    }
  };

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);
  return (
    <>
      <Link to="/admin/users-list" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row className="my-5">
        <NavMenu dataProfile={dataProfile} />
        <Col md={9}>
          {isLoading ? (
            <Loader />
          ) : err ? (
            <Message>{err?.message}</Message>
          ) : (
            <>
              <h1>Edit User</h1>
              {loadingUpdate && <Loader />}
              {isLoading ? (
                <Loader />
              ) : err ? (
                <Message>{err?.message}</Message>
              ) : (
                <>
                  <Form onSubmit={submitHandler}>
                    <Form.Group className="my-2" controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId="email">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId="isadmin">
                      <Form.Check
                        type="checkbox"
                        label="Is Admin"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                      ></Form.Check>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                      Update
                    </Button>
                  </Form>
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
