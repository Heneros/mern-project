import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Form, Button } from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../redux/slices/userApiSlice";
import Breadcrumbs from "../components/Breadcrumbs";
import NavMenu from "../components/Profile/NavMenu";
import { toast } from "react-toastify";

export default function Profile() {
  const { data: dataProfile, error, isLoading } = useGetProfileQuery();
  // console.log(dataProfile?.isAdmin);
  // console.log(error);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile, { isLoading: loadingUpdateProfile },] =
    useUpdateProfileMutation();

  const navigate = useNavigate();
  useEffect(() => {
    if (!dataProfile && !isLoading) {
      navigate("/login");
    } else {
      setUsername(dataProfile?.username);
      setEmail(dataProfile?.email);
    }
  }, [dataProfile, navigate, isLoading]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      try {
        await updateProfile({
          _id: dataProfile?._id,
          username,
          email,
          password,
        }).unwrap();
        // console.log("Success success updated");
        toast.success(`${username} successfully updated`)
      } catch (error) {
        const { data } = error
        console.log(data.message);

        toast.error(data.message)
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
          <h2>Change User Profile Data</h2>
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

            <Button type="submit" className="pt-2" variant="primary">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}
