import { FaShopify } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SlLogout } from "react-icons/sl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authSuccess } from "../../redux/appSlice";

const AdminHeader = ({ pageTitle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await axios.get("/auth/logout");
      navigate("/login");
      toast.success("Logged out successfully");
      dispatch(authSuccess(null));
    } catch (error) {
      console.log("error: ", error);
      toast.error("Error while logging out");
    }
  };
  return (
    <Link
      to="/"
      className="flex items-center justify-between px-6 py-6 pb-4 border-b-2 border-red-200 w-full"
    >
      <h1 className="text-textColor text-xl font-bold">{pageTitle}</h1>
      <div className="flex items-center gap-2 text-red-500">
        <div
          className="text-xl p-2 text-slate-800 hover:bg-slate-200 mr-4 rounded-full"
          onClick={logoutHandler}
        >
          <SlLogout />
        </div>
        <FaShopify className="w-6 h-6" />
        <p className="text-xl font-semibold">store</p>
      </div>
    </Link>
  );
};

export default AdminHeader;
