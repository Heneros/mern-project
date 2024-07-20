import React from 'react';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Container, Form, Row, Button, Spinner } from 'react-bootstrap';
import { strengthColor, strengthIndicator } from '../utils/password-strength';
import { useResetPasswordMutation } from '../redux/slices/authApiSlice';
import FormContainer from '../components/FormContainer';

const PasswordResetPage = () => {
    const navigate = useNavigate();
    const [level, setLevel] = useState();

    const goBack = () => navigate(-1);

    const [resetPassword, { data, isLoading, isSuccess }] =
        useResetPasswordMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate('/login');
            const message = data.message;
            toast.success(message);
        }
    }, [data, isSuccess, navigate]);

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };
    useEffect(() => {
        changePassword('');
    }, []);
    return (
        <Formik
            initialValues={{ password: '', passwordConfirm: '' }}
            validationSchema={Yup.object().shape({
                password: Yup.string()
                    .max(255)
                    .required('Password is required'),
                passwordConfirm: Yup.string()
                    .oneOf([Yup.ref('password')], 'Passwords Must Match')
                    .required('Please confirm your password'),
            })}
            onSubmit={async (values, { setStatus, setSubmitting }) => {
                try {
                    await resetPassword(values).unwrap();
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
                <FormContainer>
                    <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <div className="text-center mb-4">
                            <h1>Reset Password</h1>
                            <p>
                                Enter your new password to finish the reset
                                process
                            </p>
                            <hr />
                        </div>
                        {isLoading ? (
                            <Spinner animation="border" />
                        ) : (
                            <>
                                <Form.Group
                                    className="my-2"
                                    controlId="password"
                                >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={values.password}
                                        name="password"
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        isInvalid={
                                            touched.password && errors.password
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                    className="my-2"
                                    controlId="passwordConfirm"
                                >
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm password"
                                        value={values.passwordConfirm}
                                        name="passwordConfirm"
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        isInvalid={
                                            touched.passwordConfirm && errors.passwordConfirm
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.passwordConfirm}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Row className="d-flex justify-content-between">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={!values.password}
                                    >
                                        Submit
                                    </Button>
                                    <Button variant="warning" onClick={goBack}>
                                        Go Back
                                    </Button>
                                </Row>
                            </>
                        )}
                    </Form>
                </FormContainer>
            )}
        </Formik>
    );
};

export default PasswordResetPage;
