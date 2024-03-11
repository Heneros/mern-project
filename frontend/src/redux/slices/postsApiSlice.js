import { POSTS_URL } from "../../utils/constants";
import { apiSlice } from "./apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ pageNumber }) => ({
        url: `${POSTS_URL}`,
        params: { pageNumber },
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
    uploadPostImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getTags: builder.query({
      query: () => ({
        url: `${POSTS_URL}/toptags`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Post"],
    }),

    getCategories: builder.query({
      query: () => ({
        url: `${POSTS_URL}/topcategories`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostDetailsQuery,
  useGetPostsQuery,
  useUpdatePostMutation,
  useGetCategoriesQuery,
  useGetTagsQuery,
  useUploadPostImageMutation,
} = postsApiSlice;
