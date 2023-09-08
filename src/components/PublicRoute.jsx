import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function PublicRoute() {
  const [globalState] = useContext(GlobalContext);

  return !globalState.isLogin ? <Outlet /> : <Navigate to="/" />;
}
