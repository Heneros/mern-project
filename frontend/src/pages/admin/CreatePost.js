import React from "react";

import { useParams } from "react-router-dom";
import { useCreatePostMutation } from "../../redux/slices/postsApiSlice";

export default function CreatePost() {
  // const { id } = useParams();
  const [createPost, err] = useCreatePostMutation();

  console.log({ err });
  return <div></div>;
}
