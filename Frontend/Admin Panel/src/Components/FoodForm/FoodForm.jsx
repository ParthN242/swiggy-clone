import { useEffect, useState } from "react";
import {
  MdOutlineFastfood,
  MdOutlineDataSaverOn,
  MdOutlineNoFood,
} from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { BiFoodMenu } from "react-icons/bi";
import FoodImage from "../FoodImage/FoodImage";
import InputFiled from "../InputFiled/InputFiled";
import { toast } from "react-toastify";
import axios from "axios";

const FoodForm = ({ foodData, submitHandler, resId }) => {
  const [resDetail, setResDetail] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isVeg, setIsVeg] = useState(true);
  const [cuisines, setCuisines] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (foodData) {
      setName(foodData.name);
      setPrice(foodData.price);
      setIsVeg(foodData.isVeg);
      setCuisines(foodData.cuisines);
      setDescription(foodData.description);
      setImage(foodData.image);
    }
  }, [foodData]);

  useEffect(() => {
    if (!resId) return;

    const fetchResDetail = async () => {
      try {
        const { data } = await axios.get(`/restaurant/${resId}`);
        if (data.success) {
          setResDetail(data.restaurant);
        }
      } catch (error) {
        console.log("error: ", error);
        toast.error("Error while fetching restaurant detail");
      }
    };
    fetchResDetail();
  }, [resId]);

  return (
    <div className="px-8 max-lg:px-6 py-4 mt-4 max-md:px-3 max-md:mt-2.5 border-[1px] border-gray-300">
      {/* Form */}
      <h1 className="text-2xl max-md:text-center font-semibold my-4 max-md:mb-2.5 max-md:mt-0">
        Food Item Details
      </h1>
      <div className="flex gap-4 max-md:flex-col-reverse">
        <form
          onSubmit={(e) =>
            submitHandler(
              { name, price, isVeg, cuisines, description, image },
              e
            )
          }
          method="post"
          className="w-full max-lg:w-[90%] rounded-lg p-4 max-lg:p-2.5 flex flex-col gap-4 max-md:gap-2.5"
        >
          {/* Title */}
          <InputFiled
            inputValue={name}
            setInputValue={setName}
            icon={<MdOutlineFastfood />}
            placeholder={"Enter food name"}
          />
          {/* Price */}
          <InputFiled
            type="number"
            inputValue={price}
            setInputValue={setPrice}
            icon={<GiTakeMyMoney />}
            placeholder={"Price"}
          />
          {/* IsVeg  */}
          <InputFiled
            type="radio"
            inputValue={isVeg}
            setInputValue={setIsVeg}
            icon={<MdOutlineNoFood />}
            placeholder={""}
            options={[
              { label: "Veg", value: true },
              ...(resDetail?.isVeg !== "veg"
                ? [{ label: "Non-Veg", value: false }]
                : []),
            ]}
          />
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
          {/* Description */}
          <div className="flex gap-3 items-start border-b border-gray-300 py-3">
            <BiFoodMenu className="text-xl text-textColor" />
            <textarea
              type="text"
              placeholder="Description"
              className="w-full outline-none text-md bg-transparent"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          {/* Save Button */}
          <div className="flex justify-end max-md:justify-center">
            <button className="py-2 px-12 max-md:px-8 rounded bg-orange-500 flex items-center justify-center gap-2 text-white text-lg max-md:text-base">
              {foodData ? "Update" : "Save"} <MdOutlineDataSaverOn />
            </button>
          </div>
        </form>
        <div className="w-[45%] max-md:w-full h-[220px] max-lg:h-[180px] border border-gray-300 border-dotted flex items-center justify-center">
          <FoodImage image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
};

export default FoodForm;
