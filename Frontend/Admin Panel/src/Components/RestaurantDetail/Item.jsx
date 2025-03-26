import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DeleteModel from "../DeleteModel/DeleteModel";
import { toast } from "react-toastify";
import axios from "axios";

const Item = ({ food }) => {
  const navigate = useNavigate();

  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  const deleteHandler = async () => {
    try {
      await axios.delete(`restaurant/food/${food._id}`);
      toast.success("food deleted successfully");
      setOpenDeleteModel(false);
    } catch (error) {
      console.log("error: ", error);
      toast.error("Error while deleting food item");
    }
  };
  return (
    <div className="mt-4 mb-8 max-md:mb-4 max-sm:mb-4 p-4 max-md:p-3 pb-2 rounded-xl border border-[#d3d3d3] shadow-xl relative">
      <div className="pb-8 max-md:pb-6 max-sm:pb-3 flex justify-between gap-4 max-md:gap-3 max-sm:gap-2 ">
        <div className="w-[75%]">
          <div>
            {!food.isVeg ? (
              <h3>
                <FaCircle className="border-2 border-solid border-[#e43b4f] text-[#e43b4f] text-xl max-h-4 max-w-4 p-[2px] -rotate-90 rounded-sm" />
              </h3>
            ) : (
              <h3>
                <FaCircle className="border-2 border-solid border-[#0f8a65] text-[#0f8a65] text-xl max-h-4 max-w-4 p-[2px] rounded-sm" />
              </h3>
            )}
            <div>
              <h4 className="text-xl max-sm:text-base">{food.name}</h4>
              <p className="max-sm:text-sm">₹ {food.price} </p>
              <p className="line-clamp-2 mt-3 max-sm:mt-1 text-base max-md:text-sm max-sm:text-xs text-[#02060c99]">
                {food.description}
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="relative">
            <img
              src={food.image}
              alt={food.name}
              className="w-40 border h-36 max-md:h-32 max-sm:w-28 max-sm:h-24 rounded-2xl object-contain "
            />
          </div>
          {/* Edit & Delete Button  */}
          <div className="absolute max-sm:relative top-0 -right-12 max-sm:bottom-2 max-sm:top-auto max-sm:right-2 flex flex-col items-center justify-end max-sm:flex-row gap-2 mt-4 ">
            <div
              className="p-2 max-sm:p-1.5  text-lg bg-yellow-400 rounded-full"
              onClick={() => navigate(`updateFood/${food._id}`)}
            >
              <MdOutlineEdit className="text-lg text-white cursor-pointer" />
            </div>
            <div
              className="p-2 max-sm:p-1.5  text-lg bg-red-500 rounded-full"
              onClick={() => setOpenDeleteModel(true)}
            >
              <MdDelete className="text-lg text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Delete Model */}
      {openDeleteModel && (
        <DeleteModel
          setOpenDeleteModel={setOpenDeleteModel}
          deleteHandler={deleteHandler}
        />
      )}
    </div>
  );
};

export default Item;
