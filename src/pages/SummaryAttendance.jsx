import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function SummaryAttendance() {
  const [globalState] = useContext(GlobalContext);

  return (
    <div className="container-fluid mt-4">
      <h3>
        Data Absensi : <strong>{globalState.userLogin.fullname}</strong>
      </h3>
    </div>
  );
}
