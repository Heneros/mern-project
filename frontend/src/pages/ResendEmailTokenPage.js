import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik } from "formik";
import * as Yup from "yup";
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { MdOutgoingMail } from 'react-icons/md';
// import{ SendIcon } from 'react-bootstrap-icons';
import { useResendVerifyEmailMutation } from '../redux/slices/authApiSlice';
import FormContainer from '../components/FormContainer';

const ResendEmailTokenPage = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [resendVerifyEmail, { data, isLoading, isSuccess }] = useResendVerifyEmailMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      const message = data.message;
      toast.success(message);
    }
  }, [data, isSuccess, navigate]);
  return (
    <>
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
            await resendVerifyEmail(values).unwrap()
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err) {
            const message = err.data.message;
            toast.error(message);
            setStatus({ success: false });
            setSubmitting(false);
          }
        }}
      >
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
                  <MdOutgoingMail className="auth-svg" />
                  <h1>Resend Email</h1>
                  <hr />
                </div>
                {isLoading ? (
                  <Spinner animation="border" />
                ) : (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="email-signup">Email Address*</Form.Label>
                      <Form.Control
                        id="email-signup"
                        type="email"
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        isInvalid={touched.email && errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="success"
                      size="lg"
                      className="w-100 mt-3 mb-2"
                      disabled={!values.email}
                    >
                      Resend Verification Email
                    </Button>
                    <Button
                      variant="warning"
                      size="md"
                      onClick={goBack}
                      className="w-100"
                    >
                      Go Back
                    </Button>
                  </>
                )}
              </Form>
            </FormContainer>
          </>
        )}
      </Formik>
    </>
  )
}

export default ResendEmailTokenPage
