import React from "react";
import AdminHeader from "../Header/AdminHeader";
import { toast } from "react-toastify";
import axios from "axios";
import RestaurantForm from "../RestaurantForm/RestaurantForm";
import { useNavigate } from "react-router-dom";

const AddRestaurant = () => {
  const navigate = useNavigate();

  const addRestaurantHandler = async (e, resData) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", resData.name);
    formData.append("cuisines", resData.cuisines.split(","));
    formData.append("image", resData.image);
    formData.append("costForTwo", resData.costForTwo);
    formData.append("isVeg", resData.isVeg);
    formData.append("address", resData.address);
    formData.append("minTime", resData.minTime);
    formData.append("maxTime", resData.maxTime);
    formData.append("areaName", resData.areaName);
    formData.append("city", resData.city);
    formData.append("state", resData.state);
    formData.append("country", resData.country);
    formData.append("contact", resData.contact);
    formData.append("email", resData.email);
    formData.append("ownerName", resData.ownerName);
    formData.append("ownerContact", resData.ownerContact);
    formData.append("ownerEmail", resData.ownerEmail);

    const toastId = toast.loading("Adding Restaurant");
    try {
      const { data } = await axios.post("/restaurant", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/restaurant");
      toast.update(toastId, {
        render: "Restaurant added successfully",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    } catch (error) {
      console.log("error: ", error);
      toast.error(error.message);
    }
  };
  return (
    <section className="flex flex-col max-h-screen">
      <AdminHeader pageTitle={"Add Restaurant"} />
      <RestaurantForm submitHandler={addRestaurantHandler} />
    </section>
  );
};

export default AddRestaurant;
