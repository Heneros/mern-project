import { apiSlice } from "./apiSlice";
import { USERS_URL, AUTH_URL } from "../../utils/constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login: builder.mutation({
    //   query: (data) => ({
    //     url: `${AUTH_URL}`,
    //     // method: "GET",
    //     // body: data,
    //     // credentials: "include",
    //   }),
    // }),

    getProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        providesTags: ["User"],
        credentials: "include",
        keepUnusedDataFor: 5,
      }),
    }),
    updateProfile: builder.mutation({
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
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
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
    getFavorites: builder.query({
      query: (data) => ({
        url: `${USERS_URL}/getfavorites/${data.userId}`,
      }),
      providesTags: ["User"],
      credentials: "include",
      keepUnusedDataFor: 5,
    }),

    deleteFavorite: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/deletefavorite/${data.userId}/${data.postId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    addFavorites: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/addfavorite/${data.userId}/${data.postId}`,
        method: "POST",
        credentials: "include",
      }),
    }),
    feedback: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/feedback`,
        method: "POST",
        body: data,
        // credentials: "include",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useDeleteUserMutation,
  useLoginMutation,
  useUpdateProfileMutation,

  useGetUserDetailsQuery,
  useGetUsersQuery,
  useGetUsersPublicQuery,
  useUpdateUserMutation,
  useGetProfileQuery,
  useGetFavoritesQuery,
  useDeleteFavoriteMutation,
  useAddFavoritesMutation,
  useFeedbackMutation,
} = userApiSlice;
