import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    console.log("submitHandler: ");
    e.preventDefault();

    const forgotPasswordPromise = new Promise((resolve, reject) => {
      axios
        .post("/forgot-password", {
          email,
        })
        .then((res) => {
          resolve(res);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
    toast.promise(forgotPasswordPromise, {
      pending: "Email is Sending...",
      success: "Reset link sent successfully. Check your inbox.",
      error: "Failed to send reset link. Please check your email.",
    });
    // try {
    //   const { data } = await axios.post("/forgot-password", {
    //     email,
    //   });

    //   if (data.emailSentResult) {
    //     toast.success("Reset link sent successfully. Check your inbox.");
    //   } else {
    //     toast.error("Failed to send reset link. Please check your email.");
    //   }
    // } catch (error) {
    //   console.log(error);

    //   toast.error("Error while sending reset link");
    // }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">
            Forgot Password
          </h2>

          <form onSubmit={submitHandler}>
            <p className="text-gray-600 mb-6 text-center">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="py-3 px-4 border w-full mb-6 rounded-lg"
            />
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none transition duration-200"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
