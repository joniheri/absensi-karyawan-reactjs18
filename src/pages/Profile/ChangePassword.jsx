import { useState, useRef } from "react";
import { ApiBaseUrl } from "../../configs/AppConfig";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();

  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [msgAlert, setMsgAlert] = useState("");
  const [typeAlert, setTypeAlert] = useState("");

  const [showPassword, setShowPasswrod] = useState(false);
  const [showConfirmPassword, setShowConfirmPasswrod] = useState(false);

  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  const [passwordAlert, setPasswordAlert] = useState("");
  const [confirmPasswordAlert, setConfirmPasswordAlert] = useState("");

  const onChangePasswordInput = (e) => {
    const newInput = e.target.value;
    setPasswordInput(newInput);
    if (newInput.trim() === "") {
      setPasswordAlert("Password tidak boleh kosong");
      passwordRef.current.focus();
      return;
    }
    if (newInput.length < 3) {
      setPasswordAlert("Password minimal harus 3 karakter");
      passwordRef.current.focus();
      return;
    }
    setPasswordAlert("");
    setConfirmPasswordAlert("");
  };

  const onChangeConfirmPasswordInput = (e) => {
    const newInput = e.target.value;
    setConfirmPasswordInput(newInput);
    if (newInput === "") {
      setConfirmPasswordAlert("Confirm Password tidak boleh kosong");
      confirmPasswordRef.current.focus();
      return;
    }
    if (newInput.length < 3) {
      setConfirmPasswordAlert("Confirm Password minimal harus 3 karakter");
      confirmPasswordRef.current.focus();
      return;
    }
    if (passwordInput !== newInput) {
      setConfirmPasswordAlert("Confirm Password tidak Tidak Cocok");
      confirmPasswordRef.current.focus();
      return;
    }
    setConfirmPasswordAlert("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (passwordInput !== confirmPasswordInput) {
        setMsgAlert("Confirm Password tidak Tidak Cocok");
        setTypeAlert("fail");
        confirmPasswordRef.current.focus();
        return;
      }

      const response = await ApiBaseUrl.patch(
        "/change-password",
        {
          password: passwordInput,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
      console.log(response);
      setMsgAlert(response.data.message);
      setTypeAlert(response.data.status);
      setTimeout(() => {
        setMsgAlert("");
        setTypeAlert("");
      }, 2000);
    } catch (error) {
      setMsgAlert(error.response.data.message);
      setTypeAlert(error.response.data.status);
    }
  };

  return (
    <div className="container-fluid mt-3">
      <h3 className="border-bottom mb-4">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="assets/img/icons/icons8-back-100-black.png"
            alt=""
            style={{
              height: "26px",
              width: "auto",
              marginRight: "10px",
              marginTop: "2px",
              cursor: "pointer",
            }}
            title="Back"
            onClick={() => {
              navigate("/profile");
            }}
          />
          ChangePassword
        </div>
      </h3>
      <div className="row">
        <div className="col-md-4">
          <form onSubmit={handleSave}>
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
            <div className="mb-3">
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  value={passwordInput}
                  onChange={(e) => {
                    onChangePasswordInput(e);
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
                      src="assets/img/icons/icons8-eye-100-black.png"
                      alt=""
                      style={{ height: "24px", width: "auto" }}
                    />
                  ) : (
                    <img
                      src="assets/img/icons/icons8-closed-eye-100-black.png"
                      alt=""
                      style={{ height: "24px", width: "auto" }}
                    />
                  )}
                </span>
              </div>
              {passwordAlert !== "" && (
                <span className="text-danger" style={{ marginLeft: "12px" }}>
                  {passwordAlert}
                </span>
              )}
            </div>
            <div className="mb-4">
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm Password"
                  value={confirmPasswordInput}
                  onChange={(e) => {
                    onChangeConfirmPasswordInput(e);
                  }}
                  ref={confirmPasswordRef}
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    showConfirmPassword
                      ? setShowConfirmPasswrod(false)
                      : setShowConfirmPasswrod(true);
                  }}
                >
                  {showConfirmPassword ? (
                    <img
                      src="assets/img/icons/icons8-eye-100-black.png"
                      alt=""
                      style={{ height: "24px", width: "auto" }}
                    />
                  ) : (
                    <img
                      src="assets/img/icons/icons8-closed-eye-100-black.png"
                      alt=""
                      style={{ height: "24px", width: "auto" }}
                    />
                  )}
                </span>
              </div>
              {confirmPasswordAlert !== "" && (
                <span className="text-danger" style={{ marginLeft: "12px" }}>
                  {confirmPasswordAlert}
                </span>
              )}
            </div>
            <div className="input-group">
              <button type="submit" className="btn btn-success w-100">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
