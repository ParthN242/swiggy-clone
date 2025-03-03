import { useEffect, useState } from "react";
import AdminHeader from "../Header/AdminHeader";
import DashboardCard from "./DashboardCard";
import { toast } from "react-toastify";
import axios from "axios";

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

  return (
    <div>
      <AdminHeader pageTitle={"Dashboard"} />
      <div className="max-h-full px-8 py-4 ">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {cardDetail.length > 0 &&
            cardDetail.map(([key, value], index) => (
              <DashboardCard key={index} title={key} value={value} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
