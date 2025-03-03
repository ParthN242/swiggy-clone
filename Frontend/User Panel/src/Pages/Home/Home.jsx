import React from "react";
import ShowCaseFood from "../../Components/ShowCaseFood/ShowCaseFood";
import TopRestaurantChain from "../../Components/TopResTaurantChain/TopRestaurantChain";
import OnlineRestaurant from "../../Components/OnlineRestaurant/OnlineRestaurant";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { setRestaurants } from "../../Redux/appSlice";
import { useDispatch } from "react-redux";
import Loading from "../../Components/Loader/Loading";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllRestaurants = async () => {
      try {
        const { data } = await axios.get("/restaurant");
        dispatch(setRestaurants(data.restaurants));
      } catch (error) {
        console.log("error: ", error);
        toast.error("Error while fetching restaurants details");
      }
    };
    fetchAllRestaurants();
  }, []);
  return (
    <>
      <main className="">
        <div className="w-[75%] max-lg:w-[85%] max-md:w-[95%] mx-auto">
          <ShowCaseFood />
          <hr className="my-[24px] " />
          {/* Restaurant */}
          <TopRestaurantChain />
          <hr className="my-[24px] " />
          <OnlineRestaurant />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
