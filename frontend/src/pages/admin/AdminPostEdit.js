import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Link, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Col, Row, Button, Table } from "react-bootstrap";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

import {
  useDeletePostMutation,
  useGetPostDetailsQuery,
  useGetPostsQuery,
  useUpdatePostMutation,
  useUploadPostImageMutation,
} from "../../redux/slices/postsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Breadcrumbs from "../../components/Breadcrumbs";
import NavMenu from "../../components/Profile/NavMenu";
import { useGetProfileQuery } from "../../redux/slices/userApiSlice";

export default function AdminPostEdit() {
  const { id: postId } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const {
    data: posts,
    isLoading,
    refetch,
    error,
  } = useGetPostDetailsQuery({ postId });

  const [updatePost, { isLoading: loadingPost }] = useUpdatePostMutation();
  const [uploadPostImage, { isLoading: loadingImgUpload }] =
    useUploadPostImageMutation();

  return <div></div>;
}
