import React, { useCallback, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import SimpleMDE from "react-simplemde-editor";

import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useCreatePostMutation,
  useUploadPostImageMutation,
} from "../../redux/slices/postsApiSlice";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useGetProfileQuery } from "../../redux/slices/userApiSlice";

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

  const inputFileRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("image", e.target.files[0]);

    if (loadingCreate && loadingProfile) {
      console.log("Loading");
      return;
    }

    if (!title && !dataProfile && !category) {
      console.error("Please provide title and category");
      return;
    }

    try {
      const { _id: userId } = dataProfile;
      await createPost({
        user: userId,
        title,
        content,
        tag,
        category,
      }).unwrap();
      // await uploadPostImage(formData).unwrap();
      setTitle("");
      setContent("");
      // setImageUrl("");
      setTag("");
      setCategory("");
    } catch (error) {
      console.log(error?.message || error);
    }
  };

  // const uploadFileHandler = async (event) => {
  //   const formData = new FormData();
  //   const file = event.target.files[0];
  //   formData.append("image", file);
  //   try {
  //     const res = await uploadPostImage(formData).unwrap();
  //     setImageUrl(res.image);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChange = useCallback((value) => {
    setContent(value);
  }, []);
  // console.log({ error });
  return (
    <>
      <Breadcrumbs />
      <h1>Create Post</h1>
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
              type="file"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <SimpleMDE value={content} onChange={onChange} />

          <Button type="submit" variant="primary">
            Create
          </Button>
        </Form>
      )}
    </>
  );
}
