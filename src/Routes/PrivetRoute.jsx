import { React, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { authContext } from "../Context/UserContext";
import Loading from "../Components/Loading/Loading";
import { toast } from "react-hot-toast";

const PrivatRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(authContext);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (!user) {
    toast.error("you should login first");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivatRoutes;
