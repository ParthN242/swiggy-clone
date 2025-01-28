import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../Components/Loader/Loading";

const ProtectedRoute = () => {
  const { auth } = useSelector((state) => state.app);

  return (
    <>
      {auth.admin ? (
        <Outlet />
      ) : auth.loading ? (
        <Loading />
      ) : auth.error ? (
        <Navigate to={"/login"} />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProtectedRoute;
