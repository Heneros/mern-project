import React from "react";

import { LinkContainer } from "react-router-bootstrap";
import { Col, Row, Button, Table } from "react-bootstrap";

import Breadcrumbs from "../components/Breadcrumbs";
import {
  useGetFavoritesQuery,
  useGetProfileQuery,
  useGetUsersQuery,
} from "../redux/slices/userApiSlice";
import NavMenu from "../components/Profile/NavMenu";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default function Favorites() {
  const { data: dataProfile, loading, errorProfile } = useGetProfileQuery();
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const profileId = dataProfile?.["_id"] || "";

  const {
    data: favoritesList,
    loadingFav,
    errorFa,
  } = useGetFavoritesQuery({ profileId });

  if (loading && isLoading) {
    console.log("Loading...");
  }
  if (!errorProfile && !error) {
    console.log("Error");
  }
  if (!dataProfile || !users) {
    console.log("No data available");
    return null;
  }

  // console.log(_id);
  return (
    <>
      <Breadcrumbs />
      <Row className="my-5">
        <NavMenu dataProfile={dataProfile} />

        <Col md={9}>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message>{error?.message}</Message>
          ) : (
            <>
              <h1>Favorites</h1>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
