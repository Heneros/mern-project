import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Col, Row, Form, Button } from "react-bootstrap";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {
  useGetPostDetailsQuery,
  useUpdatePostMutation,
  useUploadPostImageMutation,
} from "../../redux/slices/postsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Breadcrumbs from "../../components/Breadcrumbs";
import NavMenu from "../../components/Profile/NavMenu";
import { useGetProfileQuery } from "../../redux/slices/userApiSlice";
import { toast } from "react-toastify";

export default function AdminPostEdit() {
  const { id: postId } = useParams();
  const { data: dataProfile } = useGetProfileQuery();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");

  const {
    data: post,
    isLoading,
    refetch,
    err,
  } = useGetPostDetailsQuery({ postId });

  const [updatePost, { isLoading: loadingPost }] = useUpdatePostMutation();
  const [uploadPostImage, { isLoading: loadingImgUpload }] =
    useUploadPostImageMutation();

  // const navigate = useNavigate();

  if (loadingPost && loadingImgUpload) {
    // console.log("Loading");
  }
  // console.log(post);

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
      toast.success("Post updated successfully");
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

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "200px",
      autofocus: true,
      placeholder: "Enter text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );
  const uploadFileHandler = async (e) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("logo", e.target.files[0]);
    try {
      const res = await uploadPostImage(formData).unwrap();
      if (typeof res === 'string') {
        setImageUrl(res);
      } else if (res.url) {
        setImageUrl(res.url);
      } else {
        throw new Error('Unexpected response format');
      }

    } catch (error) {
      toast.error("Error image upload", error);

      console.log("Error image upload", error);
      console.log("Error details:", error.message);
      if (error.response) {
        console.log("Server response:", error.response.data);
      }
    }
  };

  const onChange = useCallback((value) => {
    setContent(value);
  }, []);
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
            <>
              Visit page: <Link to={`/news/${postId}`}>post</Link>
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

                  <SimpleMDE
                    value={content}
                    options={options}
                    onChange={onChange}
                  />
                </Form.Group>

                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Image Url"
                    value={imageUrl}
                    name="logo"
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
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
