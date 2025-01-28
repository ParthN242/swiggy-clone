import React, { useState } from "react";
import moment from "moment";
import DeleteModel from "../DeleteModel/DeleteModel";
import axios from "axios";

const OrderCard = ({ order }) => {
  const { _id, status, resDetail, cartItems, totalPayment, createdAt } = order;

  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  const deleteOrderHandler = async () => {
    try {
      await axios.delete(`/order/${_id}`);
      toast.success("Order deleted successfully");
    } catch (error) {
      console.log("error: ", error);
      toast.error("Error while deleting order");
    }
    setOpenDeleteModel(false);
  };

  return (
    <div className="w-full p-6 max-lg:p-3 rounded-lg shadow-lg" key={_id}>
      <div className="flex gap-12 max-lg:gap-3 mb-4 pb-4 border-b border-b-light-gray">
        <div className="">
          {/* Image */}
          <div>
            <img
              src={resDetail.image}
              alt={resDetail.name}
              className="h-[118px] w-[160px] max-sm:hidden object-contain border border-slate-200 rounded-lg"
            />
          </div>
        </div>
        <div className="flex-1 self-start flex flex-col gap-[2px]">
          <h6 className="text-lg max-md:text-sm font-semibold">
            {resDetail.name}
          </h6>
          <p className="capitalize text-sm max-md:text-[10px]">
            {resDetail.areaName} {resDetail.city}
          </p>
          <p className="text-sm max-md:text-[10px]">ORDERS #{_id}</p>
          <div>
            <button className="text-[12px] max-md:text-[10px] leading-normal text-orange-400">
              View Details
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between">
          <div className="w-full">
            {/* Status */}
            {status === "Preparing" ? (
              <button className="bg-[#007BFF] w-full py-2 px-4 max-md:py-2 max-md:px-3 rounded-lg text-white text-[14px] mb-4">
                Preparing
              </button>
            ) : status === "On the Way" ? (
              <button className="bg-[#FFA500] w-full py-2 px-4 max-md:py-2 max-md:px-3 rounded-lg text-white text-[14px] mb-4">
                On the Way
              </button>
            ) : status === "Delivered" ? (
              <button className="bg-green-500 w-full py-2 px-4 max-md:py-2 max-md:px-3 rounded-lg text-white text-[14px] mb-4">
                Delivered
              </button>
            ) : (
              <button className="bg-red-500 w-full py-2 px-4 max-md:py-2 max-md:px-3 rounded-lg text-white text-[14px] mb-4">
                Cancelled
              </button>
            )}
            <div className="text-[14px] max-md:text-[10px] text-center">
              {moment(createdAt).format("DD-MM-YYYY")}
            </div>
          </div>
          {status !== "Canceled" && (
            <button
              onClick={() => setOpenDeleteModel(true)}
              className="border-2 text-nowrap border-red-500 mt-auto w-full py-2 px-4 max-md:py-1 max-md:px-2 rounded-lg text-red-500 text-[14px] max-md:text-[12px] hover:bg-red-500 hover:text-white transition-all duration-200"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
      {/* Bottom */}
      <div className="flex justify-between items-center">
        {/* Item Names */}
        <div>
          {cartItems.map((item) => (
            <div
              key={item._id + _id}
              className="text-[#424242] text-[13px] max-sm:text-[9px]"
            >
              {item.food.name} x {item.quantity}
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center flex-col">
            <p className="text-[#424242] text-[12px] max-sm:text-[10px]">
              Total Payment:
            </p>
            <p className="text-[14px] leading-normal">₹ {totalPayment}</p>
          </div>
        </div>
      </div>
      {openDeleteModel && (
        <DeleteModel
          setOpenDeleteModel={setOpenDeleteModel}
          deleteHandler={deleteOrderHandler}
        />
      )}
    </div>
  );
};

export default OrderCard;
