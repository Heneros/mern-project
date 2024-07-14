import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useResendVerifyEmailMutation } from '../redux/slices/authApiSlice';

const ResendEmailTokenPage = () => {
   const navigate = useNavigate();
   const goBack = () => navigate(-1);

   const[resendVerifyEmail, {data, isLoading, isSuccess}] = useResendVerifyEmailMutation();

   useEffect(() => {
    if (isSuccess) {
      navigate("/");
      const message = data.message;
      toast.success(message);
    }
  }, [data, isSuccess, navigate]);
    return (
    <div>
      123
    </div>
  )
}

export default ResendEmailTokenPage
