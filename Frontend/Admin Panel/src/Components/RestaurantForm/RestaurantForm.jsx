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
import InputFiled from "../InputFiled/InputFiled";

const InputWrapper = ({ children }) => {
  return (
    <div className="flex gap-2 items-center max-md:items-stretch  max-md:flex-col">
      {children}
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
    <div className="px-8 py-4 mt-4 max-lg:px-6 max-md:px-3 max-md:mt-2.5 flex flex-col border-[1px] border-gray-300 max-h-full overflow-auto">
      {/* Form */}
      <h1 className="text-2xl max-md:text-center font-semibold my-4 max-md:mb-2.5 max-md:mt-0">
        Restaurant Details
      </h1>
      <form
        onSubmit={(e) => submitHandler(e, resData)}
        className="flex gap-4 max-md:flex-col-reverse"
      >
        <div className="w-full max-lg:w-[90%] max-md:w-full rounded-lg p-4 max-lg:p-2.5 flex flex-col gap-4 max-md:gap-2.5">
          {/* Title */}
          <InputFiled
            inputValue={name}
            setInputValue={setName}
            icon={<MdRestaurant />}
            placeholder={"Enter Restaurant name"}
          />
          {/* cuisines */}
          <InputFiled
            inputValue={cuisines}
            setInputValue={setCuisines}
            icon={<GiTakeMyMoney />}
            placeholder={"Cuisines (separated by , comma)"}
          />
          {/* Cost For Two */}
          <InputFiled
            type="number"
            inputValue={costForTwo}
            setInputValue={setCostForTwo}
            icon={<MdOutlineCurrencyRupee />}
            placeholder={"Cost for two"}
          />
          {/* isVeg */}

          <InputFiled
            type="radio"
            inputValue={isVeg}
            setInputValue={setIsVeg}
            icon={<TbClock />}
            placeholder={""}
            options={[
              { label: "Veg", value: "veg" },
              { label: "Non-Veg", value: "non-veg" },
              { label: "Both", value: "both" },
            ]}
          />
          <InputWrapper>
            {/* Min Time */}
            <InputFiled
              inputValue={minTime}
              setInputValue={setMinTime}
              icon={<TbClock />}
              placeholder={"Minimum Time"}
            />
            {/* Max Time */}
            <InputFiled
              inputValue={maxTime}
              setInputValue={setMaxTime}
              icon={<TbClockCheck />}
              placeholder={"Max Time"}
            />
          </InputWrapper>
          <h4 className="text-xl">Address Detail</h4>
          {/* Address */}
          <InputFiled
            type="textarea"
            inputValue={address}
            setInputValue={setAddress}
            icon={<BiFoodMenu />}
            placeholder={"Address"}
          />
          <InputWrapper>
            {/* Area Name */}
            <InputFiled
              inputValue={areaName}
              setInputValue={setAreaName}
              icon={<MdAreaChart />}
              placeholder={"Area Name"}
            />
            {/* City */}
            <InputFiled
              inputValue={city}
              setInputValue={setCity}
              icon={<MdLocationCity />}
              placeholder={"City"}
            />
          </InputWrapper>
          <InputWrapper>
            {/* State */}
            <InputFiled
              inputValue={state}
              setInputValue={setState}
              icon={<FaMapMarked />}
              placeholder={"State"}
            />
            {/* Country */}
            <InputFiled
              inputValue={country}
              setInputValue={setCountry}
              icon={<FaGlobe />}
              placeholder={"Country"}
            />
          </InputWrapper>
          <h4 className="text-xl">Contact Detail</h4>
          {/* Contact Number */}
          <InputFiled
            inputValue={contact}
            setInputValue={setContact}
            icon={<MdPhone />}
            placeholder={"Contact Number"}
          />
          {/* Email */}
          <InputFiled
            inputValue={email}
            setInputValue={setEmail}
            icon={<MdOutlineEmail />}
            placeholder={"Email"}
          />
          <h4 className="text-xl">Owner Detail</h4>
          {/* Contact name */}
          <InputFiled
            inputValue={ownerName}
            setInputValue={setOwnerName}
            icon={<MdPersonOutline />}
            placeholder={"Owner Name"}
          />
          {/* Contact number */}
          <InputWrapper>
            <InputFiled
              inputValue={ownerContact}
              setInputValue={setOwnerContact}
              icon={<MdPhone />}
              placeholder={"Owner Contact Number"}
            />
            {/* Owner Email */}
            <InputFiled
              inputValue={ownerEmail}
              setInputValue={setOwnerEmail}
              icon={<MdOutlineEmail />}
              placeholder={"Owner Email"}
            />
          </InputWrapper>
          {/* Save Button */}
          <div className="flex justify-end max-md:justify-center">
            <button className="py-2 px-12 rounded bg-orange-500 hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2 text-white text-lg">
              {resDetail ? "Update" : "Save"} <MdOutlineDataSaverOn />
            </button>
          </div>
        </div>
        <div className="w-[45%] max-md:w-[100%] h-[220px] border border-gray-300 border-dotted flex items-center justify-center">
          <FoodImage
            text={"Restaurant Image"}
            image={image}
            setImage={setImage}
          />
        </div>
      </form>
    </div>
  );
};

export default RestaurantForm;
