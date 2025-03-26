import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { MdAddModerator } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const AdminLeftSection = () => {
  return (
    <aside className="w-[23%] max-md:w-[20%] max-sm:w-auto min-h-screen bg-[#ff5200] px-4 max-lg:px-3 py-3 max max-sm:p-1">
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="flex items-center justify-center gap-2 cursor-pointer"
      >
        <Link
          to={"/"}
          className="text-white text-xl font-bold max-w-[55px] max-md:w-[40px]"
        >
          <img
            src="/web-logo-white.png"
            alt="logo"
            className="w-full h-full object-cover"
          />
        </Link>
      </motion.div>
      <ul className="mt-6 flex max-sm:items-center max-sm:justify-center flex-col gap-2">
        <NavItem link={"/"} icon={<AiFillDashboard />} title={"Dashboard"} />
        <NavItem
          link={"/restaurant"}
          icon={<MdAddModerator />}
          title={"Restaurant"}
        />
        {/* <NavItem
          link={"/menu"}
          icon={<MdOutlineRestaurantMenu />}
          title={"Menu"}
        /> */}
        <NavItem link={"/orders"} icon={<CiHeart />} title={"Orders"} />
        <NavItem link={"/users"} icon={<FiUsers />} title={"Users"} />
      </ul>
    </aside>
  );
};

const NavItem = ({ link, icon, title }) => {
  return (
    <li className="max-md:w-fit">
      <NavLink
        to={link}
        className={({ isActive }) =>
          `${
            isActive ? "bg-orange-700 " : ""
          }  rounded-lg hover:bg-orange-700 px-4 py-4 max-lg:p-3 max-md:p-2 flex items-center max-sm:justify-center gap-3 max-lg:gap-2`
        }
      >
        <p className="text-white font-bold text-xl max-lg:text-lg max-md:text-base max-sm:text-lg">
          {icon}
        </p>
        <p className="text-lg max-lg:text-base font-semibold text-white max-sm:hidden">
          {title}
        </p>
      </NavLink>
    </li>
  );
};

export default AdminLeftSection;
