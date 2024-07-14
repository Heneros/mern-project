import { apiSlice } from './apiSlice';
import { AUTH_URL } from '../../utils/constants';
import { logout } from './auth';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: `${AUTH_URL}/login`,
                   method: "POST",
        body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/logout`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    dispatch(logout());
                    dispatch(apiSlice.util.resetApiState());
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/register`,
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
        }),
        resendVerifyEmail: builder.mutation({
            query: (userEmail) => ({
                url: `${AUTH_URL}/resend_email_token`,
                method: 'POST',
                body: userEmail,
            }),
        }),
        passwordResetRequest: builder.mutation({
                query: (formData) => ({
        url: `${AUTH_URL}/reset_password_request`,
        method: "POST",
        body: formData,
      }),
        }),
                resetPassword: builder.mutation({
                query: (formData) => ({
        url: `${AUTH_URL}/reset_password`,
        method: "POST",
        body: formData,
      }),
        }),
    }),
});

export const { useLoginUserMutation, useLogoutMutation, usePasswordResetRequestMutation, useResetPasswordMutation, useRegisterMutation, useResendVerifyEmailMutation } = authApiSlice;
