import React, { useEffect, useState, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { ApiBaseUrl } from "../configs/AppConfig";
import { GlobalContext } from "../context/GlobalContext";

export default function PrivateRoute() {
  const [globalState, globalDispatch] = useContext(GlobalContext);

  const [isLogin, setIsLogin] = useState(true);

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
        setIsLogin(true);
        globalDispatch({
          type: "PROCESS_LOGIN",
          data: response.data.user,
        });
      } else {
        console.log("Autorization required");
        setIsLogin(false);
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
      setIsLogin(false);
      globalDispatch({
        type: "PROCESS_LOGOUT",
      });
    }
  };

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
}
