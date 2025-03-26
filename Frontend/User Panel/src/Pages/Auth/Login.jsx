import React from "react";
import { MdClose } from "react-icons/md";
import foodImg from "../../assets/login-food-img.avif";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { setUser, setAuth } from "../../Redux/appSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/login", { email, password });
      dispatch(setUser(data.user));
      dispatch(setAuth(false));
      toast.success("Logged in successfully");
    } catch (error) {
      console.log("error: ", error);
      toast.error(error?.response?.data?.message || "Error while login");
    }
  };
  return (
    <form
      className="flex flex-col gap-4 w-[80%] max-md:w-[90%]"
      onSubmit={loginHandler}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-[#6f7072]">
          Email
        </label>
        <input
          type="email"
          name="label"
          placeholder="Email..."
          className="border border-[#9fa0a3] text placeholder:text-[#9fa0a3] p-2 outline-none"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-[#6f7072]">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Password..."
          className="border border-[#9fa0a3] text placeholder:text-[#9fa0a3] p-2 outline-none"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="text-[#ff5200] cursor-pointer">
          <Link
            to={"/forgot-password"}
            onClick={() => dispatch(setAuth(false))}
          >
            Forgot Password?
          </Link>
        </span>
      </div>
      <div>
        <button
          type="submit"
          className="uppercase bg-[#ff5200] text-white w-full py-3 mt-2 rounded-sm"
        >
          LOGIN
        </button>
        <p className="text-[11px] text-[#9fa0a3] mt-1 tracking-wide">
          By clicking on Login, I accept the Terms & Conditions & Privacy Policy
        </p>
      </div>
    </form>
  );
};

export default Login;
