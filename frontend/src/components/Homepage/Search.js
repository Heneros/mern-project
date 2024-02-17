import React, { useState } from "react";

import { Form, Dropdown } from "react-bootstrap";

import { useGetPostsQuery } from "../../redux/slices/postsApiSlice";
export default function SearchBar() {
  const { data: postsItems, isLoading, error } = useGetPostsQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = postsItems?.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Form>
      <Form.Group controlId="postSearch">
        <Form.Control
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form.Group>
      <Dropdown.Menu
        style={{ left: "auto" }}
        show={searchQuery.length > 0 && filteredPosts.length > 0}
      >
        {filteredPosts ? (
          filteredPosts?.map((post) => (
            <Dropdown.Item href={`/blog/${post._id}`}>
              {post.title}
            </Dropdown.Item>
          ))
        ) : (
          <></>
        )}
        {filteredPosts ? (
          filteredPosts.length === 0 && (
            <Dropdown.Item>No matching posts found</Dropdown.Item>
          )
        ) : (
          <>No items</>
        )}
      </Dropdown.Menu>
    </Form>
  );
}
