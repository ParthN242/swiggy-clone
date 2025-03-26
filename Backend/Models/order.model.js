const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const orderSchema = mongoose.Schema(
  {
    resDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
    },
    cartItems: [
      {
        food: { type: mongoose.Schema.Types.ObjectId, ref: "food" },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPayment: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      enum: ["Confirmed", "Preparing", "On the Way", "Delivered", "Canceled"],
      default: "Confirmed",
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },

    // address: {
    //   type: String,
    //   required: true,
    // },
    // areaName: {
    //   type: String,
    //   required: true,
    // },
    // city: {
    //   type: String,
    //   required: true,
    // },
    // createdAt: {
    //   type: Date,
    //   default: Date.now(),
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now(),
    // },
  },
  { timestamps: true }
);

const orderModel =
  mongoose.models?.order || mongoose.model("order", orderSchema);

module.exports = orderModel;
