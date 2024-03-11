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

export default function CreatePost() {
  // const { id } = useParams();
  const [createPost, { isLoading: loadingCreate }, error] =
    useCreatePostMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadPostImageMutation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tag, setTag] = useState([]);
  const [category, setCategory] = useState("");

  const inputFileRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createPost({ title, content, imageUrl, tag, category }).unwrap();
      setTitle("");
      setContent("");
      setImageUrl("");
      setCategory("");
    } catch (error) {
      console.log(error?.message || error);
    }
  };

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
    } catch (error) {
      console.log(error);
    }
  };

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
      <h1>Create Product</h1>
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
            <Button
              variant="primary"
              onClick={() => inputFileRef.current.click()}
            >
              Load Image
            </Button>
            <input
              type="file"
              ref={inputFileRef}
              onChange={handleChangeFile}
              hidden
            />
            {imageUrl && (
              <>
                <Button variant="danger" onClick={onClickRemoveImage}>
                  Remove
                </Button>
                <img src={imageUrl} alt="test" />
              </>
            )}
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
