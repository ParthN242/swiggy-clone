const express = require("express");
const {
  userLogin,
  userSignUp,
  getUserProfile,
  userLogout,
  getAllRestaurant,
  getRestaurantDetails,
  updateUserProfile,
  createPaymentIntent,
  createOrder,
  getAllOrder,
  forgotPassword,
  resetPassword,
  cancelOrder,
  searchFoodRestaurant,
} = require("../Controller/user.controller.js");
const verifyUser = require("../Middleware/verifyUser.js");

const router = express.Router();

router
  .post("/auth/login", userLogin)
  .post("/auth/signup", userSignUp)
  .get("/auth/logout", verifyUser, userLogout)
  .get("/me", verifyUser, getUserProfile)
  .post("/me", verifyUser, updateUserProfile)
  .get("/restaurant", getAllRestaurant)
  .get("/restaurant/:resId", getRestaurantDetails)
  .post("/order", verifyUser, createOrder)
  .delete("/order/:orderId", verifyUser, cancelOrder)
  .get("/order", verifyUser, getAllOrder)
  .post("/forgot-password", forgotPassword)
  .post("/reset-password", resetPassword)
  .post("/search", searchFoodRestaurant)
  .post("/order/create-payment-intent", verifyUser, createPaymentIntent);

module.exports = router;
