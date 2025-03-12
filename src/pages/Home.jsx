import Login from "./Login";

export default function Home() {
  return (
    <div>
      <div className="container-fluid mt-5">
        <h1 className="mb-4" style={{ textAlign: "center" }}>
          Selamat datang di Absensi Karyawan
        </h1>
      </div>

      <Login />
    </div>
  );
}
