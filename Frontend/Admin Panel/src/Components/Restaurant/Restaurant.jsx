import { useEffect, useState } from "react";
import AdminHeader from "../Header/AdminHeader";
import { FaSearch } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { toast } from "react-toastify";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  console.log("restaurants: ", restaurants);
  const [searchRestaurant, setSearchRestaurant] = useState([]);

  const searchRestaurantHandler = async (searchInput) => {
    if (searchInput === "") {
      setSearchRestaurant([]);
      return;
    }

    setSearchRestaurant(
      restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  };

  const deleteRestaurant = async (resId) => {
    try {
      await axios.delete(`/restaurant/${resId}`);
      toast.success("Restaurant deleted successfully");

      setRestaurants((prev) => prev.filter((r) => r._id !== resId));
    } catch (error) {
      console.log("error: ", error);
      toast.error("Error while deleting restaurant");
    }
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const { data } = await axios.get("/restaurant");
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
      <div className="flex items-center justify-stretch gap-4 max-md:gap-1 my-4 max-md:my-2 max-sm:my-1.5">
        <form
          onSubmit={searchRestaurantHandler}
          className="w-full flex items-center bg-white px-6 py-4 max-md:p-3 max-sm:p-1.5 text-sm rounded-lg border border-slate-600"
        >
          <input
            type="text"
            placeholder="Search Restaurant"
            className="w-full outline-none text-base max-md:text-xs"
            onChange={(e) => searchRestaurantHandler(e.target.value)}
          />
          <button type="submit">
            <FaSearch className="text-orange-700" />
          </button>
        </form>
        <Link
          to={"/addRestaurant"}
          className="bg-[#ff5200] flex items-center max-md:self-stretch gap-2 max-sm:gap-0.5 text-nowrap px-4 py-4 max-md:p-3 max-sm:text-sm max-sm:p-1.5 rounded-lg text-white font-bold"
        >
          <span>
            <IoMdAddCircle className="text-[20px] max-sm:text-sm" />
          </span>
          <div className="max-md:hidden">Add Restaurant</div>
        </Link>
      </div>
      {/* Restaurant List */}
      <div className="max-h-full mt-2 pb-6 overflow-auto grid grid-cols-4 max-lg:grid-cols-2 max-xs:grid-cols-1 gap-4 max-sm:gap-2.5 w-full scrollbar-none">
        {/* Restaurant */}
        {restaurants.length > 0 &&
          searchRestaurant.length === 0 &&
          restaurants.map((res) => (
            <RestaurantCard
              res={res}
              key={res._id}
              onDelete={deleteRestaurant}
            />
          ))}
        {/* Search */}
        {searchRestaurant.length > 0 &&
          searchRestaurant.map((res) => (
            <RestaurantCard
              res={res}
              key={res._id}
              onDelete={deleteRestaurant}
            />
          ))}
      </div>
    </div>
  );
};

export default Restaurant;
