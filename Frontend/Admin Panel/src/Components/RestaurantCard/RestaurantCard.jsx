import { useState } from "react";
import DeleteModel from "../DeleteModel/DeleteModel";
import { MdStars, MdOutlineEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RestaurantCard = ({ res, onDelete }) => {
  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  // const deleteRestaurant = async () => {
  //   try {
  //     await axios.delete(`/restaurant/${res._id}`);
  //     toast.success("Restaurant deleted successfully");
  //   } catch (error) {
  //     console.log("error: ", error);
  //     toast.error("Error while deleting restaurant");
  //   }
  //   setOpenDeleteModel(false);
  // };

  return (
    <div className="rounded-xl shadow-lg ">
      <Link
        to={`/restaurant/${res._id}`}
        key={res._id}
        className="flex flex-col gap-2 "
      >
        <div>
          <img
            src={res.image}
            alt=""
            className="rounded-xl w-full h-[200px] object-cover"
          />
        </div>
        <div className="px-3">
          <h3 className="text-lg max-sm:text-base line-clamp-2 font-semibold">
            {res.name}
          </h3>
          <div className="flex justify-between">
            <div className="capitalize max-sm:text-sm">
              {res.areaName}, {res.city}
              {/* {d.address} */}
            </div>
            <div className="flex gap-1 items-center mr-4">
              <MdStars className="text-green-600 max-sm:text-sm" />
              <p className="font-semibold max-sm:text-sm">{res.avgRating}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-end gap-2 mt-4 max-sm:mt-2.5 p-3 pt-0">
        <Link
          to={`/updateRestaurant/${res._id}`}
          className="p-2 max-sm:p-1.5  bg-yellow-400 rounded-full"
        >
          <MdOutlineEdit className="text-lg max-sm:text-base text-white" />
        </Link>
        <div
          className="p-2 max-sm:p-1.5 bg-red-500 rounded-full cursor-pointer"
          onClick={() => setOpenDeleteModel(true)}
        >
          <MdDelete className="text-lg max-sm:text-base text-white" />
        </div>
      </div>
      {openDeleteModel && (
        <DeleteModel
          setOpenDeleteModel={setOpenDeleteModel}
          deleteHandler={() => onDelete(res._id)}
        />
      )}
    </div>
  );
};

export default RestaurantCard;
