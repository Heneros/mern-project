import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { Form, Dropdown, InputGroup, Button } from "react-bootstrap";

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
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div class="input-group-append">
            <button class="input-group-text text-secondary">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </InputGroup>
      </Form.Group>
      <Dropdown.Menu
        style={{ left: "auto" }}
        show={searchQuery.length > 0 && filteredPosts.length > 0}
      >
        {filteredPosts ? (
          filteredPosts?.map((post) => (
            <Dropdown.Item href={`/news/${post._id}`}>
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
