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
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    data: post,
    isLoading,
    refetch,
    err,
  } = useGetPostDetailsQuery({ postId });

  const [updatePost, { isLoading: loadingPost }] = useUpdatePostMutation();
  const [uploadPostImage, { isLoading: loadingImgUpload }] =
    useUploadPostImageMutation();

  const navigate = useNavigate();

  if (loadingPost && loadingImgUpload) {
    console.log("Loading");
  }
  console.log(post);
  
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
      navigate("/admin/posts-list");
      // alert("Success");
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

  const uploadFileHandler = async (e) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("imageUrl", e.target.files[0]);
    try {
      // const file = e.target.files[0];
      // await uploadPostImage(formData).unwrap();
      const res = await uploadPostImage(formData).unwrap();
      // toast.success(res.message);
      setImageUrl(res.image);
      console.log(res);
    } catch (error) {
      console.log("Error image upload", error);
    }
  };

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
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="category"
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="tag">
                <Form.Label>Tag</Form.Label>
                <Form.Control
                  type="tag"
                  placeholder="Enter Tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  value={content}
                  placeholder="Enter Content"
                  onChange={(e) => setContent(e.target.value)}
                  rows={3}
                />
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Image Url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                ></Form.Control>
                <Form.Control
                  label="Choose File"
                  type="file"
                  onChange={uploadFileHandler}
                ></Form.Control>
                {loadingImgUpload && <Loader />}
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
