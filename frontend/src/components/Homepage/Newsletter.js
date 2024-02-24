import React from "react";
import { Link } from "react-router-dom";
import ImageNewsLetter from "../../styles/img/news-500x280-4.jpg";

export default function Newsletter() {
  return (
    <>
      <div class="pb-3">
        <div class="bg-light py-2 px-4 mb-3">
          <h3 class="m-0">Newsletter</h3>
        </div>
        <div class="bg-light text-center p-4 mb-3">
          <p>
            Aliqu justo et labore at eirmod justo sea erat diam dolor diam vero
            kasd
          </p>
          <div class="input-group" style={{ width: "100%" }}>
            <div class="input-group-append mx-auto">
              <Link to={"/registration"}>
                <button class="btn btn-primary">Sign Up</button>
              </Link>
            </div>
          </div>
          <small>Sit eirmod nonumy kasd eirmod</small>
        </div>
      </div>
      <div class="mb-3 pb-3">
        <Link href="">
          <img class="img-fluid" src={ImageNewsLetter} alt="" />
        </Link>
      </div>
    </>
  );
}
