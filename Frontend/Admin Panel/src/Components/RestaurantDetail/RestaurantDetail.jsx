import React, { useEffect, useState } from "react";
import AdminHeader from "../Header/AdminHeader";
import { MdStars } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Item from "./Item";
import DeleteModel from "../DeleteModel/DeleteModel";

const RestaurantDetail = () => {
  const { resId } = useParams();

  const [resDetail, setResDetail] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurantDetail = async () => {
      try {
        const { data } = await axios.get(`/restaurant/${resId}`);
        setResDetail(data.restaurant);
        setLoading(false);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    fetchRestaurantDetail();
  }, []);

  return (
    <div className="flex flex-col max-h-screen">
      <AdminHeader pageTitle={resDetail.name} />
      {loading ? (
        "Loading"
      ) : (
        <div className="my-4 h-full overflow-auto">
          {/* Restaurant Detail */}
          <div className="mt-2 px-6 py-2 flex gap-4 justify-between">
            <div className="flex-1 flex flex-col gap-3">
              <div className="w-[90%] flex justify-between">
                <h1 className="text-3xl font-semibold">{resDetail.name}</h1>
                <div className=" flex items-center font-semibold gap-1 line-clamp-1 whitespace-nowrap ">
                  <MdStars className="text-green-700 text-lg " />
                  {resDetail.avgRating}
                  {" • "}
                  20 - 25 Mins
                </div>
              </div>
              <div className="capitalize">
                <span className="font-semibold">Cuisines:</span>{" "}
                {resDetail.cuisines}
              </div>
              <div className="capitalize">
                <span className="font-semibold">Cost For Two</span>: ₹
                {resDetail.costForTwo}
              </div>
              <h6 className="font-bold text-xl">Address Detail</h6>
              <div className="flex gap-28 w-[90%] capitalize">
                <div>
                  <div>
                    <span className="font-semibold">Address:</span>{" "}
                    {resDetail.address}
                  </div>
                  <div>
                    <span className="font-semibold">Area Name:</span>{" "}
                    {resDetail.areaName}
                  </div>
                  <div>
                    <span className="font-semibold">City:</span>{" "}
                    {resDetail.city}
                  </div>
                </div>
                <div>
                  <div>
                    <span className="font-semibold">State:</span>{" "}
                    {resDetail.state}
                  </div>
                  <div>
                    <span className="font-semibold">Country:</span>{" "}
                    {resDetail.country}
                  </div>
                </div>
              </div>
              <div className="w-[90%] flex justify-between">
                <div>
                  <h6 className="font-bold text-xl mb-3">Contact Details</h6>
                  <div>
                    <span className="font-semibold">Contact:</span> +91{" "}
                    {resDetail.contact}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span>{" "}
                    {resDetail.email}
                  </div>
                </div>
                <div>
                  <h6 className="font-bold text-xl mb-3">Owner Details</h6>
                  <div>
                    <span className="font-semibold">Owner Name:</span>{" "}
                    {resDetail.ownerName}
                  </div>
                  <div>
                    <span className="font-semibold">Owner Contact:</span> +91{" "}
                    {resDetail.ownerContact}
                  </div>
                  <div>
                    <span className="font-semibold">Owner Email:</span>{" "}
                    {resDetail.ownerEmail}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[30%]">
              <img
                src={resDetail.image}
                alt={resDetail.name}
                className="w-full h-[300px] object-cover rounded-3xl shadow-lg"
              />
            </div>
          </div>
          {/* Menu */}
          <div className="mt-12">
            <h1 className="uppercase text-3xl text-center ">M E N U</h1>
            <div className="flex items-center justify-center">
              <Link
                to={`/restaurant/${resId}/addFood`}
                className="mt-4 mx-auto bg-green-600 p-3 px-8 uppercase rounded-lg text-white font-semibold"
              >
                Add Food
              </Link>
            </div>
            <div className="max-w-[60%] mx-auto">
              {resDetail.foods.length > 0 &&
                resDetail.foods.map((food) => {
                  return <Item key={food._id} food={food} />;
                })}
              {resDetail.foods.length < 1 && (
                <div className="text-center mt-12 text-3xl font-semibold text-slate-600/60">
                  No Food Item Added
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetail;
