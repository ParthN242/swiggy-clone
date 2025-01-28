const express = require("express");
const {
  getAllUsersOrders,
  updateOrderStatus,
} = require("../Controller/order.controller.js");
const verifyAdmin = require("../Middleware/verifyAdmin.js");

const router = express.Router();

router
  .get("/", verifyAdmin, getAllUsersOrders)
  .put("/:orderId", verifyAdmin, updateOrderStatus);

module.exports = router;
