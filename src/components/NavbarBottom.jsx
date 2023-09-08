import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavbarBottom() {
  const location = useLocation();
  return (
    <>
      {/* <!-- Bottom Navbar --> */}
      <nav className="navbar navbar-expand navbar-light bg-light border-top fixed-bottom">
        <div className="container-fluid">
          <ul className="navbar-nav nav-justified w-100">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${location.pathname === "/" && "active"}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                className={`nav-link ${
                  location.pathname === "/login" && "active"
                }`}
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Profile
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
