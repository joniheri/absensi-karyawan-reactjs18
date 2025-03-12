import { useEffect, useState, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { ApiBaseUrl } from "../configs/AppConfig";
import { GlobalContext } from "../context/GlobalContext";

export default function PrivateRoute() {
  const [, globalDispatch] = useContext(GlobalContext);

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
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
