import { useEffect, useState } from "react";
import {
  MdOutlineFastfood,
  MdOutlineDataSaverOn,
  MdOutlineNoFood,
} from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { BiFoodMenu } from "react-icons/bi";
import FoodImage from "../FoodImage/FoodImage";

const FoodForm = ({ foodData, submitHandler }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isVeg, setIsVeg] = useState(true);
  const [cuisines, setCuisines] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  console.log("image: ", image);

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

  return (
    <div className="px-8 py-4  border-[1px] border-gray-300">
      {/* Form */}
      <h1 className="text-2xl font-semibold my-4">Food Item Details</h1>
      <div className="flex gap-4">
        <form
          onSubmit={(e) =>
            submitHandler(
              { name, price, isVeg, cuisines, description, image },
              e
            )
          }
          method="post"
          className="w-full  rounded-lg p-4 flex flex-col gap-4"
        >
          {/* Title */}
          <div className="flex gap-3 items-center border-b border-gray-300 py-3">
            <MdOutlineFastfood className="text-xl text-textColor" />
            <input
              type="text"
              name="title"
              placeholder="Enter food name"
              className="w-full outline-none text-md bg-transparent"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          {/* Price */}
          <div className="flex gap-3 items-center border-b border-gray-300 py-3">
            <GiTakeMyMoney className="text-xl text-textColor" />
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="w-full outline-none text-md bg-transparent"
              value={price || ""}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          {/* IsVeg  */}
          <div className="flex gap-3 items-center border-b border-gray-300 py-3">
            <MdOutlineNoFood className="text-xl text-textColor" />
            {/* <p className="">Type</p> */}
            <div>
              <input
                type="radio"
                name="isVeg"
                id="veg"
                checked={isVeg === true}
                onChange={() => setIsVeg(true)}
                required
              />{" "}
              <label htmlFor="veg">Veg</label>
            </div>
            <div className="ml-6">
              <input
                type="radio"
                name="isVeg"
                id="non-veg"
                checked={isVeg === false}
                required
                onChange={() => setIsVeg(false)}
              />{" "}
              <label htmlFor="non-veg">Non-Veg</label>
            </div>
          </div>
          {/* cuisines */}
          <div className="flex gap-3 items-center border-b border-gray-300 py-3">
            <GiTakeMyMoney className="text-xl text-textColor" />
            <input
              type="text"
              name="cuisines"
              placeholder="Cuisines (sperated by , comma)"
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
          <div className="flex justify-end">
            <button
              // whileHover={{ scale: 1.1 }}
              // disabled={loadingImg}
              className="py-2 px-12 rounded bg-orange-500 flex items-center justify-center gap-2 text-white text-lg"
            >
              {foodData ? "Update" : "Save"} <MdOutlineDataSaverOn />
            </button>
          </div>
        </form>
        <div className="w-[45%] h-[220px] border border-gray-300 border-dotted flex items-center justify-center">
          <FoodImage image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
};

export default FoodForm;
