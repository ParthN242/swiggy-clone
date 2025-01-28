import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const SignUp = ({ setIsLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/signUp", {
        name,
        email,
        password,
      });
      toast.success("Sign Up successful");
      setIsLogin(true);
    } catch (error) {
      console.log("error: ", error);
      toast.error(error.message);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-[80%] max-md:w-[90%]"
      onSubmit={signUpHandler}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-[#6f7072]">
          Name
        </label>
        <input
          type="text"
          name="label"
          placeholder="Name..."
          className="border border-[#9fa0a3] text placeholder:text-[#9fa0a3] p-2 outline-none"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
      </div>
      <div>
        <button
          type="submit"
          className="uppercase bg-[#ff5200] text-white w-full py-3 mt-2 rounded-sm"
        >
          CONTINUE
        </button>
        <p className="text-[11px] text-[#9fa0a3] mt-1 tracking-wide">
          By clicking on Login, I accept the Terms & Conditions & Privacy Policy
        </p>
      </div>
    </form>
  );
};

export default SignUp;
