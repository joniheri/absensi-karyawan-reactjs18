import React, { useEffect, useState } from "react";
import { ApiBaseUrl } from "../../configs/AppConfig";
import { useNavigate } from "react-router-dom";

export default function DataUsers() {
  const navigate = useNavigate();

  const [dataUsers, setDataUsers] = useState([]);
  const [dataAttendance, setDataAttendance] = useState([]);

  useEffect(() => {
    getDataUsers();
  }, []);
  const getDataUsers = async () => {
    try {
      const response = await ApiBaseUrl.get("/users", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      // console.log(response);
      setDataUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSummaryAbsensiKaryawanByEmail = async (e) => {
    try {
      const userId = e.target.value;
      const response = await ApiBaseUrl.get(
        `/attendance-user-byemail/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setDataAttendance(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <h3 className="border-bottom mb-3 pb-2">Users</h3>

      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="datausers-tab"
            data-bs-toggle="tab"
            data-bs-target="#datausers-tab-pane"
            type="button"
            role="tab"
            aria-controls="datausers-tab-pane"
            aria-selected="true"
          >
            Data Users
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane"
            aria-selected="false"
          >
            Absensi Karyawan
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="datausers-tab-pane"
          role="tabpanel"
          aria-labelledby="datausers-tab"
          tabIndex="0"
          style={{ backgroundColor: "#fff" }}
        >
          <div className="mt-4">
            <div className="mb-2">
              <button
                className="btn btn-success"
                onClick={() => {
                  navigate("/add-user");
                }}
                style={{ width: "80px" }}
              >
                Add
              </button>
            </div>
            <table className="table table-sm table-striped">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Email</th>
                  <th scope="col">Fullname</th>
                  <th scope="col">Jabatan</th>
                </tr>
              </thead>
              <tbody>
                {dataUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.email}</td>
                      <td>{item.fullname}</td>
                      <td>{item.jabatan}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="profile-tab-pane"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabIndex="0"
          style={{ backgroundColor: "#fff" }}
        >
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="input-group mb-4">
                <label className="input-group-text" for="inputGroupSelect01">
                  User
                </label>
                <select
                  className="form-select"
                  id=""
                  name="userId"
                  onChange={(e) => {
                    handleSummaryAbsensiKaryawanByEmail(e);
                  }}
                >
                  {dataUsers.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.email}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <table className="table table-sm table-striped">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Status Absen</th>
                      <th scope="col">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataAttendance.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.status}</td>
                          <td>
                            {item.dateAttendance} {item.timeAttendance}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
