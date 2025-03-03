import React from "react";
import Header from "./Components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/Auth";
import Cart from "./Pages/Cart/Cart";
import RestaurantMenu from "./Pages/RestaurantMenu/RestaurantMenu";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect } from "react";
import { setUser, setUserError, setUserLoading } from "./Redux/appSlice";
import MyAccount from "./Pages/MyAccount/MyAccount";
import Payment from "./Pages/Payment/Payment";
import ProtectedRoute from "./Utils/ProtectedRoute";
import Footer from "./Components/Footer/Footer";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Search from "./Pages/Search/Search";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

const App = () => {
  const { isAuthOpen, user } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      const fetchUserProfile = async () => {
        dispatch(setUserLoading(true));
        dispatch(setUserError(false));
        try {
          const { data } = await axios.get(`/me`);
          dispatch(setUser(data.user));
        } catch (error) {
          dispatch(setUser(null));
          dispatch(setUserError(true));
        } finally {
          dispatch(setUserLoading(false));
        }
      };
      fetchUserProfile();
    }
  }, [user, dispatch]);

  return (
    <div className="relative">
      <ToastContainer autoClose="1500" />
      <BrowserRouter>
        {isAuthOpen && <Auth />}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/restaurant/:resId" element={<RestaurantMenu />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/reset-password/:resetToken"
            element={<ResetPassword />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/my-account/*" element={<MyAccount />} />
            <Route path="/payment" element={<Payment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
