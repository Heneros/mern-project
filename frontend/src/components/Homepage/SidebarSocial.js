import React from "react";
import { Link } from "react-router-dom";

import { useGetUsersPublicQuery } from "../../redux/slices/userApiSlice";
import Message from "../Message";
import Loader from "../Loader";

export default function SidebarSocial() {
  const { data: itemsUsers, isLoading, error } = useGetUsersPublicQuery();

  const loggedUsers = itemsUsers?.filter((item) => item.isLoggedIn === true);
  console.log("Items:", loggedUsers?.length);
  return (
    <div className="pb-3">
      <div className="bg-light py-2 px-4 mb-3">
        <h3 className="m-0">Statistics</h3>
      </div>
      <div className="d-flex mb-3">
        <span
          className="d-block w-50 py-2 px-3 text-white text-decoration-none mr-2"
          style={{ background: "#39569E" }}
        >
          <small className="fab fa-facebook-f mr-2"></small>
          <small>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message>{error?.data?.message || error.error}</Message>
            ) : (
              <>{itemsUsers.length} Users registered</>
            )}
          </small>
        </span>
        <span
          className="d-block w-50 py-2 px-3 text-white text-decoration-none ml-2"
          style={{ background: "#52AAF4" }}
        >
          <small className="fab fa-twitter mr-2"></small>
          <small>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message>{error?.data?.message || error.error}</Message>
            ) : (
              <> {loggedUsers?.length} Users online</>
            )}
          </small>
        </span>
      </div>
    </div>
  );
}
