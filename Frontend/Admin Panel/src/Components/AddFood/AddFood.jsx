import AdminHeader from "../Header/AdminHeader";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import FoodForm from "../FoodForm/FoodForm";

const AddFood = () => {
  const navigate = useNavigate();
  const { resId } = useParams();

  const addFoodHandler = async (data, e) => {
    e.preventDefault();
    if (!data.image) {
      toast.error("Please select an image");
      return;
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("isVeg", data.isVeg);
    formData.append("cuisines", data.cuisines);
    formData.append("description", data.description);
    formData.append("image", data.image);
    formData.append("restaurantId", resId);
    try {
      const addFoodPromise = axios.post("/restaurant/food", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.promise(addFoodPromise, {
        pending: "Adding Food Item",
        success: "Food Item Added",
        error: "Error while adding Food Item",
      });
      await addFoodPromise;
      navigate(`/restaurant/${resId}`);
    } catch (error) {
      console.log("error: ", error);
      toast.error("Error while adding food");
    }
  };
  return (
    <section className="flex flex-col px-2">
      <AdminHeader
        pageTitle="Add Food"
        isBackNavigation
        navigationUrl={`/restaurant/${resId}`}
      />
      <FoodForm submitHandler={addFoodHandler} resId={resId} />
    </section>
  );
};

export default AddFood;
