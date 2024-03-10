import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Col, Row, Form, Button, Table } from "react-bootstrap";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useGetProfileQuery,
} from "../../redux/slices/userApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Breadcrumbs from "../../components/Breadcrumbs";
import NavMenu from "../../components/Profile/NavMenu";

export default function UsersList() {
  const { data: dataProfile } = useGetProfileQuery();
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        alert(err?.message);
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
              <h1>Users</h1>
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>USERNAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.username}</td>
                      <td>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </td>
                      <td>
                        {user.isAdmin ? (
                          <FaCheck style={{ color: "green" }} />
                        ) : (
                          <FaTimes style={{ color: "red" }} />
                        )}
                      </td>
                      <td>
                        {!user.isAdmin && (
                          <>
                            <LinkContainer
                              to={`/admin/user/${user._id}/edit`}
                              style={{ marginRight: "10px" }}
                            >
                              <Button variant="light" className="btn-sm">
                                <FaEdit />
                              </Button>
                            </LinkContainer>
                            <Button
                              variant="danger"
                              className="btn-sm"
                              onClick={() => deleteHandler(user._id)}
                            >
                              <FaTrash style={{ color: "white" }} />
                            </Button>
                          </>
                        )}
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
