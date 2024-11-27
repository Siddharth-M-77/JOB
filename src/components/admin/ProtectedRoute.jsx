import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading &&  user.role !== "recruiter") {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div><Loading/></div>; // Show a loading spinner or message while loading user data
  }

  return <>{children}</>;
};

export default ProtectedRoute;
