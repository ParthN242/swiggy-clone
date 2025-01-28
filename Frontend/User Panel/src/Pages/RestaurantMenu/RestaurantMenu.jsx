import React from "react";
import { MdStars } from "react-icons/md";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Item from "../../Components/MenuCategory/Item";
import {
  setCartDialogBox,
  clearCart,
  incrementCartItem,
  decrementCartItem,
  addCartItem,
} from "../../Redux/appSlice";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const dispatch = useDispatch();
  const { cart, showCartDialogBox } = useSelector((state) => state.app);

  const [resDetails, setResDetails] = useState(null);
  console.log("resDetails: ", resDetails);
  const [resMenu, setResMenu] = useState([]);
  const [isStartAfresh, setisStartAfresh] = useState(null);

  const addCart = (resDetails, item) => {
    if (cart.resDetail?._id && cart?.resDetail?._id !== resDetails._id) {
      dispatch(setCartDialogBox(true));
      return;
    }
    dispatch(
      addCartItem({
        resDetails,
        item,
      })
    );
  };

  const incrementItem = (_id) => {
    dispatch(incrementCartItem(_id));
  };

  const decrementItem = (_id) => {
    dispatch(decrementCartItem(_id));
  };

  useEffect(() => {
    if (isStartAfresh === "yes") {
      dispatch(clearCart());
      setisStartAfresh(null);
      dispatch(setCartDialogBox(false));
    } else if (isStartAfresh === "no") {
      dispatch(setCartDialogBox(false));
      setisStartAfresh(null);
    }
  }, [isStartAfresh]);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const { data } = await axios.get(`/restaurant/${resId}`);
        setResDetails(data.restaurant);
        setResMenu(data.restaurant.foods);
      } catch (error) {
        console.log("error: ", error);
        toast.error(error.message);
      }
    };

    fetchRestaurantDetails();
  }, []);
  return (
    <div className="pt-5">
      <div className="w-[50%] max-xl:w-[60%] max-lg:w-[85%] max-md:w-[95%] mx-auto ">
        <h4 className="text-xs text-left text-[#93959f] max-md:text-[10px]">
          Home/{"surat"}/{resDetails?.name}
        </h4>
        <div className="mx-3  max-sm:mx-0">
          <h1 className="font-[800] my-8 max-md:my-2 text-2xl max-md:text-lg">
            {resDetails?.name}
          </h1>
          <div
            className="mt-2 p-4 max-sm:p-2 pt-0  rounded-b-[36px] max-sm:rounded-b-[28px]"
            style={{
              background:
                "linear-gradient(rgb(255, 255, 255) -6.71%, rgb(235, 235, 242) 56.19%, rgb(223, 223, 231) 106.56%)",
            }}
          >
            {/* Inner Card */}
            <div className="rounded-[20px] bg-white py-4 px-4 max-sm:p-2 border border-[#02060c26]">
              <div className="flex items-center ">
                <span>
                  <MdStars className="text-green-700 text-lg max-md:text-[14px] mr-2" />
                </span>
                <p className="font-semibold max-md:text-xs">
                  {`${resDetails?.avgRating} (${resDetails?.totalReviews} + ratings)`}
                </p>{" "}
                <p className="mx-2 max-md:text-xs">{" • "}</p>
                <p className="font-semibold max-md:text-xs">
                  ₹ {resDetails?.costForTwo} for two
                </p>
              </div>
              <div className="mt-2 text-[#f26618] font-[600] underline truncate capitalize max-md:text-sm">
                {resDetails?.cuisines?.join(", ")}
              </div>
              <div className="flex gap-3 max-md:gap-2 mt-4">
                <div className="flex flex-col justify-center items-center">
                  <div className="h-2 w-2 bg-[#c4c4c4] rounded-full"></div>
                  <div className="h-[1.5rem]  bg-[#c4c4c4] w-[0.1rem]"></div>
                  <div className="h-2 w-2 bg-[#c4c4c4] rounded-full"></div>
                </div>
                <div className="flex flex-col justify-between ">
                  <div className="leading-4 font-semibold text-[14px] max-md:text-[12px]">
                    Outlet{" "}
                    <span className="text-[#02060c99] ml-2 text-[14px] max-md:text-[12px] capitalize">
                      {resDetails?.areaName}
                    </span>
                  </div>
                  <div className="leading-4 text-[14px] max-md:text-[12px] font-semibold">
                    20 - 25 mins
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-center tracking-widest my-4 text-xl leading-loose">
          M E N U
        </h3>
        {/* Menu */}
        <div>
          {resMenu.length === 0 && (
            <div className="my-16 text-lg text-center text-slate-500">
              - NO FOOD ADDED YET ! -
            </div>
          )}
          {resMenu?.length > 0 && (
            <div>
              {resMenu.map((item) => {
                return (
                  <Item
                    {...item}
                    key={item._id}
                    resDetails={resDetails}
                    addCart={addCart}
                    incrementItem={incrementItem}
                    decrementItem={decrementItem}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      {showCartDialogBox && (
        <div className="sticky bottom-10 left-[50%] -translate-x-[50%] w-[520px] h-fit flex flex-col gap-2 bg-white shadow-lg p-6">
          <h1 className="text-xl font-semibold">Items already in cart</h1>
          <p className="text-light-gray text-[12px]">
            Your cart contains items from other restaurant. Would you like to
            reset your cart for adding items from this restaurant?
          </p>
          <div className="flex items-center gap-6 justify-between mt-4">
            <button
              className="flex-1 p-2 bg-white border border-green-600 capitalize text-green-600"
              onClick={() => setisStartAfresh("no")}
            >
              No
            </button>
            <button
              className="flex-1 p-2 bg-green-600 border border-green-600 capitalize text-white"
              onClick={() => setisStartAfresh("yes")}
            >
              Yes, Start Afresh
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
