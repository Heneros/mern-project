import React from 'react'
import { Formik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Container, Form, Row, Button, Spinner } from 'react-bootstrap';
import { usePasswordResetRequestMutation } from '../redux/slices/authApiSlice';
import FormContainer from '../components/FormContainer';

const PasswordResetRequestPage = () => {
   const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const [passwordResetRequest, { data, isLoading, isSuccess }] =
    usePasswordResetRequestMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      const message = data.message;
      toast.success(message);
    }
  }, [data, isSuccess, navigate]);

  

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
      })}
      onSubmit={async (values, { setStatus, setSubmitting }) => {
        try {
          await passwordResetRequest(values).unwrap();
          setStatus({ success: true });
          setSubmitting(false);
        } catch (err) {
          const message = err.data.message;
          toast.error(message);
          setStatus({ success: false });
          setSubmitting(false);
        }
      }}>
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <>
            <FormContainer>
                 <Form noValidate onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            <h1>Password Reset Request </h1>
            <hr />
          </div>
          {isLoading ? (
            <Spinner animation="border" />
          ) : (
            <>
              <Form.Group className="my-2" controlId="email">
 <Form.Label>Email</Form.Label>
 <Form.Control
            type="email"
            placeholder="Enter email. Example bond@gmail.cpm"
            value={values.email}
            name="email"
    onChange={handleChange}
                isInvalid={touched.email && errors.email}
          />
 <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
              </Form.Group>
              <Row className="d-flex justify-content-between">
            <Button type="submit" variant="primary"  disabled={!values.email}>
          Submit
          </Button>
            <Button
                variant="warning"
              
                onClick={goBack}

              >
                Go Back
              </Button>

              </Row>
            </>
          )}
        </Form>
              </FormContainer>
        </>
      )}
    </Formik>
  );
}

export default PasswordResetRequestPage
