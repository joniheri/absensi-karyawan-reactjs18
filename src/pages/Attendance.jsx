import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function Attendance() {
  const [globalState] = useContext(GlobalContext);

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

  const takeAttendanceGoHome = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const takeAttendanceEnter = async () => {
    try {
    } catch (error) {}
  };

  return (
    <div className="container-fluid mt-4">
      <div style={{ textAlign: "center" }}>
        <h3 className="mt-5">Tanggal sekarang: {dateFormat}</h3>
        <h1 className="mt-3">
          <strong>{timeFormat}</strong>
        </h1>
        <div className=" mt-4">
          <button className="btn btn-success me-3 mb-3">
            Ambil absen masuk
          </button>
          <button className="btn btn-secondary me-3 mb-3">
            Ambil absen pulang
          </button>
        </div>
      </div>
      <div style={{ marginTop: "100px" }}>
        <p style={{ margin: "0" }}>
          - Ambil absen masuk, hanya di jam 05.00 - 07.59
        </p>
        <p style={{ margin: "0" }}>
          - Ambil absen pulang, hanya di jam 17.00 - 23.59
        </p>
      </div>
    </div>
  );
}
