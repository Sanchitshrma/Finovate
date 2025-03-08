import { Link } from "react-router-dom";
import React from "react";
function Navbar() {
  return (
    <nav
      class="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: "white" }}
    >
      <div class="container p-2">
        <div className="row">
          <div className="col-2 mr-5"></div>
          <Link class="navbar-brand fs-3 link-primary" to="/">
            <img
              src="media/images/coins-solid.svg"
              alt="logo"
              style={{ width: "25%" }}
            />
            &nbsp; 𝙁𝙞𝙣𝙤𝙫𝙖𝙩𝙚
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="col-5"></div>
        <div class="collapse navbar-collapse col-5" id="navbarSupportedContent">
          <form class="d-flex" role="search">
            <ul class="navbar-nav ml-5">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/signup">
                  Signup
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/about">
                  About
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/product">
                  Product
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/pricing">
                  Pricing
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/support">
                  Support
                </Link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
