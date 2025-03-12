import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { ApiBaseUrl } from "../configs/AppConfig";

export default function Login() {
  const navigate = useNavigate();

  const [, globalDispatch] = useContext(GlobalContext);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [msgAlert, setMsgAlert] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [showPassword, setShowPasswrod] = useState(false);

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (emailInput === "") {
        setMsgAlert("Email tidak boleh kosong");
        setTypeAlert("fail");
        emailRef.current.focus();
        return;
      }

      if (passwordInput === "") {
        setMsgAlert("Password tidak boleh kosong");
        setTypeAlert("fail");
        passwordRef.current.focus();
        return;
      }

      const response = await ApiBaseUrl.post("/login", {
        email: emailInput,
        password: passwordInput,
      });
      // console.log(response);
      setMsgAlert(response.data.message);
      setTypeAlert("success");
      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        globalDispatch({
          type: "PROCESS_LOGIN",
          data: response.data.user,
        });
        navigate("/profile");
      }, 1600);
    } catch (error) {
      console.log("Error in Login.jsx: ", error);
      setMsgAlert(error.response.data.message);
      setTypeAlert(error.response.data.status);
    }
  };

  return (
    <div className="mt-5 container-fluid">
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <form onSubmit={handleLogin}>
                {/* Alert */}
                {msgAlert !== "" && (
                  <div
                    className={`alert alert-dismissible fade show ${
                      typeAlert === "fail" ? "alert-danger" : "alert-success"
                    }`}
                    role="alert"
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {typeAlert === "success" && (
                        <div className="spinner-border me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                      {msgAlert}
                    </div>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                      onClick={() => {
                        setMsgAlert("");
                      }}
                    ></button>
                  </div>
                )}
                {/* End Alert */}

                <h3
                  className={`text-center mb-5 ${
                    msgAlert === "" ? "mt-4" : "mt-2"
                  }`}
                >
                  Login
                </h3>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                    }}
                    ref={emailRef}
                  />
                </div>
                <div className="input-group mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                    }}
                    ref={passwordRef}
                  />
                  <span
                    className="input-group-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      showPassword
                        ? setShowPasswrod(false)
                        : setShowPasswrod(true);
                    }}
                  >
                    {showPassword ? (
                      <img
                        src="/assets/img/icons/icons8-eye-100-black.png"
                        alt=""
                        style={{ height: "24px", width: "auto" }}
                      />
                    ) : (
                      <img
                        src="/assets/img/icons/icons8-closed-eye-100-black.png"
                        alt=""
                        style={{ height: "24px", width: "auto" }}
                      />
                    )}
                  </span>
                </div>
                <div className="input-group">
                  <button type="submit" className="btn btn-success w-100">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
}
