import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../../utils/constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.query({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
      }),
      providesTags: ["User"],
      credentials: "include",
      keepUnusedDataFor: 5,
    }),
    getUsersPublic: builder.query({
      query: () => ({
        url: `${USERS_URL}/allusers`,
      }),
    }),
    // authGoogle: builder.mutation({
    //   query: () => ({
    //     url: `/auth/google`,
    //     method: "GET",
    //   }),
    //   providesTags: ["User"],
    //   keepUnusedDataFor: 5,
    // }),
  }),
});

export const {
  useRegisterMutation,
  useDeleteUserMutation,
  useLoginMutation,
  useProfileMutation,
  useLogoutMutation,
  useGetUserDetailsQuery,
  useGetUsersQuery,
  useGetUsersPublicQuery,
  useUpdateUserQuery,
  // useAuthGoogleMutation,
} = userApiSlice;
