import { useEffect, useState } from "react";
import {
  MdOutlineDataSaverOn,
  MdOutlineNoFood,
  MdOutlineCurrencyRupee,
  MdAreaChart,
  MdLocationCity,
  MdPhone,
  MdOutlineEmail,
  MdRestaurant,
  MdPersonOutline,
} from "react-icons/md";
import { TbClock, TbClockCheck } from "react-icons/tb";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaMapMarked, FaGlobe } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import FoodImage from "../FoodImage/FoodImage";

const InputFiled = ({ inputValue, setInputValue, icon }) => {
  return (
    <div className="flex gap-3 items-center border-b border-gray-300 py-3">
      {/* <icon className="text-xl text-textColor" /> */}
      {icon}
      <input
        type="text"
        name="title"
        placeholder="Enter Restaurant name"
        className="w-full outline-none text-md bg-transparent"
        value={inputValue || ""}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

const RestaurantForm = ({ resDetail, submitHandler }) => {
  const [name, setName] = useState("");
  const [cuisines, setCuisines] = useState("");
  const [image, setImage] = useState("");
  const [costForTwo, setCostForTwo] = useState("");
  const [isVeg, setIsVeg] = useState("veg");
  const [minTime, setMinTime] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [address, setAddress] = useState("");
  const [areaName, setAreaName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerContact, setOwnerContact] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");

  const resData = {
    name,
    cuisines,
    image,
    costForTwo,
    isVeg,
    minTime,
    maxTime,
    address,
    areaName,
    city,
    state,
    country,
    contact,
    email,
    ownerName,
    ownerContact,
    ownerEmail,
  };

  useEffect(() => {
    if (resDetail) {
      setName(resDetail.name);
      setCuisines(resDetail.cuisines);
      setImage(resDetail.image);
      setCostForTwo(resDetail.costForTwo);
      setIsVeg(resDetail.isVeg);
      setMinTime(resDetail.minTime);
      setMaxTime(resDetail.maxTime);
      setAddress(resDetail.address);
      setAreaName(resDetail.areaName);
      setCity(resDetail.city);
      setState(resDetail.state);
      setCountry(resDetail.country);
      setContact(resDetail.contact);
      setEmail(resDetail.email);
      setOwnerName(resDetail.ownerName);
      setOwnerContact(resDetail.ownerContact);
      setOwnerEmail(resDetail.ownerEmail);
    }
  }, [resDetail]);

  return (
    <div className="px-8 py-4 mt-4 flex flex-col border-[1px] border-gray-300 max-h-full overflow-auto">
      {/* Form */}
      <h1 className="text-2xl font-semibold my-4">Restaurant Details</h1>
      <div className="flex gap-4">
        <form
          onSubmit={(e) => submitHandler(e, resData)}
          className="w-full  rounded-lg p-4 flex flex-col gap-4"
        >
          {/* Title */}
          <div className="flex gap-3 items-center border-b border-gray-300 py-3">
            <MdRestaurant className="text-xl text-textColor" />
            <input
              type="text"
              name="title"
              placeholder="Enter Restaurant name"
              className="w-full outline-none text-md bg-transparent"
              value={name || ""}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* <InputFiled
            inputValue={name}
            setInputValue={setName}
            icon={<MdRestaurant className="text-xl text-textColor" />}
          /> */}
          {/* cuisines */}
          <div className="flex gap-3 items-center border-b border-gray-300 py-3">
            <GiTakeMyMoney className="text-xl text-textColor" />
            <input
              type="text"
              name="cuisines"
              placeholder="Cuisines (separated by , comma)"
              className="w-full outline-none text-md bg-transparent"
              value={cuisines || ""}
              onChange={(e) => setCuisines(e.target.value)}
              required
            />
          </div>
          {/* Cost For Two */}
          <div className="flex gap-3 items-center border-b border-gray-300 py-3">
            <MdOutlineCurrencyRupee className="text-xl text-textColor" />
            <input
              type="number"
              name="costForTwo"
              placeholder="Cost for two"
              className="w-full outline-none text-md bg-transparent"
              value={costForTwo || ""}
              onChange={(e) => setCostForTwo(e.target.value)}
              required
            />
          </div>
          {/* isVeg */}
          <div className="flex gap-3 items-center border-b border-gray-300 py-3">
            <MdOutlineNoFood className="text-xl text-textColor" />
            <div>
              <input
                type="radio"
                name="isVeg"
                id="veg"
                checked={isVeg === "veg"}
                onChange={(e) => setIsVeg(e.target.id)}
                required
              />{" "}
              <label htmlFor="veg">Veg</label>
            </div>
            <div className="ml-6">
              <input
                type="radio"
                name="isVeg"
                id="non-veg"
                checked={isVeg === "non-veg"}
                onChange={(e) => setIsVeg(e.target.id)}
                required
              />{" "}
              <label htmlFor="non-veg">Non-Veg</label>
            </div>
            <div className="ml-6">
              <input
                type="radio"
                name="isVeg"
                id="both"
                checked={isVeg === "both"}
                onChange={(e) => setIsVeg(e.target.id)}
                required
              />{" "}
              <label htmlFor="both">Both</label>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            {/* Min Time */}
            <div className="flex flex-1 gap-3 items-start border-b border-gray-300 py-3">
              <TbClock className="text-xl text-textColor" />
              <input
                type="number"
                name="minTime"
                placeholder="Minimum Time"
                className="w-full outline-none text-md bg-transparent"
                value={minTime || ""}
                onChange={(e) => setMinTime(e.target.value)}
                required
              />
            </div>
            {/* Max Time */}
            <div className="flex flex-1 gap-3 items-start border-b border-gray-300 py-3">
              <TbClockCheck className="text-xl text-textColor" />
              <input
                type="number"
                name="maxTime"
                placeholder="Max Time"
                className="w-full outline-none text-md bg-transparent"
                value={maxTime || ""}
                onChange={(e) => setMaxTime(e.target.value)}
                required
              />
            </div>
          </div>
          <h4 className="text-xl">Address Detail</h4>
          {/* Address */}
          <div className="flex gap-3 items-start border-b border-gray-300 py-3">
            <BiFoodMenu className="text-xl text-textColor" />
            <textarea
              type="text"
              placeholder="Address"
              className="w-full outline-none text-md bg-transparent"
              value={address || ""}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2 items-center">
            {/* Arean Name */}
            <div className="flex flex-1 gap-3 items-start border-b border-gray-300 py-3">
              <MdAreaChart className="text-xl text-textColor" />
              <input
                type="text"
                name="areaname"
                placeholder="Arean Name"
                className="w-full outline-none text-md bg-transparent"
                value={areaName || ""}
                onChange={(e) => setAreaName(e.target.value)}
                required
              />
            </div>
            {/* City */}
            <div className="flex flex-1 gap-3 items-start border-b border-gray-300 py-3">
              <MdLocationCity className="text-xl text-textColor" />
              <input
                type="text"
                name="city"
                placeholder="city"
                className="w-full outline-none text-md bg-transparent"
                value={city || ""}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            {/* State */}
            <div className="flex flex-1 gap-3 items-start border-b border-gray-300 py-3">
              <FaMapMarked className="text-xl text-textColor" />
              <input
                type="text"
                name="state"
                placeholder="State"
                className="w-full outline-none text-md bg-transparent"
                value={state || ""}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            {/* Country */}
            <div className="flex flex-1 gap-3 items-start border-b border-gray-300 py-3">
              <FaGlobe className="text-xl text-textColor" />
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="w-full outline-none text-md bg-transparent"
                value={country || ""}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
          </div>
          <h4 className="text-xl">Contact Detail</h4>
          {/* Contact Number */}
          <div className="flex gap-3 items-start border-b border-gray-300 py-3">
            <MdPhone className="text-xl text-textColor" />
            <input
              type="number"
              name="phoneno"
              placeholder="Contact Number"
              className="w-full outline-none text-md bg-transparent"
              value={contact || ""}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          {/* Email */}
          <div className="flex gap-3 items-start border-b border-gray-300 py-3">
            <MdOutlineEmail className="text-xl text-textColor" />
            <input
              type="email"
              name="eamil"
              placeholder="Email"
              className="w-full outline-none text-md bg-transparent"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <h4 className="text-xl">Owner Detail</h4>
          {/* Contact name */}
          <div className="flex gap-3 items-start border-b border-gray-300 py-3">
            <MdPersonOutline className="text-xl text-textColor" />
            <input
              type="text"
              name="ownerName"
              placeholder="Owner Name"
              className="w-full outline-none text-md bg-transparent"
              value={ownerName || ""}
              onChange={(e) => setOwnerName(e.target.value)}
              required
            />
          </div>
          {/* Contact number */}
          <div className="flex gap-2 items-center">
            <div className="flex flex-1 gap-3 items-start border-b border-gray-300 py-3">
              <MdPhone className="text-xl text-textColor" />
              <input
                type="number"
                name="ownerPhoneno"
                placeholder="Owner Contact Number"
                className="w-full outline-none text-md bg-transparent"
                value={ownerContact || ""}
                onChange={(e) => setOwnerContact(e.target.value)}
                required
              />
            </div>
            {/* Owner Email */}
            <div className="flex flex-1 gap-3 items-start border-b border-gray-300 py-3">
              <MdOutlineEmail className="text-xl text-textColor" />
              <input
                type="email"
                name="ownerEmail"
                placeholder="Owner Email"
                className="w-full outline-none text-md bg-transparent"
                value={ownerEmail || ""}
                onChange={(e) => setOwnerEmail(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Save Button */}
          <div className="flex justify-end">
            <button className="py-2 px-12 rounded bg-orange-500 flex items-center justify-center gap-2 text-white text-lg">
              {resDetail ? "Update" : "Save"} <MdOutlineDataSaverOn />
            </button>
          </div>
        </form>
        <div className="w-[45%] h-[220px] border border-gray-300 border-dotted flex items-center justify-center">
          <FoodImage
            text={"Restaurant Image"}
            image={image}
            setImage={setImage}
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantForm;
