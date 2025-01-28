import React, { useEffect, useState } from "react";
import AdminHeader from "../Header/AdminHeader";
import RestaurantForm from "../RestaurantForm/RestaurantForm";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateRestaurant = () => {
  const { resId } = useParams();
  const navigate = useNavigate();

  const [resDetail, setResDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateRestaurantDetail = async (e, resData) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/restaurant/${resId}`, resData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Restaurant updated successfully");
      navigate("/restaurant");
    } catch (error) {
      console.log("error: ", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchRestaurantsDetail = async () => {
      try {
        const { data } = await axios.get(`/restaurant/${resId}`);
        setResDetail(data.restaurant);
        setLoading(false);
      } catch (error) {
        console.log("error: ", error);
        toast.error(error.message);
      }
    };
    fetchRestaurantsDetail();
  }, []);

  return (
    <section className="flex flex-col max-h-screen">
      <AdminHeader pageTitle={"Update Restaurant"} />
      {loading ? (
        "Loading"
      ) : (
        <RestaurantForm
          resDetail={resDetail}
          submitHandler={updateRestaurantDetail}
        />
      )}
    </section>
  );
};

export default UpdateRestaurant;
