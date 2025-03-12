import "./App.css";
import { useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { ApiBaseUrl } from "./configs/AppConfig";
import { GlobalContext } from "./context/GlobalContext";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import NavbarBottom from "./components/NavbarBottom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PageNoteFound from "./pages/PageNoteFound";
import Profile from "./pages/Profile/Profile";
import Attendance from "./pages/Attendance";
import SummaryAttendance from "./pages/SummaryAttendance";
import DataUsers from "./pages/user/DataUsers";
import EditPhotoProfile from "./pages/Profile/EditPhotoProfile";
import ChangePassword from "./pages/Profile/ChangePassword";
import AddUser from "./pages/user/AddUser";

function App() {
  const navigate = useNavigate();
  const [, globalDispatch] = useContext(GlobalContext);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      if (localStorage.token) {
        const token = localStorage.token;
        const response = await ApiBaseUrl.get("/check-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("response checktoken: ", response);
        globalDispatch({
          type: "PROCESS_LOGIN",
          data: response.data.user,
        });
        navigate("/profile");
      } else {
        // console.log("Autorization Required");
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
      globalDispatch({
        type: "PROCESS_LOGOUT",
      });
    }
  };

  return (
    <>
      <Routes>
        <Route path="*" element={<PageNoteFound />} />
        <Route path="/" element={<Home />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-photo-profile" element={<EditPhotoProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/summary-attendance" element={<SummaryAttendance />} />
          <Route path="/users" element={<DataUsers />} />
          <Route path="/add-user" element={<AddUser />} />
        </Route>
      </Routes>
      <NavbarBottom />
    </>
  );
}

export default App;
