import React from "react";

import { LinkContainer } from "react-router-bootstrap";
import { Col, Row, Button, Table } from "react-bootstrap";

import Breadcrumbs from "../components/Breadcrumbs";
import {
  useDeleteFavoriteMutation,
  useGetFavoritesQuery,
  useGetProfileQuery,
  useGetUsersQuery,
} from "../redux/slices/userApiSlice";
import NavMenu from "../components/Profile/NavMenu";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetAllQuery } from "../redux/slices/postsApiSlice";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

export default function Favorites() {
  const { data: dataProfile, isLoading, error, refetch } = useGetProfileQuery();
  const { data, loadPosts, errorPosts } = useGetAllQuery();
  const [deleteFavorite] = useDeleteFavoriteMutation();
  const favoritesList = dataProfile?.favorites;

  if (isLoading && !favoritesList) {
    return <Loader />;
  }
  const userId = dataProfile?._id;

  const favoritesListPosts = data?.posts?.filter((item) => {
    return favoritesList?.includes(item._id);
  });

  const deleteHandler = async (userId, postId) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteFavorite({ userId, postId }).unwrap();
        refetch();
      } catch (error) {
        console.log(`Error favorite`, error);
      }
    }
  };

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
                  {favoritesListPosts.length > 0 ? (
                    favoritesListPosts?.map((favorite) => (
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
                        <td>
                          <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => deleteHandler(userId, favorite._id)}
                          >
                            <FaTrash style={{ color: "white" }} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <>No favorite post been added.</>
                  )}
                </tbody>
              </Table>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
