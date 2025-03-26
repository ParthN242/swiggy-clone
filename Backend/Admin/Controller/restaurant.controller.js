const Admin = require("../../Models/admin.model.js");
const Restaurant = require("../../Models/restaurant.model.js");
const Food = require("../../Models/food.model.js");
const User = require("../../Models/user.model.js");
const Order = require("../../Models/order.model.js");
const uploadImage = require("../../Utils/uploadImage.js");

// add Restaurant
exports.addRestaurant = async (req, res, next) => {
  try {
    const {
      name,
      cuisines,
      costForTwo,
      isVeg,
      address,
      minTime,
      maxTime,
      areaName,
      city,
      state,
      country,
      contact,
      email,
      ownerName,
      ownerContact,
      ownerEmail,
    } = req.body;
    const image = req.file;

    const result = await uploadImage(image);

    const imageUrl = result.url;

    const restaurant = await Restaurant.create({
      name,
      image: imageUrl,
      cuisines,
      costForTwo,
      isVeg,
      address,
      minTime,
      maxTime,
      areaName,
      city,
      state,
      country,
      contact,
      email,
      ownerName,
      ownerContact,
      ownerEmail,
      owner: req.admin._id,
    });

    const io = req.app.get("io");

    if (io) {
      io.emit("add-new-restaurant", restaurant);
    }

    return res.status(201).json({ success: true, restaurant });
  } catch (error) {
    console.log("error: ", error);
    return res.status(401).json({ error });
  }
};

// Get All Restaurant
exports.getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, restaurants });
  } catch (error) {
    console.log("error: ", error);
    return res.status(400).json({ error });
  }
};

// Get Restaurant by ID
exports.getRestaurantDetail = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.resId).populate(
      "foods"
    );

    return res.status(200).json({ success: true, restaurant });
  } catch (error) {
    console.log("error: ", error);
    return res.status(400).json({ error });
  }
};

// Update Restaurant Details By Id
exports.updateRestaurantDetail = async (req, res, next) => {
  try {
    const body = req.body;

    const image = req.file;
    if (image) {
      const result = await uploadImage(image);
      body.image = result.url;
    }

    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.resId,
      body,
      {
        new: true,
      }
    );

    return res.status(200).json({ success: true, restaurant });
  } catch (error) {
    console.log("error: ", error);
    return res.status(400).json({ error });
  }
};

// Delete Restaurant Details By Id
exports.deleteRestaurantDetail = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.resId);

    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    await Food.deleteMany({ restaurant: req.params.resId });

    await Restaurant.findByIdAndDelete(req.params.resId);

    const io = req.app.get("io");

    if (io) {
      io.emit("delete-restaurant", restaurant._id);
    }

    return res
      .status(200)
      .json({ success: true, message: "Restaurant Deleted Successfully" });
  } catch (error) {
    console.log("error: ", error);
    return res.status(400).json({ error });
  }
};

// get food item detail
exports.getFoodItemDetail = async (req, res, next) => {
  try {
    const foodId = req.params.foodId;

    const food = await Food.findById(foodId);

    return res.status(200).json({ success: true, food });
  } catch (error) {
    console.log("error: ", error);
    return res.status(400).json({ error });
  }
};

// add Food item
exports.addFoodItem = async (req, res, next) => {
  try {
    const { name, price, isVeg, cuisines, description, restaurantId } =
      req.body;

    const image = req.file || req.body.image;

    const result = await uploadImage(image);

    const imageUrl = result.url;

    const food = await Food.create({
      name,
      image: imageUrl,
      price,
      isVeg,
      cuisines,
      description,
      restaurant: restaurantId,
    });

    await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $push: { foods: food._id } },
      { next: true }
    );

    return res.status(200).json({ success: true, food: true });
  } catch (error) {
    console.log("error: ", error);
    return res.status(400).json({ error });
  }
};

// Update Food Item
exports.updateFoodItem = async (req, res, next) => {
  try {
    const body = req.body;

    const image = req.file;
    if (image) {
      const result = await uploadImage(image);
      body.image = result.url;
    }

    const food = await Food.findByIdAndUpdate(req.params.foodId, body, {
      new: true,
    });

    return res.status(200).json({ success: true, food });
  } catch (error) {
    console.log("error: ", error);
    return res.status(400).json({ error });
  }
};

// Delete Restaurant Details By Id
exports.deleteFoodItem = async (req, res, next) => {
  try {
    await Food.findByIdAndDelete(req.params.foodId);

    return res
      .status(200)
      .json({ success: true, message: "Food Item Deleted Successfully" });
  } catch (error) {
    console.log("error: ", error);
    return res.status(400).json({ error });
  }
};

// Dashboard
exports.dashboardDetail = async (req, res, next) => {
  try {
    const foods = await Food.find();
    const users = await User.find();
    const restaurants = await Restaurant.find();
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => {
      return order.status === "Delivered" ? sum + order.totalPayment : sum;
    }, 0);
    console.log("totalRevenue: ", totalRevenue);

    return res.status(200).json({
      users: users.length,
      foods: foods.length,
      restaurants: restaurants.length,
      orders: orders.length,
      "total Revenue": totalRevenue,
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json(error);
  }
};
