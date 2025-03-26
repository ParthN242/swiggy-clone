import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  NavLink,
  Route,
  Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { setUser } from "../../Redux/appSlice";
import Orders from "../../Components/Orders/Orders";
import Profile from "../../Components/Profile/Profile";

const MyAccount = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const signOutUser = async () => {
    try {
      await axios.get("/auth/logout");
      dispatch(setUser(null));
      toast.success("Log out");
      navigate("/");
    } catch (error) {
      console.log("error: ", error);
      toast.error("Error while sign out");
    }
  };

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      {!user ? (
        <>loading...</>
      ) : (
        <div className="w-full min-h-[100vh] flex bg-[#37718e] pb-20">
          <div className="w-[80%] max-lg:w-[95%] mx-auto mt-[60px] max-md:mt-[30px]">
            <div className="text-white font-proxi mb-8 flex justify-between">
              <div>
                <h1 className="capitalize text-3xl max-lg:text-lg font-bold">
                  {user.name}
                </h1>
                <p className="text-lg max-lg:text-sm">{user.email}</p>
              </div>
              <div>
                <button
                  className="bg-transparent border border-white px-6 py-3 max-lg:px-3 max-lg:py-2 hover:text-[#37718e] hover:bg-white transition-all duration-200"
                  onClick={signOutUser}
                >
                  LOG OUT
                </button>
              </div>
            </div>
            <div className="w-full h-screen bg-white p-8 max-lg:p-3 flex max-md:flex-col gap-4 max-md:gap-[6px]">
              {/* Aside */}
              <aside className="bg-[#edf1f7] w-[240px] max-lg:w-[140px]  flex flex-col max-md:flex-row max-md:w-full max-md:justify-center gap-4 py-6 pl-[20px] max-lg:p-2 max-md:p-1">
                <NavLink
                  to={"/my-account/orders"}
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-white " : ""
                    } py-4 pr-12 pl-10 max-lg:p-2 font-semibold max-md:text-sm text-left max-lg:text-center hover:bg-white`
                  }
                >
                  Orders
                </NavLink>
                <NavLink
                  to={"/my-account/profile"}
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-white " : ""
                    } py-4 pr-12 pl-10 max-lg:p-2 font-semibold max-md:text-sm text-left max-lg:text-center hover:bg-white`
                  }
                >
                  Profile
                </NavLink>
              </aside>
              <div className="flex-1 bg-white overflow-auto">
                <Routes>
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyAccount;
