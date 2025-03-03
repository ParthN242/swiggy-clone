import React, { useState } from "react";
import DeleteModel from "../DeleteModel/DeleteModel";
import { MdStars, MdOutlineEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RestaurantCard = ({ res }) => {
  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  const deleteRestaurant = async () => {
    try {
      await axios.delete(`/restaurant/${res._id}`);
      toast.success("Restaurant deleted successfully");
    } catch (error) {
      console.log("error: ", error);
      toast.error("Error while deleting restaurant");
    }
    setOpenDeleteModel(false);
  };

  return (
    <div className="rounded-xl shadow-lg p-2">
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
        <div className="p-3 pt-0">
          <h3 className="text-lg line-clamp-2 font-semibold">{res.name}</h3>
          <div className="flex justify-between">
            <div className="capitalize">
              {res.areaName}, {res.city}
              {/* {d.address} */}
            </div>
            <div className="flex gap-1 items-center mr-4">
              <MdStars className="text-green-600" />
              <p className="font-semibold">{res.avgRating}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-end gap-2 mt-4">
        <Link
          to={`/updateRestaurant/${res._id}`}
          className="p-2 text-lg bg-yellow-400 rounded-full"
        >
          <MdOutlineEdit className="text-lg text-white" />
        </Link>
        <div
          className="p-2 text-lg bg-red-500 rounded-full cursor-pointer"
          onClick={() => setOpenDeleteModel(true)}
        >
          <MdDelete className="text-lg text-white" />
        </div>
      </div>
      {openDeleteModel && (
        <DeleteModel
          setOpenDeleteModel={setOpenDeleteModel}
          deleteHandler={deleteRestaurant}
        />
      )}
    </div>
  );
};

export default RestaurantCard;
