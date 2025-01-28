import React from "react";
import { FaCircle } from "react-icons/fa";
import {
  addCartItem,
  decrementCartItem,
  incrementCartItem,
} from "../../Redux/appSlice";
import { useDispatch } from "react-redux";

const CartItemList = ({ resDetail, cartItems }) => {
  console.log("cartItems: ", cartItems);
  const dispatch = useDispatch();

  const itemTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = 50;

  const restaurantGST = Number((itemTotal * 0.04).toFixed(0));

  const toPay = itemTotal + deliveryFee + restaurantGST;

  const incrementItem = (_id) => {
    dispatch(incrementCartItem(_id));
  };

  const decrementItem = (_id) => {
    dispatch(decrementCartItem(_id));
  };
  return (
    <div className="w-[35%] max-md:w-full bg-white">
      <div className="flex flex-col">
        {/* Top */}
        <div className="py-[20px] px-[30px] max-md:py-[10px] max-md:px-[10px] flex gap-2">
          <div>
            <img
              height="50"
              width="50"
              alt={resDetail.name}
              src={resDetail.image}
            ></img>
          </div>
          <div className="flex flex-col gap-[1px] ">
            <div>{resDetail.name}</div>
            <div className="text-[12px] text-[#686b78]">
              {resDetail.areaName}
            </div>
            <div className="w-[50px] h-[2px] bg-black mt-1"></div>
          </div>
        </div>
        {/* Center */}
        <div className="max-h-[60vh] overflow-y-auto">
          <div className="flex flex-col mx-6 pt-6 max-md:mx-2 max-md:pt-3">
            {cartItems?.map((item) => {
              return (
                <div
                  key={item._id}
                  className="flex w-full justify-between px-2 mb-3 last:mb-0 items-center"
                >
                  <div className="flex items-center w-[50%]">
                    {!item?.isVeg ? (
                      <h5>
                        <FaCircle className="border border-solid border-[#e43b4f] text-[#e43b4f] text-xl max-h-4 max-w-4 p-[2px] text-[8px] -rotate-90" />
                      </h5>
                    ) : (
                      <h5>
                        <FaCircle className="border border-solid border-[#0f8a65] text-[#0f8a65] text-xl max-h-4 max-w-4 p-[2px] text-[8px]" />
                      </h5>
                    )}
                    <h1 className="ml-2 flex-1 text-left text-sm leading-4 overflow-clip">
                      {item.name}
                    </h1>
                  </div>
                  <div className=" flex border-[1.11px] border-solid border-gray-300 p-1 text-sm items-center">
                    <div
                      className="px-2 font-bold flex-1 text-[#3e4152] cursor-pointer"
                      onClick={() => {
                        decrementItem(item._id);
                      }}
                    >
                      -
                    </div>
                    <div className="px-2 font-bold flex-1 text-[#60b246] text-xs">
                      {item.quantity}
                    </div>
                    <div
                      className="px-2 font-bold flex-1 text-[#60b246] cursor-pointer"
                      onClick={() => {
                        incrementItem(item._id);
                      }}
                    >
                      +
                    </div>
                  </div>
                  <div className="w-[10%] text-[#686b78] text-xs">
                    ₹{item.quantity * item.price}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex bg-[#f9f9f9] items-center mx-6 rounded mt-6">
            <div className="px-4">
              <svg
                className="text-[#282c3f] h-[10px] w-[15px] items-center mx-2"
                viewBox="0 0 32 32"
              >
                <path d="M7.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.357-0.056 0.724-0.086 1.097-0.086zM25.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.358-0.056 0.724-0.086 1.097-0.086z"></path>
              </svg>
            </div>
            <input
              className="focus:outline-none w-full py-5 bg-[#f9f9f9] tracking-tighter text-sm"
              type="text"
              placeholder="Any suggestions? We will pass it on..."
              // value={suggestionText}
              // onChange={(e) => {
              //   setSuggestionText(e.target.value);
              // }}
            />
          </div>
          <div className="mx-4 px-2 py-4">
            <div className="text-[#282c3f] text-sm font-bold pt-4 ">
              Bill Details
            </div>
            <div className="flex justify-between text-xs font-semibold pt-4 text-[#686b78]">
              <h3>Item Total</h3>
              <h3 className="text-nowrap">₹{itemTotal}</h3>
            </div>
            <div className="flex justify-between border-t border-solid text-[#686b78] text-xs font-semibold pb-4 pt-4 mt-4">
              <div className="flex items-end">
                Delivery Fee | {5}
                <div className="ml-2 rounded-full border-[#686b78] border px-[4px] text-[10px] leading-3 text-[#686b78] font-bold flex self-baseline">
                  i
                </div>
              </div>
              <h3 className="text-nowrap">
                ₹ {deliveryFee}
                {/* {Number(deliveryFee) ||
                          (Number(distance.split(" ")[0]) * 6.8).toFixed(2)} */}
              </h3>
            </div>
            <div className="flex justify-between text-[#686b78] text-xs font-semibold pb-4">
              <div className="flex items-end">
                GST and Restaurant Charges
                <div className="ml-2 rounded-full border-[#686b78] border px-[4px] text-[10px] leading-3 text-[#686b78] font-bold flex self-baseline">
                  i
                </div>
              </div>
              <h3 className="text-nowrap">₹{restaurantGST}</h3>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="py-[20px] px-[30px] flex items-center justify-between border-t border-gray-400">
          <div>To Pay</div>
          <div>₹{toPay}</div>
        </div>
      </div>
    </div>
  );
};

export default CartItemList;
