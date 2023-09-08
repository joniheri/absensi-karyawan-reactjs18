import "./App.css";
import { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ApiBaseUrl } from "./configs/AppConfig";
import { GlobalContext } from "./context/GlobalContext";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import NavbarBottom from "./components/NavbarBottom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PageNoteFound from "./pages/PageNoteFound";
import Profile from "./pages/Profile";

function App() {
  const [globalState, globalDispatch] = useContext(GlobalContext);

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
        });
      } else {
        console.log("Autorization Required");
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
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PageNoteFound />} />
          <Route path="/" element={<Home />} />
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>

        <NavbarBottom />
      </BrowserRouter>
    </>
  );
}

export default App;
