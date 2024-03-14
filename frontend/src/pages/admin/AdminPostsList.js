import React from "react";
import { format } from "date-fns";
import { Link, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Col, Row, Button, Table } from "react-bootstrap";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

import {
  useDeletePostMutation,
  useGetPostsQuery,
} from "../../redux/slices/postsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Breadcrumbs from "../../components/Breadcrumbs";
import NavMenu from "../../components/Profile/NavMenu";
import { useGetProfileQuery } from "../../redux/slices/userApiSlice";

export default function AdminPostsList() {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetPostsQuery({ pageNumber });
  const { data: dataProfile } = useGetProfileQuery();

  const [deletePost, { isLoading: loadingDelete }] = useDeletePostMutation();

  // console.log(posts);
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
              <h1>Posts</h1>
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Tag(s)</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.posts.map((post) => (
                    <tr key={post._id}>
                      <td> {post._id} </td>
                      <td>
                        <Link
                          to={`/admin/post/${post._id}/edit`}
                          style={{ color: "red", cursor: "pointer" }}
                        >
                          <span>{post.title}</span>
                        </Link>
                      </td>
                      <td>{post.category} </td>
                      <td>{post.tag} </td>
                      <td>
                        {format(new Date(post.createdAt), "MMMM dd, yyyy")}
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
