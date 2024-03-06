import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split("/");
  const lastPart = parts[parts.length - 1];

  // console.log(lastPart);

  return (
    <>
      <div className="container-fluid">

          <nav className="breadcrumb bg-transparent m-0 p-0">
            <Link className="breadcrumb-item" to={`/`}>
              Home
            </Link>
            {lastPart === "news" ? (
              <span className="breadcrumb-item active">News</span>
            ) : (
              <>
                <Link className="breadcrumb-item" to={`/news`}>
                  News
                </Link>
                <span className="breadcrumb-item active">{lastPart}</span>
              </>
            )}
          </nav>
        </div>

    </>
  );
}
