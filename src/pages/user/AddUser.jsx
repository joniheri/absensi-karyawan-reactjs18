import React from "react";
import { useNavigate } from "react-router-dom";
import { ApiBaseUrl } from "../../configs/AppConfig";
import { useState } from "react";

export default function AddUser() {
  const navigate = useNavigate();

  const [msgAlert, setMsgAlert] = useState("");
  const [typeAlert, setTypeAlert] = useState("");

  const [showPassword, setShowPasswrod] = useState(false);

  const [emailInput, setEmailInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [fullnameInput, setFullnameInput] = useState("");
  const [jabatanInput, setJabatanInput] = useState("");
  const [noHpInput, setNoHpInput] = useState("");

  const resetInput = () => {
    setEmailInput("");
    setUsernameInput("");
    setPasswordInput("");
    setFullnameInput("");
    setJabatanInput("");
    setNoHpInput("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiBaseUrl.post(
        "/add-user",
        {
          email: emailInput,
          username: usernameInput,
          password: passwordInput,
          fullname: fullnameInput,
          jabatan: jabatanInput,
          noHp: noHpInput,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMsgAlert(response.data.message);
      setTypeAlert("success");
      setTimeout(() => {
        setMsgAlert("");
        resetInput();
      }, 2000);
    } catch (error) {
      console.log(error);
      setMsgAlert(error.response.data.message);
      setTypeAlert(error.response.data.status);
    }
  };

  return (
    <div className="container-fluid mt-3">
      <h3 className="border-bottom pb-2">
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
              navigate("/users");
            }}
          />
          AddUser
        </div>
      </h3>
      <div className="row">
        <div className="col-md-4">
          <form onClick={handleSave}>
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
            <div className="mb-2">
              <label htmlFor="label" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                }}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="label" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={usernameInput}
                onChange={(e) => {
                  setUsernameInput(e.target.value);
                }}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="label" className="form-label">
                password
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                }}
              />
            </div>
            <div className={`mb-2 ${msgAlert !== "" && "mt-3"}`}>
              <label htmlFor="label" className="form-label">
                Nama Lengkap
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={fullnameInput}
                onChange={(e) => {
                  setFullnameInput(e.target.value);
                }}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="label" className="form-label">
                No Hp
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={noHpInput}
                onChange={(e) => {
                  setNoHpInput(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="label" className="form-label">
                Jabatan
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={jabatanInput}
                onChange={(e) => {
                  setJabatanInput(e.target.value);
                }}
              />
            </div>
            <button type="submit" className="btn btn-success mb-3 w-100">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
