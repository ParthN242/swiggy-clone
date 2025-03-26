import { useEffect, useState } from "react";
import AdminHeader from "../Header/AdminHeader";
import DashboardCard from "./DashboardCard";
import { toast } from "react-toastify";
import axios from "axios";
import { FaUserAlt } from "react-icons/fa";
import {
  MdRestaurant,
  MdShoppingCart,
  MdOutlineAttachMoney,
  MdLunchDining,
} from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";

const Dashboard = () => {
  const [cardDetail, setCardDetail] = useState([]);
  console.log("cardDetail: ", cardDetail);
  useEffect(() => {
    const fetchDashboardDetail = async () => {
      try {
        const { data } = await axios.get("restaurant/dashboard");
        const dataArray = Object.entries(data);

        setCardDetail(dataArray);
      } catch (error) {
        console.log("error: ", error);
        toast.error("Error while fetching dashboard data");
      }
    };
    fetchDashboardDetail();
  }, []);

  const iconMap = {
    users: <FaUserAlt />,
    foods: <MdLunchDining />,
    restaurants: <MdRestaurant />,
    orders: <MdShoppingCart />,
    revenue: <MdOutlineAttachMoney />,
    totalSales: <AiOutlineShopping />,
  };

  return (
    <div>
      <AdminHeader pageTitle={"Dashboard"} />
      <div className="max-h-full px-8 py-4 max-md:px-5 max-md:py-2">
        <div className="grid grid-cols-3 max-lg:grid-cols-2 max-xs:grid-cols-1 gap-4 flex-wrap">
          {cardDetail.length > 0 &&
            cardDetail.map(([key, value], index) => (
              <DashboardCard
                key={index}
                title={key}
                value={value}
                icon={iconMap[key] || <FaUserAlt />}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
