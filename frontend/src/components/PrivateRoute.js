import React from "react";
import { useGetProfileQuery } from "../redux/slices/userApiSlice";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Loader";


export default function PrivateRoute() {
  const { data: dataProfile, isLoading } = useGetProfileQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {dataProfile?.isAdmin ? <Outlet /> : <Navigate to="/login" replace />}
        </>
      )}
    </>
  );
}
