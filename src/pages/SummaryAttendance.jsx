import React, { useContext, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GlobalContext } from "../context/GlobalContext";
import { ApiBaseUrl } from "../configs/AppConfig";

export default function SummaryAttendance() {
  const [globalState] = useContext(GlobalContext);

  const today = new Date();
  const [startDate, setStartDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [endDate, setEndDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );

  const [dataAttendance, setDataAttendance] = useState([]);

  useEffect(() => {
    getAttendance();
  }, []);

  const getAttendance = async () => {
    try {
      const response = await ApiBaseUrl.post(
        "/attendance-byuser",
        {
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response);
      setDataAttendance(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid mt-4 mt-3">
      <h3 className="border-bottom pb-2">
        Data Absensi : <strong>{globalState.userLogin.fullname}</strong>
      </h3>
      <div>
        <p style={{ margin: 0, marginBottom: "5px" }}>Filter Tanggal</p>
        <div className="row">
          <div className="col-md-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className="custom-datepicker me-3 mb-2"
            />
          </div>
          <div className="col-md-2">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              className="custom-datepicker me-3 mb-2"
            />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-secondary btn-sm"
              onClick={getAttendance}
            >
              Cari
            </button>
          </div>
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
  );
}
