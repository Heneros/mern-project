import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";

import Google from "../styles/img/google.png";
import FormContainer from "./../components/FormContainer";
import {
  useGetProfileQuery,
  
} from "../redux/slices/userApiSlice";
import { useRegisterMutation } from "../redux/slices/authApiSlice";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { data: dataProfile, errorProfile, isLoading } = useGetProfileQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (dataProfile) {
      navigate("/");
    }
  }, []);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const[registerUser] = useRegisterMutation()
  const google = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password don't match");
    } else {
      try {
        await registerUser({ username, email, password }).unwrap();
        // const result = await register({ username, email, password });

        navigate("/");
      } catch (err) {
        const { data: errorMessage } = err;
        setError(errorMessage.message);
        // console.log(err);
        console.log(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        {error && <p style={{ color: "red" }}>{error} </p>}
        <Form.Group className="my-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <Form.Group className="my-2" controlId="Confirmpassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          <Button className="loginButton google" onClick={google}>
            <img src={Google} alt="google icon" className="icon" />
          </Button>
        </Col>
      </Row>
      <Row className="py-3">
        <Col>
          Already have an account? <Link to={"/login"}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}
