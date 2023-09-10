import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiBaseUrl } from "../../configs/AppConfig";

export default function Profile() {
  const navigate = useNavigate();

  const [msgAlert, setMsgAlert] = useState("");
  const [typeAlert, setTypeAlert] = useState("");

  const fullnameRef = useRef(null);
  const noHpRef = useRef(null);

  const [photoProfile, setPhotoProfile] = useState("");
  const [fullnameInput, setFullnameInput] = useState("");
  const [noHpInput, setNoHpInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [jabatanInput, setJabatanInput] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    getUserById();
  }, []);

  const getUserById = async () => {
    try {
      const response = await ApiBaseUrl.get("/check-token", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      // console.log(response);
      setPhotoProfile(response.data.user.photo);
      setFullnameInput(response.data.user.fullname);
      setNoHpInput(response.data.user.noHp);
      setEmailInput(response.data.user.email);
      setUsernameInput(response.data.user.username);
      setJabatanInput(response.data.user.jabatan);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      if (fullnameInput === "") {
        setMsgAlert("Nama tidak boleh kosong");
        setTypeAlert("fail");
        fullnameRef.current.focus();
        return;
      }

      if (noHpInput === "") {
        setMsgAlert("No Hp tidak boleh kosong");
        setTypeAlert("fail");
        noHpRef.current.focus();
        return;
      }

      const response = await ApiBaseUrl.patch(
        "/edit-profile",
        {
          fullname: fullnameInput,
          noHp: noHpInput,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response);
      setMsgAlert(response.data.message);
      setTypeAlert("success");
      setTimeout(() => {
        setMsgAlert("");
      }, 1600);
    } catch (error) {
      // console.log("Error in Login.jsx: ", error);
      setMsgAlert(error.response.data.message);
      setTypeAlert(error.response.data.status);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <h3 className="border-bottom mb-4">Profile</h3>

      <div className="row">
        <div className="col-md-3 mb-3">
          <img
            className="img-thumbnail mb-3"
            src={
              photoProfile === ""
                ? "assets/img/others/profile-42914_1280.jpg"
                : `http://localhost:3001/uploads/${photoProfile}`
            }
            alt=""
          />
          <button
            className="btn btn-secondary mb-3 w-100"
            onClick={() => {
              navigate("/edit-photo-profile");
            }}
          >
            Edit Photo
          </button>
        </div>
        <div className="col-md-4">
          <form onSubmit={handleSaveChanges}>
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

            <div className={`mb-2 ${msgAlert !== "" && "mt-3"}`}>
              <label className="form-label">Nama Lengkap</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={fullnameInput}
                onChange={(e) => {
                  setFullnameInput(e.target.value);
                }}
                ref={fullnameRef}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">No Hp</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={noHpInput}
                onChange={(e) => {
                  setNoHpInput(e.target.value);
                }}
                ref={fullnameRef}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Email</label>
              <div>
                <label
                  className="w-100"
                  style={{
                    border: "1px solid #DEE2E6",
                    padding: "2px 10px 6px 10px",
                    borderRadius: "5px",
                    backgroundColor: "#DEE2E6",
                  }}
                >
                  {emailInput}
                </label>
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label">Username</label>
              <div>
                <label
                  className="w-100"
                  style={{
                    border: "1px solid #DEE2E6",
                    padding: "2px 10px 6px 10px",
                    borderRadius: "5px",
                    backgroundColor: "#DEE2E6",
                  }}
                >
                  {usernameInput}
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Jabatan</label>
              <div>
                <label
                  className="w-100"
                  style={{
                    border: "1px solid #DEE2E6",
                    padding: "2px 10px 6px 10px",
                    borderRadius: "5px",
                    backgroundColor: "#DEE2E6",
                  }}
                >
                  {jabatanInput}
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-success mb-3 w-100">
              Save Changes
            </button>
            <button
              className="btn btn-secondary mb-3 w-100"
              onClick={() => {
                navigate("/change-password");
              }}
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
