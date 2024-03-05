import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

import { Form, Dropdown, InputGroup, Button } from "react-bootstrap";

import { useGetPostsQuery } from "../../redux/slices/postsApiSlice";
export default function SearchBar() {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetPostsQuery({ pageNumber });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = data?.posts?.filter((post) =>
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
          <div className="input-group-append">
            <button className="input-group-text text-secondary">
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
          filteredPosts?.map((post, index) => (
            <Dropdown.Item href={`/news/${post._id}`} key={index}>
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
