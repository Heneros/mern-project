import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Formik } from "formik";
import { Form, Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  strengthColor,
  strengthIndicator,
} from "../utils/password-strength"
import Google from "../styles/img/google.png";
import FormContainer from "./../components/FormContainer";
import {
  useGetProfileQuery
} from "../redux/slices/userApiSlice";
import { useRegisterMutation } from "../redux/slices/authApiSlice";

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;


export default function Registration() {

  const navigate = useNavigate();
  const goBack = () => navigate('/login');
  // useEffect(() => {
  //   if (dataProfile) {
  //     navigate("/");
  //   }
  // }, []);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const [registerUser, { data, isLoading, isSuccess }] = useRegisterMutation();

  const google = () => {
    window.open("http://localhost:3000/api/v1/auth/google", "_self");
  };


  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/");
        const message = data?.message;
        toast.success(message);
      }, 5000)

    }
  }, [data, isSuccess, navigate]);


  return (
    <>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          passwordConfirm: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .matches(
              USERNAME_REGEX,
              "Should be between 4 and 24 characters. Letters, numbers, underscores, hyphens allowed. Special characters not allowed!"
            )
            .required("A username is required"),
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string()
            .max(255)
            .required("Password is required"),
          passwordConfirm: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords Must Match")
            .required("Please confirm your password"),
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          try {
            await registerUser(values).unwrap();
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err) {
            const message = err.data.message;
            console.log(message)
            toast.error(message);
            setStatus({ success: false });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          values,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (<FormContainer>
          <h1>Registration</h1>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Form.Group className="my-2" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={values.username}
                name="username"
                onChange={handleChange}
                isInvalid={touched.username && errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email text@mail.com"
                value={values.email}
                name="email"
                onChange={handleChange}
                isInvalid={touched.email && errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={values.password}
                name="password"
                onChange={handleChange}
                isInvalid={touched.password && errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="my-2" controlId="passwordConfirm">
              <Form.Label> Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={values.passwordConfirm}
                name="passwordConfirm"
                onChange={handleChange}
                isInvalid={touched.passwordConfirm && errors.passwordConfirm}
              />
              <Form.Control.Feedback type="invalid">
                {errors.passwordConfirm}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </form>
          <Row className="py-3">

            <Col>
              <Button
                className="loginButton google"
                onClick={google}
              >
                <img
                  src={Google}
                  alt="google icon"
                  className="icon"
                />
              </Button>
            </Col>
          </Row>
          <Row className="py-1">
            <Col>
              Have an account?
              <Link to={'/login'}>Login</Link>
            </Col>
          </Row>
          <Row className="py-1">
            <Col>
              <Link
                onClick={goBack}
              >
                Go Back to login
              </Link>
            </Col>
          </Row>
        </FormContainer>)}
      </Formik>
    </>)
}