import React, { useEffect, useState } from "react";
import AdminHeader from "../Header/AdminHeader";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FoodForm from "../FoodForm/FoodForm";

const UpdateFood = () => {
  const navigate = useNavigate();

  const { foodId, resId } = useParams();

  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateFoodHandler = async (foodData, e) => {
    console.log("foodData: ", foodData);
    e.preventDefault();
    try {
      const updateFoodPromise = axios.put(
        `/restaurant/food/${foodId}`,
        foodData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.promise(updateFoodPromise, {
        pending: "Updating Food Item",
        success: "Food Item Update",
        error: "Error while updating Food Item",
      });
      await updateFoodPromise;
      navigate(`/restaurant/${resId}`);
    } catch (error) {
      console.log("error: ", error);
      toast.error("Error while updating food item");
    }
  };

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const { data } = await axios.get(`/restaurant/food/${foodId}`);
        setFoodData(data.food);
        setLoading(false);
      } catch (error) {
        console.log("error: ", error);
        toast.error("Error while fetching food items");
      }
    };
    fetchFoodItem();
  }, []);

  return (
    <section className="flex flex-col">
      <AdminHeader pageTitle="Update Food" />
      {loading ? (
        "Loading"
      ) : (
        <FoodForm foodData={foodData} submitHandler={updateFoodHandler} />
      )}
    </section>
  );
};

export default UpdateFood;
