import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import foodImg from "../../assets/login-food-img.avif";
import Login from "./Login";
import SignUp from "./SignUp";
import { useDispatch } from "react-redux";
import { setAuth } from "../../Redux/appSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed top-0 left-0 w-[100%] h-[100vh] bg-[#282c3fa8] z-[1000] overflow-hidden scrollbar-none flex ">
      <div
        className="w-[65%] h-full max-md:w-[15%]"
        onClick={() => dispatch(setAuth(false))}
      ></div>
      <div className="w-[45%] max-md:w-[85%] bg-white h-full pt-[30px] pl-[40px] pr-[160px] max-lg:pr-[20px] max-sm:pr-[10px]">
        <div className="" onClick={() => dispatch(setAuth(false))}>
          <MdClose className="text-[#535665] text-2xl cursor-pointer" />
        </div>
        <div className="my-8 relative">
          <h3 className="text-[30px] leading-none">
            {isLogin ? "Login" : "Sign Up"}
          </h3>
          <p className="py-4 relative text-light-gray text-sm after:content-[''] after:block after:w-[30px] after:h-[2px] after:bg-black after:left-0 after:bottom-0 after:absolute">
            or{" "}
            {isLogin ? (
              <span
                className="text-[#ff5200] cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                create an account
              </span>
            ) : (
              <span
                className="text-[#ff5200] cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                login to your account
              </span>
            )}
          </p>
          <div className="absolute right-0 -top-3 max-md:hidden">
            <img src={foodImg} alt="food image" className="w-[100px]" />
          </div>
        </div>
        {/* Form */}
        {isLogin ? <Login /> : <SignUp setIsLogin={setIsLogin} />}
      </div>
    </div>
  );
};

export default Auth;
