import { useEffect, useState } from "react";
import AdminHeader from "../Header/AdminHeader";
import { toast } from "react-toastify";
import moment from "moment";
import axios from "axios";
import { useSocket } from "./../../../../User Panel/src/Conetext/SocketIo";

const Orders = () => {
  const socket = useSocket();
  const [orders, setOrders] = useState([]);

  const handleUpdateStatus = async (e, _id) => {
    try {
      const statusUpdate = e.target.value;
      await axios.put(`/order/${_id}`, {
        status: statusUpdate,
      });
      setOrders(
        orders.map((o) => {
          if (o._id === _id) {
            console.log({ ...o, status: statusUpdate });

            return { ...o, status: statusUpdate };
          } else {
            return o;
          }
        })
      );
      console.log("orders: ", orders);
    } catch (error) {
      console.log("error: ", error);
      toast.error("Error while updating status");
    }
  };

  useEffect(() => {
    const fetchAllUsersOrders = async () => {
      try {
        const { data } = await axios.get("/order");

        setOrders(data.orders);
      } catch (error) {
        console.log("error: ", error);
        toast.error("Error while fetching orders");
      }
    };
    fetchAllUsersOrders();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("create-order", (newOrder) => {
      setOrders((prevOrders) => [newOrder, ...prevOrders]);
    });
  }, [socket]);

  return (
    <section className="w-full max-h-screen flex flex-col px-2">
      <AdminHeader pageTitle={"Orders"} />
      <div className="pb-10 pt-2 px-2 max-md:px-1 max-h-full overflow-auto flex-1">
        {orders.length > 0 &&
          orders.map(
            ({
              _id,
              status,
              resDetail,
              cartItems,
              totalPayment,
              createdAt,
            }) => (
              <div
                className="w-full p-6 max-lg:p-3 max-xs:p-2 rounded-lg shadow-lg mb-4 max-sm:mb-3"
                key={_id}
              >
                <div className="flex gap-12 max-lg:gap-6 max-xs:gap-3 mb-4 pb-4 max-xs:mb-2.5 max-xs:pb-2.5 border-b border-b-light-gray">
                  <div className="max-md:hidden">
                    {/* Image */}
                    <img
                      src={resDetail.image}
                      alt={resDetail.name}
                      className="h-[118px] w-[160px] object-cover border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div className="flex-1 self-start flex flex-col gap-[2px]">
                    <h6 className="text-lg max-md:text-base font-semibold">
                      {resDetail.name}
                    </h6>
                    <p className="capitalize text-sm max-md:text-xs">
                      {resDetail.areaName} {resDetail.city}
                    </p>
                    <p className="text-sm max-md:text-xs">ID #{_id}</p>
                    <div>
                      {/* <button className="text-[12px] leading-normal text-orange-400">
                        View Details
                      </button> */}
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    {/* Status */}
                    {status === "Confirmed" && (
                      <button
                        className="bg-cyan-500 py-2 px-4 mb-4 max-md:mb-2 max-md:p-1.5 max-md:px-2.5 rounded-lg text-white text-[14px] max-md:text-xs outline-none *:bg-white *:text-black *:outline-none"
                        value={"Preparing"}
                        onClick={(e) => handleUpdateStatus(e, _id)}
                      >
                        Confirmed
                      </button>
                    )}
                    {status !== "Confirmed" ? (
                      <select
                        name="status"
                        id="status"
                        className={`${
                          status === "Preparing"
                            ? "bg-[#007BFF]"
                            : status === "On the Way"
                            ? "bg-[#FFA500]"
                            : status === "Delivered"
                            ? "bg-green-500"
                            : status === "Canceled"
                            ? "bg-red-500"
                            : ""
                        } py-2 px-4 rounded-lg mb-4 max-md:mb-2 max-md:p-1.5 max-md:px-2.5 text-white text-[14px] max-md:text-xs text-center outline-none *:bg-white *:text-black *:outline-none`}
                        defaultValue={status}
                        onChange={(e) => handleUpdateStatus(e, _id)}
                      >
                        {status !== "On the Way" &&
                          status !== "Delivered" &&
                          status !== "Canceled" && (
                            <option value="Preparing">Preparing</option>
                          )}
                        {status !== "Delivered" && status !== "Canceled" && (
                          <option value="On the Way">On the Way</option>
                        )}
                        {status !== "Canceled" && (
                          <option value="Delivered">Delivered</option>
                        )}

                        {status !== "Delivered" && (
                          <option value="Canceled">Canceled</option>
                        )}
                      </select>
                    ) : (
                      <button
                        className="bg-red-500 py-2 px-4  mb-4 max-md:mb-2 max-md:p-1.5 max-md:px-2.5 rounded-lg text-white text-[14px] max-md:text-xs outline-none *:bg-white *:text-black *:outline-none"
                        value={"Canceled"}
                        onClick={(e) => {
                          if (status !== "Canceled") handleUpdateStatus(e, _id);
                        }}
                      >
                        Canceled
                      </button>
                    )}
                    <div className="text-[14px] max-sm:text-xs">
                      {moment(createdAt).format("DD-MM-YYYY")}
                    </div>
                  </div>
                </div>
                {/* Bottom */}
                <div className="flex gap-4 justify-between items-center">
                  {/* Item Names */}
                  <div>
                    {cartItems.map((item) => (
                      <div
                        key={item._id + _id}
                        className="text-[#424242] text-[13px] max-sm:text-xs"
                      >
                        {item.food.name} x {item.quantity}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center flex-col">
                      <p className="text-[#424242] text-[12px] text-nowrap">
                        Total Payment:
                      </p>
                      <p className="text-[14px] leading-normal">
                        ₹ {totalPayment}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </section>
  );
};

export default Orders;
