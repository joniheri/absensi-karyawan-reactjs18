import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function NavbarBottom() {
  const location = useLocation();
  const [globalState, globalDispatch] = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <>
      <div style={{ marginBottom: "120px" }}></div>
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
                    height: "24px",
                    width: "auto",
                    marginRight: "5px",
                  }}
                />
                <div style={{ fontSize: "13px" }}>Home</div>
              </Link>
            </li>

            {globalState.isLogin ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/profile"
                    className={`nav-link ${
                      location.pathname === "/profile" && "active"
                    }`}
                  >
                    <img
                      src="assets/img/icons/icons8-user-96-black.png"
                      alt=""
                      style={{
                        height: "24px",
                        width: "auto",
                        marginRight: "5px",
                      }}
                    />
                    <div style={{ fontSize: "13px" }}>Profile</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      location.pathname === "/login" && "active"
                    }`}
                    onClick={() => {
                      globalDispatch({
                        type: "PROCESS_LOGOUT",
                      });
                      localStorage.clear();
                      navigate("/");
                    }}
                  >
                    <img
                      src="assets/img/icons/icons8-logout-100-black.png"
                      alt=""
                      style={{
                        height: "24px",
                        width: "auto",
                        marginRight: "5px",
                      }}
                    />
                    <div style={{ fontSize: "13px" }}>Logout</div>
                  </button>
                </li>
              </>
            ) : (
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
                      height: "24px",
                      width: "auto",
                      marginRight: "5px",
                    }}
                  />
                  <div style={{ fontSize: "13px" }}>Login</div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
