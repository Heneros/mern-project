import React from "react";

import { useGetUsersPublicQuery } from "../../redux/slices/userApiSlice";
import Message from "../Message";
import Loader from "../Loader";

export default function SidebarSocial() {
  const { data: itemsUsers, isLoading, error } = useGetUsersPublicQuery();

  // console.log("Items:", loggedUsers?.length);
  return (
    <div className="pb-3">
      <div className="bg-light py-2 px-4 mb-3">
        <h3 className="m-0">Statistics</h3>
      </div>
      <div className="d-flex mb-3">
        <span
          className="d-block w-50 py-2 px-3 text-white text-decoration-none m-auto"
          style={{ background: "#39569E" }}
        >
          <small>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message>{error?.data?.message || error?.err}</Message>
            ) : (
              <>{itemsUsers.length} Users registered</>
            )}
          </small>
        </span>
      </div>
    </div>
  );
}
