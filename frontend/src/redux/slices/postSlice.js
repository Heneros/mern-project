import { POSTS_URL } from "../../utils/constants";
import { apiSlice } from "../store";

export const postsApiSlice = apiSlice.injectEndPoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: `${POSTS_URL}`,
      }),
      providesTags: ["Post"],
      keepUnusedDataFor: 5,
    }),
    getPostDetails: builder.query({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
      }),
      providesTags: ["Post"],
      keepUnusedDataFor: 5,
    }),
    createPost: builder.mutation({
      query: () => ({
        url: `${POSTS_URL}`,
        method: "POST",
        credentials: "include",
      }),
      providesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
        method: "PUT",
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
  }),
});

export const {
  useGetPostQuery,
  useGetPostDetailsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postsApiSlice;
