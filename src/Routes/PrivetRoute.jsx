import { React, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../Context/UserContext";
import { toast } from "react-hot-toast";
import Loading from "../components/Loading/Loading";

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
    toast.error("Please Log In", { id: 1 });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivatRoutes;
