import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setAddressModel, setUser } from "../../Redux/appSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Address = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.app);

  const [address, setAddress] = useState("");
  const [areaName, setAreaName] = useState("");
  const [city, setCity] = useState("");

  const handleCloseModel = () => {
    dispatch(setAddressModel(false));
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/me", { address, areaName, city });
      toast.success("Address Added");
      dispatch(setAddressModel(false));
      dispatch(setUser(data.user));
    } catch (error) {
      console.log("error: ", error);
      toast.error("Error while updating address");
    }
  };

  useEffect(() => {
    if (user?.address) {
      setAddress(user.address);
      setAreaName(user.areaName);
      setCity(user.city);
    }
  }, [user]);

  return (
    <div className="fixed top-0 left-0 w-[100%] h-[100vh] bg-[#282c3fa8] z-[1000] overflow-hidden scrollbar-none flex ">
      <div className="w-[40%] max-md:w-[70%] bg-white h-full pt-[30px] pr-[40px] pl-[120px] max-lg:pl-[30px] ">
        {/* Close button */}
        <div className="flex items-center gap-8 mb-20">
          <div>
            <MdClose
              className="font-bold text-2xl cursor-pointer"
              onClick={handleCloseModel}
            />
          </div>
          <div className="text-lg font-bold">Save delivery address</div>
        </div>
        {/* Address Form */}
        <form onSubmit={handleUpdateAddress}>
          <div className="">
            <div className="relative z-0 border-slate-300 border px-6 py-3">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                rows={1}
                type="text"
                className="mt-1 block w-full py-2 text-sm rounded-md shadow-sm focus:outline-none  sm:text-lg "
                required
                value={address || ""}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="relative z-0 border-slate-300 border px-6 py-3">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Area Name
              </label>
              <input
                id="areaName"
                name="areaName"
                type="text"
                className="mt-1 block w-full py-2 text-sm rounded-md shadow-sm focus:outline-none  sm:text-lg"
                required
                value={areaName || ""}
                onChange={(e) => setAreaName(e.target.value)}
              />
            </div>
            <div className="relative z-0 border-slate-300 border px-6 py-3">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                city
              </label>
              <input
                id="city"
                name="city"
                type="text"
                className="mt-1 block w-full py-2 text-sm rounded-md shadow-sm focus:outline-none  sm:text-lg"
                required
                value={city || ""}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-12">
            <button className="bg-orange-500 text-white w-full py-3 hover:bg-orange-600 rounded-sm">
              SAVE ADDRESS & PROCEED
            </button>
          </div>
        </form>
      </div>
      <div className="w-full flex-1 h-full" onClick={handleCloseModel}></div>
    </div>
  );
};

export default Address;
