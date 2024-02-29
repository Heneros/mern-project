import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetProfileQuery,
  useGetUserDetailsQuery,
} from "../redux/slices/userApiSlice";

export default function Profile() {
  const { data: dataProfile, error, isLoading } = useGetProfileQuery();
  console.log(dataProfile);
  console.log(error);
  const navigate = useNavigate();

  useEffect(() => {
    if (!dataProfile && !isLoading) {
      navigate("/login");
    }
  });
  return <div>Profile</div>;
}
