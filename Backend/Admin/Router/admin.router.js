const express = require("express");
const authRouter = require("./auth.router.js");
const restaurantRouter = require("./restaurant.router.js");
const orderRouter = require("./order.router.js");
const userRouter = require("./user.router.js");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/restaurant", restaurantRouter);
router.use("/order", orderRouter);

module.exports = router;
