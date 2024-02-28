import React from "react";
import { useGetUserDetailsQuery } from "../redux/slices/userApiSlice";

export default function Profile() {
  const { data, isLoading, error } = useGetUserDetailsQuery();
  console.log(error);
  console.log(data);
  return <div>Profile</div>;
}
