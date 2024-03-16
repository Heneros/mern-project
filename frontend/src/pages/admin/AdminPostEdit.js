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

  console.log(post);
  if (isLoading) {
    // console.log("Loading");
  }

  if (!err) {
    // console.log("Working");
  }
  const [updatePost, { isLoading: loadingPost }] = useUpdatePostMutation();
  const [uploadPostImage, { isLoading: loadingImgUpload }] =
    useUploadPostImageMutation();

  const navigate = useNavigate();

  if (loadingPost && loadingPost) {
    console.log("Loading");
  }

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
    // setSelectedFile(file);
    // const fileName = file ? e.target.files[0] : "";
    // setImageUrl(fileName);
       const formData = new FormData();
    formData.append("imageUrl", e.target.files[0]);

    if (!selectedFile) {
      console.warn("No file selected");
      return;
    }
    const file = e.target.files[0];
    setSelectedFile(file);

    await uploadPostImage(formData).unwrap();
    setImageUrl(`/uploads/${imageUrl}`);
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
                {imageUrl ? (
                  <img
                    className="img-form 123"
                    src={`/uploads/${imageUrl}`}
                    alt={title}
                  />
                ) : (
                  <>
                    <img
                      className="img-form 333"
                      onChange={(e) => setImageUrl(e.target.value)}
                      src={
                        selectedFile ? URL.createObjectURL(selectedFile) : ""
                      }
                      alt={title}
                    />
                  </>
                )}
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
