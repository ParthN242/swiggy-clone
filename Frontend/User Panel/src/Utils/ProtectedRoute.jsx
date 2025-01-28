import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../Components/Loader/Loading";

const ProtectedRoute = () => {
  const { user, userLoading, userError } = useSelector((state) => state.app);

  return (
    <>
      {user ? (
        <Outlet />
      ) : userLoading ? (
        <Loading />
      ) : userError ? (
        <Navigate to={"/"} />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProtectedRoute;
