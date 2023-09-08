import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <>
      <div style={{ marginTop: "60px" }}></div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow fixed-top border-bottom">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" && "active"
                  }`}
                  aria-current="page"
                  to="/"
                >
                  <img
                    src="assets/img/icons/icons8-home-144-black.png"
                    alt=""
                    style={{
                      height: "30px",
                      width: "auto",
                      marginRight: "5px",
                    }}
                  />
                  Home
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/login" && "active"
                  }`}
                  aria-current="page"
                  to="/login"
                >
                  <img
                    src="assets/img/icons/icons8-login-96-black.png"
                    alt=""
                    style={{
                      height: "30px",
                      width: "auto",
                      marginRight: "5px",
                    }}
                  />
                  Login
                </Link>
              </li>
              <li className="nav-item dropup">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="assets/img/icons/icons8-user-96-black.png"
                    alt=""
                    style={{
                      height: "30px",
                      width: "auto",
                      marginRight: "5px",
                    }}
                  />
                  Hello, Jon
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
