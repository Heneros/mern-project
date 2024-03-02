import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";

import Google from "../styles/img/google.png";
import FormContainer from "../components/FormContainer";
import {
  useGetProfileQuery,
  // useAuthGoogleMutation,
  // useAuthGoogleQuery,
  useLoginMutation,
} from "../redux/slices/userApiSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { data: dataProfile, errorProfile, isLoading } = useGetProfileQuery();

  // const [authGoogle] = useAuthGoogleMutation();

  // const google = (e) => {
  //   e.preventDefault();
  //   // console.log(123);
  //   try {
  //     dispatch(authGoogle());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const google = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  useEffect(() => {
    if (dataProfile) {
      
      // navigate("/");
      // window.location.reload();
  
    }
  }, [dataProfile, navigate]);

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
          <Button className="loginButton google" onClick={google}>
            <img src={Google} alt="google icon" className="icon" />
          </Button>
        </Col>
      </Row>
      <Row className="py-3">
        <Col>
          Dont have an account? <Link to={"/registration"}>Registration</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}
