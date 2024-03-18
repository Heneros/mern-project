import { POSTS_URL } from "../../utils/constants";
import { apiSlice } from "./apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ pageNumber }) => ({
        url: POSTS_URL,
        params: { pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Post"],
    }),
    getPostDetails: builder.query({
      query: ({ postId }) => ({
        url: `${POSTS_URL}/${postId}`,
      }),
      providesTags: ["Post"],
      keepUnusedDataFor: 5,
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      providesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/${data.postId}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      providesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
        method: "DELETE",
        credentials: "include",
      }),
      providesTags: ["Post"],
    }),
    uploadPostImage: builder.mutation({
      query: (data) => ({
        url: "/api/upload",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostDetailsQuery,
  useGetPostsQuery,
  useUpdatePostMutation,
  useUploadPostImageMutation,
} = postsApiSlice;
