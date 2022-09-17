import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Context from "../reducer/Context";

export default function ProtectedRoute({ children }) {
  const { userState } = useContext(Context);

  if (!userState.isLoginSuccess) {
    return <Navigate to="/" replace />;
  }

  return children;
}
