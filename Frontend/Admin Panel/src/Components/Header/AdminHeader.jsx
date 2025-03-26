import { FaShopify } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SlLogout } from "react-icons/sl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authSuccess } from "../../redux/appSlice";
import { LuMoveLeft } from "react-icons/lu";

const AdminHeader = ({ pageTitle, isBackNavigation, navigationUrl }) => {
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
    <div className="flex items-center justify-between px-6 py-6 pb-4 max-lg:p-2.5 max-sm:p-1.5 border-b-2 border-red-200 w-full">
      <div className="flex gap-4 max-sm:gap-1 items-center">
        {isBackNavigation && (
          <Link
            to={navigationUrl}
            className="text-xl max-sm:text-base p-2 max-sm:p-1 hover:bg-slate-200 rounded-full"
          >
            <LuMoveLeft />
          </Link>
        )}
        <h1 className="text-textColor text-xl max-lg:text-lg max-sm:text-base font-bold">
          {pageTitle}
        </h1>
      </div>
      <div className="flex items-center gap-2 text-red-500">
        <div
          className="text-xl max-lg:text-lg max-sm:text-base p-2 text-slate-800 hover:bg-slate-200 mr-4 rounded-full"
          onClick={logoutHandler}
        >
          <SlLogout />
        </div>
        {/* <FaShopify className="w-6 h-6 max-sm:hidden" />
        <p className="text-xl font-semibold max-sm:hidden">store</p> */}
      </div>
    </div>
  );
};

export default AdminHeader;
