import React, { useState } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";

import { useCreateCommentMutation } from "../redux/slices/postsApiSlice";
import Loader from "./Loader";
import Message from "./Message";

export default function Comments({ postId, refetch }) {
  const [comment, setComment] = useState("");
  const [createComment, { isLoading: loadingPostReview }, errorComment] =
    useCreateCommentMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createComment({ postId, comment }).unwrap();
      refetch();
      console.log("Comments success");
      setComment("");
    } catch (error) {
      console.log(error?.message || error?.data.msg);
    }
  };
  return (
    <div>
      {loadingPostReview ? (
        <Loader />
      ) : errorComment ? (
        <Message variant="danger">
          {errorComment?.data?.message || errorComment?.message}
        </Message>
      ) : (
        <>
          <h3 className="mb-4">Leave a comment</h3>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label label="message">Message *</Form.Label>
              <Form.Control
                id="message"
                cols="30"
                rows="5"
                as="textarea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <div className="form-group mb-0">
              <Button
                type="submit"
                className="btn btn-primary font-weight-semi-bold py-2 px-3"
                disabled={loadingPostReview}
              >
                Leave a comment
              </Button>
            </div>
          </Form>
        </>
      )}
    </div>
  );
}
