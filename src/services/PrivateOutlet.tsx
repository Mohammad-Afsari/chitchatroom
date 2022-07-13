import { useAuth } from "../store/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect } from "react";

const PrivateOutlet = () => {
  const { session } = useAuth();
  return session ? <Outlet /> : <Navigate to="/login" />;
};

export default React.memo(PrivateOutlet);
// export default PrivateOutlet;
