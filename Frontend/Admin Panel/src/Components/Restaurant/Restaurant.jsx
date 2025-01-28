import React, { useEffect, useState } from "react";
import AdminHeader from "../Header/AdminHeader";
import { FaSearch } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { data } from "./data";
import axios from "axios";
import RestaurantCard from "../RestaurantCard/RestaurantCard";

const Restaurant = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const { data } = await axios.get("/restaurant");
        console.log("data: ", data);
        setRestaurants(data.restaurants);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchRestaurant();
  }, []);

  return (
    <div className="flex flex-col px-2 max-h-screen">
      <AdminHeader pageTitle={"Restaurant"} />
      {/* Search Restaurant & Add*/}
      <div className="flex items-center justify-stretch gap-4 my-4">
        <div className="w-full flex items-center bg-white px-6 py-4 rounded-lg border border-slate-600">
          <input
            type="text"
            placeholder="Search Restaurant"
            className="w-full outline-none"
            // onChange={(e) => searchFood(e)}
          />
          <FaSearch className="text-orange-700" />
        </div>
        <Link
          to={"/addRestaurant"}
          className="bg-[#ff5200] flex items-center gap-2 text-nowrap px-4 py-4 rounded-lg text-white font-bold"
        >
          <span>
            <IoMdAddCircle className="text-[20px]" />
          </span>
          Add Restaurant
        </Link>
      </div>
      {/* Restaurant List */}
      <div className="max-h-full pb-6 overflow-auto grid grid-cols-4 gap-4 w-full scrollbar-none">
        {restaurants.length > 0 &&
          restaurants.map((res) => <RestaurantCard res={res} key={res._id} />)}
      </div>
    </div>
  );
};

export default Restaurant;
