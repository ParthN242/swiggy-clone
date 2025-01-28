const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const restaurantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Restaurant Name"],
    },
    cuisines: {
      type: [String],
      required: [true, "Please Enter Cuisines"],
    },
    image: {
      type: String,
      required: [true, "Please Enter Image"],
    },
    costForTwo: {
      type: Number,
      required: [true, "Please Enter Cost For Two"],
    },
    foods: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "food",
      default: [],
    },
    isVeg: {
      type: String,
      default: "veg",
      required: [true, "Please Enter is Veg"],
    },
    address: {
      type: String,
      required: [true, "Please Enter Address"],
    },
    areaName: {
      type: String,
      required: [true, "Please Enter Area Name"],
    },
    city: {
      type: String,
      required: [true, "Please Enter City"],
    },
    state: {
      type: String,
      required: [true, "Please Enter State"],
    },
    contact: {
      type: String,
      required: [true, "Please Enter Contact"],
    },
    country: {
      type: String,
      required: [true, "Please Enter Country"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Email"],
    },
    ownerName: {
      type: String,
      required: [true, "Please Enter Owner Name"],
    },
    ownerContact: {
      type: String,
      required: [true, "Please Enter Owner Contact"],
    },
    ownerEmail: {
      type: String,
      required: [true, "Please Enter Owner Email"],
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    reviews: [{ type: String }],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
    minTime: {
      type: Number,
      required: true,
    },
    maxTime: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const restaurantModel =
  mongoose.models?.restaurant || mongoose.model("restaurant", restaurantSchema);

module.exports = restaurantModel;
