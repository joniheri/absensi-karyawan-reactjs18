import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiBaseUrl } from "../../configs/AppConfig";

export default function EditPhotoProfile() {
  const navigate = useNavigate();

  const [msgAlert, setMsgAlert] = useState("");
  const [typeAlert, setTypeAlert] = useState("");

  const [imageInput, setImageInput] = useState(null);
  const [changeImage, setChangeImage] = useState(null);

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
      console.log(response);
      setChangeImage(
        `http://localhost:3001/uploads/${response.data.user.photo}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      console.log("ImageInput: ", imageInput);
      if (imageInput === "" || imageInput === null) {
        setMsgAlert("Tidak ada foto yang dipilih");
        setTypeAlert("fail");
        return;
      }

      const token = localStorage.token;

      const response = await ApiBaseUrl.patch(
        "http://localhost:3001/api/edit-photo-profile",
        {
          file: imageInput,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMsgAlert(response.data.message);
      setTypeAlert(response.data.status);
      setTimeout(() => {
        setMsgAlert("");
      }, 2500);
    } catch (error) {
      console.log(error);
      if (error.response) {
        setMsgAlert(error.response.data.message);
        setTypeAlert(error.response.data.status);
      } else {
        setMsgAlert(error.message);
        setTypeAlert("fail");
      }
    }
  };

  return (
    <div className="container-fluid mt-3">
      <h3 className="border-bottom mb-4 pb-2">
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
          <span>Edit Photo Profile</span>
        </div>
      </h3>

      <div className="row">
        <div className="col-md-3">
          <form onSubmit={handleSave}>
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

            <img
              className="img-thumbnail"
              src={
                changeImage === null
                  ? "assets/img/others/profile-42914_1280.jpg"
                  : changeImage
              }
              alt=""
            />
            <input
              type="file"
              className="form-control mb-3"
              accept="image/*"
              onChange={(e) => {
                setChangeImage(URL.createObjectURL(e.target.files[0]));
                setImageInput(e.target.files[0]);
              }}
            />
            <button type="submit" className="btn btn-success mb-3 w-100">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
