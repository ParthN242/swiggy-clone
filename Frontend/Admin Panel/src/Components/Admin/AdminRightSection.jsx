import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import AddFood from "../AddFood/AddFood";
import UpdateFood from "../UpdateFood/UpdateFood";
import AdminMenu from "../Menu/AdminMenu";
import Orders from "../Orders/Orders";
import Setting from "../Setting/Setting";
import Restaurant from "../Restaurant/Restaurant";
import RestaurantDetail from "../RestaurantDetail/RestaurantDetail";
import AddRestaurant from "../AddRestaurant/AddRestaurant";
import UpdateRestaurant from "../UpdateRestaurant/UpdateRestaurant";
import User from "../User/User";

const AdminRightSection = () => {
  return (
    <section className="w-full h-full overflow-auto">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/addRestaurant" element={<AddRestaurant />} />
        <Route path="/restaurant/:resId/addfood" element={<AddFood />} />
        <Route
          path="/restaurant/:resId/updateFood/:foodId"
          element={<UpdateFood />}
        />
        <Route path="/restaurant/:resId" element={<RestaurantDetail />} />
        <Route path="/updatefood" element={<UpdateFood />} />
        <Route path="/menu" element={<AdminMenu />} />
        <Route path="/users" element={<User />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/updateRestaurant/:resId" element={<UpdateRestaurant />} />
      </Routes>
    </section>
  );
};

export default AdminRightSection;
