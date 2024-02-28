import React from "react";
import { Link } from "react-router-dom";
import ImageNewsLetter from "../../styles/img/news-500x280-4.jpg";

export default function Newsletter() {
  return (
    <>
      <div className="pb-3">
        <div className="bg-light py-2 px-4 mb-3">
          <h3 className="m-0">Newsletter</h3>
        </div>
        <div className="bg-light text-center p-4 mb-3">
          <p>
            Aliqu justo et labore at eirmod justo sea erat diam dolor diam vero
            kasd
          </p>
          <div className="input-group" style={{ width: "100%" }}>
            <div className="input-group-append mx-auto">
              <Link to={"/registration"}>
                <button className="btn btn-primary">Sign Up</button>
              </Link>
            </div>
          </div>
          <small>Sit eirmod nonumy kasd eirmod</small>
        </div>
      </div>
      <div className="mb-3 pb-3">
        <Link href="">
          <img className="img-fluid" src={ImageNewsLetter} alt="" />
        </Link>
      </div>
    </>
  );
}
