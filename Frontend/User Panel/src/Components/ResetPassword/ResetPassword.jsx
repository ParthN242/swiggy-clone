import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { resetToken } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    try {
      await axios.post("/reset-password", {
        resetToken,
        newPassword: password,
      });
      toast.success(
        "Password reset successful. Please log in with your new password."
      );
      navigate("/");
    } catch (error) {
      console.log("error: ", error);
      toast.error("Error while resetting password");
    }
  };

  return (
    <div className="min-h-[100vh] bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text">
            Reset Password
          </h2>
          {/* {error && <p className="text-red-500 text-sm mb-4">{error}</p>} */}
          {/* {message && <p className="text-green-500 text-sm mb-4">{message}</p>} */}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="py-3 px-4 border w-full mb-6 rounded-lg"
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="py-3 px-4 border w-full mb-6 rounded-lg"
            />

            <button
              className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-700 "
              type="submit"
            >
              Set New Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
