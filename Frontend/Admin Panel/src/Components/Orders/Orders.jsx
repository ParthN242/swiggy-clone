import { useEffect, useState } from "react";
import AdminHeader from "../Header/AdminHeader";
import { toast } from "react-toastify";
import moment from "moment";
import axios from "axios";

const Orders = () => {
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

  return (
    <section className="w-full max-h-screen flex flex-col">
      <AdminHeader pageTitle={"Orders"} />
      <div className="pb-10 max-h-full overflow-auto flex-1">
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
              <div className="w-full p-6 rounded-lg shadow-lg" key={_id}>
                <div className="flex gap-12 mb-4 pb-4 border-b border-b-light-gray">
                  <div className="">
                    {/* Image */}
                    <div>
                      <img
                        src={resDetail.image}
                        alt={resDetail.name}
                        className="h-[118px] w-[160px] object-contain border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="flex-1 self-start flex flex-col gap-[2px]">
                    <h6 className="text-lg font-semibold">{resDetail.name}</h6>
                    <p className="capitalize text-sm">
                      {resDetail.areaName} {resDetail.city}
                    </p>
                    <p className="text-sm">ORDERS #{_id}</p>
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
                        className="bg-cyan-500 py-2 px-4 rounded-lg text-white text-[14px] mb-4 outline-none *:bg-white *:text-black *:outline-none"
                        value={"Preparing"}
                        onClick={(e) => handleUpdateStatus(e, _id)}
                      >
                        Confirmed
                      </button>
                    )}
                    {status !== "Canceled" ? (
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
                            : ""
                        } py-2 px-4 rounded-lg text-white text-[14px] mb-4 outline-none *:bg-white *:text-black *:outline-none`}
                        defaultValue={status}
                        onChange={(e) => handleUpdateStatus(e, _id)}
                      >
                        {status !== "On the Way" && status !== "Delivered" && (
                          <option value="Preparing">Preparing</option>
                        )}
                        {status !== "Delivered" && (
                          <option value="On the Way">On the Way</option>
                        )}

                        <option value="Delivered">Delivered</option>
                      </select>
                    ) : (
                      <button className="bg-red-500 py-2 px-4 rounded-lg text-white text-[14px] mb-4 outline-none *:bg-white *:text-black *:outline-none">
                        Canceled
                      </button>
                    )}
                    <div className="text-[14px]">
                      {moment(createdAt).format("DD-MM-YYYY")}
                    </div>
                  </div>
                </div>
                {/* Bottom */}
                <div className="flex justify-between items-center">
                  {/* Item Names */}
                  <div>
                    {cartItems.map((item) => (
                      <div
                        key={item._id + _id}
                        className="text-[#424242] text-[13px]"
                      >
                        {item.food.name} x {item.quantity}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center flex-col">
                      <p className="text-[#424242] text-[12px]">
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
