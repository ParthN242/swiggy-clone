import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteModel from "../DeleteModel/DeleteModel";
import OrderCard from "../OrderCard/OrderCard";

const Orders = () => {
  const { user } = useSelector((state) => state.app);

  const [orders, setOrders] = useState([]);

  if (!user) {
    return navigate("/");
  }

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const { data } = await axios.get("/order");
        setOrders(data.orders);
      } catch (error) {
        console.log("error: ", error);
        toast.error("Error While Fetching Orders");
      }
    };
    fetchMyOrders();
  }, []);

  return (
    <div className="w-full relative">
      <div className="flex flex-col gap-4">
        {orders.length === 0 && (
          <div>
            <div className="mt-8 mb-4 max-lg:mt-4 max-lg:mb-2 text-2xl text-center text-gray-600/90 font-semibold ">
              No Order Place Yet !
            </div>
            <div className="flex items-center justify-center">
              <Link
                to={"/"}
                className="bg-[#fc8019] text-white text-lg  px-4 py-3"
              >
                Place order now
              </Link>
            </div>
          </div>
        )}
        {orders.map((order) => (
          <OrderCard order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
