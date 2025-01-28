import React, { useEffect, useState } from "react";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./Utils/ProtectedRoute";
import { authFailure, authRequest, authSuccess } from "./redux/appSlice";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isLogin = async () => {
      dispatch(authRequest());
      try {
        const { data } = await axios.get("/auth/profile");
        dispatch(authSuccess(data.admin));
      } catch (error) {
        console.log("error: ", error);
        toast.error(error);
        dispatch(authFailure());
      }
    };

    isLogin();
  }, []);

  return (
    <div className="max-w-[100vw] min-h-screen bg-primary box-border">
      <ToastContainer autoClose="1000" closeButton />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
