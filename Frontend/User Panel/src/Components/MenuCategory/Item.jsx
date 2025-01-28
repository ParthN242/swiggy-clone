import React from "react";
import { FaCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Item = ({
  _id,
  name,
  description,
  price,
  image,
  isVeg,
  resDetails,
  addCart,
  incrementItem,
  decrementItem,
}) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.app);

  const isItemInCart = cart?.cartItems?.find((item) => item._id === _id);
  const itemQuantity = isItemInCart?.quantity;

  return (
    <div className="mt-4 mb-8 border-b border-[#d3d3d3]">
      <div className="pb-8 flex justify-between gap-4 max-sm:gap-2">
        <div className="w-[75%]">
          <div>
            {!isVeg ? (
              <h3>
                <FaCircle className="border-2 border-solid border-[#e43b4f] text-[#e43b4f] text-xl max-h-4 max-w-4 p-[2px] text-[8px] -rotate-90 rounded-sm" />
              </h3>
            ) : (
              <h3>
                <FaCircle className="border-2 border-solid border-[#0f8a65] text-[#0f8a65] text-xl max-h-4 max-w-4 p-[2px] text-[8px] rounded-sm" />
              </h3>
            )}
            <div>
              <h4 className="text-xl max-sm:text-[16px]">{name}</h4>
              <p className="max-sm:text-[16px]">₹ {price} </p>
              <p className="line-clamp-2 mt-3 max-sm:mt-1 text-[16px] max-sm:text-[12px] text-[#02060c99]">
                {description}
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="relative">
            <img
              src={image}
              alt={name}
              className="w-40 h-36 max-md:h-32 max-sm:w-28 max-sm:h-24 rounded-2xl object-cover z-0"
            />
            <div className="absolute -bottom-5 shadow-lg w-[100px] h-[40px] left-[50%] translate-x-[-50%] text-green-700  rounded-lg bg-white cursor-pointer">
              {!isItemInCart ? (
                <div
                  className="text-center flex items-center justify-center w-full h-full rounded-lg hover:bg-black/10"
                  onClick={() =>
                    addCart(resDetails, {
                      _id,
                      name,
                      description,
                      price,
                      image,
                      isVeg,
                      quantity: 1,
                    })
                  }
                >
                  ADD
                </div>
              ) : (
                <div className="flex items-center justify-between h-full ">
                  <button
                    className="flex-1 hover:bg-black/10 h-full rounded-s-lg"
                    onClick={() => decrementItem(_id)}
                  >
                    -
                  </button>
                  <div className="flex-1 text-center">{itemQuantity}</div>
                  <button
                    className="flex-1 hover:bg-black/10 h-full rounded-e-lg"
                    onClick={() => incrementItem(_id)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
