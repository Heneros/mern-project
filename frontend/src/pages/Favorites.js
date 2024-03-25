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
import { useGetAllQuery } from "../redux/slices/postsApiSlice";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { data: dataProfile, isLoading, error } = useGetProfileQuery();
  const { data, loadPosts, errorPosts } = useGetAllQuery();

  const favoritesList = dataProfile?.favorites;

  const favoritesListPosts = data?.posts?.filter((item) => {
    return favoritesList?.includes(item._id);
  });

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
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Preview</th>
                    <th>Category</th>
                    <th>Tag</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {favoritesListPosts?.map((favorite) => (
                    <tr key={favorite._id}>
                      <td>
                        <Link to={`/news/${favorite._id}`}>
                          {favorite.title}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/news/${favorite._id}`}>
                          <img
                            src={favorite.imageUrl}
                            style={{ maxWidth: "150px", maxHeight: "150px" }}
                            alt=""
                          />
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/category/${favorite?.category?.toLowerCase()}`}
                        >
                          {favorite.category}
                        </Link>
                      </td>
                      <td>
                        {favorite?.tag.map((item) => (
                          <Link to={`/tag/${item.toLowerCase()}`}>
                            {item}
                          </Link>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
