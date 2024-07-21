import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Col, Row, Form, Button } from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../redux/slices/userApiSlice";
import Breadcrumbs from "../components/Breadcrumbs";
import NavMenu from "../components/Profile/NavMenu";

export default function Profile() {
  const { data: dataProfile, error, isLoading } = useGetProfileQuery();
  // console.log(dataProfile?.isAdmin);
  // console.log(error);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useUpdateProfileMutation();
  // const idUser = dataProfile?._id;
  console.log(dataProfile?._id);

  const navigate = useNavigate();
  useEffect(() => {
    if (!dataProfile && !isLoading) {
      //  navigate("/login");
    } else {
      setUsername(dataProfile?.username);
      setEmail(dataProfile?.email);
    }
  }, [dataProfile, navigate, isLoading]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords dont match");
    } else {
      try {
        await updateProfile({
          _id: dataProfile?._id,
          username,
          email,
          password,
        }).unwrap();
        console.log("Success success updated");
      } catch (error) {
        console.log(error?.message || error);
      }
    }
  };
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message>{error?.message}</Message>;
  }
  if (loadingUpdateProfile) {
    return loadingUpdateProfile && <Loader />;
  }

  return (
    <>
      <Breadcrumbs />
      <Row className="my-5">
        <NavMenu dataProfile={dataProfile} />
        <Col md={9}>
          <h2>User Profile</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="username">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
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

            <Form.Group className="my-2" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}
