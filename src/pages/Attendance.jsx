import React, { useEffect, useState } from "react";
import { ApiBaseUrl } from "../configs/AppConfig";

export default function Attendance() {
  const [msgAlert, setMsgAlert] = useState("");
  const [typeAlert, setTypeAlert] = useState("");

  const [tanggal, setTanggal] = useState(new Date());
  const optionsDate = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateFormat = tanggal.toLocaleDateString("id-ID", optionsDate);

  const [jam, setJam] = useState(new Date());
  const optionsTime = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const timeFormat = jam.toLocaleTimeString("id-ID", optionsTime);

  useEffect(() => {
    dateNow();
    timeNow();
    getAttendanceConfig();
  }, []);

  const dateNow = () => {
    const interval = setInterval(() => {
      setTanggal(new Date());
    }, 1000); // Mengupdate tanggal setiap 1 detik

    return () => {
      clearInterval(interval); // Membersihkan interval saat komponen tidak lagi digunakan
    };
  };

  const timeNow = () => {
    const interval = setInterval(() => {
      setJam(new Date());
    }, 1000); // Mengupdate jam setiap 1 detik

    return () => {
      clearInterval(interval); // Membersihkan interval saat komponen tidak lagi digunakan
    };
  };

  const [timeStartIn, setTimeStartIn] = useState();
  const [timeEndIn, setTimeEndIn] = useState();
  const [timeStartOut, setTimeStartOut] = useState();
  const [timeEndOut, setTimeEndOut] = useState();

  const getAttendanceConfig = async () => {
    try {
      const response = await ApiBaseUrl.get("/attendanceconfig", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
      });
      // console.log(response);
      setTimeStartIn(response.data.data[0].timeStart.substring(0, 5));
      setTimeEndIn(response.data.data[0].timeEnd.substring(0, 5));
      setTimeStartOut(response.data.data[1].timeStart.substring(0, 5));
      setTimeEndOut(response.data.data[1].timeEnd.substring(0, 5));
    } catch (error) {
      console.log(error);
      setMsgAlert(error.response.data.message);
      setTypeAlert(error.response.data.status);
    }
  };

  const handleTakeAttendanceIn = async () => {
    try {
      if (
        timeFormat >= `${timeStartIn}.59` &&
        timeFormat <= `${timeEndIn}.59`
      ) {
        const response = await ApiBaseUrl.get("/take-attendance-in", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json",
          },
        });
        setMsgAlert(response.data.message);
        setTypeAlert("success");
        setTimeout(() => {
          setMsgAlert("");
        }, 2000);
      } else {
        setMsgAlert(
          `Ambil absen masuk, hanya di jam ${timeStartIn} - ${timeEndIn}`
        );
        setTypeAlert("fail");
      }
    } catch (error) {
      console.log(error);
      setMsgAlert(error.response.data.message);
      setTypeAlert(error.response.data.status);
    }
  };

  const handleTakeAttendanceOut = async () => {
    try {
      if (
        timeFormat >= `${timeStartOut}.59` &&
        timeFormat <= `${timeEndOut}.59`
      ) {
        const response = await ApiBaseUrl.get("/take-attendance-out", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json",
          },
        });
        setMsgAlert(response.data.message);
        setTypeAlert("success");
        setTimeout(() => {
          setMsgAlert("");
        }, 2000);
      } else {
        setMsgAlert(
          `Ambil absen pulang, hanya di jam ${timeStartOut} - ${timeEndOut}`
        );
        setTypeAlert("fail");
      }
    } catch (error) {
      console.log(error);
      setMsgAlert(error.response.data.message);
      setTypeAlert(error.response.data.status);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div style={{ textAlign: "center" }}>
        <h3 className="mt-5">Tanggal sekarang: {dateFormat}</h3>
        <h1 className="mt-3">
          <strong>{timeFormat}</strong>
        </h1>
        <div className="mt-4">
          <button
            className="btn btn-success me-3 mb-3"
            onClick={handleTakeAttendanceIn}
          >
            Ambil absen masuk
          </button>
          <button
            className="btn btn-secondary me-3 mb-3"
            onClick={handleTakeAttendanceOut}
          >
            Ambil absen pulang
          </button>
        </div>
        <div className="mt-4">
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
        </div>
      </div>
      <div className="text-center" style={{ marginTop: "100px" }}>
        <p style={{ margin: "0" }}>
          - Ambil absen masuk, hanya di jam {timeStartIn} - {timeEndIn}
        </p>
        <p style={{ margin: "0" }}>
          - Ambil absen pulang, hanya di jam {timeStartOut} - {timeEndOut}
        </p>
      </div>
    </div>
  );
}
