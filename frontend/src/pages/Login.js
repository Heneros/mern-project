import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../redux/slices/userApiSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  

  const [login] = useLoginMutation();
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }).unwrap();
      setError("");
      navigate("/");
    } catch (err) {
      // console.log(err);
      const { data: errorMessage } = err;
      setError(errorMessage.message);
      console.log(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Login</h1>
      <Form onSubmit={submitHandler}>
        {error && <p style={{ color: "red" }}>{error} </p>}
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

        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Dont have an account? <Link to={"/registration"}>Registration</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}
