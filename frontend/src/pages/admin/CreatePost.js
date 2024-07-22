import React, { useCallback, useRef, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useCreatePostMutation,
  useUploadPostImageMutation,
} from "../../redux/slices/postsApiSlice";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useGetProfileQuery } from "../../redux/slices/userApiSlice";
import NavMenu from "../../components/Profile/NavMenu";
import defaultImg from "../../styles/img/defaultImg.jpg";
import { toast } from "react-toastify";
export default function CreatePost() {
  const {
    data: dataProfile,
    errorProfile,
    isLoading: loadingProfile,
  } = useGetProfileQuery();
  // console.log(dataProfile);

  const [createPost, { isLoading: loadingCreate }, error] =
    useCreatePostMutation();

  const [uploadPostImage, { isLoading: loadingUpload }] =
    useUploadPostImageMutation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (loadingCreate && loadingProfile) {
      console.log("Loading");
      return;
    }

    if (!title && !dataProfile && !category) {
      toast.error("Please provide title and category");
      return;
    }

    try {
      // console.log(formData);
      const { _id: userId } = dataProfile;
      await createPost({
        user: userId,
        title,
        content,
        tag,
        imageUrl,
        category,
      }).unwrap();
      setImageUrl("");
      setTitle("");
      setContent("");
      setTag("");
      setCategory("");
    } catch (error) {
      console.log(error?.message || error);
    }
  };

  const onChange = useCallback((value) => {
    setContent(value);
  }, []);

  const uploadFileHandler = async (e) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("imageUrl", e.target.files[0]);
    // console.log("Work");
    console.log('imageUrl', formData);
    try {
      const res = await uploadPostImage(formData).unwrap();
      console.log(res);
      setImageUrl(res.image);
      console.log(res);
    } catch (error) {
      console.log("Error image upload", error);
    }
  };
  // console.log(123);
  return (
    <>
      <Breadcrumbs />
      <h1>Create Post</h1>
      <Row className="my-5">
        <NavMenu dataProfile={dataProfile} />
        <Col md={9}>
          {loadingCreate ? (
            <Loader />
          ) : error ? (
            <Message variant="danger"> {error?.message} </Message>
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
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="tag">
                <Form.Label>Tag</Form.Label>
                <Form.Control
                  type="tag"
                  placeholder="Enter tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                ></Form.Control>
                <Form.Control
                  label="Choose File"
                  onChange={uploadFileHandler}
                  type="file"
                ></Form.Control>
              </Form.Group>

              <SimpleMDE value={content} onChange={onChange} />

              <Button type="submit" variant="primary">
                Create
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </>
  );
}
