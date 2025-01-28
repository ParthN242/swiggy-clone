const express = require("express");
const {
  addRestaurant,
  getAllRestaurants,
  addFoodItem,
  getRestaurantDetail,
  deleteRestaurantDetail,
  deleteFoodItem,
  updateRestaurantDetail,
  updateFoodItem,
  getFoodItemDetail,
  dashboardDeatil,
} = require("../Controller/restaurant.controller.js");
const verifyAdmin = require("../Middleware/verifyAdmin.js");
const multer = require("multer");

const router = express.Router();

const multerUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});
const imageUpload = multerUpload.single("image");

// /api/admin/restaurant/
router
  .post("/", imageUpload, verifyAdmin, addRestaurant)
  .get("/", verifyAdmin, getAllRestaurants)
  .get("/dashboard", verifyAdmin, dashboardDeatil)
  .get("/:resId", verifyAdmin, getRestaurantDetail)
  .get("/food/:foodId", verifyAdmin, getFoodItemDetail)
  .post("/food", imageUpload, verifyAdmin, addFoodItem)
  .put("/food/:foodId", imageUpload, verifyAdmin, updateFoodItem)
  .delete("/food/:foodId", verifyAdmin, deleteFoodItem)
  .delete("/:resId", verifyAdmin, deleteRestaurantDetail)
  .put("/:resId", imageUpload, verifyAdmin, updateRestaurantDetail);

module.exports = router;
