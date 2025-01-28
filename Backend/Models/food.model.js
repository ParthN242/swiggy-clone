const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const foodSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Restaurant Name"],
    },
    image: {
      type: String,
      required: [true, "Please Enter Image"],
    },
    isVeg: {
      type: Boolean,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    cuisines: {
      type: String,
      required: [true, "Please Enter Cuisine"],
    },
    description: {
      type: String,
      required: [true, "Please Enter description"],
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
      required: true,
    },
  },
  { timestamps: true }
);

const footModel = mongoose.models?.food || mongoose.model("food", foodSchema);

module.exports = footModel;
