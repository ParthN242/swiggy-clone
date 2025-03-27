import { useEffect, useState } from "react";
import AdminHeader from "../Header/AdminHeader";
import { MdDelete, MdOutlineEdit, MdStars } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Item from "./Item";
import { FaCircle } from "react-icons/fa";
import DeleteModel from "../DeleteModel/DeleteModel";
import { toast } from "react-toastify";

const RestaurantDetail = () => {
  const { resId } = useParams();
  const navigate = useNavigate();

  const [resDetail, setResDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  const deleteRestaurant = async (resId) => {
    try {
      await axios.delete(`/restaurant/${resId}`);
      toast.success("Restaurant deleted successfully");

      navigate("/restaurant");
    } catch (error) {
      console.log("error: ", error);
      toast.error("Error while deleting restaurant");
    }
  };

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
  }, [resId]);

  return (
    <div className="flex flex-col max-h-screen">
      <AdminHeader
        pageTitle={resDetail.name}
        isBackNavigation
        navigationUrl={"/restaurant"}
      />
      {loading ? (
        "Loading"
      ) : (
        <div className="my-4 px-2 h-full overflow-auto">
          {/* Restaurant Detail */}
          <div className="mt-2 px-4 max-lg:px-1.5 py-2 flex gap-4 justify-between max-sm:flex-col-reverse">
            <div className="flex-1 flex flex-col gap-3 max-md:gap-1.5">
              <div className="w-[90%] max-md:w-[100%] flex justify-between max-sm:flex-col">
                <div className="flex gap-4 max-md:gap-2 items-center">
                  <h1 className="text-3xl max-md:text-2xl font-semibold">
                    {resDetail.name}
                  </h1>
                  {resDetail.isVeg === "veg" ? (
                    <div>
                      <FaCircle className="border-2 border-solid border-[#0f8a65] text-[#0f8a65] text-xl max-md:text-lg max-h-4 max-w-4 p-[2px]  rounded-sm" />
                    </div>
                  ) : resDetail.isVeg === "non-veg" ? (
                    <div>
                      <FaCircle className="border-2 border-solid border-[#e43b4f] text-[#e43b4f] text-xl max-md:text-lg max-h-4 max-w-4 p-[2px] -rotate-90 rounded-sm" />
                    </div>
                  ) : (
                    <div className="relative flex gap-1">
                      <FaCircle className="border-2 border-solid border-[#0f8a65] text-[#0f8a65] text-xl max-md:text-lg max-h-4 max-w-4 p-[2px] rounded-sm z-10" />
                      <FaCircle className="border-2 border-solid border-[#e43b4f] text-[#e43b4f] text-xl max-md:text-lg max-h-4 max-w-4 p-[2px] -rotate-90 rounded-sm " />
                    </div>
                  )}
                </div>
                <div className=" flex items-center  font-semibold gap-1 line-clamp-1 whitespace-nowrap ">
                  <MdStars className="text-green-700 text-lg max-md:text-base " />
                  {resDetail.avgRating}
                  {" • "}
                  20 - 25 Mins
                </div>
              </div>
              <div className="capitalize max-md:text-sm ">
                <span className="font-semibold">Cuisines:</span>{" "}
                {resDetail.cuisines}
              </div>
              <div className="capitalize max-md:text-sm">
                <span className="font-semibold">Cost For Two</span>: ₹
                {resDetail.costForTwo}
              </div>
              <h6 className="font-bold text-xl max-md:text-lg max-sm:mt-4">
                Address Detail
              </h6>
              <div className="flex justify-between gap-4 w-[90%] max-md:w-[100%] capitalize max-md:text-sm max-sm:flex-col ">
                <div>
                  <div>
                    <span className="font-semibold max-md:text-sm">
                      Address:
                    </span>{" "}
                    {resDetail.address}
                  </div>
                  <div>
                    <span className="font-semibold max-md:text-sm">
                      Area Name:
                    </span>{" "}
                    {resDetail.areaName}
                  </div>
                  <div>
                    <span className="font-semibold max-md:text-sm">City:</span>{" "}
                    {resDetail.city}
                  </div>
                </div>
                <div>
                  <div className="text-nowrap">
                    <span className="font-semibold max-md:text-sm">State:</span>{" "}
                    {resDetail.state}
                  </div>
                  <div className="text-nowrap">
                    <span className="font-semibold max-md:text-sm">
                      Country:
                    </span>{" "}
                    {resDetail.country}
                  </div>
                </div>
              </div>
              <div className="w-[90%] max-md:w-[100%] flex justify-between max-sm:flex-col gap-4">
                <div>
                  <h6 className="font-bold text-xl max-md:text-lg mb-3">
                    Contact Details
                  </h6>
                  <div>
                    <span className="font-semibold max-md:text-sm">
                      Contact:
                    </span>{" "}
                    +91 {resDetail.contact}
                  </div>
                  <div>
                    <span className="font-semibold max-md:text-sm">Email:</span>{" "}
                    {resDetail.email}
                  </div>
                </div>
                <div>
                  <h6 className="font-bold text-xl max-md:text-lg mb-3">
                    Owner Details
                  </h6>
                  <div>
                    <span className="font-semibold max-md:text-sm">
                      Owner Name:
                    </span>{" "}
                    {resDetail.ownerName}
                  </div>
                  <div>
                    <span className="font-semibold max-md:text-sm">
                      Owner Contact:
                    </span>{" "}
                    +91 {resDetail.ownerContact}
                  </div>
                  <div>
                    <span className="font-semibold max-md:text-sm">
                      Owner Email:
                    </span>{" "}
                    {resDetail.ownerEmail}
                  </div>
                </div>
              </div>
            </div>
            {/* image */}
            <div className="relative w-[30%] max-sm:w-[100%]">
              <img
                src={resDetail.image}
                alt={resDetail.name}
                className="w-full aspect-square max-sm:h-[150px] object-cover rounded-3xl shadow-lg"
              />
              <div className="absolute bottom-0 right-0 flex items-center justify-end gap-2 mt-4 max-sm:mt-2.5 p-3 pt-0">
                <Link
                  to={`/updateRestaurant/${resId}`}
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
            </div>
          </div>
          {/* Menu */}
          <div className="mt-12 max-md:mt-8">
            <h1 className="uppercase text-3xl max-md:text-2xl text-center ">
              M E N U
            </h1>
            <div className="flex items-center justify-center">
              <Link
                to={`/restaurant/${resId}/addFood`}
                className="mt-4 mx-auto bg-green-600 p-3 px-8 max-md:px-6 max-md:p-2 max-md:text-sm uppercase rounded-lg text-white font-semibold"
              >
                Add Food
              </Link>
            </div>
            <div className="max-w-full w-[60%] max-lg:w-[70%] max-md:w-[75%] max-sm:w-[95%] max-lg:max-w mx-auto">
              {resDetail.foods.length > 0 &&
                resDetail.foods.map((food) => {
                  return <Item key={food._id} food={food} />;
                })}
              {resDetail.foods.length < 1 && (
                <div className="text-center my-12 text-3xl font-semibold text-slate-600/60">
                  No Food Item Added
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {openDeleteModel && (
        <DeleteModel
          setOpenDeleteModel={setOpenDeleteModel}
          deleteHandler={() => deleteRestaurant(resId)}
        />
      )}
    </div>
  );
};

export default RestaurantDetail;
