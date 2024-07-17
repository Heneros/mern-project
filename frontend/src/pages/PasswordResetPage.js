import React from 'react'
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Container, Form, Row, Button, Spinner } from 'react-bootstrap';
import {
  strengthColor,
  strengthIndicator,
} from "../utils/password-strength"
import { useResetPasswordMutation } from "../redux/slices/authApiSlice"
import FormContainer from '../components/FormContainer';

const PasswordResetPage = () => {
    const navigate = useNavigate();
      const [level, setLevel] = useState();

   const [resetPassword, { data, isLoading, isSuccess }] =
    useResetPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      const message = data.message;
      toast.success(message);
    }
  }, [data, isSuccess, navigate]); 
  
    const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };
  useEffect(() => {
    changePassword("");
  }, []);
  return (
    <Formik    initialValues={{ password: "", passwordConfirm: "" }}
        validationSchema={Yup.object().shape({
          password: Yup.string().max(255).required("Password is required"),
          passwordConfirm: Yup.string()

            .oneOf([Yup.ref("password")], "Passwords Must Match")
            .required("Please confirm your password"),
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
        }}>
      PasswordResetPage
    </Formik>
  )
}

export default PasswordResetPage
