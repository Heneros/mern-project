import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Link, useParams, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Col, Row, Form, Button } from "react-bootstrap";
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
  const { data: dataProfile } = useGetProfileQuery();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const {
    data: post,
    isLoading,
    refetch,
    err,
  } = useGetPostDetailsQuery({ postId });

  if (isLoading) {
    console.log("Loading");
  }

  if (!err) {
    console.log("Working");
  }
  const [updatePost, { isLoading: loadingPost }] = useUpdatePostMutation();
  const [uploadPostImage, { isLoading: loadingImgUpload }] =
    useUploadPostImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updatePost({
        postId,
        title,
        category,
        tag,
        imageUrl,
        content,
      }).unwrap();
      refetch();
      console.log("Success");
    } catch (err) {
      console.log(err?.message);
    }
  };

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setCategory(post.category);
      setImageUrl(post.imageUrl);
      setTag(post.tag);
      setContent(post.content);
    }
  }, [post]);

  return (
    <>
      <Breadcrumbs />
      <Row className="my-5">
        <NavMenu dataProfile={dataProfile} />
        <Col md={9}>
          {isLoading ? (
            <Loader />
          ) : err ? (
            <Message>{err?.message}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="title"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button
                type="submit"
                variant="primary"
                style={{ marginTop: "1rem" }}
              >
                Update
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </>
  );
}
