import React, { useState } from "react";
import emptyCart from "../../assets/emptyCart.webp";
import { Link, useNavigate } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setAddressModel, setAuth } from "../../Redux/appSlice";
import CartItemList from "./CartItemList";
import moment from "moment";
import Address from "../../Components/Address/Address";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, cart, isAddressModelOpen } = useSelector((state) => state.app);
  console.log("cart: ", cart);

  const { resDetail, cartItems } = cart;

  const [confirmAddress, setConfirmAddress] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleAddAddress = () => {
    dispatch(setAddressModel(true));
  };
  const handleConfirmAddress = () => {
    setConfirmAddress(!confirmAddress);
    setConfirmPayment(!confirmPayment);
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-10 flex flex-col items-center justify-center">
        <img src={emptyCart} className="w-[24rem]" alt="Empty Cart" />
        <h1 className="text-2xl text-[#535665] font-bold pt-5 tracking-tighter">
          Your cart is empty
        </h1>
        <p className="text-[#7e808c] py-4">
          You can go to home page to view more restaurants
        </p>
        <Link
          to="/"
          className="bg-[#fc8019] text-white text-lg font-semibold px-4 py-3"
        >
          SEE RESTAURANTS NEAR YOU
        </Link>
      </div>
    );
  }

  return (
    <>
      {isAddressModelOpen && <Address />}
      {/* Cart */}
      <div className="bg-[#e9ecee] w-full min-h-[100vh] flex">
        <div className=" mt-[30px] mb-[150px] max-md:mt-[10px] max-md:mb-[70px] w-[80%] max-md:w-[95%] mx-auto flex max-md:flex-col-reverse gap-[30px]">
          {/* Left Side */}
          <div className="w-[65%] max-md:w-full">
            {/* Login */}
            {!user && (
              <div className="p-8 mb-5 max-md:p-2 max-md:mb-0 bg-white w-full flex">
                <div className="relative bg-[#282c3f] h-fit right-12 max-md:right-2 max-md:-top-6 p-2 shadow-[0px_3px_5px_0px_#282c3f66] ">
                  <IoPersonOutline className="text-white text-xl" />
                </div>
                <div>
                  <h6 className="font-semibold">Account</h6>
                  <p className="text-sm text-[#7f828f]">
                    To place your order now, log in to your existing account or
                    sign up.
                  </p>
                  <div className="mt-4 flex ">
                    <button
                      className="flex flex-col mr-6 px-5 py-2 items-center border border-green-600 text-green-600 hover:shadow-md"
                      onClick={() => dispatch(setAuth(true))}
                    >
                      <p className="text-[13px] text-green-600/70 ">
                        Have an account?
                      </p>
                      <h6 className="text-[14px] font-semibold">LOG IN</h6>
                    </button>
                    <button
                      className="flex flex-col mr-6 px-8 py-2 items-center border border-green-600 bg-[#60b246] text-white hover:shadow-md"
                      onClick={() => dispatch(setAuth(true))}
                    >
                      <p className="text-[13px] font-light ">New To Swiggy?</p>
                      <h6 className="text-[14px] font-semibold">SIGN UP</h6>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Address */}
            <div className="p-8 mb-5 max-md:p-2 max-md:mb-0 bg-white w-full flex">
              {/* Svg */}
              <div
                className={`relative h-fit right-12 max-md:right-2 max-md:-top-6 p-2 shadow-[0px_3px_5px_0px_#282c3f66] ${
                  user
                    ? "bg-[#282c3f] stroke-white"
                    : "bg-white stroke-[#282c3f] text-[#282c3f]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="-ml-4 max-md:-ml-0 flex-1 max-md:w-fit">
                {/* confirm Address */}
                {!user ? (
                  // When user is not logged in
                  <div className="text-base text-[#82848b] mt-8">
                    Delivery Address
                  </div>
                ) : confirmAddress ? (
                  // when user Confirm Address
                  <div className="flex-col">
                    <div className="flex justify-between items-center mb-8">
                      <div className="flex">
                        <h2 className="text-base self-center text-[#282c3f] font-semibold  pr-3">
                          Delivery Address
                        </h2>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 24 24"
                          fill="#60b246"
                          stroke="#fff"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-5" />
                        </svg>
                      </div>
                      <h2
                        className="text-[#f3730a] font-semibold text-sm cursor-pointer"
                        onClick={handleConfirmAddress}
                      >
                        CHANGE
                      </h2>
                    </div>
                    <h2 className="text-base text-[#282c3f] font-semibold mb-1">
                      Home
                    </h2>
                    <h2 className="text-sm text-[#7f828f] font-medium tracking-tight leading-3 mb-6 capitalize">
                      {user.areaName}, {user.city}, Gujarat
                    </h2>
                    <h3 className="text-sm text-[#282c3f] font-semibold tracking-tight leading-3 mt-6">
                      {moment().format("DD-MM-YYYY")}
                    </h3>
                  </div>
                ) : (
                  <>
                    {/* Select Address */}
                    <div>
                      <h2 className="text-lg  text-[#282c3f] font-bold">
                        Select a delivery address
                      </h2>
                      <h3 className="text-[#7e808c]">
                        &nbsp; You have a saved address here
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-6 items-center">
                      {/* Address */}
                      {user?.address && (
                        <div className="border  border-dashed mt-6 w-80 max-md:w-full h-56 px-4 pt-4 pb-2 cursor-pointer hover:shadow-[0px_2px_8px_#d4d5d9]">
                          <div className="mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#282c3f"
                            >
                              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            <div className="relative flex -top-[1.6rem] -right-2 items-center justify-center rounded-full bg-[#60b246] w-3 h-3 text-white text-xs">
                              +
                            </div>
                          </div>
                          <div className="">
                            <h3 className="font-medium text-base tracking-tight">
                              Address
                            </h3>
                            <h3 className="overflow-clip text-[#7f828f] text-sm capitalize">
                              {user.areaName}, {user.city}, Gujarat
                            </h3>
                            <div
                              className="my-4 border border-[#60b246] border-solid bg-[#60b246] text-center py-3 px-6 tracking-wider w-fit text-sm font-bold text-white"
                              onClick={handleConfirmAddress}
                            >
                              DELIVERY HERE
                            </div>
                          </div>
                        </div>
                      )}
                      {/* New Address */}
                      <div
                        className="border  border-dashed mt-6 w-80 max-md:w-full h-56 px-4 pt-4 pb-2 cursor-pointer hover:shadow-[0px_2px_8px_#d4d5d9]"
                        onClick={handleAddAddress}
                      >
                        <div className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#282c3f"
                          >
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <div className="relative flex -top-[1.6rem] -right-2 items-center justify-center rounded-full bg-[#60b246] w-3 h-3 text-white text-xs">
                            +
                          </div>
                        </div>
                        <div className="">
                          <h3 className="font-medium text-base tracking-tight">
                            Add new Address
                          </h3>
                          <div className="my-4 border border-[#60b246] border-solid text-[#60b246] text-center py-3 px-6 tracking-wider w-fit text-sm font-bold bg-white">
                            ADD NEW
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Payment */}
            <div className="px-8 py-6 bg-white w-full flex h-fit max-md:mt-8">
              <div
                className={`relative right-12 max-md:-top-10 max-md:right-8 h-fit text-white p-2 shadow-[0px_3px_5px_0px_#282c3f]  ${
                  confirmPayment
                    ? "bg-[#282c3f] stroke-white"
                    : "bg-white stroke-[#282c3f]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColour"
                >
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
              </div>
              <div className="-ml-4">
                {!confirmPayment ? (
                  <>
                    <div className="text-base text-[#82848b]">Payment</div>
                  </>
                ) : (
                  <>
                    <h2 className="text-base text-[#282c3f] font-bold">
                      Choose Payment method
                    </h2>
                    <h3 className="text-sm text-[#7f828f]">
                      Credit &amp; Debit cards, UPI or Cash on Delivery
                    </h3>
                    <div
                      className="my-4 bg-[#60b246] py-3 text-white font-bold text-center cursor-pointer hover:shadow-[0px_2PX_8PX_#d4d5d9] tracking-wider"
                      onClick={() => {
                        navigate("/payment");
                      }}
                    >
                      PROCEED TO PAY
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Right  Side */}
          <CartItemList resDetail={resDetail} cartItems={cartItems} />
        </div>
      </div>
    </>
  );
};

export default Cart;
const cartDetails = [
  {
    id: "94974307",
    name: "My Box - Non Veg",
    defaultPrice: 31900,
    resDetailsData: {
      id: "9869",
      name: "Pizza Hut",
      areaName: "Azad Maidan",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2024/7/16/217ae375-863b-4bb6-a8ba-eccc0826e7df_9869.jpg",
      slaString: "25-30 MINS",
      lastMileTravelString: "1.4 km",
    },
    quantity: 1,
  },
  {
    id: "94974300",
    name: "My Box - Veg",
    isVeg: 1,
    defaultPrice: 24900,
    resDetailsData: {
      id: "9869",
      name: "Pizza Hut",
      areaName: "Azad Maidan",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2024/7/16/217ae375-863b-4bb6-a8ba-eccc0826e7df_9869.jpg",
      slaString: "25-30 MINS",
      lastMileTravelString: "1.4 km",
    },
    quantity: 1,
  },
];
