import React from "react";
import Login from "./Login";

export default function Home() {
  return (
    <div>
      <div className="container-fluid">
        <h1 className="mt-5 mb-4" style={{ textAlign: "center" }}>
          Selamat datang di Absensi Karyawan
        </h1>
      </div>

      <Login />
    </div>
  );
}
