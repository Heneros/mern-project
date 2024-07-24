import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Spinner, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Google from '../styles/img/google.png';
import FormContainer from '../components/FormContainer';
// import { useGetProfileQuery } from '../redux/slices/userApiSlice';
import { useLoginUserMutation } from '../redux/slices/authApiSlice';
import { logIn } from '../redux/slices/auth';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { data: dataProfile, errorProfile } = useGetProfileQuery();
    const [loginUser, { isLoading, isSuccess, errorLog }] =
        useLoginUserMutation();

    const google = () => {
        window.open("http://localhost:3000/api/v1/auth/google", "_self");
    };

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
    }, [isSuccess, navigate]);

    return (
        <Formik
            initialValues={{ email: '', password: '', submit: null }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email('Must be a valid email')
                    .max(255)
                    .required('Email is required'),
                password: Yup.string()
                    .max(255)
                    .required('Password is required'),
            })}
            onSubmit={async (values, { setStatus, setSubmitting }) => {
                try {
                    const getUserCredentials = await loginUser(values).unwrap();
                    //console.log(getUserCredentials);
                    dispatch(logIn({ ...getUserCredentials }));
                    setSubmitting(false);
                    setStatus({ success: true });
                } catch (err) {
                    console.log(err)
                    const message = err.data.message;
                    toast.error(err.data.message || err || message);
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
            }) => (
                <FormContainer>
                    <h1>Login</h1>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        {errorLog && <p style={{ color: "red" }}>{errorLog} </p>}
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            <>
                                <Form.Group className="my-2" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email email@example.com"
                                        value={values.email}
                                        name="email"
                                        onChange={handleChange}
                                        isInvalid={
                                            touched.email && errors.email
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                    className="my-2"
                                    controlId="password"
                                >
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
                                            value={values.password}
                                            name="password"
                                            onChange={handleChange}
                                            isInvalid={
                                                touched.password &&
                                                errors.password
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Button type="submit" disabled={isSubmitting} variant="primary">
                                    Submit
                                </Button>
                            </>
                        )}
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
                    <Row className="py-3">
                        <Col>
                            Don't have an account?{' '}
                            <Link to={'/registration'}>Registration</Link>
                        </Col>
                    </Row>
                    <Row className="py-1">
                        <Col>
                            Forgot Password?{' '}
                            <Link to={'/reset_password_request'}>Click Here to Reset it</Link>
                        </Col>
                    </Row>
                    <Row className="py-1">
                        <Col>
                            Didn't get the verification email?
                            <Link to={'/resend'}>
                                Resend Email</Link>
                        </Col>
                    </Row>
                </FormContainer>
            )}
        </Formik>
    );
}
