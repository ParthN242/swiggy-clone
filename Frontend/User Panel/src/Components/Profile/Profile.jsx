import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { setUser } from "../../Redux/appSlice";
import { Link } from "react-router-dom";
const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.app);

  const [userName, setUserName] = useState(user.name || "");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (userName === user.name) return;
    try {
      const { data } = await axios.post("/me", { name: userName });
      dispatch(setUser(data.user));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Error while updating profile");
      console.log("error: ", error);
    }
  };
  return (
    <div>
      <h1 className="text-4xl text-center font-semibold tracking-wider mb-6">
        Profile
      </h1>
      <div className="flex items-center justify-center">
        <form className="max-w-[80%] w-full shadow-2xl p-4 rounded-xl flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              value={user.email}
              className="p-2 bg-slate-100 rounded-lg disabled:text-slate-500"
              disabled
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name"> Name:</label>
            <input
              type="text"
              id="name"
              className="p-2 bg-slate-100 rounded-lg outline-none"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <span className="text-[#ff5200] cursor-pointer">
              <Link to={"/forgot-password"}>Update Password?</Link>
            </span>
          </div>
          <div>
            <button
              className="bg-[#ff5200] mx-auto flex items-center gap-2 text-nowrap px-16 hover:bg-[#dc692b] py-2 rounded-lg text-white font-bold"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
