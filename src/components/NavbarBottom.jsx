import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavbarBottom() {
  const location = useLocation();
  return (
    <>
      <div style={{ marginTop: "60px" }}></div>
      {/* <!-- Bottom Navbar --> */}
      <nav className="navbar navbar-expand navbar-light bg-light border-top fixed-bottom">
        <div className="container-fluid">
          <ul className="navbar-nav nav-justified w-100">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${location.pathname === "/" && "active"}`}
              >
                <img
                  src="assets/img/icons/icons8-home-144-black.png"
                  alt=""
                  style={{
                    height: "27px",
                    width: "auto",
                    marginRight: "5px",
                  }}
                />
                <div>Home</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                className={`nav-link ${
                  location.pathname === "/login" && "active"
                }`}
              >
                <img
                  src="assets/img/icons/icons8-login-100-black.png"
                  alt=""
                  style={{
                    height: "27px",
                    width: "auto",
                    marginRight: "5px",
                  }}
                />
                <div>Login</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                <img
                  src="assets/img/icons/icons8-user-96-black.png"
                  alt=""
                  style={{
                    height: "27px",
                    width: "auto",
                    marginRight: "5px",
                  }}
                />
                <div>Profile</div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
