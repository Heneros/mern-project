import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split("/");

  const secondPart = parts[parts.length - 2];
  console.log(secondPart);
  const lastPart = parts[parts.length - 1];

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
              {secondPart ? (
                <>
                  {/* <Link className="breadcrumb-item" to={`/${secondPart}`}>
                    {secondPart}{" "}
                    </Link> */}
                  <span className="breadcrumb-item">{secondPart}</span>
                </>
              ) : (
                <></>
              )}
              <span className="breadcrumb-item active">{lastPart}</span>
            </>
          )}
        </nav>
      </div>
    </>
  );
}
